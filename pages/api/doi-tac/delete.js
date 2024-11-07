import { DeletePartner } from "@/app/lib/actions";


export default async function handler(req, res) {
  const { id } = req.body;
  await DeletePartner(id);
  res.status(200).json({ message: 'Delete Partner successfully' });
}
