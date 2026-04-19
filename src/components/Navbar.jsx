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

  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

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
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&family=Montserrat:wght@300;400;500;600&display=swap');

        /* ══════════════════════════════════════
           NAVBAR  — mobile-first
        ══════════════════════════════════════ */
        .navbar {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 1000;
          height: 62px;
          padding: 0 14px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          transition: background .4s ease, height .4s ease, box-shadow .4s ease;
        }
        .navbar.scrolled {
          background: rgba(5, 3, 2, 0.97);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          box-shadow: 0 1px 0 rgba(201,168,76,.10);
          height: 54px;
        }

        /* ── BRAND ── */
        .nav-brand {
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 9px;
          flex: 1;                /* take available space */
          min-width: 0;
          max-width: calc(100% - 54px); /* leave room for hamburger */
          transition: opacity .3s;
        }
        .nav-brand:hover { opacity: .85; }

        /* Round logo wrapper */
        .nav-logo-wrap {
          position: relative;
          flex-shrink: 0;
          width: 38px;
          height: 38px;
        }
        /* Spinning gold conic ring */
        .nav-logo-wrap::before {
          content: '';
          position: absolute;
          inset: -2px;
          border-radius: 50%;
          background: conic-gradient(
            #a07828 0deg,
            #f5e08a 60deg,
            #C9A84C 120deg,
            #f5e08a 180deg,
            #a07828 240deg,
            #f5e08a 300deg,
            #a07828 360deg
          );
          z-index: 0;
          transition: opacity .3s;
        }
        /* Dark gap between ring and image */
        .nav-logo-wrap::after {
          content: '';
          position: absolute;
          inset: 1.5px;
          border-radius: 50%;
          background: #0d0b08;
          z-index: 1;
        }
        .nav-brand:hover .nav-logo-wrap::before { opacity: .7; }

        .nav-logo-img {
          position: relative;
          z-index: 2;
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50%;
          display: block;
          filter: brightness(1.06) drop-shadow(0 1px 6px rgba(201,168,76,.18));
          transition: filter .3s, transform .3s;
        }
        .nav-brand:hover .nav-logo-img {
          filter: brightness(1.14) drop-shadow(0 2px 12px rgba(201,168,76,.40));
          transform: scale(1.04);
        }

        /* Brand text block */
        .nav-brand-text {
          display: flex;
          flex-direction: column;
          gap: 2px;
          min-width: 0;
          overflow: hidden;
        }
        .nav-brand-name {
          font-family: 'Cormorant Garamond', serif;
          /* clamp: min 0.78rem on tiny phones, fluid, max 1rem */
          font-size: clamp(.78rem, 4vw, 1rem);
          font-weight: 300;
          color: #f5f0e8;
          letter-spacing: .05em;
          line-height: 1.1;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .nav-brand-tag {
          font-family: 'Montserrat', sans-serif;
          font-size: clamp(.26rem, 2vw, .35rem);
          font-weight: 500;
          letter-spacing: .26em;
          text-transform: uppercase;
          color: #C9A84C;
          line-height: 1;
          white-space: nowrap;
        }

        /* ── DESKTOP LINKS ── */
        .nav-links {
          display: none;
          align-items: center;
          gap: clamp(16px, 2.2vw, 36px);
          list-style: none;
          margin: 0; padding: 0;
          flex-shrink: 0;
        }
        .nav-links a {
          font-family: 'Montserrat', sans-serif;
          font-size: clamp(.42rem, .82vw, .52rem);
          font-weight: 500;
          letter-spacing: .27em;
          text-transform: uppercase;
          color: rgba(245,240,232,.46);
          text-decoration: none;
          position: relative;
          padding-bottom: 3px;
          transition: color .3s;
          white-space: nowrap;
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

        /* ── BOOK NOW ── */
        .nav-book {
          display: none;
          align-items: center;
          gap: 7px;
          font-family: 'Montserrat', sans-serif;
          font-size: clamp(.38rem, .76vw, .48rem);
          font-weight: 600;
          letter-spacing: .20em;
          text-transform: uppercase;
          color: #080604;
          background: #C9A84C;
          border: none;
          padding: 10px 16px;
          text-decoration: none;
          flex-shrink: 0;
          white-space: nowrap;
          transition: background .3s, transform .2s, box-shadow .3s;
        }
        .nav-book:hover {
          background: #e8c96a;
          transform: translateY(-1px);
          box-shadow: 0 4px 18px rgba(201,168,76,.30);
        }
        .nav-book svg { width: 12px; height: 12px; fill: currentColor; flex-shrink: 0; }

        /* ── HAMBURGER ── */
        .nav-hamburger {
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 5px;
          width: 40px; height: 40px;
          background: rgba(201,168,76,.07);
          border: 1px solid rgba(201,168,76,.20);
          padding: 9px;
          cursor: pointer;
          z-index: 1100;
          flex-shrink: 0;
          transition: background .3s, border-color .3s;
        }
        .nav-hamburger:hover {
          background: rgba(201,168,76,.13);
          border-color: rgba(201,168,76,.36);
        }
        .ham-line {
          width: 100%; height: 1px;
          background: #C9A84C;
          transition: transform .35s ease, opacity .25s ease, width .35s ease;
          transform-origin: center;
        }
        .nav-hamburger.open .ham-line:nth-child(1) { transform: translateY(6px) rotate(45deg); }
        .nav-hamburger.open .ham-line:nth-child(2) { opacity: 0; width: 0; }
        .nav-hamburger.open .ham-line:nth-child(3) { transform: translateY(-6px) rotate(-45deg); }

        /* ══════════════════════════════════════
           MOBILE OVERLAY
        ══════════════════════════════════════ */
        .nav-mobile-overlay {
          position: fixed;
          inset: 0;
          background: rgba(5, 3, 2, 0.98);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          z-index: 1050;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          opacity: 0;
          pointer-events: none;
          transition: opacity .4s ease;
        }
        .nav-mobile-overlay.open { opacity: 1; pointer-events: all; }

        /* Gold top border */
        .nav-mobile-overlay::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(201,168,76,.45), transparent);
        }

        /* Round logo in overlay */
        .mobile-overlay-logo-wrap {
          position: absolute;
          top: 16px; left: 50%;
          transform: translateX(-50%);
          width: 44px; height: 44px;
          opacity: 0;
          transition: opacity .4s .10s ease;
        }
        .mobile-overlay-logo-wrap::before {
          content: '';
          position: absolute;
          inset: -2px;
          border-radius: 50%;
          background: conic-gradient(
            #a07828 0deg, #f5e08a 60deg, #C9A84C 120deg,
            #f5e08a 180deg, #a07828 240deg, #f5e08a 300deg, #a07828 360deg
          );
          z-index: 0;
        }
        .mobile-overlay-logo-wrap::after {
          content: '';
          position: absolute;
          inset: 1.5px;
          border-radius: 50%;
          background: #0d0b08;
          z-index: 1;
        }
        .nav-mobile-overlay.open .mobile-overlay-logo-wrap { opacity: 1; }
        .mobile-overlay-logo {
          position: relative; z-index: 2;
          width: 100%; height: 100%;
          object-fit: cover;
          border-radius: 50%;
          display: block;
          filter: brightness(1.06);
        }

        /* Brand name under overlay logo */
        .mobile-overlay-brand {
          position: absolute;
          top: 68px; left: 50%;
          transform: translateX(-50%);
          font-family: 'Cormorant Garamond', serif;
          font-size: .85rem;
          font-weight: 300;
          color: rgba(245,240,232,.38);
          letter-spacing: .14em;
          white-space: nowrap;
          opacity: 0;
          transition: opacity .4s .16s ease;
        }
        .nav-mobile-overlay.open .mobile-overlay-brand { opacity: 1; }

        /* Thin gold rule */
        .mobile-overlay-ornament {
          width: 32px; height: 1px;
          background: rgba(201,168,76,.28);
          margin-bottom: 6px;
          opacity: 0;
          transition: opacity .4s .22s ease;
        }
        .nav-mobile-overlay.open .mobile-overlay-ornament { opacity: 1; }

        .mobile-nav-links {
          list-style: none; margin: 0; padding: 0;
          display: flex; flex-direction: column;
          align-items: center; gap: 0; width: 100%;
        }
        .mobile-nav-links li {
          width: 100%;
          border-bottom: 1px solid rgba(201,168,76,.06);
          opacity: 0; transform: translateY(20px);
          transition: opacity .4s ease, transform .4s ease;
        }
        .nav-mobile-overlay.open .mobile-nav-links li { opacity: 1; transform: translateY(0); }
        .nav-mobile-overlay.open .mobile-nav-links li:nth-child(1) { transition-delay: .14s; }
        .nav-mobile-overlay.open .mobile-nav-links li:nth-child(2) { transition-delay: .21s; }
        .nav-mobile-overlay.open .mobile-nav-links li:nth-child(3) { transition-delay: .28s; }
        .nav-mobile-overlay.open .mobile-nav-links li:nth-child(4) { transition-delay: .35s; }

        .mobile-nav-links a {
          display: block; text-align: center;
          padding: 20px;
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.6rem, 6vw, 2.2rem);
          font-weight: 300;
          color: rgba(245,240,232,.50);
          text-decoration: none;
          letter-spacing: .06em;
          transition: color .3s, letter-spacing .3s;
        }
        .mobile-nav-links a:hover,
        .mobile-nav-links a.active { color: #C9A84C; letter-spacing: .10em; }

        .mobile-nav-book {
          margin-top: 34px;
          display: inline-flex; align-items: center; gap: 10px;
          font-family: 'Montserrat', sans-serif;
          font-size: .56rem; font-weight: 600;
          letter-spacing: .22em; text-transform: uppercase;
          color: #080604; background: #C9A84C;
          padding: 14px 30px; text-decoration: none;
          opacity: 0; transform: translateY(20px);
          transition: opacity .4s .42s ease, transform .4s .42s ease, background .3s;
        }
        .nav-mobile-overlay.open .mobile-nav-book { opacity: 1; transform: translateY(0); }
        .mobile-nav-book:hover { background: #e8c96a; }
        .mobile-nav-book svg { width: 15px; height: 15px; fill: currentColor; }

        .mobile-close-hint {
          position: absolute; bottom: 28px;
          font-family: 'Montserrat', sans-serif;
          font-size: .38rem; letter-spacing: .32em;
          text-transform: uppercase;
          color: rgba(245,240,232,.15);
          opacity: 0; transition: opacity .4s .50s ease;
        }
        .nav-mobile-overlay.open .mobile-close-hint { opacity: 1; }

        /* ══════════════════════════════════════
           BREAKPOINTS
        ══════════════════════════════════════ */

        /* Very small phones (≤ 359px) */
        @media (max-width: 359px) {
          .navbar { padding: 0 10px; gap: 6px; }
          .nav-logo-wrap { width: 32px; height: 32px; }
          .nav-brand-name { font-size: .72rem; }
          .nav-brand-tag { font-size: .24rem; letter-spacing: .18em; }
          .nav-hamburger { width: 36px; height: 36px; padding: 8px; }
        }

        /* Tablet 768px+ — show links & CTA, hide hamburger */
        @media (min-width: 768px) {
          .navbar { height: 68px; padding: 0 5vw; }
          .navbar.scrolled { height: 58px; }
          .nav-brand { flex: 0 0 auto; max-width: none; }
          .nav-logo-wrap { width: 42px; height: 42px; }
          .nav-brand-name { font-size: .95rem; }
          .nav-brand-tag { font-size: .33rem; }
          .nav-links { display: flex; }
          .nav-book { display: inline-flex; }
          .nav-hamburger { display: none; }
          .nav-mobile-overlay { display: none; }
        }

        /* Laptop 1024px+ */
        @media (min-width: 1024px) {
          .navbar { height: 72px; padding: 0 6vw; }
          .navbar.scrolled { height: 62px; }
          .nav-logo-wrap { width: 46px; height: 46px; }
          .nav-brand-name { font-size: 1.02rem; }
          .nav-brand-tag { font-size: .35rem; }
          .nav-links { gap: clamp(24px, 2.6vw, 42px); }
          .nav-links a { font-size: .52rem; }
          .nav-book { font-size: .48rem; padding: 11px 20px; }
        }

        /* Large desktop 1280px+ */
        @media (min-width: 1280px) {
          .navbar { padding: 0 7vw; }
        }

        /* ══════════════════════════════════════
           WHATSAPP FLOAT
        ══════════════════════════════════════ */
        .wa-float {
          position: fixed;
          bottom: 16px; right: 14px;
          z-index: 900;
          width: 48px; height: 48px;
          background: #25D366; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 4px 20px rgba(37,211,102,.4);
          text-decoration: none;
          transition: transform .3s, box-shadow .3s;
          animation: waPulse 3s ease-in-out infinite;
        }
        .wa-float:hover { transform: scale(1.1); box-shadow: 0 8px 30px rgba(37,211,102,.55); }
        .wa-float svg { width: 25px; height: 25px; fill: white; }
        @keyframes waPulse {
          0%, 100% { box-shadow: 0 4px 20px rgba(37,211,102,.40); }
          50%       { box-shadow: 0 4px 32px rgba(37,211,102,.72); }
        }
        @media (min-width: 768px) {
          .wa-float { bottom: 28px; right: 28px; width: 54px; height: 54px; }
          .wa-float svg { width: 28px; height: 28px; }
        }
        @media (min-width: 1024px) {
          .wa-float { bottom: 36px; right: 36px; width: 58px; height: 58px; }
          .wa-float svg { width: 30px; height: 30px; }
        }
      `}</style>

      {/* ── NAVBAR ── */}
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>

        {/* Brand */}
        <Link to="/" className="nav-brand">
          <div className="nav-logo-wrap">
            <img
              src="/images/logo.png"
              alt="Vintage On Wheels logo"
              className="nav-logo-img"
              onError={(e) => { e.currentTarget.style.display = "none"; }}
            />
          </div>
          <div className="nav-brand-text">
            <span className="nav-brand-name">Vintage On Wheels</span>
            <span className="nav-brand-tag">Nashik, India</span>
          </div>
        </Link>

        {/* Desktop nav links */}
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
          <svg viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          Book Now
        </a>

        {/* Hamburger */}
        <button
          className={`nav-hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle navigation menu"
        >
          <span className="ham-line" />
          <span className="ham-line" />
          <span className="ham-line" />
        </button>
      </nav>

      {/* ── MOBILE OVERLAY ── */}
      <div className={`nav-mobile-overlay ${menuOpen ? "open" : ""}`}>

        <div className="mobile-overlay-logo-wrap">
          <img
            src="/images/logo.png"
            alt="Vintage On Wheels"
            className="mobile-overlay-logo"
            onError={(e) => { e.currentTarget.parentElement.style.display = "none"; }}
          />
        </div>

        <span className="mobile-overlay-brand">Vintage On Wheels</span>
        <div className="mobile-overlay-ornament" />

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
          <svg viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          Book on WhatsApp
        </a>

        <span className="mobile-close-hint">Tap anywhere to close</span>
      </div>

      {/* ── FLOATING WHATSAPP ── */}
      <a
        href="https://wa.me/918378913269"
        className="wa-float"
        target="_blank" rel="noreferrer"
        aria-label="Chat on WhatsApp"
      >
        <svg viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </>
  );
}