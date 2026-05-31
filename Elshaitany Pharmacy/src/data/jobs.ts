export interface Job {
  id: number;
  title: string;
  location: string;
  type: string;
  department: string;
  description: string;
}

export const jobs: Job[] = [
  {
    id: 1,
    title: "Pharmacist",
    location: "Heliopolis, Cairo",
    type: "Full-time",
    department: "Pharmacy",
    description:
      "We are seeking a licensed pharmacist to join our team. You will be responsible for dispensing medications, providing patient counseling, managing inventory, and ensuring compliance with all pharmaceutical regulations.",
  },
  {
    id: 2,
    title: "Assistant Pharmacist",
    location: "Heliopolis, Cairo",
    type: "Full-time",
    department: "Pharmacy",
    description:
      "Support our licensed pharmacists in daily operations including medication preparation, inventory management, customer service, and maintaining a clean, organized work environment.",
  },
  {
    id: 3,
    title: "Customer Service Representative",
    location: "Heliopolis, Cairo",
    type: "Full-time",
    department: "Operations",
    description:
      "Be the friendly face of Elshaitany Pharmacy. Handle customer inquiries, process orders, coordinate deliveries, and ensure every customer has an exceptional experience.",
  },
  {
    id: 4,
    title: "Delivery Representative",
    location: "Cairo, Egypt",
    type: "Full-time",
    department: "Logistics",
    description:
      "Responsible for timely and safe delivery of medications and healthcare products to our customers across Cairo. Maintain delivery records and ensure customer satisfaction.",
  },
];
