import { NextApiRequest, NextApiResponse } from 'next';
import { uploadImage } from '@/app/lib/actions'; // Đảm bảo đường dẫn đúng

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { image } = req.body; // Bạn sẽ nhận ảnh như một phần của body yêu cầu

    if (!image) {
      return res.status(400).json({ message: 'Chưa có ảnh được cung cấp' });
    }

    try {
      // Giả sử ảnh là chuỗi base64 hoặc Blob
      const uploadedData = await uploadImage(image);  // Gọi hàm upload ảnh

      return res.status(200).json({
        message: 'Tải ảnh lên thành công',
        data: uploadedData,  // Có thể trả về dữ liệu từ Supabase nếu cần
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Lỗi khi tải ảnh lên' });
    }
  }

  return res.status(405).json({ message: 'Phương thức không được phép' });
}
