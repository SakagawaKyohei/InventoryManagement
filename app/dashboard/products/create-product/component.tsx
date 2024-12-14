"use client";

import { useEffect, useState } from "react";
import { Product } from "../../../lib/definitions";
import { v4 as uuidv4 } from "uuid";
import { Upload } from "antd";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import { uploadImage } from "@/app/lib/actions";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";
import { redirect, useRouter } from "next/navigation";
import { auth } from "@/auth";

interface Props {
  uid: number;
}

export default function CreateProduct({ uid }: Props) {
  const router = useRouter();

  const handleGoBack = () => {
    if (window.history.length > 2) {
      window.history.back(); // Quay lại trang trước trong lịch sử trình duyệt
    } else {
      router.push("/"); // Nếu không có lịch sử, điều hướng về trang chủ
    }
  };
  const [product, setProduct] = useState<Product>({
    id: "",
    name: "",
    buy_price: 0,
    sell_price: 0,
    company: "",
    img_product: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<Blob | null>(null);
  const [imageURL, setImageURL] = useState<string>("");

  const [id_anhbia] = useState(uuidv4());

  const [errors, setErrors] = useState({
    name: "",
    company: "",
    buy_price: "",
    sell_price: "",
    image: "",
  });

  useEffect(() => {
    if (id_anhbia) {
      setProduct((prevProduct) => ({
        ...prevProduct,
        img_product: `https://zrhhzqtaizoqtwmnzzbi.supabase.co/storage/v1/object/public/avt/public/${id_anhbia}.jpg`,
      }));
    }
  }, [id_anhbia]);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleUpload = async () => {
    if (!image) return;

    setLoading(true);
    try {
      const res = await uploadImage(image, id_anhbia); // Sử dụng id_anhbia duy nhất cho mỗi sản phẩm
      const imageURL = res?.path || ""; // Nhận đường dẫn ảnh sau khi tải lên
      setImageURL(imageURL);
      setLoading(false);
      // Set URL ảnh vào product sau khi tải lên thành công
      setProduct((prevProduct) => ({
        ...prevProduct,
        img_product: `https://zrhhzqtaizoqtwmnzzbi.supabase.co/storage/v1/object/public/avt/public/${id_anhbia}.jpg`,
      }));
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  const validateForm = () => {
    let valid = true;
    let newErrors = {
      name: "",
      company: "",
      buy_price: "",
      sell_price: "",
      image: "",
    };

    if (!product.name) {
      newErrors.name = "Tên sản phẩm không được để trống.";
      valid = false;
    }

    if (!product.company) {
      newErrors.company = "Công ty sản xuất không được để trống.";
      valid = false;
    }

    if (product.buy_price && product.buy_price <= 0) {
      newErrors.buy_price = "Giá mua phải lớn hơn 0.";
      valid = false;
    }
    if (!product.buy_price) {
      newErrors.buy_price = "Giá mua không được để trống.";
      valid = false;
    }

    if (!product.sell_price) {
      newErrors.sell_price = "Giá bán không được để trống.";
      valid = false;
    }

    if (product.sell_price && product.sell_price <= 0) {
      newErrors.sell_price = "Giá bán phải lớn hơn 0.";
      valid = false;
    }

    if (!image) {
      newErrors.image = "Vui lòng tải lên hình ảnh sản phẩm.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Kiểm tra tính hợp lệ của form
    if (!validateForm()) return;

    // Gửi hình ảnh lên server nếu có ảnh
    await handleUpload();

    // Gửi dữ liệu sản phẩm lên backend
    const res = await fetch("/api/product/add-product", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ product, uid }),
    });

    if (res.ok) {
      alert("Thêm sản phẩm thành công!");
      redirect("/dashboard/products");
    } else {
      const data = await res.json();
      alert(data.message || "Lỗi tạo sản phẩm");
    }
  };

  const handleImageChange = (e: any) => {
    const file = e.file;
    setImage(file.originFileObj); // Cập nhật trạng thái ảnh
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Tải lên</div>
    </div>
  );

  return (
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
        <form onSubmit={handleSubmit}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 10,
            }}
          >
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              onChange={handleImageChange}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {image ? (
                <img
                  src={URL.createObjectURL(image)}
                  alt="avatar"
                  style={{ width: "100%", height: "100%" }}
                />
              ) : imageURL ? (
                <img
                  src={imageURL}
                  alt="avatar"
                  style={{ width: "100%", height: "100%" }}
                />
              ) : (
                uploadButton
              )}
            </Upload>
            {errors.image && (
              <div style={{ color: "red", marginTop: 10 }}>{errors.image}</div>
            )}
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginTop: 30,
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label htmlFor="name">Tên sản phẩm:</label>
              <Input
                type="text"
                id="name"
                name="name"
                value={product.name}
                onChange={handleChange}
                style={{ width: 375, marginTop: 10 }}
              />
              {errors.name && <div style={{ color: "red" }}>{errors.name}</div>}
            </div>

            <div>
              <label htmlFor="company">Công ty sản xuất:</label>
              <Input
                type="text"
                id="company"
                name="company"
                value={product.company}
                onChange={handleChange}
                style={{ width: 375, marginTop: 10 }}
              />
              {errors.company && (
                <div style={{ color: "red" }}>{errors.company}</div>
              )}
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
              <label htmlFor="buy_price">Giá mua (Nghìn VNĐ):</label>
              <Input
                type="number"
                id="buy_price"
                name="buy_price"
                value={product.buy_price ? product.buy_price : ""}
                onChange={handleChange}
                style={{ width: 375, marginTop: 5 }}
              />
              {errors.buy_price && (
                <div style={{ color: "red" }}>{errors.buy_price}</div>
              )}
            </div>
            <div>
              <label htmlFor="sell_price">Giá bán (Nghìn VNĐ):</label>
              <Input
                type="number"
                id="sell_price"
                name="sell_price"
                value={product.sell_price ? product.sell_price : ""}
                onChange={handleChange}
                style={{ width: 375, marginTop: 10 }}
              />
              {errors.sell_price && (
                <div style={{ color: "red" }}>{errors.sell_price}</div>
              )}
            </div>
          </div>
          <div style={{ marginTop: 25 }}>
            <label htmlFor="description">Mô tả sản phẩm:</label>
            <Textarea
              id="description"
              name="description"
              value={product.description}
              onChange={handleChange}
              style={{ width: "100%", marginTop: 10, height: "20vh" }}
            />
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
              type="submit"
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
              >
                Hủy bỏ
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
