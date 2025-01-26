"use client";

import { useState } from "react";
import { Users } from "../../../lib/definitions";

import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";

interface Props {
  uid: number;
  hashedPassword: string;
  newPassword: string;
}

export default function CreateProduct({ hashedPassword, newPassword }: Props) {
  const router = useRouter();

  const handleGoBack = () => {
    if (window.history.length > 2) {
      window.history.back(); // Quay lại trang trước trong lịch sử trình duyệt
    } else {
      router.push("/"); // Nếu không có lịch sử, điều hướng về trang chủ
    }
  };
  const [product, setProduct] = useState<Users>({
    id: "",
    name: "",
    email: "",
    password: "",
    status: "",
    role: "người vận chuyển",
    bank: "",
    stk: "",
    ngay_sinh: "",
    sdt: "",
    cccd: "",
    dia_chi: "",
    manv: 0,
  });

  const errors = {
    name: "",
    company: "",
    buy_price: "",
    sell_price: "",
    image: "",
  };

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

  // const generatePassword = (length: number): string => {
  //   const charset =
  //     "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_-+=<>?";
  //   let password = "";
  //   for (let i = 0; i < length; i++) {
  //     const randomIndex = Math.floor(Math.random() * charset.length);
  //     password += charset[randomIndex];
  //   }
  //   return password;
  // };

  const userWithHashedPassword = {
    ...product,
    password: hashedPassword,
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Gửi dữ liệu sản phẩm lên backend
    const res = await fetch("/api/auth/add-user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user: userWithHashedPassword,
        password: newPassword,
      }),
    });

    if (res.ok) {
      alert("Thêm sản phẩm thành công!");
      // redirect("/dashboard/products");
    } else {
      const data = await res.json();
      alert(data.message || "Lỗi tạo sản phẩm");
    }
  };

  const handleItemsPerPageChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
    console.log(product);
  };

  return (
    <div className="register-container">
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
      <div style={{ marginLeft: 50, marginRight: 50 }}>
        <form onSubmit={handleSubmit}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 10,
            }}
          ></div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginTop: 30,
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label htmlFor="name">Họ tên:</label>
              <Input
                type="text"
                id="name"
                name="name"
                value={product.name}
                onChange={handleChange}
                style={{ width: 425, marginTop: 10 }}
              />
              {errors.name && <div style={{ color: "red" }}>{errors.name}</div>}
            </div>

            <div>
              <label htmlFor="company">Email:</label>
              <Input
                type="text"
                id="email"
                name="email"
                value={product.email}
                onChange={handleChange}
                style={{ width: 425, marginTop: 10 }}
              />
              {errors.company && (
                <div style={{ color: "red" }}>{errors.company}</div>
              )}
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
              <label htmlFor="buy_price">Số điện thoại:</label>
              <Input
                type="text"
                id="sdt"
                name="sdt"
                value={product.sdt}
                onChange={handleChange}
                style={{ width: 425, marginTop: 5 }}
              />
              {errors.buy_price && (
                <div style={{ color: "red" }}>{errors.buy_price}</div>
              )}
            </div>
            <div>
              <label htmlFor="cccd">Căn cước công dân:</label>
              <Input
                type="text"
                id="cccd"
                name="cccd"
                value={product.cccd}
                onChange={handleChange}
                style={{ width: 425, marginTop: 10 }}
              />
              {errors.sell_price && (
                <div style={{ color: "red" }}>{errors.sell_price}</div>
              )}
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
            <div style={{ display: "flex" }}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label htmlFor="buy_price">Role:</label>

                <select
                  className="h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  defaultValue={"Người vận chuyển"}
                  style={{ width: 175, marginTop: 5, marginRight: 25 }}
                  onChange={handleItemsPerPageChange}
                  id="role"
                  name="role"
                >
                  {" "}
                  <option value="người vận chuyển">Người vận chuyển</option>
                  <option value="kế toán">Kế toán</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label htmlFor="buy_price">Ngày sinh:</label>
                <input
                  type="date"
                  id="ngay_sinh"
                  name="ngay_sinh"
                  value={product.ngay_sinh}
                  onChange={handleChange}
                  style={{ width: 225, marginTop: 5 }}
                  className="h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
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
                {errors.sell_price && (
                  <div style={{ color: "red" }}>{errors.sell_price}</div>
                )}
              </div>
            </div>
          </div>
          <div style={{ marginTop: 25 }}>
            <label htmlFor="dia_chi">Địa chỉ:</label>
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
              Thêm mới
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
    </div>
  );
}
