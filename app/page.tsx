import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default function Home() {
  const sessionPromise = getServerSession(authOptions);
  // Server component can await inline in JSX-less flow.
  return <HomeView sessionPromise={sessionPromise} />;
}

async function HomeView({
  sessionPromise,
}: {
  sessionPromise: ReturnType<typeof getServerSession>;
}) {
  const session = await sessionPromise;
  // 
  const getStartedHref = (session as any)?.user?.id ? "/generator" : "/register";


  return (
    <main className="relative min-h-screen overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1800&q=80')",
        }}
      />
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative mx-auto flex min-h-screen w-full max-w-5xl flex-col justify-center px-6 text-white">
        <h1 className="max-w-3xl text-5xl font-semibold tracking-tight">AI Sales Page Generator</h1>
        <p className="mt-4 max-w-2xl text-lg text-zinc-200">
          Generate conversion-focused sales pages from a brief, publish instantly, and share SEO-friendly links in minutes.
        </p>
        <div className="mt-8 flex w-full max-w-md flex-col items-center gap-3">
          <Link href={getStartedHref} className="w-64 rounded-full border border-white/60 px-6 py-3 text-center text-base text-white transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer">
            Get Started
          </Link>
          <Link href="/login" className="w-64 rounded-full border border-white/60 px-6 py-3 text-center text-base text-white transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer">
            Login
          </Link>
          <Link href="/register" className="w-64 rounded-full border border-white/60 px-6 py-3 text-center text-base text-white transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer">
            Register
          </Link>
        </div>
        {/* {!session?.user?.id ? <p className="mt-3 text-sm text-zinc-300">Sign in or register before creating a new page.</p> : null} */}
        {!(session as any)?.user?.id ? (
  <p className="mt-3 text-sm text-zinc-300">
    Sign in or register before creating a new page.
  </p>
) : null}

      </div>
    </main>
  );
}
