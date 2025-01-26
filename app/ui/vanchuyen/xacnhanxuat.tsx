"use client";
import React, { useState } from "react";
import {
  DoiTac,
  // DonDatHang,
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

  const handleGoBack = () => {
    if (window.history.length > 2) {
      window.history.back(); // Quay lại trang trước trong lịch sử trình duyệt
    } else {
      router.push("/"); // Nếu không có lịch sử, điều hướng về trang chủ
    }
  };

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
      <Link href={""}>
        <div style={{ display: "flex" }} onClick={handleGoBack}>
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
          marginTop: "40px", // Tăng khoảng cách với phần trên
          textAlign: "right",
          padding: "0 50px",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
        }}
      >
        <div style={{ fontSize: 20, fontWeight: "bold" }}>
          Tổng tiền: {formatCurrency(dondathang.total * 1000)}
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
                <div>
                  <Label htmlFor="username">Hình thức thanh toán</Label>

                  <select
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    style={{
                      borderRadius: 5,
                      padding: "4px 8px",
                      marginTop: 15,
                      marginBottom: 10,
                    }}
                    onChange={handleSelectChange}
                  >
                    <option value="" disabled>
                      Chọn phương thức thanh toán
                    </option>
                    <option value="Trực tiếp">Trực tiếp</option>
                    <option value="Chuyển khoản">Chuyển khoản</option>
                  </select>
                </div>
              </DialogHeader>
              <DialogFooter>
                <Button
                  onClick={async () => {
                    try {
                      const res = await fetch("/api/van-chuyen/da-xuat", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          donHang: dondathang,
                          phuongthuc,
                          doitac,
                        }),
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
