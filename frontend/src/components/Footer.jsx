import "./Footer.css";

export default function Footer({ navigate }) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <div className="footer__logo">Ella&Lux</div>
            <p className="footer__tagline">Luxury. Bold. Yours.</p>
          </div>
          <div className="footer__nav">
            {[["Home","home"],["Shop","shop"],["About","about"],["Contact","contact"]].map(([l,p]) => (
              <button key={p} className="footer__link" onClick={() => navigate(p)}>{l}</button>
            ))}
          </div>
          <div className="footer__contact">
            <p className="footer__contact-label">Order on WhatsApp</p>
            <a href="https://wa.me/2348146191394" target="_blank" rel="noopener noreferrer" className="footer__phone">+234 810 028 3253</a>
            <p className="footer__address"> Oyo State, Nigeria</p>
          </div>
        </div>
        <div className="footer__bottom">
          <span>© 2026 Ella&Lux. All rights reserved.</span>
          <span>Fashion. Curated with love.</span>
        </div>
      </div>
    </footer>
  );
}
