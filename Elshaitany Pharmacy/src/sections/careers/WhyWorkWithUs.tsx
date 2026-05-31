import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Heart, GraduationCap, Users, Wallet } from "lucide-react";

const benefits = [
  {
    icon: Heart,
    title: "Meaningful Work",
    description: "Make a real difference in people's health and well-being every day.",
  },
  {
    icon: GraduationCap,
    title: "Growth & Development",
    description: "Continuous learning opportunities and career advancement paths.",
  },
  {
    icon: Users,
    title: "Great Team Culture",
    description: "Work alongside supportive, professional colleagues in a positive environment.",
  },
  {
    icon: Wallet,
    title: "Competitive Benefits",
    description: "Attractive salary packages, health insurance, and employee discounts.",
  },
];

export default function WhyWorkWithUs() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-15% 0px" });

  return (
    <section className="bg-white py-20">
      <div className="container-main">
        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.4, 0, 0.2, 1],
              }}
              className="bg-[#F1F5F9] rounded-xl p-8 text-center"
            >
              <div className="w-14 h-14 rounded-xl bg-[#00A99D]/10 flex items-center justify-center mx-auto mb-4">
                <benefit.icon size={28} className="text-[#00A99D]" />
              </div>
              <h3 className="font-heading font-semibold text-base text-[#0F172A] mb-2">
                {benefit.title}
              </h3>
              <p className="text-sm text-[#94A3B8] leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
