import "./About.css";

export default function About({ navigate }) {
  return (
    <main className="about">
      <div className="about__hero">
        <div className="about__hero-img-wrap">
          <img
            src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1400&q=85"
            alt="EllàLuxe store"
            className="about__hero-img"
          />
          <div className="about__hero-overlay" />
        </div>
        <div className="about__hero-content container">
          <p className="eyebrow fade-up">Who we are</p>
          <h1 className="about__hero-title fade-up delay-1">
            Fashion is not<br /><em>what you wear.</em><br />It's how you show up.
          </h1>
        </div>
      </div>

      <div className="container about__body">
        <div className="about__story fade-up">
          <p className="eyebrow" style={{ marginBottom: 14 }}>Our Story</p>
          <p className="about__para">
            Ella&Lux was born from a simple belief — that exceptional fashion should never be a privilege.
            We curate pieces that are bold, intentional, and built to last far beyond a single season.
          </p>
          <p className="about__para">
            From our physical store in Oyo state to every doorstep we deliver to, everything we carry
            is handpicked for quality, fit, and character. We dress women who know what they want
            and refuse to settle for less.
          </p>
          <p className="about__para">
            Gowns and Tops that command rooms. Jeans that fit perfectly. Shoes that carry you confidently. And Bags that completes it<br/>
            That's Ella&Lux — every time, without compromise.
          </p>
        </div>

        <div className="about__values">
          {[
            ["Quality First", "Every item we stock passes through our own hands before it reaches yours. No shortcuts."],
            ["Curated Always", "We don't carry everything — we carry the right things. Thoughtfully selected, never random."],
            ["Personal Service", "You're not an order number here. We respond personally to every WhatsApp message."],
          ].map(([title, desc]) => (
            <div key={title} className="about__value-card fade-up">
              <div className="about__value-line" />
              <h3 className="about__value-title">{title}</h3>
              <p className="about__value-desc">{desc}</p>
            </div>
          ))}
        </div>

        <div className="about__info">
          {[
            ["Store Hours", "Mon – Sat: 9:00am – 7:00pm\nSunday: 12:00pm – 5:00pm"],
            ["Location", "Oyo State, Nigeria\nDM us on WhatsApp for the exact address"],
            ["WhatsApp", "+234 814 619 1394"],
            ["Instagram", "@ella&lux"],
          ].map(([label, val]) => (
            <div key={label} className="about__info-item">
              <p className="eyebrow about__info-label">{label}</p>
              <p className="about__info-val">{val}</p>
            </div>
          ))}
        </div>

        <div className="about__cta">
          <button className="btn-gold" onClick={() => navigate("shop")}>Shop Now</button>
          <button className="btn-outline" onClick={() => navigate("contact")}>Get in Touch</button>
        </div>
      </div>
    </main>
  );
}
