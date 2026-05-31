import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import Card from "@/components/ui/CustomCard";
import StarRating from "@/components/ui/StarRating";
import { testimonials } from "@/data/testimonials";

export default function TestimonialsSection() {
  const gridRef = useRef<HTMLDivElement>(null);
  const gridInView = useInView(gridRef, { once: true, margin: "-15% 0px" });

  return (
    <section className="bg-[#F8FAFB] section-padding">
      <div className="container-main">
        {/* Section Header */}
        <div className="text-center mb-16">
          <SectionLabel text="Testimonials" centered />
          <h2 className="font-heading font-medium text-3xl lg:text-[40px] lg:leading-[48px] text-[#0F172A]">
            What Our Customers Say
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              animate={
                gridInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
              }
              transition={{
                duration: 0.5,
                delay: index * 0.15,
                ease: [0.4, 0, 0.2, 1],
              }}
            >
              <Card variant="glass" className="p-10 relative h-full">
                {/* Quote Icon */}
                <span
                  className="absolute top-6 right-8 text-[72px] leading-none font-serif text-[#D4A853]/20 select-none"
                  aria-hidden="true"
                >
                  &ldquo;
                </span>

                {/* Quote */}
                <p className="text-base text-[#64748B] leading-7 italic mb-8 relative z-[1]">
                  {testimonial.quote}
                </p>

                {/* Divider */}
                <div className="border-t border-[#E2E8F0] mb-6" />

                {/* Customer Info */}
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full overflow-hidden bg-[#F1F5F9] shrink-0">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold text-base text-[#0F172A]">
                      {testimonial.name}
                    </h4>
                    <p className="text-[13px] text-[#94A3B8]">
                      {testimonial.detail}
                    </p>
                  </div>
                </div>

                {/* Star Rating */}
                <div className="mt-3">
                  <StarRating rating={5} />
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
