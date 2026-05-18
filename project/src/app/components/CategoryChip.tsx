import { motion } from "motion/react";

interface CategoryChipProps {
  label: string;
  icon?: string;
  active?: boolean;
  onClick?: () => void;
}

export function CategoryChip({ label, icon, active = false, onClick }: CategoryChipProps) {
  return (
    <motion.button
      onClick={onClick}
      className={`px-6 py-3 rounded-full whitespace-nowrap transition-all ${
        active
          ? "bg-[var(--primary)] text-white shadow-md"
          : "bg-white text-[var(--foreground)] border border-[var(--border)] hover:border-[var(--primary)]"
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="flex items-center gap-2">
        {icon && <span>{icon}</span>}
        {label}
      </span>
    </motion.button>
  );
}
