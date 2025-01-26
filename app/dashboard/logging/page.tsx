import {
  fetchFilteredLogging,
  fetchLoggingPages,
  getUser,
} from "@/app/lib/data";
import { Logging, Users } from "@/app/lib/definitions";
import PartnerList from "@/app/ui/tablelogging";
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
  const totalPages = await fetchLoggingPages(query, item_per_page);

  const users: Users[] = await getUser();
  const logging: Logging[] = await fetchFilteredLogging(
    query,
    currentPage,
    item_per_page
  );

  return (
    <div>
      <PartnerList logging={logging} totalPages={totalPages} users={users} />
    </div>
  );
};

export default FetchProductButton;
