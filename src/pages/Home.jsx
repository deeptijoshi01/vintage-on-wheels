import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { carsData } from "../data/cars";
import CarCard from "../components/CarCard";

const heroSlides = [
  {
    image: "/src/assets/4.png",
    eyebrow: "New Collection",
    title: "Timeless",
    titleItalic: "Elegance",
    sub: "Where heritage meets modern refinement",
  },
  {
    image: "/src/assets/6.png",
    eyebrow: "Rare Classics",
    title: "Drive",
    titleItalic: "History",
    sub: "Every machine tells a story of its golden era",
  },
  {
    image: "/src/assets/10.png",
    eyebrow: "Premium Rental",
    title: "Born to be",
    titleItalic: "Remembered",
    sub: "For weddings, shoots & unforgettable occasions",
  },
];

const stats = [
  { number: "6", label: "Curated Vehicles" },
  { number: "10+", label: "Years of Passion" },
  { number: "500+", label: "Events Served" },
  { number: "100%", label: "Client Delight" },
];

const occasions = [
  { icon: "💍", title: "Weddings", desc: "Arrive in unforgettable style. Make your special day a cinematic memory." },
  { icon: "🎬", title: "Film Shoots", desc: "Period-correct props for films, ads, and editorial content." },
  { icon: "🏛️", title: "Corporate", desc: "Impress clients and guests with automotive heritage." },
  { icon: "📸", title: "Photoshoots", desc: "Iconic backdrops for fashion, lifestyle, and brand shoots." },
];

export default function Home() {
  const [slide, setSlide] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setSlide((s) => (s + 1) % heroSlides.length);
        setAnimating(false);
      }, 600);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.06, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".reveal, .reveal-left, .reveal-right").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const goSlide = (i) => {
    if (i === slide || animating) return;
    setAnimating(true);
    setTimeout(() => { setSlide(i); setAnimating(false); }, 500);
  };

  return (
    <>
      <style>{`
        /* ════════════════════════════════
           GLOBAL REVEAL
        ════════════════════════════════ */
        .reveal, .reveal-left, .reveal-right {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity .8s cubic-bezier(.22,1,.36,1),
                      transform .8s cubic-bezier(.22,1,.36,1);
        }
        .reveal-left { transform: translateX(-28px); }
        .reveal-right { transform: translateX(28px); }
        .reveal.visible, .reveal-left.visible, .reveal-right.visible {
          opacity: 1;
          transform: none;
        }
        .delay-1 { transition-delay: .1s !important; }
        .delay-2 { transition-delay: .2s !important; }
        .delay-3 { transition-delay: .3s !important; }
        .delay-4 { transition-delay: .4s !important; }

        /* ════════════════════════════════
           HERO — MOBILE FIRST
        ════════════════════════════════ */
        .hero {
          position: relative;
          height: 100svh;
          min-height: 580px;
          max-height: 900px;
          overflow: hidden;
          display: flex;
          align-items: flex-end;
          padding-bottom: 80px;
        }
        .hero-bg {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: cover;
          transition: opacity .6s ease;
          transform-origin: center;
        }
        .hero-bg.out { opacity: 0; }
        .hero-bg.in { opacity: 1; animation: kenBurns 8s linear forwards; }
        @keyframes kenBurns {
          from { transform: scale(1.02); }
          to { transform: scale(1.07); }
        }
        .hero-gradient {
          position: absolute; inset: 0;
          background: linear-gradient(
            to top,
            rgba(6,4,2,.92) 0%,
            rgba(6,4,2,.55) 50%,
            rgba(6,4,2,.2) 100%
          );
        }
        .hero-gradient-left {
          position: absolute; inset: 0;
          background: linear-gradient(
            to right,
            rgba(6,4,2,.7) 0%,
            transparent 60%
          );
        }
        .hero-grain {
          position: absolute; inset: 0; opacity: .04;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          pointer-events: none;
        }
        .hero-content {
          position: relative; z-index: 2;
          padding: 0 20px;
          width: 100%;
        }
        .hero-eyebrow {
          display: flex; align-items: center; gap: 10px;
          font-family: 'Montserrat', sans-serif;
          font-size: clamp(.48rem, 2vw, .58rem);
          font-weight: 500;
          letter-spacing: .36em;
          text-transform: uppercase;
          color: #C9A84C;
          margin-bottom: 16px;
          opacity: 0; animation: heroFadeUp .8s .15s forwards;
        }
        .hero-eyebrow::before {
          content: ''; width: 28px; height: 1px;
          background: rgba(201,168,76,.5);
          flex-shrink: 0;
        }
        .hero-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(3rem, 12vw, 8.5rem);
          font-weight: 300;
          line-height: .95;
          color: #f5f0e8;
          letter-spacing: -.01em;
          margin: 0 0 6px;
          opacity: 0; animation: heroFadeUp .8s .28s forwards;
        }
        .hero-title em {
          font-style: italic;
          color: rgba(245,240,232,.5);
        }
        .hero-sub {
          font-family: 'Montserrat', sans-serif;
          font-size: clamp(.54rem, 2.2vw, .72rem);
          font-weight: 300;
          letter-spacing: .18em;
          color: rgba(245,240,232,.38);
          text-transform: uppercase;
          margin: 18px 0 32px;
          opacity: 0; animation: heroFadeUp .8s .4s forwards;
        }
        .hero-actions {
          display: flex;
          flex-direction: column;
          gap: 12px;
          opacity: 0; animation: heroFadeUp .8s .52s forwards;
        }
        .btn-primary {
          font-family: 'Montserrat', sans-serif;
          font-size: clamp(.56rem, 2.2vw, .62rem);
          font-weight: 500;
          letter-spacing: .28em;
          text-transform: uppercase;
          text-decoration: none;
          background: #C9A84C;
          color: #080604;
          padding: 15px 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          transition: background .3s, transform .3s, box-shadow .3s;
          width: 100%;
        }
        .btn-primary:hover {
          background: #E8C96A;
          box-shadow: 0 8px 30px rgba(201,168,76,.35);
          transform: translateY(-2px);
        }
        .btn-ghost {
          font-family: 'Montserrat', sans-serif;
          font-size: clamp(.56rem, 2.2vw, .62rem);
          font-weight: 500;
          letter-spacing: .28em;
          text-transform: uppercase;
          text-decoration: none;
          color: rgba(245,240,232,.7);
          border: 1px solid rgba(245,240,232,.22);
          padding: 15px 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          transition: border-color .3s, color .3s;
          width: 100%;
        }
        .btn-ghost:hover {
          border-color: rgba(201,168,76,.5);
          color: #C9A84C;
        }

        /* Hero nav arrows */
        .hero-nav-btn {
          position: absolute; top: 50%; z-index: 3;
          transform: translateY(-50%);
          background: rgba(0,0,0,.3);
          border: 1px solid rgba(245,240,232,.15);
          width: 38px; height: 38px;
          display: flex; align-items: center; justify-content: center;
          color: rgba(245,240,232,.5);
          font-size: 1rem;
          transition: all .3s;
          backdrop-filter: blur(4px);
        }
        .hero-nav-btn:hover { border-color: rgba(201,168,76,.5); color: #C9A84C; }
        .hero-nav-btn.prev { left: 12px; }
        .hero-nav-btn.next { right: 12px; }

        /* Hero dots */
        .hero-dots {
          position: absolute; bottom: 24px; left: 50%;
          transform: translateX(-50%); z-index: 3;
          display: flex; gap: 8px; align-items: center;
        }
        .hero-dot { background: none; border: none; padding: 4px; display: flex; align-items: center; }
        .hero-dot-inner { height: 1px; background: rgba(245,240,232,.25); transition: width .5s ease, background .4s; }
        .hero-dot.active .hero-dot-inner { background: #C9A84C; }

        /* Scroll indicator */
        .hero-scroll {
          position: absolute; bottom: 20px; right: 16px; z-index: 3;
          display: flex; flex-direction: column; align-items: center; gap: 6px;
        }
        .hero-scroll-line {
          width: 1px; height: 40px;
          background: linear-gradient(to bottom, #C9A84C, transparent);
          animation: scrollPulse 2s ease-in-out infinite;
        }
        @keyframes scrollPulse {
          0%, 100% { opacity: .4; }
          50% { opacity: 1; }
        }
        .hero-scroll-label {
          font-family: 'Montserrat', sans-serif;
          font-size: .4rem; letter-spacing: .35em;
          color: rgba(245,240,232,.3); text-transform: uppercase;
          writing-mode: vertical-rl;
        }

        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* ════════════════════════════════
           STATS — MOBILE FIRST
        ════════════════════════════════ */
        .stats {
          background: #0a0806;
          border-top: 1px solid rgba(201,168,76,.08);
          border-bottom: 1px solid rgba(201,168,76,.08);
          display: grid;
          grid-template-columns: 1fr 1fr;
        }
        .stat-item {
          padding: 28px 16px;
          border-right: 1px solid rgba(201,168,76,.07);
          border-bottom: 1px solid rgba(201,168,76,.07);
          text-align: center;
          position: relative; overflow: hidden;
        }
        .stat-item:nth-child(2),
        .stat-item:nth-child(4) { border-right: none; }
        .stat-item:nth-child(3),
        .stat-item:nth-child(4) { border-bottom: none; }
        .stat-number {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2rem, 8vw, 4rem);
          font-weight: 300;
          color: #C9A84C;
          line-height: 1;
          margin-bottom: 6px;
          letter-spacing: -.02em;
        }
        .stat-label {
          font-family: 'Montserrat', sans-serif;
          font-size: clamp(.44rem, 1.8vw, .56rem);
          font-weight: 400;
          letter-spacing: .25em;
          text-transform: uppercase;
          color: rgba(245,240,232,.3);
        }

        /* ════════════════════════════════
           SECTION HEADER COMMON
        ════════════════════════════════ */
        .section-eyebrow {
          font-family: 'Montserrat', sans-serif;
          font-size: clamp(.5rem, 2vw, .58rem);
          font-weight: 500;
          letter-spacing: .38em;
          text-transform: uppercase;
          color: #C9A84C;
          display: flex; align-items: center;
          gap: 10px; margin-bottom: 12px;
        }
        .section-eyebrow::before {
          content: ''; width: 28px; height: 1px;
          background: rgba(201,168,76,.5);
          flex-shrink: 0;
        }
        .section-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2rem, 8vw, 4.8rem);
          font-weight: 300;
          color: #f5f0e8;
          line-height: 1;
          letter-spacing: -.01em;
        }
        .section-title em { font-style: italic; color: rgba(245,240,232,.45); }

        /* ════════════════════════════════
           FEATURED — MOBILE FIRST
        ════════════════════════════════ */
        .featured {
          padding: 60px 16px;
          background: #080604;
        }
        .section-header {
          margin-bottom: 36px;
        }
        .section-header-row {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
          margin-top: 8px;
        }
        .featured-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2px;
        }
        .featured-cta {
          text-align: center;
          margin-top: 32px;
        }
        .featured-cta .btn-ghost {
          width: auto;
          display: inline-flex;
          padding: 13px 28px;
        }

        /* ════════════════════════════════
           STORY — MOBILE FIRST
        ════════════════════════════════ */
        .story {
          background: #0a0806;
          overflow: hidden;
        }
        .story-inner {
          display: flex;
          flex-direction: column;
        }
        .story-img-wrap {
          position: relative;
          aspect-ratio: 16/10;
          overflow: hidden;
        }
        .story-img {
          width: 100%; height: 100%;
          object-fit: cover;
          filter: brightness(.8) saturate(.85);
          transition: transform 8s ease;
        }
        .story-img-wrap:hover .story-img { transform: scale(1.04); }
        .story-img-border {
          position: absolute; inset: 14px;
          border: 1px solid rgba(201,168,76,.15);
          pointer-events: none;
        }
        .story-img-label {
          position: absolute; bottom: 16px; right: 0;
          background: rgba(201,168,76,.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(201,168,76,.25);
          border-right: none;
          padding: 10px 16px;
          font-family: 'Montserrat', sans-serif;
          font-size: clamp(.42rem, 1.8vw, .54rem);
          letter-spacing: .22em;
          color: rgba(245,240,232,.7);
          text-transform: uppercase;
        }
        .story-text {
          padding: 48px 20px;
        }
        .story-body {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1rem, 3.5vw, 1.2rem);
          font-weight: 300;
          line-height: 1.85;
          color: rgba(245,240,232,.6);
          margin: 24px 0;
        }
        .story-body strong { color: rgba(245,240,232,.9); font-weight: 500; }
        .story-signature {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.1rem, 4vw, 1.4rem);
          font-style: italic;
          color: #C9A84C;
          margin-top: 28px;
        }
        .story-sig-role {
          font-family: 'Montserrat', sans-serif;
          font-size: clamp(.42rem, 1.6vw, .52rem);
          letter-spacing: .28em;
          color: rgba(245,240,232,.3);
          margin-top: 5px;
          text-transform: uppercase;
        }

        /* ════════════════════════════════
           OCCASIONS — MOBILE FIRST
        ════════════════════════════════ */
        .occasions {
          padding: 60px 16px;
          background: #080604;
        }
        .occasions-header {
          text-align: center;
          margin-bottom: 36px;
        }
        .occasions-header .section-eyebrow {
          justify-content: center;
        }
        .occasions-header .section-eyebrow::before { display: none; }
        .occasions-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2px;
        }
        .occasion-card {
          position: relative;
          overflow: hidden;
          background: #0e0c09;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 32px 16px;
          text-decoration: none;
          min-height: 180px;
          border: 1px solid rgba(201,168,76,.06);
          transition: background .4s;
        }
        .occasion-card:hover { background: rgba(201,168,76,.05); }
        .occasion-card-icon {
          font-size: clamp(1.8rem, 6vw, 2.5rem);
          margin-bottom: 14px;
          display: block;
          transition: transform .4s;
        }
        .occasion-card:hover .occasion-card-icon { transform: scale(1.15); }
        .occasion-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1rem, 4vw, 1.4rem);
          font-weight: 400;
          color: #f5f0e8;
          margin-bottom: 6px;
          text-align: center;
        }
        .occasion-line {
          width: 24px; height: 1px;
          background: rgba(201,168,76,.4);
          margin: 8px auto;
          transition: width .4s ease;
        }
        .occasion-card:hover .occasion-line { width: 44px; }
        .occasion-desc {
          font-family: 'Montserrat', sans-serif;
          font-size: clamp(.48rem, 1.8vw, .58rem);
          font-weight: 300;
          letter-spacing: .1em;
          color: rgba(245,240,232,.35);
          line-height: 1.65;
          text-align: center;
        }

        /* ════════════════════════════════
           CTA SECTION — MOBILE FIRST
        ════════════════════════════════ */
        .cta-section {
          padding: 80px 20px;
          background: #0a0806;
          text-align: center;
          overflow: hidden;
          position: relative;
        }
        .cta-section::before {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 80% 60% at 50% 50%, rgba(201,168,76,.05) 0%, transparent 70%);
          pointer-events: none;
        }
        .cta-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.4rem, 10vw, 7rem);
          font-weight: 300;
          color: #f5f0e8;
          line-height: .95;
          letter-spacing: -.02em;
          margin-bottom: 20px;
          position: relative; z-index: 1;
        }
        .cta-title em { font-style: italic; color: rgba(245,240,232,.4); }
        .cta-sub {
          font-family: 'Montserrat', sans-serif;
          font-size: clamp(.56rem, 2.2vw, .7rem);
          font-weight: 300;
          letter-spacing: .2em;
          color: rgba(245,240,232,.35);
          text-transform: uppercase;
          max-width: 340px;
          margin: 0 auto 40px;
          line-height: 1.9;
          position: relative; z-index: 1;
        }
        .cta-btns {
          display: flex;
          flex-direction: column;
          align-items: stretch;
          gap: 12px;
          position: relative; z-index: 1;
          max-width: 400px;
          margin: 0 auto;
        }
        .btn-whatsapp {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          font-family: 'Montserrat', sans-serif;
          font-size: clamp(.56rem, 2.2vw, .62rem);
          font-weight: 500;
          letter-spacing: .26em;
          text-transform: uppercase;
          text-decoration: none;
          background: #25D366;
          color: white;
          padding: 16px 28px;
          transition: background .3s, transform .3s, box-shadow .3s;
        }
        .btn-whatsapp:hover {
          background: #1fb857;
          transform: translateY(-2px);
          box-shadow: 0 10px 32px rgba(37,211,102,.35);
        }
        .btn-whatsapp svg { width: 18px; height: 18px; fill: currentColor; flex-shrink: 0; }

        /* ════════════════════════════════
           DESKTOP OVERRIDES
        ════════════════════════════════ */
        @media (min-width: 600px) {
          .hero-actions {
            flex-direction: row;
            flex-wrap: wrap;
          }
          .btn-primary, .btn-ghost {
            width: auto;
            display: inline-flex;
          }
          .occasions-grid {
            grid-template-columns: repeat(4, 1fr);
          }
          .cta-btns {
            flex-direction: row;
            justify-content: center;
          }
          .cta-btns .btn-whatsapp,
          .cta-btns .btn-ghost {
            width: auto;
          }
        }

        @media (min-width: 768px) {
          .hero {
            align-items: center;
            padding-bottom: 0;
          }
          .hero-content {
            padding: 0 8vw;
            max-width: 760px;
          }
          .hero-nav-btn { width: 44px; height: 44px; font-size: 1.1rem; }
          .hero-nav-btn.prev { left: 5vw; }
          .hero-nav-btn.next { right: 5vw; }
          .stats { grid-template-columns: repeat(4, 1fr); }
          .stat-item { padding: 44px 5vw; border-bottom: none; }
          .stat-item:nth-child(2) { border-right: 1px solid rgba(201,168,76,.07); }
          .stat-item:nth-child(4) { border-right: none; }
          .featured { padding: 100px 5vw; }
          .featured-grid { grid-template-columns: repeat(2, 1fr); }
          .section-header { margin-bottom: 56px; }
          .story-inner {
            display: grid;
            grid-template-columns: 1fr 1fr;
            align-items: center;
          }
          .story-img-wrap { aspect-ratio: 4/5; }
          .story-text { padding: 80px 6vw; }
          .occasions { padding: 100px 5vw; }
          .occasion-card { min-height: 260px; padding: 40px 24px; }
          .cta-section { padding: 120px 5vw; }
        }

        @media (min-width: 1024px) {
          .featured-grid { grid-template-columns: repeat(3, 1fr); }
        }
      `}</style>

      <div className="page-enter">
        {/* ── HERO ── */}
        <section className="hero">
          {heroSlides.map((s, i) => (
            <img
              key={i}
              src={s.image}
              alt={s.title}
              className={`hero-bg ${i === slide ? "in" : "out"}`}
              style={{ display: i === slide || animating ? "block" : "none" }}
            />
          ))}
          <div className="hero-gradient" />
          <div className="hero-gradient-left" />
          <div className="hero-grain" />

          <div className="hero-content">
            <div className="hero-eyebrow" key={`eyebrow-${slide}`}>
              {heroSlides[slide].eyebrow}
            </div>
            <h1 className="hero-title" key={`title-${slide}`}>
              {heroSlides[slide].title}<br />
              <em>{heroSlides[slide].titleItalic}</em>
            </h1>
            <p className="hero-sub" key={`sub-${slide}`}>
              {heroSlides[slide].sub}
            </p>
            <div className="hero-actions">
              <Link to="/cars" className="btn-primary">Explore Collection</Link>
              <a
                href="https://wa.me/918378913269?text=Hello!%20I%27d%20like%20to%20book%20a%20vintage%20car."
                className="btn-ghost"
                target="_blank" rel="noreferrer"
              >
                Book on WhatsApp
              </a>
            </div>
          </div>

          {/* Dots */}
          <div className="hero-dots">
            {heroSlides.map((_, i) => (
              <button key={i} className={`hero-dot ${i === slide ? "active" : ""}`} onClick={() => goSlide(i)}>
                <div className="hero-dot-inner" style={{ width: i === slide ? "32px" : "14px" }} />
              </button>
            ))}
          </div>

          {/* Scroll hint */}
          <div className="hero-scroll">
            <div className="hero-scroll-line" />
            <span className="hero-scroll-label">Scroll</span>
          </div>

          <button className="hero-nav-btn prev" onClick={() => goSlide((slide - 1 + heroSlides.length) % heroSlides.length)}>‹</button>
          <button className="hero-nav-btn next" onClick={() => goSlide((slide + 1) % heroSlides.length)}>›</button>
        </section>

        {/* ── STATS ── */}
        <div className="stats">
          {stats.map((s, i) => (
            <div className="stat-item reveal" key={i} style={{ transitionDelay: `${i * 0.08}s` }}>
              <div className="stat-number">{s.number}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>

        {/* ── FEATURED CARS ── */}
        <section className="featured">
          <div className="section-header">
            <div className="section-eyebrow reveal">The Collection</div>
            <div className="section-header-row">
              <h2 className="section-title reveal delay-1">
                Featured<br /><em>Automobiles</em>
              </h2>
              <Link to="/cars" className="btn-ghost reveal" style={{ width: "auto", flexShrink: 0 }}>View All →</Link>
            </div>
          </div>
          <div className="featured-grid">
            {carsData.slice(0, 3).map((car, i) => (
              <CarCard key={car.id} car={car} index={i} />
            ))}
          </div>
          <div className="featured-cta">
            <Link to="/cars" className="btn-ghost reveal">See Full Collection</Link>
          </div>
        </section>

        {/* ── STORY ── */}
        <section className="story" id="about">
          <div className="story-inner">
            <div className="story-img-wrap reveal-left">
              <img src="/src/assets/4.png" alt="Our Story" className="story-img" />
              <div className="story-img-border" />
              <div className="story-img-label">Est. 1942 · Nashik, India</div>
            </div>
            <div className="story-text">
              <div className="section-eyebrow reveal">Our Story</div>
              <h2 className="section-title reveal delay-1">
                A Passion<br /><em>for History</em>
              </h2>
              <p className="story-body reveal delay-2">
                Vintage On Wheels was born from a <strong>lifelong obsession</strong> with machines
                that moved the world. Our collection represents decades of careful curation —
                hunting down, restoring, and preserving automobiles that defined their eras.
              </p>
              <p className="story-body reveal delay-3">
                Each car in our fleet has been <strong>meticulously restored</strong> to concours condition,
                maintaining authenticity while ensuring reliability. We don't just rent cars —
                we share stories, allow people to touch history, and create moments that last a lifetime.
              </p>
              <div className="reveal delay-4">
                <div className="story-signature">Roshan Santosh Deshmukh</div>
                <div className="story-sig-role">Founder, Vintage On Wheels</div>
              </div>
            </div>
          </div>
        </section>

        {/* ── OCCASIONS ── */}
        <section className="occasions">
          <div className="occasions-header">
            <div className="section-eyebrow reveal">Perfect For</div>
            <h2 className="section-title reveal delay-1">
              Every <em>Occasion</em>
            </h2>
          </div>
          <div className="occasions-grid">
            {occasions.map((o, i) => (
              <a
                key={i}
                href="https://wa.me/918378913269"
                target="_blank" rel="noreferrer"
                className="occasion-card reveal"
                style={{ transitionDelay: `${i * 0.08}s` }}
              >
                <span className="occasion-card-icon">{o.icon}</span>
                <h3 className="occasion-title">{o.title}</h3>
                <div className="occasion-line" />
                <p className="occasion-desc">{o.desc}</p>
              </a>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="cta-section">
          <h2 className="cta-title reveal">
            Ready to Drive<br /><em>Into History?</em>
          </h2>
          <p className="cta-sub reveal delay-2">
            All bookings via WhatsApp. Flexible packages for every occasion.
          </p>
          <div className="cta-btns reveal delay-3">
            <a
              href="https://wa.me/918378913269?text=Hello!%20I%27d%20like%20to%20make%20a%20booking%20enquiry."
              className="btn-whatsapp"
              target="_blank" rel="noreferrer"
            >
              <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Book via WhatsApp
            </a>
            <Link to="/cars" className="btn-ghost" style={{ width: "auto" }}>Browse Collection</Link>
          </div>
        </section>
      </div>
    </>
  );
}