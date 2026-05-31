import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { NavLink } from "react-router-dom";
import SectionLabel from "@/components/ui/SectionLabel";
import { featuredProducts } from "@/data/featuredProducts";

export default function FeaturedProductsSection() {
  const gridRef = useRef<HTMLDivElement>(null);
  const gridInView = useInView(gridRef, { once: true, margin: "-15% 0px" });

  return (
    <section className="bg-white section-padding">
      <div className="container-main">
        {/* Section Header */}
        <div className="text-center mb-16">
          <SectionLabel text="Featured Products" centered />
          <h2 className="font-heading font-medium text-3xl lg:text-[40px] lg:leading-[48px] text-[#0F172A] mb-4">
            Explore Our Product Range
          </h2>
          <p className="text-base text-[#64748B] leading-7 max-w-[640px] mx-auto mb-6">
            From daily essentials to specialized medical supplies, we stock
            everything you need for a healthy life.
          </p>
          <NavLink
            to="/store"
            className="inline-flex items-center gap-1 text-sm font-semibold text-[#00A99D] hover:text-[#D4A853] transition-colors duration-300"
          >
            View All Products
            <span className="text-lg">&rarr;</span>
          </NavLink>
        </div>

        {/* Products Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={
                gridInView
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0.95 }
              }
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.4, 0, 0.2, 1],
              }}
            >
              <NavLink
                to="/store"
                className="group relative block aspect-[4/3] rounded-xl overflow-hidden"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                {/* Overlay */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(15, 23, 42, 0.8) 0%, transparent 60%)",
                  }}
                />
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-heading font-medium text-xl text-white mb-2">
                    {product.name}
                  </h3>
                  <span className="text-[13px] font-semibold text-[#D4A853] uppercase tracking-wide">
                    Shop Now &rarr;
                  </span>
                </div>
              </NavLink>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
