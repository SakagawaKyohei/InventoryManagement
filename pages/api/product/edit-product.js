import { EditProduct } from "@/app/lib/actions";




export default async function handler(req, res) {
  const {id, product, uid} = req.body;
  try {
    await EditProduct(id,product,uid);
    res.status(200).json({ message: 'Delete Partner successfully' });
  } catch (error) {
    console.error("Lỗi khi cập nhật đối tác:", error);
    res.status(500).json({ message: "Không thể cập nhật đối tác" });
  }
}
