"use client";
import React, { useState } from "react";
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
import { Logging, Users } from "../lib/definitions";
import { toZonedTime } from "date-fns-tz";

// Múi giờ Việt Nam
const vietnamTimeZone = "Asia/Ho_Chi_Minh";

// Thời gian của item
const formattedDate = (time: any) => {
  const utcTime = new Date(time); // Thời gian gốc UTC
  const zonedTime = toZonedTime(utcTime, vietnamTimeZone); // Chuyển sang giờ Việt Nam
  return format(zonedTime, "dd/MM/yyyy HH:mm:ss"); // Hiển thị dd/MM/yyyy HH:mm:ss
};
interface Props {
  logging: Logging[];
  totalPages: number;
  uid: number;
  users: Users[];
}

const FetchProductButton = ({ logging, totalPages, uid, users }: Props) => {
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const currentPage = (searchParams && Number(searchParams.get("page"))) || 1;
  const [item_per_page, setItemPerPage] = useState(
    Number(searchParams?.get("itemsPerPage")) || 5
  );

  const now = new Date(); // Server-side time
  console.log("Server giờ UTC:", now.toISOString());

  const handleDelete = async (id: string) => {
    const params = new URLSearchParams(
      searchParams ? searchParams.toString() : ""
    );
    try {
      const res = await fetch("/api/doi-tac/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, uid }),
      });
      if (res.ok) {
        // Sau khi xóa sản phẩm thành công, gọi lại hàm fetch để lấy lại dữ liệu
        replace(`${pathname}?${params.toString()}`);
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
          <p style={{ fontWeight: "bold", fontSize: 24 }}>Logging</p>
          <p
            style={{ marginBottom: 15 }}
            onClick={() => {
              // Test với giờ server (UTC)
              const serverTimeUTC = "2024-12-14T11:08:13.701Z";
              console.log("Giờ UTC server:", serverTimeUTC); // In ra giờ UTC
              console.log("Giờ Việt Nam:", formattedDate(serverTimeUTC)); // Chuyển sang giờ Việt Nam
            }}
          >
            Danh sách các hoạt động của người dùng
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
                <TableHead className="text-center">Thời gian</TableHead>

                <TableHead>Mã nhân viên</TableHead>
                <TableHead>Tên nhân viên</TableHead>
                <TableHead>Hoạt động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logging?.map((item, index) => {
                // Tìm nhân viên có mã nhân viên tương ứng với item.user_id
                const user = users.find(
                  (u) => u.manv === parseInt(item.user_id)
                );

                return (
                  <TableRow key={index} style={{ height: 65 }}>
                    <TableCell className="text-center">
                      {formattedDate(item.time)}
                    </TableCell>
                    <TableCell style={{ textDecoration: "underline" }}>
                      <Link href={`/dashboard/account/view?id=${item.user_id}`}>
                        {item.user_id}
                      </Link>
                    </TableCell>
                    {/* Hiển thị tên nhân viên nếu tìm thấy */}
                    <TableCell>{user ? user.name : "Không tìm thấy"}</TableCell>
                    <TableCell>
                      {item.action === "Tạo sản phẩm" ? (
                        <div>
                          Đã thêm mới sản phẩm mã{" "}
                          <Link href={""} style={{ fontWeight: "bold" }}>
                            {item.idforlink}
                          </Link>{" "}
                        </div>
                      ) : null}

                      {item.action === "Chỉnh sửa sản phẩm" ? (
                        <div>
                          Đã cập nhật thông tin sản phẩm mã{" "}
                          <Link href={""} style={{ fontWeight: "bold" }}>
                            {item.idforlink}
                          </Link>
                        </div>
                      ) : null}

                      {item.action === "Xóa sản phẩm" ? (
                        <div>
                          Đã xóa thông tin sản phẩm mã{" "}
                          <Link href={""} style={{ fontWeight: "bold" }}>
                            {item.idforlink}
                          </Link>{" "}
                          khỏi hệ thống
                        </div>
                      ) : null}

                      {item.action === "Tạo đơn đặt hàng" ? (
                        <div>
                          Đã tạo yêu cầu đặt hàng mã{" "}
                          <Link style={{ fontWeight: "bold" }} href={""}>
                            {item.idforlink}
                          </Link>
                        </div>
                      ) : null}

                      {item.action === "Thanh toán" ? (
                        <div>
                          Đã thanh toán cho đơn đặt hàng mã{" "}
                          <Link href={""} style={{ fontWeight: "bold" }}>
                            {item.idforlink}
                          </Link>
                        </div>
                      ) : null}

                      {item.action === "Xóa đối tác" ? (
                        <div>
                          Đã xóa thông tin đối tác mã{" "}
                          <Link href={""} style={{ fontWeight: "bold" }}>
                            {item.idforlink}
                          </Link>
                        </div>
                      ) : null}

                      {item.action === "Đã vận chuyển" ? (
                        <div>
                          Đã vận chuyển thành công đơn hàng mã{" "}
                          <Link href={""} style={{ fontWeight: "bold" }}>
                            {item.idforlink}
                          </Link>
                        </div>
                      ) : null}

                      {item.action === "Thêm đối tác" ? (
                        <div>
                          Đã thêm mới thông tin đối tác mã{" "}
                          <Link href={""} style={{ fontWeight: "bold" }}>
                            {item.idforlink}
                          </Link>{" "}
                        </div>
                      ) : null}

                      {item.action === "Sửa đối tác" ? (
                        <div>
                          Đã cập nhật thông tin đối tác mã{" "}
                          <Link href={""} style={{ fontWeight: "bold" }}>
                            {item.idforlink}
                          </Link>
                        </div>
                      ) : null}

                      {item.action === "Chỉnh sửa người dùng" ? (
                        <div>
                          Đã đã cập nhật thông tin người dùng mã{" "}
                          <Link href={""} style={{ fontWeight: "bold" }}>
                            {item.idforlink}
                          </Link>
                        </div>
                      ) : null}
                    </TableCell>
                  </TableRow>
                );
              })}
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
