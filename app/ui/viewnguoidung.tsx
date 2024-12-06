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
import { formatCurrency } from "@/app/lib/utils";
import { format } from "date-fns";

interface Props {
  product: Users;
  uid: number;
}
export default function EditForm({ product, uid }: Props) {
  const capitalizeFirstLetter = (str: string) => {
    if (!str) return str; // Kiểm tra nếu chuỗi rỗng hoặc null
    return str.charAt(0).toUpperCase() + str.slice(1);
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

      <div
        style={{
          marginLeft: 50,
          marginRight: 50,
          marginTop: 40,
        }}
      >
        <form>
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
                  value={35}
                  disabled
                  style={{
                    width: 140,
                    marginRight: 15,
                    marginTop: 10,
                    backgroundColor: "#dddddd",
                  }}
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label htmlFor="name">Họ tên:</label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={product.name}
                  disabled
                  style={{
                    width: 220,
                    marginTop: 10,
                    backgroundColor: "#dddddd",
                  }}
                />
              </div>
            </div>

            <div>
              <label htmlFor="company">Email:</label>
              <Input
                type="text"
                id="company"
                name="company"
                value={product.email}
                disabled
                style={{
                  width: 375,
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
              marginTop: 25,
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label htmlFor="buy_price">SĐT:</label>
              <Input
                type="text"
                id="buy_price"
                name="buy_price"
                disabled
                value={product.sdt}
                style={{ width: 375, marginTop: 5, backgroundColor: "#dddddd" }}
              />
            </div>
            <div>
              <label htmlFor="sell_price">CCCD:</label>
              <Input
                type="text"
                disabled
                id="sell_price"
                name="sell_price"
                style={{
                  width: 375,
                  marginTop: 10,
                  backgroundColor: "#dddddd",
                }}
                value={product.cccd}
              />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginTop: 25,
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label htmlFor="buy_price">Ngày sinh:</label>
              <Input
                type="text"
                id="buy_price"
                name="buy_price"
                disabled
                value={format(new Date(product.ngay_sinh), "dd/MM/yyyy")}
                style={{ width: 375, marginTop: 5, backgroundColor: "#dddddd" }}
              />
            </div>
            <div style={{ display: "flex" }}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label htmlFor="name">Ngân hàng:</label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={product.bank}
                  disabled
                  style={{
                    width: 140,
                    marginRight: 15,
                    marginTop: 10,
                    backgroundColor: "#dddddd",
                  }}
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label htmlFor="name">Số tài khoản:</label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={product.stk}
                  disabled
                  style={{
                    width: 220,
                    marginTop: 10,
                    backgroundColor: "#dddddd",
                  }}
                />
              </div>
            </div>
          </div>
          <div style={{ marginTop: 25 }}>
            <label htmlFor="description">Địa chỉ:</label>
            <Textarea
              id="description"
              name="description"
              value={product.dia_chi}
              disabled
              style={{
                width: "100%",
                marginTop: 10,
                height: "20vh",
                backgroundColor: "#dddddd",
              }}
            />
          </div>
          <p
            style={{ fontWeight: "bold", fontSize: 20, marginTop: 50 }}
            className="text-right"
          >
            Chức vụ: {capitalizeFirstLetter(product.role)}
          </p>
        </form>
      </div>
    </>
  );
}
