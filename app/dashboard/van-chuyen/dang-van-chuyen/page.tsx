import {
  fetchFilteredVanChuyen,
  fetchVanChuyenPage,
  getUserByEmail,
} from "@/app/lib/data";
import { VanChuyen } from "@/app/lib/definitions";
import VanChuyenComponent from "@/app/ui/vanchuyen/vanchuyen";
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
  const totalPages = await fetchVanChuyenPage(query, item_per_page);
  const session = await auth();
  const user = await getUserByEmail(
    session?.user?.email ? session?.user?.email : ""
  );
  const vanchuyen: VanChuyen[] = await fetchFilteredVanChuyen(
    query,
    currentPage,
    item_per_page
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
