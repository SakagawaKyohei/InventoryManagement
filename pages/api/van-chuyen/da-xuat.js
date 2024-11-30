import { DaXuat} from "@/app/lib/actions";
export default async function handler(req, res) {
  const { donHang, phuongthuc, doitac } = req.body;

  try {
    await DaXuat(donHang, phuongthuc, doitac);
    res.status(200).json({ message: "Cập nhật trạng thái vận chuyển" });
  } catch (error) {
    console.error("Lỗi khi cập nhật đối tác:", error);
    res.status(500).json({ message: "Không thể cập nhật trạng thái vận chuyển" });
  }
}
