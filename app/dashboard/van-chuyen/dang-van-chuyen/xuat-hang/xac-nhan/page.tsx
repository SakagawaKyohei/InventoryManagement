import {
  fetchDonDatHangById,
  fetchDonDatHangPages,
  fetchDonXuatHangById,
  fetchFilteredDonDatHang,
  fetchFilteredProducts,
  fetchNguoiVanChuyen,
  fetchPartner,
  fetchPartnerById,
  fetchProductsPages,
  fetchUserByID,
  fetchVanChuyenById,
} from "@/app/lib/data";
import {
  DoiTac,
  DonDatHang,
  DonXuatHang,
  Product,
  Users,
  VanChuyen,
} from "@/app/lib/definitions";
import Table from "@/app/ui/import/table";
import Xacnhan from "@/app/ui/vanchuyen/xacnhanxuat";
const FetchProductButton = async (props: {
  searchParams?: Promise<{
    id?: string;
  }>;
}) => {
  const searchParams = await props.searchParams;
  const id = searchParams?.id || "";
  const donxuathang: DonXuatHang = await fetchDonXuatHangById(id);
  const vanchuyen: VanChuyen = await fetchVanChuyenById(id);
  const doitac: DoiTac = await fetchPartnerById(donxuathang.ma_doi_tac);

  return (
    <div>
      <Xacnhan dondathang={donxuathang} vanchuyen={vanchuyen} doitac={doitac} />
    </div>
  );
};

export default FetchProductButton;
