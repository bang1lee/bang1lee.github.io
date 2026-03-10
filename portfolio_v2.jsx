import { useState, useEffect, useRef } from "react";
import { Camera, ArrowRight, ArrowUpRight, Moon, Sun, Menu, X, Leaf, Truck, BookOpen, MapPin, ChevronDown } from "lucide-react";

// ─── Theme & Config ──────────────────────────────────────
const PROJECTS = [
  {
    id: "greenjet",
    num: "01",
    category: "Food-Tech Platform",
    title: "GreenJet",
    subtitle: "The Art of Purity",
    desc: "유기농 농가와 드론 물류를 결합한 초신선 이커머스 서비스 기획 및 브랜딩.",
    tags: ["UX Strategy", "Branding", "Drone Logistics"],
    color: "#1A3026",
    accent: "#52B788",
    img: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1200&auto=format&fit=crop",
    metrics: { deliveryTime: "15min", farms: 12, satisfaction: "98%" },
    featured: true,
  },
  {
    id: "seeds",
    num: "02",
    category: "Digital Archive",
    title: "SEEDS",
    subtitle: "The Silent Origins",
    desc: "사라져가는 토종 종자들을 기록하고 보존하는 하이엔드 인터랙티브 도감.",
    tags: ["Interactive", "Data Viz", "Archive"],
    color: "#0D0D0D",
    accent: "#C5A368",
    img: "https://images.unsplash.com/photo-1505235687559-28b5f54645b7?q=80&w=1200&auto=format&fit=crop",
    metrics: { species: 47, regions: 8, status: "Active" },
    featured: true,
  },
  {
    id: "explorers",
    num: "03",
    category: "Premium Kids Camp",
    title: "Little Explorers",
    subtitle: "The Great Discovery",
    desc: "자연 결핍 시대의 아이들을 위한 숲 체험 및 생태 교육 캠프 기획.",
    tags: ["Service Design", "Education", "Nature"],
    color: "#2D4032",
    accent: "#A67C52",
    img: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=1200&auto=format&fit=crop",
    metrics: { programs: 3, camps: "Seasonal", guardian: "Real-time" },
    featured: false,
  },
  {
    id: "proposal",
    num: "04",
    category: "Strategy Document",
    title: "GreenJet Proposal",
    subtitle: "Business Blueprint",
    desc: "사업 개요, 타겟 분석, 수익 모델을 담은 비즈니스 로드맵 원문.",
    tags: ["Business Strategy", "Market Analysis", "Revenue Model"],
    color: "#1A3026",
    accent: "#1A3026",
    img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop",
    metrics: { pages: 24, sections: 6, status: "Complete" },
    featured: false,
  },
];

const METHODS = [
  { num: "01", title: "Research", desc: "시장 데이터와 사용자 경험을 분석하여 비즈니스의 핵심 가치를 정의합니다.", icon: BookOpen },
  { num: "02", title: "Design", desc: "하이엔드 브랜드의 시각적 언어를 사용하여 신뢰와 감동의 인터페이스를 구축합니다.", icon: Leaf },
  { num: "03", title: "Integration", desc: "최신 기술을 결합하여 실제로 작동하는 디지털 환경을 완성합니다.", icon: Truck },
];

// ─── Custom Hook: Intersection Observer ──────────────────
function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setVisible(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return [ref, visible];
}

// ─── Components ──────────────────────────────────────────

function SkipNav() {
  return (
    <a
      href="#main-content"
      className="skip-nav"
      style={{
        position: "absolute", top: "-100%", left: 0,
        background: "#000", color: "#fff", padding: "12px 24px",
        zIndex: 9999, fontSize: "0.875rem",
        transition: "top 0.2s",
      }}
      onFocus={(e) => { e.target.style.top = "0"; }}
      onBlur={(e) => { e.target.style.top = "-100%"; }}
    >
      메인 콘텐츠로 건너뛰기
    </a>
  );
}

function Nav({ dark, setDark }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const bg = dark
    ? scrolled ? "rgba(13,13,13,0.92)" : "transparent"
    : scrolled ? "rgba(255,255,255,0.92)" : "transparent";

  const navLinks = [
    { label: "Work", href: "#work" },
    { label: "Method", href: "#method" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav
      aria-label="Main navigation"
      style={{
        position: "fixed", top: 0, left: 0, width: "100%", zIndex: 1000,
        padding: "0 clamp(24px, 5vw, 80px)",
        height: 72, display: "flex", alignItems: "center", justifyContent: "space-between",
        background: bg, backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? `1px solid ${dark ? "rgba(255,255,255,0.08)" : "#eee"}` : "none",
        transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      <a
        href="#"
        aria-label="Portfolio home"
        style={{
          fontFamily: "'Bodoni Moda', serif", fontSize: "1.1rem",
          letterSpacing: "0.4em", textDecoration: "none",
          color: dark ? "#f4f4f2" : "#121212", fontWeight: 700,
        }}
      >
        PORTFOLIO
      </a>

      {/* Desktop Nav */}
      <div style={{ display: "flex", alignItems: "center", gap: 48 }}>
        <ul style={{
          display: "flex", gap: 40, listStyle: "none", margin: 0, padding: 0,
        }}
          className="nav-desktop"
        >
          {navLinks.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                style={{
                  textDecoration: "none", color: dark ? "#999" : "#666",
                  fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase",
                  fontFamily: "'Bodoni Moda', serif", transition: "color 0.3s",
                }}
                onMouseEnter={(e) => e.target.style.color = dark ? "#fff" : "#000"}
                onMouseLeave={(e) => e.target.style.color = dark ? "#999" : "#666"}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDark(!dark)}
          aria-label={dark ? "라이트 모드로 전환" : "다크 모드로 전환"}
          style={{
            background: "none", border: `1px solid ${dark ? "rgba(255,255,255,0.15)" : "#ddd"}`,
            borderRadius: 99, width: 40, height: 40,
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", color: dark ? "#f4f4f2" : "#121212",
            transition: "all 0.3s",
          }}
        >
          {dark ? <Sun size={16} /> : <Moon size={16} />}
        </button>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setOpen(!open)}
          aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
          aria-expanded={open}
          className="nav-mobile-btn"
          style={{
            display: "none", background: "none", border: "none",
            color: dark ? "#f4f4f2" : "#121212", cursor: "pointer",
          }}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {open && (
        <div
          role="dialog"
          aria-label="Mobile navigation"
          style={{
            position: "fixed", top: 72, left: 0, width: "100%", height: "calc(100vh - 72px)",
            background: dark ? "#0d0d0d" : "#fff",
            display: "flex", flexDirection: "column", alignItems: "center",
            justifyContent: "center", gap: 40, zIndex: 999,
          }}
        >
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              style={{
                textDecoration: "none", color: dark ? "#f4f4f2" : "#121212",
                fontSize: "1.5rem", fontFamily: "'Bodoni Moda', serif",
                letterSpacing: "0.2em", textTransform: "uppercase",
              }}
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

function Hero({ dark }) {
  const [ref, visible] = useReveal(0.1);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 20,
    });
  };

  return (
    <section
      ref={ref}
      onMouseMove={handleMouse}
      aria-label="Hero introduction"
      style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        justifyContent: "center", padding: "120px clamp(24px, 5vw, 80px) 80px",
        position: "relative", overflow: "hidden",
        background: dark ? "#0d0d0d" : "#f4f4f2",
      }}
    >
      {/* Floating accent circle */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute", right: "10%", top: "20%",
          width: "40vw", height: "40vw", maxWidth: 600, maxHeight: 600,
          borderRadius: "50%",
          background: dark
            ? "radial-gradient(circle, rgba(82,183,136,0.08) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(26,48,38,0.06) 0%, transparent 70%)",
          transform: `translate(${mousePos.x}px, ${mousePos.y}px)`,
          transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
          pointerEvents: "none",
        }}
      />

      <div style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(60px)",
        transition: "all 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
      }}>
        <p style={{
          fontFamily: "'Bodoni Moda', serif", textTransform: "uppercase",
          letterSpacing: "0.3em", fontSize: "0.7rem",
          color: dark ? "#666" : "#999", marginBottom: 32,
        }}>
          Creative Strategist / Seoul 2026
        </p>

        <h1 style={{
          fontFamily: "'Bodoni Moda', serif", fontWeight: 400,
          fontSize: "clamp(3rem, 10vw, 8rem)", lineHeight: 0.9,
          color: dark ? "#f4f4f2" : "#121212", marginBottom: 16,
        }}>
          Curation of
          <span style={{
            display: "block", fontStyle: "italic",
            color: dark ? "#52B788" : "#1A3026", opacity: 0.8,
          }}>
            Digital Experience
          </span>
        </h1>

        <p style={{
          maxWidth: 500, fontSize: "1.05rem", fontWeight: 300,
          color: dark ? "#888" : "#666", marginTop: 32, lineHeight: 1.7,
        }}>
          비즈니스 기획부터 하이엔드 웹 인터페이스까지,
          기술과 자연의 조화를 탐구하는 디지털 아카이브입니다.
        </p>

        <div style={{ marginTop: 48, display: "flex", alignItems: "center", gap: 8 }}>
          <ChevronDown size={16} color={dark ? "#666" : "#999"} />
          <span style={{
            fontFamily: "'Bodoni Moda', serif", fontSize: "0.7rem",
            letterSpacing: "0.2em", textTransform: "uppercase",
            color: dark ? "#666" : "#999",
          }}>
            Scroll to explore
          </span>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, dark, index }) {
  const [ref, visible] = useReveal(0.12);
  const [hovered, setHovered] = useState(false);
  const isFeatured = project.featured;

  return (
    <article
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      role="article"
      aria-label={`${project.title} 프로젝트`}
      style={{
        gridColumn: isFeatured ? "span 1" : "span 1",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: `all 1s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.15}s`,
        cursor: "pointer", position: "relative", overflow: "hidden",
        border: `1px solid ${dark ? "rgba(255,255,255,0.06)" : "#eee"}`,
        borderRadius: 4,
        background: hovered
          ? (dark ? "rgba(255,255,255,0.03)" : "#fafafa")
          : "transparent",
      }}
    >
      {/* Image Section */}
      <div style={{
        width: "100%", aspectRatio: isFeatured ? "16/10" : "16/9",
        overflow: "hidden", position: "relative",
      }}>
        <img
          src={project.img}
          alt={`${project.title} - ${project.desc}`}
          loading={index < 2 ? "eager" : "lazy"}
          width={1200} height={750}
          style={{
            width: "100%", height: "100%", objectFit: "cover",
            transform: hovered ? "scale(1.05)" : "scale(1)",
            transition: "transform 1.5s cubic-bezier(0.16, 1, 0.3, 1)",
            filter: dark ? "brightness(0.8)" : "none",
          }}
        />
        {/* Overlay gradient */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: "50%",
          background: "linear-gradient(transparent, rgba(0,0,0,0.4))",
          pointerEvents: "none",
        }} />
        {/* Category badge */}
        <span style={{
          position: "absolute", top: 20, left: 20,
          fontFamily: "'Bodoni Moda', serif", textTransform: "uppercase",
          letterSpacing: "0.2em", fontSize: "0.65rem",
          color: "#fff", background: "rgba(0,0,0,0.4)",
          padding: "6px 14px", borderRadius: 99,
          backdropFilter: "blur(10px)",
        }}>
          {project.num}. {project.category}
        </span>
      </div>

      {/* Content */}
      <div style={{ padding: "28px 28px 24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <h3 style={{
              fontFamily: "'Bodoni Moda', serif", fontSize: isFeatured ? "2rem" : "1.6rem",
              fontWeight: 400, color: dark ? "#f4f4f2" : "#121212",
              marginBottom: 8,
            }}>
              {project.title}
            </h3>
            <p style={{
              fontSize: "0.9rem", fontWeight: 300, lineHeight: 1.6,
              color: dark ? "#888" : "#666", maxWidth: 400,
            }}>
              {project.desc}
            </p>
          </div>
          <div style={{
            width: 44, height: 44, borderRadius: "50%",
            border: `1px solid ${dark ? "rgba(255,255,255,0.15)" : "#ddd"}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0, marginLeft: 16,
            transform: hovered ? "translate(4px, -4px)" : "translate(0, 0)",
            transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
          }}>
            <ArrowUpRight size={18} color={dark ? "#f4f4f2" : "#121212"} />
          </div>
        </div>

        {/* Tags */}
        <div style={{
          display: "flex", flexWrap: "wrap", gap: 8, marginTop: 20,
        }}>
          {project.tags.map((tag) => (
            <span key={tag} style={{
              fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase",
              padding: "4px 12px", borderRadius: 99,
              border: `1px solid ${dark ? "rgba(255,255,255,0.1)" : "#ddd"}`,
              color: dark ? "#999" : "#666",
              fontFamily: "'Bodoni Moda', serif",
            }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

function WorkSection({ dark }) {
  const [ref, visible] = useReveal(0.08);

  return (
    <section
      id="work"
      ref={ref}
      aria-labelledby="work-title"
      style={{
        padding: "120px clamp(24px, 5vw, 80px)",
        background: dark ? "#111" : "#fff",
      }}
    >
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "flex-end",
        marginBottom: 60, paddingBottom: 20,
        borderBottom: `1px solid ${dark ? "rgba(255,255,255,0.1)" : "#121212"}`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1)",
      }}>
        <h2
          id="work-title"
          style={{
            fontFamily: "'Bodoni Moda', serif", fontSize: "clamp(2rem, 5vw, 3rem)",
            fontWeight: 400, textTransform: "uppercase",
            color: dark ? "#f4f4f2" : "#121212",
          }}
        >
          Selected Work
        </h2>
        <span style={{
          fontFamily: "'Bodoni Moda', serif", fontSize: "0.7rem",
          letterSpacing: "0.2em", textTransform: "uppercase",
          color: dark ? "#666" : "#999",
        }}>
          {PROJECTS.length} Projects
        </span>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 420px), 1fr))",
        gap: "clamp(20px, 3vw, 40px)",
      }}>
        {PROJECTS.map((p, i) => (
          <ProjectCard key={p.id} project={p} dark={dark} index={i} />
        ))}
      </div>
    </section>
  );
}

function MethodSection({ dark }) {
  const [ref, visible] = useReveal(0.1);

  return (
    <section
      id="method"
      ref={ref}
      aria-labelledby="method-title"
      style={{
        padding: "120px clamp(24px, 5vw, 80px)",
        background: dark ? "#0d0d0d" : "#f4f4f2",
      }}
    >
      <div style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1)",
      }}>
        <span style={{
          fontFamily: "'Bodoni Moda', serif", textTransform: "uppercase",
          letterSpacing: "0.2em", fontSize: "0.7rem",
          color: dark ? "#52B788" : "#1A3026", display: "block", marginBottom: 16,
        }}>
          Our Methodology
        </span>
        <h2
          id="method-title"
          style={{
            fontFamily: "'Bodoni Moda', serif", fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 400, color: dark ? "#f4f4f2" : "#121212",
            marginBottom: 80,
          }}
        >
          How we build values.
        </h2>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
        gap: 40,
      }}>
        {METHODS.map((m, i) => {
          const [mRef, mVisible] = useReveal(0.15);
          const Icon = m.icon;
          return (
            <div
              key={m.num}
              ref={mRef}
              style={{
                opacity: mVisible ? 1 : 0,
                transform: mVisible ? "translateY(0)" : "translateY(30px)",
                transition: `all 1s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.15}s`,
                padding: 32, borderRadius: 4,
                border: `1px solid ${dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}`,
              }}
            >
              <div style={{
                width: 48, height: 48, borderRadius: "50%",
                background: dark ? "rgba(82,183,136,0.1)" : "rgba(26,48,38,0.06)",
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: 24,
              }}>
                <Icon size={20} color={dark ? "#52B788" : "#1A3026"} />
              </div>
              <h3 style={{
                fontFamily: "'Bodoni Moda', serif", fontSize: "1.3rem",
                fontWeight: 400, color: dark ? "#f4f4f2" : "#121212",
                marginBottom: 12,
              }}>
                {m.num}. {m.title}
              </h3>
              <p style={{
                fontSize: "0.9rem", color: dark ? "#888" : "#666",
                fontWeight: 300, lineHeight: 1.7,
              }}>
                {m.desc}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function ContactSection({ dark }) {
  const [ref, visible] = useReveal(0.1);

  return (
    <section
      id="contact"
      ref={ref}
      aria-labelledby="contact-title"
      style={{
        padding: "120px clamp(24px, 5vw, 80px)",
        textAlign: "center",
        background: dark ? "#111" : "#fff",
      }}
    >
      <div style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1)",
        maxWidth: 600, margin: "0 auto",
      }}>
        <span style={{
          fontFamily: "'Bodoni Moda', serif", textTransform: "uppercase",
          letterSpacing: "0.2em", fontSize: "0.7rem",
          color: dark ? "#52B788" : "#1A3026", display: "block", marginBottom: 16,
        }}>
          Get in Touch
        </span>
        <h2
          id="contact-title"
          style={{
            fontFamily: "'Bodoni Moda', serif", fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 400, color: dark ? "#f4f4f2" : "#121212",
            marginBottom: 24,
          }}
        >
          Let's Create Together.
        </h2>
        <p style={{
          fontSize: "1.05rem", fontWeight: 300, lineHeight: 1.7,
          color: dark ? "#888" : "#666", marginBottom: 48,
        }}>
          새로운 프로젝트나 협업에 관심이 있으시다면 언제든 연락해주세요.
        </p>

        <a
          href="mailto:hello@portfolio.com"
          style={{
            display: "inline-flex", alignItems: "center", gap: 12,
            padding: "18px 48px", borderRadius: 99,
            background: dark ? "#f4f4f2" : "#121212",
            color: dark ? "#0d0d0d" : "#fff",
            textDecoration: "none", fontSize: "0.8rem",
            letterSpacing: "0.15em", textTransform: "uppercase",
            fontFamily: "'Bodoni Moda', serif",
            transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
          onMouseEnter={(e) => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 8px 30px rgba(0,0,0,0.15)"; }}
          onMouseLeave={(e) => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "none"; }}
        >
          Contact Me <ArrowRight size={16} />
        </a>
      </div>
    </section>
  );
}

function Footer({ dark }) {
  return (
    <footer
      role="contentinfo"
      style={{
        padding: "60px clamp(24px, 5vw, 80px)",
        borderTop: `1px solid ${dark ? "rgba(255,255,255,0.08)" : "#eee"}`,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        flexWrap: "wrap", gap: 20,
        background: dark ? "#0d0d0d" : "#fff",
      }}
    >
      <span style={{
        fontFamily: "'Bodoni Moda', serif", fontSize: "0.7rem",
        letterSpacing: "0.15em", textTransform: "uppercase",
        color: dark ? "#666" : "#999",
      }}>
        © 2026 Portfolio. Seoul, Republic of Korea
      </span>
      <div style={{ display: "flex", gap: 32 }}>
        {["Instagram", "YouTube", "GitHub"].map((s) => (
          <a
            key={s}
            href="#"
            aria-label={`${s} 프로필로 이동`}
            style={{
              fontFamily: "'Bodoni Moda', serif", fontSize: "0.7rem",
              letterSpacing: "0.15em", textTransform: "uppercase",
              textDecoration: "none", color: dark ? "#666" : "#999",
              transition: "color 0.3s",
            }}
            onMouseEnter={(e) => e.target.style.color = dark ? "#f4f4f2" : "#121212"}
            onMouseLeave={(e) => e.target.style.color = dark ? "#666" : "#999"}
          >
            {s}
          </a>
        ))}
      </div>
    </footer>
  );
}

// ─── Main App ────────────────────────────────────────────
export default function PortfolioV2() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDark(prefersDark);
  }, []);

  return (
    <div style={{
      background: dark ? "#0d0d0d" : "#fff",
      color: dark ? "#f4f4f2" : "#121212",
      fontFamily: "'Noto Sans KR', -apple-system, BlinkMacSystemFont, sans-serif",
      transition: "background 0.5s, color 0.5s",
      minHeight: "100vh",
    }}>
      {/* Google Fonts */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400;0,6..96,700;1,6..96,400&family=Noto+Sans+KR:wght@100;300;400;500;700&display=swap"
      />

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-btn { display: flex !important; }
        }
        @media (min-width: 769px) {
          .nav-mobile-btn { display: none !important; }
        }
        html { scroll-behavior: smooth; }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { overflow-x: hidden; word-break: keep-all; }
        ::selection {
          background: ${dark ? "#52B788" : "#1A3026"};
          color: #fff;
        }
        :focus-visible {
          outline: 2px solid ${dark ? "#52B788" : "#1A3026"};
          outline-offset: 4px;
          border-radius: 2px;
        }
      `}</style>

      <SkipNav />
      <Nav dark={dark} setDark={setDark} />

      <main id="main-content">
        <Hero dark={dark} />
        <WorkSection dark={dark} />
        <MethodSection dark={dark} />
        <ContactSection dark={dark} />
      </main>

      <Footer dark={dark} />
    </div>
  );
}
