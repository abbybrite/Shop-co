import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import PromoBanner from "./Component/PromoBanner.jsx";
import Navbar from "./Component/Navbar.jsx";
import Footer from "./Component/Footer.jsx";
import Home from "./Pages/Home.jsx";
import ProductDetail from "./Pages/ProductDetail.jsx";
import Casual from "./Pages/Casual.jsx";
import Cart from "./Pages/Cart.jsx";
import Checkout from "./Pages/Checkout.jsx";

const App = () => {
  return (
    <div>
      <PromoBanner />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<ProductDetail />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/casual" element={<Casual />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route
          path="*"
          element={
            <div className="px-4 md:px-10 py-20 text-center">
              <h1 className="text-2xl font-bold">Page not found</h1>
              <Link
                to="/"
                className="inline-block bg-black text-white rounded-full px-10 py-3 text-sm mt-6"
              >
                Back to Home
              </Link>
            </div>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;