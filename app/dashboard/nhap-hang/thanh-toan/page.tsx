import {
  fetchDonDatHangById,
  fetchNguoiVanChuyen,
  fetchUserByID,
  getUserByEmail,
} from "@/app/lib/data";
import { DonDatHang, Users } from "@/app/lib/definitions";

import Thanhtoan from "@/app/ui/import/thanhtoan";
import { auth } from "@/auth";
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
  const session = await auth();
  const user = await getUserByEmail(
    session?.user?.email ? session?.user?.email : ""
  );

  return (
    <div>
      <Thanhtoan
        dondathang={dondathang}
        ketoan={ketoan}
        nguoivanchuyen={nguoivanchuyen}
        uid={user.manv}
      />
    </div>
  );
};

export default FetchProductButton;
