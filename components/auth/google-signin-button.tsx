"use client";

import { Circle } from "lucide-react";

type GoogleSignInButtonProps = {
  onClick: () => void;
  isLoading: boolean;
  loadingText?: string;
  idleText?: string;
};

export function GoogleSignInButton({
  onClick,
  isLoading,
  loadingText = "Connecting Google...",
  idleText = "Sign in with Google",
}: GoogleSignInButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isLoading}
      className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/10 px-4 py-3 text-sm text-white transition hover:bg-white/15 hover:cursor-pointer disabled:opacity-60"
    >
      <Circle size={16} />
      {isLoading ? loadingText : idleText}
    </button>
  );
}

