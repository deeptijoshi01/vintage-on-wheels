import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { carsData } from "../data/cars";
import CarCard from "../components/CarCard";

const categories = ["All", "Muscle", "Luxury", "Sports", "Classic"];

export default function Cars() {
  const [searchParams] = useSearchParams();
  const initialCat = searchParams.get("cat") || "All";
  const [active, setActive] = useState(categories.includes(initialCat) ? initialCat : "All");

  const filtered = active === "All" ? carsData : carsData.filter((c) => c.category === active);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.06 }
    );
    document.querySelectorAll(".reveal, .reveal-left, .reveal-right").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [active]);

  return (
    <>
      <style>{`
        /* ── CARS PAGE – MOBILE FIRST ── */
        .reveal, .reveal-left, .reveal-right {
          opacity: 0; transform: translateY(24px);
          transition: opacity .8s cubic-bezier(.22,1,.36,1), transform .8s cubic-bezier(.22,1,.36,1);
        }
        .reveal.visible, .reveal-left.visible, .reveal-right.visible { opacity: 1; transform: none; }
        .delay-1 { transition-delay: .1s !important; }
        .delay-2 { transition-delay: .2s !important; }

        .cars-page {
          min-height: 100vh;
          background: #080604;
          padding-top: 80px;
          padding-bottom: 80px;
        }

        /* Hero */
        .cars-hero {
          text-align: center;
          padding: 40px 20px 52px;
          position: relative;
          overflow: hidden;
        }
        .cars-hero::before {
          content: 'VOW';
          position: absolute; top: 0; left: 50%;
          transform: translateX(-50%);
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(5rem, 40vw, 18rem);
          font-weight: 300;
          color: rgba(201,168,76,.03);
          white-space: nowrap; pointer-events: none;
          letter-spacing: .1em; z-index: 0;
        }
        .cars-eyebrow {
          font-family: 'Montserrat', sans-serif;
          font-size: clamp(.5rem, 2vw, .6rem);
          font-weight: 500;
          letter-spacing: .4em; text-transform: uppercase;
          color: #C9A84C;
          display: flex; align-items: center; justify-content: center;
          gap: 12px; margin-bottom: 16px;
          position: relative; z-index: 1;
          opacity: 0; animation: fadeUp .7s .1s forwards;
        }
        .cars-eyebrow::before,
        .cars-eyebrow::after {
          content: ''; display: block;
          width: 32px; height: 1px;
          background: rgba(201,168,76,.4);
        }
        .cars-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(3rem, 12vw, 7rem);
          font-weight: 300; color: #f5f0e8;
          line-height: .95; margin: 0 0 10px;
          letter-spacing: -.01em;
          position: relative; z-index: 1;
          opacity: 0; animation: fadeUp .7s .18s forwards;
        }
        .cars-title em { font-style: italic; color: rgba(245,240,232,.45); }
        .cars-subtitle {
          font-family: 'Montserrat', sans-serif;
          font-size: clamp(.54rem, 2.2vw, .66rem);
          font-weight: 300;
          letter-spacing: .2em; color: rgba(245,240,232,.3);
          text-transform: uppercase;
          position: relative; z-index: 1;
          opacity: 0; animation: fadeUp .7s .26s forwards;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Filter bar — horizontally scrollable on mobile */
        .filter-bar {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 0 16px 36px;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          position: relative; z-index: 1;
        }
        .filter-bar::-webkit-scrollbar { display: none; }
        .filter-btn {
          background: none;
          border: 1px solid rgba(245,240,232,.08);
          color: rgba(245,240,232,.38);
          font-family: 'Montserrat', sans-serif;
          font-size: clamp(.5rem, 2vw, .58rem);
          font-weight: 500;
          letter-spacing: .26em; text-transform: uppercase;
          padding: 9px 18px;
          transition: all .3s ease;
          white-space: nowrap;
          flex-shrink: 0;
          cursor: pointer;
        }
        .filter-btn:hover { border-color: rgba(201,168,76,.35); color: #C9A84C; }
        .filter-btn.active {
          border-color: #C9A84C; color: #C9A84C;
          background: rgba(201,168,76,.08);
        }
        .filter-count { font-size: .45rem; opacity: .5; margin-left: 3px; }

        /* Grid */
        .cars-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2px;
          padding: 0 0 0 0;
        }
        .cars-empty {
          grid-column: 1 / -1; text-align: center;
          padding: 60px 20px;
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.4rem; font-weight: 300;
          color: rgba(245,240,232,.25);
        }

        /* Bottom CTA */
        .cars-bottom-cta {
          text-align: center;
          padding: 64px 20px 0;
        }
        .cta-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.3rem, 5vw, 2.4rem);
          font-weight: 300; color: rgba(245,240,232,.5);
          margin-bottom: 24px;
          line-height: 1.3;
        }
        .cta-text span { color: #f5f0e8; }
        .btn-whatsapp-lg {
          display: inline-flex; align-items: center; gap: 10px;
          font-family: 'Montserrat', sans-serif;
          font-size: clamp(.54rem, 2.2vw, .62rem);
          font-weight: 500; letter-spacing: .24em; text-transform: uppercase;
          text-decoration: none; background: #25D366; color: white;
          padding: 15px 32px;
          transition: background .3s, transform .3s, box-shadow .3s;
        }
        .btn-whatsapp-lg:hover {
          background: #1fb857; transform: translateY(-2px);
          box-shadow: 0 10px 32px rgba(37,211,102,.35);
        }
        .btn-whatsapp-lg svg { width: 17px; height: 17px; fill: currentColor; }

        /* Responsive */
        @media (min-width: 480px) {
          .cars-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (min-width: 768px) {
          .cars-page { padding-top: 120px; }
          .cars-hero { padding: 50px 5vw 70px; }
          .filter-bar { justify-content: center; overflow: visible; padding: 0 5vw 56px; }
          .cars-grid { padding: 0 4vw; }
        }
        @media (min-width: 1024px) {
          .cars-grid { grid-template-columns: repeat(3, 1fr); }
        }
      `}</style>

      <div className="cars-page page-enter">
        <div className="cars-hero">
          <div className="cars-eyebrow">Our Collection</div>
          <h1 className="cars-title">The <em>Archive</em></h1>
          <p className="cars-subtitle">{carsData.length} handpicked machines from a golden era</p>
        </div>

        <div className="filter-bar">
          {categories.map((cat) => {
            const count = cat === "All" ? carsData.length : carsData.filter(c => c.category === cat).length;
            return (
              <button
                key={cat}
                className={`filter-btn ${active === cat ? "active" : ""}`}
                onClick={() => setActive(cat)}
              >
                {cat} <span className="filter-count">({count})</span>
              </button>
            );
          })}
        </div>

        <div className="cars-grid">
          {filtered.length === 0 ? (
            <div className="cars-empty">No vehicles in this category yet.</div>
          ) : (
            filtered.map((car, i) => (
              <CarCard key={car.id} car={car} index={i} />
            ))
          )}
        </div>

        <div className="cars-bottom-cta">
          <p className="cta-text reveal">
            Found your <span>dream machine?</span>
          </p>
          <a
            href="https://wa.me/918378913269?text=Hello!%20I%27d%20like%20to%20enquire%20about%20booking%20a%20vintage%20car."
            className="btn-whatsapp-lg reveal delay-2"
            target="_blank" rel="noreferrer"
          >
            <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            Enquire on WhatsApp
          </a>
        </div>
      </div>
    </>
  );
}