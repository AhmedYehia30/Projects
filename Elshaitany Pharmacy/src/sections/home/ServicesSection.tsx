import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import SectionLabel from "@/components/ui/SectionLabel";
import Card from "@/components/ui/CustomCard";
import { services } from "@/data/services";

export default function ServicesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-15% 0px" });

  return (
    <section className="bg-white section-padding">
      <div className="container-main">
        {/* Section Header */}
        <div className="text-center mb-16">
          <SectionLabel text="Our Services" centered />
          <h2 className="font-heading font-medium text-3xl lg:text-[40px] lg:leading-[48px] text-[#0F172A] mb-4">
            Comprehensive Healthcare Services
          </h2>
          <p className="text-base text-[#64748B] leading-7 max-w-[640px] mx-auto">
            We offer a wide range of pharmaceutical and healthcare services to
            meet all your family&apos;s health needs under one roof.
          </p>
        </div>

        {/* Services Grid */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.4, 0, 0.2, 1],
              }}
            >
              <Card variant="glass" className="p-10 text-center h-full">
                <div className="w-[72px] h-[72px] rounded-2xl bg-[#00A99D]/10 flex items-center justify-center mx-auto mb-6">
                  <service.icon size={32} className="text-[#00A99D]" />
                </div>
                <h5 className="font-heading font-semibold text-lg text-[#00A99D] mb-3">
                  {service.title}
                </h5>
                <p className="text-sm text-[#94A3B8] leading-[22px]">
                  {service.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
