import { EditPartner} from "@/app/lib/actions";
export default async function handler(req, res) {
  const { id, doitac,uid } = req.body;

  if (!doitac) {
    console.log(id, doitac)
    return res.status(400).json({ message: "ID và dữ liệu đối tác là bắt buộc" });
  }

  try {
    await EditPartner(id, doitac,uid);
    res.status(200).json({ message: 'Cập nhật đối tác thành công' });
  } catch (error) {
    console.error("Lỗi khi cập nhật đối tác:", error);
    res.status(500).json({ message: "Không thể cập nhật đối tác" });
  }
}
