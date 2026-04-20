import { fmt } from "../context/StoreContext";
import "./ProductCard.css";

export default function ProductCard({ product, onClick }) {
  return (
    <article className="pcard" onClick={onClick}>
      <div className="pcard__img-wrap">
        <img
          src={product.image_url}
          alt={product.name}
          className="pcard__img"
          loading="lazy"
          onError={e => { e.target.style.background = "#1a1a1a"; }}
        />

        {!product.in_stock && (
          <div className="pcard__sold">Sold Out</div>
        )}

        <div className="pcard__overlay">
          <span className="pcard__cta">View Details</span>
        </div>
      </div>

      <div className="pcard__body">
        <span className="eyebrow pcard__cat">
          {product.category_name}
        </span>

        <h3 className="pcard__name">{product.name}</h3>

        <p className="pcard__price">
          {fmt(product.price)}
        </p>
      </div>
    </article>
  );
}