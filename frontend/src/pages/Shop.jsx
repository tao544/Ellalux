import { useState } from "react";
import { useStore } from "../context/StoreContext";
import ProductCard from "../components/ProductCard";
import "./Shop.css";

export default function Shop({ navigate, initialCategory }) {
  const { getProductsByCategory, categories } = useStore();
  const [activeCategory, setActiveCategory] = useState(initialCategory || "All");

  const products = getProductsByCategory(activeCategory);

  return (
    <main className="shop">
      <div className="shop__header">
        <div className="container">
          <p className="eyebrow fade-up">The Collection</p>
          <h1 className="shop__title fade-up delay-1">Every Piece. Curated for You.</h1>
        </div>
      </div>

      <div className="container shop__body">
        <div className="shop__filters fade-up delay-2">
          {["All", ...categories.map(c => c.name)].map(cat => (
            <button
              key={cat}
              className={`shop__filter-btn ${activeCategory === cat ? "shop__filter-btn--active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {products.length === 0 ? (
          <div className="shop__empty">
            <p>No products in this category yet — check back soon.</p>
          </div>
        ) : (
          <div className="shop__grid">
            {products.map((p, i) => (
              <div key={p.id} className="fade-up" style={{ animationDelay: `${i * 0.05}s` }}>
                <ProductCard product={p} onClick={() => navigate("product", { product: p })} />
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
