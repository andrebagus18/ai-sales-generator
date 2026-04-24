"use server";

import { getServerSession } from "next-auth";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { generateSalesCopy } from "@/lib/ai";
import { prisma } from "@/lib/prisma";

const briefSchema = z.object({
  productName: z.string().min(2),
  originalDescription: z.string().min(10),
  targetMarket: z.string().min(3),
});

export type BriefInput = z.infer<typeof briefSchema>;

export async function createSalesPageFromBrief(input: BriefInput) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const parsed = briefSchema.safeParse(input);
  if (!parsed.success) {
    throw new Error("Please complete all required fields before generating.");
  }
  try {
    const aiContent = await generateSalesCopy(parsed.data);

    const page = await prisma.salesPage.create({
      data: {
        productName: parsed.data.productName,
        originalDescription: parsed.data.originalDescription,
        targetMarket: parsed.data.targetMarket,
        aiContent,
        userId: Number(session.user.id),
      },
    });

    return page;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Generation failed: ${error.message}`);
    }

    throw new Error("Generation failed due to a server issue. Please retry.");
  }
}

