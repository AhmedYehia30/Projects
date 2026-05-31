export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
}

export const categories = [
  "All",
  "Medicines",
  "Vitamins",
  "Skincare",
  "Baby Care",
  "Supplements",
  "Medical Devices",
] as const;

export type Category = (typeof categories)[number];

export const products: Product[] = [
  {
    id: 1,
    name: "Panadol Extra",
    price: 45,
    category: "Medicines",
    description:
      "Fast-acting pain relief tablets for headaches, migraines, fever, and minor aches. Trusted by millions for effective relief.",
    image: `${import.meta.env.BASE_URL}images/products/medicine-panadol.jpg`,
  },
  {
    id: 2,
    name: "Amoxicillin 500mg",
    price: 85,
    category: "Medicines",
    description:
      "Broad-spectrum antibiotic capsules for bacterial infections. Prescription required. 16 capsules per pack.",
    image: `${import.meta.env.BASE_URL}images/products/medicine-amoxicillin.jpg`,
  },
  {
    id: 3,
    name: "Cetirizine 10mg",
    price: 32,
    category: "Medicines",
    description:
      "Non-drowsy antihistamine tablets for allergy relief. Effective against hay fever, dust allergies, and skin reactions.",
    image: `${import.meta.env.BASE_URL}images/products/medicine-cetirizine.jpg`,
  },
  {
    id: 4,
    name: "Vitamin C 1000mg",
    price: 120,
    category: "Vitamins",
    description:
      "High-strength immune support with 1000mg of Vitamin C per tablet. 100 tablets for daily wellness.",
    image: `${import.meta.env.BASE_URL}images/products/vitamins-c.jpg`,
  },
  {
    id: 5,
    name: "Vitamin D3 5000IU",
    price: 95,
    category: "Vitamins",
    description:
      "Essential Vitamin D3 for bone health and immune function. 60 softgels, easy to swallow.",
    image: `${import.meta.env.BASE_URL}images/products/vitamins-d3.jpg`,
  },
  {
    id: 6,
    name: "Multivitamin Complex",
    price: 150,
    category: "Vitamins",
    description:
      "Complete daily multivitamin with essential vitamins and minerals. 90 tablets for comprehensive nutrition.",
    image: `${import.meta.env.BASE_URL}images/products/vitamins-multi.jpg`,
  },
  {
    id: 7,
    name: "La Roche-Posay Cleanser",
    price: 280,
    category: "Skincare",
    description:
      "Gentle facial cleanser formulated for sensitive skin. Removes impurities without irritation. 200ml.",
    image: `${import.meta.env.BASE_URL}images/products/skincare-cleanser.jpg`,
  },
  {
    id: 8,
    name: "CeraVe Moisturizing Cream",
    price: 195,
    category: "Skincare",
    description:
      "Rich hydrating cream with ceramides and hyaluronic acid for dry to very dry skin. 454g jar.",
    image: `${import.meta.env.BASE_URL}images/products/skincare-cerave.jpg`,
  },
  {
    id: 9,
    name: "Sunscreen SPF 50",
    price: 165,
    category: "Skincare",
    description:
      "Broad spectrum UVA/UVB protection with lightweight, non-greasy formula. Water-resistant for 80 minutes.",
    image: `${import.meta.env.BASE_URL}images/products/skincare-sunscreen.jpg`,
  },
  {
    id: 10,
    name: "Johnson's Baby Shampoo",
    price: 75,
    category: "Baby Care",
    description:
      "Gentle no-tears formula baby shampoo. Hypoallergenic and pediatrician-tested. 500ml.",
    image: `${import.meta.env.BASE_URL}images/products/baby-shampoo.jpg`,
  },
  {
    id: 11,
    name: "Pampers Size 3 (64ct)",
    price: 320,
    category: "Baby Care",
    description:
      "Premium diapers with comfort fit and 12-hour leak protection. Soft, breathable material for happy babies.",
    image: `${import.meta.env.BASE_URL}images/products/baby-pampers.jpg`,
  },
  {
    id: 12,
    name: "Baby Formula Stage 1",
    price: 285,
    category: "Baby Care",
    description:
      "Infant milk formula for ages 0-6 months. Nutritionally complete with essential vitamins and minerals. 900g.",
    image: `${import.meta.env.BASE_URL}images/products/baby-formula.jpg`,
  },
  {
    id: 13,
    name: "Omega-3 Fish Oil",
    price: 210,
    category: "Supplements",
    description:
      "High-potency Omega-3 fatty acids for heart and brain health. 120 capsules, molecularly distilled for purity.",
    image: `${import.meta.env.BASE_URL}images/products/supplements-omega3.jpg`,
  },
  {
    id: 14,
    name: "Whey Protein Powder",
    price: 450,
    category: "Supplements",
    description:
      "Premium chocolate flavor whey protein isolate. 24g protein per serving, 2lb container.",
    image: `${import.meta.env.BASE_URL}images/products/supplements-protein.jpg`,
  },
  {
    id: 15,
    name: "Probiotics 10 Billion",
    price: 175,
    category: "Supplements",
    description:
      "Daily probiotic supplement with 10 billion CFU for digestive health and immune support. 30 capsules.",
    image: `${import.meta.env.BASE_URL}images/products/supplements-probiotics.jpg`,
  },
  {
    id: 16,
    name: "Digital Blood Pressure Monitor",
    price: 650,
    category: "Medical Devices",
    description:
      "Automatic upper arm blood pressure monitor with large LCD display, memory storage, and irregular heartbeat detection.",
    image: `${import.meta.env.BASE_URL}images/products/device-bp.jpg`,
  },
  {
    id: 17,
    name: "Digital Thermometer",
    price: 95,
    category: "Medical Devices",
    description:
      "Fast 10-second oral thermometer with fever alarm and last-reading memory. Accurate to ±0.1°C.",
    image: `${import.meta.env.BASE_URL}images/products/device-thermometer.jpg`,
  },
  {
    id: 18,
    name: "Blood Glucose Monitor Kit",
    price: 320,
    category: "Medical Devices",
    description:
      "Complete glucose monitoring kit with lancing device, 50 test strips, and carrying case. Results in 5 seconds.",
    image: `${import.meta.env.BASE_URL}images/products/device-glucose.jpg`,
  },
];
