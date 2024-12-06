"use client";

import { useEffect, useState } from "react";

import { v4 as uuidv4 } from "uuid";
import { Upload } from "antd";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import { uploadImage } from "@/app/lib/actions";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";
import { redirect } from "next/navigation";
import { Product, Users } from "@/app/lib/definitions";
import { format } from "date-fns";

interface Props {
  product1: Users;
  uid: number;
}
export default function EditForm({ product1, uid }: Props) {
  const [product, setProduct] = useState<Users>({
    id: product1.id,
    name: product1.name,
    email: product1.email,
    password: product1.password,
    status: product1.status,
    role: product1.role,
    bank: product1.bank,
    stk: product1.stk,
    ngay_sinh: product1.ngay_sinh,
    sdt: product1.sdt,
    cccd: product1.cccd,
    dia_chi: product1.dia_chi,
    manv: product1.manv,
  });

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Proceed with the API call to edit the product
      const res = await fetch("/api/auth/edit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: product.manv, product, uid }),
      });

      // Check if the API call was successful
      if (res.ok) {
        alert("Product updated successfully");
        // Use a proper redirection method based on your framework (e.g., React Router)
        redirect("/dashboard");
      } else {
        const data = await res.json();
        setError(data.message || "Error updating product");
      }
    } catch (error) {
      // Catch any unexpected errors
      console.error("An error occurred:", error);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    // <div className="register-container">
    //   <h2>Edit Product</h2>
    //   <form onSubmit={handleSubmit}>
    //     <div>
    //       <label htmlFor="name">Product Name:</label>
    //       <input
    //         type="text"
    //         id="name"
    //         name="name"
    //         value={product.name}
    //         onChange={handleChange}
    //         required
    //       />
    //     </div>

    //     <div>
    //       <label htmlFor="buy_price">Buy Price:</label>
    //       <input
    //         type="text"
    //         id="buy_price"
    //         name="buy_price"
    //         value={product.buy_price ? product.buy_price : 0}
    //         onChange={handleChange}
    //         required
    //       />
    //     </div>

    //     <div>
    //       <label htmlFor="sell_price">Sell Price:</label>
    //       <input
    //         type="text"
    //         id="sell_price"
    //         name="sell_price"
    //         value={product.sell_price ? product.sell_price : 0}
    //         onChange={handleChange}
    //         required
    //       />
    //     </div>

    //     <div>
    //       <label htmlFor="company">Company:</label>
    //       <input
    //         type="text"
    //         id="company"
    //         name="company"
    //         value={product.company}
    //         onChange={handleChange}
    //       />
    //     </div>

    //     <div>
    //       <label htmlFor="description">Product Description:</label>
    //       <input
    //         type="text"
    //         id="description"
    //         name="description"
    //         value={product.description}
    //         onChange={handleChange}
    //         required
    //       />
    //     </div>

    //     {error && <p style={{ color: "red" }}>{error}</p>}

    //     <button type="submit">Save Product</button>
    //   </form>
    // </div>
    <>
      {" "}
      <Link href={"/dashboard/products"}>
        {" "}
        <div style={{ display: "flex" }}>
          <Image
            src="/return.png"
            width={45}
            height={45}
            className="hidden md:block"
            alt="return"
            style={{ marginRight: 15, marginLeft: 20, marginTop: 20 }}
          />
          <p style={{ marginTop: 25, fontSize: 20 }}>Quay lại</p>{" "}
        </div>
      </Link>
      <div style={{ marginLeft: 50, marginRight: 50 }}>
        <form onSubmit={handleSubmit}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginTop: 30,
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex" }}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label htmlFor="name">Mã nhân viên:</label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  disabled
                  value={product.manv}
                  onChange={handleChange}
                  style={{
                    width: 140,
                    marginTop: 10,
                    backgroundColor: "#dddddd",
                  }}
                />
              </div>{" "}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: 10,
                }}
              >
                <label htmlFor="name">Họ tên:</label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={product.name}
                  onChange={handleChange}
                  style={{
                    width: 275,
                    marginTop: 10,
                    backgroundColor: "#dddddd",
                  }}
                  disabled
                />
              </div>
            </div>

            <div>
              <label htmlFor="company">Email:</label>
              <Input
                type="text"
                id="email"
                name="email"
                disabled
                value={product.email}
                onChange={handleChange}
                style={{
                  width: 425,
                  marginTop: 10,
                  backgroundColor: "#dddddd",
                }}
              />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginTop: 30,
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label htmlFor="name">Số điện thoại:</label>
              <Input
                type="text"
                id="sdt"
                name="sdt"
                value={product.sdt}
                onChange={handleChange}
                style={{ width: 425, marginTop: 10 }}
              />
            </div>

            <div>
              <label htmlFor="company">Căn cước công dân:</label>
              <Input
                type="text"
                id="cccd"
                name="cccd"
                value={product.cccd}
                onChange={handleChange}
                style={{ width: 425, marginTop: 10 }}
              />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginTop: 30,
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label htmlFor="name">Ngày sinh:</label>
              <Input
                type="date"
                id="ngay_sinh"
                name="ngay_sinh"
                value={format(new Date(product.ngay_sinh), "yyyy-MM-dd")} // Correct date format for <input type="date">
                onChange={handleChange}
                style={{ width: 425, marginTop: 10, display: "block" }}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "row" }}>
              <div style={{ marginRight: 20 }}>
                <label htmlFor="sell_price">Ngân hàng:</label>
                <Input
                  type="bank"
                  id="bank"
                  name="bank"
                  value={product.bank}
                  onChange={handleChange}
                  style={{ width: 150, marginTop: 10 }}
                />
              </div>
              <div>
                <label htmlFor="sell_price">Số tài khoản:</label>
                <Input
                  type="text"
                  id="stk"
                  name="stk"
                  value={product.stk}
                  onChange={handleChange}
                  style={{ width: 255, marginTop: 10 }}
                />
              </div>
            </div>
          </div>

          <div style={{ marginTop: 25 }}>
            <label htmlFor="description">Địa chỉ:</label>
            <Textarea
              id="dia_chi"
              name="dia_chi"
              value={product.dia_chi}
              onChange={handleChange}
              style={{ width: "100%", marginTop: 10, height: "20vh" }}
            />
          </div>

          <div
            style={{
              marginTop: 25,
              display: "flex",
              justifyContent: "end",
            }}
          >
            <Button
              style={{
                fontSize: 18,
                backgroundColor: "#007ACC",
                width: 140,
                height: 40,
                marginRight: 15,
              }}
              type="submit"
            >
              Chỉnh sửa
            </Button>
            <Link href={"/dashboard/products"}>
              <Button
                style={{
                  fontSize: 18,
                  backgroundColor: "#A30D11",
                  width: 140,
                  height: 40,
                }}
              >
                Hủy bỏ
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
