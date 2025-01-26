"use client";
import React, { useState } from "react";
import { AiFillDollarCircle } from "react-icons/ai";

import { Button } from "@/components/ui/button";
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
import { CongNo } from "@/app/lib/definitions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { formatCurrency } from "../lib/utils";

interface Props {
  vanchuyen: CongNo[];
  totalPages: number;
}

const FetchProductButton = ({ vanchuyen, totalPages }: Props) => {
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const currentPage = (searchParams && Number(searchParams.get("page"))) || 1;
  const [item_per_page, setItemPerPage] = useState(
    Number(searchParams?.get("itemsPerPage")) || 5
  );
  const params = new URLSearchParams(
    searchParams ? searchParams.toString() : ""
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
          <p style={{ fontWeight: "bold", fontSize: 24 }}>Công nợ</p>
          <p style={{ marginBottom: 15 }}>Danh sách nợ khách hàng</p>
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

                <TableHead>Mã khách hàng</TableHead>
                <TableHead>Tên khách hàng</TableHead>
                <TableHead>Ngày đặt hàng</TableHead>
                <TableHead>Tổng tiền</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vanchuyen?.map((item) => (
                <TableRow key={item.donhangid} style={{ height: 65 }}>
                  <TableCell
                    className="font-medium text-center"
                    style={{ textDecoration: "underline" }}
                  >
                    <Link
                      href={`/dashboard/xuat-hang/thong-tin-don-hang?id=${item.donhangid}`}
                    >
                      {item.donhangid}
                    </Link>
                  </TableCell>
                  <TableCell style={{ textDecoration: "underline" }}>
                    <Link href={`/dashboard/doi-tac/view?id=${item.doitacid}`}>
                      {item.doitacid}
                    </Link>
                  </TableCell>
                  <TableCell>{item.doitacname}</TableCell>

                  <TableCell>
                    {format(new Date(item.orderdate), "dd/MM/yyyy")}
                  </TableCell>

                  <TableCell>{formatCurrency(1000 * item.total)}</TableCell>
                  <TableCell>{item.status}</TableCell>
                  <TableCell
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    {item.status == "Đã thanh toán" ? (
                      <AiFillDollarCircle
                        className="hidden md:block"
                        fontSize={25}
                        style={{ color: "#dddddd", marginTop: 10 }}
                      />
                    ) : (
                      <Dialog>
                        <DialogTrigger asChild>
                          <AiFillDollarCircle
                            className="hidden md:block"
                            fontSize={25}
                            style={{ marginTop: 10 }}
                          />
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle style={{ marginBottom: 10 }}>
                              Cập nhật trạng thái công nợ
                            </DialogTitle>
                            <DialogDescription style={{ marginBottom: 5 }}>
                              Xác nhận đã nhận được tiền từ nợ khách hàng
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter>
                            <Button
                              onClick={async () => {
                                try {
                                  const res = await fetch(
                                    "/api/cong-no/da-thanh-toan",
                                    {
                                      method: "POST",
                                      headers: {
                                        "Content-Type": "application/json",
                                      },
                                      body: JSON.stringify({
                                        doitac: item.doitacid,
                                        donhang: item.donhangid,
                                        sotien: item.total,
                                      }),
                                    }
                                  );

                                  if (res.ok) {
                                    replace(`${pathname}?${params.toString()}`);
                                    // Sau khi xóa sản phẩm thành công, gọi lại hàm fetch để lấy lại dữ liệu
                                  } else {
                                  }
                                } catch (error) {
                                  console.error("Lỗi khi xóa sản phẩm:", error);
                                }
                              }}
                            >
                              Xác nhận
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    )}
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
