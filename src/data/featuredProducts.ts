export interface FeaturedProduct {
  id: number;
  name: string;
  image: string;
  categorySlug: string;
}

export const featuredProducts: FeaturedProduct[] = [
  {
    id: 1,
    name: "Vitamins",
    image: `${import.meta.env.BASE_URL}images/products/vitamins.jpg`,
    categorySlug: "Vitamins",
  },
  {
    id: 2,
    name: "Skincare",
    image: `${import.meta.env.BASE_URL}images/products/skincare.jpg`,
    categorySlug: "Skincare",
  },
  {
    id: 3,
    name: "Baby Care",
    image: `${import.meta.env.BASE_URL}images/products/babycare.jpg`,
    categorySlug: "Baby Care",
  },
  {
    id: 4,
    name: "Medical Devices",
    image: `${import.meta.env.BASE_URL}images/products/medical-devices.jpg`,
    categorySlug: "Medical Devices",
  },
  {
    id: 5,
    name: "Supplements",
    image: `${import.meta.env.BASE_URL}images/products/supplements.jpg`,
    categorySlug: "Supplements",
  },
  {
    id: 6,
    name: "Daily Essentials",
    image: `${import.meta.env.BASE_URL}images/products/daily-essentials.jpg`,
    categorySlug: "Medicines",
  },
];
