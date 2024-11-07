import { AddProduct } from "@/app/lib/actions";


export default async function handler(req, res) {
  const { product} = req.body;
  await AddProduct(product);
  res.status(200).json({ message: 'Password reset successfully' });
}
