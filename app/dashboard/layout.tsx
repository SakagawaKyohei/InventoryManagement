import Sidebar from "@/components/Sidebar";
export const experimental_ppr = true;

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row ">
      <div className="w-full flex-none md:w-64">
        <Sidebar />
      </div>
      <div className="flex-grow">{children}</div>
    </div>
  );
}
