export interface Testimonial {
  id: number;
  name: string;
  detail: string;
  quote: string;
  avatar: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah M.",
    detail: "Regular Customer",
    quote:
      "Elshaitany Pharmacy has been our family's go-to for years. The pharmacists are incredibly knowledgeable and always take the time to explain medications thoroughly. Their delivery service is a lifesaver!",
    avatar: `${import.meta.env.BASE_URL}images/avatars/sarah.jpg`,
  },
  {
    id: 2,
    name: "Ahmed K.",
    detail: "Healthcare Professional",
    quote:
      "I switched to Elshaitany Pharmacy six months ago and I couldn't be happier. The staff is professional, the store is always well-stocked, and their consultation service helped me manage my chronic condition much better.",
    avatar: `${import.meta.env.BASE_URL}images/avatars/ahmed.jpg`,
  },
  {
    id: 3,
    name: "Lina R.",
    detail: "Mother of Two",
    quote:
      "The 24/7 support is amazing. When my child needed medication late at night, they were the only pharmacy that answered and arranged immediate delivery. Truly a trusted healthcare partner.",
    avatar: `${import.meta.env.BASE_URL}images/avatars/lina.jpg`,
  },
];
