import { useState, useEffect, useRef, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { carsData, WHATSAPP_NUMBER } from "../data/cars";
import CarCard from "../components/CarCard";

const arrowBase = {
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  zIndex: 30,
  width: "38px",
  height: "38px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "rgba(0,0,0,0.55)",
  border: "1px solid rgba(201,168,76,0.6)",
  color: "#C9A84C",
  cursor: "pointer",
  pointerEvents: "all",
  outline: "none",
  padding: 0,
  transition: "background 0.25s",
};
const arrowPrev = { ...arrowBase, left: "10px" };
const arrowNext = { ...arrowBase, right: "10px" };

export default function CarDetail() {
  const { id } = useParams();
  const car = carsData.find((c) => c.id === Number(id));

  const [activeImg, setActiveImg] = useState(0);
  const [imgLoaded, setImgLoaded] = useState(false);
  const isPausedRef = useRef(false);

  const totalImages = car ? car.images.length : 0;
  const hasMultiple = totalImages > 1;

  const goPrev = useCallback(() => setActiveImg((p) => (p - 1 + totalImages) % totalImages), [totalImages]);
  const goNext = useCallback(() => setActiveImg((p) => (p + 1) % totalImages), [totalImages]);
  const goTo = (i) => setActiveImg(i);

  useEffect(() => {
    if (!hasMultiple) return;
    const iv = setInterval(() => {
      if (!isPausedRef.current) setActiveImg((p) => (p + 1) % totalImages);
    }, 3000);
    return () => clearInterval(iv);
  }, [hasMultiple, totalImages]);

  useEffect(() => { setActiveImg(0); }, [id]);

  useEffect(() => {
    setImgLoaded(false);
    const t = setTimeout(() => setImgLoaded(true), 100);
    return () => clearTimeout(t);
  }, [activeImg]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.06, rootMargin: "0px 0px -30px 0px" }
    );
    document.querySelectorAll(".reveal, .reveal-left, .reveal-right").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [id]);

  if (!car) {
    return (
      <div style={{ minHeight: "100vh", background: "#080604", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
        <div style={{ textAlign: "center" }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", color: "#f5f0e8", marginBottom: "20px" }}>Vehicle Not Found</h2>
          <Link to="/cars" style={{ color: "#C9A84C", fontFamily: "Montserrat, sans-serif", fontSize: ".65rem", letterSpacing: ".3em" }}>← Return to Collection</Link>
        </div>
      </div>
    );
  }

  const related = carsData.filter((c) => c.id !== car.id && c.category === car.category).slice(0, 3);
  const moreRelated = related.length === 0 ? carsData.filter((c) => c.id !== car.id).slice(0, 3) : related;

  const whatsappMsg = encodeURIComponent(
    `Hello! I'm interested in booking the ${car.name} (${car.year}).\n\nCould you please share availability and pricing details?\n\nThank you!`
  );
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMsg}`;

  return (
    <>
      <style>{`
        /* ── REVEAL ── */
        .reveal, .reveal-left, .reveal-right {
          opacity: 0; transform: translateY(24px);
          transition: opacity .8s cubic-bezier(.22,1,.36,1), transform .8s cubic-bezier(.22,1,.36,1);
        }
        .reveal-left { transform: translateX(-24px); }
        .reveal-right { transform: translateX(24px); }
        .reveal.visible, .reveal-left.visible, .reveal-right.visible { opacity: 1; transform: none; }
        .delay-1 { transition-delay: .1s !important; }
        .delay-2 { transition-delay: .2s !important; }
        .delay-3 { transition-delay: .3s !important; }

        /* ── DETAIL PAGE – MOBILE FIRST ── */
        .detail-page {
          min-height: 100vh;
          background: #080604;
          padding-top: 70px;
        }

        /* Breadcrumb */
        .breadcrumb {
          padding: 16px 16px;
          display: flex; align-items: center;
          flex-wrap: wrap; gap: 6px;
          font-family: 'Montserrat', sans-serif;
          font-size: clamp(.44rem, 1.8vw, .54rem);
          letter-spacing: .2em;
          color: rgba(245,240,232,.28); text-transform: uppercase;
        }
        .breadcrumb a { color: inherit; text-decoration: none; transition: color .3s; }
        .breadcrumb a:hover { color: #C9A84C; }
        .breadcrumb span { color: rgba(201,168,76,.5); }

        /* ── GALLERY ── */
        .gallery-wrap { width: 100%; }
        .gallery-main {
          position: relative;
          aspect-ratio: 4/3;
          overflow: hidden;
          background: #111009;
        }
        .gallery-main-img {
          width: 100%; height: 100%;
          object-fit: cover;
          transition: opacity .5s ease, transform .7s ease;
          filter: brightness(.85) saturate(.9);
          pointer-events: none;
        }
        .gallery-main-img.loaded  { opacity: 1; transform: scale(1); }
        .gallery-main-img.loading { opacity: 0; transform: scale(1.02); }

        .gallery-tag {
          position: absolute; top: 12px; left: 12px;
          font-family: 'Montserrat', sans-serif;
          font-size: clamp(.4rem, 1.6vw, .52rem);
          font-weight: 500; letter-spacing: .26em; text-transform: uppercase;
          color: #C9A84C; border: 1px solid rgba(201,168,76,.45);
          padding: 4px 10px; background: rgba(8,6,4,.6); backdrop-filter: blur(6px);
          z-index: 5; pointer-events: none;
        }
        .gallery-avail {
          position: absolute; top: 12px; right: 12px;
          display: flex; align-items: center; gap: 6px;
          font-family: 'Montserrat', sans-serif;
          font-size: clamp(.38rem, 1.5vw, .52rem);
          letter-spacing: .18em; text-transform: uppercase;
          background: rgba(8,6,4,.7); backdrop-filter: blur(6px);
          padding: 5px 10px; border: 1px solid rgba(255,255,255,.08);
          z-index: 5; pointer-events: none;
        }
        .avail-dot { width: 6px; height: 6px; border-radius: 50%; }
        .avail-dot.yes { background: #4ade80; box-shadow: 0 0 5px #4ade80; }
        .avail-dot.no  { background: #f87171; box-shadow: 0 0 5px #f87171; }
        .avail-text.yes { color: #4ade80; }
        .avail-text.no  { color: #f87171; }

        .slider-arrow:hover { background: rgba(201,168,76,.28) !important; }
        .slider-arrow svg {
          width: 16px; height: 16px;
          fill: none; stroke: currentColor;
          stroke-width: 2.5; stroke-linecap: round; stroke-linejoin: round;
          pointer-events: none;
        }

        .slider-dots {
          position: absolute;
          bottom: 10px; left: 50%; transform: translateX(-50%);
          display: flex; align-items: center; gap: 7px;
          z-index: 30; pointer-events: all;
        }
        .slider-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: rgba(255,255,255,.3);
          border: 1px solid rgba(255,255,255,.2);
          cursor: pointer; pointer-events: all;
          transition: background .3s, transform .3s, border-color .3s;
        }
        .slider-dot.active { background: #C9A84C; border-color: #C9A84C; transform: scale(1.45); }

        .gallery-thumbs {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2px;
          margin-top: 2px;
        }
        .gallery-thumb {
          aspect-ratio: 4/3; overflow: hidden;
          border: 1px solid transparent;
          transition: border-color .3s;
          cursor: pointer;
        }
        .gallery-thumb.active { border-color: #C9A84C; }
        .gallery-thumb img {
          width: 100%; height: 100%; object-fit: cover;
          filter: brightness(.65) saturate(.7);
          transition: filter .4s, transform .5s;
          pointer-events: none;
        }
        .gallery-thumb:hover img, .gallery-thumb.active img {
          filter: brightness(.9) saturate(1);
          transform: scale(1.04);
        }

        /* ── INFO PANEL ── */
        .detail-info { padding: 28px 16px; }
        .detail-tag-row { display: flex; align-items: center; gap: 10px; margin-bottom: 14px; flex-wrap: wrap; }
        .detail-tag {
          font-family: 'Montserrat', sans-serif;
          font-size: clamp(.42rem, 1.7vw, .52rem);
          font-weight: 500; letter-spacing: .26em; text-transform: uppercase;
          color: #C9A84C; border: 1px solid rgba(201,168,76,.35); padding: 4px 12px;
        }
        .detail-cat {
          font-family: 'Montserrat', sans-serif;
          font-size: clamp(.4rem, 1.6vw, .52rem);
          letter-spacing: .24em; color: rgba(245,240,232,.3); text-transform: uppercase;
        }
        .detail-year {
          font-family: 'Montserrat', sans-serif;
          font-size: clamp(.5rem, 2vw, .6rem);
          font-weight: 500; letter-spacing: .34em; color: rgba(201,168,76,.65);
          text-transform: uppercase; margin-bottom: 10px;
        }
        .detail-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2rem, 8vw, 4rem);
          font-weight: 300; color: #f5f0e8;
          line-height: 1.05; letter-spacing: -.01em; margin: 0 0 12px;
        }
        .detail-tagline {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic; font-size: clamp(.95rem, 3.5vw, 1.1rem);
          font-weight: 300; color: rgba(245,240,232,.38); margin-bottom: 22px;
        }
        .detail-divider { width: 36px; height: 1px; background: rgba(201,168,76,.35); margin: 22px 0; }
        .detail-desc {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(.95rem, 3.5vw, 1.05rem);
          font-weight: 300; line-height: 1.85;
          color: rgba(245,240,232,.55); margin-bottom: 22px;
        }

        /* Pricing */
        .pricing-row {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 1px; margin: 22px 0;
          border: 1px solid rgba(201,168,76,.12);
        }
        .pricing-item {
          padding: 18px 16px; background: rgba(201,168,76,.03);
          border-right: 1px solid rgba(201,168,76,.08);
        }
        .pricing-item:last-child { border-right: none; }
        .pricing-label {
          font-family: 'Montserrat', sans-serif;
          font-size: clamp(.4rem, 1.6vw, .5rem);
          letter-spacing: .26em; color: rgba(245,240,232,.3);
          text-transform: uppercase; margin-bottom: 6px;
        }
        .pricing-value {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.4rem, 5vw, 1.8rem);
          font-weight: 300; color: #C9A84C;
        }

        /* CTAs */
        .detail-cta { display: flex; flex-direction: column; gap: 10px; margin: 28px 0; }
        .btn-book-wa {
          display: flex; align-items: center; justify-content: center; gap: 10px;
          font-family: 'Montserrat', sans-serif;
          font-size: clamp(.54rem, 2.2vw, .62rem);
          font-weight: 600; letter-spacing: .26em; text-transform: uppercase;
          text-decoration: none; background: #25D366; color: white; padding: 16px 24px;
          transition: background .3s, transform .3s, box-shadow .3s;
        }
        .btn-book-wa:hover { background: #20bf5b; transform: translateY(-2px); box-shadow: 0 10px 32px rgba(37,211,102,.4); }
        .btn-book-wa svg { width: 18px; height: 18px; fill: currentColor; }
        .btn-enquire {
          display: flex; align-items: center; justify-content: center;
          font-family: 'Montserrat', sans-serif;
          font-size: clamp(.52rem, 2vw, .62rem);
          font-weight: 500; letter-spacing: .24em; text-transform: uppercase;
          text-decoration: none; color: rgba(245,240,232,.55);
          border: 1px solid rgba(245,240,232,.14); padding: 14px 24px;
          transition: border-color .3s, color .3s;
        }
        .btn-enquire:hover { border-color: rgba(201,168,76,.45); color: #C9A84C; }

        /* Specs */
        .specs-title {
          font-family: 'Montserrat', sans-serif;
          font-size: clamp(.48rem, 1.9vw, .56rem);
          font-weight: 500; letter-spacing: .34em; text-transform: uppercase;
          color: #C9A84C;
          display: flex; align-items: center; gap: 10px; margin-bottom: 16px;
        }
        .specs-title::after { content: ''; flex: 1; height: 1px; background: rgba(201,168,76,.15); }
        .specs-table {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 1px; background: rgba(201,168,76,.06);
          border: 1px solid rgba(201,168,76,.08); margin-bottom: 24px;
        }
        .spec-row {
          padding: 12px 14px; background: #0a0806;
          display: flex; flex-direction: column; gap: 3px;
        }
        .spec-key {
          font-family: 'Montserrat', sans-serif;
          font-size: clamp(.38rem, 1.5vw, .5rem);
          letter-spacing: .24em; color: rgba(245,240,232,.3); text-transform: uppercase;
        }
        .spec-val {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(.9rem, 3.5vw, 1rem);
          font-weight: 400; color: rgba(245,240,232,.85);
        }

        /* Features */
        .features-list { display: grid; grid-template-columns: 1fr; gap: 9px; margin-bottom: 24px; }
        .feature-item {
          display: flex; align-items: center; gap: 10px;
          font-family: 'Montserrat', sans-serif;
          font-size: clamp(.56rem, 2.2vw, .62rem);
          font-weight: 300; letter-spacing: .06em; color: rgba(245,240,232,.5);
        }
        .feature-item::before {
          content: ''; width: 18px; height: 1px;
          background: rgba(201,168,76,.5); flex-shrink: 0;
        }

        /* Occasions */
        .occasions-list { display: flex; flex-wrap: wrap; gap: 7px; margin-bottom: 24px; }
        .occasion-tag {
          font-family: 'Montserrat', sans-serif;
          font-size: clamp(.44rem, 1.8vw, .52rem);
          font-weight: 400; letter-spacing: .2em; text-transform: uppercase;
          color: rgba(245,240,232,.4);
          border: 1px solid rgba(245,240,232,.1); padding: 6px 14px;
        }

        /* Related */
        .related { padding: 60px 0 80px; border-top: 1px solid rgba(201,168,76,.07); }
        .related-header { padding: 0 16px; margin-bottom: 32px; }
        .related-grid { display: grid; grid-template-columns: 1fr; gap: 2px; }
        .related-eyebrow {
          font-size: clamp(.5rem, 2vw, .58rem);
          font-family: 'Montserrat', sans-serif;
          letter-spacing: .36em; color: #C9A84C;
          text-transform: uppercase;
          display: flex; align-items: center; gap: 10px; margin-bottom: 12px;
        }
        .related-eyebrow span {
          display: block; width: 26px; height: 1px;
          background: rgba(201,168,76,.5); flex-shrink: 0;
        }
        .related-title {
          font-family: "'Cormorant Garamond', serif";
          font-size: clamp(1.8rem, 7vw, 3.5rem);
          font-weight: 300; color: #f5f0e8;
          letter-spacing: -.01em;
        }
        .related-title em { font-style: italic; color: rgba(245,240,232,.4); }

        /* ── DESKTOP ── */
        @media (min-width: 768px) {
          .detail-page { padding-top: 100px; }
          .breadcrumb { padding: 20px 6vw; }
          .detail-main {
            display: grid;
            grid-template-columns: 1.1fr 1fr;
            gap: 0; align-items: start;
            padding: 0 6vw 80px;
          }
          .gallery-wrap { position: sticky; top: 100px; }
          .detail-info { padding: 0 0 0 6vw; }
          .detail-cta { flex-direction: row; flex-wrap: wrap; }
          .btn-book-wa, .btn-enquire { flex: 1; min-width: 180px; }
          .features-list { grid-template-columns: 1fr 1fr; }
          .related { padding: 80px 0 100px; }
          .related-header { padding: 0 5vw; margin-bottom: 44px; }
          .related-grid { grid-template-columns: repeat(3, 1fr); }
        }
      `}</style>

      <div className="detail-page page-enter">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <Link to="/">Home</Link>
          <span>›</span>
          <Link to="/cars">Collection</Link>
          <span>›</span>
          <span style={{ color: "rgba(245,240,232,.55)" }}>{car.shortName}</span>
        </div>

        <div className="detail-main">
          {/* Gallery */}
          <div className="gallery-wrap reveal-left">
            <div
              className="gallery-main"
              onMouseEnter={() => { isPausedRef.current = true; }}
              onMouseLeave={() => { isPausedRef.current = false; }}
            >
              <img
                src={car.images[activeImg]}
                alt={car.name}
                className={`gallery-main-img ${imgLoaded ? "loaded" : "loading"}`}
              />
              <div className="gallery-tag">{car.tag}</div>
              <div className="gallery-avail">
                <div className={`avail-dot ${car.available ? "yes" : "no"}`} />
                <span className={`avail-text ${car.available ? "yes" : "no"}`}>
                  {car.available ? "Available" : "Booked"}
                </span>
              </div>

              {hasMultiple && (
                <>
                  <button className="slider-arrow" style={arrowPrev} onClick={(e) => { e.stopPropagation(); goPrev(); }} aria-label="Previous">
                    <svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6" /></svg>
                  </button>
                  <button className="slider-arrow" style={arrowNext} onClick={(e) => { e.stopPropagation(); goNext(); }} aria-label="Next">
                    <svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6" /></svg>
                  </button>
                  <div className="slider-dots">
                    {car.images.map((_, i) => (
                      <div key={i} className={`slider-dot ${i === activeImg ? "active" : ""}`} onClick={() => goTo(i)} />
                    ))}
                  </div>
                </>
              )}
            </div>

            <div className="gallery-thumbs">
              {car.images.map((img, i) => (
                <div key={i} className={`gallery-thumb ${i === activeImg ? "active" : ""}`} onClick={() => goTo(i)}>
                  <img src={img} alt={`${car.name} ${i + 1}`} />
                </div>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="detail-info">
            <div className="detail-tag-row reveal">
              <span className="detail-tag">{car.tag}</span>
              <span className="detail-cat">{car.category}</span>
            </div>
            <div className="detail-year reveal delay-1">{car.year}</div>
            <h1 className="detail-name reveal delay-1">{car.name}</h1>
            <p className="detail-tagline reveal delay-2">"{car.tagline}"</p>
            <div className="detail-divider reveal delay-2" />
            <p className="detail-desc reveal delay-2">{car.description}</p>

            <div className="reveal delay-3">
              <div className="specs-title">Rental Pricing</div>
              <div className="pricing-row">
                <div className="pricing-item">
                  <div className="pricing-label">Per Day</div>
                  <div className="pricing-value">{car.pricePerDay}</div>
                </div>
                <div className="pricing-item">
                  <div className="pricing-label">Per Event</div>
                  <div className="pricing-value">{car.pricePerEvent}</div>
                </div>
              </div>
            </div>

            <div className="detail-cta reveal delay-3">
              <a href={whatsappUrl} className="btn-book-wa" target="_blank" rel="noreferrer">
                <svg viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                {car.available ? "Book on WhatsApp" : "Join Waitlist"}
              </a>
              <Link to="/cars" className="btn-enquire">← Back to Collection</Link>
            </div>

            <div className="detail-divider reveal" />

            <div className="reveal delay-1">
              <div className="specs-title">Specifications</div>
              <div className="specs-table">
                {Object.entries(car.specs).map(([k, v]) => (
                  <div className="spec-row" key={k}>
                    <span className="spec-key">{k}</span>
                    <span className="spec-val">{v}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="reveal delay-2">
              <div className="specs-title">Features</div>
              <div className="features-list">
                {car.features.map((f) => <div className="feature-item" key={f}>{f}</div>)}
              </div>
            </div>

            <div className="reveal delay-3">
              <div className="specs-title">Ideal For</div>
              <div className="occasions-list">
                {car.occasions.map((o) => <span className="occasion-tag" key={o}>{o}</span>)}
              </div>
            </div>
          </div>
        </div>

        {/* Related */}
        {moreRelated.length > 0 && (
          <div className="related">
            <div className="related-header">
              <div className="related-eyebrow reveal">
                <span />
                You May Also Like
              </div>
              <h3 className="related-title reveal delay-1">
                More <em>Fine Automobiles</em>
              </h3>
            </div>
            <div className="related-grid">
              {moreRelated.map((c, i) => <CarCard key={c.id} car={c} index={i} />)}
            </div>
          </div>
        )}
      </div>
    </>
  );
}