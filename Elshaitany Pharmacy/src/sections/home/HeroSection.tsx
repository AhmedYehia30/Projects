import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import Button from "@/components/ui/CustomButton";

export default function HeroSection() {
  return (
    <section className="relative min-h-[100dvh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={`${import.meta.env.BASE_URL}images/hero-bg.jpg`}
          alt="Pharmacy interior"
          className="w-full h-full object-cover"
          loading="eager"
        />
      </div>

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(135deg, rgba(15, 23, 42, 0.88) 0%, rgba(15, 23, 42, 0.55) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-[2] container-main w-full pt-40 pb-24 lg:pt-44 lg:pb-32">
        <div className="max-w-[640px]">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
            className="font-heading font-medium text-4xl md:text-5xl lg:text-[56px] lg:leading-[64px] text-white mb-6"
          >
            Your Trusted{" "}
            <span className="relative inline-block">
              Healthcare
              <span className="absolute bottom-1 left-0 right-0 h-0.5 bg-[#D4A853]" />
            </span>{" "}
            Partner
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.35 }}
            className="text-lg text-white/80 leading-8 mb-10 max-w-[560px]"
          >
            Providing reliable medications, healthcare products, and
            professional pharmaceutical services for your family. We combine
            modern expertise with compassionate care.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <NavLink to="/store">
              <Button variant="white">Explore Services</Button>
            </NavLink>
            <NavLink to="/contact">
              <Button
                variant="white"
                className="!bg-transparent !text-white border border-white hover:!bg-white/15"
              >
                Contact Us
              </Button>
            </NavLink>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
