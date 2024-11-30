import { DeleteProductFromStock } from "@/app/lib/actions";


export default async function handler(req, res) {
  const { clientproducts } = req.body;
  await DeleteProductFromStock(clientproducts);
  
  res.status(200).json({ message: 'Delete Product successfully' });
}
