import { createSalesPageFromBrief } from "@/app/actions/generate-sales-page";
import { generateSalesCopy } from "@/lib/ai";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

jest.mock("next-auth", () => ({
  getServerSession: jest.fn(),
}));

jest.mock("@/lib/ai", () => ({
  generateSalesCopy: jest.fn(),
}));

jest.mock("@/lib/prisma", () => ({
  prisma: {
    salesPage: {
      create: jest.fn(),
    },
  },
}));

describe("AI Content Generation", () => {
  test("saves generated data to database", async () => {
    (getServerSession as jest.Mock).mockResolvedValue({
      user: { id: "1" },
    });
    (generateSalesCopy as jest.Mock).mockResolvedValue({
      headline: "Test headline",
      subheadline: "Subheadline",
      painPoints: ["p1", "p2", "p3"],
      benefits: ["b1", "b2", "b3"],
      offer: "Offer",
      callToAction: "Buy now",
      faq: [{ question: "Q1", answer: "A1" }],
    });
    (prisma.salesPage.create as jest.Mock).mockResolvedValue({
      id: "test-page-id",
      productName: "My Product",
    });

    const result = await createSalesPageFromBrief({
      productName: "My Product",
      originalDescription: "A product description with sufficient length.",
      targetMarket: "Indie founders",
    });

    expect(prisma.salesPage.create).toHaveBeenCalled();
    expect(result.id).toBe("test-page-id");
  });
});

