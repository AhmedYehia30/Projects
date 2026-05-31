import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, Briefcase, Tag } from "lucide-react";
import { jobs } from "@/data/jobs";

interface JobListingsProps {
  onApply: (position: string) => void;
}

export default function JobListings({ onApply }: JobListingsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-15% 0px" });

  return (
    <section className="bg-[#F8FAFB] py-20 lg:pb-[80px]">
      <div className="container-main">
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="font-heading font-medium text-3xl text-[#0F172A] mb-3">
            Open Positions
          </h2>
          <p className="text-base text-[#64748B]">
            We&apos;re always looking for talented individuals to join our growing
            team.
          </p>
        </div>

        {/* Job List */}
        <div ref={ref} className="space-y-6">
          {jobs.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.4, 0, 0.2, 1],
              }}
              className="bg-white rounded-xl border border-[#E2E8F0] shadow-[0_2px_16px_rgba(0,0,0,0.04)] p-8 border-l-4 border-l-[#00A99D]"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                <div className="flex-1">
                  <h3 className="font-heading font-semibold text-xl text-[#0F172A] mb-3">
                    {job.title}
                  </h3>
                  <div className="flex flex-wrap gap-4 mb-4">
                    <span className="flex items-center gap-1.5 text-sm text-[#94A3B8]">
                      <MapPin size={14} className="text-[#00A99D]" />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1.5 text-sm text-[#94A3B8]">
                      <Briefcase size={14} className="text-[#00A99D]" />
                      {job.type}
                    </span>
                    <span className="flex items-center gap-1.5 text-sm text-[#94A3B8]">
                      <Tag size={14} className="text-[#00A99D]" />
                      {job.department}
                    </span>
                  </div>
                  <p className="text-sm text-[#64748B] leading-6">
                    {job.description}
                  </p>
                </div>
                <button
                  onClick={() => onApply(job.title)}
                  className="shrink-0 px-6 py-2.5 bg-[#00A99D] text-white rounded-md text-sm font-semibold uppercase tracking-wide hover:bg-[#008B7F] transition-colors self-start"
                >
                  Apply Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
