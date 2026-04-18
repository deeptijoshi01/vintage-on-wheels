import { useState } from "react";
import { Link } from "react-router-dom";
import { WHATSAPP_NUMBER } from "../data/cars";

export default function CarCard({ car, index = 0 }) {
  const [date, setDate] = useState("");
  const [duration, setDuration] = useState("1");
  const [unit, setUnit] = useState("day");
  const [open, setOpen] = useState(false);

  const delay = `${index * 0.08}s`;

  const handleBook = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!date) { alert("Please select a date first."); return; }
    const durationText = `${duration} ${unit}${Number(duration) > 1 ? "s" : ""}`;
    const msg = encodeURIComponent(
      `Hello! I want to book the following car:\n\nCar Name: ${car.name} (${car.year})\nDate: ${date}\nDuration: ${durationText}\n\nPlease share availability and final pricing.\n\nThank you!`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank", "noreferrer");
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <>
      <style>{`
        /* ── CAR CARD – MOBILE FIRST ── */
        .car-card {
          position: relative;
          background: #0a0806;
          overflow: hidden;
          opacity: 0;
          transform: translateY(24px);
          animation: cardReveal 0.65s ease forwards;
          border-bottom: 1px solid rgba(201,168,76,.06);
          border-right: 1px solid rgba(201,168,76,.06);
          display: flex;
          flex-direction: column;
        }
        @keyframes cardReveal {
          to { opacity: 1; transform: translateY(0); }
        }

        /* Image */
        .card-img-wrap {
          position: relative;
          aspect-ratio: 4/3;
          overflow: hidden;
          flex-shrink: 0;
        }
        .card-img {
          width: 100%; height: 100%;
          object-fit: cover;
          filter: brightness(.82) saturate(.85);
          transition: transform .8s cubic-bezier(.25,.46,.45,.94), filter .5s ease;
          display: block;
        }
        .car-card:hover .card-img {
          transform: scale(1.06);
          filter: brightness(.65) saturate(.75);
        }
        .card-img-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(8,6,4,0) 30%,
            rgba(8,6,4,.5) 70%,
            rgba(8,6,4,.88) 100%
          );
        }

        /* Tags on image */
        .card-tag {
          position: absolute; top: 12px; left: 12px;
          font-family: 'Montserrat', sans-serif;
          font-size: clamp(.38rem, 1.5vw, .46rem);
          font-weight: 600;
          letter-spacing: .28em; text-transform: uppercase;
          color: #C9A84C;
          border: 1px solid rgba(201,168,76,.5);
          padding: 4px 10px;
          background: rgba(8,6,4,.65);
          backdrop-filter: blur(8px);
          z-index: 2;
        }
        .card-avail {
          position: absolute; top: 12px; right: 12px;
          display: flex; align-items: center; gap: 5px;
          font-family: 'Montserrat', sans-serif;
          font-size: clamp(.36rem, 1.4vw, .42rem);
          letter-spacing: .16em; text-transform: uppercase;
          background: rgba(8,6,4,.65);
          backdrop-filter: blur(8px);
          padding: 4px 9px;
          border: 1px solid rgba(255,255,255,.07);
          z-index: 2;
        }
        .avail-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }
        .avail-dot.yes { background: #4ade80; box-shadow: 0 0 5px #4ade80; }
        .avail-dot.no  { background: #f87171; box-shadow: 0 0 5px #f87171; }
        .avail-txt.yes { color: #4ade80; }
        .avail-txt.no  { color: #f87171; }

        /* Quick specs on hover — hidden on mobile */
        .card-quick-specs {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          padding: 12px 16px;
          display: flex; gap: 16px;
          z-index: 3;
          opacity: 0;
          transform: translateY(6px);
          transition: opacity .35s ease .1s, transform .35s ease .1s;
        }
        .car-card:hover .card-quick-specs { opacity: 1; transform: translateY(0); }
        .qs-item { display: flex; flex-direction: column; gap: 2px; }
        .qs-label {
          font-family: 'Montserrat', sans-serif;
          font-size: .36rem; letter-spacing: .22em;
          color: rgba(201,168,76,.6); text-transform: uppercase;
        }
        .qs-val {
          font-family: 'Cormorant Garamond', serif;
          font-size: .78rem; font-weight: 400;
          color: rgba(245,240,232,.85);
        }

        /* Body */
        .card-body {
          padding: 16px 16px 0;
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .card-meta {
          display: flex; align-items: center;
          justify-content: space-between;
          margin-bottom: 6px;
        }
        .card-year {
          font-family: 'Montserrat', sans-serif;
          font-size: clamp(.4rem, 1.6vw, .46rem);
          font-weight: 500; letter-spacing: .3em;
          color: rgba(201,168,76,.6); text-transform: uppercase;
        }
        .card-cat {
          font-family: 'Montserrat', sans-serif;
          font-size: clamp(.36rem, 1.4vw, .42rem);
          letter-spacing: .22em;
          color: rgba(245,240,232,.22); text-transform: uppercase;
        }
        .card-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.15rem, 4vw, 1.6rem);
          font-weight: 300; color: #f5f0e8;
          line-height: 1.1; margin: 0 0 6px;
          letter-spacing: -.01em;
          transition: color .3s;
        }
        .car-card:hover .card-name { color: #fff; }
        .card-tagline {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic; font-size: clamp(.78rem, 2.8vw, .88rem);
          font-weight: 300; color: rgba(245,240,232,.28);
          margin-bottom: 14px;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }

        /* Pricing */
        .card-pricing {
          display: flex;
          border: 1px solid rgba(201,168,76,.1);
          margin-bottom: 14px;
          flex-shrink: 0;
        }
        .card-price-item {
          flex: 1; padding: 9px 12px;
          border-right: 1px solid rgba(201,168,76,.08);
        }
        .card-price-item:last-child { border-right: none; }
        .price-lbl {
          font-family: 'Montserrat', sans-serif;
          font-size: clamp(.36rem, 1.4vw, .4rem);
          letter-spacing: .24em; color: rgba(245,240,232,.28);
          text-transform: uppercase; margin-bottom: 4px;
        }
        .price-val {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.05rem, 3.5vw, 1.25rem);
          font-weight: 300; color: #C9A84C;
        }

        /* Booking toggle */
        .card-booking-toggle {
          width: 100%;
          font-family: 'Montserrat', sans-serif;
          font-size: clamp(.44rem, 1.8vw, .48rem);
          font-weight: 500;
          letter-spacing: .24em; text-transform: uppercase;
          color: rgba(245,240,232,.45);
          background: none;
          border: 1px solid rgba(245,240,232,.1);
          padding: 11px 14px;
          display: flex; align-items: center;
          justify-content: center; gap: 8px;
          transition: border-color .3s, color .3s, background .3s;
          flex-shrink: 0;
        }
        .card-booking-toggle:hover,
        .card-booking-toggle.active {
          border-color: rgba(201,168,76,.4);
          color: #C9A84C;
          background: rgba(201,168,76,.04);
        }
        .toggle-arrow {
          display: inline-block;
          transition: transform .3s ease;
          font-size: .55rem;
        }
        .toggle-arrow.open { transform: rotate(180deg); }

        /* Booking panel */
        .card-booking-panel {
          overflow: hidden;
          max-height: 0;
          opacity: 0;
          transition: max-height .4s cubic-bezier(.4,0,.2,1), opacity .3s ease, padding .3s ease;
          padding: 0;
        }
        .card-booking-panel.open {
          max-height: 260px;
          opacity: 1;
          padding: 12px 0 0;
        }
        .booking-fields {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
          margin-bottom: 10px;
        }
        .booking-field { display: flex; flex-direction: column; gap: 4px; }
        .booking-label {
          font-family: 'Montserrat', sans-serif;
          font-size: clamp(.36rem, 1.4vw, .4rem);
          letter-spacing: .24em; color: rgba(245,240,232,.28);
          text-transform: uppercase;
        }
        .booking-input,
        .booking-select {
          background: rgba(201,168,76,.04);
          border: 1px solid rgba(201,168,76,.15);
          color: rgba(245,240,232,.8);
          font-family: 'Montserrat', sans-serif;
          font-size: clamp(.5rem, 2vw, .54rem);
          letter-spacing: .03em;
          padding: 9px 10px;
          width: 100%; outline: none;
          transition: border-color .3s;
          -webkit-appearance: none; appearance: none; border-radius: 0;
        }
        .booking-input::-webkit-calendar-picker-indicator {
          filter: invert(0.55) sepia(1) saturate(3) hue-rotate(5deg);
          cursor: pointer;
        }
        .booking-input:focus, .booking-select:focus { border-color: rgba(201,168,76,.5); }
        .booking-select option { background: #0a0806; color: #f5f0e8; }

        /* Book button */
        .btn-book-now {
          width: 100%;
          display: flex; align-items: center;
          justify-content: center; gap: 9px;
          font-family: 'Montserrat', sans-serif;
          font-size: clamp(.44rem, 1.8vw, .5rem);
          font-weight: 600; letter-spacing: .22em; text-transform: uppercase;
          color: #fff; background: #25D366;
          border: none; padding: 13px 14px;
          transition: background .3s, transform .25s, box-shadow .3s;
        }
        .btn-book-now:hover {
          background: #20bf5b;
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(37,211,102,.35);
        }
        .btn-book-now svg { width: 14px; height: 14px; fill: currentColor; flex-shrink: 0; }
        .btn-book-now.waitlist { background: rgba(201,168,76,.14); color: #C9A84C; }
        .btn-book-now.waitlist:hover { background: rgba(201,168,76,.26); }

        /* Footer row */
        .card-footer {
          display: flex; align-items: center;
          justify-content: space-between;
          padding: 12px 16px 16px;
          border-top: 1px solid rgba(201,168,76,.05);
          margin-top: 12px;
          flex-shrink: 0;
        }
        .card-occasions { display: flex; gap: 5px; flex-wrap: wrap; }
        .card-occ-tag {
          font-family: 'Montserrat', sans-serif;
          font-size: clamp(.32rem, 1.3vw, .36rem);
          letter-spacing: .16em; text-transform: uppercase;
          color: rgba(245,240,232,.22);
          border: 1px solid rgba(245,240,232,.07);
          padding: 3px 7px;
        }
        .card-view-link {
          font-family: 'Montserrat', sans-serif;
          font-size: clamp(.38rem, 1.5vw, .44rem);
          font-weight: 500; letter-spacing: .22em; text-transform: uppercase;
          color: rgba(201,168,76,.5); text-decoration: none;
          white-space: nowrap;
          display: flex; align-items: center; gap: 4px;
          transition: color .3s, gap .3s;
          flex-shrink: 0;
        }
        .card-view-link:hover { color: #C9A84C; gap: 8px; }
        .card-view-link::after { content: '→'; font-size: .6rem; }
      `}</style>

      <div className="car-card" style={{ animationDelay: delay }}>
        {/* Image */}
        <div className="card-img-wrap">
          <img src={car.image} alt={car.name} className="card-img" loading="lazy" />
          <div className="card-img-overlay" />
          <div className="card-tag">{car.tag}</div>
          <div className="card-avail">
            <span className={`avail-dot ${car.available ? "yes" : "no"}`} />
            <span className={`avail-txt ${car.available ? "yes" : "no"}`}>
              {car.available ? "Available" : "Booked"}
            </span>
          </div>
          <div className="card-quick-specs">
            {car.specs?.Engine && (
              <div className="qs-item">
                <span className="qs-label">Engine</span>
                <span className="qs-val">{car.specs.Engine}</span>
              </div>
            )}
            {car.specs?.["Top Speed"] && (
              <div className="qs-item">
                <span className="qs-label">Top Speed</span>
                <span className="qs-val">{car.specs["Top Speed"]}</span>
              </div>
            )}
          </div>
        </div>

        {/* Body */}
        <div className="card-body">
          <div className="card-meta">
            <span className="card-year">{car.year}</span>
            <span className="card-cat">{car.category}</span>
          </div>
          <h3 className="card-name">{car.shortName || car.name}</h3>
          <p className="card-tagline">"{car.tagline}"</p>

          <div className="card-pricing">
            <div className="card-price-item">
              <div className="price-lbl">Per Day</div>
              <div className="price-val">{car.pricePerDay}</div>
            </div>
            <div className="card-price-item">
              <div className="price-lbl">Per Event</div>
              <div className="price-val">{car.pricePerEvent}</div>
            </div>
          </div>

          {/* Toggle */}
          <button
            className={`card-booking-toggle ${open ? "active" : ""}`}
            onClick={(e) => { e.preventDefault(); setOpen((v) => !v); }}
          >
            {open ? "Close" : "Book This Car"}
            <span className={`toggle-arrow ${open ? "open" : ""}`}>▾</span>
          </button>

          {/* Booking panel */}
          <div className={`card-booking-panel ${open ? "open" : ""}`}>
            <div className="booking-fields">
              <div className="booking-field" style={{ gridColumn: "1 / -1" }}>
                <label className="booking-label">Select Date</label>
                <input
                  type="date" className="booking-input"
                  min={today} value={date}
                  onChange={(e) => setDate(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
              <div className="booking-field">
                <label className="booking-label">Duration</label>
                <input
                  type="number" className="booking-input"
                  min="1" max="30" value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
              <div className="booking-field">
                <label className="booking-label">Unit</label>
                <select
                  className="booking-select"
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                >
                  <option value="day">Day(s)</option>
                  <option value="hour">Hour(s)</option>
                </select>
              </div>
            </div>

            <button
              className={`btn-book-now ${!car.available ? "waitlist" : ""}`}
              onClick={handleBook}
            >
              <svg viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              {car.available ? "Confirm on WhatsApp" : "Join Waitlist"}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="card-footer">
          <div className="card-occasions">
            {car.occasions?.slice(0, 2).map((o) => (
              <span className="card-occ-tag" key={o}>{o}</span>
            ))}
          </div>
          <Link to={`/cars/${car.id}`} className="card-view-link">View Details</Link>
        </div>
      </div>
    </>
  );
}