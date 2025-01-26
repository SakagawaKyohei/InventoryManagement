import { fetchUserByID } from "@/app/lib/data";
import { Users } from "@/app/lib/definitions";
import EditForm from "@/app/ui/viewnguoidung";

export default async function EditProduct(props: {
  searchParams?: Promise<{
    id?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const id = searchParams?.id || "";
  const product: Users = await fetchUserByID(parseInt(id));

  return (
    <div className="register-container">
      <EditForm product={product} />
    </div>
  );
}
