import { motion } from "motion/react";

export function RestaurantCardSkeleton() {
  return (
    <div className="bg-[var(--card)] rounded-[var(--radius-card)] overflow-hidden animate-pulse">
      <div className="h-48 bg-gray-200" />
      <div className="p-4 space-y-3">
        <div className="h-6 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />
        <div className="flex justify-between">
          <div className="h-4 bg-gray-200 rounded w-1/4" />
          <div className="h-4 bg-gray-200 rounded w-1/4" />
        </div>
      </div>
    </div>
  );
}

export function LoadingSpinner() {
  return (
    <motion.div
      className="w-12 h-12 border-4 border-[var(--primary)]/20 border-t-[var(--primary)] rounded-full"
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    />
  );
}
