import {
  fetchConHan,
  fetchConHanPages,
  fetchFilteredPendingDonDatHang,
  fetchPendingDonDatHangPages,
  fetchProductsPages,
} from "@/app/lib/data";
import { DonDatHang, Product, TonKho } from "@/app/lib/definitions";
import ConHang from "@/app/ui/hangton/conhan";
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
  const totalPages = await fetchConHanPages(query, item_per_page);

  const tonkho: TonKhoWithProduct[] = await fetchConHan(
    query,
    currentPage,
    item_per_page
  );

  console.log(tonkho);
  return (
    <div>
      <ConHang tonkho={tonkho} totalPages={totalPages} />
      {/* <button>a</button> */}
    </div>
  );
};

export default FetchProductButton;
