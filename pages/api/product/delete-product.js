import { DeleteProduct } from "@/app/lib/actions";


export default async function handler(req, res) {
  const { id } = req.body;
  await DeleteProduct(id);
  res.status(200).json({ message: 'Delete Product successfully' });
}
