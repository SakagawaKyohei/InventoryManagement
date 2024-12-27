import { auth } from "@/auth";
import { getUserByEmail } from "@/app/lib/data";
import AddForm from "@/app/ui/import/addform";

const AddProductToOrder = async () => {
  const session = await auth();
  const user = await getUserByEmail(
    session?.user?.email ? session?.user?.email : ""
  );
  console.log(user.dia_chi);

  return (
    <div>
      <AddForm
        id={user.id}
        manv={user.manv}
        name={user.name}
        email={user.email}
        password={user.password}
        status={user.status}
        role={user.role}
        bank={user.bank}
        stk={user.stk}
        ngay_sinh={user.ngaysinh}
        sdt={user.sdt}
        cccd={user.cccd}
        dia_chi={user.dia_chi}
      />
    </div>
  );
};

export default AddProductToOrder;
