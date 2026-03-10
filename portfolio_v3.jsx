import { useState, useEffect, useRef, useCallback } from "react";

// ─── Data ────────────────────────────────────────────────
const PROJECTS = [
  {
    id: "greenjet", num: "01", category: "Food-Tech Platform",
    title: "GreenJet", subtitle: "The Art of Purity",
    desc: "유기농 농가와 드론 물류를 결합한 초신선 이커머스 서비스 기획 및 브랜딩.",
    longDesc: "수확 후 15분 이내 드론 직송이라는 혁신적 콜드체인을 설계하고, 소비자가 농가의 이야기를 직접 확인할 수 있는 투명한 유통 경험을 구현했습니다.",
    tags: ["UX Strategy", "Branding", "Drone Logistics", "E-Commerce"],
    color: "#1A3026", accent: "#52B788",
    img: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1200&auto=format&fit=crop",
    metrics: [
      { label: "Delivery Time", value: "15", unit: "min", prefix: "" },
      { label: "Partner Farms", value: "12", unit: "", prefix: "" },
      { label: "Satisfaction", value: "98", unit: "%", prefix: "" },
    ],
    role: "Service Design & Brand Strategy",
    year: "2026",
  },
  {
    id: "seeds", num: "02", category: "Digital Archive",
    title: "SEEDS", subtitle: "The Silent Origins",
    desc: "사라져가는 토종 종자들을 기록하고 보존하는 하이엔드 인터랙티브 도감.",
    longDesc: "멸종 위기 토종 종자 47종의 데이터를 수집하고, 마우스 인터랙션과 패럴랙스를 활용한 몰입형 아카이브 경험을 설계했습니다.",
    tags: ["Interactive", "Data Visualization", "Archive", "GSAP"],
    color: "#0D0D0D", accent: "#C5A368",
    img: "https://images.unsplash.com/photo-1505235687559-28b5f54645b7?q=80&w=1200&auto=format&fit=crop",
    metrics: [
      { label: "Species Archived", value: "47", unit: "", prefix: "" },
      { label: "Regions Covered", value: "8", unit: "", prefix: "" },
      { label: "Avg. Session", value: "4.2", unit: "min", prefix: "" },
    ],
    role: "Interactive Design & Data Architecture",
    year: "2026",
  },
  {
    id: "explorers", num: "03", category: "Premium Kids Camp",
    title: "Little Explorers", subtitle: "The Great Discovery",
    desc: "자연 결핍 시대의 아이들을 위한 숲 체험 및 생태 교육 캠프 기획.",
    longDesc: "계절별 자연 커리큘럼과 실시간 보호자 관제 시스템(Guardian Sync)을 결합한 프리미엄 자연 교육 서비스를 기획했습니다.",
    tags: ["Service Design", "Education", "Nature", "Real-time"],
    color: "#2D4032", accent: "#A67C52",
    img: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=1200&auto=format&fit=crop",
    metrics: [
      { label: "Programs", value: "3", unit: "", prefix: "" },
      { label: "Guardian Sync", value: "Real", unit: "-time", prefix: "" },
      { label: "Repeat Rate", value: "87", unit: "%", prefix: "" },
    ],
    role: "Service Planning & UX Design",
    year: "2026",
  },
  {
    id: "proposal", num: "04", category: "Strategy Document",
    title: "GreenJet Proposal", subtitle: "Business Blueprint",
    desc: "사업 개요, 타겟 분석, 수익 모델을 담은 비즈니스 로드맵 원문.",
    longDesc: "시장 규모 분석부터 수익 모델 설계, 단계별 실행 전략까지 포함한 24페이지 분량의 종합 비즈니스 제안서를 작성했습니다.",
    tags: ["Business Strategy", "Market Analysis", "Revenue Model"],
    color: "#1A3026", accent: "#1A3026",
    img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop",
    metrics: [
      { label: "Pages", value: "24", unit: "p", prefix: "" },
      { label: "Sections", value: "6", unit: "", prefix: "" },
      { label: "TAM Estimate", value: "2.4", unit: "T", prefix: "₩" },
    ],
    role: "Business Planning & Analysis",
    year: "2026",
  },
];

const METHODS = [
  { num: "01", title: "Research", desc: "시장 데이터와 사용자 경험을 분석하여 비즈니스의 핵심 가치를 정의합니다.", icon: "book" },
  { num: "02", title: "Design", desc: "하이엔드 브랜드의 시각적 언어를 사용하여 신뢰와 감동의 인터페이스를 구축합니다.", icon: "leaf" },
  { num: "03", title: "Integration", desc: "최신 기술을 결합하여 실제로 작동하는 디지털 환경을 완성합니다.", icon: "zap" },
];

const SKILLS = [
  { name: "React / Next.js", level: 90 },
  { name: "UI/UX Design", level: 95 },
  { name: "Brand Strategy", level: 88 },
  { name: "GSAP / Motion", level: 82 },
  { name: "Data Visualization", level: 78 },
  { name: "Service Design", level: 92 },
];

// ─── Hooks ───────────────────────────────────────────────
function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setVis(true); return; }
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.unobserve(el); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, vis];
}

function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const h = document.documentElement.scrollHeight - window.innerHeight;
          setProgress(h > 0 ? window.scrollY / h : 0);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return progress;
}

// ─── Icon Components ─────────────────────────────────────
const Icons = {
  moon: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>,
  sun: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>,
  menu: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
  x: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  arrowUpRight: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>,
  arrowRight: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
  chevronDown: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>,
  book: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>,
  leaf: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.9C15.5 4.9 17 3.5 19 2c1 2 2 4.5 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>,
  zap: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  close: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
};

// ─── Animated Number Counter ─────────────────────────────
function AnimatedNumber({ value, prefix = "", unit = "" }) {
  const [display, setDisplay] = useState("0");
  const [ref, vis] = useReveal(0.3);
  const numericPart = parseFloat(value);
  const isNumeric = !isNaN(numericPart);

  useEffect(() => {
    if (!vis || !isNumeric) { setDisplay(value); return; }
    const duration = 1200;
    const start = performance.now();
    const isFloat = value.includes(".");
    const tick = (now) => {
      const elapsed = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - elapsed, 3);
      const current = eased * numericPart;
      setDisplay(isFloat ? current.toFixed(1) : Math.round(current).toString());
      if (elapsed < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [vis, value, numericPart, isNumeric]);

  return <span ref={ref}>{prefix}{isNumeric ? display : value}{unit}</span>;
}

// ─── Components ──────────────────────────────────────────

function ScrollProgress({ progress, dark }) {
  return (
    <div style={{
      position: "fixed", top: 0, left: 0, width: "100%", height: 3, zIndex: 1001,
      background: dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
    }}>
      <div style={{
        height: "100%", width: `${progress * 100}%`,
        background: dark ? "#52B788" : "#1A3026",
        transition: "width 0.1s linear",
      }} />
    </div>
  );
}

function Nav({ dark, setDark }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) { requestAnimationFrame(() => { setScrolled(window.scrollY > 60); ticking = false; }); ticking = true; }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Work", href: "#work" },
    { label: "About", href: "#about" },
    { label: "Method", href: "#method" },
    { label: "Contact", href: "#contact" },
  ];

  const px = "clamp(24px, 5vw, 80px)";

  return (
    <nav aria-label="Main navigation" style={{
      position: "fixed", top: 0, left: 0, width: "100%", zIndex: 1000,
      padding: `0 ${px}`, height: 72,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      background: scrolled ? (dark ? "rgba(13,13,13,0.92)" : "rgba(255,255,255,0.92)") : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? `1px solid ${dark ? "rgba(255,255,255,0.08)" : "#eee"}` : "none",
      transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
    }}>
      <a href="#" style={{
        fontFamily: "'Bodoni Moda', serif", fontSize: "1.1rem",
        letterSpacing: "0.4em", textDecoration: "none",
        color: dark ? "#f4f4f2" : "#121212", fontWeight: 700,
      }}>PORTFOLIO</a>

      <div style={{ display: "flex", alignItems: "center", gap: 40 }}>
        <ul className="nav-desktop" style={{ display: "flex", gap: 36, listStyle: "none", margin: 0, padding: 0 }}>
          {links.map(l => (
            <li key={l.href}>
              <a href={l.href} style={{
                textDecoration: "none", color: dark ? "#888" : "#999",
                fontSize: "0.72rem", letterSpacing: "0.15em", textTransform: "uppercase",
                fontFamily: "'Bodoni Moda', serif", transition: "color 0.3s",
              }}
                onMouseEnter={e => e.target.style.color = dark ? "#fff" : "#000"}
                onMouseLeave={e => e.target.style.color = dark ? "#888" : "#999"}
              >{l.label}</a>
            </li>
          ))}
        </ul>

        <button onClick={() => setDark(!dark)}
          aria-label={dark ? "라이트 모드로 전환" : "다크 모드로 전환"}
          style={{
            background: "none", border: `1px solid ${dark ? "rgba(255,255,255,0.12)" : "#ddd"}`,
            borderRadius: 99, width: 38, height: 38,
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", color: dark ? "#f4f4f2" : "#121212", transition: "all 0.3s",
          }}>
          {dark ? <Icons.sun /> : <Icons.moon />}
        </button>

        <button className="nav-mobile-btn" onClick={() => setOpen(!open)}
          aria-label={open ? "메뉴 닫기" : "메뉴 열기"} aria-expanded={open}
          style={{ display: "none", background: "none", border: "none", color: dark ? "#f4f4f2" : "#121212", cursor: "pointer" }}>
          {open ? <Icons.x /> : <Icons.menu />}
        </button>
      </div>

      {open && (
        <div role="dialog" aria-label="Mobile navigation" style={{
          position: "fixed", top: 72, left: 0, width: "100%", height: "calc(100dvh - 72px)",
          background: dark ? "#0d0d0d" : "#fff",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 36, zIndex: 999,
        }}>
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} style={{
              textDecoration: "none", color: dark ? "#f4f4f2" : "#121212",
              fontSize: "1.4rem", fontFamily: "'Bodoni Moda', serif",
              letterSpacing: "0.2em", textTransform: "uppercase",
            }}>{l.label}</a>
          ))}
        </div>
      )}
    </nav>
  );
}

function Marquee({ dark }) {
  const text = "GreenJet — SEEDS Archive — Little Explorers — Strategy — ";
  return (
    <div aria-hidden="true" style={{
      overflow: "hidden", whiteSpace: "nowrap",
      borderTop: `1px solid ${dark ? "rgba(255,255,255,0.06)" : "#eee"}`,
      borderBottom: `1px solid ${dark ? "rgba(255,255,255,0.06)" : "#eee"}`,
      padding: "18px 0",
      background: dark ? "#111" : "#fff",
    }}>
      <div style={{
        display: "inline-block",
        animation: "marquee 30s linear infinite",
        fontFamily: "'Bodoni Moda', serif", fontSize: "clamp(1rem, 2.5vw, 1.4rem)",
        letterSpacing: "0.15em", textTransform: "uppercase",
        color: dark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.1)",
        fontWeight: 400,
      }}>
        {text.repeat(6)}
      </div>
    </div>
  );
}

function Hero({ dark }) {
  const [ref, vis] = useReveal(0.1);
  const [mx, setMx] = useState({ x: 0, y: 0 });

  return (
    <section ref={ref} aria-label="Hero introduction"
      onMouseMove={e => {
        const r = e.currentTarget.getBoundingClientRect();
        setMx({ x: ((e.clientX - r.left) / r.width - 0.5) * 24, y: ((e.clientY - r.top) / r.height - 0.5) * 24 });
      }}
      style={{
        minHeight: "100dvh", display: "flex", flexDirection: "column", justifyContent: "center",
        padding: "120px clamp(24px, 5vw, 80px) 80px", position: "relative", overflow: "hidden",
        background: dark ? "#0d0d0d" : "#f4f4f2",
      }}>
      {/* Floating orb */}
      <div aria-hidden="true" style={{
        position: "absolute", right: "8%", top: "15%",
        width: "45vw", height: "45vw", maxWidth: 650, maxHeight: 650, borderRadius: "50%",
        background: dark
          ? "radial-gradient(circle, rgba(82,183,136,0.1) 0%, transparent 60%)"
          : "radial-gradient(circle, rgba(26,48,38,0.07) 0%, transparent 60%)",
        transform: `translate(${mx.x}px, ${mx.y}px)`,
        transition: "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)", pointerEvents: "none",
      }} />

      <div style={{
        opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(50px)",
        transition: "all 1.4s cubic-bezier(0.16, 1, 0.3, 1)",
      }}>
        <p style={{
          fontFamily: "'Bodoni Moda', serif", textTransform: "uppercase",
          letterSpacing: "0.3em", fontSize: "0.68rem",
          color: dark ? "#555" : "#aaa", marginBottom: 36,
        }}>Creative Strategist / Seoul 2026</p>

        <h1 style={{
          fontFamily: "'Bodoni Moda', serif", fontWeight: 400,
          fontSize: "clamp(2.8rem, 9vw, 7.5rem)", lineHeight: 0.88,
          color: dark ? "#f4f4f2" : "#121212",
        }}>
          Curation of
          <span style={{ display: "block", fontStyle: "italic", color: dark ? "#52B788" : "#1A3026", opacity: 0.85 }}>
            Digital Experience
          </span>
        </h1>

        <p style={{
          maxWidth: 480, fontSize: "1rem", fontWeight: 300,
          color: dark ? "#777" : "#666", marginTop: 36, lineHeight: 1.75,
        }}>
          비즈니스 기획부터 하이엔드 웹 인터페이스까지,
          기술과 자연의 조화를 탐구하는 디지털 아카이브입니다.
        </p>

        <div style={{ marginTop: 52, display: "flex", alignItems: "center", gap: 8, color: dark ? "#444" : "#bbb" }}>
          <Icons.chevronDown />
          <span style={{
            fontFamily: "'Bodoni Moda', serif", fontSize: "0.68rem",
            letterSpacing: "0.2em", textTransform: "uppercase",
          }}>Scroll to explore</span>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, dark, index, onExpand }) {
  const [ref, vis] = useReveal(0.1);
  const [hovered, setHovered] = useState(false);

  return (
    <article ref={ref}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      onClick={() => onExpand(project.id)}
      aria-label={`${project.title} 프로젝트`}
      style={{
        cursor: "pointer", position: "relative", overflow: "hidden",
        border: `1px solid ${dark ? "rgba(255,255,255,0.06)" : "#eee"}`, borderRadius: 6,
        background: hovered ? (dark ? "rgba(255,255,255,0.02)" : "#fafafa") : "transparent",
        opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(40px)",
        transition: `all 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.12}s`,
      }}>
      {/* Image */}
      <div style={{ width: "100%", aspectRatio: "16/10", overflow: "hidden", position: "relative" }}>
        <img src={project.img} alt={`${project.title} - ${project.desc}`}
          loading={index < 2 ? "eager" : "lazy"} width={1200} height={750}
          style={{
            width: "100%", height: "100%", objectFit: "cover",
            transform: hovered ? "scale(1.04)" : "scale(1)",
            transition: "transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
            filter: dark ? "brightness(0.75)" : "none",
          }} />
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: "50%",
          background: "linear-gradient(transparent, rgba(0,0,0,0.45))", pointerEvents: "none",
        }} />
        <span style={{
          position: "absolute", top: 16, left: 16,
          fontFamily: "'Bodoni Moda', serif", textTransform: "uppercase",
          letterSpacing: "0.18em", fontSize: "0.62rem", color: "#fff",
          background: "rgba(0,0,0,0.35)", padding: "5px 12px", borderRadius: 99,
          backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)", zIndex: 2,
        }}>{project.num}. {project.category}</span>
        {/* Year badge */}
        <span style={{
          position: "absolute", top: 16, right: 16,
          fontFamily: "'Bodoni Moda', serif", fontSize: "0.6rem", letterSpacing: "0.15em",
          color: "rgba(255,255,255,0.6)", zIndex: 2,
        }}>{project.year}</span>
      </div>

      {/* Content */}
      <div style={{ padding: "24px 24px 20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <h3 style={{
              fontFamily: "'Bodoni Moda', serif", fontSize: "1.8rem", fontWeight: 400,
              color: dark ? "#f4f4f2" : "#121212", marginBottom: 6,
            }}>{project.title}</h3>
            <p style={{ fontSize: "0.85rem", fontWeight: 300, lineHeight: 1.6, color: dark ? "#777" : "#666", maxWidth: 380 }}>
              {project.desc}
            </p>
          </div>
          <div style={{
            width: 42, height: 42, borderRadius: "50%",
            border: `1px solid ${dark ? "rgba(255,255,255,0.12)" : "#ddd"}`,
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginLeft: 12,
            transform: hovered ? "translate(3px, -3px)" : "translate(0, 0)",
            transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
            color: dark ? "#f4f4f2" : "#121212",
          }}><Icons.arrowUpRight /></div>
        </div>

        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 16 }}>
          {project.tags.slice(0, 3).map(t => (
            <span key={t} style={{
              fontSize: "0.6rem", letterSpacing: "0.08em", textTransform: "uppercase",
              padding: "3px 10px", borderRadius: 99,
              border: `1px solid ${dark ? "rgba(255,255,255,0.08)" : "#ddd"}`,
              color: dark ? "#888" : "#777", fontFamily: "'Bodoni Moda', serif",
            }}>{t}</span>
          ))}
        </div>
      </div>
    </article>
  );
}

function ProjectModal({ project, dark, onClose }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [onClose]);

  if (!project) return null;

  return (
    <div onClick={onClose} role="dialog" aria-label={`${project.title} 상세`}
      style={{
        position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: 2000,
        background: dark ? "rgba(0,0,0,0.85)" : "rgba(0,0,0,0.6)",
        backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "clamp(16px, 3vw, 40px)",
        animation: "fadeIn 0.3s ease",
      }}>
      <div onClick={e => e.stopPropagation()} style={{
        width: "100%", maxWidth: 780, maxHeight: "85vh", overflowY: "auto",
        background: dark ? "#1a1a1a" : "#fff", borderRadius: 8,
        border: `1px solid ${dark ? "rgba(255,255,255,0.08)" : "#eee"}`,
        animation: "slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
      }}>
        {/* Header image */}
        <div style={{ position: "relative", aspectRatio: "16/8", overflow: "hidden" }}>
          <img src={project.img} alt={project.title}
            style={{ width: "100%", height: "100%", objectFit: "cover", filter: dark ? "brightness(0.7)" : "none" }} />
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0, height: "60%",
            background: `linear-gradient(transparent, ${dark ? "#1a1a1a" : "#fff"})`,
          }} />
          <button onClick={onClose} aria-label="닫기" style={{
            position: "absolute", top: 16, right: 16,
            width: 36, height: 36, borderRadius: "50%",
            background: "rgba(0,0,0,0.4)", border: "none",
            color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
          }}><Icons.close /></button>
        </div>

        {/* Body */}
        <div style={{ padding: "0 clamp(24px, 4vw, 48px) 40px" }}>
          <div style={{ marginTop: -20, position: "relative", zIndex: 1 }}>
            <span style={{
              fontFamily: "'Bodoni Moda', serif", textTransform: "uppercase",
              letterSpacing: "0.2em", fontSize: "0.65rem",
              color: dark ? "#52B788" : "#1A3026",
            }}>{project.num}. {project.category}</span>
            <h2 style={{
              fontFamily: "'Bodoni Moda', serif", fontSize: "clamp(2rem, 5vw, 3rem)",
              fontWeight: 400, color: dark ? "#f4f4f2" : "#121212", margin: "8px 0 4px",
            }}>{project.title}</h2>
            <p style={{ fontSize: "0.8rem", color: dark ? "#666" : "#999", marginBottom: 24 }}>
              {project.role} · {project.year}
            </p>
          </div>

          <p style={{
            fontSize: "1rem", fontWeight: 300, lineHeight: 1.8,
            color: dark ? "#aaa" : "#555", marginBottom: 40,
          }}>{project.longDesc}</p>

          {/* Metrics Grid */}
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1,
            background: dark ? "rgba(255,255,255,0.06)" : "#eee",
            borderRadius: 6, overflow: "hidden", marginBottom: 32,
          }}>
            {project.metrics.map(m => (
              <div key={m.label} style={{
                padding: "28px 20px", textAlign: "center",
                background: dark ? "#1a1a1a" : "#fff",
              }}>
                <div style={{
                  fontFamily: "'Bodoni Moda', serif", fontSize: "2rem", fontWeight: 400,
                  color: dark ? "#f4f4f2" : "#121212", marginBottom: 4,
                }}>
                  <AnimatedNumber value={m.value} prefix={m.prefix} unit={m.unit} />
                </div>
                <div style={{
                  fontFamily: "'Bodoni Moda', serif", fontSize: "0.6rem",
                  letterSpacing: "0.15em", textTransform: "uppercase",
                  color: dark ? "#666" : "#999",
                }}>{m.label}</div>
              </div>
            ))}
          </div>

          {/* Tags */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {project.tags.map(t => (
              <span key={t} style={{
                fontSize: "0.62rem", letterSpacing: "0.1em", textTransform: "uppercase",
                padding: "5px 14px", borderRadius: 99,
                border: `1px solid ${dark ? "rgba(255,255,255,0.1)" : "#ddd"}`,
                color: dark ? "#999" : "#666", fontFamily: "'Bodoni Moda', serif",
              }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function WorkSection({ dark, onExpand }) {
  const [ref, vis] = useReveal(0.06);
  return (
    <section id="work" ref={ref} aria-labelledby="work-title" style={{
      padding: "120px clamp(24px, 5vw, 80px)", background: dark ? "#111" : "#fff",
    }}>
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "flex-end",
        marginBottom: 60, paddingBottom: 20,
        borderBottom: `1px solid ${dark ? "rgba(255,255,255,0.1)" : "#121212"}`,
        opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(30px)",
        transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1)",
      }}>
        <h2 id="work-title" style={{
          fontFamily: "'Bodoni Moda', serif", fontSize: "clamp(2rem, 5vw, 3rem)",
          fontWeight: 400, textTransform: "uppercase", color: dark ? "#f4f4f2" : "#121212",
        }}>Selected Work</h2>
        <span style={{
          fontFamily: "'Bodoni Moda', serif", fontSize: "0.68rem",
          letterSpacing: "0.2em", textTransform: "uppercase", color: dark ? "#555" : "#aaa",
        }}>{PROJECTS.length} Projects</span>
      </div>
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 400px), 1fr))",
        gap: "clamp(16px, 2.5vw, 36px)",
      }}>
        {PROJECTS.map((p, i) => <ProjectCard key={p.id} project={p} dark={dark} index={i} onExpand={onExpand} />)}
      </div>
    </section>
  );
}

function AboutSection({ dark }) {
  const [ref, vis] = useReveal(0.1);
  return (
    <section id="about" ref={ref} aria-labelledby="about-title" style={{
      padding: "120px clamp(24px, 5vw, 80px)", background: dark ? "#0d0d0d" : "#f4f4f2",
    }}>
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 400px), 1fr))",
        gap: "clamp(40px, 5vw, 80px)", alignItems: "center",
        opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(40px)",
        transition: "all 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
      }}>
        {/* Left: Text */}
        <div>
          <span style={{
            fontFamily: "'Bodoni Moda', serif", textTransform: "uppercase",
            letterSpacing: "0.2em", fontSize: "0.68rem",
            color: dark ? "#52B788" : "#1A3026", display: "block", marginBottom: 16,
          }}>About</span>
          <h2 id="about-title" style={{
            fontFamily: "'Bodoni Moda', serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
            fontWeight: 400, color: dark ? "#f4f4f2" : "#121212", lineHeight: 1.2, marginBottom: 24,
          }}>자연과 기술 사이,<br />가치를 설계합니다.</h2>
          <p style={{
            fontSize: "0.95rem", fontWeight: 300, lineHeight: 1.8,
            color: dark ? "#888" : "#555", marginBottom: 32, maxWidth: 460,
          }}>
            서울을 기반으로 활동하는 디지털 전략가입니다.
            비즈니스 기획, UX 설계, 브랜드 아이덴티티를 아우르는
            통합적 접근으로 기술 기반 서비스의 사용자 경험을 설계합니다.
          </p>
          <p style={{
            fontSize: "0.95rem", fontWeight: 300, lineHeight: 1.8,
            color: dark ? "#888" : "#555", maxWidth: 460,
          }}>
            특히 농업·환경·교육 분야에서 기술이 자연과 공존하는
            지속 가능한 서비스를 탐구하고 있습니다.
          </p>
        </div>

        {/* Right: Skills */}
        <div style={{
          padding: "clamp(24px, 3vw, 40px)",
          border: `1px solid ${dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}`,
          borderRadius: 6,
        }}>
          <span style={{
            fontFamily: "'Bodoni Moda', serif", textTransform: "uppercase",
            letterSpacing: "0.15em", fontSize: "0.65rem",
            color: dark ? "#666" : "#999", display: "block", marginBottom: 28,
          }}>Core Skills</span>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {SKILLS.map(s => (
              <SkillBar key={s.name} skill={s} dark={dark} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SkillBar({ skill, dark }) {
  const [ref, vis] = useReveal(0.2);
  return (
    <div ref={ref}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        <span style={{ fontSize: "0.8rem", fontWeight: 400, color: dark ? "#ccc" : "#333" }}>{skill.name}</span>
        <span style={{
          fontFamily: "'Bodoni Moda', serif", fontSize: "0.75rem",
          color: dark ? "#666" : "#999",
        }}>{skill.level}%</span>
      </div>
      <div style={{
        width: "100%", height: 3, borderRadius: 2,
        background: dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
        overflow: "hidden",
      }}>
        <div style={{
          height: "100%", borderRadius: 2,
          width: vis ? `${skill.level}%` : "0%",
          background: dark ? "#52B788" : "#1A3026",
          transition: "width 1.4s cubic-bezier(0.16, 1, 0.3, 1)",
        }} />
      </div>
    </div>
  );
}

function MethodSection({ dark }) {
  const [ref, vis] = useReveal(0.1);
  return (
    <section id="method" ref={ref} aria-labelledby="method-title" style={{
      padding: "120px clamp(24px, 5vw, 80px)", background: dark ? "#111" : "#fff",
    }}>
      <div style={{
        opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(30px)",
        transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1)",
      }}>
        <span style={{
          fontFamily: "'Bodoni Moda', serif", textTransform: "uppercase",
          letterSpacing: "0.2em", fontSize: "0.68rem",
          color: dark ? "#52B788" : "#1A3026", display: "block", marginBottom: 16,
        }}>Our Methodology</span>
        <h2 id="method-title" style={{
          fontFamily: "'Bodoni Moda', serif", fontSize: "clamp(2rem, 5vw, 3.2rem)",
          fontWeight: 400, color: dark ? "#f4f4f2" : "#121212", marginBottom: 72,
        }}>How we build values.</h2>
      </div>
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))", gap: 32,
      }}>
        {METHODS.map((m, i) => {
          const [mRef, mVis] = useReveal(0.15);
          const Icon = Icons[m.icon];
          return (
            <div key={m.num} ref={mRef} style={{
              padding: 28, borderRadius: 6,
              border: `1px solid ${dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"}`,
              opacity: mVis ? 1 : 0, transform: mVis ? "translateY(0)" : "translateY(25px)",
              transition: `all 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.12}s`,
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: "50%",
                background: dark ? "rgba(82,183,136,0.08)" : "rgba(26,48,38,0.05)",
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: 20, color: dark ? "#52B788" : "#1A3026",
              }}><Icon /></div>
              <h3 style={{
                fontFamily: "'Bodoni Moda', serif", fontSize: "1.2rem",
                fontWeight: 400, color: dark ? "#f4f4f2" : "#121212", marginBottom: 10,
              }}>{m.num}. {m.title}</h3>
              <p style={{ fontSize: "0.85rem", color: dark ? "#777" : "#666", fontWeight: 300, lineHeight: 1.7 }}>{m.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function ContactSection({ dark }) {
  const [ref, vis] = useReveal(0.1);
  return (
    <section id="contact" ref={ref} aria-labelledby="contact-title" style={{
      padding: "140px clamp(24px, 5vw, 80px)", textAlign: "center",
      background: dark ? "#0d0d0d" : "#f4f4f2",
    }}>
      <div style={{
        maxWidth: 580, margin: "0 auto",
        opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(30px)",
        transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1)",
      }}>
        <span style={{
          fontFamily: "'Bodoni Moda', serif", textTransform: "uppercase",
          letterSpacing: "0.2em", fontSize: "0.68rem",
          color: dark ? "#52B788" : "#1A3026", display: "block", marginBottom: 16,
        }}>Get in Touch</span>
        <h2 id="contact-title" style={{
          fontFamily: "'Bodoni Moda', serif", fontSize: "clamp(2rem, 5vw, 3.2rem)",
          fontWeight: 400, color: dark ? "#f4f4f2" : "#121212", marginBottom: 20,
        }}>Let's Create Together.</h2>
        <p style={{
          fontSize: "1rem", fontWeight: 300, lineHeight: 1.75,
          color: dark ? "#777" : "#666", marginBottom: 44,
        }}>새로운 프로젝트나 협업에 관심이 있으시다면 언제든 연락해주세요.</p>
        <a href="mailto:hello@portfolio.com" style={{
          display: "inline-flex", alignItems: "center", gap: 10,
          padding: "16px 44px", borderRadius: 99,
          background: dark ? "#f4f4f2" : "#121212", color: dark ? "#0d0d0d" : "#fff",
          textDecoration: "none", fontSize: "0.78rem",
          letterSpacing: "0.15em", textTransform: "uppercase",
          fontFamily: "'Bodoni Moda', serif",
          transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
          onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.15)"; }}
          onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
        >Contact Me <Icons.arrowRight /></a>
      </div>
    </section>
  );
}

function Footer({ dark }) {
  return (
    <footer role="contentinfo" style={{
      padding: "56px clamp(24px, 5vw, 80px)",
      borderTop: `1px solid ${dark ? "rgba(255,255,255,0.06)" : "#eee"}`,
      display: "flex", justifyContent: "space-between", alignItems: "center",
      flexWrap: "wrap", gap: 20, background: dark ? "#111" : "#fff",
    }}>
      <span style={{
        fontFamily: "'Bodoni Moda', serif", fontSize: "0.68rem",
        letterSpacing: "0.15em", textTransform: "uppercase",
        color: dark ? "#555" : "#aaa",
      }}>© 2026 Portfolio. Seoul, Republic of Korea</span>
      <div style={{ display: "flex", gap: 28 }}>
        {["Instagram", "YouTube", "GitHub"].map(s => (
          <a key={s} href="#" aria-label={`${s} 프로필로 이동`} style={{
            fontFamily: "'Bodoni Moda', serif", fontSize: "0.68rem",
            letterSpacing: "0.12em", textTransform: "uppercase",
            textDecoration: "none", color: dark ? "#555" : "#aaa", transition: "color 0.3s",
          }}
            onMouseEnter={e => e.target.style.color = dark ? "#f4f4f2" : "#121212"}
            onMouseLeave={e => e.target.style.color = dark ? "#555" : "#aaa"}
          >{s}</a>
        ))}
      </div>
    </footer>
  );
}

// ─── Main App ────────────────────────────────────────────
export default function PortfolioV3() {
  const [dark, setDark] = useState(false);
  const [expandedId, setExpandedId] = useState(null);
  const progress = useScrollProgress();

  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDark(prefersDark);
  }, []);

  const expandedProject = PROJECTS.find(p => p.id === expandedId) || null;
  const handleExpand = useCallback((id) => setExpandedId(id), []);
  const handleClose = useCallback(() => setExpandedId(null), []);

  return (
    <div style={{
      background: dark ? "#0d0d0d" : "#fff",
      color: dark ? "#f4f4f2" : "#121212",
      fontFamily: "'Noto Sans KR', -apple-system, BlinkMacSystemFont, sans-serif",
      transition: "background 0.5s, color 0.5s", minHeight: "100vh",
    }}>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400;0,6..96,700;1,6..96,400&family=Noto+Sans+KR:wght@100;300;400;500;700&display=swap" />
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { overflow-x: hidden; word-break: keep-all; }
        ::selection { background: ${dark ? "#52B788" : "#1A3026"}; color: #fff; }
        :focus-visible { outline: 2px solid ${dark ? "#52B788" : "#1A3026"}; outline-offset: 4px; border-radius: 2px; }
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-btn { display: flex !important; }
        }
        @media (min-width: 769px) { .nav-mobile-btn { display: none !important; } }
        @media (prefers-reduced-motion: reduce) {
          * { transition-duration: 0.01ms !important; animation-duration: 0.01ms !important; }
        }
      `}</style>

      <a href="#main-content" style={{
        position: "absolute", top: "-100%", left: 0,
        background: "#000", color: "#fff", padding: "12px 24px",
        zIndex: 9999, fontSize: "0.875rem", textDecoration: "none",
      }}
        onFocus={e => e.target.style.top = "0"}
        onBlur={e => e.target.style.top = "-100%"}
      >메인 콘텐츠로 건너뛰기</a>

      <ScrollProgress progress={progress} dark={dark} />
      <Nav dark={dark} setDark={setDark} />

      <main id="main-content">
        <Hero dark={dark} />
        <Marquee dark={dark} />
        <WorkSection dark={dark} onExpand={handleExpand} />
        <AboutSection dark={dark} />
        <MethodSection dark={dark} />
        <ContactSection dark={dark} />
      </main>

      <Footer dark={dark} />

      {expandedProject && (
        <ProjectModal project={expandedProject} dark={dark} onClose={handleClose} />
      )}
    </div>
  );
}
