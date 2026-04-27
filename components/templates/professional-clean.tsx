import { TemplateProps } from "./types";

export default function ProfessionalCleanTemplate({
  productName,
  targetMarket,
  aiContent,
}: TemplateProps) {
  return (
    <main className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100">
      {/* Header / Navbar Placeholder */}
      <nav className="mx-auto max-w-7xl px-6 py-6 flex justify-between items-center border-b border-slate-100">
        <span className="text-xl font-bold tracking-tight text-blue-700">{productName}</span>
        <a href="#offer" className="rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-800 transition-colors">
          Get Started
        </a>
      </nav>

      {/* Hero Section */}
      <section className="mx-auto max-w-5xl px-6 pb-24 pt-24 text-center">
        <div className="mx-auto max-w-fit rounded-full bg-blue-50 px-4 py-1 text-sm font-bold text-blue-700 mb-8">
          Trusted by {targetMarket} Worldwide
        </div>
        
        <h1 className="text-5xl font-extrabold tracking-tight text-slate-950 sm:text-6xl leading-[1.1]">
          {aiContent.headline ?? productName}
        </h1>
        
        <p className="mt-8 mx-auto max-w-2xl text-xl leading-relaxed text-slate-600">
          {aiContent.subheadline ?? `Empowering ${targetMarket} with the tools they need to succeed in a digital-first world.`}
        </p>

        <div className="mt-12 flex flex-col sm:flex-row justify-center gap-4">
          <a 
            href="#offer" 
            className="rounded-xl bg-blue-700 px-10 py-4 text-base font-bold text-white transition-all hover:bg-blue-800 shadow-lg shadow-blue-700/20 active:scale-95"
          >
            {aiContent.callToAction ?? "Start Your Journey"}
          </a>
          <a 
            href="#benefits" 
            className="rounded-xl border border-slate-200 bg-white px-10 py-4 text-base font-bold text-slate-700 transition-all hover:bg-slate-50 active:scale-95"
          >
            Explore Features
          </a>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="bg-slate-50 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-950">Why Choose {productName}?</h2>
            <p className="mt-4 text-slate-600">Tailored solutions for the modern {targetMarket}.</p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {(aiContent.benefits ?? ["Increased Efficiency", "Data-Driven Insights", "Seamless Integration"]).map((benefit, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm transition-transform hover:-translate-y-1">
                <div className="h-12 w-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-6 font-bold text-xl">
                  {i + 1}
                </div>
                <h3 className="text-xl font-bold text-slate-950 mb-3">{benefit}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Specifically optimized to help {targetMarket} achieve their goals with maximum precision.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof / Problems */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-slate-950 mb-6">Stop settling for less.</h2>
            <div className="space-y-6">
              {(aiContent.painPoints ?? ["Wasted time", "Fragmented tools", "Poor results"]).map((pain, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs">✕</div>
                  <p className="text-slate-700 font-medium">{pain}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1 bg-blue-700 rounded-[2rem] p-10 text-white shadow-2xl">
            <blockquote className="text-2xl font-medium italic leading-relaxed">
              "{productName} has completely transformed how I handle my daily tasks. It's a game changer for any {targetMarket}."
            </blockquote>
            <div className="mt-8 flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-blue-500" />
              <div>
                <p className="font-bold text-lg">Alex Rivera</p>
                <p className="text-blue-200 text-sm">Senior Professional</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section id="offer" className="mx-auto max-w-5xl px-6 py-24">
        <div className="rounded-[3rem] bg-slate-950 px-8 py-16 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
          <div className="relative z-10">
            <h2 className="text-4xl font-bold mb-6">Experience the difference today.</h2>
            <p className="mt-4 mx-auto max-w-2xl text-lg text-slate-400 mb-12">
              {aiContent.offer ?? `Don't let inefficiency hold you back. Start using ${productName} and see the results for yourself.`}
            </p>
            <button className="rounded-xl bg-blue-700 px-12 py-5 text-lg font-bold text-white hover:bg-blue-600 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-blue-700/30">
              {aiContent.callToAction ?? "Get Started Now"}
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-100 py-12 mt-12">
        <div className="mx-auto max-w-6xl px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <span className="text-xl font-bold text-slate-900">{productName}</span>
          <div className="flex gap-8 text-slate-500 text-sm font-medium">
            <a href="#" className="hover:text-blue-700">Privacy</a>
            <a href="#" className="hover:text-blue-700">Terms</a>
            <a href="#" className="hover:text-blue-700">Contact</a>
          </div>
          <p className="text-slate-400 text-sm">© 2024 {productName}. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
