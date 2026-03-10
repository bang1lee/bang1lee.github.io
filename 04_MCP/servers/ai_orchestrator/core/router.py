"""
태스크 라우터 - 작업을 적절한 에이전트/레이어로 분배
"""

from __future__ import annotations

import re
from dataclasses import dataclass, field
from typing import Dict, List, Optional, Tuple

from .state import ExecutionLayer, TaskRecord


@dataclass
class RoutingRule:
    """라우팅 규칙 정의"""
    keywords: List[str]
    layer: ExecutionLayer
    agent: str
    priority: int = 0  # 높을수록 우선


# 기본 라우팅 규칙 테이블
DEFAULT_RULES: List[RoutingRule] = [
    # 오케스트레이터 레이어 (퍼플렉시티 컴퓨터)
    RoutingRule(
        keywords=["리서치", "조사", "검색", "트렌드", "비교분석", "시장조사",
                  "research", "search", "trend", "market", "compare"],
        layer=ExecutionLayer.ORCHESTRATOR,
        agent="researcher",
        priority=10,
    ),
    RoutingRule(
        keywords=["기획", "계획", "설계", "아키텍처", "전략", "브리핑",
                  "plan", "design", "architecture", "strategy", "brief"],
        layer=ExecutionLayer.ORCHESTRATOR,
        agent="planner",
        priority=10,
    ),
    RoutingRule(
        keywords=["배포", "deploy", "push", "release", "publish", "cloudflare",
                  "github actions", "ci/cd"],
        layer=ExecutionLayer.ORCHESTRATOR,
        agent="planner",
        priority=5,
    ),

    # 구현 레이어 (클로드 코워크/CLI)
    RoutingRule(
        keywords=["코드", "구현", "개발", "함수", "클래스", "API", "서버",
                  "code", "implement", "develop", "function", "class", "debug",
                  "디버깅", "테스트", "test", "리팩토링", "refactor"],
        layer=ExecutionLayer.IMPLEMENTATION,
        agent="coder",
        priority=10,
    ),
    RoutingRule(
        keywords=["리뷰", "검토", "코드리뷰", "review", "audit", "QA"],
        layer=ExecutionLayer.IMPLEMENTATION,
        agent="reviewer",
        priority=8,
    ),
    RoutingRule(
        keywords=["스크립트", "자동화", "MCP", "docker", "nginx", "서버구축",
                  "script", "automation", "server setup"],
        layer=ExecutionLayer.IMPLEMENTATION,
        agent="coder",
        priority=8,
    ),

    # 노코드 레이어 (구글 오팔)
    RoutingRule(
        keywords=["대시보드", "시각화", "차트", "미니앱", "프로토타입",
                  "dashboard", "visualization", "chart", "mini app", "prototype",
                  "노코드", "nocode"],
        layer=ExecutionLayer.NOCODE,
        agent="planner",
        priority=10,
    ),
]


class TaskRouter:
    """인텔리전트 태스크 라우터"""

    def __init__(self, rules: Optional[List[RoutingRule]] = None):
        self.rules = rules or DEFAULT_RULES

    def route(self, task: TaskRecord) -> Tuple[ExecutionLayer, str]:
        """
        태스크를 분석하여 적절한 레이어와 에이전트를 결정

        Returns:
            (ExecutionLayer, agent_name)
        """
        text = f"{task.title} {task.description}".lower()
        scores: Dict[str, Tuple[int, ExecutionLayer, str]] = {}

        for rule in self.rules:
            match_count = sum(1 for kw in rule.keywords if kw.lower() in text)
            if match_count > 0:
                score = match_count * rule.priority
                key = f"{rule.layer.value}:{rule.agent}"
                if key not in scores or score > scores[key][0]:
                    scores[key] = (score, rule.layer, rule.agent)

        if scores:
            best = max(scores.values(), key=lambda x: x[0])
            return best[1], best[2]

        # 기본: 구현 레이어의 coder
        return ExecutionLayer.IMPLEMENTATION, "coder"

    def route_batch(
        self, tasks: List[TaskRecord]
    ) -> Dict[str, Tuple[ExecutionLayer, str]]:
        """여러 태스크를 한번에 라우팅"""
        return {task.task_id: self.route(task) for task in tasks}

    def add_rule(self, rule: RoutingRule):
        """커스텀 라우팅 규칙 추가"""
        self.rules.append(rule)

    def get_layer_tasks(
        self, tasks: List[TaskRecord], layer: ExecutionLayer
    ) -> List[TaskRecord]:
        """특정 레이어에 속하는 태스크만 필터"""
        return [t for t in tasks if self.route(t)[0] == layer]
