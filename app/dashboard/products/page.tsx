import Table from "@/app/ui/product/table";
import { fetchFilteredProducts, fetchProductsPages } from "@/app/lib/data";
import { Product } from "@/app/lib/definitions";
const FetchProductButton = async (props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
    itemsPerPage?: string; // New field for items per page
  }>;
}) => {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const item_per_page = Number(searchParams?.itemsPerPage) || 5;
  const totalPages = await fetchProductsPages(query, item_per_page);
  const product: Product[] = await fetchFilteredProducts(
    query,
    currentPage,
    item_per_page
  );

  return (
    <div>
      <Table product={product} totalPages={totalPages} />
    </div>
  );
};

export default FetchProductButton;
