"""
상태 관리 모듈 - 에이전트 간 공유 컨텍스트 및 작업 상태 추적
"""

from __future__ import annotations

import time
import uuid
from dataclasses import dataclass, field
from enum import Enum
from typing import Any, Dict, List, Optional


class TaskStatus(str, Enum):
    PENDING = "pending"
    ROUTING = "routing"
    IN_PROGRESS = "in_progress"
    WAITING = "waiting"       # 다른 태스크 의존성 대기
    COMPLETED = "completed"
    FAILED = "failed"
    CANCELLED = "cancelled"


class ExecutionLayer(str, Enum):
    """3계층 실행 레이어"""
    ORCHESTRATOR = "orchestrator"   # 퍼플렉시티 컴퓨터 - 기획/조사/배포지시
    IMPLEMENTATION = "implementation"  # 클로드 코워크/CLI - 구현/디버깅
    NOCODE = "nocode"               # 구글 오팔 - 대시보드/미니앱


@dataclass
class TaskRecord:
    """개별 작업 기록"""
    task_id: str = field(default_factory=lambda: str(uuid.uuid4())[:8])
    title: str = ""
    description: str = ""
    status: TaskStatus = TaskStatus.PENDING
    layer: ExecutionLayer = ExecutionLayer.IMPLEMENTATION
    assigned_agent: str = ""
    dependencies: List[str] = field(default_factory=list)  # 의존 task_id 목록
    input_data: Dict[str, Any] = field(default_factory=dict)
    output_data: Dict[str, Any] = field(default_factory=dict)
    error: Optional[str] = None
    created_at: float = field(default_factory=time.time)
    started_at: Optional[float] = None
    completed_at: Optional[float] = None
    retries: int = 0
    max_retries: int = 3

    @property
    def duration(self) -> Optional[float]:
        if self.started_at and self.completed_at:
            return self.completed_at - self.started_at
        return None

    @property
    def is_ready(self) -> bool:
        """모든 의존성이 완료되었는지 확인"""
        return self.status == TaskStatus.PENDING and not self.dependencies

    def mark_started(self, agent: str):
        self.status = TaskStatus.IN_PROGRESS
        self.assigned_agent = agent
        self.started_at = time.time()

    def mark_completed(self, output: Dict[str, Any]):
        self.status = TaskStatus.COMPLETED
        self.output_data = output
        self.completed_at = time.time()

    def mark_failed(self, error: str):
        self.status = TaskStatus.FAILED
        self.error = error
        self.completed_at = time.time()


@dataclass
class SharedContext:
    """에이전트 간 공유 컨텍스트"""
    project_name: str = ""
    project_root: str = ""
    variables: Dict[str, Any] = field(default_factory=dict)
    artifacts: Dict[str, str] = field(default_factory=dict)   # name → file_path
    messages: List[Dict[str, str]] = field(default_factory=list)  # 에이전트 간 메시지

    def set(self, key: str, value: Any):
        self.variables[key] = value

    def get(self, key: str, default: Any = None) -> Any:
        return self.variables.get(key, default)

    def add_artifact(self, name: str, path: str):
        self.artifacts[name] = path

    def add_message(self, sender: str, content: str):
        self.messages.append({
            "sender": sender,
            "content": content,
            "timestamp": time.time(),
        })


class StateManager:
    """전역 상태 관리자"""

    def __init__(self):
        self.tasks: Dict[str, TaskRecord] = {}
        self.context = SharedContext()
        self._execution_log: List[Dict[str, Any]] = []

    def create_task(self, **kwargs) -> TaskRecord:
        """새 작업 생성"""
        task = TaskRecord(**kwargs)
        self.tasks[task.task_id] = task
        self._log("task_created", task_id=task.task_id, title=task.title)
        return task

    def get_task(self, task_id: str) -> Optional[TaskRecord]:
        return self.tasks.get(task_id)

    def get_ready_tasks(self) -> List[TaskRecord]:
        """실행 가능한 작업 목록 (의존성 해결 완료)"""
        ready = []
        completed_ids = {
            tid for tid, t in self.tasks.items()
            if t.status == TaskStatus.COMPLETED
        }
        for task in self.tasks.values():
            if task.status == TaskStatus.PENDING:
                unmet = [d for d in task.dependencies if d not in completed_ids]
                if not unmet:
                    ready.append(task)
        return ready

    def resolve_dependencies(self, task_id: str):
        """완료된 태스크를 다른 태스크의 의존성에서 제거"""
        for task in self.tasks.values():
            if task_id in task.dependencies:
                task.dependencies.remove(task_id)

    def complete_task(self, task_id: str, output: Dict[str, Any]):
        task = self.tasks[task_id]
        task.mark_completed(output)
        self.resolve_dependencies(task_id)
        self._log("task_completed", task_id=task_id, duration=task.duration)

    def fail_task(self, task_id: str, error: str):
        task = self.tasks[task_id]
        task.mark_failed(error)
        self._log("task_failed", task_id=task_id, error=error)

    def get_summary(self) -> Dict[str, Any]:
        """현재 상태 요약"""
        status_counts = {}
        for task in self.tasks.values():
            status_counts[task.status.value] = (
                status_counts.get(task.status.value, 0) + 1
            )
        return {
            "total_tasks": len(self.tasks),
            "status": status_counts,
            "artifacts": len(self.context.artifacts),
            "messages": len(self.context.messages),
        }

    def _log(self, event: str, **data):
        self._execution_log.append({
            "event": event,
            "timestamp": time.time(),
            **data,
        })
