import { useState } from "react";
import { StoreProvider } from "./context/StoreContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import "./styles/global.css";

export default function App() {
  const [page, setPage] = useState({ name: "home", data: {} });

  const navigate = (name, data = {}) => {
    setPage({ name, data });
    window.scrollTo(0, 0);
  };

  const renderPage = () => {
    switch (page.name) {
      case "home":    return <Home navigate={navigate} />;
      case "shop":    return <Shop navigate={navigate} initialCategory={page.data?.category} />;
      case "product": return <ProductDetail product={page.data.product} navigate={navigate} />;
      case "about":   return <About navigate={navigate} />;
      case "contact": return <Contact />;
      default:        return <Home navigate={navigate} />;
    }
  };

  return (
    <StoreProvider>
      <Navbar currentPage={page.name} navigate={navigate} />
      {renderPage()}
      <Footer navigate={navigate} />
    </StoreProvider>
  );
}
