"use client";
import React, { useState } from "react";
import {
  DoiTac,
  DonDatHang,
  DonXuatHang,
  Product,
  TonKho,
  Users,
} from "../../lib/definitions";
import { Button } from "@/components/ui/button";
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
import { Underline } from "lucide-react";
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
import { Input } from "@/components/ui/input";

type XuatHangWithDoiTac = DonXuatHang & DoiTac;

interface Props {
  dondathang: any[];
  totalPages: number;
  doitac: DoiTac[];
  nguoivanchuyen: Users[];
}

const FetchProductButton = ({
  dondathang,
  totalPages,
  doitac,
  nguoivanchuyen,
}: Props) => {
  const [id, setId] = useState("");
  const [id1, setId1] = useState("");
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedDoiTac = JSON.parse(event.target.value) as DoiTac;
    console.log("Selected product:", selectedDoiTac);
    setId(selectedDoiTac.id);
    console.log("abc");
  };
  const handleSelectChange1 = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedNguoiVanChuyen = JSON.parse(event.target.value) as Users;
    console.log("Selected product:", selectedNguoiVanChuyen);
    setId1(selectedNguoiVanChuyen.manv.toString());
    console.log("abc");
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
          <p style={{ fontWeight: "bold", fontSize: 24 }}>Đơn xuất hàng</p>
          <p style={{ marginBottom: 15 }}>Danh sách các đơn xuất hàng</p>
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

                <TableHead>Tên đối tác</TableHead>
                <TableHead>Số điện thoại</TableHead>
                <TableHead>Địa chỉ</TableHead>
                <TableHead>Ngày đặt</TableHead>

                <TableHead>Trạng thái</TableHead>
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
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.sdt}</TableCell>
                  <TableCell>
                    {format(new Date(item.ngayxuat), "dd/MM/yyyy")}
                  </TableCell>

                  <TableCell>{formatCurrency(item.total * 1000)}</TableCell>
                  <TableCell>
                    {item.status == "đang vận chuyển"
                      ? "Đang vận chuyển"
                      : "Đã vận chuyển"}
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
      <div
        style={{
          display: "flex",
          justifyContent: "end",
          marginRight: 25,
          marginTop: 30,
        }}
      >
        <Dialog>
          <DialogTrigger asChild>
            <Button
              style={{
                marginRight: 15,
                fontSize: 18,
                backgroundColor: "#007ACC",
                width: 140,
                height: 40,
              }}
            >
              Thêm mới
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Xuất hàng</DialogTitle>
              <DialogDescription>
                Chọn đối tác để xuất hàng. Chọn nút xuất hàng để tạo đơn xuất
                hàng
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Khách hàng
                </Label>
                <select
                  onChange={handleSelectChange}
                  className="col-span-3 flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  defaultValue={""}
                >
                  <option value="" disabled>
                    Chọn đối tác
                  </option>

                  {doitac?.map((doitac) => (
                    <option key={doitac.id} value={JSON.stringify(doitac)}>
                      {doitac.id} - {doitac.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Người vận chuyển
                </Label>
                <select
                  onChange={handleSelectChange1}
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
                      {nguoivanchuyen.manv} - {nguoivanchuyen.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <DialogFooter>
              <Link href={`/dashboard/xuat-hang/them-moi?id=${id}&id1=${id1}`}>
                <Button>Xuất hàng</Button>
              </Link>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default FetchProductButton;
