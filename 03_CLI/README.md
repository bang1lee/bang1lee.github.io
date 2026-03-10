# 💻 CLI 도구 개발

커맨드라인 인터페이스(CLI) 도구 및 스크립트 모음입니다.

## 폴더 구조
```
03_CLI/
├── tools/       # 개별 CLI 도구
├── scripts/     # 유틸리티 스크립트
└── README.md
```

## 빠른 시작 (Python CLI)

```python
# tools/my_tool.py 예시
import argparse

def main():
    parser = argparse.ArgumentParser(description='나의 CLI 도구')
    parser.add_argument('--name', type=str, help='이름 입력')
    args = parser.parse_args()
    print(f"안녕하세요, {args.name}!")

if __name__ == '__main__':
    main()
```

```bash
# 실행
python tools/my_tool.py --name Claude
```

## 추천 라이브러리
- `argparse` — 기본 CLI 파서 (내장)
- `click` — 강력한 CLI 프레임워크
- `typer` — 타입 힌트 기반 CLI
- `rich` — 터미널 UI 꾸미기
