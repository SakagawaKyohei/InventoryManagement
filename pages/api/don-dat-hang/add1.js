import { AddDonDatHang1 } from "@/app/lib/actions";


export default async function handler(req, res) {
  const {uid} = req.body;
  await AddDonDatHang1(uid);
  res.status(200).json({ message: 'them don dat hang thanh cong' });
}
