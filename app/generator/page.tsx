"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { createSalesPageFromBrief } from "@/app/actions/generate-sales-page";

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
    if (isSubmitting) {
      return;
    }

    if (step !== 3) {
      goNext();
      return;
    }

    if (stepError) {
      setStatus(stepError);
      return;
    }

    setIsSubmitting(true);
    setStatus("Generating your landing page...");

    try {
      const page = await createSalesPageFromBrief({
        productName: formData.productName,
        originalDescription: formData.originalDescription,
        targetMarket: formData.targetMarket,
      });

      setStatus("");
      setSuccessMessage("Sales page created successfully.");
      window.setTimeout(() => {
        router.replace(`/dashboard?created=${page.id}`);
      }, 1200);
    } catch (error) {
      // Keep failures visible in logs for debugging while keeping the UI clean.
      console.error("Landing page generation failed", error);
      const message = error instanceof Error ? error.message : "Failed to generate sales page.";
      setStatus(message);
      setIsSubmitting(false);
    }
  }

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-14">
      <div className="rounded-2xl border border-white/10 bg-[#202020] p-8 shadow-sm">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.18em] text-zinc-400">Step {step} of 3</p>
            <h1 className="mt-2 text-3xl font-semibold text-white">Sales Page Generator</h1>
            <p className="mt-2 text-zinc-300">Fill this brief and generate a polished landing page in seconds.</p>
          </div>
          <motion.div whileHover={{ x: -3 }}>
            <Link href="/dashboard" className="text-sm text-zinc-200 underline underline-offset-4">
              Back to Dashboard
            </Link>
          </motion.div>
        </div>

        <div className="mb-8 grid grid-cols-3 gap-2">
          {[1, 2, 3].map((value) => (
            <div
              key={value}
              className={`h-2 rounded-full ${value <= step ? "gemini-progress" : "bg-zinc-200/40"}`}
              aria-hidden="true"
            />
          ))}
        </div>

        <form className="space-y-6" onSubmit={onSubmit}>
          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.section
                key="step-1"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
              <label className="mb-2 block text-sm font-medium text-zinc-100">What is your product name?</label>
              <input
                name="productName"
                required
                minLength={2}
                value={formData.productName}
                onChange={(event) =>
                  setFormData((prev) => ({
                    ...prev,
                    productName: event.target.value,
                  }))
                }
                placeholder="Example: SalesBoost AI"
                className="w-full rounded-lg border border-white/10 bg-[#252525] px-4 py-3 text-white"
              />
              </motion.section>
            ) : null}

            {step === 2 ? (
              <motion.section
                key="step-2"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
              <label className="mb-2 block text-sm font-medium text-zinc-100">Describe your product in detail</label>
              <textarea
                name="originalDescription"
                required
                minLength={10}
                value={formData.originalDescription}
                onChange={(event) =>
                  setFormData((prev) => ({
                    ...prev,
                    originalDescription: event.target.value,
                  }))
                }
                placeholder="What it does, key features, and why it matters."
                className="h-40 w-full rounded-lg border border-white/10 bg-[#252525] px-4 py-3 text-white"
              />
              </motion.section>
            ) : null}

            {step === 3 ? (
              <motion.section
                key="step-3"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="space-y-6"
              >
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-100">Who is your target market?</label>
                <input
                  name="targetMarket"
                  required
                  minLength={3}
                  value={formData.targetMarket}
                  onChange={(event) =>
                    setFormData((prev) => ({
                      ...prev,
                      targetMarket: event.target.value,
                    }))
                  }
                  placeholder="Example: DTC founders and growth marketers"
                  className="w-full rounded-lg border border-white/10 bg-[#252525] px-4 py-3 text-white"
                />
              </div>

              <div className="rounded-xl border border-white/10 bg-[#252525] p-4">
                <h2 className="font-semibold text-white">Brief review</h2>
                <p className="mt-3 text-sm text-zinc-300">
                  <span className="font-medium text-zinc-100">Product:</span> {formData.productName || "-"}
                </p>
                <p className="mt-2 text-sm text-zinc-300">
                  <span className="font-medium text-zinc-100">Description:</span> {formData.originalDescription || "-"}
                </p>
                <p className="mt-2 text-sm text-zinc-300">
                  <span className="font-medium text-zinc-100">Target market:</span> {formData.targetMarket || "-"}
                </p>
              </div>
              </motion.section>
            ) : null}
          </AnimatePresence>

          <div className="flex items-center gap-3">
            {step > 1 ? (
              <button type="button" onClick={goBack} className="rounded-lg border border-white/10 px-4 py-3">
                Back
              </button>
            ) : null}

            {step < 3 ? (
              <button className="rounded-lg px-4 py-3" type="button" onClick={goNext}>
                Continue
              </button>
            ) : (
              <button className="rounded-lg px-4 py-3" type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Generating..." : "Generate Landing Page"}
              </button>
            )}
          </div>
        </form>

        {status ? <p className="mt-4 text-sm text-zinc-300">{status}</p> : null}

        <AnimatePresence>
          {successMessage ? (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700"
            >
              {successMessage} Redirecting to dashboard...
            </motion.div>
          ) : null}
        </AnimatePresence>

      </div>
    </main>
  );
}

