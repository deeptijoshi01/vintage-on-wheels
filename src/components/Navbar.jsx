import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  // Prevent body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const links = [
    { to: "/", label: "Home" },
    { to: "/cars", label: "Collection" },
    { to: "/our-story", label: "Our Story" },
    { to: "/contact", label: "Contact" },
  ];

  const isActive = (path) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  return (
    <>
      <style>{`
        /* ── NAVBAR ── */
        .navbar {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 1000;
          padding: 16px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          transition: background .4s ease, padding .4s ease, box-shadow .4s;
        }
        .navbar.scrolled {
          background: rgba(6,4,2,.96);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          box-shadow: 0 1px 0 rgba(201,168,76,.08);
          padding: 12px 20px;
        }

        /* ── BRAND ── */
        .nav-brand {
          text-decoration: none;
          display: flex;
          flex-direction: column;
          gap: 2px;
          border: 1px solid rgba(201,168,76,.3);
          padding: 7px 12px;
          background: rgba(6,4,2,.5);
          backdrop-filter: blur(8px);
          flex-shrink: 0;
        }
        .nav-brand-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(.95rem, 3.5vw, 1.2rem);
          font-weight: 300;
          color: #f5f0e8;
          letter-spacing: .06em;
          line-height: 1;
          white-space: nowrap;
        }
        .nav-brand-tag {
          font-family: 'Montserrat', sans-serif;
          font-size: clamp(.32rem, 1.2vw, .4rem);
          font-weight: 500;
          letter-spacing: .35em;
          text-transform: uppercase;
          color: #C9A84C;
        }

        /* ── DESKTOP LINKS ── */
        .nav-links {
          display: none;
          align-items: center;
          gap: clamp(16px, 3vw, 36px);
          list-style: none;
          margin: 0; padding: 0;
        }
        .nav-links a {
          font-family: 'Montserrat', sans-serif;
          font-size: .56rem;
          font-weight: 500;
          letter-spacing: .3em;
          text-transform: uppercase;
          color: rgba(245,240,232,.55);
          text-decoration: none;
          position: relative;
          padding-bottom: 2px;
          transition: color .3s;
        }
        .nav-links a::after {
          content: '';
          position: absolute;
          bottom: -2px; left: 0;
          width: 0; height: 1px;
          background: #C9A84C;
          transition: width .35s ease;
        }
        .nav-links a:hover,
        .nav-links a.active { color: #C9A84C; }
        .nav-links a:hover::after,
        .nav-links a.active::after { width: 100%; }

        /* ── BOOK NOW BUTTON ── */
        .nav-book {
          display: none;
          align-items: center;
          gap: 8px;
          font-family: 'Montserrat', sans-serif;
          font-size: .52rem;
          font-weight: 500;
          letter-spacing: .28em;
          text-transform: uppercase;
          color: #080604;
          background: #C9A84C;
          border: none;
          padding: 10px 20px;
          text-decoration: none;
          transition: background .3s, transform .2s;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .nav-book:hover { background: #E8C96A; transform: translateY(-1px); }
        .nav-book svg { width: 14px; height: 14px; fill: currentColor; }

        /* ── HAMBURGER ── */
        .nav-hamburger {
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 5px;
          width: 40px; height: 40px;
          background: rgba(201,168,76,.08);
          border: 1px solid rgba(201,168,76,.25);
          padding: 8px;
          cursor: pointer;
          z-index: 1100;
          flex-shrink: 0;
        }
        .ham-line {
          width: 100%; height: 1px;
          background: #C9A84C;
          transition: transform .35s ease, opacity .25s ease, width .35s ease;
          transform-origin: center;
        }
        .nav-hamburger.open .ham-line:nth-child(1) {
          transform: translateY(6px) rotate(45deg);
        }
        .nav-hamburger.open .ham-line:nth-child(2) {
          opacity: 0; width: 0;
        }
        .nav-hamburger.open .ham-line:nth-child(3) {
          transform: translateY(-6px) rotate(-45deg);
        }

        /* ── MOBILE MENU OVERLAY ── */
        .nav-mobile-overlay {
          position: fixed;
          inset: 0;
          background: rgba(6,4,2,.97);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          z-index: 1050;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0;
          opacity: 0;
          pointer-events: none;
          transition: opacity .4s ease;
        }
        .nav-mobile-overlay.open {
          opacity: 1;
          pointer-events: all;
        }

        .mobile-nav-links {
          list-style: none;
          margin: 0; padding: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0;
          width: 100%;
        }
        .mobile-nav-links li {
          width: 100%;
          border-bottom: 1px solid rgba(201,168,76,.07);
          opacity: 0;
          transform: translateY(20px);
          transition: opacity .4s ease, transform .4s ease;
        }
        .nav-mobile-overlay.open .mobile-nav-links li {
          opacity: 1;
          transform: translateY(0);
        }
        .nav-mobile-overlay.open .mobile-nav-links li:nth-child(1) { transition-delay: .1s; }
        .nav-mobile-overlay.open .mobile-nav-links li:nth-child(2) { transition-delay: .17s; }
        .nav-mobile-overlay.open .mobile-nav-links li:nth-child(3) { transition-delay: .24s; }
        .nav-mobile-overlay.open .mobile-nav-links li:nth-child(4) { transition-delay: .31s; }

        .mobile-nav-links a {
          display: block;
          text-align: center;
          padding: 22px 20px;
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.8rem, 7vw, 2.4rem);
          font-weight: 300;
          color: rgba(245,240,232,.6);
          text-decoration: none;
          letter-spacing: .04em;
          transition: color .3s, background .3s;
        }
        .mobile-nav-links a.active,
        .mobile-nav-links a:active { color: #C9A84C; }

        .mobile-nav-book {
          margin-top: 36px;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: 'Montserrat', sans-serif;
          font-size: .6rem;
          font-weight: 500;
          letter-spacing: .28em;
          text-transform: uppercase;
          color: #080604;
          background: #C9A84C;
          padding: 14px 32px;
          text-decoration: none;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity .4s .38s ease, transform .4s .38s ease, background .3s;
        }
        .nav-mobile-overlay.open .mobile-nav-book {
          opacity: 1;
          transform: translateY(0);
        }
        .mobile-nav-book svg { width: 16px; height: 16px; fill: currentColor; }
        .mobile-nav-book:hover { background: #E8C96A; }

        .mobile-close-hint {
          position: absolute;
          bottom: 40px;
          font-family: 'Montserrat', sans-serif;
          font-size: .45rem;
          letter-spacing: .35em;
          text-transform: uppercase;
          color: rgba(245,240,232,.2);
          opacity: 0;
          transition: opacity .4s .45s ease;
        }
        .nav-mobile-overlay.open .mobile-close-hint { opacity: 1; }

        /* ── RESPONSIVE BREAKPOINTS ── */
        @media (min-width: 768px) {
          .navbar { padding: 20px 4vw; }
          .navbar.scrolled { padding: 14px 4vw; }
          .nav-links { display: flex; }
          .nav-book { display: inline-flex; }
          .nav-hamburger { display: none; }
          .nav-mobile-overlay { display: none; }
        }

        /* ── WHATSAPP FLOAT BUTTON ── */
        .wa-float {
          position: fixed;
          bottom: 24px; right: 20px;
          z-index: 900;
          width: 52px; height: 52px;
          background: #25D366;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 20px rgba(37,211,102,.4);
          text-decoration: none;
          transition: transform .3s, box-shadow .3s;
          animation: waPulse 3s ease-in-out infinite;
        }
        .wa-float:hover {
          transform: scale(1.1);
          box-shadow: 0 8px 30px rgba(37,211,102,.55);
        }
        .wa-float svg {
          width: 28px; height: 28px;
          fill: white;
        }
        @keyframes waPulse {
          0%, 100% { box-shadow: 0 4px 20px rgba(37,211,102,.4); }
          50% { box-shadow: 0 4px 32px rgba(37,211,102,.7); }
        }
        @media (min-width: 768px) {
          .wa-float { bottom: 32px; right: 32px; width: 58px; height: 58px; }
          .wa-float svg { width: 30px; height: 30px; }
        }
      `}</style>

      {/* NAVBAR */}
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <Link to="/" className="nav-brand">
          <span className="nav-brand-name">Vintage On Wheels</span>
          <span className="nav-brand-tag">Est. MCMXLII · Nashik</span>
        </Link>

        {/* Desktop Links */}
        <ul className="nav-links">
          {links.map((l) => (
            <li key={l.to}>
              <Link to={l.to} className={isActive(l.to) ? "active" : ""}>{l.label}</Link>
            </li>
          ))}
        </ul>

        {/* Desktop Book Now */}
        <a
          href="https://wa.me/918378913269?text=Hello!%20I%27d%20like%20to%20book%20a%20vintage%20car."
          className="nav-book"
          target="_blank" rel="noreferrer"
        >
          <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          Book Now
        </a>

        {/* Hamburger */}
        <button
          className={`nav-hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span className="ham-line" />
          <span className="ham-line" />
          <span className="ham-line" />
        </button>
      </nav>

      {/* Mobile Overlay Menu */}
      <div className={`nav-mobile-overlay ${menuOpen ? "open" : ""}`}>
        <ul className="mobile-nav-links">
          {links.map((l) => (
            <li key={l.to}>
              <Link to={l.to} className={isActive(l.to) ? "active" : ""}>{l.label}</Link>
            </li>
          ))}
        </ul>
        <a
          href="https://wa.me/918378913269?text=Hello!%20I%27d%20like%20to%20book%20a%20vintage%20car."
          className="mobile-nav-book"
          target="_blank" rel="noreferrer"
          onClick={() => setMenuOpen(false)}
        >
          <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          Book on WhatsApp
        </a>
        <span className="mobile-close-hint">Tap anywhere to close</span>
      </div>

      {/* Floating WhatsApp */}
      <a
        href="https://wa.me/918378913269"
        className="wa-float"
        target="_blank" rel="noreferrer"
        aria-label="Chat on WhatsApp"
      >
        <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </a>
    </>
  );
}