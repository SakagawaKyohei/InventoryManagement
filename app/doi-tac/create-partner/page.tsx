"use client";

import { useState } from "react";
import { redirect } from "next/navigation";
import { DoiTac } from "@/app/lib/definitions";

export default function CreateProduct() {
  // Initialize user state with default values
  const [doitac, setDoitac] = useState<DoiTac>({
    id: "",
    name: "",
    email: "",
    sdt: "",
    dia_chi: "",
    ao_nuoi: {},
  });

  const [error, setError] = useState<string>("");
  // const [success, setSuccess] = useState<string>("");
  const success = "";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDoitac((prevDoitac) => ({
      ...prevDoitac,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Send the user data to the backend
    const res = await fetch("/api/doi-tac/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ doitac }),
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
          <label htmlFor="name">Tên đối tác:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={doitac.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={doitac.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="sdt">Số điện thoại</label>
          <input
            type="tel"
            id="sdt"
            name="sdt"
            value={doitac.sdt}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="dia_chi">Địa chỉ:</label>
          <input
            type="text"
            id="dia_chi"
            name="dia_chi"
            value={doitac.dia_chi}
            onChange={handleChange}
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
