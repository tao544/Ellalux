import { useStore } from "../context/StoreContext";
import ProductCard from "../components/ProductCard";
import "./Home.css";

export default function Home({ navigate }) {
  const { getFeatured, categories } = useStore();
  const featured = getFeatured();

  return (
    <main className="home">
      <section className="hero">
        <div className="hero__bg">
          <img
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&q=85"
            alt="EllàLuxe fashion"
            className="hero__bg-img"
          />
          <div className="hero__overlay" />
        </div>
        <div className="hero__content container">
          <p className="eyebrow fade-up delay-1">New Collection · 2026</p>
          <h1 className="hero__title fade-up delay-2">
            She who
            <br />
            <em>dares, shines.</em>
          </h1>
          <p className="hero__sub fade-up delay-3">
            Premium womenswear for every woman who refuses to blend in.
            <br />
            Gowns. Jeans. Tops. Shoes. and More. All curated with love.
          </p>
          <div className="hero__actions fade-up delay-4">
            <button className="btn-gold" onClick={() => navigate("shop")}>
              Shop Now
            </button>
            <button className="btn-outline" onClick={() => navigate("about")}>
              Our Story
            </button>
          </div>
        </div>
        <div className="hero__scroll fade-in delay-5">
          <div className="hero__scroll-line" />
          <span>Scroll</span>
        </div>
      </section>

      <section className="strip">
        <div className="container">
          <div className="strip__inner">
            {categories.map((c) => (
              <button
                key={c.id}
                className="strip__item"
                onClick={() => navigate("shop", { category: c.name })}>
                {c.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="featured container">
        <div className="section-header">
          <p className="eyebrow">Handpicked for you</p>
          <h2 className="section-title">Featured Pieces</h2>
        </div>
        <div className="featured__grid">
          {featured.map((p, i) => (
            <div
              key={p.id}
              className="fade-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <ProductCard
                product={p}
                onClick={() => navigate("product", { product: p })}
              />
            </div>
          ))}
        </div>
        <div className="featured__more">
          <button className="btn-outline" onClick={() => navigate("shop")}>
            View Full Collection
          </button>
        </div>
      </section>

      <section className="banner">
        <div className="container banner__inner">
          <div className="banner__text">
            <p className="eyebrow">How it works</p>
            <h2 className="banner__title">Shopping made effortless</h2>
            <p className="banner__sub">
              Browse our collection, choose your size, and tap the WhatsApp
              button. We confirm your order personally and arrange delivery —
              fast and easy.
            </p>
            <a
              href="https://wa.me/2348100283253"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="btn-gold">Chat with Us on WhatsApp</button>
            </a>
          </div>
          <div className="banner__steps">
            {[
              ["01", "Browse", "Explore our full womenswear collection."],
              ["02", "Choose", "Pick your item and select your size."],
              ["03", "Order", "Tap Order on WhatsApp — we handle the rest."],
            ].map(([n, title, desc]) => (
              <div key={n} className="banner__step">
                <span className="banner__step-num">{n}</span>
                <strong className="banner__step-title">{title}</strong>
                <p className="banner__step-desc">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
