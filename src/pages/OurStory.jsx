import { useEffect, useRef } from "react";

export default function OurStory() {
  const revealRefs = useRef([]);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) { entry.target.classList.add("revealed"); observer.unobserve(entry.target); }
        });
      },
      { threshold: 0.08 }
    );
    revealRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const addRef = (el) => { if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el); };

  const highlights = [
    {
      icon: "✦",
      title: "Curated Collection",
      desc: "Every vehicle in our archive is hand-selected for historical significance, condition, and character. We carry only machines worth remembering.",
    },
    {
      icon: "◈",
      title: "Restored Excellence",
      desc: "Our artisans restore each car to factory glory — or better. Period-correct details meet modern reliability, invisible to the eye.",
    },
    {
      icon: "◇",
      title: "Timeless Experience",
      desc: "From bridal processions to film sets to personal milestones, we craft experiences that outlive the moment and become the memory.",
    },
  ];

  return (
    <>
      <style>{`
        /* ── OUR STORY – MOBILE FIRST ── */
        .reveal {
          opacity: 0; transform: translateY(28px);
          transition: opacity .85s cubic-bezier(.22,1,.36,1), transform .85s cubic-bezier(.22,1,.36,1);
        }
        .reveal.revealed { opacity: 1; transform: translateY(0); }
        .reveal-delay-1 { transition-delay: .12s; }
        .reveal-delay-2 { transition-delay: .24s; }
        .reveal-delay-3 { transition-delay: .36s; }

        .os-page {
          background: #080604;
          color: #f5f0e8;
          min-height: 100vh;
          font-family: 'Montserrat', sans-serif;
          overflow-x: hidden;
        }

        /* Hero */
        .os-hero {
          position: relative;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          text-align: center;
          padding: 120px 20px 72px;
          overflow: hidden;
        }
        .os-hero::before {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 80% 60% at 50% 40%, rgba(201,168,76,.06) 0%, transparent 70%);
          pointer-events: none;
        }
        .os-hero-eyebrow {
          display: flex; align-items: center; gap: 12px;
          font-size: clamp(.46rem, 1.9vw, .52rem);
          letter-spacing: .46em; text-transform: uppercase;
          color: #C9A84C; margin-bottom: 22px; font-weight: 500;
        }
        .os-hero-eyebrow span { display: block; width: 32px; height: 1px; background: #C9A84C; opacity: .5; }
        .os-hero-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(3rem, 12vw, 8rem);
          font-weight: 300; line-height: 1;
          letter-spacing: -.01em; margin: 0 0 22px;
        }
        .os-hero-title em { font-style: italic; color: #C9A84C; }
        .os-hero-subtitle {
          font-size: clamp(.6rem, 2.4vw, .85rem);
          letter-spacing: .26em; text-transform: uppercase;
          color: rgba(245,240,232,.45); font-weight: 400;
          max-width: 340px; line-height: 2;
        }
        .os-scroll-hint {
          margin-top: 36px;
          display: flex; flex-direction: column; align-items: center; gap: 8px;
          font-size: clamp(.4rem, 1.6vw, .5rem);
          letter-spacing: .34em; text-transform: uppercase;
          color: rgba(201,168,76,.4);
        }
        .os-scroll-hint::after {
          content: '';
          display: block; width: 1px; height: 36px;
          background: linear-gradient(to bottom, #C9A84C, transparent);
          animation: scrollPulse 2s ease-in-out infinite;
        }
        @keyframes scrollPulse { 0%, 100% { opacity: .3; } 50% { opacity: 1; } }

        /* Divider */
        .os-divider {
          display: flex; align-items: center; gap: 14px;
          margin: 0 auto; width: fit-content;
        }
        .os-divider-line { width: 44px; height: 1px; background: rgba(201,168,76,.3); }
        .os-divider-gem { width: 6px; height: 6px; background: #C9A84C; transform: rotate(45deg); }

        /* Story text */
        .os-story {
          padding: 60px 20px;
          max-width: 820px;
          margin: 0 auto;
        }
        .os-story-label {
          font-size: clamp(.48rem, 1.9vw, .52rem);
          letter-spacing: .42em; text-transform: uppercase;
          color: #C9A84C; font-weight: 500;
          margin-bottom: 36px; text-align: center;
        }
        .os-story-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.05rem, 3.8vw, 1.5rem);
          font-weight: 300; line-height: 1.85;
          color: rgba(245,240,232,.82);
          margin-bottom: 28px; text-align: center;
        }

        /* Stat strip */
        .os-stat-strip {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1px;
          background: rgba(201,168,76,.1);
          border: 1px solid rgba(201,168,76,.1);
          margin: 0 20px 60px;
        }
        .os-stat {
          background: #080604;
          padding: 36px 24px;
          text-align: center;
          transition: background .3s;
        }
        .os-stat:hover { background: rgba(201,168,76,.04); }
        .os-stat-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.2rem, 8vw, 3.5rem);
          font-weight: 300; color: #C9A84C;
          line-height: 1; margin-bottom: 8px;
        }
        .os-stat-label {
          font-size: clamp(.46rem, 1.9vw, .52rem);
          letter-spacing: .32em; text-transform: uppercase;
          color: rgba(245,240,232,.4); font-weight: 500;
        }

        /* Highlights */
        .os-highlights {
          padding: 0 20px 60px;
        }
        .os-highlights-header {
          text-align: center; margin-bottom: 40px;
        }
        .os-highlights-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.6rem, 6vw, 3rem);
          font-weight: 300; margin: 14px 0 0;
          color: #f5f0e8;
        }
        .os-highlights-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1px;
          background: rgba(201,168,76,.1);
          border: 1px solid rgba(201,168,76,.1);
        }
        .os-highlight-card {
          background: #080604;
          padding: 36px 24px;
          position: relative; overflow: hidden;
          transition: background .4s;
        }
        .os-highlight-card::before {
          content: ''; position: absolute;
          bottom: 0; left: 0; width: 0; height: 1px;
          background: #C9A84C; transition: width .5s ease;
        }
        .os-highlight-card:hover { background: rgba(201,168,76,.04); }
        .os-highlight-card:hover::before { width: 100%; }
        .os-highlight-icon { font-size: 1.3rem; color: #C9A84C; margin-bottom: 18px; display: block; }
        .os-highlight-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.2rem, 5vw, 1.5rem);
          font-weight: 400; margin-bottom: 12px; color: #f5f0e8;
        }
        .os-highlight-desc {
          font-size: clamp(.62rem, 2.5vw, .72rem);
          line-height: 1.85; color: rgba(245,240,232,.5);
          font-weight: 400; letter-spacing: .02em;
        }

        /* Closing */
        .os-closing {
          padding: 72px 20px 80px;
          text-align: center;
          position: relative; overflow: hidden;
        }
        .os-closing::before {
          content: ''; position: absolute; inset: 0;
          background: radial-gradient(ellipse 70% 50% at 50% 50%, rgba(201,168,76,.05) 0%, transparent 70%);
          pointer-events: none;
        }
        .os-closing-quote {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.3rem, 5vw, 2.8rem);
          font-weight: 300; font-style: italic;
          line-height: 1.5; color: rgba(245,240,232,.8);
          max-width: 700px; margin: 24px auto 40px;
        }
        .os-closing-quote em { color: #C9A84C; font-style: normal; }
        .os-closing-cta {
          display: inline-flex; align-items: center; gap: 10px;
          font-family: 'Montserrat', sans-serif;
          font-size: clamp(.54rem, 2.2vw, .6rem);
          font-weight: 500; letter-spacing: .26em; text-transform: uppercase;
          color: #C9A84C; border: 1px solid rgba(201,168,76,.4);
          padding: 14px 28px; text-decoration: none;
          transition: background .3s, color .3s;
        }
        .os-closing-cta:hover { background: #C9A84C; color: #080604; }

        /* Desktop */
        @media (min-width: 600px) {
          .os-stat-strip { grid-template-columns: repeat(3, 1fr); }
          .os-highlights-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (min-width: 768px) {
          .os-hero { padding: 160px 6vw 100px; }
          .os-story { padding: 90px 6vw; }
          .os-stat-strip { margin: 0 6vw 80px; }
          .os-highlights { padding: 0 6vw 80px; }
          .os-highlight-card { padding: 48px 36px; }
          .os-closing { padding: 90px 6vw 100px; }
        }
      `}</style>

      <div className="os-page">
        {/* Hero */}
        <section className="os-hero">
          <div className="os-hero-eyebrow reveal" ref={addRef}>
            <span /><span>Our Heritage</span><span />
          </div>
          <h1 className="os-hero-title reveal reveal-delay-1" ref={addRef}>Our <em>Story</em></h1>
          <p className="os-hero-subtitle reveal reveal-delay-2" ref={addRef}>Driven by passion. Defined by legacy.</p>
          <div className="os-scroll-hint reveal reveal-delay-3" ref={addRef}>Scroll</div>
        </section>

        {/* Story */}
        <section className="os-story">
          <p className="os-story-label reveal" ref={addRef}>The Beginning</p>
          <div className="os-divider reveal" ref={addRef} style={{ marginBottom: "44px" }}>
            <span className="os-divider-line" /><span className="os-divider-gem" /><span className="os-divider-line" />
          </div>
          <p className="os-story-text reveal" ref={addRef}>
            It began not with a business plan, but with a love affair — a chance encounter with a 1942 Packard in a Nashik courtyard, draped in monsoon dust, its chrome still catching the afternoon light. That day, a passion was born that would outlast decades.
          </p>
          <p className="os-story-text reveal reveal-delay-1" ref={addRef}>
            Vintage On Wheels was founded on a simple conviction: that great machines deserve to be driven, not merely preserved. Each automobile has been painstakingly restored by craftsmen who understand that authenticity is not a feature — it is the entire point.
          </p>
          <p className="os-story-text reveal reveal-delay-2" ref={addRef}>
            Today, we are custodians of rolling history. Whether you seek romance for your wedding, the gravitas of a chauffeur-driven sedan, or simply a sunrise drive through the Deccan — we offer more than a car. We offer a chapter.
          </p>
        </section>

        {/* Stats */}
        <div className="os-stat-strip">
          {[
            { num: "82+", label: "Years of Legacy" },
            { num: "6", label: "Curated Vehicles" },
            { num: "∞", label: "Memories Created" },
          ].map((s, i) => (
            <div className={`os-stat reveal reveal-delay-${i}`} ref={addRef} key={i}>
              <div className="os-stat-num">{s.num}</div>
              <div className="os-stat-label">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Highlights */}
        <section className="os-highlights">
          <div className="os-highlights-header">
            <div className="os-divider reveal" ref={addRef} style={{ marginBottom: "18px" }}>
              <span className="os-divider-line" /><span className="os-divider-gem" /><span className="os-divider-line" />
            </div>
            <p className="os-story-label reveal" ref={addRef} style={{ marginBottom: 0 }}>What Sets Us Apart</p>
            <h2 className="os-highlights-title reveal reveal-delay-1" ref={addRef}>The Pillars of Our Craft</h2>
          </div>
          <div className="os-highlights-grid">
            {highlights.map((h, i) => (
              <div className={`os-highlight-card reveal reveal-delay-${i}`} ref={addRef} key={i}>
                <span className="os-highlight-icon">{h.icon}</span>
                <h3 className="os-highlight-title">{h.title}</h3>
                <p className="os-highlight-desc">{h.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Closing */}
        <section className="os-closing">
          <div className="os-divider reveal" ref={addRef} style={{ margin: "0 auto 24px" }}>
            <span className="os-divider-line" /><span className="os-divider-gem" /><span className="os-divider-line" />
          </div>
          <blockquote className="os-closing-quote reveal reveal-delay-1" ref={addRef}>
            "Some journeys are measured in miles. Ours are measured in <em>moments</em>."
          </blockquote>
          <a href="/contact" className="os-closing-cta reveal reveal-delay-2" ref={addRef}>Begin Your Journey</a>
        </section>
      </div>
    </>
  );
}