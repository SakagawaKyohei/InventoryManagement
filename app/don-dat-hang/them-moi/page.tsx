"use client";
import React, { useState } from "react";

const AddProductToOrder = () => {
  const [product, setProduct] = useState({
    id: "",
    name: "",
    price: "",
    quantity: "",
  });
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");

  // Hàm xử lý khi người dùng thay đổi giá trị trong form
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleCompanyChange = (e: any) => {
    setCompany(e.target.value);
  };

  // Hàm xử lý submit form
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/don-dat-hang/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product, company }),
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

  const handleCancel = async (e: any) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/don-dat-hang/cancel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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

  const handleadd = async (e: any) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/don-dat-hang/add1", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
      <h1>Add Product to DonDatHang</h1>
      <button onClick={handleCancel}>Cancel</button>
      <button onClick={handleadd}>add</button>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Company:</label>
          <input
            type="text"
            name="company"
            value={company}
            onChange={handleCompanyChange}
            required
          />
        </div>

        <div>
          <label>id:</label>
          <input
            type="text"
            name="id"
            value={product.id}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Product Name:</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Quantity:</label>
          <input
            type="number"
            name="quantity"
            value={product.quantity}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Add Product</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddProductToOrder;
