import { DeleteHangTon } from "@/app/lib/actions";


export default async function handler(req, res) {
  const { donhangid, hangid } = req.body;



  try {
    await DeleteHangTon(donhangid, hangid);
    res.status(200).json({ message: 'Delete Partner successfully' });
    console.log(hangid)
  } catch (error) {
    console.error("Lỗi khi cập nhật đối tác:", error);
    res.status(500).json({ message: "Không thể cập nhật đối tác" });
  }
}
