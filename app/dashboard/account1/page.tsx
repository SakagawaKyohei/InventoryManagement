import { fetchUserByID, getUserByEmail } from "@/app/lib/data";
import { Users } from "@/app/lib/definitions";
import EditForm from "@/app/ui/account/ediform1";
import { auth } from "@/auth";

export default async function EditProductt() {
  const session = await auth();
  const user = await getUserByEmail(
    session?.user?.email ? session?.user?.email : ""
  );

  const doitac1: Users = await fetchUserByID(50);

  return (
    <div className="register-container">
      <EditForm product1={doitac1} uid={user.manv} />
    </div>
  );
}
