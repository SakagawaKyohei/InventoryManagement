import {
  fetchDonDatHangPages,
  fetchFilteredDonDatHang,
  fetchFilteredProducts,
  fetchProductsPages,
} from "@/app/lib/data";
import { DonDatHang, Product } from "@/app/lib/definitions";
import Table from "@/app/ui/import/table";
import PayTable from "@/app/ui/import/paytable";
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
  const totalPages = await fetchDonDatHangPages(query, item_per_page);
  const dondathang: DonDatHang[] = await fetchFilteredDonDatHang(
    query,
    currentPage,
    item_per_page
  );

  return (
    <div>
      <Table dondathang={dondathang} totalPages={totalPages} />
    </div>
  );
};

export default FetchProductButton;
