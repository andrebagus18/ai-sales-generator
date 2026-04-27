"use client";

import { FormEvent, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { createSalesPageFromBrief } from "@/app/actions/generate-sales-page";
import { Sparkles, ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";

type Step = 1 | 2 | 3;

export default function GeneratorPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>(1);
  const [status, setStatus] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    productName: "",
    originalDescription: "",
    targetMarket: "",
  });

  const stepError = useMemo(() => {
    if (step === 1 && formData.productName.trim().length < 2) {
      return "Product name must be at least 2 characters.";
    }
    if (step === 2 && formData.originalDescription.trim().length < 10) {
      return "Description must be at least 10 characters.";
    }
    if (step === 3 && formData.targetMarket.trim().length < 3) {
      return "Target market must be at least 3 characters.";
    }
    return "";
  }, [formData.originalDescription, formData.productName, formData.targetMarket, step]);

  function goNext() {
    if (stepError) {
      setStatus(stepError);
      return;
    }
    setStatus("");
    setStep((prev) => (prev < 3 ? ((prev + 1) as Step) : prev));
  }

  function goBack() {
    setStatus("");
    setStep((prev) => (prev > 1 ? ((prev - 1) as Step) : prev));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting) return;

    if (step !== 3) {
      goNext();
      return;
    }

    if (stepError) {
      setStatus(stepError);
      return;
    }

    setIsSubmitting(true);
    setStatus("Brewing your landing page copy...");

    try {
      const page = await createSalesPageFromBrief({
        productName: formData.productName,
        originalDescription: formData.originalDescription,
        targetMarket: formData.targetMarket,
      });

      setStatus("");
      setSuccessMessage("Sales page generated successfully!");
      window.setTimeout(() => {
        router.replace(`/dashboard?created=${page.id}`);
      }, 1500);
    } catch (error) {
      console.error("Landing page generation failed", error);
      const message = error instanceof Error ? error.message : "Failed to generate sales page.";
      setStatus(message);
      setIsSubmitting(false);
    }
  }

  return (
    <div className="px-6 py-10 lg:px-10 max-w-4xl mx-auto">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white mb-2">Create New Sales Page</h1>
        <p className="text-zinc-400">Fill in the details below and let our AI do the magic.</p>
      </div>

      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 lg:p-12 shadow-2xl">
        {/* Background glow */}
        <div className="absolute -top-24 -right-24 h-64 w-64 bg-[#04D9FF]/10 blur-[100px]" />
        
        <div className="relative z-10">
          <div className="mb-12 flex items-center justify-between">
            <div className="flex items-center gap-4">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center gap-2">
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                    s <= step 
                      ? "bg-[#04D9FF] text-[#0F172A] shadow-[0_0_15px_rgba(4,217,255,0.4)]" 
                      : "bg-white/5 text-zinc-500 border border-white/10"
                  }`}>
                    {s < step ? <CheckCircle2 size={16} /> : s}
                  </div>
                  {s < 3 && <div className={`w-8 lg:w-12 h-0.5 rounded-full ${s < step ? "bg-[#04D9FF]" : "bg-white/10"}`} />}
                </div>
              ))}
            </div>
            <div className="text-right">
              <p className="text-[10px] uppercase tracking-widest text-[#04D9FF] font-bold">Progress</p>
              <p className="text-xl font-bold text-white">{Math.round((step / 3) * 100)}%</p>
            </div>
          </div>

          <form onSubmit={onSubmit} className="space-y-8">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step-1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <label className="block">
                    <span className="text-sm font-bold text-white uppercase tracking-wider mb-2 block">Product Name</span>
                    <input
                      autoFocus
                      required
                      value={formData.productName}
                      onChange={(e) => setFormData(p => ({ ...p, productName: e.target.value }))}
                      placeholder="e.g. SalesBoost AI"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-[#04D9FF]/50 focus:ring-1 focus:ring-[#04D9FF]/50 transition-all text-lg"
                    />
                  </label>
                  <p className="text-zinc-500 text-sm italic">The name of the product or brand you want to promote.</p>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step-2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <label className="block">
                    <span className="text-sm font-bold text-white uppercase tracking-wider mb-2 block">Product Description</span>
                    <textarea
                      autoFocus
                      required
                      value={formData.originalDescription}
                      onChange={(e) => setFormData(p => ({ ...p, originalDescription: e.target.value }))}
                      placeholder="Describe what your product does, key features, and the problems it solves..."
                      className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-[#04D9FF]/50 focus:ring-1 focus:ring-[#04D9FF]/50 transition-all text-lg min-h-[200px]"
                    />
                  </label>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step-3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <label className="block">
                    <span className="text-sm font-bold text-white uppercase tracking-wider mb-2 block">Target Market</span>
                    <input
                      autoFocus
                      required
                      value={formData.targetMarket}
                      onChange={(e) => setFormData(p => ({ ...p, targetMarket: e.target.value }))}
                      placeholder="e.g. Founders, Marketers, or Small Business Owners"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-[#04D9FF]/50 focus:ring-1 focus:ring-[#04D9FF]/50 transition-all text-lg"
                    />
                  </label>
                  
                  <div className="rounded-2xl bg-[#04D9FF]/5 border border-[#04D9FF]/20 p-6">
                    <h3 className="text-[#04D9FF] font-bold text-sm uppercase tracking-widest mb-4">Summary Brief</h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-[10px] text-zinc-500 uppercase font-bold">Product</p>
                        <p className="text-white font-medium">{formData.productName}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-zinc-500 uppercase font-bold">Market</p>
                        <p className="text-white font-medium">{formData.targetMarket}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex items-center justify-between pt-6">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={goBack}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 text-white font-bold hover:bg-white/10 transition-all"
                >
                  <ArrowLeft size={18} />
                  Back
                </button>
              ) : <div />}

              <button
                type="submit"
                disabled={isSubmitting}
                className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold transition-all ${
                  isSubmitting 
                    ? "bg-zinc-700 text-zinc-400 cursor-not-allowed" 
                    : "bg-[#04D9FF] text-[#0F172A] hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(4,217,255,0.3)]"
                }`}
              >
                {isSubmitting ? (
                  <>Processing...</>
                ) : (
                  <>
                    {step === 3 ? "Generate Now" : "Continue"}
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </div>
          </form>

          {status && !isSubmitting && (
            <div className="mt-6 flex items-center gap-2 text-red-400 bg-red-400/10 p-4 rounded-xl border border-red-400/20">
              <p className="text-sm font-medium">{status}</p>
            </div>
          )}

          {isSubmitting && (
            <div className="mt-8 flex flex-col items-center gap-4">
              <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-[#04D9FF]"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                />
              </div>
              <p className="text-sm text-zinc-400 animate-pulse">{status}</p>
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-10 right-10 z-[70] flex items-center gap-3 rounded-2xl bg-emerald-500 text-white px-6 py-4 shadow-2xl"
          >
            <CheckCircle2 size={24} />
            <div>
              <p className="font-bold">{successMessage}</p>
              <p className="text-xs opacity-80">Redirecting to dashboard...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
