# 🔌 MCP (Model Context Protocol)

Claude AI와 연동하는 MCP 서버/클라이언트 개발 공간입니다.

## 폴더 구조
```
04_MCP/
├── servers/     # MCP 서버 프로젝트
├── clients/     # MCP 클라이언트
├── configs/     # claude_desktop_config.json 등 설정
└── README.md
```

## MCP 서버 빠른 시작

```bash
# MCP SDK 설치
pip install mcp

# 또는 Node.js
npm install @modelcontextprotocol/sdk
```

### Python MCP 서버 기본 템플릿
```python
# servers/my_server.py
from mcp.server import Server
from mcp.server.stdio import stdio_server

app = Server("my-server")

@app.list_tools()
async def list_tools():
    return []

@app.call_tool()
async def call_tool(name, arguments):
    pass

async def main():
    async with stdio_server() as streams:
        await app.run(*streams)

if __name__ == "__main__":
    import asyncio
    asyncio.run(main())
```

## Claude Desktop 설정 예시
`configs/claude_desktop_config.json`:
```json
{
  "mcpServers": {
    "my-server": {
      "command": "python",
      "args": ["servers/my_server.py"]
    }
  }
}
```

## 참고 자료
- [MCP 공식 문서](https://modelcontextprotocol.io)
- [MCP Python SDK](https://github.com/modelcontextprotocol/python-sdk)
