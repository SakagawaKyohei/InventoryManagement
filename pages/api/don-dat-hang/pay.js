import { ThanhToan} from "@/app/lib/actions";


export default async function handler(req, res) {
  const { donHangId ,hanSuDung,khoXuatHang,diaChi,id_nguoi_van_chuyen,uid } = req.body;
  await ThanhToan(donHangId ,hanSuDung,khoXuatHang,diaChi,id_nguoi_van_chuyen,uid);
  res.status(200).json({ message: 'thanh toan don dat hang dang tao thanh cong' });
}
