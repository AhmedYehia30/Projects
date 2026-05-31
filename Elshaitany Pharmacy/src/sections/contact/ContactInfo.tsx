import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const contactCards = [
  {
    icon: Phone,
    title: "Phone",
    detail: "+20 115 486 4514",
  },
  {
    icon: Mail,
    title: "Email",
    detail: "assemadham123@gmail.com",
  },
  {
    icon: MapPin,
    title: "Location",
    detail: "6C, Takseem Asmaa Fahmy Division, Ard El Golf Heliopolis, Cairo, Egypt",
  },
  {
    icon: Clock,
    title: "Working Hours",
    detail: "Open 24/7 — We're always here for you",
  },
];

export default function ContactInfo() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-15% 0px" });

  return (
    <section className="bg-white py-20 pb-16">
      <div className="container-main">
        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.4, 0, 0.2, 1],
              }}
              className="bg-[#F1F5F9] rounded-xl p-8 text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-[#00A99D]/10 flex items-center justify-center mx-auto mb-5">
                <card.icon size={28} className="text-[#00A99D]" />
              </div>
              <h3 className="font-heading font-semibold text-lg text-[#0F172A] mb-2">
                {card.title}
              </h3>
              <p className="text-sm text-[#64748B] leading-[22px]">{card.detail}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
