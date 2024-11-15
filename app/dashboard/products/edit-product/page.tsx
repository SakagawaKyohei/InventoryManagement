import { fetchProductById } from "@/app/lib/data";
import { Product } from "@/app/lib/definitions";
import EditForm from "@/app/ui/product/editform";

export default async function EditProduct(props: {
  searchParams?: Promise<{
    id?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const id = searchParams?.id || "";
  const product: Product = await fetchProductById(id);
  return (
    <div className="register-container">
      <EditForm product1={product} />
    </div>
  );
}
