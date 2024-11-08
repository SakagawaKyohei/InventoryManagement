import { AddDonDatHang1 } from "@/app/lib/actions";


export default async function handler(req, res) {
  await AddDonDatHang1();
  res.status(200).json({ message: 'them don dat hang thanh cong' });
}
