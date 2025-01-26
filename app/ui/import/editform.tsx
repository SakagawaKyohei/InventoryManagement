"use client";

import { useEffect, useState } from "react";

import { v4 as uuidv4 } from "uuid";
import { Upload } from "antd";
import { uploadImage } from "@/app/lib/actions";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";
import { redirect, useRouter } from "next/navigation";
import { Product } from "@/app/lib/definitions";
import { UploadChangeParam } from "antd/es/upload";

interface Props {
  product1: Product;
}
export default function EditForm({ product1 }: Props) {
  const [product, setProduct] = useState<Product>({
    id: product1.id,
    name: product1.name,
    buy_price: product1.buy_price,
    sell_price: product1.sell_price,
    company: product1.company,
    img_product: product1.img_product,
    description: product1.description,
  });

  // const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<Blob | null>(null);
  const [imageURL, setImageURL] = useState<string>("");

  const [id_anhbia] = useState(uuidv4());

  const handleImageChange = (e: UploadChangeParam) => {
    const file = e.file;
    setImage(file.originFileObj || null); // Cập nhật trạng thái ảnh
  };

  const router = useRouter();

  const handleGoBack = () => {
    if (window.history.length > 2) {
      window.history.back(); // Quay lại trang trước trong lịch sử trình duyệt
    } else {
      router.push("/"); // Nếu không có lịch sử, điều hướng về trang chủ
    }
  };

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
        img_product: image
          ? `https://zrhhzqtaizoqtwmnzzbi.supabase.co/storage/v1/object/public/avt/public/${id_anhbia}.jpg`
          : product.img_product,
      }));
    }
  }, [id_anhbia, image]);

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
  const handleUpload = async (): Promise<boolean> => {
    if (!image) return false; // Return false if there's no image

    // setLoading(true);
    try {
      const res = await uploadImage(image, id_anhbia); // Use unique `id_anhbia` for each product
      const imageURL = res?.path || ""; // Get the image URL after upload
      setImageURL(imageURL);
      // setLoading(false);

      alert(id_anhbia);
      alert(product.img_product);
      return true; // Return true on successful upload
    } catch (error) {
      // setLoading(false);
      console.error(error);
      return false; // Return false if there was an error
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {
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

    setErrors(newErrors);
    return valid;
  };

  // const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      // First handle the upload (if needed)
      if (image) {
        const res2 = await handleUpload();
        if (!res2) {
          throw new Error("Upload failed or returned an unexpected result.");
        }
      }

      // Proceed with the API call to edit the product
      const res = await fetch("/api/product/edit-product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: product.id, product }),
      });

      // Check if the API call was successful
      if (res.ok) {
        alert("Product updated successfully");
        // Use a proper redirection method based on your framework (e.g., React Router)
        redirect("/dashboard");
      } else {
        const data = await res.json();
        // setError(data.message || "Error updating product");
        console.log(data);
      }
    } catch (error) {
      // Catch any unexpected errors
      console.error("An error occurred:", error);
      // setError("Something went wrong. Please try again.");
    }
  };

  return (
    // <div className="register-container">
    //   <h2>Edit Product</h2>
    //   <form onSubmit={handleSubmit}>
    //     <div>
    //       <label htmlFor="name">Product Name:</label>
    //       <input
    //         type="text"
    //         id="name"
    //         name="name"
    //         value={product.name}
    //         onChange={handleChange}
    //         required
    //       />
    //     </div>

    //     <div>
    //       <label htmlFor="buy_price">Buy Price:</label>
    //       <input
    //         type="text"
    //         id="buy_price"
    //         name="buy_price"
    //         value={product.buy_price ? product.buy_price : 0}
    //         onChange={handleChange}
    //         required
    //       />
    //     </div>

    //     <div>
    //       <label htmlFor="sell_price">Sell Price:</label>
    //       <input
    //         type="text"
    //         id="sell_price"
    //         name="sell_price"
    //         value={product.sell_price ? product.sell_price : 0}
    //         onChange={handleChange}
    //         required
    //       />
    //     </div>

    //     <div>
    //       <label htmlFor="company">Company:</label>
    //       <input
    //         type="text"
    //         id="company"
    //         name="company"
    //         value={product.company}
    //         onChange={handleChange}
    //       />
    //     </div>

    //     <div>
    //       <label htmlFor="description">Product Description:</label>
    //       <input
    //         type="text"
    //         id="description"
    //         name="description"
    //         value={product.description}
    //         onChange={handleChange}
    //         required
    //       />
    //     </div>

    //     {error && <p style={{ color: "red" }}>{error}</p>}

    //     <button type="submit">Save Product</button>
    //   </form>
    // </div>
    <>
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
              ) : product.img_product ? (
                <img
                  src={product1.img_product}
                  alt="avatar"
                  style={{ width: "100%", height: "100%" }}
                />
              ) : (
                // If no image is available, you can render a placeholder or empty
                <img
                  src="/path/to/placeholder.jpg" // A default placeholder image
                  alt="avatar"
                  style={{ width: "100%", height: "100%" }}
                />
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
              Chỉnh sửa
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
    </>
  );
}
