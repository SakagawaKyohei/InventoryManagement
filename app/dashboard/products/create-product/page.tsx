import CreateProduct from "@/app/dashboard/products/create-product/component";
import { getUserByEmail } from "@/app/lib/data";
import { auth } from "@/auth";

export default async function CreateProduct1() {
  const session = await auth();
  const user = await getUserByEmail(
    session?.user?.email ? session?.user?.email : ""
  );
  return <CreateProduct uid={user.manv} />;
}
