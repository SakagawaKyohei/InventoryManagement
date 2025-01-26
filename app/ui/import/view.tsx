"use client";
import { DonDatHang, Users } from "../../lib/definitions";
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
import { useRouter } from "next/navigation";
import { formatCurrency } from "@/app/lib/utils";
import { Input } from "@/components/ui/input";

interface Props {
  dondathang: DonDatHang;
  ketoan: Users;
}

const FetchProductButton = ({ dondathang, ketoan }: Props) => {
  const router = useRouter();

  const handleGoBack = () => {
    if (window.history.length > 2) {
      window.history.back(); // Quay lại trang trước trong lịch sử trình duyệt
    } else {
      router.push("/"); // Nếu không có lịch sử, điều hướng về trang chủ
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("abc");
  };

  const total = dondathang.product?.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  return (
    <div className="register-container">
      <div style={{ display: "flex" }}>
        <Link href={""}>
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
            <p style={{ marginTop: 25, fontSize: 20 }}>Quay lại</p>
          </div>
        </Link>
      </div>
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
            }}
          >
            <p style={{ margin: "0 auto", fontSize: 20, fontWeight: "bold" }}>
              {" "}
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
                  type="text"
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
              <label htmlFor="buy_price">Công ty đặt hàng:</label>
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
        </form>
      </div>
    </div>
  );
};

export default FetchProductButton;
