import { Star } from "lucide-react";

interface StarRatingProps {
  rating?: number;
  size?: number;
}

export default function StarRating({ rating = 5, size = 16 }: StarRatingProps) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={size}
          className={i < rating ? "text-[#D4A853] fill-[#D4A853]" : "text-[#E2E8F0]"}
        />
      ))}
    </div>
  );
}
