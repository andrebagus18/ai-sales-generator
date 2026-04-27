import { TemplateProps } from "./types";

export default function DarkBlueTechTemplate({
  productName,
  targetMarket,
  aiContent,
}: TemplateProps) {
  return (
    <main className="min-h-screen bg-slate-950 text-white selection:bg-blue-500/30">
      {/* Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-[10%] w-[30%] h-[30%] bg-blue-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="mx-auto max-w-6xl px-6 pb-20 pt-32 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-blue-400 backdrop-blur-sm shadow-[0_0_15px_rgba(59,130,246,0.2)]">
            <span className="h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
            Designed for {targetMarket}
          </div>
          
          <h1 className="mt-10 text-5xl font-extrabold tracking-tight sm:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400">
            {aiContent.headline ?? productName}
          </h1>
          
          <p className="mt-8 mx-auto max-w-2xl text-xl leading-relaxed text-slate-400">
            {aiContent.subheadline ?? `${productName} is the next-gen solution for ${targetMarket}.`}
          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <a 
              href="#offer" 
              className="rounded-xl bg-blue-600 px-8 py-4 text-sm font-bold text-white transition-all hover:bg-blue-500 hover:shadow-[0_0_25px_rgba(37,99,235,0.5)] active:scale-95"
            >
              {aiContent.callToAction ?? "Get Early Access"}
            </a>
            <a 
              href="#benefits" 
              className="rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-md px-8 py-4 text-sm font-bold text-white transition-all hover:bg-slate-800 hover:border-slate-700 active:scale-95"
            >
              Learn More
            </a>
          </div>
        </section>

        {/* Problems & Benefits */}
        <section className="mx-auto grid max-w-6xl gap-8 px-6 py-16 md:grid-cols-2">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-10 backdrop-blur-xl">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <span className="text-red-400">#</span> The Struggle
            </h2>
            <ul className="mt-8 space-y-4">
              {(aiContent.painPoints ?? ["Slow workflows", "High costs", "Manual effort"]).map((item) => (
                <li key={item} className="flex items-start gap-3 text-slate-400">
                  <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-400 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div id="benefits" className="rounded-3xl border border-blue-500/20 bg-blue-500/5 p-10 backdrop-blur-xl shadow-[inset_0_0_20px_rgba(59,130,246,0.05)]">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <span className="text-blue-400">#</span> The Solution
            </h2>
            <ul className="mt-8 space-y-4">
              {(aiContent.benefits ?? ["Automated tasks", "AI-driven insights", "Scale faster"]).map((item) => (
                <li key={item} className="flex items-start gap-3 text-slate-300">
                  <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-400 flex-shrink-0 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Offer Section */}
        <section id="offer" className="mx-auto max-w-6xl px-6 py-16">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-blue-600 to-blue-800 p-12 text-white shadow-2xl">
            <div className="absolute top-0 right-0 -mt-20 -mr-20 h-64 w-64 bg-white/10 rounded-full blur-3xl" />
            <div className="relative z-10">
              <h2 className="text-4xl font-bold">Ready to evolve?</h2>
              <p className="mt-6 max-w-2xl text-lg text-blue-100">
                {aiContent.offer ?? `Join other ${targetMarket} who are already using ${productName} to dominate their field.`}
              </p>
              <button className="mt-10 rounded-xl bg-white px-10 py-4 text-sm font-black text-blue-700 transition-all hover:scale-105 active:scale-95 shadow-xl">
                {aiContent.callToAction ?? "Start Now"}
              </button>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="mx-auto max-w-4xl px-6 pb-32 pt-16">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {(aiContent.faq ?? [
              { question: "Is it secure?", answer: "Yes, we use enterprise-grade encryption." },
              { question: "Can I cancel anytime?", answer: "Absolutely, no strings attached." }
            ]).map((item) => (
              <div key={item.question} className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 transition-colors hover:border-slate-700">
                <h3 className="text-lg font-bold text-white">{item.question}</h3>
                <p className="mt-2 text-slate-400 leading-relaxed">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
