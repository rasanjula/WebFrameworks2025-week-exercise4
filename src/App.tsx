// src/App.tsx
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ProductsView from "./components/ProductsView";
import ProductDetailsView from "./components/ProductDetailsView";
import CartView from "./components/CartView";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      {/* Always-visible top menu */}
      <nav style={{ padding: "12px", background: "#f0f0f0" }}>
        <Link to="/" style={{ marginRight: 12 }}>Products</Link>
        <Link to="/cart">Cart</Link>
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<ProductsView />} />
        <Route path="/products/:id" element={<ProductDetailsView />} />
        <Route path="/cart" element={<CartView />} />
      </Routes>
    </BrowserRouter>
  );
}
