import { prisma } from "@/lib/prisma";

export async function getPublishedSalesPageById(id: string) {
  return prisma.salesPage.findFirst({
    where: { id, isPublished: true },
    select: {
      id: true,
      productName: true,
      targetMarket: true,
      aiContent: true,
      createdAt: true,
    },
  });
}

export async function getOwnedSalesPageById(id: string, userId: string) {
  return prisma.salesPage.findFirst({
    where: { id, userId },
    select: {
      id: true,
      productName: true,
      targetMarket: true,
      aiContent: true,
      isPublished: true,
      createdAt: true,
    },
  });
}