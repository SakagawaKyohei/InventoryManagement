import { fetchCongNoPage, fetchFilteredCongNo } from "@/app/lib/data";
import { CongNo } from "@/app/lib/definitions";
import VanChuyenComponent from "@/app/ui/congno";
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
  const totalPages = await fetchCongNoPage(query, item_per_page);
  const vanchuyen: CongNo[] = await fetchFilteredCongNo(
    query,
    currentPage,
    item_per_page
  );

  return (
    <div>
      <VanChuyenComponent vanchuyen={vanchuyen} totalPages={totalPages} />
    </div>
  );
};

export default FetchProductButton;
