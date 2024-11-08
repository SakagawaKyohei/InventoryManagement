import { AddDonDatHang } from "@/app/lib/actions";


export default async function handler(req, res) {
  const { product,company} = req.body;
  await AddDonDatHang(product,company);
  res.status(200).json({ message: 'add dondathang draft thanh cong' });
}
