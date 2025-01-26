import { fetchHetHan, fetchHetHanPages } from "@/app/lib/data";
import { Product, TonKho } from "@/app/lib/definitions";

import HetHang from "@/app/ui/hangton/hethan";
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
  const totalPages = await fetchHetHanPages(query, item_per_page);

  const tonkho: TonKhoWithProduct[] = await fetchHetHan(
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
