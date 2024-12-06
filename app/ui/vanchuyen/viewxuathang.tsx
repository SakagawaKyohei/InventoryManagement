"use client";
import React, { useState } from "react";
import {
  DoiTac,
  DonDatHang,
  DonXuatHang,
  VanChuyen,
} from "../../lib/definitions";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import Link from "next/link";
import { formatCurrency } from "@/app/lib/utils";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";

interface Props {
  dondathang: DonXuatHang;
  doitac: DoiTac;
  vanchuyen: VanChuyen;
}

const FetchProductButton = ({ dondathang, vanchuyen, doitac }: Props) => {
  const total = dondathang.product?.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const [phuongthuc, setPhuongthuc] = useState("");
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPhuongthuc(event.target.value);
    console.log(phuongthuc);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("abc");
  };
  const router = useRouter();

  return (
    <div
      className="register-container"
      style={{
        position: "relative",
        height: "100vh", // Bao phủ chiều cao toàn màn hình
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <Link href={"/dashboard/van-chuyen/dang-van-chuyen"}>
        <div style={{ display: "flex" }}>
          <Image
            src="/return.png"
            width={45}
            height={45}
            className="hidden md:block"
            alt="return"
            style={{ marginRight: 15, marginLeft: 20, marginTop: 20 }}
          />
          <p style={{ marginTop: 25, fontSize: 20 }}>Quay lại</p>
        </div>
      </Link>

      {/* Nội dung chính */}
      <div style={{ flex: 1, marginLeft: 50, marginRight: 50 }}>
        <form onSubmit={handleSubmit}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: 20,
            }}
          >
            <p style={{ fontSize: 20, fontWeight: "bold" }}>
              Đơn hàng: {dondathang.id}
            </p>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginTop: 30,
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginRight: 15,
                }}
              >
                <label htmlFor="name">Mã đơn hàng</label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  disabled
                  style={{
                    width: 150,
                    marginTop: 10,
                    backgroundColor: "#dddddd",
                  }}
                  value={vanchuyen.id_don_hang}
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label htmlFor="name">Tên đối tác</label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={doitac.name}
                  disabled
                  style={{
                    width: 285,
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
                width: 475,
                justifyContent: "space-between",
              }}
            >
              <div>
                <label htmlFor="sell_price">Số điện thoại:</label>
                <Input
                  type="text"
                  id="sell_price"
                  name="sell_price"
                  disabled
                  style={{
                    width: 475,
                    marginTop: 10,
                    backgroundColor: "#dddddd",
                  }}
                  value={doitac.sdt}
                />
              </div>
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
              <label htmlFor="buy_price">Địa chỉ:</label>
              <Input
                type="text"
                id="buy_price"
                name="buy_price"
                disabled
                style={{
                  width: 1055,
                  marginTop: 5,
                  backgroundColor: "#dddddd",
                }}
                value={doitac.dia_chi}
              />
            </div>
          </div>
          <div style={{ marginTop: 25 }}>
            <label htmlFor="description">Sản phẩm:</label>
            <Table>
              <TableHeader>
                <TableRow style={{ height: 65 }}>
                  <TableHead className="w-[350]">Tên sản phẩm</TableHead>
                  <TableHead className="w-[175]">Số lượng</TableHead>
                  <TableHead className="w-[220]">Đơn giá</TableHead>
                  <TableHead className="w-[220]">Thành tiền </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dondathang.product?.map((productItem, index) => {
                  console.log(productItem); // Debugging to see the structure of productItem

                  // If productItem is an array (assuming it's an array of product details):
                  if (Array.isArray(productItem)) {
                    return productItem.map((item) => (
                      <TableRow key={item.id} style={{ height: 65 }}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.soluong}</TableCell>
                        <TableCell>{item.dongia}</TableCell>
                        <TableCell>{item.thanhtien}</TableCell>
                      </TableRow>
                    ));
                  }

                  // If productItem is an object (single product), render it directly:
                  return (
                    <TableRow key={productItem.id} style={{ height: 65 }}>
                      <TableCell>{productItem.name}</TableCell>
                      <TableCell>{productItem.soluong}</TableCell>
                      <TableCell>{productItem.dongia}</TableCell>
                      <TableCell>{productItem.thanhtien}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </form>
      </div>

      {/* Tổng tiền và Button */}
      <div
        style={{
          textAlign: "right",
          padding: "0 50px",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          marginBottom: 30,
        }}
      >
        <div style={{ fontSize: 20, fontWeight: "bold" }}>
          Tổng tiền: {formatCurrency(dondathang.total * 1000)}
        </div>
      </div>
    </div>
  );
};

export default FetchProductButton;
