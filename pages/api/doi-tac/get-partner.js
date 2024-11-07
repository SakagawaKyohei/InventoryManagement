import { fetchPartnerById } from "@/app/lib/data";

export default async function handler(req, res) {
  const { id } = req.query; // Get the doitac ID from the query string
  if (!id) {
    return res.status(400).json({ message: "doitac ID is required" });
  }

  try {
    const doitac = await fetchPartnerById(id);

    if (doitac) {
      res.status(200).json({ doitac });
    } else {
      res.status(404).json({ message: "Partner not found" });
    }
  } catch (error) {
    console.error("Failed to fetch partner:", error);
    res.status(500).json({ message: "Failed to fetch partner" });
  }
}