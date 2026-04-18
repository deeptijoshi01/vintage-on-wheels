import { useState, useEffect, useRef } from "react";
import img1 from "../assets/4.png";
import img2 from "../assets/6.png";
import img3 from "../assets/10.png";

const slides = [
  {
    image: img1,
    eyebrow: "New Collection",
    title: "Timeless",
    subtitle: "Elegance",
    caption: "Where heritage meets modern refinement",
    cta: "Explore Now",
  },
  {
    image: img2,
    eyebrow: "Curated Pieces",
    title: "Rare",
    subtitle: "Antiquities",
    caption: "Each piece tells a story across centuries",
    cta: "Discover More",
  },
  {
    image: img3,
    eyebrow: "The Archive",
    title: "Crafted",
    subtitle: "Heritage",
    caption: "Preserving beauty for generations to come",
    cta: "View Archive",
  },
];

const AUTOPLAY = 5500;

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [textIn, setTextIn] = useState(true);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);
  const progressRef = useRef(null);
  const startTimeRef = useRef(null);

  const goTo = (index) => {
    if (animating || index === current) return;
    setAnimating(true);
    setTextIn(false);
    setTimeout(() => {
      setCurrent(index);
      setProgress(0);
      startTimeRef.current = performance.now();
      setTimeout(() => {
        setTextIn(true);
        setAnimating(false);
      }, 200);
    }, 500);
  };

  const next = () => goTo((current + 1) % slides.length);
  const prev = () => goTo((current - 1 + slides.length) % slides.length);

  useEffect(() => {
    if (paused) return;
    startTimeRef.current = performance.now();
    const animate = (now) => {
      const elapsed = now - startTimeRef.current;
      const pct = Math.min((elapsed / AUTOPLAY) * 100, 100);
      setProgress(pct);
      if (elapsed < AUTOPLAY) {
        progressRef.current = requestAnimationFrame(animate);
      } else {
        goTo((current + 1) % slides.length);
      }
    };
    progressRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(progressRef.current);
  }, [current, paused]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Montserrat:wght@300;400;500&display=swap');

        .hero-slider {
          position: relative;
          width: 100vw;
          height: 100vh;
          overflow: hidden;
          background: #0a0804;
          font-family: 'Montserrat', sans-serif;
        }

        .slide {
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity 1.2s ease;
          pointer-events: none;
        }

        .slide.active {
          opacity: 1;
          pointer-events: all;
        }

        .slide-bg {
          position: absolute;
          inset: -6%;
          background-size: cover;
          background-position: center;
          animation: none;
          transform: scale(1.06);
          transition: transform 0.1s linear;
        }

        .slide.active .slide-bg {
          animation: kenburns 6s ease forwards;
        }

        @keyframes kenburns {
          from { transform: scale(1.06); }
          to   { transform: scale(1.0); }
        }

        .slide-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(8,6,4,0.25) 0%,
            rgba(8,6,4,0.15) 30%,
            rgba(8,6,4,0.55) 65%,
            rgba(8,6,4,0.88) 100%
          );
        }

        .grain-overlay {
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.06'/%3E%3C/svg%3E");
          opacity: 0.4;
          pointer-events: none;
        }

        .slide-content {
          position: absolute;
          bottom: 12vh;
          left: 8vw;
          max-width: 620px;
          transition: opacity 0.5s ease, transform 0.5s ease;
        }

        .text-enter .slide-content {
          opacity: 0;
          transform: translateY(28px);
        }

        .text-visible .slide-content {
          opacity: 1;
          transform: translateY(0);
          transition: opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s;
        }

        .eyebrow {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.7rem;
          font-weight: 500;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: #C9A84C;
          margin-bottom: 1.2rem;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .eyebrow::before {
          content: '';
          display: block;
          width: 36px;
          height: 1px;
          background: #C9A84C;
        }

        .headline {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(3.8rem, 7vw, 7rem);
          line-height: 0.92;
          color: #f5f0e8;
          font-weight: 300;
          margin-bottom: 0.1em;
          letter-spacing: -0.01em;
        }

        .headline-italic {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(3.8rem, 7vw, 7rem);
          line-height: 0.92;
          color: #f5f0e8;
          font-weight: 300;
          font-style: italic;
          display: block;
          margin-bottom: 1.4rem;
          letter-spacing: -0.01em;
        }

        .caption {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.78rem;
          font-weight: 300;
          letter-spacing: 0.12em;
          color: rgba(245,240,232,0.6);
          margin-bottom: 2.4rem;
          text-transform: uppercase;
        }

        .cta-btn {
          display: inline-block;
          padding: 13px 40px;
          border: 1px solid rgba(201,168,76,0.6);
          color: #C9A84C;
          font-family: 'Montserrat', sans-serif;
          font-size: 0.68rem;
          font-weight: 500;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          text-decoration: none;
          background: transparent;
          cursor: pointer;
          transition: background 0.3s ease, border-color 0.3s ease, color 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .cta-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: #C9A84C;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s ease;
          z-index: -1;
        }

        .cta-btn:hover::before { transform: scaleX(1); }
        .cta-btn:hover { color: #0a0804; border-color: #C9A84C; }

        /* Arrows */
        .arrow-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 10;
          background: none;
          border: none;
          cursor: pointer;
          padding: 16px;
          color: rgba(245,240,232,0.4);
          transition: color 0.3s ease;
        }

        .arrow-btn:hover { color: #C9A84C; }
        .arrow-btn.left { left: 2vw; }
        .arrow-btn.right { right: 2vw; }

        .arrow-btn svg {
          width: 28px;
          height: 28px;
          stroke: currentColor;
          fill: none;
          stroke-width: 1.2;
        }

        /* Dots */
        .dots {
          position: absolute;
          bottom: 28px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 10;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .dot {
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
          display: flex;
          align-items: center;
        }

        .dot-inner {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: rgba(245,240,232,0.3);
          transition: all 0.4s ease;
        }

        .dot.active .dot-inner {
          width: 28px;
          border-radius: 3px;
          background: #C9A84C;
        }

        /* Progress bar */
        .progress-bar {
          position: absolute;
          bottom: 0;
          left: 0;
          height: 2px;
          background: rgba(201,168,76,0.2);
          width: 100%;
          z-index: 10;
        }

        .progress-fill {
          height: 100%;
          background: #C9A84C;
          transition: width 0.1s linear;
        }

        /* Slide counter */
        .slide-counter {
          position: absolute;
          top: 44px;
          right: 5vw;
          z-index: 10;
          font-family: 'Cormorant Garamond', serif;
          font-size: 0.85rem;
          color: rgba(245,240,232,0.4);
          letter-spacing: 0.15em;
        }

        .slide-counter span {
          color: #C9A84C;
          font-size: 1.1rem;
        }

        /* Vertical line decorative */
        .deco-line {
          position: absolute;
          top: 0;
          right: 10vw;
          width: 1px;
          height: 60px;
          background: linear-gradient(to bottom, transparent, rgba(201,168,76,0.5));
          z-index: 10;
        }

        @media (max-width: 768px) {
          .slide-content { left: 6vw; bottom: 14vh; max-width: 90vw; }
          .arrow-btn { display: none; }
          .headline, .headline-italic { font-size: clamp(3rem, 11vw, 4.5rem); }
          .eyebrow { font-size: 0.62rem; }
          .caption { font-size: 0.7rem; }
        }
      `}</style>

      <div
        className="hero-slider"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Decorative elements */}
        <div className="deco-line" />
        <div className="slide-counter">
          <span>{String(current + 1).padStart(2, "0")}</span>
          {" / "}
          {String(slides.length).padStart(2, "0")}
        </div>

        {/* Slides */}
        {slides.map((slide, i) => (
          <div key={i} className={`slide ${i === current ? "active" : ""}`}>
            <div
              className="slide-bg"
              style={{ backgroundImage: `url(${slide.image})` }}
            />
            <div className="slide-overlay" />
            <div className="grain-overlay" />

            <div className={`${textIn && i === current ? "text-visible" : "text-enter"}`}>
              <div className="slide-content">
                <div className="eyebrow">{slide.eyebrow}</div>
                <h1 className="headline">{slide.title}</h1>
                <span className="headline-italic">{slide.subtitle}</span>
                <p className="caption">{slide.caption}</p>
                <button className="cta-btn">{slide.cta}</button>
              </div>
            </div>
          </div>
        ))}

        {/* Arrow Buttons */}
        <button className="arrow-btn left" onClick={prev} aria-label="Previous">
          <svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6" /></svg>
        </button>
        <button className="arrow-btn right" onClick={next} aria-label="Next">
          <svg viewBox="0 0 24 24"><polyline points="9 6 15 12 9 18" /></svg>
        </button>

        {/* Dot Nav */}
        <div className="dots">
          {slides.map((_, i) => (
            <button key={i} className={`dot ${i === current ? "active" : ""}`} onClick={() => goTo(i)} aria-label={`Slide ${i + 1}`}>
              <div className="dot-inner" />
            </button>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </>
  );
}