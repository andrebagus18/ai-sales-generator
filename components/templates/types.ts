export type PublicAIContent = {
  headline?: string;
  subheadline?: string;
  painPoints?: string[];
  benefits?: string[];
  offer?: string;
  callToAction?: string;
  faq?: Array<{ question: string; answer: string }>;
};

export type TemplateProps = {
  productName: string;
  targetMarket: string;
  aiContent: PublicAIContent;
};
