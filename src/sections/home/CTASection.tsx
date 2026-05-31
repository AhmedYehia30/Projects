import { NavLink } from "react-router-dom";
import ScrollReveal from "@/components/animation/ScrollReveal";
import Button from "@/components/ui/CustomButton";

export default function CTASection() {
  return (
    <section className="bg-[#00A99D] py-24 lg:py-[100px]">
      <div className="container-main">
        <div className="max-w-[720px] mx-auto text-center">
          <ScrollReveal>
            <h2 className="font-heading font-medium text-3xl lg:text-[40px] lg:leading-[48px] text-white mb-5">
              Your Health Comes First
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <p className="text-lg text-white/85 leading-8 mb-10">
              Visit us today or browse our online store for all your healthcare
              needs. Our team is ready to serve you with professional care and
              expertise.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <NavLink to="/store">
              <Button variant="white" className="px-10">
                Visit Our Store
              </Button>
            </NavLink>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
