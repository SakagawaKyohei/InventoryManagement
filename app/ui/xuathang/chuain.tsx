"use client";
import React, { useState } from "react";
import Image from "next/image";
import { format } from "date-fns";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { FaSearch } from "react-icons/fa";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { formatCurrency } from "@/app/lib/utils";

interface Props {
  dondathang: any[];
  totalPages: number;
}

const FetchProductButton = ({ dondathang, totalPages }: Props) => {
  // const [id, setId] = useState("");
  // const [id1, setId1] = useState("");
  // const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   const selectedDoiTac = JSON.parse(event.target.value) as DoiTac;
  //   console.log("Selected product:", selectedDoiTac);
  //   setId(selectedDoiTac.id);
  //   console.log("abc");
  // };
  // const handleSelectChange1 = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   const selectedNguoiVanChuyen = JSON.parse(event.target.value) as Users;
  //   console.log("Selected product:", selectedNguoiVanChuyen);
  //   setId1(selectedNguoiVanChuyen.manv.toString());
  //   console.log("abc");
  // };
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1; // Tháng trong JS bắt đầu từ 0
  const year = currentDate.getFullYear();
  const handlePrint = (cusname: any) => {
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>In Hóa Đơn</title>
         <style>
  body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 20px;
  }
  .invoice {
    width: 80%;
    margin: auto;
    border: 1px solid #ddd;
    padding: 20px;
  }
  table {
    width: 100%;
    border-collapse: collapse;
  }
  th, td {
    border: 1px solid #ddd;
    padding: 8px;
  }
  th {
    text-align: center;
    background-color: #f2f2f2;
  }
  td {
    text-align: left; /* Căn lề trái */
  }
  h1, h3, h4 {
    text-align: center;
  }
  .center {
    text-align: center;
  }
  .total {
    margin-top: 10px;
    text-align: right;
    font-size: 18px;
  }
  .footer {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    font-size: 14px;
  }
</style>

          </head>
          <body onload="window.print(); window.close();">
            <div class="invoice">
              <h3>ĐẠI LÝ THỨC ĂN</h1>
              <h3>CheQuePot</h4>
              <h3>HÓA ĐƠN BÁN HÀNG</h3>
              <p><strong>Tên khách hàng: </strong>${cusname.name}</p>
              <p><strong>Số điện thoại: </strong> ${cusname.sdt}</p>
              <p><strong>Địa chỉ: </strong> ${cusname.dia_chi}</p>

              
              <table>
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Tên hàng</th>
                    <th>ĐVT</th>
                    <th>Số lượng</th>
                    <th>Đơn giá</th>
                    <th>Thành tiền</th>
                  </tr>
                </thead>
                <tbody>
         ${cusname.product[0]
           .map(
             (product: any, index: number) => `
      <tr>
        <td>${index + 1}</td>
        <td>${product.name}</td>
        <td>Kg</td>
        <td>${product.soluong}</td>
        <td>${product.dongia}</td>
        <td>${product.thanhtien}</td>
      </tr>`
           )
           .join("")}
                  <td style="color: transparent;">a</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                    <tr>
                   <td style="color: transparent;">a</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>  
                  <tr>
                    <td style="color: transparent;">a</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                    <tr>
                    <td style="color: transparent;">a</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
       
                </tbody>
              </table>
              <p class="total"><strong>CỘNG: ${formatCurrency(
                cusname.total * 1000
              )}</strong></p>
              <div class="footer">
                <div><div style="display: flex; flex-direction: column;"><strong style="margin-top:15">Người mua hàng</strong><strong style="margin-top:100 ;text-align: center">${
                  cusname.name
                }</strong></div></div>
                <div>
                  <strong>Ngày ${day} tháng ${month} năm ${year}</strong><br />
                 <div style="display: flex; flex-direction: column;">
         <strong style="text-align: center; display: block; ">Người tạo phiếu</strong><div/>
                  <strong style="text-align: center; display: block;margin-top:100">Lâm Gia Bảo</strong><div/>
                </div>
              </div>
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      replace(`${pathname}`);
    }
  };

  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const currentPage = (searchParams && Number(searchParams.get("page"))) || 1;
  const [item_per_page, setItemPerPage] = useState(
    Number(searchParams?.get("itemsPerPage")) || 5
  );

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(
      searchParams ? searchParams.toString() : ""
    );
    params.set("page", "1");
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(
      searchParams ? searchParams.toString() : ""
    );
    params.set("page", pageNumber.toString());
    params.set("itemsPerPage", item_per_page.toString());
    return `${pathname}?${params.toString()}`;
  };

  const handleItemsPerPageChange = (value: number) => {
    setItemPerPage(value);
    const params = new URLSearchParams(
      searchParams ? searchParams.toString() : ""
    );
    params.set("itemsPerPage", value.toString());
    params.set("page", "1"); // Reset to page 1 when items per page changes
    replace(`${pathname}?${params.toString()}`);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
          <PaginationItem key={i}>
            <PaginationLink
              isActive={currentPage === i}
              href={createPageURL(i)}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    } else {
      pageNumbers.push(
        <PaginationItem key={1}>
          <PaginationLink isActive={currentPage === 1} href={createPageURL(1)}>
            1
          </PaginationLink>
        </PaginationItem>
      );
      if (currentPage > 3) {
        pageNumbers.push(
          <PaginationItem key="start-ellipsis">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(
          <PaginationItem key={i}>
            <PaginationLink
              isActive={currentPage === i}
              href={createPageURL(i)}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
      if (currentPage < totalPages - 2) {
        pageNumbers.push(
          <PaginationItem key="end-ellipsis">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
      pageNumbers.push(
        <PaginationItem key={totalPages}>
          <PaginationLink
            isActive={currentPage === totalPages}
            href={createPageURL(totalPages)}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }
    return pageNumbers;
  };

  return (
    <div>
      <div style={{ backgroundColor: "#EAEAEA" }}>
        <div className="px-2 py-4 md:px-4" style={{ backgroundColor: "white" }}>
          <p style={{ fontWeight: "bold", fontSize: 24 }}>Chưa in</p>
          <p style={{ marginBottom: 15 }}>
            Danh sách các đơn xuất hàng chưa in
          </p>
          <div
            style={{ display: "flex", flexDirection: "row", paddingBottom: 15 }}
          >
            <select
              className="w-[70px]"
              value={item_per_page}
              style={{ borderRadius: 5, padding: "4px 8px" }}
              onChange={(e) =>
                handleItemsPerPageChange(parseInt(e.target.value))
              }
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>

            <div className="relative ml-4">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 " />
              <input
                type="text"
                id="search"
                className="border border-gray-400 hover:border-blue-500 rounded-md pl-12 pr-4 text-lg"
                style={{ height: 33, borderRadius: 15 }}
                placeholder="Search"
                onChange={(e) => handleSearch(e.target.value)}
                defaultValue={searchParams?.get("query") || ""}
              />
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow style={{ height: 65 }}>
                <TableHead className="w-[150px] text-center">
                  Mã xuất hàng
                </TableHead>
                <TableHead>Mã đối tác</TableHead>
                <TableHead>Tên đối tác</TableHead>
                <TableHead>Số điện thoại</TableHead>

                <TableHead>Ngày đặt</TableHead>

                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dondathang?.map((item) => (
                <TableRow key={item.id + item.ngayxuat} style={{ height: 65 }}>
                  <TableCell
                    className="font-medium text-center"
                    style={{ textDecoration: "underline" }}
                  >
                    <Link
                      href={`/dashboard/xuat-hang/thong-tin-don-hang?id=${item.xuatid}`}
                    >
                      {item.xuatid}
                    </Link>
                  </TableCell>

                  <TableCell style={{ textDecoration: "underline" }}>
                    <Link href={`/dashboard/doi-tac/view?id=${item.id}`}>
                      {item.id}
                    </Link>
                  </TableCell>

                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.sdt}</TableCell>
                  <TableCell>
                    {format(new Date(item.ngayxuat), "dd/MM/yyyy")}
                  </TableCell>
                  <TableCell>
                    {item.status == "đang vận chuyển"
                      ? "Đang vận chuyển"
                      : "Đã vận chuyển"}
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
                      src="/print.png"
                      onClick={async () => {
                        try {
                          const res = await fetch("/api/in", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ id: item.xuatid }), // Đảm bảo id có giá trị hợp lệ
                          });

                          if (res.ok) {
                            console.log("Request successful!");
                            handlePrint(item); // Kích hoạt lại nếu cần
                          } else {
                            const data = await res.json();
                            console.error("Request failed:", data); // Log chi tiết lỗi từ server
                          }
                        } catch (error) {
                          console.error("Network error:", error); // Bắt lỗi mạng
                        }
                      }}
                      width={25}
                      height={25}
                      className="hidden md:block"
                      alt="Screenshots of the dashboard project showing desktop version"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Pagination style={{ marginTop: 15 }}>
            {currentPage > 1 ? (
              <PaginationPrevious
                href={createPageURL(currentPage - 1)}
                aria-disabled={currentPage === 1}
              />
            ) : (
              <></>
            )}
            <PaginationContent>{renderPageNumbers()}</PaginationContent>
            {currentPage < totalPages ? (
              <PaginationNext
                href={createPageURL(currentPage + 1)}
                aria-disabled={currentPage == totalPages}
              />
            ) : (
              <></>
            )}
          </Pagination>
        </div>
      </div>
    </div>
  );
};

export default FetchProductButton;
