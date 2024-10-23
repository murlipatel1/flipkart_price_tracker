import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductForm from "./components/ProductForm";
import SearchProducts from "./components/SearchProducts";
import PriceHistory from "./components/PriceHistory";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app-container">
        <h1>Flipkart Price Tracker</h1>
        <Routes>
          <Route path="/" element={<ProductForm />} />
          <Route path="/search" element={<SearchProducts />} />
          <Route path="/products/:productId/history" element={<PriceHistory />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
