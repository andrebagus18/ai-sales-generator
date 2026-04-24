"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { AuthGlassCard } from "@/components/auth/auth-glass-card";
import { GoogleSignInButton } from "@/components/auth/google-signin-button";
import { PasswordInput } from "@/components/auth/password-input";

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");
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
    setToast("");
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      password: String(formData.get("password") ?? ""),
    };

    const response = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      setIsLoading(false);
      const body = (await response.json()) as { error?: string };
      setError(body.error ?? "Registration failed.");
      return;
    }

    const signInResponse = await signIn("credentials", {
      email: payload.email,
      password: payload.password,
      redirect: false,
    });

    if (signInResponse?.error) {
      setIsLoading(false);
      setError("Account created, but auto-login failed. Please log in manually.");
      return;
    }

    setToast("Registration successful");
    setIsLoading(false);
    window.setTimeout(() => {
      router.replace("/dashboard");
    }, 900);
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md items-center px-6 py-16">
      <AuthGlassCard
        eyebrow="Get Started"
        title="Create your account"
        subtitle="Launch Gemini-styled sales pages with one secure workspace."
      >
        <GoogleSignInButton onClick={onGoogleSignIn} isLoading={isGoogleLoading} />

        <div className="my-6 h-px bg-white/15" />

        <form className="space-y-4" method="post" onSubmit={onSubmit}>
          <input
            name="name"
            required
            minLength={2}
            placeholder="Full name"
            className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-white placeholder:text-indigo-100/50"
          />
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
            {isLoading ? "Creating account..." : "Create Account"}
            <ArrowRight size={16} />
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-indigo-100/75">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-white underline underline-offset-4">
            Sign in instead
          </Link>
        </p>
      </AuthGlassCard>

      <AnimatePresence>
        {toast ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="fixed bottom-6 right-6 rounded-xl bg-emerald-600 px-4 py-3 text-sm text-white shadow-lg"
          >
            {toast}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </main>
  );
}

