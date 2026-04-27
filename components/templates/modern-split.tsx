import { TemplateProps } from "./types";

export default function ModernSplitTemplate({
  productName,
  targetMarket,
  aiContent,
}: TemplateProps) {
  return (
    <main className="min-h-screen bg-white text-black font-black selection:bg-blue-600 selection:text-white">
      {/* Hero Section - Split Layout */}
      <section className="flex flex-col md:flex-row min-h-screen">
        {/* Left Side - Solid Blue */}
        <div className="md:w-1/2 bg-blue-600 flex flex-col justify-center p-12 lg:p-24 text-white">
          <div className="mb-12">
            <span className="text-xl uppercase tracking-tighter border-b-4 border-white pb-1 inline-block">
              {productName}
            </span>
          </div>
          <h1 className="text-6xl lg:text-8xl leading-none tracking-tighter uppercase mb-10">
            {aiContent.headline ?? productName}
          </h1>
          <div className="flex gap-4">
            <a 
              href="#offer" 
              className="bg-black text-white px-8 py-5 text-xl uppercase tracking-tighter hover:bg-white hover:text-black transition-colors"
            >
              Join Now
            </a>
            <a 
              href="#details" 
              className="bg-white text-blue-600 px-8 py-5 text-xl uppercase tracking-tighter hover:bg-black hover:text-white transition-colors"
            >
              Info
            </a>
          </div>
        </div>

        {/* Right Side - White */}
        <div className="md:w-1/2 bg-white flex flex-col justify-center p-12 lg:p-24">
          <p className="text-blue-600 text-2xl lg:text-3xl uppercase leading-tight mb-12">
            {aiContent.subheadline ?? `Break the limits with ${productName}. Specifically engineered for the ${targetMarket}.`}
          </p>
          
          <div className="space-y-8">
            <div>
              <p className="text-sm text-zinc-400 uppercase mb-2">The Problem</p>
              <div className="flex flex-wrap gap-2">
                {(aiContent.painPoints ?? ["Slow", "Expensive", "Boring"]).map(pain => (
                  <span key={pain} className="bg-zinc-100 px-3 py-1 text-sm uppercase">✕ {pain}</span>
                ))}
              </div>
            </div>
            
            <div>
              <p className="text-sm text-zinc-400 uppercase mb-2">Target Market</p>
              <p className="text-2xl uppercase tracking-tighter">100% {targetMarket}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Details Section */}
      <section id="details" className="bg-black text-white py-24 px-12 lg:px-24">
        <h2 className="text-5xl lg:text-7xl uppercase tracking-tighter mb-16 text-blue-600">The Blueprint</h2>
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          {(aiContent.benefits ?? ["Speed", "Power", "Style"]).map((benefit, i) => (
            <div key={i} className="border-t-8 border-white pt-8">
              <p className="text-8xl mb-4 opacity-20">0{i + 1}</p>
              <h3 className="text-4xl uppercase mb-4">{benefit}</h3>
              <p className="text-zinc-400 font-medium">No fluff. Just raw performance for the modern {targetMarket}.</p>
            </div>
          ))}
        </div>
      </section>

      {/* Offer Section - Centered Split Vibe */}
      <section id="offer" className="py-24 px-12 lg:px-24 bg-blue-600">
        <div className="bg-white p-12 lg:p-24 border-[20px] border-black">
          <h2 className="text-6xl lg:text-9xl uppercase tracking-tighter leading-none mb-10 text-black">
            The Offer
          </h2>
          <p className="text-2xl lg:text-4xl uppercase leading-none mb-12 text-blue-600">
            {aiContent.offer ?? `Everything ${targetMarket} needs to crush it. Get ${productName} now.`}
          </p>
          <button className="w-full bg-black text-white py-8 text-3xl uppercase tracking-tighter hover:bg-blue-600 transition-colors">
            {aiContent.callToAction ?? "Claim It"}
          </button>
        </div>
      </section>

      {/* FAQ Section - Minimal Bold */}
      <section className="py-24 px-12 lg:px-24 bg-white">
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="lg:w-1/3">
            <h2 className="text-6xl uppercase tracking-tighter leading-none text-black">FAQ</h2>
          </div>
          <div className="lg:w-2/3 space-y-12">
            {(aiContent.faq ?? [
              { question: "What is this?", answer: "The only tool you need." },
              { question: "For whom?", answer: "For the elite." }
            ]).map((item) => (
              <div key={item.question}>
                <h3 className="text-3xl uppercase text-blue-600 mb-4">{item.question}</h3>
                <p className="text-xl uppercase">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer - Full Width Solid */}
      <footer className="bg-black text-white py-12 px-12 lg:px-24 flex flex-col md:flex-row justify-between items-end gap-8">
        <div>
          <h2 className="text-8xl uppercase tracking-tighter text-blue-600">{productName}</h2>
          <p className="text-zinc-500 uppercase mt-4">© 2024 All rights reserved</p>
        </div>
        <div className="flex gap-4 text-xl uppercase tracking-tighter">
          <a href="#" className="hover:text-blue-600">Privacy</a>
          <a href="#" className="hover:text-blue-600">Terms</a>
        </div>
      </footer>
    </main>
  );
}
