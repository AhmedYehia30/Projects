import HeroSection from "@/sections/home/HeroSection";
import AboutSection from "@/sections/home/AboutSection";
import ServicesSection from "@/sections/home/ServicesSection";
import WhyChooseUsSection from "@/sections/home/WhyChooseUsSection";
import FeaturedProductsSection from "@/sections/home/FeaturedProductsSection";
import TestimonialsSection from "@/sections/home/TestimonialsSection";
import StatisticsSection from "@/sections/home/StatisticsSection";
import CTASection from "@/sections/home/CTASection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <WhyChooseUsSection />
      <FeaturedProductsSection />
      <TestimonialsSection />
      <StatisticsSection />
      <CTASection />
    </>
  );
}
