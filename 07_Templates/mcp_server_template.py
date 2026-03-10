#!/usr/bin/env python3
"""
MCP 서버 템플릿
Claude AI와 연동하는 MCP 서버 기본 구조

설치: pip install mcp
실행: python mcp_server_template.py
"""

import asyncio
from mcp.server import Server
from mcp.server.stdio import stdio_server
from mcp.types import Tool, TextContent


# 서버 인스턴스 생성
app = Server("my-mcp-server")


@app.list_tools()
async def list_tools() -> list[Tool]:
    """Claude에게 제공할 도구 목록"""
    return [
        Tool(
            name="hello",
            description="인사 메시지를 반환합니다",
            inputSchema={
                "type": "object",
                "properties": {
                    "name": {
                        "type": "string",
                        "description": "인사할 이름"
                    }
                },
                "required": ["name"]
            }
        )
    ]


@app.call_tool()
async def call_tool(name: str, arguments: dict) -> list[TextContent]:
    """도구 실행 로직"""
    if name == "hello":
        user_name = arguments.get("name", "세상")
        return [TextContent(type="text", text=f"안녕하세요, {user_name}! 🎉")]

    raise ValueError(f"알 수 없는 도구: {name}")


async def main():
    async with stdio_server() as (read_stream, write_stream):
        await app.run(read_stream, write_stream, app.create_initialization_options())


if __name__ == "__main__":
    asyncio.run(main())
