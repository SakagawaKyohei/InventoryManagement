import {
  fetchFilteredXuatHangDaIn,
  fetchXuatHangDaInPages,
} from "@/app/lib/data";
import { DoiTac, DonXuatHang } from "@/app/lib/definitions";
import Table from "@/app/ui/xuathang/dain";
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
  type XuatHangWithDoiTac = DonXuatHang & DoiTac;
  const totalPages = await fetchXuatHangDaInPages(query, item_per_page);
  const dondathang: XuatHangWithDoiTac[] = await fetchFilteredXuatHangDaIn(
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
