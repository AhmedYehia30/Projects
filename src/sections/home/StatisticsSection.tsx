import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import CountUp from "react-countup";

interface Stat {
  value: number;
  suffix: string;
  label: string;
  isPercentage?: boolean;
  prefix?: string;
}

const stats: Stat[] = [
  { value: 10000, suffix: "+", label: "Happy Customers" },
  { value: 500, suffix: "+", label: "Quality Products" },
  { value: 24, suffix: "/7", label: "Available Service" },
  { value: 99, suffix: "%", label: "Satisfaction Rate", isPercentage: true },
];

export default function StatisticsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <section className="bg-[#0F172A] py-20 lg:py-[80px]">
      <div className="container-main">
        <div
          ref={ref}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.4, 0, 0.2, 1],
              }}
              className="text-center"
            >
              <div className="font-heading font-semibold text-4xl lg:text-[48px] lg:leading-[56px] text-[#D4A853]">
                {isInView ? (
                  <>
                    {stat.prefix}
                    <CountUp
                      end={stat.value}
                      duration={2}
                      separator=","
                      delay={0.3}
                    />
                    {stat.suffix}
                  </>
                ) : (
                  <span>0{stat.suffix}</span>
                )}
              </div>
              <p className="mt-2 text-sm uppercase tracking-[1px] text-white/70">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
