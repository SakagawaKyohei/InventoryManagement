import {
  fetchDonDatHangById,
  fetchDonDatHangPages,
  fetchFilteredDonDatHang,
  fetchFilteredProducts,
  fetchNguoiVanChuyen,
  fetchProductsPages,
  fetchUserByID,
  fetchVanChuyenById,
} from "@/app/lib/data";
import { DonDatHang, Product, Users, VanChuyen } from "@/app/lib/definitions";
import Table from "@/app/ui/import/table";
import Xacnhan from "@/app/ui/vanchuyen/xacnhan";
const FetchProductButton = async (props: {
  searchParams?: Promise<{
    id?: string;
  }>;
}) => {
  const searchParams = await props.searchParams;
  const id = searchParams?.id || "";
  const dondathang: DonDatHang = await fetchDonDatHangById(id);
  const vanchuyen: VanChuyen = await fetchVanChuyenById(id);

  return (
    <div>
      <Xacnhan dondathang={dondathang} vanchuyen={vanchuyen} />
    </div>
  );
};

export default FetchProductButton;
