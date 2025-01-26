import Table from "@/app/ui/customers/history";
import {
  fetchDonXuatHangByIdDoiTac,
  fetchDonXuatHangByIdDoiTacPages,
} from "@/app/lib/data";
import { auth } from "@/auth";
const FetchProductButton = async (props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
    itemsPerPage?: string; // New field for items per page
    id?: string;
  }>;
}) => {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const id = searchParams?.id || "";
  const currentPage = Number(searchParams?.page) || 1;
  const item_per_page = Number(searchParams?.itemsPerPage) || 5;
  const totalPages = await fetchDonXuatHangByIdDoiTacPages(
    query,
    item_per_page,
    id
  );
  const product: any[] = await fetchDonXuatHangByIdDoiTac(
    id,
    query,
    currentPage,
    item_per_page
  );

  return (
    <div>
      <Table product={product} totalPages={totalPages} cusid={id} />
    </div>
  );
};

export default FetchProductButton;
