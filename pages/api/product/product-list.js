import { fetchProduct } from "@/app/lib/data";

export default async function handler(req, res) {
  try {
    const products = await fetchProduct();
    res.status(200).json({ products }); // Return the products
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
}
