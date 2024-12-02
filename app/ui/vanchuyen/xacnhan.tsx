"use client";
import React from "react";
import { DonDatHang, VanChuyen } from "../../lib/definitions";
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

interface Props {
  dondathang: DonDatHang;
  vanchuyen: VanChuyen;
  uid: number;
}

const FetchProductButton = ({ dondathang, vanchuyen, uid }: Props) => {
  const total = dondathang.product?.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

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
                <label htmlFor="name">Tên đối tác/Công ty</label>
                <Input
                  type="text"
                  value={dondathang.company}
                  id="name"
                  name="name"
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
                <label htmlFor="sell_price">Kho xuất hàng:</label>
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
                  value={vanchuyen.kho_xuat_hang}
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
                value={vanchuyen.dia_chi_kho}
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
                {dondathang.product?.map((item) => (
                  <TableRow style={{ height: 65 }} key={item.name}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{formatCurrency(item.price * 1000)}</TableCell>
                    <TableCell>
                      {formatCurrency(item.quantity * item.price * 1000)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </form>
      </div>

      {/* Tổng tiền và Button */}
      <div
        style={{
          marginTop: "40px", // Tăng khoảng cách với phần trên
          textAlign: "right",
          padding: "0 50px",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
        }}
      >
        <div style={{ fontSize: 20, fontWeight: "bold" }}>
          Tổng tiền: {formatCurrency(total * 1000)}
        </div>
        <div style={{ display: "flex", justifyContent: "end", gap: "15px" }}>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                style={{
                  fontSize: 18,
                  backgroundColor: "#007ACC",
                  width: 140,
                  height: 40,
                  marginBottom: 30,
                }}
              >
                Xác nhận
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle style={{ marginBottom: 10 }}>
                  Cập nhật trạng thái vận chuyển
                </DialogTitle>
                <DialogDescription style={{ marginBottom: 5 }}>
                  Xác nhận bạn đã vận chuyển thành công đơn hàng.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button
                  onClick={async () => {
                    try {
                      const res = await fetch("/api/van-chuyen/da-van-chuyen", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ id: dondathang.id, uid }),
                      });

                      if (res.ok) {
                        // Sau khi xóa sản phẩm thành công, gọi lại hàm fetch để lấy lại dữ liệu
                        router.push("/dashboard/van-chuyen/dang-van-chuyen");
                      } else {
                      }
                    } catch (error) {
                      console.error("Lỗi khi xóa sản phẩm:", error);
                    }
                  }}
                >
                  Cập nhật
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
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
      </div>
    </div>
  );
};

export default FetchProductButton;
