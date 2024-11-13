"use client";
import { Upload } from "antd";
import { useState } from "react";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import { uploadImage } from "@/app/lib/actions"; // Đảm bảo đường dẫn đúng
import { v4 as uuidv4 } from "uuid";

const ImageUpload = () => {
  const [loading, setLoading] = useState(false);

  const [image, setImage] = useState<Blob | null>(null);
  const [imageURL, setImageURL] = useState("");
  const id_anhbia = uuidv4();
  const handleImageChange = (e: any) => {
    const file = e.file;
    setImage(file.originFileObj); // Cập nhật ảnh đã chọn
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const handleUpload = async () => {
    if (!image) {
      return;
    }

    setLoading(true);
    try {
      const res = await uploadImage(image, id_anhbia); // Gọi hàm upload tại đây

      // Lấy đường dẫn của ảnh đã upload
      const imageURL = res?.path || ""; // Sử dụng `path` hoặc `fullPath` để lấy đường dẫn ảnh
      setImageURL(imageURL);
      setLoading(false);
      alert(id_anhbia);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  return (
    <div>
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        onChange={handleImageChange}
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
      <button
        onClick={handleUpload}
        disabled={loading}
        style={{ backgroundColor: "blue" }}
      >
        Tải ảnh lên
      </button>
    </div>
  );
};

export default ImageUpload;
