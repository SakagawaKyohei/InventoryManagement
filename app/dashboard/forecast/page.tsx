import { fetchLatestDoanhThu } from "@/app/lib/data";

import Component from "@/app/dashboard/forecast/component";
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
