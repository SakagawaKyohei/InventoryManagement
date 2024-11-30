import {
  fetchDonDatHangPages,
  fetchFilteredDoiTac,
  fetchFilteredDonDatHang,
  fetchFilteredProducts,
  fetchFilteredXuatHang,
  fetchNguoiVanChuyen,
  fetchPartner,
  fetchProductsPages,
} from "@/app/lib/data";
import {
  DoiTac,
  DonDatHang,
  DonXuatHang,
  Product,
  VanChuyen,
} from "@/app/lib/definitions";
import Table from "@/app/ui/xuathang/table";
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
  type XuatHangWithDoiTac = DonXuatHang & DoiTac;
  const totalPages = await fetchDonDatHangPages(query, item_per_page);
  const dondathang: XuatHangWithDoiTac[] = await fetchFilteredXuatHang(
    query,
    currentPage,
    item_per_page
  );
  const doitac = await fetchPartner();
  const nguoivanchuyen = await fetchNguoiVanChuyen();

  return (
    <div>
      <Table
        dondathang={dondathang}
        totalPages={totalPages}
        doitac={doitac}
        nguoivanchuyen={nguoivanchuyen}
      />
    </div>
  );
};

export default FetchProductButton;
