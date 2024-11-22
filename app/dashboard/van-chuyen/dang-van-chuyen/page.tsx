import {
  fetchFilteredPendingDonDatHang,
  fetchPendingDonDatHangPages,
} from "@/app/lib/data";
import { DonDatHang } from "@/app/lib/definitions";
import VanChuyen from "@/app/ui/vanchuyen";
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
  const totalPages = await fetchPendingDonDatHangPages(query, item_per_page);
  const dondathang: DonDatHang[] = await fetchFilteredPendingDonDatHang(
    query,
    currentPage,
    item_per_page
  );

  return (
    <div>
      <VanChuyen dondathang={dondathang} totalPages={totalPages} />
    </div>
  );
};

export default FetchProductButton;
