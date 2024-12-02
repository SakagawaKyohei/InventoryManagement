import { DeleteProduct } from "@/app/lib/actions";


export default async function handler(req, res) {
  const { id, uid } = req.body;
  await DeleteProduct(id, uid);
  
  res.status(200).json({ message: 'Delete Product successfully' });
}
