"""설정 관리"""

from __future__ import annotations

import json
import os
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any, Dict, Optional


@dataclass
class AgentConfig:
    """에이전트별 설정"""
    name: str
    model: str = "claude-sonnet-4-6"
    max_tokens: int = 4096
    temperature: float = 0.7
    system_prompt: str = ""
    tools: list[str] = field(default_factory=list)
    max_retries: int = 3
    timeout: int = 120


@dataclass
class Config:
    """전역 오케스트레이터 설정"""

    # API 키 (환경변수 우선)
    anthropic_api_key: str = ""
    openai_api_key: str = ""

    # 오케스트레이터 설정
    max_concurrent_agents: int = 5
    default_model: str = "claude-sonnet-4-6"
    log_level: str = "INFO"
    log_file: Optional[str] = None

    # 에이전트 설정
    agents: Dict[str, AgentConfig] = field(default_factory=dict)

    # 워크플로우 설정
    workflow_timeout: int = 600  # 10분
    retry_on_failure: bool = True

    def __post_init__(self):
        self.anthropic_api_key = (
            os.getenv("ANTHROPIC_API_KEY", "") or self.anthropic_api_key
        )
        self.openai_api_key = (
            os.getenv("OPENAI_API_KEY", "") or self.openai_api_key
        )

    @classmethod
    def from_file(cls, path: str | Path) -> "Config":
        """JSON 파일에서 설정 로드"""
        with open(path) as f:
            data = json.load(f)

        agents = {}
        for name, agent_data in data.pop("agents", {}).items():
            agents[name] = AgentConfig(name=name, **agent_data)

        return cls(agents=agents, **data)

    @classmethod
    def default(cls) -> "Config":
        """기본 설정으로 초기화"""
        return cls(
            agents={
                "planner": AgentConfig(
                    name="planner",
                    system_prompt="You are a task planning specialist. Break down complex tasks into actionable steps.",
                    temperature=0.3,
                ),
                "coder": AgentConfig(
                    name="coder",
                    system_prompt="You are an expert programmer. Write clean, efficient, well-documented code.",
                    tools=["file_read", "file_write", "shell_exec"],
                    temperature=0.2,
                ),
                "researcher": AgentConfig(
                    name="researcher",
                    system_prompt="You are a research specialist. Find, analyze, and synthesize information thoroughly.",
                    tools=["web_search", "file_read"],
                    temperature=0.5,
                ),
                "reviewer": AgentConfig(
                    name="reviewer",
                    system_prompt="You are a code/content reviewer. Provide thorough, constructive feedback.",
                    temperature=0.3,
                ),
            }
        )

    def to_dict(self) -> Dict[str, Any]:
        """설정을 딕셔너리로 변환"""
        data = {
            "max_concurrent_agents": self.max_concurrent_agents,
            "default_model": self.default_model,
            "log_level": self.log_level,
            "workflow_timeout": self.workflow_timeout,
            "retry_on_failure": self.retry_on_failure,
            "agents": {},
        }
        for name, agent in self.agents.items():
            data["agents"][name] = {
                "model": agent.model,
                "max_tokens": agent.max_tokens,
                "temperature": agent.temperature,
                "system_prompt": agent.system_prompt,
                "tools": agent.tools,
            }
        return data

    def save(self, path: str | Path):
        """설정을 JSON 파일로 저장"""
        with open(path, "w") as f:
            json.dump(self.to_dict(), f, indent=2, ensure_ascii=False)
