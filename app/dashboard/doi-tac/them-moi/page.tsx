import { auth } from "@/auth";
import { getUserByEmail } from "@/app/lib/data";
import AddForm from "@/app/ui/doitac/addform";

const AddProductToOrder = async () => {
  const session = await auth();
  const user = await getUserByEmail(
    session?.user?.email ? session?.user?.email : ""
  );
  return (
    <div>
      <AddForm uid={user.manv} />
    </div>
  );
};

export default AddProductToOrder;
