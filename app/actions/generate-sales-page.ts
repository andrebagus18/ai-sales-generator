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
  templateType: z.string().optional(),
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
    console.log("Creating sales page for user:", session.user.id);
    
    const aiContent = await generateSalesCopy(parsed.data);
    
    // Assign a random dummy thumbnail from public/dummy-image/
    const randomNum = Math.floor(Math.random() * 3) + 1;
    const randomThumbnail = `/dummy-image/thumb-${randomNum}.png`;

    const page = await prisma.salesPage.create({
      data: {
        productName: parsed.data.productName,
        originalDescription: parsed.data.originalDescription,
        targetMarket: parsed.data.targetMarket,
        templateType: parsed.data.templateType || "professional-clean",
        thumbnailUrl: randomThumbnail,
        aiContent,
        userId: session.user.id,
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

