"use client";

import { useEffect, useState } from "react";
import { Product } from "../lib/definitions";
import { redirect } from "next/navigation";

export default function EditProduct() {
  const id = "TA000006"; // You might want to dynamically retrieve this from URL params
  const [product, setProduct] = useState<Product>({
    id: "",
    name: "",
    buy_price: 0,
    sell_price: 0,
    company: "",
    img_product: "",
    description: "",
  });

  // Fetch product when the component mounts
  useEffect(() => {
    fetchProductData();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  const fetchProductData = async () => {
    try {
      const response = await fetch(`/api/product/get-product?id=${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();

      if (response.ok) {
        setProduct(data.product); // Make sure to use the correct API response field
      } else {
        setError("Failed to load product");
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  const [error, setError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch("/api/product/edit-product", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, product }),
    });

    if (res.ok) {
      alert("Product added successfully");
      redirect("/dashboard");
    } else {
      const data = await res.json();
      setError(data.message || "Error creating product");
    }
  };

  return (
    <div className="register-container">
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Product Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="buy_price">Buy Price:</label>
          <input
            type="text"
            id="buy_price"
            name="buy_price"
            value={product.buy_price}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="sell_price">Sell Price:</label>
          <input
            type="text"
            id="sell_price"
            name="sell_price"
            value={product.sell_price}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="company">Company:</label>
          <input
            type="text"
            id="company"
            name="company"
            value={product.company}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="description">Product Description:</label>
          <input
            type="text"
            id="description"
            name="description"
            value={product.description}
            onChange={handleChange}
            required
          />
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit">Save Product</button>
      </form>
    </div>
  );
}
