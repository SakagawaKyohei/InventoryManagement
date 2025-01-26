"use client";
import { DoiTac } from "@/app/lib/definitions";
import React, { useState, useEffect } from "react";

const FetchdoitacButton = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [doitac, setDoitac] = useState<DoiTac[] | null>(null); // doitac array or null initially
  const fetchDoiTacData = async () => {
    setLoading(true);
    setMessage(""); // Clear any previous messages

    try {
      const response = await fetch("/api/doi-tac/partner-list", {
        method: "GET", // Or POST depending on your API
      });

      const data = await response.json();

      if (response.ok) {
        setDoitac(data.doitac); // Corrected to reflect API response
        setMessage("doitac fetched successfully");
      } else {
        setMessage("Failed to fetch doitac");
      }
    } catch (error) {
      console.error("Error fetching doitac:", error);
      setMessage("Error fetching doitac. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = async (id: string) => {
    try {
      const res = await fetch("/api/doi-tac/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        // Sau khi xóa sản phẩm thành công, gọi lại hàm fetch để lấy lại dữ liệu
        fetchDoiTacData();
      } else {
        setMessage("Không thể xóa sản phẩm");
      }
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm:", error);
      setMessage("Lỗi khi xóa sản phẩm. Vui lòng thử lại.");
    }
  };

  // Fetch doitac when the component mounts
  useEffect(() => {
    fetchDoiTacData(); // Trigger the fetch when the component mounts
  }, []); // Empty dependency array means this effect runs once when the component mounts
  return (
    <div>
      {loading && <p>Loading...</p>}

      {message && <p>{message}</p>}

      {doitac && (
        <div>
          <h3>doitac Details:</h3>
          <ul>
            {doitac.map((item) => (
              <li key={item.id}>
                {" "}
                {/* Use `item.id` instead of `index` as the key */}
                <strong>{item.name}</strong>
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

export default FetchdoitacButton;
