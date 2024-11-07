import { fetchPartner } from "@/app/lib/data";

export default async function handler(req, res) {
  try {
    const doitac = await fetchPartner();
    res.status(200).json({ doitac }); // Return the products
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
}
