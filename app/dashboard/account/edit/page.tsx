import { fetchUserByID, getUserByEmail } from "@/app/lib/data";
import { Users } from "@/app/lib/definitions";
import EditForm from "@/app/ui/account/ediform";
import { auth } from "@/auth";

export default async function EditProductt(props: {
  searchParams?: Promise<{
    id?: number;
  }>;
}) {
  const searchParams = await props.searchParams;
  const id = searchParams?.id || 0;
  const doitac1: Users = await fetchUserByID(id);
  const session = await auth();
  const user = await getUserByEmail(
    session?.user?.email ? session?.user?.email : ""
  );

  return (
    <div className="register-container">
      <EditForm product1={doitac1} uid={user.manv} />
    </div>
  );
}
