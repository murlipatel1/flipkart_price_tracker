import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const PriceHistory = () => {
  const { productId } = useParams();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchPriceHistory = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${productId}/history`);
        setHistory(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPriceHistory();
  }, [productId]);

  return (
    <div className="price-history">
      <h2>Price History</h2>
      <ul>
        {history.map((record) => (
          <li key={record._id}>
            {record.price} INR at {new Date(record.timestamp).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PriceHistory;
