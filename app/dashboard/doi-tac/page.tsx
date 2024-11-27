import {
  fetchDoiTacPages,
  fetchDonDatHangPages,
  fetchFilteredDoiTac,
  fetchFilteredDonDatHang,
  fetchFilteredProducts,
  fetchProductsPages,
} from "@/app/lib/data";
import { DoiTac, DonDatHang, Product } from "@/app/lib/definitions";
import PartnerList from "@/app/ui/doitac/partnerlist";
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
  const totalPages = await fetchDoiTacPages(query, item_per_page);
  const doitac: DoiTac[] = await fetchFilteredDoiTac(
    query,
    currentPage,
    item_per_page
  );

  return (
    <div>
      <PartnerList doitac={doitac} totalPages={totalPages} />
    </div>
  );
};

export default FetchProductButton;
