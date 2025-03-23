import LoginForm from "../ui/login-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Apple } from "lucide-react";
import Link from "next/link";

export default function Component() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <Apple className="h-12 w-12 text-blue-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-center">
            {/* Food Supply Inventory */}
            https://drive.google.com/file/d/1BOvTOjRSL4xAC9vEK_UXcT8k67vYDaTt/view?usp=sharing
          </CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access your inventory
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
        <CardFooter>
          <p className="text-sm text-center w-full text-gray-600">
            Quên mật khẩu?{" "}
            <Link
              href="/forgot-password"
              className="text-blue-600 hover:underline"
            >
              Nhấn vào đây để đổi mật khẩu
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
