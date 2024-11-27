import { fetchPartnerById, fetchProductById } from "@/app/lib/data";
import { DoiTac, Product } from "@/app/lib/definitions";
import EditForm from "@/app/ui/doitac/editform";

export default async function EditProduct(props: {
  searchParams?: Promise<{
    id?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const id = searchParams?.id || "";
  const doitac1: DoiTac = await fetchPartnerById(id);
  return (
    <div className="register-container">
      <EditForm doitac1={doitac1} />
    </div>
  );
}
