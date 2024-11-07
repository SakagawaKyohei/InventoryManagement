"use client";

import { useState } from "react";
import { Product, Users } from "../../lib/definitions";
import { redirect } from "next/navigation";

export default function CreateProduct() {
  // Initialize user state with default values
  const [product, setProduct] = useState<Product>({
    id: "",
    name: "",
    buy_price: 0,
    sell_price: 0,
    company: "", // Default is active
    img_product: "", // Default is admin
    description: "",
  });

  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Send the user data to the backend
    const res = await fetch("/api/product/add-product", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ product }),
    });

    if (res.ok) {
      alert("Password reset successful");
      redirect("/dashboard");
    } else {
      const data = await res.json();
      setError(data.message || "Lỗi tạo tài khoản");
    }
  };

  return (
    <div className="register-container">
      <h2>Đăng ký người dùng</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Tên sản phẩm:</label>
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
          <label htmlFor="buy_price">Giá mua:</label>
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
          <label htmlFor="sell_price">Giá bán:</label>
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
          <label htmlFor="company">Công ty:</label>
          <input
            type="text"
            id="company"
            name="company"
            value={product.company}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="description">Mô tả sản phẩm:</label>
          <input
            type="text"
            id="description"
            name="description"
            value={product.description}
            onChange={handleChange}
            required
          />
        </div>

        {/* Error or success message */}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}

        <button type="submit">Thêm sản phẩm</button>
      </form>
    </div>
  );
}
