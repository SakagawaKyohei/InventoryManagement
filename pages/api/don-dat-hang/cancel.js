import { CancelDonDatHang } from "@/app/lib/actions";


export default async function handler(req, res) {
  await CancelDonDatHang();
  res.status(200).json({ message: 'huy don dat hang dang tao thanh cong' });
}
