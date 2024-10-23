import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SearchProducts = () => {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:5000/api/products/search?query=${query}`);
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="search-products">
      <h2>Search Products</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter search query"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            <strong>{product.title}</strong> - {product.currentPrice} INR
            <button onClick={() => navigate(`/products/${product._id}/history`)}>
              View Price History
            </button>
          </li>
        ))}
      </ul>
      <button onClick={() => navigate("/")}>Add Products</button>
    </div>
  );
};

export default SearchProducts;
