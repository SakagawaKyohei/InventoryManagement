import {
  fetchConHan,
  fetchFilteredPendingDonDatHang,
  fetchHetHan,
  fetchHetHanPages,
  fetchPendingDonDatHangPages,
  fetchProductsPages,
  fetchSapHetHan,
  fetchSapHetHanPages,
} from "@/app/lib/data";
import { DonDatHang, Product, TonKho } from "@/app/lib/definitions";
import Paytable from "@/app/ui/import/paytable";
import HetHang from "@/app/ui/hangton/saphethan";
type TonKhoWithProduct = TonKho & Product;
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
  const totalPages = await fetchSapHetHanPages(query, item_per_page);

  const tonkho: TonKhoWithProduct[] = await fetchSapHetHan(
    query,
    currentPage,
    item_per_page
  );

  return (
    <div>
      <HetHang tonkho={tonkho} totalPages={totalPages} />
    </div>
  );
};

export default FetchProductButton;
