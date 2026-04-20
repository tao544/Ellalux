import { createContext, useContext, useState, useEffect } from "react";

const WHATSAPP = "2348146191394";
const API_BASE = import.meta.env.VITE_API_BASE;
const BACKEND_BASE = import.meta.env.VITE_BACKEND_URL; // important for images

const StoreContext = createContext(null);

export function StoreProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [apiOnline, setApiOnline] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [prodRes, catRes] = await Promise.all([
          fetch(`${API_BASE}/products/?ordering=-featured,-created_at`),
          fetch(`${API_BASE}/categories/`),
        ]);

        if (!prodRes.ok || !catRes.ok) {
          throw new Error("API response not ok");
        }

        const prodData = await prodRes.json();
        const catData = await catRes.json();

        // ✅ FIX IMAGE URLS HERE
        const normalizedProducts = (prodData.results || prodData).map((p) =>
             ({ ...p,image_url: p.image_url, // ✅ USE WHAT DJANGO ALREADY GIVES
        }));

        setProducts(normalizedProducts);
        setCategories(catData);
        setApiOnline(true);
      } catch (err) {
        console.error("API ERROR:", err);
        setApiOnline(false);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 🔍 FILTERS
  const getProductsByCategory = (cat) =>
    cat === "All"
      ? products
      : products.filter((p) => p.category_name === cat);

  const getFeatured = () =>
    products.filter((p) => p.featured && p.in_stock).slice(0, 4);

  const getProduct = (id) =>
    products.find((p) => p.id === Number(id));

  const getRelated = (product) =>
    products
      .filter(
        (p) =>
          p.category === product.category &&
          p.id !== product.id
      )
      .slice(0, 3);

  // 📱 WHATSAPP
  const makeWhatsAppLink = (product, size) =>
    `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
      `Hi EllàLuxe! 👋\n\nI'd like to order:\n\n*Product:* ${
        product.name
      }\n*Size:* ${size}\n*Price:* ₦${Number(product.price).toLocaleString(
        "en-NG"
      )}\n\nKindly confirm availability and delivery. Thank you!`
    )}`;

  // 📩 CONTACT FORM
  const sendContactMessage = async (formData) => {
    if (!apiOnline)
      return {
        success: false,
        error: "API not available. Please use WhatsApp.",
      };

    try {
      const res = await fetch(`${API_BASE}/contact/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      return res.ok
        ? { success: true }
        : {
            success: false,
            error: data.detail || "Something went wrong.",
          };
    } catch {
      return { success: false, error: "Could not reach server." };
    }
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        categories,
        loading,
        apiOnline,
        getProductsByCategory,
        getFeatured,
        getProduct,
        getRelated,
        makeWhatsAppLink,
        sendContactMessage,
        whatsappGeneral: `https://wa.me/${WHATSAPP}`,
        whatsappPhone: "+234 810 028 3253",
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

// 🔗 HOOK
export const useStore = () => useContext(StoreContext);

// 📂 STATIC CATEGORY LABELS (UI ONLY)
export const CATEGORIES = [
  "All",
  "Gowns",
  "Jeans",
  "Crop Tops",
  "Slides & Palms",
];

// 💰 FORMAT PRICE
export const fmt = (n) =>
  "₦" + Number(n).toLocaleString("en-NG");