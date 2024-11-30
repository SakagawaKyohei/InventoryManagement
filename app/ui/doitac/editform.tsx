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
import { DoiTac, Product } from "@/app/lib/definitions";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";

interface Props {
  doitac1: DoiTac;
}
export default function EditForm({ doitac1 }: Props) {
  const [doitac, setdoitac] = useState<DoiTac>({
    id: doitac1.id,
    name: doitac1.name,
    email: doitac1.email,
    sdt: doitac1.sdt,
    dia_chi: doitac1.dia_chi,
    ao_nuoi: doitac1.ao_nuoi,
  });

  const router = useRouter();

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    sdt: "",
    dia_chi: "",
  });

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setdoitac((prevDoitac) => ({
      ...prevDoitac,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let valid = true;
    let newErrors = {
      name: "",
      email: "",
      sdt: "",
      dia_chi: "",
    };

    if (!doitac.name) {
      newErrors.name = "Tên sản phẩm không được để trống.";
      valid = false;
    }

    if (!doitac.email) {
      newErrors.email = "Công ty sản xuất không được để trống.";
      valid = false;
    }

    if (!doitac.sdt) {
      newErrors.email = "Công ty sản xuất không được để trống.";
      valid = false;
    }

    if (!doitac.dia_chi) {
      newErrors.email = "Công ty sản xuất không được để trống.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const [error, setError] = useState<string>("");

  const handleSubmit = async () => {
    try {
      // Proceed with the API call to edit the product
      const res = await fetch("/api/doi-tac/edit-partner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: doitac.id, doitac }),
      });
      console.log(doitac);

      // Check if the API call was successful
      if (res.ok) {
        alert("Product updated successfully");
        // Use a proper redirection method based on your framework (e.g., React Router)
        router.push("/dashboard/doi-tac");
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
    <div className="register-container">
      <div style={{ display: "flex" }}>
        <Image
          src="/return.png"
          width={45}
          height={45}
          className="hidden md:block"
          alt="return"
          style={{ marginRight: 15, marginLeft: 20, marginTop: 20 }}
        />
        <Link href={"/dashboard/doi-tac"}>
          <p style={{ marginTop: 25, fontSize: 20 }}>Quay lại</p>
        </Link>
      </div>
      <div style={{ marginLeft: 50, marginRight: 50 }}>
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
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label htmlFor="name">Tên đối tác</label>
              <Input
                type="text"
                id="name"
                name="name"
                value={doitac.name}
                style={{
                  width: 375,
                  marginTop: 10,
                }}
                onChange={handleChange}
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
                id="sdt"
                name="sdt"
                style={{
                  width: 150,
                  marginTop: 10,
                }}
                onChange={handleChange}
                value={doitac.sdt}
              />
              {/* {errors.sell_price && (
              <div style={{ color: "red" }}>{errors.sell_price}</div>
            )} */}
            </div>
            <div>
              <label htmlFor="company">Email:</label>
              <Input
                type="text"
                id="email"
                name="email"
                value={doitac.email}
                style={{
                  width: 305,
                  marginTop: 10,
                }}
                onChange={handleChange}
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
            <label htmlFor="buy_price">Địa chỉ:</label>
            <Input
              type="text"
              id="dia_chi"
              name="dia_chi"
              onChange={handleChange}
              style={{
                width: 1055,
                marginTop: 5,
              }}
              value={doitac.dia_chi}
            />
            {/* {errors.buy_price && (
              <div style={{ color: "red" }}>{errors.buy_price}</div>
            )} */}
          </div>
        </div>
        <div style={{ marginTop: 25 }}>
          <label htmlFor="description">Ao nuôi:</label>
          <Table>
            <TableHeader>
              <TableRow style={{ height: 65 }}>
                <TableHead className="text-center">STT</TableHead>
                <TableHead>Diện tích</TableHead>
                <TableHead>Loại thủy sản</TableHead>
                <TableHead>Số lượng</TableHead>
                <TableHead>Ngày tuổi</TableHead>
                <TableHead className="text-center w-[100]">Action </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {doitac1.ao_nuoi?.flat().map((item: any) => (
                <TableRow style={{ height: 65 }} key={item.stt}>
                  <TableCell className="text-center">{item.stt}</TableCell>
                  <TableCell>
                    {Number(item.dientich).toLocaleString()} m²
                  </TableCell>
                  <TableCell>{item.thuysan}</TableCell>
                  <TableCell>
                    {Number(item.soluong).toLocaleString()} con
                  </TableCell>
                  <TableCell>{item.ngaytuoi} ngày</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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
            // type="submit"
            onClick={handleSubmit}
          >
            Chỉnh sửa
          </Button>
          <Link href={"/dashboard/doi-tac"}>
            <Button
              style={{
                fontSize: 18,
                backgroundColor: "#A30D11",
                width: 140,
                height: 40,
              }}
              //   onClick={handleCancel}
            >
              Hủy bỏ
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
