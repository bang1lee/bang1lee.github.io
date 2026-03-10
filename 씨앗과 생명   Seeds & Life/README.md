# 🌱 씨앗과 생명 | Seeds & Life

> 씨앗과 기후, 생명과 성경을 연결하는 비영리 교육 · 다큐멘터리 · 미디어 플랫폼

---

## 📋 프로젝트 개요

**씨앗과 생명(Seeds & Life)**은 바이오필리아(Biophilia) 탐구와 성경적 세계관을 통해 아이들(6-12세)이 자연과 생명의 가치를 발견하는 비영리 교육 플랫폼입니다.

### 핵심 가치
- 🌱 **바이오필리아 교육** — 자연과의 본능적 유대를 회복하는 체험 프로그램
- 📖 **성경 프로그램** — 씨앗과 생명의 비유를 통한 신앙 교육
- 🎬 **다큐멘터리 미디어** — 자연과 신앙의 이야기를 영상으로 기록
- 🌍 **기후 교육** — 씨앗 보존과 기후 위기 대응의 연결

---

## 🚀 GitHub Pages 배포 가이드

### 방법 1: 가장 간단한 배포 (정적 HTML)

1. **GitHub 레포지토리 생성**
   ```
   Repository name: seeds-and-life
   (또는 username.github.io 로 생성하면 루트 도메인 사용 가능)
   ```

2. **파일 업로드**
   - `index.html` 파일을 레포지토리 루트에 업로드
   - `docs/` 폴더의 마크다운 파일들도 함께 업로드

3. **GitHub Pages 활성화**
   - Repository → Settings → Pages
   - Source: **Deploy from a branch**
   - Branch: `main` / `/(root)`
   - Save

4. **접속 확인**
   ```
   https://username.github.io/seeds-and-life/
   ```

### 방법 2: 커스텀 도메인 연결

1. **도메인 구매** (예: seedsandlife.org)
2. **DNS 설정** — A 레코드 추가:
   ```
   185.199.108.153
   185.199.109.153
   185.199.110.153
   185.199.111.153
   ```
3. **CNAME 파일 생성** — 레포지토리 루트에:
   ```
   seedsandlife.org
   ```
4. **GitHub Pages 설정** — Custom domain에 도메인 입력, HTTPS 활성화

### 방법 3: Cloudflare Pages (더 빠른 로딩)

스크린샷에서 보이는 Cloudflare Pages 설정을 사용할 경우:
- Framework preset: **None** (순수 정적 HTML)
- Build command: (비워두기)
- Build output directory: `/`
- 레포지토리 연결 후 자동 배포

---

## 📁 파일 구조

```
seeds-and-life/
├── index.html              ← 메인 홈페이지 (단일 페이지 애플리케이션)
├── README.md               ← 이 문서
├── CNAME                   ← 커스텀 도메인 (선택)
├── docs/
│   ├── AGENDA.md           ← 거대 아젠더 문서
│   ├── TELEGRAM_GUIDE.md   ← 텔레그램 봇 연동 가이드
│   ├── INSTAGRAM_GUIDE.md  ← 인스타그램 개설 및 운영 가이드
│   └── SUSTAINABILITY.md   ← 비영리 지속가능성 심층 리서치
└── assets/                 ← 이미지 및 에셋 (추후 추가)
```

---

## 🤖 텔레그램 봇 연동

상세 가이드: [`docs/TELEGRAM_GUIDE.md`](docs/TELEGRAM_GUIDE.md)

### 빠른 시작
1. [@BotFather](https://t.me/BotFather)에서 봇 생성
2. 봇 토큰을 `index.html`의 `BOT_TOKEN` 위치에 입력
3. 채팅 ID를 `CHAT_ID` 위치에 입력
4. 신청 폼 제출 시 텔레그램으로 자동 알림

---

## 📷 인스타그램 전략

상세 가이드: [`docs/INSTAGRAM_GUIDE.md`](docs/INSTAGRAM_GUIDE.md)

- 계정명: **@seeds_and_life**
- 비영리 비즈니스 계정으로 개설
- 주 3-5회 피드, 매일 스토리, 주 1-3회 릴스

---

## 🌿 기술 스택

- **프론트엔드**: 순수 HTML5 + CSS3 + Vanilla JavaScript
- **폰트**: Google Fonts (Noto Sans KR + Playfair Display)
- **호스팅**: GitHub Pages (정적 사이트)
- **폼 연동**: Telegram Bot API
- **애니메이션**: CSS + IntersectionObserver API
- **반응형**: CSS Grid + Flexbox + Media Queries

---

## 📊 SEO 최적화

- Open Graph 메타 태그 포함
- 시맨틱 HTML (nav, main, section, footer)
- 구조화된 헤딩 계층 (h1 > h2 > h3)
- 모바일 최적화 (375px ~ 2560px)
- 한국어 메타 디스크립션 및 키워드

---

## 📄 라이선스

이 프로젝트는 비영리 교육 목적으로 제작되었습니다.

---

*Created with [Perplexity Computer](https://www.perplexity.ai/computer)*
