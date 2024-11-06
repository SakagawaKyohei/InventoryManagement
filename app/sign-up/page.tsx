"use client";

import { useState } from "react";
import { Users } from "../lib/definitions";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";

export default function SignUp() {
  // Initialize user state with default values
  const [user, setUser] = useState<Users>({
    id: "",
    name: "",
    email: "",
    password: "",
    status: "active", // Default is active
    role: "admin", // Default is admin
    bank: "",
    stk: "",
    ngaysinh: "",
    sdt: "",
    cccd: "",
    diachi: "",
  });

  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Hash the password before sending the user data
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const password = user.password;

    // Create a new user object with the hashed password
    const userWithHashedPassword = {
      ...user,
      password: hashedPassword,
    };

    // Send the user data to the backend
    const res = await fetch("/api/auth/add-user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user: userWithHashedPassword, password }),
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
          <label htmlFor="name">Họ và tên:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={user.name}
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
            value={user.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Mật khẩu:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="ngaysinh">Ngày sinh:</label>
          <input
            type="date"
            id="ngaysinh"
            name="ngaysinh"
            value={user.ngaysinh}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="sdt">Số điện thoại:</label>
          <input
            type="tel"
            id="sdt"
            name="sdt"
            value={user.sdt}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="cccd">Số CCCD:</label>
          <input
            type="text"
            id="cccd"
            name="cccd"
            value={user.cccd}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="diachi">Địa chỉ:</label>
          <input
            type="text"
            id="diachi"
            name="diachi"
            value={user.diachi}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="bank">Ngân hàng:</label>
          <input
            type="text"
            id="bank"
            name="bank"
            value={user.bank}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="stk">Số tài khoản:</label>
          <input
            type="text"
            id="stk"
            name="stk"
            value={user.stk}
            onChange={handleChange}
          />
        </div>

        {/* Error or success message */}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}

        <button type="submit">Đăng ký</button>
      </form>
    </div>
  );
}
