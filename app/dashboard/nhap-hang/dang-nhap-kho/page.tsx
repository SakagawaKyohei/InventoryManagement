import {
  fetchDangNhapHang,
  fetchDangNhapPage,
  fetchDaNhapHang,
  fetchFilteredPendingDonDatHang,
  fetchPendingDonDatHangPages,
  fetchProductsPages,
} from "@/app/lib/data";
import { DonDatHang, Product, TonKho, VanChuyen } from "@/app/lib/definitions";
import Paytable from "@/app/ui/import/dangnhap";
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
  const totalPages = await fetchDangNhapPage(query, item_per_page);
  type TonKhoWithProduct = VanChuyen & DonDatHang;
  const dondathang: TonKhoWithProduct[] = await fetchDangNhapHang(
    query,
    currentPage,
    item_per_page
  );

  return (
    <div>
      <Paytable dondathang={dondathang} totalPages={totalPages} />
    </div>
  );
};

export default FetchProductButton;
