import {
  fetchDoiTacPages,
  fetchFilteredDoiTac,
  getUserByEmail,
} from "@/app/lib/data";
import { DoiTac } from "@/app/lib/definitions";
import PartnerList from "@/app/ui/doitac/partnerlist";
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
  const totalPages = await fetchDoiTacPages(query, item_per_page);
  const session = await auth();
  const user = await getUserByEmail(
    session?.user?.email ? session?.user?.email : ""
  );
  const doitac: DoiTac[] = await fetchFilteredDoiTac(
    query,
    currentPage,
    item_per_page
  );

  return (
    <div>
      <PartnerList doitac={doitac} totalPages={totalPages} uid={user.manv} />
    </div>
  );
};

export default FetchProductButton;
