import { DeleteProductFromStock } from "@/app/lib/actions";


export default async function handler(req, res) {
  const { clientproducts ,doitac, nguoivanchuyen,thanhtien} = req.body;
  await DeleteProductFromStock(clientproducts,doitac, nguoivanchuyen,thanhtien);
  
  res.status(200).json({ message: 'Delete Product successfully' });
}
