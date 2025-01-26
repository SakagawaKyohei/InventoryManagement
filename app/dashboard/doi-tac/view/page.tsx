import { fetchPartnerById, getUserByEmail } from "@/app/lib/data";
import { DoiTac } from "@/app/lib/definitions";
import EditForm from "@/app/ui/doitac/viewform";

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
