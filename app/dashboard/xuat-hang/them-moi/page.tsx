import { auth } from "@/auth";
import {
  fetchPartnerById,
  fetchUserByID,
  getUserByEmail,
} from "@/app/lib/data";
import AddForm from "@/app/ui/xuathang/addform";
import { DoiTac, Users } from "@/app/lib/definitions";

export default async function EditProduct(props: {
  searchParams?: Promise<{
    id?: string;
    id1?: number;
  }>;
}) {
  const session = await auth();
  const user = await getUserByEmail(
    session?.user?.email ? session?.user?.email : ""
  );
  const searchParams = await props.searchParams;
  const id = searchParams?.id || "";
  const id1 = searchParams?.id1 || 0;
  const doitac: DoiTac = await fetchPartnerById(id);
  const nguoivanchuyen: Users = await fetchUserByID(id1);
  return (
    <div>
      <AddForm doitac={doitac} nguoivanchuyen={nguoivanchuyen} />
    </div>
  );
}
