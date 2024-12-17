import {
  fetchConHan,
  fetchConHanPages,
  fetchFilteredPendingDonDatHang,
  fetchLatestDoanhThu,
  fetchPendingDonDatHangPages,
  fetchProductsPages,
} from "@/app/lib/data";
import { DonDatHang, Product, TonKho } from "@/app/lib/definitions";
import Component from "@/app/dashboard/forecast/component";
import ConHang from "@/app/ui/hangton/conhan";
type TonKhoWithProduct = TonKho & Product;
const FetchProductButton = async () => {
  const doanhthu = await fetchLatestDoanhThu();
  return (
    <div>
      <Component doanhthu={doanhthu} />
      {/* <button>a</button> */}
    </div>
  );
};

export default FetchProductButton;
