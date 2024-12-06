import {
  fetchPartnerById,
  fetchProductById,
  getUserByEmail,
} from "@/app/lib/data";
import { DoiTac, Product } from "@/app/lib/definitions";
import EditForm from "@/app/ui/doitac/viewform";
import { auth } from "@/auth";
import { use } from "react";

export default async function EditProduct(props: {
  searchParams?: Promise<{
    id?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const id = searchParams?.id || "";
  const doitac1: DoiTac = await fetchPartnerById(id);
  const session = await auth();
  const user = await getUserByEmail(
    session?.user?.email ? session?.user?.email : ""
  );
  return (
    <div className="register-container">
      <EditForm doitac1={doitac1} uid={user.manv} />
    </div>
  );
}
