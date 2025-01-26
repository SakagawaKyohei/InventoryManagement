import Table from "@/app/ui/account/unactivetable";
import {
  fetchAccountUnactivePages,
  fetchFilteredUnactiveAccount,
} from "@/app/lib/data";
import { Users } from "@/app/lib/definitions";
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
  const totalPages = await fetchAccountUnactivePages(query, item_per_page);
  const product: Users[] = await fetchFilteredUnactiveAccount(
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
