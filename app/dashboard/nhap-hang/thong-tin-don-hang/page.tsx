import {
  fetchDonDatHangById,
  fetchNguoiVanChuyen,
  fetchUserByID,
} from "@/app/lib/data";
import { DonDatHang, Users } from "@/app/lib/definitions";

import View from "@/app/ui/import/view";
const FetchProductButton = async (props: {
  searchParams?: Promise<{
    id?: string;
  }>;
}) => {
  const searchParams = await props.searchParams;
  const id = searchParams?.id || "";
  const dondathang: DonDatHang = await fetchDonDatHangById(id);
  const ketoan: Users = await fetchUserByID(dondathang.manv);

  return (
    <div>
      <View dondathang={dondathang} ketoan={ketoan} />
    </div>
  );
};

export default FetchProductButton;
