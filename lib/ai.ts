import { generateText } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { z } from "zod";

const salesCopySchema = z.object({
  headline: z.string(),
  subheadline: z.string(),
  painPoints: z.array(z.string()).min(3),
  benefits: z.array(z.string()).min(3),
  offer: z.string(),
  callToAction: z.string(),
  faq: z.array(
    z.object({
      question: z.string(),
      answer: z.string(),
    }),
  ),
});

export type SalesCopy = z.infer<typeof salesCopySchema>;

type SalesPromptInput = {
  productName: string;
  originalDescription: string;
  targetMarket: string;
};

const google = createGoogleGenerativeAI({
  // Force stable Generative Language API instead of v1beta.
  // baseURL: "https://generativelanguage.googleapis.com/v1",
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
});

function stripMarkdownBold(text: string): string {
  return text.replace(/\*\*(.*?)\*\*/g, "$1");
}

export async function generateSalesCopy(input: SalesPromptInput): Promise<SalesCopy> {
  if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
    throw new Error("GOOGLE_GENERATIVE_AI_API_KEY is missing.");
  }

  const { text } = await generateText({
    model: google("gemini-2.5-flash"),
    prompt: `
Create persuasive sales copy for the following product.

Product Name: ${input.productName}
Original Description: ${input.originalDescription}
Target Market: ${input.targetMarket}

Return ONLY valid JSON as a single object (no markdown, no code fences, no extra text).
IMPORTANT: Do NOT use markdown formatting like **bold** or *italic* in any values. Return plain text only.

Use this exact shape:
{
  "headline": "string",
  "subheadline": "string",
  "painPoints": ["string", "string", "string"],
  "benefits": ["string", "string", "string"],
  "offer": "string",
  "callToAction": "string",
  "faq": [
    { "question": "string", "answer": "string" },
    { "question": "string", "answer": "string" }
  ]
}
`,
  });

  const normalized = text.trim().replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/```$/, "").trim();

  const parsed = JSON.parse(normalized) as unknown;
  const validated = salesCopySchema.parse(parsed);

  return {
    ...validated,
    headline: stripMarkdownBold(validated.headline),
    subheadline: stripMarkdownBold(validated.subheadline),
    painPoints: validated.painPoints.map(stripMarkdownBold),
    benefits: validated.benefits.map(stripMarkdownBold),
    offer: stripMarkdownBold(validated.offer),
    callToAction: stripMarkdownBold(validated.callToAction),
    faq: validated.faq.map((f) => ({
      question: stripMarkdownBold(f.question),
      answer: stripMarkdownBold(f.answer),
    })),
  };
}

