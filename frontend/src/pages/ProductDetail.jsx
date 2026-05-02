import { useState, useEffect } from "react";
import { useStore, fmt } from "../context/StoreContext";
import ProductCard from "../components/ProductCard";
import "./ProductDetail.css";

export default function ProductDetail({ product: initialProduct, navigate }) {
  const { getRelated, makeWhatsAppLink } = useStore();

  const [product, setProduct] = useState(initialProduct);
  const [selectedSize, setSelectedSize] = useState(null);
  const [activeMedia, setActiveMedia] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // 🔥 FETCH FULL PRODUCT DETAILS
  useEffect(() => {
  const fetchProduct = async () => {
    try {
      const API_BASE = import.meta.env.VITE_API_BASE || "/api";
      const res = await fetch(`${API_BASE}/products/${initialProduct.id}/`);

      if (!res.ok) throw new Error(`HTTP error: ${res.status}`);

      const data = await res.json();
      setProduct(data);

      if (data.image_url) {
        setActiveMedia({ type: "image", url: data.image_url });
      }
    } catch (err) {
      console.error("Failed to fetch product details", err);
    }
  };

  fetchProduct();
}, [initialProduct.id]);

  const related = getRelated(product);

  const sizes = Array.isArray(product.sizes)
    ? product.sizes
    : (product.sizes || "").split(",");

  const mediaList = [
    ...(product.image_url ? [{ type: "image", url: product.image_url }] : []),
    ...(product.media?.map((m) => ({
      type: m.media_type,
      url: m.file_url,
    })) || []),
  ];

  return (
    <main className="pd">
      <div className="container">
        <button className="pd__back btn-ghost" onClick={() => navigate("shop")}>
          ← Back to Shop
        </button>

        <div className="pd__layout">
          {/* LEFT SIDE */}
          <div className="pd__gallery fade-in">
            {/* MAIN DISPLAY */}
            {activeMedia?.type === "video" ? (
              <video className="pd__img" controls autoPlay muted loop playsInline controlsList="nodownload" disablePictureInPicture onClick={() => setIsFullscreen(true)}>
                <source src={activeMedia.url} />
              </video>
            ) : (
              <img
                src={activeMedia?.url || mediaList[0]?.url}
                alt={product.name}
                className="pd__img"
                onClick={() => setIsFullscreen(true)}
              />
            )}

            {/* SOLD OUT */}
            {!product.in_stock && (
              <div className="pd__sold-banner">Currently Sold Out</div>
            )}

            {/* THUMBNAILS */}
           <div className="pd__thumbs">
  {mediaList
    .filter(m => m.url !== activeMedia?.url) // 🚨 REMOVE ACTIVE
    .map((m, i) =>
      m.type === "image" ? (
        <img
          key={i}
          src={m.url}
          className="pd__thumb"
          onClick={() => setActiveMedia(m)}
        />
      ) : (
        <video
          key={i}
          className="pd__thumb"
          onClick={() => setActiveMedia(m)}
        >
          <source src={m.url} />
        </video>
      )
    )}
</div>
          </div>

          {/* RIGHT SIDE */}
          <div className="pd__info fade-up delay-1">
            <p className="eyebrow pd__cat">{product.category_name}</p>
            <h1 className="pd__name">{product.name}</h1>
            <p className="pd__price">{fmt(product.price)}</p>

            {/* ✅ DESCRIPTION NOW WORKS */}
            {product.description && (
              <p className="pd__desc">{product.description}</p>
            )}

            {/* ✅ DETAILS NOW WORK */}
            {Array.isArray(product.details) && product.details.length > 0 && (
              <ul className="pd__details">
                {product.details.map((d, i) => (
                  <li key={i} className="pd__detail-item">
                    {d}
                  </li>
                ))}
              </ul>
            )}

            {product.in_stock ? (
              <>
                <div className="pd__size-label">Select your size</div>

                <div className="pd__sizes">
                  {sizes.map((sz) => (
                    <button
                      key={sz}
                      className={`pd__size-btn ${
                        selectedSize === sz ? "pd__size-btn--active" : ""
                      }`}
                      onClick={() => setSelectedSize(sz)}
                    >
                      {sz}
                    </button>
                  ))}
                </div>

                {selectedSize ? (
                  <a
                    href={makeWhatsAppLink(product, selectedSize)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="btn-gold pd__order-btn">
                      Order on WhatsApp — {selectedSize}
                    </button>
                  </a>
                ) : (
                  <button
                    className="btn-gold pd__order-btn pd__order-btn--disabled"
                    disabled
                  >
                    Select a size to order
                  </button>
                )}
              </>
            ) : (
              <div className="pd__sold-msg">
                <p>This item is currently sold out.</p>
              </div>
            )}
          </div>
        </div>

        {related.length > 0 && (
          <section className="pd__related">
            <div className="section-header">
              <p className="eyebrow">More from {product.category_name}</p>
              <h2 className="section-title">You May Also Like</h2>
            </div>

            <div className="pd__related-grid">
              {related.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onClick={() => navigate("product", { product: p })}
                />
              ))}
            </div>
          </section>
        )}
      </div>
      {isFullscreen && (
        <div className="pd__fullscreen" onClick={() => setIsFullscreen(false)}>
          {activeMedia?.type === "video" ? (
            <video controls autoPlay className="pd__fullscreen-media">
              <source src={activeMedia.url} />
            </video>
          ) : (
            <img
              src={activeMedia?.url || product.image_url}
              className="pd__fullscreen-media"
            />
          )}
        </div>
      )}
    </main>
  );
}
