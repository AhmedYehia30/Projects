import { useState, useRef, useEffect } from "react";
import CareersHero from "@/sections/careers/CareersHero";
import WhyWorkWithUs from "@/sections/careers/WhyWorkWithUs";
import JobListings from "@/sections/careers/JobListings";
import ApplicationForm from "@/sections/careers/ApplicationForm";

export default function CareersPage() {
  const [selectedPosition, setSelectedPosition] = useState("");
  const formRef = useRef<HTMLDivElement>(null);

  const handleApply = (position: string) => {
    setSelectedPosition(position);
    // Scroll to form after state update
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  // Reset position when component mounts
  useEffect(() => {
    setSelectedPosition("");
  }, []);

  return (
    <>
      <CareersHero />
      <WhyWorkWithUs />
      <JobListings onApply={handleApply} />
      <div ref={formRef}>
        <ApplicationForm selectedPosition={selectedPosition} />
      </div>
    </>
  );
}
