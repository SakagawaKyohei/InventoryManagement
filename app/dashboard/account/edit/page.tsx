import {
  fetchProductById,
  fetchUserByID,
  getUserByEmail,
} from "@/app/lib/data";
import { Product, Users } from "@/app/lib/definitions";
import EditForm from "@/app/ui/account/ediform";
import { auth } from "@/auth";

export default async function EditProduct() {
  const session = await auth();
  const user = await getUserByEmail(
    session?.user?.email ? session?.user?.email : ""
  );

  return (
    <div className="register-container">
      <EditForm product1={user} uid={user.manv} />
    </div>
  );
}
