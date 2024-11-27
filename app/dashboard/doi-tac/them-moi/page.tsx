import { auth } from "@/auth";
import { getUserByEmail } from "@/app/lib/data";
import AddForm from "@/app/ui/doitac/addform";

const AddProductToOrder = async () => {
  return (
    <div>
      <AddForm />
    </div>
  );
};

export default AddProductToOrder;
