# Portfolio Renewal Workflow
## 리서치 → 목업 리뉴얼 반복 사이클

---

## 워크플로우 구조

```
┌─────────────────────────────────────────────────┐
│  CYCLE: Research → Mockup Renewal               │
│                                                 │
│  ① Audit     현재 상태 분석 (코드/디자인/성능)      │
│      ↓                                          │
│  ② Research  경쟁사/트렌드/기술 리서치              │
│      ↓                                          │
│  ③ Plan      개선안 도출 (우선순위 매김)             │
│      ↓                                          │
│  ④ Build     React 목업 제작/업데이트               │
│      ↓                                          │
│  ⑤ Review    브라우저에서 검증 + 피드백              │
│      ↓                                          │
│  ⑥ Iterate   피드백 반영 → ①로 돌아감              │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

## 사용법

Claude에게 다음과 같이 요청하면 됩니다:

### 새 사이클 시작
> "포트폴리오 리뉴얼 사이클 돌려줘"
> "리서치하고 목업 업데이트해줘"

### 특정 단계만 실행
> "경쟁사 리서치만 해줘" → ② Research 단계만 실행
> "현재 목업 성능 체크해줘" → ① Audit 단계만 실행
> "리서치 결과 반영해서 목업 수정해줘" → ④ Build 단계만 실행

### 특정 영역 집중
> "모바일 반응형 개선 사이클 돌려줘"
> "애니메이션 트렌드 리서치 후 적용해줘"
> "SEO 최적화 리서치하고 반영해줘"

---

## 각 단계 상세

### ① Audit (현재 상태 분석)
- Lighthouse 성능/접근성/SEO 점수 체크
- 코드 품질 분석 (중복, 미사용 코드)
- 반응형 디자인 테스트 (320px ~ 2560px)
- 이전 사이클 대비 개선/퇴보 확인

### ② Research (리서치)
- **경쟁사 분석**: Awwwards, Behance, Dribbble 트렌드
- **기술 리서치**: 최신 React 패턴, 애니메이션 라이브러리
- **UX 리서치**: 사용자 행동 패턴, 접근성 가이드라인
- **성능 리서치**: Core Web Vitals 최적화 기법

### ③ Plan (개선안)
- 리서치 결과를 바탕으로 구체적 개선 항목 도출
- 우선순위 매김 (Critical → Major → Minor)
- 예상 작업 범위 산정

### ④ Build (목업 제작)
- portfolio_v2.jsx 업데이트
- 새 컴포넌트/섹션 추가
- 디자인 시스템 일관성 유지

### ⑤ Review (검증)
- 브라우저에서 실제 렌더링 확인
- 인터랙션 테스트 (hover, scroll, dark mode)
- 크로스 브라우저 체크

### ⑥ Iterate (반복)
- 피드백 수집 및 반영
- 버전 히스토리 관리
- 다음 사이클 계획

---

## 버전 히스토리

| Version | Date       | Changes                          |
|---------|------------|----------------------------------|
| v2.0    | 2026-03-10 | React 목업 초안 (다크모드, 반응형, 접근성) |
| v2.1    | 2026-03-11 | HTML 변환 (portfolio_v2.html) |
| v3.0    | 2026-03-11 | 심화 리서치 기반 대규모 리뉴얼 |

### v3.0 변경사항 상세
- 스크롤 프로그레스 인디케이터 추가
- 마르키 텍스트 슬라이더 (2026 트렌드)
- 프로젝트 클릭 시 케이스 스터디 모달 (메트릭스 + 상세)
- 숫자 카운트업 애니메이션 (AnimatedNumber)
- About 섹션 + 스킬 바 시각화 추가
- Nav에 About 링크 추가
- 모달 ESC 키 닫기, body scroll lock
- 프로젝트 카드에 연도 배지 추가
- 전반적 타이포/간격 미세조정

---

## 파일 구조

```
#Coding/
├── portfolio_v3.jsx       ← ★ 최신 React 목업 (v3)
├── portfolio_v2.jsx       ← React 목업 (v2)
├── portfolio_v2.html      ← HTML 변환본 (v2.1)
├── WORKFLOW.md             ← 이 문서 (워크플로우 가이드)
├── portfolio.html          ← 원본 (AntiGravity 제작)
├── index.html              ← GreenJet 원본
├── project.html            ← GreenJet 상세 원본
├── seed_archive.html       ← SEEDS 원본
└── children_camp.html      ← Little Explorers 원본
```
