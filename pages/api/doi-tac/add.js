import { AddDoiTac } from "@/app/lib/actions";


export default async function handler(req, res) {
  const { doitac,uid} = req.body;
  await AddDoiTac(doitac,uid);
  res.status(200).json({ message: 'Doi tac add successfully' });
}
