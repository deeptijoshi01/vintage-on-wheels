import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&family=Montserrat:wght@300;400;500;600&display=swap');

        /* ══════════════════════════════════════
           FOOTER — mobile-first
        ══════════════════════════════════════ */
        .footer {
          background: #060503;
          border-top: 1px solid rgba(201,168,76,.08);
          padding: 52px 20px 28px;
          font-family: 'Montserrat', sans-serif;
          position: relative;
          overflow: hidden;
        }

        /* Ghost watermark */
        .footer::before {
          content: 'VOW';
          position: absolute;
          bottom: -20px; left: 50%;
          transform: translateX(-50%);
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(5rem, 30vw, 14rem);
          font-weight: 300;
          letter-spacing: .12em;
          color: rgba(201,168,76,.022);
          white-space: nowrap;
          pointer-events: none;
          user-select: none;
          line-height: 1;
        }

        /* Subtle gold top accent */
        .footer::after {
          content: '';
          position: absolute;
          top: 0; left: 8%; right: 8%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(201,168,76,.22), transparent);
          pointer-events: none;
        }

        /* ── BRAND BLOCK ── */
        .footer-brand {
          text-align: center;
          margin-bottom: 44px;
          position: relative; z-index: 1;
        }

        /* Round logo in footer */
        .footer-logo-link {
          display: inline-block;
          margin-bottom: 14px;
        }
        .footer-logo-wrap {
          position: relative;
          width: 60px; height: 60px;
          margin: 0 auto;
        }
        .footer-logo-wrap::before {
          content: '';
          position: absolute;
          inset: -2px;
          border-radius: 50%;
          background: conic-gradient(
            #a07828 0deg, #f5e08a 60deg, #C9A84C 120deg,
            #f5e08a 180deg, #a07828 240deg, #f5e08a 300deg, #a07828 360deg
          );
          z-index: 0;
          transition: opacity .3s;
        }
        .footer-logo-wrap::after {
          content: '';
          position: absolute;
          inset: 1.5px;
          border-radius: 50%;
          background: #0d0b08;
          z-index: 1;
        }
        .footer-logo-link:hover .footer-logo-wrap::before { opacity: .7; }
        .footer-logo-img {
          position: relative; z-index: 2;
          width: 100%; height: 100%;
          object-fit: cover;
          border-radius: 50%;
          display: block;
          filter: brightness(1.06) drop-shadow(0 2px 10px rgba(201,168,76,.22));
          transition: filter .3s, transform .3s;
        }
        .footer-logo-link:hover .footer-logo-img {
          filter: brightness(1.14) drop-shadow(0 3px 18px rgba(201,168,76,.38));
          transform: scale(1.04);
        }

        .footer-brand-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.3rem, 5vw, 1.75rem);
          font-weight: 300;
          color: #f5f0e8;
          letter-spacing: .06em;
          display: block;
          text-decoration: none;
          line-height: 1;
          margin-bottom: 5px;
          transition: color .3s;
        }
        .footer-brand-name:hover { color: #C9A84C; }

        .footer-brand-tag {
          font-size: .40rem;
          font-weight: 500;
          letter-spacing: .36em;
          color: #C9A84C;
          text-transform: uppercase;
          display: block;
          margin-bottom: 18px;
        }
        .footer-brand-desc {
          font-size: .65rem;
          font-weight: 300;
          line-height: 1.9;
          color: rgba(245,240,232,.26);
          letter-spacing: .03em;
          max-width: 300px;
          margin: 0 auto 20px;
        }
        .footer-divider-sm {
          width: 30px; height: 1px;
          background: rgba(201,168,76,.30);
          margin: 0 auto 18px;
        }

        /* Social icons */
        .footer-socials {
          display: flex;
          justify-content: center;
          gap: 10px;
        }
        .footer-social {
          width: 36px; height: 36px;
          border: 1px solid rgba(201,168,76,.15);
          display: flex; align-items: center; justify-content: center;
          color: rgba(245,240,232,.26);
          text-decoration: none;
          font-size: .66rem;
          transition: all .3s ease;
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
        }
        .footer-social:hover {
          border-color: #C9A84C;
          color: #C9A84C;
          background: rgba(201,168,76,.06);
          transform: translateY(-2px);
        }

        /* ── COLS (mobile: 2-col grid) ── */
        .footer-cols {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 30px 14px;
          margin-bottom: 38px;
          position: relative; z-index: 1;
        }
        .footer-col-full { grid-column: 1 / -1; }

        .footer-col-title {
          font-size: .46rem;
          font-weight: 500;
          letter-spacing: .34em;
          text-transform: uppercase;
          color: #C9A84C;
          margin-bottom: 15px;
          display: flex; align-items: center; gap: 8px;
        }
        .footer-col-title::after {
          content: '';
          flex: 1; height: 1px;
          background: rgba(201,168,76,.09);
        }

        .footer-links {
          list-style: none; margin: 0; padding: 0;
          display: flex; flex-direction: column; gap: 10px;
        }
        .footer-links a {
          font-size: .60rem; font-weight: 300;
          letter-spacing: .07em;
          color: rgba(245,240,232,.28);
          text-decoration: none;
          display: flex; align-items: center; gap: 8px;
          transition: color .3s, gap .3s;
          padding: 2px 0;
        }
        .footer-links a::before {
          content: '–';
          font-size: .46rem;
          color: rgba(201,168,76,.24);
          flex-shrink: 0;
          transition: color .3s;
        }
        .footer-links a:hover { color: rgba(245,240,232,.70); gap: 11px; }
        .footer-links a:hover::before { color: #C9A84C; }

        /* ── CONTACT ── */
        .footer-contact-item {
          font-size: .60rem; font-weight: 300;
          color: rgba(245,240,232,.28);
          line-height: 1.7; letter-spacing: .03em;
          margin-bottom: 13px;
        }
        .footer-contact-label {
          display: block;
          font-size: .40rem; letter-spacing: .30em;
          text-transform: uppercase;
          color: rgba(201,168,76,.40);
          margin-bottom: 3px;
        }
        .footer-contact-item a {
          color: inherit; text-decoration: none; transition: color .3s;
        }
        .footer-contact-item a:hover { color: #C9A84C; }

        /* ── BOTTOM BAR ── */
        .footer-bottom {
          display: flex; flex-direction: column;
          align-items: center; gap: 12px;
          border-top: 1px solid rgba(245,240,232,.04);
          padding-top: 22px;
          position: relative; z-index: 1;
          text-align: center;
        }
        .footer-copy {
          font-size: .48rem; font-weight: 300;
          letter-spacing: .12em;
          color: rgba(245,240,232,.15);
        }
        .footer-copy span { color: rgba(201,168,76,.40); }
        .footer-bottom-links {
          display: flex; gap: 16px;
          flex-wrap: wrap; justify-content: center;
        }
        .footer-bottom-links a {
          font-size: .46rem; font-weight: 300;
          letter-spacing: .14em;
          color: rgba(245,240,232,.15);
          text-decoration: none; text-transform: uppercase;
          transition: color .3s;
        }
        .footer-bottom-links a:hover { color: rgba(201,168,76,.50); }

        /* ══════════════════════════════════════
           TABLET: 768px+
        ══════════════════════════════════════ */
        @media (min-width: 768px) {
          .footer { padding: 70px 6vw 36px; }
          .footer::before { content: 'VINTAGE'; font-size: clamp(4rem, 14vw, 9rem); }

          .footer-top-grid {
            display: grid;
            grid-template-columns: 1.5fr 1fr 1fr;
            gap: 48px;
            margin-bottom: 60px;
            position: relative; z-index: 1;
          }

          /* Brand left-aligned on tablet+ */
          .footer-brand { text-align: left; margin-bottom: 0; }
          .footer-logo-wrap { margin: 0 0 14px; }
          .footer-brand-desc { margin: 0 0 20px; }
          .footer-divider-sm { margin: 0 0 18px; }
          .footer-socials { justify-content: flex-start; }

          /* Cols slot into grid */
          .footer-cols { display: contents; }
          .footer-col-full { grid-column: auto; }

          .footer-bottom { flex-direction: row; justify-content: space-between; text-align: left; }
          .footer-bottom-links { flex-wrap: nowrap; }
        }

        /* ══════════════════════════════════════
           LAPTOP: 1024px+
        ══════════════════════════════════════ */
        @media (min-width: 1024px) {
          .footer { padding: 88px 7vw 40px; }
          .footer::before { font-size: clamp(6rem, 16vw, 13rem); }

          .footer-top-grid {
            grid-template-columns: 1.8fr 1fr 1fr 1fr;
            gap: 64px;
            margin-bottom: 80px;
          }

          .footer-logo-wrap { width: 66px; height: 66px; }
          .footer-brand-desc { max-width: 300px; font-size: .67rem; }
          .footer-links a { font-size: .62rem; }
          .footer-contact-item { font-size: .62rem; }
        }

        /* ══════════════════════════════════════
           LARGE DESKTOP: 1280px+
        ══════════════════════════════════════ */
        @media (min-width: 1280px) {
          .footer { padding: 96px 8vw 44px; }
          .footer-top-grid { gap: 80px; }
        }

        /* Mobile override: show top-grid as block */
        @media (max-width: 767px) {
          .footer-top-grid { display: block; }
        }
      `}</style>

      <footer className="footer" id="contact">
        <div style={{ position: "relative", zIndex: 1 }}>

          <div className="footer-top-grid">

            {/* ── BRAND ── */}
            <div className="footer-brand">
              <Link to="/" className="footer-logo-link">
                <div className="footer-logo-wrap">
                  <img
                    src="/images/logo.png"
                    alt="Vintage On Wheels"
                    className="footer-logo-img"
                    onError={(e) => { e.currentTarget.parentElement.parentElement.style.display = "none"; }}
                  />
                </div>
              </Link>
              <Link to="/" className="footer-brand-name">Vintage On Wheels</Link>
              <span className="footer-brand-tag">Nashik, India</span>
              <p className="footer-brand-desc">
                A curated collection of the world's most exceptional vintage automobiles —
                available for weddings, film shoots, and extraordinary occasions in and around Nashik.
              </p>
              <div className="footer-divider-sm" />
              <div className="footer-socials">
                <a href="#" className="footer-social" aria-label="Instagram">ig</a>
                <a href="#" className="footer-social" aria-label="Facebook">fb</a>
                <a href="#" className="footer-social" aria-label="YouTube">yt</a>
              </div>
            </div>

            {/* ── COLS ── */}
            <div className="footer-cols">

              {/* Navigate */}
              <div>
                <div className="footer-col-title">Navigate</div>
                <ul className="footer-links">
                  <li><Link to="/">Homepage</Link></li>
                  <li><Link to="/cars">Collection</Link></li>
                  <li><Link to="/our-story">Our Story</Link></li>
                  <li><Link to="/contact">Enquire</Link></li>
                </ul>
              </div>

              {/* Fleet */}
              <div>
                <div className="footer-col-title">Fleet</div>
                <ul className="footer-links">
                  <li><Link to="/cars?cat=Muscle">Muscle Cars</Link></li>
                  <li><Link to="/cars?cat=Luxury">Luxury</Link></li>
                  <li><Link to="/cars?cat=Sports">Sports</Link></li>
                  <li><Link to="/cars?cat=Classic">Classics</Link></li>
                </ul>
              </div>

              {/* Contact */}
              <div className="footer-col-full">
                <div className="footer-col-title">Contact</div>
                <div className="footer-contact-item">
                  <span className="footer-contact-label">Location</span>
                  Nashik, Maharashtra, India
                </div>
                <div className="footer-contact-item">
                  <span className="footer-contact-label">WhatsApp</span>
                  <a href="https://wa.me/918378913269" target="_blank" rel="noreferrer">
                    +91 8378913269
                  </a>
                </div>
                <div className="footer-contact-item">
                  <span className="footer-contact-label">Email</span>
                  <a href="mailto:hello@vintageonwheels.in">hello@vintageonwheels.in</a>
                </div>
              </div>

            </div>{/* /footer-cols */}
          </div>{/* /footer-top-grid */}

          {/* ── BOTTOM BAR ── */}
          <div className="footer-bottom">
            <p className="footer-copy">© 2026 <span>Vintage On Wheels</span>. All rights reserved.</p>
            <div className="footer-bottom-links">
              <a href="#">Privacy</a>
              <a href="#">Terms</a>
              <a href="#">Sitemap</a>
            </div>
          </div>

        </div>
      </footer>
    </>
  );
}