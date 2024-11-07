import { EditProduct } from "@/app/lib/actions";


export default async function handler(req, res) {
  const {id, product} = req.body;
  await EditProduct(id,product);
  res.status(200).json({ message: 'Edit product successfully' });
}
