import { fetchProductById, getUserByEmail } from "@/app/lib/data";
import { Product } from "@/app/lib/definitions";
import EditForm from "@/app/ui/product/editform";
import { auth } from "@/auth";

export default async function EditProduct(props: {
  searchParams?: Promise<{
    id?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const id = searchParams?.id || "";
  const product: Product = await fetchProductById(id);
  const session = await auth();
  const user = await getUserByEmail(
    session?.user?.email ? session?.user?.email : ""
  );

  return (
    <div className="register-container">
      <EditForm product1={product} uid={user.manv} />
    </div>
  );
}
