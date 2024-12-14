"use client";
import React, { useState } from "react";
import { DonDatHang, Product, Users } from "../../lib/definitions";
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
import {
  redirect,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
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

import { Label } from "@/components/ui/label";

interface Props {
  dondathang: DonDatHang;
  ketoan: Users;
  nguoivanchuyen: Users[];
  uid: number;
}

const FetchProductButton = ({
  dondathang,
  ketoan,
  nguoivanchuyen,
  uid,
}: Props) => {
  const router = useRouter();

  const handleGoBack = () => {
    if (window.history.length > 2) {
      window.history.back(); // Quay lại trang trước trong lịch sử trình duyệt
    } else {
      router.push("/"); // Nếu không có lịch sử, điều hướng về trang chủ
    }
  };
  const handlePay = async () => {
    try {
      const res = await fetch("/api/don-dat-hang/pay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          donHangId: dondathang.id,
          hanSuDung,
          khoXuatHang,
          diaChi,
          id_nguoi_van_chuyen,
          uid,
        }),
      });

      if (res.ok) {
        // Sau khi xóa sản phẩm thành công, gọi lại hàm fetch để lấy lại dữ liệu
        alert("Thanh toán thành công, đã cập nhật nhiệm vụ người vận chuyển");
        router.push("/dashboard/nhap-hang/cho-thanh-toan");
      } else {
      }
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm:", error);
    }
  };
  const [hanSuDung, setHanSuDung] = useState("");
  const [diaChi, setDiaChi] = useState("");
  const [khoXuatHang, setKhoXuathang] = useState("");
  const [id_nguoi_van_chuyen, setId] = useState("");
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("abc");
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedNguoiVanChuyen = JSON.parse(event.target.value) as Users;
    console.log("Selected product:", selectedNguoiVanChuyen);
    setId(selectedNguoiVanChuyen.id);
    console.log("abc");
  };
  const total = dondathang.product?.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="register-container">
      <Link href={""}>
        {" "}
        <div style={{ display: "flex" }} onClick={handleGoBack}>
          {" "}
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
            }}
          >
            <p style={{ margin: "0 auto", fontSize: 20, fontWeight: "bold" }}>
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
                <label htmlFor="name">Mã nhân viên</label>
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
                  value={ketoan.manv}
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label htmlFor="name">Tên nhân viên</label>
                <Input
                  type="text"
                  value={ketoan.name}
                  id="name"
                  name="name"
                  disabled
                  style={{
                    width: 285,
                    marginTop: 10,
                    backgroundColor: "#dddddd",
                  }}
                />
                {/* {errors.name && <div style={{ color: "red" }}>{errors.name}</div>} */}
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
                  type="number"
                  id="sell_price"
                  name="sell_price"
                  disabled
                  style={{
                    width: 150,
                    marginTop: 10,
                    backgroundColor: "#dddddd",
                  }}
                  value={ketoan.sdt}
                />
                {/* {errors.sell_price && (
            <div style={{ color: "red" }}>{errors.sell_price}</div>
          )} */}
              </div>
              <div>
                <label htmlFor="company">Email:</label>
                <Input
                  type="text"
                  id="company"
                  name="company"
                  disabled
                  style={{
                    width: 305,
                    marginTop: 10,
                    backgroundColor: "#dddddd",
                  }}
                  value={ketoan.email}
                />
                {/* {errors.company && (
            <div style={{ color: "red" }}>{errors.company}</div>
          )} */}
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
              <label htmlFor="buy_price">Công ty nhập hàng:</label>
              <Input
                type="text"
                id="buy_price"
                name="buy_price"
                disabled
                style={{
                  width: 1075,
                  marginTop: 5,
                  backgroundColor: "#dddddd",
                }}
                value={dondathang.company}
              />
              {/* {errors.buy_price && (
            <div style={{ color: "red" }}>{errors.buy_price}</div>
          )} */}
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
          <div
            style={{
              marginTop: 25,
              fontSize: 20,
              fontWeight: "bold",
            }}
            className="text-right"
          >
            Tổng tiền: {formatCurrency(total * 1000)}
          </div>
          <div
            style={{
              marginTop: 25,
              display: "flex",
              justifyContent: "end",
            }}
          >
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  style={{
                    fontSize: 18,
                    backgroundColor: "#007ACC",
                    width: 140,
                    height: 40,
                    marginRight: 15,
                  }}
                >
                  Thanh toán
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[750px]">
                <DialogHeader>
                  <DialogTitle>Thanh toán</DialogTitle>
                  <DialogDescription>
                    Xác nhận thanh toán và chuyển sang giai đoạn vận chuyển
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Hạn sử dụng
                    </Label>
                    <input
                      className="col-span-3 h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                      type="date"
                      onChange={(e) => {
                        setHanSuDung(e.target.value);
                      }}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                      Kho xuất hàng
                    </Label>
                    <Input
                      className="col-span-3"
                      onChange={(e) => {
                        setKhoXuathang(e.target.value);
                      }}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                      Địa chỉ
                    </Label>
                    <Input
                      className="col-span-3"
                      onChange={(e) => {
                        setDiaChi(e.target.value);
                      }}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                      Người vận chuyển
                    </Label>

                    <select
                      onChange={handleSelectChange}
                      className="col-span-3 flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                      defaultValue={""}
                    >
                      <option value="" disabled>
                        Chọn người vận chuyển
                      </option>

                      {nguoivanchuyen?.map((nguoivanchuyen) => (
                        <option
                          key={nguoivanchuyen.id}
                          value={JSON.stringify(nguoivanchuyen)}
                        >
                          {nguoivanchuyen.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handlePay}>Save changes</Button>
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
        </form>
      </div>
    </div>
  );
};

export default FetchProductButton;
