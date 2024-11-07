import { fetchProductById } from "@/app/lib/data";

export default async function handler(req, res) {
  const { id } = req.query; // Get the product ID from the query string
  if (!id) {
    return res.status(400).json({ message: "Product ID is required" });
  }

  try {
    const product = await fetchProductById(id);

    if (product) {
      res.status(200).json({ product });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error("Failed to fetch product:", error);
    res.status(500).json({ message: "Failed to fetch product" });
  }
}