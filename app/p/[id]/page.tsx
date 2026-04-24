import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPublishedSalesPageById } from "@/lib/sales-pages";

type PublicAIContent = {
  headline?: string;
  subheadline?: string;
  painPoints?: string[];
  benefits?: string[];
  offer?: string;
  callToAction?: string;
  faq?: Array<{ question: string; answer: string }>;
};

type PublicPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: PublicPageProps): Promise<Metadata> {
  const { id } = await params;
  const page = await getPublishedSalesPageById(id);

  if (!page) {
    return {
      title: "Sales page not found",
      description: "The requested sales page does not exist.",
    };
  }

  const aiContent = page.aiContent as PublicAIContent;
  return {
    title: `${page.productName} | AI Sales Page`,
    description: aiContent.subheadline ?? `Landing page for ${page.productName}`,
  };
}

export function PublicSalesPageView({
  productName,
  targetMarket,
  aiContent,
}: {
  productName: string;
  targetMarket: string;
  aiContent: PublicAIContent;
}) {
  return (
    <main className="bg-gradient-to-b from-white via-zinc-50 to-zinc-100">
      <section className="mx-auto max-w-6xl px-6 pb-14 pt-20">
        <div className="rounded-3xl border border-zinc-200 bg-white p-10 shadow-lg shadow-zinc-300/30">
          <p className="inline-flex rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-zinc-600">
            Built for {targetMarket}
          </p>
          <h1 className="mt-6 max-w-4xl text-4xl font-bold tracking-tight text-zinc-900 sm:text-6xl">
            {aiContent.headline ?? productName}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-zinc-600">
            {aiContent.subheadline ??
              `${productName} helps ${targetMarket} create better results with less time and fewer manual steps.`}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#offer" className="rounded-full bg-black px-6 py-3 text-sm font-semibold text-white">
              {aiContent.callToAction ?? "Get Started"}
            </a>
            <a href="#benefits" className="rounded-full border border-zinc-300 px-6 py-3 text-sm font-semibold text-zinc-700">
              See Benefits
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-6 py-8 md:grid-cols-2">
        <div className="rounded-2xl border border-zinc-200 bg-white p-8">
          <h2 className="text-2xl font-semibold text-zinc-900">The Problem</h2>
          <ul className="mt-4 space-y-3 text-zinc-600">
            {(aiContent.painPoints ?? ["Low conversion copy", "Slow page creation", "Inconsistent messaging"]).map((item) => (
              <li key={item} className="rounded-lg bg-zinc-50 px-4 py-3">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div id="benefits" className="rounded-2xl border border-zinc-200 bg-white p-8">
          <h2 className="text-2xl font-semibold text-zinc-900">What You Get</h2>
          <ul className="mt-4 space-y-3 text-zinc-600">
            {(aiContent.benefits ?? ["Clear positioning", "Persuasive section structure", "SEO-friendly public pages"]).map(
              (item) => (
                <li key={item} className="rounded-lg bg-zinc-50 px-4 py-3">
                  {item}
                </li>
              ),
            )}
          </ul>
        </div>
      </section>

      <section id="offer" className="mx-auto max-w-6xl px-6 py-10">
        <div className="rounded-3xl bg-zinc-900 p-10 text-white">
          <h2 className="text-3xl font-semibold">Offer</h2>
          <p className="mt-4 max-w-3xl text-zinc-200">
            {aiContent.offer ??
              `Launch your ${productName} page quickly with professionally structured copy tailored for ${targetMarket}.`}
          </p>
          <a
            href="#faq"
            className="mt-8 inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-zinc-900"
          >
            {aiContent.callToAction ?? "Start Now"}
          </a>
        </div>
      </section>

      <section id="faq" className="mx-auto max-w-6xl px-6 pb-20 pt-8">
        <div className="rounded-2xl border border-zinc-200 bg-white p-8">
          <h2 className="text-2xl font-semibold text-zinc-900">FAQ</h2>
          <div className="mt-4 divide-y">
            {(aiContent.faq ?? [
              {
                question: "How quickly can I publish a page?",
                answer: "Most users can publish in a few minutes after filling the brief.",
              },
              {
                question: "Can I share the page publicly?",
                answer: "Yes. Once published, your page is available through a public link.",
              },
            ]).map((item) => (
              <div key={item.question} className="py-4">
                <h3 className="font-semibold text-zinc-900">{item.question}</h3>
                <p className="mt-1 text-zinc-600">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default async function PublicSalesPage({ params }: PublicPageProps) {
  const { id } = await params;
  const page = await getPublishedSalesPageById(id);

  if (!page) {
    notFound();
  }

  return (
    <PublicSalesPageView
      productName={page.productName}
      targetMarket={page.targetMarket}
      aiContent={page.aiContent as PublicAIContent}
    />
  );
}

