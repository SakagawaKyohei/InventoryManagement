import {
  fetchDonDatHangById,
  fetchDonDatHangPages,
  fetchFilteredDonDatHang,
  fetchFilteredProducts,
  fetchNguoiVanChuyen,
  fetchProductsPages,
  fetchUserByID,
} from "@/app/lib/data";
import { DonDatHang, Product, Users } from "@/app/lib/definitions";
import Table from "@/app/ui/import/table";
import View from "@/app/ui/import/view";
const FetchProductButton = async (props: {
  searchParams?: Promise<{
    id?: string;
  }>;
}) => {
  const searchParams = await props.searchParams;
  const id = searchParams?.id || "";
  const dondathang: DonDatHang = await fetchDonDatHangById(id);
  const nguoivanchuyen: Users[] = await fetchNguoiVanChuyen();
  const ketoan: Users = await fetchUserByID(dondathang.manv);

  return (
    <div>
      <View
        dondathang={dondathang}
        ketoan={ketoan}
        nguoivanchuyen={nguoivanchuyen}
      />
    </div>
  );
};

export default FetchProductButton;
