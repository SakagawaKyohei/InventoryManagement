"use client";
import React, { useState, useEffect } from "react";
import { Product } from "../../lib/definitions";
import { Button } from "@/components/ui/button";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FaSearch } from "react-icons/fa";
import Link from "next/link";

const FetchProductButton = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [product, setProduct] = useState<Product[] | null>(null); // Product array or null initially
  const fetchProductData = async () => {
    setLoading(true);
    setMessage(""); // Clear any previous messages

    try {
      const response = await fetch("/api/product/product-list", {
        method: "GET", // Or POST depending on your API
      });

      const data = await response.json();

      if (response.ok) {
        setProduct(data.products); // Corrected to reflect API response
        setMessage("Product fetched successfully");
      } else {
        setMessage("Failed to fetch product");
      }
    } catch (error) {
      console.error("Error fetching product:", error);
      setMessage("Error fetching product. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = async (id: string) => {
    try {
      const res = await fetch("/api/product/delete-product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        // Sau khi xóa sản phẩm thành công, gọi lại hàm fetch để lấy lại dữ liệu
        fetchProductData();
      } else {
        setMessage("Không thể xóa sản phẩm");
      }
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm:", error);
      setMessage("Lỗi khi xóa sản phẩm. Vui lòng thử lại.");
    }
  };

  // Fetch product when the component mounts
  useEffect(() => {
    fetchProductData(); // Trigger the fetch when the component mounts
  }, []); // Empty dependency array means this effect runs once when the component mounts
  return (
    <div>
      <div style={{ backgroundColor: "#EAEAEA" }}>
        <div className="px-2 py-4 md:px-4" style={{ backgroundColor: "white" }}>
          <p style={{ fontWeight: "bold", fontSize: 24 }}>Sản phẩm</p>
          <p style={{ marginBottom: 15 }}>Danh sách các loại thức ăn</p>
          <div
            style={{ display: "flex", flexDirection: "row", paddingBottom: 15 }}
          >
            <Select>
              <SelectTrigger className="w-[70px]">
                <SelectValue placeholder="5" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">5</SelectItem>
                <SelectItem value="dark">10</SelectItem>
                <SelectItem value="system">15</SelectItem>
              </SelectContent>
            </Select>

            <div className="relative ml-4">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 " />
              <input
                type="text"
                id="search"
                className="border border-gray-400 hover:border-blue-500 rounded-md pl-12 pr-4 text-lg "
                style={{ height: 33, borderRadius: 15 }}
                placeholder="Search"
              />
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow style={{ height: 65 }}>
                <TableHead className="w-[150px] text-center">
                  Mã sản phẩm
                </TableHead>
                <TableHead>Tên sản phẩm</TableHead>
                <TableHead>Giá mua</TableHead>
                <TableHead>Giá bán</TableHead>
                <TableHead>Công ty sản xuất</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {product?.map((item) => (
                <TableRow key={item.id} style={{ height: 65 }}>
                  <TableCell className="font-medium text-center">
                    {item.id}
                  </TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.buy_price}</TableCell>
                  <TableCell>{item.sell_price}</TableCell>
                  <TableCell>{item.company}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Pagination style={{ marginTop: 15 }}>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>{" "}
      <div
        style={{
          display: "flex",
          justifyContent: "end",
          marginRight: 25,
          marginTop: 30,
        }}
      >
        <Link href={"/dashboard/products/create-product"}>
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
        </Link>
        <Button
          style={{
            marginRight: 15,
            fontSize: 18,
            backgroundColor: "#A30D11",
            width: 140,
            height: 40,
            marginBottom: 20,
          }}
        >
          Xóa bỏ
        </Button>
      </div>
    </div>
  );
};

export default FetchProductButton;
