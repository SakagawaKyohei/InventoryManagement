import CreateProduct from "@/app/dashboard/account/create/component";
import { getUserByEmail } from "@/app/lib/data";
import { auth } from "@/auth";
import bcrypt from "bcryptjs";

export default async function CreateProduct1() {
  const session = await auth();
  const user = await getUserByEmail(
    session?.user?.email ? session?.user?.email : ""
  );
  const generatePassword = (length: number): string => {
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_-+=<>?";
    let password = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    return password;
  };
  const newPassword = generatePassword(12);
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  return (
    <CreateProduct
      uid={user.manv}
      hashedPassword={hashedPassword}
      newPassword={newPassword}
    />
  );
}
