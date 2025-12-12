"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { Suspense, useActionState, useEffect, useState } from "react";

import { AuthForm } from "@/components/auth-form";
import { GoogleSignInButton } from "@/components/google-sign-in-button";
import { SubmitButton } from "@/components/submit-button";
import { toast } from "@/components/toast";
import { type LoginActionState, login } from "../actions";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState("");
  const [isSuccessful, setIsSuccessful] = useState(false);

  const [state, formAction] = useActionState<LoginActionState, FormData>(
    login,
    {
      status: "idle",
    }
  );

  const { update: updateSession } = useSession();

  // Handle OAuth errors from URL params
  useEffect(() => {
    const error = searchParams.get("error");
    if (error === "OAuthAccountNotLinked") {
      toast({
        type: "error",
        description:
          "An account with this email already exists. Please sign in with your password.",
      });
      // Clean up URL
      router.replace("/login");
    }
  }, [searchParams, router]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: router and updateSession are stable refs
  useEffect(() => {
    if (state.status === "failed") {
      toast({
        type: "error",
        description: "Invalid credentials!",
      });
    } else if (state.status === "invalid_data") {
      toast({
        type: "error",
        description: "Failed validating your submission!",
      });
    } else if (state.status === "success") {
      setIsSuccessful(true);
      updateSession();
      router.push("/");
      router.refresh();
    }
  }, [state.status]);

  const handleSubmit = (formData: FormData) => {
    setEmail(formData.get("email") as string);
    formAction(formData);
  };

  return (
    <div className="flex h-dvh w-screen items-start justify-center bg-background pt-12 md:items-center md:pt-0">
      <div className="flex w-full max-w-md flex-col gap-12 overflow-hidden rounded-2xl">
        <div className="flex flex-col items-center justify-center gap-2 px-4 text-center sm:px-16">
          <h3 className="font-semibold text-xl dark:text-zinc-50">Sign In</h3>
          <p className="text-gray-500 text-sm dark:text-zinc-400">
            Use your email and password or Google to sign in
          </p>
        </div>
        <div className="flex flex-col gap-4 px-4 sm:px-16">
          <GoogleSignInButton />
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-zinc-300 dark:border-zinc-700" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-zinc-500 dark:text-zinc-400">
                Or continue with
              </span>
            </div>
          </div>
        </div>
        <AuthForm action={handleSubmit} defaultEmail={email}>
          <SubmitButton isSuccessful={isSuccessful}>Sign in</SubmitButton>
          <p className="mt-4 text-center text-gray-600 text-sm dark:text-zinc-400">
            {"Don't have an account? "}
            <Link
              className="font-semibold text-gray-800 hover:underline dark:text-zinc-200"
              href="/register"
            >
              Sign up
            </Link>
            {" for free."}
          </p>
        </AuthForm>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={
      <div className="flex h-dvh w-screen items-start justify-center bg-background pt-12 md:items-center md:pt-0">
        <div className="flex w-full max-w-md flex-col gap-12 overflow-hidden rounded-2xl">
          <div className="flex flex-col items-center justify-center gap-2 px-4 text-center sm:px-16">
            <h3 className="font-semibold text-xl dark:text-zinc-50">Sign In</h3>
            <p className="text-gray-500 text-sm dark:text-zinc-400">
              Loading...
            </p>
          </div>
        </div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}
