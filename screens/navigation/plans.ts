// plans.ts

export type Plan = {
  appleProductId: string | null;
  priceId: string;
  name: string;
  description: string[];
  price: string;
  tokenAmount: number;
};

export const plans: Plan[] = [
  {
    appleProductId: 'monthlyindividualplan',
    priceId: 'price_1QV06ZGdKKRrbuMHkMzYMTp1',
    name: 'Individual',
    description: [
      '• Monthly subscription',
      '• Unlimited patients',
      '• 20 couro analysis per month',
    ],
    price: '$29.99 USD',
    tokenAmount: 20,
  },
  {
    appleProductId: null,
    priceId: 'price_1QV06YGdKKRrbuMHo0qkza2j',
    name: 'Enterprise 100',
    description: [
      '• Monthly subscription',
      '• Unlimited patients',
      '• 100 couro analysis per month',
    ],
    price: '$154.99 USD',
    tokenAmount: 100,
  },
  {
    appleProductId: null,
    priceId: 'price_1QV06WGdKKRrbuMHZodNuq1b',
    name: 'Enterprise 300',
    description: [
      '• Monthly subscription',
      '• Unlimited patients',
      '• 300 couro analysis per month',
    ],
    price: '$469.99 USD',
    tokenAmount: 300,
  },
  {
    appleProductId: null,
    priceId: 'price_1QV06VGdKKRrbuMHcNOeGNOn',
    name: 'Enterprise 1000',
    description: [
      '• Monthly subscription',
      '• Unlimited patients',
      '• 1000 couro analysis per month',
    ],
    price: '$1559.99 USD',
    tokenAmount: 1000,
  },
  // ... otros planes
];
