import {
  fetchFilteredVanChuyenDone,
  fetchVanChuyenDonePage,
  getUserByEmail,
} from "@/app/lib/data";
import { VanChuyen } from "@/app/lib/definitions";
import VanChuyenComponent from "@/app/ui/vanchuyen/davanchuyen";
import { auth } from "@/auth";
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
  const totalPages = await fetchVanChuyenDonePage(query, item_per_page);
  const vanchuyen: VanChuyen[] = await fetchFilteredVanChuyenDone(
    query,
    currentPage,
    item_per_page
  );
  const session = await auth();
  const user = await getUserByEmail(
    session?.user?.email ? session?.user?.email : ""
  );

  return (
    <div>
      <VanChuyenComponent
        vanchuyen={vanchuyen}
        totalPages={totalPages}
        user={user}
      />
    </div>
  );
};

export default FetchProductButton;
