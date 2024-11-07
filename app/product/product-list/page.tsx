"use client";
import React, { useState, useEffect } from "react";
import { Product } from "../../lib/definitions"; // Assuming you have the Product type defined

const FetchProductButton = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [product, setProduct] = useState<Product[] | null>(null); // Product array or null initially
  const fetchProductData = async () => {
    setLoading(true);
    setMessage(""); // Clear any previous messages

    try {
      const response = await fetch("/api/product/product-list", {
        method: "GET", // Or POST depending on your API
      });

      const data = await response.json();

      if (response.ok) {
        setProduct(data.products); // Corrected to reflect API response
        setMessage("Product fetched successfully");
      } else {
        setMessage("Failed to fetch product");
      }
    } catch (error) {
      console.error("Error fetching product:", error);
      setMessage("Error fetching product. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = async (id: string) => {
    try {
      const res = await fetch("/api/product/delete-product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        // Sau khi xóa sản phẩm thành công, gọi lại hàm fetch để lấy lại dữ liệu
        fetchProductData();
      } else {
        setMessage("Không thể xóa sản phẩm");
      }
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm:", error);
      setMessage("Lỗi khi xóa sản phẩm. Vui lòng thử lại.");
    }
  };

  // Fetch product when the component mounts
  useEffect(() => {
    fetchProductData(); // Trigger the fetch when the component mounts
  }, []); // Empty dependency array means this effect runs once when the component mounts
  return (
    <div>
      {loading && <p>Loading...</p>}

      {message && <p>{message}</p>}

      {product && (
        <div>
          <h3>Product Details:</h3>
          <ul>
            {product.map((item, index) => (
              <li key={item.id}>
                {" "}
                {/* Use `item.id` instead of `index` as the key */}
                <strong>{item.name}</strong>: {item.description}{" "}
                {/* Adjust as needed */}
                <button onClick={() => handleDelete(item.id)}>delete</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FetchProductButton;
