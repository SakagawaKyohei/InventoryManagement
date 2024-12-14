"use client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";
import { auth } from "@/auth";
import { getUserByEmail } from "@/app/lib/data";
import { DoiTac, Product, Users } from "@/app/lib/definitions";
import { formatCurrency } from "@/app/lib/utils";
import { redirect } from "next/navigation";

interface OrderProduct {
  stt: number;
  dientich: number;
  thuysan: string;
  soluong: number;
  ngaytuoi: number;
}

interface Pros {
  uid: number;
}

const AddForm = (pros: Pros) => {
  const router = useRouter();

  const handleGoBack = () => {
    if (window.history.length > 2) {
      window.history.back(); // Quay lại trang trước trong lịch sử trình duyệt
    } else {
      router.push("/"); // Nếu không có lịch sử, điều hướng về trang chủ
    }
  };
  const [clientproducts, setClientProducts] = useState<OrderProduct[]>([]);

  const [stt, setSTT] = useState(0);
  const [doitac, setDoitac] = useState<DoiTac>({
    id: "",
    name: "",
    email: "",
    sdt: "",
    dia_chi: "",
    ao_nuoi: "",
  });

  const [message, setMessage] = useState("");
  const [isadding, setIsAdding] = useState(false);
  const [dientich, setDientich] = useState(0);
  const [thuysan, setThuysan] = useState("");
  const [soluong, setsoluong] = useState(0);
  const [ngaytuoi, setNgaytuoi] = useState(0);

  const fetchProducts = async () => {
    setMessage(""); // Clear any previous messages

    try {
      const response = await fetch("/api/product/product-list", {
        method: "GET", // Or POST depending on your API
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("product list fetched successfully");
      } else {
        setMessage("Failed to fetch product list");
      }
    } catch (error) {
      console.error("Error fetching product list:", error);
      setMessage("Error fetching product list. Please try again.");
    } finally {
    }
  };

  // Fetch doitac when the component mounts
  useEffect(() => {
    fetchProducts(); // Trigger the fetch when the component mounts
  }, []); // Empty dependency array means this effect runs once when the component mounts

  // Hàm xử lý submit form
  const handleSubmit = async () => {
    try {
      const res = await fetch("/api/doi-tac/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ doitac: doitac, uid: pros.uid }),
      });
      if (res.ok) {
        // Sau khi xóa sản phẩm thành công, gọi lại hàm fetch để lấy lại dữ liệu
        alert("Thêm thông tin đối tác thành công");
        router.push("/dashboard/doi-tac");
      } else {
        setMessage("Không thể xóa sản phẩm");
      }
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm:", error);
      setMessage("Lỗi khi xóa sản phẩm. Vui lòng thử lại.");
    }
  };

  const HandleAddDraft = async () => {
    // Tạo danh sách mới
    const updatedProducts = [
      ...(clientproducts || []), // Nếu undefined, thay bằng []
      {
        stt: stt,
        thuysan: thuysan,
        dientich: dientich,
        soluong: soluong,
        ngaytuoi: ngaytuoi,
      },
    ];

    // Cập nhật clientProducts
    setClientProducts(updatedProducts);

    // Cập nhật ao_nuoi trong doitac
    setDoitac((prevdoitac) => ({
      ...prevdoitac,
      ao_nuoi: updatedProducts, // Sử dụng danh sách mới nhất
    }));

    // Đóng form và xử lý thêm
    setIsAdding(false);
  };

  const addProductRow = () => {
    setSTT(stt + 1);
    setIsAdding(true);
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
    // try {
    //   const res = await fetch("/api/don-dat-hang/add1", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //   });

    //   if (res.ok) {
    //     // Sau khi xóa sản phẩm thành công, gọi lại hàm fetch để lấy lại dữ liệu

    //     router.push("/dashboard/nhap-hang"); // Use router.push for client-side navigation
    //   } else {
    //     setMessage("Không thể xóa sản phẩm");
    //   }
    // } catch (error) {
    //   console.error("Lỗi khi xóa sản phẩm:", error);
    //   setMessage("Lỗi khi xóa sản phẩm. Vui lòng thử lại.");
    // }
    console.log(doitac);
  };

  return (
    <div className="register-container">
      {" "}
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
        </div>{" "}
      </Link>
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
                style={{
                  width: 375,
                  marginTop: 10,
                }}
                onChange={(e) => {
                  setDoitac((prevdoitac) => ({
                    ...prevdoitac,
                    name: e.target.value,
                  }));
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
                style={{
                  width: 150,
                  marginTop: 10,
                }}
                onChange={(e) => {
                  setDoitac((prevdoitac) => ({
                    ...prevdoitac,
                    sdt: e.target.value,
                  }));
                }}
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
                style={{
                  width: 305,
                  marginTop: 10,
                }}
                onChange={(e) => {
                  setDoitac((prevdoitac) => ({
                    ...prevdoitac,
                    email: e.target.value,
                  }));
                }}
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
              id="buy_price"
              name="buy_price"
              style={{
                width: 1055,
                marginTop: 5,
              }}
              onChange={(e) => {
                setDoitac((prevdoitac) => ({
                  ...prevdoitac,
                  dia_chi: e.target.value,
                }));
              }}
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
              {clientproducts?.map((item) => (
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

              {isadding ? (
                <>
                  <TableRow key="1" style={{ height: 65 }}>
                    <TableCell className="text-center">{stt}</TableCell>
                    <TableCell>
                      <Input
                        type="text"
                        onChange={(e) => {
                          setDientich(parseInt(e.target.value));
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      {" "}
                      <Input
                        type="text"
                        onChange={(e) => {
                          setThuysan(e.target.value);
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      {" "}
                      <Input
                        type="text"
                        onChange={(e) => {
                          setsoluong(parseInt(e.target.value));
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      {" "}
                      <Input
                        type="text"
                        onChange={(e) => {
                          setNgaytuoi(parseInt(e.target.value));
                        }}
                      />
                    </TableCell>
                    <TableCell
                      style={{
                        marginTop: 10,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Image
                        src="/done.jpg"
                        style={{ marginRight: 15 }}
                        width={25}
                        height={25}
                        className="hidden md:block"
                        onClick={() => {
                          HandleAddDraft();
                        }}
                        alt="Screenshots of the dashboard project showing desktop version"
                      />
                      <Image
                        src="/delete.png"
                        style={{ marginRight: 15 }}
                        width={25}
                        height={25}
                        className="hidden md:block"
                        alt="Screenshots of the dashboard project showing desktop version"
                        onClick={() => {
                          setIsAdding(false); // Đóng form thêm mới
                        }}
                      />
                    </TableCell>
                  </TableRow>
                </>
              ) : (
                // Reset các giá trị nếu cần thiết khi không thêm mới
                <>{/* Nội dung khác khi không thêm mới */}</>
              )}
            </TableBody>
          </Table>
          {!isadding ? (
            <button
              style={{
                width: "100%",
                fontWeight: "bold",
                fontSize: 30,
                border: "1px solid black", // Thêm border màu đen và độ dày 2px
              }}
              onClick={addProductRow}
            >
              +
            </button>
          ) : (
            <></>
          )}
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
            Thêm mới
          </Button>
          <Link href={"/dashboard/doi-tac"}>
            <Button
              style={{
                fontSize: 18,
                backgroundColor: "#A30D11",
                width: 140,
                height: 40,
              }}
              onClick={handleCancel}
            >
              Hủy bỏ
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AddForm;
//thêm hàm khi add order product rồi sẽ xóa product đó trong select
