import {
  fetchDonXuatHangById,
  fetchPartnerById,
  fetchVanChuyenById,
} from "@/app/lib/data";
import { DoiTac, DonXuatHang, VanChuyen } from "@/app/lib/definitions";
import Xacnhan from "@/app/ui/vanchuyen/viewxuathang";
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
