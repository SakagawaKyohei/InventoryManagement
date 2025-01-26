import {
  BanknotesIcon,
  ClockIcon,
  UserGroupIcon,
  InboxIcon,
} from "@heroicons/react/24/outline";
import { lusitana } from "@/app/ui/fonts";
import { fetchCard1Data } from "@/app/lib/data";
import { formatCurrency } from "@/app/lib/utils";

const iconMap = {
  collected: BanknotesIcon,
  customers: UserGroupIcon,
  pending: ClockIcon,
  invoices: InboxIcon,
};

export default async function CardWrapper() {
  const {
    numberOfInvoices,
    numberOfCustomers,
    totalPaidInvoices,
    totalPendingInvoices,
  } = await fetchCard1Data();
  return (
    <>
      {/* NOTE: Uncomment this code in Chapter 9 */}

      <Card
        title="Doanh thu"
        value={formatCurrency(parseInt(totalPaidInvoices) * 1000)}
        type="collected"
      />
      <Card
        title="Chờ thanh toán"
        value={totalPendingInvoices}
        type="pending"
      />
      <Card title="Tổng đơn hàng" value={numberOfInvoices} type="invoices" />
      <Card
        title="Số lượng đối tác"
        value={numberOfCustomers}
        type="customers"
      />
    </>
  );
}

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: "invoices" | "customers" | "pending" | "collected";
}) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p
        className={`${lusitana.className}
          truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
      >
        {value}
      </p>
    </div>
  );
}
