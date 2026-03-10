# 📨 텔레그램 봇 연동 가이드

## 목차
1. [봇 생성](#1-봇-생성)
2. [봇 토큰 설정](#2-봇-토큰-설정)
3. [채팅 ID 확인](#3-채팅-id-확인)
4. [홈페이지 연동](#4-홈페이지-연동)
5. [채널 구조 설계](#5-채널-구조-설계)
6. [고급 기능](#6-고급-기능)

---

## 1. 봇 생성

### Step 1: BotFather에서 새 봇 만들기

1. 텔레그램에서 [@BotFather](https://t.me/BotFather) 검색
2. `/newbot` 명령어 입력
3. 봇 이름 입력: `씨앗과 생명`
4. 봇 사용자명 입력: `SeedsAndLife_bot`
5. BotFather가 **봇 토큰**을 발급 (형식: `123456789:ABCdefGHIjklMNOpqrsTUVwxyz`)

### Step 2: 봇 프로필 설정

```
/setdescription — 봇 설명 설정
/setabouttext — "씨앗과 생명 비영리 교육 플랫폼 공식 봇"
/setuserpic — 프로필 사진 업로드
/setcommands — 명령어 설정
```

추천 명령어 목록:
```
start - 봇 시작 및 안내
programs - 프로그램 목록
apply - 프로그램 신청
schedule - 일정 확인
contact - 문의하기
```

---

## 2. 봇 토큰 설정

### 보안 주의사항
- 봇 토큰은 **절대 공개 레포지토리에 커밋하지 마세요**
- GitHub Pages는 정적 호스팅이므로, 클라이언트 사이드에서 토큰이 노출됩니다
- **권장 방안**: 별도 백엔드 서버를 경유하거나, Cloudflare Workers를 프록시로 사용

### 간단 설정 (프로토타입용)

`index.html`에서 아래 부분을 찾아 수정:

```javascript
const BOT_TOKEN = 'YOUR_BOT_TOKEN';  // ← 여기에 봇 토큰 입력
const CHAT_ID = 'YOUR_CHAT_ID';      // ← 여기에 채팅 ID 입력
```

### 보안 설정 (운영용) — Cloudflare Workers 프록시

```javascript
// Cloudflare Worker (wrangler.toml에서 시크릿으로 관리)
export default {
  async fetch(request, env) {
    const body = await request.json();
    const message = body.message;
    
    const response = await fetch(
      `https://api.telegram.org/bot${env.BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: env.CHAT_ID,
          text: message,
          parse_mode: 'Markdown'
        })
      }
    );
    
    return new Response(JSON.stringify({ ok: true }), {
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
};
```

---

## 3. 채팅 ID 확인

### 개인 채팅 ID

1. 봇에게 아무 메시지 전송
2. 브라우저에서 접속:
   ```
   https://api.telegram.org/bot{YOUR_BOT_TOKEN}/getUpdates
   ```
3. JSON 응답에서 `"chat":{"id":XXXXXXXX}` 확인

### 그룹 채팅 ID

1. 봇을 그룹에 추가
2. 그룹에서 아무 메시지 전송
3. 같은 방법으로 getUpdates 확인 (그룹 ID는 음수: `-XXXXXXXX`)

---

## 4. 홈페이지 연동

### 신청 폼 → 텔레그램 알림

홈페이지의 신청 폼이 제출되면 아래 형식의 메시지가 텔레그램으로 전송됩니다:

```
📋 *새 프로그램 신청*

👤 보호자: 홍길동
📞 연락처: 010-1234-5678
📧 이메일: parent@example.com
👦 자녀: 홍세아 (8세)
📌 프로그램: 🌱 씨앗 탐험대 (6주)
💬 메시지: 주말 프로그램이 있나요?

⏰ 2026. 3. 10. 오후 11:48:00
```

### 추가 연동 아이디어

- **일정 자동 알림**: 프로그램 시작 D-7, D-1 알림
- **주간 레터**: 매주 월요일 프로그램 요약 전송
- **사진 공유**: 활동 사진을 채널에 자동 게시
- **출석 체크**: 봇 명령어로 출석 확인

---

## 5. 채널 구조 설계

### 외부 커뮤니케이션 (신청 고객)

| 채널 | 용도 | 대상 |
|---|---|---|
| `@SeedsAndLife_bot` | 프로그램 신청, 문의 응답 | 학부모 |
| `@SeedsAndLife_News` | 공지 채널 (일방향) | 전체 |
| `씨앗과 생명 커뮤니티` | 학부모 대화 그룹 | 등록 학부모 |

### 내부 커뮤니케이션 (운영진)

| 채널 | 용도 | 대상 |
|---|---|---|
| `운영진 관리채널` | 신청 알림, KPI, 긴급 공지 | 운영진 |
| `교육팀 채널` | 커리큘럼 논의, 교안 공유 | 교육자 |
| `미디어팀 채널` | 촬영 일정, 편집 진행 | 미디어팀 |
| `봉사자 채널` | 봉사 일정, 교육 자료 | 봉사자 |

---

## 6. 고급 기능

### Webhook 설정 (실시간 응답)

봇이 메시지에 즉시 응답하게 하려면 Webhook을 설정합니다:

```bash
curl -F "url=https://your-server.com/webhook" \
  https://api.telegram.org/bot{YOUR_BOT_TOKEN}/setWebhook
```

### 인라인 키보드 (프로그램 선택)

```javascript
const keyboard = {
  inline_keyboard: [
    [
      { text: "🌱 씨앗 탐험대", callback_data: "program_seeds" },
      { text: "📖 말씀 정원", callback_data: "program_scripture" }
    ],
    [
      { text: "🎬 다큐멘터리스트", callback_data: "program_doc" },
      { text: "🌿 바이오필리아", callback_data: "program_bio" }
    ],
    [
      { text: "🌍 기후 수호자", callback_data: "program_climate" },
      { text: "🏕️ 캠프", callback_data: "program_camp" }
    ]
  ]
};
```

### n8n / Make 자동화 연동

텔레그램 봇을 n8n이나 Make(구 Integromat)와 연동하면:
- 신청 접수 → Google Sheets 자동 기록
- 신청 접수 → 자동 확인 메시지 발송
- 일정 변경 → 전체 알림 자동 발송
- KPI 데이터 → 주간 리포트 자동 생성

---

*상세 Telegram Bot API 문서: [core.telegram.org/bots/api](https://core.telegram.org/bots/api)*
