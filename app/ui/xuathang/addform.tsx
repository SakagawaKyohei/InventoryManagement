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
  id: string;
  name: string;
  soluong: number;
  dongia: string;
  thanhtien: string;
}

interface Props {
  doitac: DoiTac;
  nguoivanchuyen: Users;
}
export default function AddForm({ doitac, nguoivanchuyen }: Props) {
  const router = useRouter();

  const handleGoBack = () => {
    if (window.history.length > 2) {
      window.history.back(); // Quay lại trang trước trong lịch sử trình duyệt
    } else {
      router.push("/"); // Nếu không có lịch sử, điều hướng về trang chủ
    }
  };
  const [products, setProducts] = useState<any[]>();
  const [clientproducts, setClientProducts] = useState<OrderProduct[]>([]);
  const [product, setProduct] = useState({
    id: "",
    name: "",
    price: 0,
    quantity: 0,
  });

  const [company, setCompany] = useState("");
  const [dongia, setDonGia] = useState(0);
  const [toida, setToiDa] = useState(0);
  const [thanhtien, setThanhTien] = useState(0);
  const [soluong, setSoluong] = useState(0);
  const [message, setMessage] = useState("");
  const [isadding, setIsAdding] = useState(false);
  const [productname, setProductname] = useState("");
  const [productid, setProductid] = useState("");

  // Hàm xử lý khi người dùng thay đổi giá trị trong form
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const fetchProducts = async () => {
    setMessage(""); // Clear any previous messages

    try {
      const response = await fetch("/api/product/stock-product", {
        method: "GET", // Or POST depending on your API
      });

      const data = await response.json();

      if (response.ok) {
        setProducts(data.products); // Corrected to reflect API response
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
  const handleSubmit = async () => {};

  const HandleAddDraft = async () => {
    if (soluong > toida) {
      alert(
        "Không đủ hàng để xuất, Vui lòng nhập hàng hoặc chọn số lượng ít hơn"
      );
      return;
    }
    setClientProducts([
      ...(clientproducts || []), // Nếu undefined, thay bằng []
      {
        thanhtien: formatCurrency(dongia * soluong * 1000), // Directly assign the result of the multiplication
        dongia: formatCurrency(dongia * 1000),
        soluong: soluong,
        name: productname,
        id: productid,
      },
    ]);
    setThanhTien(thanhtien + dongia * soluong);
    setSoluong(0);
    //     ...prevProduct,
    //     quantity: 0,
    //   }));
    setDonGia(0); // Reset giá trị dongia (nếu có state này)
    setToiDa(0); // Reset giá trị dongia (nếu có state này)
    setIsAdding(false); // Đóng form thêm mới
    setSelectedProducts((prev) => [...prev, product.name]);
    // handleSubmit();
  };

  const [productList, setProductList] = useState([
    { id: "", name: "", quantity: "", price: "" },
  ]);

  const addProductRow = () => {
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
    try {
      const res = await fetch("/api/xuat-hang/delete-from-stock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientproducts,
          doitac,
          nguoivanchuyen,
          thanhtien,
        }),
      });

      if (res.ok) {
        // Sau khi xóa sản phẩm thành công, gọi lại hàm fetch để lấy lại dữ liệu
        router.push("/dashboard/xuat-hang");
      } else {
        setMessage("Không thể xóa sản phẩm");
      }
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm:", error);
      setMessage("Lỗi khi xóa sản phẩm. Vui lòng thử lại.");
    }
  };

  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  const availableProducts = products?.filter(
    (product) => !selectedProducts.includes(product.name) // Loại bỏ sản phẩm đã chọn
  );

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedProduct = JSON.parse(event.target.value) as any;
    console.log("Selected product:", selectedProduct);

    setDonGia(selectedProduct.buy_price ? selectedProduct.buy_price : 0);
    setToiDa(selectedProduct.tong_so_luong); // Reset giá trị dongia (nếu có state này)
    setProduct((prevProduct) => ({
      ...prevProduct,
      price: selectedProduct.buy_price ? selectedProduct.buy_price : 0,
    }));
    setCompany(selectedProduct.company);
    setProductname(selectedProduct.name);
    setProduct((prevProduct) => ({
      ...prevProduct,
      name: selectedProduct.name,
    }));
    setProductid(selectedProduct.id);
    setProduct((prevProduct) => ({
      ...prevProduct,
      name: selectedProduct.name,
      id: selectedProduct.id,
    }));
  };
  return (
    // <div>
    //   <h1>Add Product to DonDatHang</h1>
    //   <button onClick={handleCancel}>Cancel</button>
    //   <button onClick={handleadd}>add</button>
    //   <form onSubmit={handleSubmit}>
    //     <div>
    //       <label>Company:</label>
    //       <input
    //         type="text"
    //         name="company"
    //         value={company}
    //         onChange={handleCompanyChange}
    //         required
    //       />
    //     </div>

    //     <div>
    //       <label>id:</label>
    //       <input
    //         type="text"
    //         name="id"
    //         value={product.id}
    //         onChange={handleInputChange}
    //         required
    //       />
    //     </div>
    //     <div>
    //       <label>Product Name:</label>
    //       <input
    //         type="text"
    //         name="name"
    //         value={product.name}
    //         onChange={handleInputChange}
    //         required
    //       />
    //     </div>
    //     <div>
    //       <label>Price:</label>
    //       <input
    //         type="number"
    //         name="price"
    //         value={product.price}
    //         onChange={handleInputChange}
    //         required
    //       />
    //     </div>
    //     <div>
    //       <label>Quantity:</label>
    //       <input
    //         type="number"
    //         name="quantity"
    //         value={product.quantity}
    //         onChange={handleInputChange}
    //         required
    //       />
    //     </div>
    //     <button type="submit">Add Product</button>
    //   </form>
    //   {message && <p>{message}</p>}
    // </div>
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
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginRight: 15,
              }}
            >
              <label htmlFor="name">Mã đối tác</label>
              <Input
                type="text"
                id="name"
                name="name"
                value={doitac.id}
                disabled
                style={{
                  width: 150,
                  marginTop: 10,
                  backgroundColor: "#dddddd",
                }}
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
                value={doitac.sdt}
                disabled
                style={{
                  width: 150,
                  marginTop: 10,
                  backgroundColor: "#dddddd",
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
                value={doitac.email}
                id="company"
                name="company"
                disabled
                style={{
                  width: 305,
                  marginTop: 10,
                  backgroundColor: "#dddddd",
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
              disabled
              value={doitac.dia_chi}
              style={{
                width: 1075,
                marginTop: 5,
                backgroundColor: "#dddddd",
              }}
            />
            {/* {errors.buy_price && (
              <div style={{ color: "red" }}>{errors.buy_price}</div>
            )} */}
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
            <label htmlFor="buy_price">Người vận chuyển:</label>
            <Input
              type="text"
              id="buy_price"
              name="buy_price"
              disabled
              value={`${nguoivanchuyen.manv} - ${nguoivanchuyen.name}`}
              style={{
                width: 1075,
                marginTop: 5,
                backgroundColor: "#dddddd",
              }}
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
                <TableHead>Action </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clientproducts?.map((item) => (
                <TableRow style={{ height: 65 }} key={item.name}>
                  <TableCell>{item.name}</TableCell>

                  <TableCell>{item.soluong}</TableCell>
                  <TableCell>{item.dongia}</TableCell>
                  <TableCell>{item.thanhtien}</TableCell>
                </TableRow>
              ))}

              {isadding ? (
                <>
                  <TableRow key="1" style={{ height: 65 }}>
                    <TableCell>
                      <select
                        onChange={handleSelectChange}
                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                        defaultValue={""}
                      >
                        <option value="" disabled>
                          Chọn thức ăn
                        </option>

                        {availableProducts
                          ?.filter((product) => product.tong_so_luong != 0) // Lọc các sản phẩm có số lượng khác 0
                          .map((product) => (
                            <option
                              key={product.id}
                              value={JSON.stringify(product)}
                            >
                              {product.name} - Còn {product.tong_so_luong}
                            </option>
                          ))}
                      </select>
                    </TableCell>
                    <TableCell>
                      <Input
                        type="text"
                        onChange={(e) => {
                          setSoluong(parseInt(e.target.value));
                          setProduct((prevProduct) => ({
                            ...prevProduct,
                            quantity: parseInt(e.target.value),
                          }));
                        }}
                      />
                    </TableCell>
                    <TableCell>{formatCurrency(dongia * 1000)}</TableCell>
                    <TableCell>
                      {formatCurrency(dongia * 1000 * (soluong ? soluong : 0))}
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
                          // Reset lại các giá trị khi đóng form
                          setSoluong(0);
                          setProduct((prevProduct) => ({
                            ...prevProduct,
                            quantity: 0,
                          }));
                          setDonGia(0); // Reset giá trị dongia (nếu có state này)
                          setToiDa(0); // Reset giá trị dongia (nếu có state này)
                          setProduct((prevProduct) => ({
                            ...prevProduct,
                            price: 0,
                          }));

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
              marginBottom: 15,
            }}
            // type="submit"
            onClick={handleadd}
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
              onClick={handleCancel}
            >
              Hủy bỏ
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
//thêm hàm khi add order product rồi sẽ xóa product đó trong select
