"use client";
import React, { useState } from "react";
import { DonDatHang, Product, TonKho } from "../../lib/definitions";

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

type TonKhoWithProduct = TonKho & Product;
interface Props {
  tonkho: TonKhoWithProduct[];
  totalPages: number;
}

const FetchProductButton = ({ tonkho, totalPages }: Props) => {
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const currentPage = (searchParams && Number(searchParams.get("page"))) || 1;
  const [item_per_page, setItemPerPage] = useState(
    Number(searchParams?.get("itemsPerPage")) || 5
  );

  const handleDelete = async (donhangid: string, hangid: string) => {
    const params = new URLSearchParams(
      searchParams ? searchParams.toString() : ""
    );
    try {
      const res = await fetch("/api/hang-ton/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ donhangid, hangid }),
      });
      if (res.ok) {
        // Sau khi xóa sản phẩm thành công, gọi lại hàm fetch để lấy lại dữ liệu
        replace(`${pathname}?${params.toString()}`);

        console.log(donhangid, hangid);
      } else {
      }
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm:", error);
    }
  };

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
          <p style={{ fontWeight: "bold", fontSize: 24 }}>Hết hạn</p>
          <p style={{ marginBottom: 15 }}>Danh sách các thức ăn hết hạn</p>
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
                  Mã đơn hàng
                </TableHead>
                <TableHead>Mã hàng</TableHead>

                <TableHead>Tên hàng</TableHead>
                <TableHead>Ngày nhập</TableHead>
                <TableHead>Hạn sử dụng</TableHead>
                <TableHead>Số lượng</TableHead>

                <TableHead>Công ty nhập</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tonkho?.map((item) => (
                <TableRow
                  key={item.ma_don_hang + item.ma_hang}
                  style={{ height: 65 }}
                >
                  <TableCell
                    className="font-medium text-center"
                    style={{ textDecoration: "underline" }}
                  >
                    <Link
                      href={`/dashboard/nhap-hang/thong-tin-don-hang?id=${item.ma_don_hang}`}
                    >
                      {" "}
                      {item.ma_don_hang}
                    </Link>
                  </TableCell>
                  <TableCell
                    className="font-medium"
                    style={{ textDecoration: "underline" }}
                  >
                    <Link href={`/dashboard/products/view?id=${item.ma_hang}`}>
                      {" "}
                      {item.ma_hang}
                    </Link>
                  </TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>
                    {format(new Date(item.ngay_nhap), "dd/MM/yyyy")}
                  </TableCell>
                  <TableCell>
                    {format(new Date(item.han_su_dung), "dd/MM/yyyy")}
                  </TableCell>

                  <TableCell>{item.so_luong}</TableCell>

                  <TableCell>{item.company}</TableCell>
                  <TableCell>
                    <Image
                      src="/delete.png"
                      width={30}
                      height={40}
                      className="hidden md:block"
                      alt="Screenshots of the dashboard project showing desktop version"
                      onClick={() => {
                        handleDelete(item.ma_don_hang, item.ma_hang);
                      }}
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
