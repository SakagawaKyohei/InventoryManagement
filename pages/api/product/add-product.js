import { AddProduct } from "@/app/lib/actions";

// Cấu hình để tăng giới hạn kích thước body lên 10MB
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb', // Tăng giới hạn body lên 10MB
    },
  },
};

export default async function handler(req, res) {
  // Lấy dữ liệu từ body
  const { product, uid } = req.body;

  try {
    // Gọi hàm AddProduct
    await AddProduct(product, uid);

    // Phản hồi thành công
    res.status(200).json({ message: "Product added successfully" });
  } catch (error) {
    // Xử lý lỗi
    console.error("Error adding product:", error);
    res.status(500).json({ message: "Unable to add product" });
  }
}
