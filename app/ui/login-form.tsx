"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useActionState } from "react";
import { authenticate } from "@/app/lib/actions";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import ExclamationCircleIcon from "@heroicons/react/24/outline/ExclamationCircleIcon";

export default function LoginForm() {
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );

  const [isLoading] = useState(false);

  return (
    <form action={formAction} className="space-y-3">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="Enter your email address"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            name="password"
            placeholder="Enter password"
            required
            minLength={6}
          />
        </div>

        {errorMessage && (
          <div
            className="flex h-8 items-end space-x-1"
            style={{ marginTop: 10 }}
            aria-live="polite"
            aria-atomic="true"
          >
            <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
            <p className="text-sm text-red-500">{errorMessage}</p>
          </div>
        )}
      </div>
      <div style={{ marginTop: 25 }}>
        <Button
          className="w-full bg-blue-600 hover:bg-blue-700"
          aria-disabled={isPending}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Logging in...
            </>
          ) : (
            "Đăng nhập"
          )}
        </Button>
      </div>
      <Link href="/sign-up">
        <Button className="w-full mt-4" variant="outline">
          Đăng ký
        </Button>
      </Link>
    </form>
  );
}
