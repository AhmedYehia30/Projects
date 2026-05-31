import {
  Pill,
  Truck,
  Stethoscope,
  HeartPulse,
  Baby,
  Sparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface Service {
  id: number;
  title: string;
  description: string;
  icon: LucideIcon;
}

export const services: Service[] = [
  {
    id: 1,
    title: "Prescription Medicines",
    description:
      "Accurate prescription filling with expert pharmacist review and medication counseling for your safety.",
    icon: Pill,
  },
  {
    id: 2,
    title: "Home Delivery",
    description:
      "Fast and reliable medication delivery right to your doorstep. Same-day delivery available within the city.",
    icon: Truck,
  },
  {
    id: 3,
    title: "Healthcare Consultation",
    description:
      "One-on-one consultations with our certified pharmacists for medication management and health advice.",
    icon: Stethoscope,
  },
  {
    id: 4,
    title: "Medical Supplies",
    description:
      "Comprehensive range of medical equipment and supplies including monitors, braces, and mobility aids.",
    icon: HeartPulse,
  },
  {
    id: 5,
    title: "Baby Care Products",
    description:
      "Gentle, trusted baby care products from leading brands. From formula to skincare, we've got your little one covered.",
    icon: Baby,
  },
  {
    id: 6,
    title: "Personal Care & Cosmetics",
    description:
      "Premium skincare, haircare, and cosmetic products selected by our experts for quality and effectiveness.",
    icon: Sparkles,
  },
];
