"use client";

import { useEffect, useState } from "react";
import { DoiTac, Product } from "../../lib/definitions";
import { redirect } from "next/navigation";

export default function EditProduct() {
  const id = "KH_000008"; // You might want to dynamically retrieve this from URL params
  const [doitac, setDoitac] = useState<DoiTac>({
    id: "",
    name: "",
    email: "",
    sdt: "",
    dia_chi: "",
    ao_nuoi: {},
  });

  // Fetch product when the component mounts
  useEffect(() => {
    fetchPartnerData();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  const fetchPartnerData = async () => {
    try {
      const response = await fetch(`/api/doi-tac/get-partner?id=${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();

      if (response.ok) {
        setDoitac(data.doitac); // Make sure to use the correct API response field
      } else {
        setError("Failed to load doitac");
      }
    } catch (error) {
      console.error("Error fetching doitac:", error);
    }
  };

  const [error, setError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDoitac((prevDoitac) => ({
      ...prevDoitac,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(doitac);

    const res = await fetch("/api/doi-tac/edit-partner", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, doitac }),
    });

    if (res.ok) {
      alert("doitac added successfully");
      redirect("/dashboard");
    } else {
      const data = await res.json();
      setError(data.message || "Error creating doitac");
    }
  };

  return (
    <div className="register-container">
      <h2>Edit Partner</h2>
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
          <label htmlFor="email">Buy Price:</label>
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
          <label htmlFor="sdt">Sell Price:</label>
          <input
            type="text"
            id="sdt"
            name="sdt"
            value={doitac.sdt}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="dia_chi">Company:</label>
          <input
            type="text"
            id="dia_chi"
            name="dia_chi"
            value={doitac.dia_chi}
            onChange={handleChange}
          />
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit">Save Product</button>
      </form>
    </div>
  );
}
