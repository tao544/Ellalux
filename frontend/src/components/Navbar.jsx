import { useState, useEffect } from "react";
import "./Navbar.css";

const LINKS = [
  { label: "Home", path: "home" },
  { label: "Shop", path: "shop" },
  { label: "About", path: "about" },
  { label: "Contact", path: "contact" },
];

export default function Navbar({ currentPage, navigate }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (path) => { navigate(path); setMenuOpen(false); };

  return (
    <>
      <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
        <div className="navbar__inner">
          <button className="navbar__logo" onClick={() => go("home")}>
            Ella&Lux
          </button>

          <div className="navbar__links">
            {LINKS.map(l => (
              <button
                key={l.path}
                className={`navbar__link ${currentPage === l.path ? "navbar__link--active" : ""}`}
                onClick={() => go(l.path)}
              >
                {l.label}
              </button>
            ))}
          </div>

          <button
            className={`navbar__burger ${menuOpen ? "navbar__burger--open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      <div className={`mobile-menu ${menuOpen ? "mobile-menu--open" : ""}`}>
        <div className="mobile-menu__logo">Ella&Lux</div>
        {LINKS.map((l, i) => (
          <button
            key={l.path}
            className="mobile-menu__link"
            style={{ animationDelay: menuOpen ? `${i * 0.07}s` : "0s" }}
            onClick={() => go(l.path)}
          >
            {l.label}
          </button>
        ))}
      </div>
    </>
  );
}
