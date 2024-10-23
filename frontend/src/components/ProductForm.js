import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProductForm = () => {
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(""); // Reset message

    try {
      // Keep retrying until success or failure
      let isProductAdded = false;
      while (!isProductAdded) {
        try {
          const response = await axios.post("http://localhost:5000/api/products", { url });

          if (response.status === 201) {
            setMessage("Product added successfully");
            isProductAdded = true; // Stop retrying
          } else {
            setMessage("Failed to add product. Retrying...");
          }
        } catch (error) {
          setMessage("Failed to add product. Retrying...");
        }

        // Wait for a short period before retrying
        await new Promise((resolve) => setTimeout(resolve, 1500));
      }
    } catch (error) {
      setMessage("Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="product-form">
      <h2>Add a Product</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter product URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
      {message && <p>{message}</p>}
      <button onClick={() => navigate("/search")}>Search Products</button>
    </div>
  );
};

export default ProductForm;
