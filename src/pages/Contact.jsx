import { useState, useEffect, useRef } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState(null);
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

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = `Hello! I'd like to enquire about booking a vintage car.\n\nName: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nMessage: ${form.message}`;
    window.open(`https://wa.me/918378913269?text=${encodeURIComponent(message)}`, "_blank");
    setForm({ name: "", email: "", phone: "", message: "" });
    setStatus("sent");
  };

  const contactInfo = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 20, height: 20 }}>
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.22 2.18 2 2 0 012.18 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.18 6.18l1.28-.54a2 2 0 012.11.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
        </svg>
      ),
      label: "Phone", value: "+91 8378913269", href: "tel:+918378913269",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 20, height: 20 }}>
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
      ),
      label: "Email", value: "hello@vintageonwheels.in", href: "mailto:hello@vintageonwheels.in",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 20, height: 20 }}>
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
          <circle cx="12" cy="10" r="3"/>
        </svg>
      ),
      label: "Location", value: "Nashik, Maharashtra, India", href: "https://maps.google.com/?q=Nashik,Maharashtra",
    },
  ];

  return (
    <>
      <style>{`
        /* ── CONTACT – MOBILE FIRST ── */
        .reveal {
          opacity: 0; transform: translateY(28px);
          transition: opacity .8s cubic-bezier(.22,1,.36,1), transform .8s cubic-bezier(.22,1,.36,1);
        }
        .reveal.revealed { opacity: 1; transform: translateY(0); }
        .reveal-delay-1 { transition-delay: .12s; }
        .reveal-delay-2 { transition-delay: .24s; }
        .reveal-delay-3 { transition-delay: .36s; }

        .ct-page {
          background: #080604;
          color: #f5f0e8;
          min-height: 100vh;
          font-family: 'Montserrat', sans-serif;
          overflow-x: hidden;
        }

        /* Hero */
        .ct-hero {
          position: relative;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          text-align: center;
          padding: 110px 20px 56px;
          overflow: hidden;
        }
        .ct-hero::before {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 80% 60% at 50% 40%, rgba(201,168,76,.06) 0%, transparent 70%);
          pointer-events: none;
        }
        .ct-hero-eyebrow {
          display: flex; align-items: center; gap: 12px;
          font-size: clamp(.48rem, 2vw, .52rem);
          letter-spacing: .46em; text-transform: uppercase;
          color: #C9A84C; margin-bottom: 22px; font-weight: 500;
        }
        .ct-hero-eyebrow span { display: block; width: 32px; height: 1px; background: #C9A84C; opacity: .5; }
        .ct-hero-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.8rem, 11vw, 7rem);
          font-weight: 300; line-height: 1; margin: 0 0 18px;
        }
        .ct-hero-title em { font-style: italic; color: #C9A84C; }
        .ct-hero-subtitle {
          font-size: clamp(.6rem, 2.4vw, .82rem);
          letter-spacing: .26em; text-transform: uppercase;
          color: rgba(245,240,232,.4); font-weight: 400;
          max-width: 320px; line-height: 2;
        }

        /* Body */
        .ct-body {
          display: flex;
          flex-direction: column;
          gap: 1px;
          background: rgba(201,168,76,.08);
          border-top: 1px solid rgba(201,168,76,.08);
          border-bottom: 1px solid rgba(201,168,76,.08);
          margin: 0 0 60px;
        }

        /* Form panel */
        .ct-form-panel {
          background: #080604;
          padding: 36px 20px;
        }
        .ct-form-heading {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.4rem, 6vw, 1.8rem);
          font-weight: 300; color: #f5f0e8; margin: 0 0 6px;
        }
        .ct-form-subheading {
          font-size: clamp(.5rem, 2vw, .6rem);
          letter-spacing: .26em; text-transform: uppercase;
          color: rgba(245,240,232,.35); margin-bottom: 32px; font-weight: 400;
        }
        .ct-form { display: flex; flex-direction: column; }
        .ct-field {
          position: relative;
          border-bottom: 1px solid rgba(201,168,76,.15);
          margin-bottom: 24px;
          transition: border-color .3s;
        }
        .ct-field:focus-within { border-color: rgba(201,168,76,.6); }
        .ct-field label {
          display: block;
          font-size: clamp(.4rem, 1.6vw, .48rem);
          letter-spacing: .38em; text-transform: uppercase;
          color: rgba(201,168,76,.6); font-weight: 500; margin-bottom: 7px;
        }
        .ct-field input,
        .ct-field textarea {
          width: 100%; background: transparent; border: none; outline: none;
          color: #f5f0e8; font-family: 'Montserrat', sans-serif;
          font-size: clamp(.72rem, 2.8vw, .8rem); font-weight: 300;
          padding: 0 0 10px; box-sizing: border-box; resize: none;
          letter-spacing: .03em;
          -webkit-appearance: none; border-radius: 0;
        }
        .ct-field input::placeholder, .ct-field textarea::placeholder {
          color: rgba(245,240,232,.2);
        }
        .ct-submit {
          display: flex; align-items: center; gap: 10px;
          font-family: 'Montserrat', sans-serif;
          font-size: clamp(.54rem, 2.2vw, .6rem);
          font-weight: 500; letter-spacing: .26em; text-transform: uppercase;
          color: #0a0804; background: #C9A84C;
          border: none; padding: 15px 28px;
          cursor: pointer; transition: background .3s, transform .2s;
          margin-top: 10px; width: 100%; justify-content: center;
        }
        .ct-submit:hover { background: #b8973b; transform: translateY(-1px); }
        .ct-submit svg { width: 13px; height: 13px; stroke: currentColor; fill: none; }
        .ct-success {
          font-size: clamp(.58rem, 2.3vw, .68rem);
          letter-spacing: .18em; text-transform: uppercase;
          color: #C9A84C; padding: 18px 0 0; font-weight: 500;
          animation: fadeIn .4s ease;
        }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }

        /* Info panel */
        .ct-info-panel {
          background: rgba(201,168,76,.025);
          padding: 36px 20px;
          display: flex; flex-direction: column; gap: 0;
        }
        .ct-info-heading {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.4rem, 6vw, 1.8rem);
          font-weight: 300; color: #f5f0e8; margin: 0 0 6px;
        }
        .ct-info-subheading {
          font-size: clamp(.5rem, 2vw, .6rem);
          letter-spacing: .26em; text-transform: uppercase;
          color: rgba(245,240,232,.35); margin-bottom: 32px; font-weight: 400;
        }
        .ct-info-list { display: flex; flex-direction: column; gap: 24px; margin-bottom: 36px; }
        .ct-info-item {
          display: flex; align-items: flex-start; gap: 16px;
          text-decoration: none;
        }
        .ct-info-icon { color: #C9A84C; flex-shrink: 0; margin-top: 2px; transition: transform .3s; }
        .ct-info-item:hover .ct-info-icon { transform: scale(1.15); }
        .ct-info-label {
          font-size: clamp(.4rem, 1.6vw, .48rem);
          letter-spacing: .36em; text-transform: uppercase;
          color: rgba(245,240,232,.35); font-weight: 500; margin-bottom: 3px;
        }
        .ct-info-value {
          font-size: clamp(.72rem, 2.8vw, .82rem);
          color: rgba(245,240,232,.75); font-weight: 300; transition: color .3s;
        }
        .ct-info-item:hover .ct-info-value { color: #f5f0e8; }

        /* WA block */
        .ct-wa-block {
          padding-top: 28px;
          border-top: 1px solid rgba(201,168,76,.12);
        }
        .ct-wa-label {
          font-size: clamp(.42rem, 1.7vw, .5rem);
          letter-spacing: .34em; text-transform: uppercase;
          color: rgba(245,240,232,.35); margin-bottom: 14px; font-weight: 500;
        }
        .ct-wa-btn {
          display: inline-flex; align-items: center; gap: 10px;
          font-family: 'Montserrat', sans-serif;
          font-size: clamp(.52rem, 2.1vw, .6rem);
          font-weight: 500; letter-spacing: .22em; text-transform: uppercase;
          color: #C9A84C; border: 1px solid rgba(201,168,76,.4);
          padding: 12px 24px; text-decoration: none;
          transition: background .3s, color .3s;
          width: 100%; justify-content: center;
        }
        .ct-wa-btn:hover { background: #C9A84C; color: #080604; }
        .ct-wa-btn svg { width: 15px; height: 15px; fill: currentColor; flex-shrink: 0; }

        /* Desktop */
        @media (min-width: 768px) {
          .ct-hero { padding: 150px 6vw 80px; }
          .ct-body {
            display: grid;
            grid-template-columns: 1fr 1fr;
            margin: 0 6vw 80px;
            border: 1px solid rgba(201,168,76,.1);
          }
          .ct-form-panel { padding: 60px 48px; }
          .ct-info-panel { padding: 60px 48px; }
          .ct-submit { width: auto; }
          .ct-wa-btn { width: auto; }
        }
      `}</style>

      <div className="ct-page">
        <section className="ct-hero">
          <div className="ct-hero-eyebrow reveal" ref={addRef}>
            <span /><span>Reach Us</span><span />
          </div>
          <h1 className="ct-hero-title reveal reveal-delay-1" ref={addRef}>Contact <em>Us</em></h1>
          <p className="ct-hero-subtitle reveal reveal-delay-2" ref={addRef}>Let's make your moment unforgettable</p>
        </section>

        <div className="ct-body">
          {/* Form */}
          <div className="ct-form-panel">
            <h2 className="ct-form-heading reveal" ref={addRef}>Send a Message</h2>
            <p className="ct-form-subheading reveal reveal-delay-1" ref={addRef}>We respond within 24 hours</p>

            <form className="ct-form" onSubmit={handleSubmit}>
              {[
                { id: "name", label: "Your Name", type: "text", placeholder: "e.g. Arjun Mehta", required: true },
                { id: "email", label: "Email Address", type: "email", placeholder: "you@example.com", required: true },
                { id: "phone", label: "Phone Number", type: "tel", placeholder: "+91 8378913269", required: false },
              ].map((f, i) => (
                <div className={`ct-field reveal reveal-delay-${i}`} ref={addRef} key={f.id}>
                  <label htmlFor={f.id}>{f.label}</label>
                  <input
                    id={f.id} name={f.id} type={f.type}
                    placeholder={f.placeholder}
                    value={form[f.id]} onChange={handleChange}
                    required={f.required}
                  />
                </div>
              ))}
              <div className="ct-field reveal reveal-delay-2" ref={addRef}>
                <label htmlFor="message">Your Message</label>
                <textarea
                  id="message" name="message" rows={4}
                  placeholder="Tell us about your occasion, preferred vehicle, date..."
                  value={form.message} onChange={handleChange} required
                />
              </div>

              {status !== "sent" ? (
                <button type="submit" className="ct-submit reveal reveal-delay-3" ref={addRef}>
                  Send Message
                  <svg viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>
              ) : (
                <p className="ct-success">✦ &nbsp;Opening WhatsApp — we'll be in touch!</p>
              )}
            </form>
          </div>

          {/* Info */}
          <div className="ct-info-panel">
            <h2 className="ct-info-heading reveal" ref={addRef}>Get in Touch</h2>
            <p className="ct-info-subheading reveal reveal-delay-1" ref={addRef}>Always here for you</p>

            <div className="ct-info-list">
              {contactInfo.map((item, i) => (
                <a
                  href={item.href}
                  className={`ct-info-item reveal reveal-delay-${i}`}
                  ref={addRef} key={i}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                >
                  <span className="ct-info-icon">{item.icon}</span>
                  <div>
                    <div className="ct-info-label">{item.label}</div>
                    <div className="ct-info-value">{item.value}</div>
                  </div>
                </a>
              ))}
            </div>

            <div className="ct-wa-block reveal" ref={addRef}>
              <p className="ct-wa-label">Prefer instant replies?</p>
              <a
                href="https://wa.me/918378913269?text=Hello!%20I%27d%20like%20to%20enquire%20about%20renting%20a%20vintage%20car."
                className="ct-wa-btn" target="_blank" rel="noreferrer"
              >
                <svg viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}