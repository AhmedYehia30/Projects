import { Check } from "lucide-react";
import ScrollReveal from "@/components/animation/ScrollReveal";
import SectionLabel from "@/components/ui/SectionLabel";
import Button from "@/components/ui/CustomButton";

const features = [
  "Professional Pharmacists",
  "Quality Assured",
  "Personalized Care",
  "Modern Facilities",
];

export default function AboutSection() {
  return (
    <section className="bg-[#F8FAFB] section-padding">
      <div className="container-main">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Image */}
          <ScrollReveal direction="left">
            <div className="rounded-2xl overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.1)]">
              <img
                src={`${import.meta.env.BASE_URL}images/about-pharmacy.jpg`}
                alt="Elshaitany Pharmacy Interior"
                className="w-full aspect-[4/3] object-cover"
                loading="lazy"
              />
            </div>
          </ScrollReveal>

          {/* Right - Text */}
          <ScrollReveal direction="right" delay={0.15}>
            <div>
              <SectionLabel text="About Us" />
              <h2 className="font-heading font-medium text-3xl lg:text-[40px] lg:leading-[48px] text-[#0F172A] mb-5">
                About Elshaitany Pharmacy
              </h2>
              <p className="text-base text-[#64748B] leading-7 mb-4">
                At Elshaitany Pharmacy, we believe that quality healthcare
                should be accessible to everyone. Since our founding, we have
                been committed to providing our community with the highest
                standard of pharmaceutical care, combining medical expertise
                with genuine compassion.
              </p>
              <p className="text-base text-[#64748B] leading-7 mb-8">
                Our team of certified pharmacists and healthcare professionals
                work tirelessly to ensure that every customer receives
                personalized attention, accurate medication counseling, and the
                best possible health outcomes.
              </p>

              {/* Feature List */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-[#00A99D]/10 flex items-center justify-center shrink-0">
                      <Check size={12} className="text-[#00A99D]" />
                    </div>
                    <span className="text-[15px] font-medium text-[#0F172A]">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <Button>Learn More</Button>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
