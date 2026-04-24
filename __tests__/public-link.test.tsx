import { render, screen } from "@testing-library/react";
import { PublicSalesPageView } from "@/app/p/[id]/page";

describe("Public Link Access", () => {
  test("public sales page view renders correctly", () => {
    render(
      <PublicSalesPageView
        productName="My Product"
        targetMarket="Creators"
        aiContent={{
          headline: "Grow your sales",
          subheadline: "Built for creators who need conversion copy fast.",
          benefits: ["Fast generation", "SEO friendly", "Shareable pages"],
          callToAction: "Start now",
        }}
      />,
    );

    expect(screen.getByText("Grow your sales")).toBeInTheDocument();
    expect(screen.getAllByText("Start now")).toHaveLength(2);
    expect(screen.getByText("Built for Creators")).toBeInTheDocument();
  });
});

