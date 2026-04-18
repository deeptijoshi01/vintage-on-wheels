import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <>
      <style>{`
        /* ── FOOTER – MOBILE FIRST ── */
        .footer {
          background: #060503;
          border-top: 1px solid rgba(201,168,76,.08);
          padding: 56px 20px 32px;
          font-family: 'Montserrat', sans-serif;
          position: relative;
          overflow: hidden;
        }
        .footer::before {
          content: 'VOW';
          position: absolute;
          bottom: -20px; left: 50%;
          transform: translateX(-50%);
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(5rem, 30vw, 14rem);
          font-weight: 300;
          letter-spacing: .12em;
          color: rgba(201,168,76,.025);
          white-space: nowrap;
          pointer-events: none;
          user-select: none;
        }

        /* Brand block — always full width on mobile */
        .footer-brand {
          text-align: center;
          margin-bottom: 44px;
          position: relative; z-index: 1;
        }
        .footer-brand-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.5rem, 6vw, 1.9rem);
          font-weight: 300;
          color: #f5f0e8;
          letter-spacing: .06em;
          display: block;
          text-decoration: none;
          line-height: 1;
          margin-bottom: 5px;
        }
        .footer-brand-tag {
          font-size: .44rem;
          font-weight: 500;
          letter-spacing: .38em;
          color: #C9A84C;
          text-transform: uppercase;
          display: block;
          margin-bottom: 18px;
        }
        .footer-brand-desc {
          font-size: .68rem;
          font-weight: 300;
          line-height: 1.85;
          color: rgba(245,240,232,.28);
          letter-spacing: .03em;
          max-width: 320px;
          margin: 0 auto 20px;
        }
        .footer-divider-sm {
          width: 36px; height: 1px;
          background: rgba(201,168,76,.35);
          margin: 0 auto 18px;
        }
        .footer-socials {
          display: flex;
          justify-content: center;
          gap: 10px;
        }
        .footer-social {
          width: 36px; height: 36px;
          border: 1px solid rgba(201,168,76,.18);
          display: flex; align-items: center; justify-content: center;
          color: rgba(245,240,232,.3);
          text-decoration: none;
          font-size: .7rem;
          transition: all .3s ease;
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
        }
        .footer-social:hover {
          border-color: #C9A84C;
          color: #C9A84C;
          background: rgba(201,168,76,.05);
        }

        /* ── COLS GRID ── */
        .footer-cols {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 36px 20px;
          margin-bottom: 44px;
          position: relative; z-index: 1;
        }
        .footer-col-full {
          grid-column: 1 / -1;
        }
        .footer-col-title {
          font-size: .5rem;
          font-weight: 500;
          letter-spacing: .36em;
          text-transform: uppercase;
          color: #C9A84C;
          margin-bottom: 18px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .footer-col-title::after {
          content: '';
          flex: 1;
          height: 1px;
          background: rgba(201,168,76,.12);
        }
        .footer-links {
          list-style: none;
          margin: 0; padding: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .footer-links a {
          font-size: .62rem;
          font-weight: 300;
          letter-spacing: .08em;
          color: rgba(245,240,232,.32);
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: color .3s;
          padding: 2px 0;
        }
        .footer-links a::before {
          content: '–';
          font-size: .5rem;
          color: rgba(201,168,76,.28);
          flex-shrink: 0;
          transition: color .3s;
        }
        .footer-links a:hover { color: rgba(245,240,232,.75); }
        .footer-links a:hover::before { color: #C9A84C; }

        /* ── CONTACT ── */
        .footer-contact-item {
          font-size: .62rem;
          font-weight: 300;
          color: rgba(245,240,232,.32);
          line-height: 1.7;
          letter-spacing: .03em;
          margin-bottom: 14px;
        }
        .footer-contact-label {
          display: block;
          font-size: .44rem;
          letter-spacing: .32em;
          text-transform: uppercase;
          color: rgba(201,168,76,.45);
          margin-bottom: 3px;
        }
        .footer-contact-item a {
          color: inherit;
          text-decoration: none;
          transition: color .3s;
        }
        .footer-contact-item a:hover { color: #C9A84C; }

        /* ── BOTTOM BAR ── */
        .footer-bottom {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 14px;
          border-top: 1px solid rgba(245,240,232,.04);
          padding-top: 24px;
          position: relative; z-index: 1;
          text-align: center;
        }
        .footer-copy {
          font-size: .52rem;
          font-weight: 300;
          letter-spacing: .12em;
          color: rgba(245,240,232,.18);
        }
        .footer-copy span { color: rgba(201,168,76,.45); }
        .footer-bottom-links {
          display: flex;
          gap: 20px;
          flex-wrap: wrap;
          justify-content: center;
        }
        .footer-bottom-links a {
          font-size: .5rem;
          font-weight: 300;
          letter-spacing: .15em;
          color: rgba(245,240,232,.18);
          text-decoration: none;
          text-transform: uppercase;
          transition: color .3s;
        }
        .footer-bottom-links a:hover { color: rgba(201,168,76,.55); }

        /* ── DESKTOP OVERRIDES ── */
        @media (min-width: 768px) {
          .footer {
            padding: 90px 6vw 40px;
          }
          .footer::before {
            content: 'VINTAGE';
          }
          .footer-brand {
            text-align: left;
            margin-bottom: 0;
          }
          .footer-brand-desc { margin: 0 0 20px; }
          .footer-divider-sm { margin: 0 0 18px; }
          .footer-socials { justify-content: flex-start; }
          .footer-top-grid {
            display: grid;
            grid-template-columns: 1.8fr 1fr 1fr 1fr;
            gap: 60px;
            margin-bottom: 80px;
          }
          .footer-cols { display: contents; }
          .footer-bottom {
            flex-direction: row;
            justify-content: space-between;
            text-align: left;
          }
          .footer-bottom-links { flex-wrap: nowrap; }
        }

        @media (max-width: 767px) {
          .footer-top-grid {
            display: block;
          }
        }
      `}</style>

      <footer className="footer" id="contact">
        {/* ── Mobile Layout ── */}
        <div style={{ position: "relative", zIndex: 1 }}>

          {/* Brand */}
          <div className="footer-brand">
            <Link to="/" className="footer-brand-name">Vintage On Wheels</Link>
            <span className="footer-brand-tag">Est. MCMXLII · Nashik, India</span>
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

          {/* Columns Grid — 2 col on mobile, 4 col on desktop */}
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

            {/* Collection */}
            <div>
              <div className="footer-col-title">Fleet</div>
              <ul className="footer-links">
                <li><Link to="/cars?cat=Muscle">Muscle Cars</Link></li>
                <li><Link to="/cars?cat=Luxury">Luxury</Link></li>
                <li><Link to="/cars?cat=Sports">Sports</Link></li>
                <li><Link to="/cars?cat=Classic">Classics</Link></li>
              </ul>
            </div>

            {/* Contact — full width on mobile */}
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
          </div>

          {/* Bottom Bar */}
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