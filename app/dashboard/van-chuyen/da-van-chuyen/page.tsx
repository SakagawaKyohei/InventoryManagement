import {
  fetchFilteredPendingDonDatHang,
  fetchFilteredVanChuyenDone,
  fetchPendingDonDatHangPages,
  fetchVanChuyenPage,
} from "@/app/lib/data";
import { DonDatHang, VanChuyen } from "@/app/lib/definitions";
import VanChuyenComponent from "@/app/ui/vanchuyen/davanchuyen";
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
  const totalPages = await fetchVanChuyenPage(query, item_per_page);
  const vanchuyen: VanChuyen[] = await fetchFilteredVanChuyenDone(
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
