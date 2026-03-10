#!/usr/bin/env python3
"""
CLI 도구 템플릿
바이브코딩으로 빠르게 시작하는 Python CLI 도구
"""

import argparse
import sys


def main():
    parser = argparse.ArgumentParser(
        description="나의 CLI 도구 설명",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
사용 예시:
  python cli_template.py --name Claude
  python cli_template.py --name Banglee --verbose
        """
    )
    parser.add_argument("--name", type=str, required=True, help="이름 입력")
    parser.add_argument("--verbose", action="store_true", help="자세한 출력")

    args = parser.parse_args()

    if args.verbose:
        print(f"[INFO] 실행 중...")
        print(f"[INFO] 입력값: name={args.name}")

    print(f"✅ 안녕하세요, {args.name}!")


if __name__ == "__main__":
    main()
