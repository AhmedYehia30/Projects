import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import ScrollReveal from "@/components/animation/ScrollReveal";
import SectionLabel from "@/components/ui/SectionLabel";
import { whyFeatures } from "@/data/whyChooseUs";

export default function WhyChooseUsSection() {
  const listRef = useRef<HTMLDivElement>(null);
  const listInView = useInView(listRef, { once: true, margin: "-15% 0px" });

  return (
    <section className="bg-[#F8FAFB] section-padding">
      <div className="container-main">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
          {/* Left - Features List */}
          <div>
            <ScrollReveal direction="left">
              <SectionLabel text="Why Choose Us" />
              <h2 className="font-heading font-medium text-3xl lg:text-[40px] lg:leading-[48px] text-[#0F172A] mb-10">
                Your Health is Our Priority
              </h2>
            </ScrollReveal>

            <div ref={listRef} className="space-y-0">
              {whyFeatures.map((feature, index) => (
                <motion.div
                  key={feature.id}
                  initial={{ opacity: 0, x: -30 }}
                  animate={
                    listInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }
                  }
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                  className="flex items-center gap-5 py-4"
                >
                  <div className="w-14 h-14 rounded-full bg-[#00A99D]/10 flex items-center justify-center shrink-0">
                    <feature.icon size={24} className="text-[#00A99D]" />
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold text-base text-[#0F172A]">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-[#94A3B8]">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right - Image */}
          <ScrollReveal direction="right" delay={0.2}>
            <div className="rounded-2xl overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.1)]">
              <img
                src={`${import.meta.env.BASE_URL}images/why-choose-us.jpg`}
                alt="Professional pharmacist at Elshaitany Pharmacy"
                className="w-full aspect-[4/3] object-cover"
                loading="lazy"
              />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
