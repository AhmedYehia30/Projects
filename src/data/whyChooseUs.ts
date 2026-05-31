import {
  Award,
  Clock,
  Zap,
  ShieldCheck,
  Smile,
  MessageCircle,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface WhyFeature {
  id: number;
  title: string;
  description: string;
  icon: LucideIcon;
}

export const whyFeatures: WhyFeature[] = [
  {
    id: 1,
    title: "Certified Pharmacists",
    description: "Our team consists of fully licensed and experienced pharmacists.",
    icon: Award,
  },
  {
    id: 2,
    title: "24/7 Support",
    description: "Round-the-clock availability for emergencies and urgent needs.",
    icon: Clock,
  },
  {
    id: 3,
    title: "Fast Delivery",
    description: "Quick and reliable delivery service to your location.",
    icon: Zap,
  },
  {
    id: 4,
    title: "Trusted Products",
    description: "All products sourced from certified and reputable manufacturers.",
    icon: ShieldCheck,
  },
  {
    id: 5,
    title: "Customer Satisfaction",
    description: "Dedicated to exceeding customer expectations every single day.",
    icon: Smile,
  },
  {
    id: 6,
    title: "Professional Advice",
    description: "Expert health advice and medication counseling available.",
    icon: MessageCircle,
  },
];
