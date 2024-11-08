"use client";
import React, { useState } from "react";

const ThanhToanForm: React.FC = () => {
  const [donHangId, setDonHangId] = useState("");
  const [hanSuDung, setHanSuDung] = useState("");
  const [khoXuatHang, setKhoXuatHang] = useState("");
  const [diaChi, setDiaChi] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [id_nguoi_van_chuyen, setId_nguoi_van_chuyen] = useState("");

  // Hàm xử lý submit form
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/don-dat-hang/pay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          donHangId,
          hanSuDung,
          khoXuatHang,
          diaChi,
          id_nguoi_van_chuyen,
        }),
      });

      if (res.ok) {
        // Sau khi xóa sản phẩm thành công, gọi lại hàm fetch để lấy lại dữ liệu
      } else {
        setMessage("Không thể xóa sản phẩm");
      }
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm:", error);
      setMessage("Lỗi khi xóa sản phẩm. Vui lòng thử lại.");
    }
  };

  return (
    <div>
      <h1>Thanh Toán Đơn Hàng</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="donHangId">ID Đơn Hàng:</label>
          <input
            type="text"
            id="donHangId"
            value={donHangId}
            onChange={(e) => setDonHangId(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="hanSuDung">Ngày Hết Hạn:</label>
          <input
            type="datetime-local"
            id="hanSuDung"
            value={hanSuDung}
            onChange={(e) => setHanSuDung(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="id_nguoi_van_chuyen">id người vận chuyển:</label>
          <input
            type="text"
            id="id_nguoi_van_chuyen"
            value={id_nguoi_van_chuyen}
            onChange={(e) => setId_nguoi_van_chuyen(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="khoXuatHang">Kho Xuất Hàng:</label>
          <input
            type="text"
            id="khoXuatHang"
            value={khoXuatHang}
            onChange={(e) => setKhoXuatHang(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="diaChi">Địa Chỉ Giao Hàng:</label>
          <input
            type="text"
            id="diaChi"
            value={diaChi}
            onChange={(e) => setDiaChi(e.target.value)}
            required
          />
        </div>

        <button type="submit">Thanh Toán</button>
      </form>

      {/* Hiển thị thông báo */}
      {message && (
        <div style={{ color: "green", marginTop: "20px" }}>{message}</div>
      )}
      {error && <div style={{ color: "red", marginTop: "20px" }}>{error}</div>}
    </div>
  );
};

export default ThanhToanForm;
