"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { ArrowRight } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { AuthGlassCard } from "@/components/auth/auth-glass-card";
import { GoogleSignInButton } from "@/components/auth/google-signin-button";
import { PasswordInput } from "@/components/auth/password-input";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  async function onGoogleSignIn() {
    setError("");
    setIsGoogleLoading(true);
    await signIn("google", {
      callbackUrl: "/dashboard",
    });
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");

    const response = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setIsLoading(false);

    if (response?.error) {
      setError("Invalid email or password.");
      return;
    }

    router.replace("/dashboard");
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md items-center px-6 py-16">
      <AuthGlassCard
        eyebrow="Welcome back"
        title="Sign in to continue"
        subtitle="Access your AI-generated sales pages and dashboard."
      >
        <GoogleSignInButton onClick={onGoogleSignIn} isLoading={isGoogleLoading} />

        <div className="my-6 h-px bg-white/15" />

        <form className="space-y-4" method="post" onSubmit={onSubmit}>
          <input
            name="email"
            type="email"
            required
            placeholder="Email"
            className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-white placeholder:text-indigo-100/50"
          />
          <PasswordInput />
          <Link href="#" className="block text-right text-xs text-indigo-200/85 transition hover:text-white">
            Forgot password?
          </Link>

          {error ? <p className="text-sm text-rose-300">{error}</p> : null}
          <button
            disabled={isLoading}
            className="gemini-button flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 font-medium text-white disabled:opacity-60"
            type="submit"
          >
            {isLoading ? "Logging in..." : "Sign In"}
            <ArrowRight size={16} />
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-indigo-100/75">
          New here?{" "}
          <Link href="/register" className="font-medium text-white underline underline-offset-4">
            Create an account
          </Link>
        </p>
      </AuthGlassCard>
    </main>
  );
}

