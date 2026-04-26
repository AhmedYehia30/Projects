import { motion } from "motion/react";
import { Heart, Star, Clock, DollarSign } from "lucide-react";
import { useState } from "react";

interface RestaurantCardProps {
  id: string;
  name: string;
  image: string;
  rating: number;
  reviewCount: number;
  cuisine: string;
  priceLevel: number;
  deliveryTime: string;
  isSaved?: boolean;
  onSave?: (id: string) => void;
  onClick?: () => void;
}

export function RestaurantCard({
  id,
  name,
  image,
  rating,
  reviewCount,
  cuisine,
  priceLevel,
  deliveryTime,
  isSaved = false,
  onSave,
  onClick,
}: RestaurantCardProps) {
  const [saved, setSaved] = useState(isSaved);

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSaved(!saved);
    onSave?.(id);
  };

  return (
    <motion.div
      onClick={onClick}
      className="group relative bg-[var(--card)] rounded-[var(--radius-card)] overflow-hidden cursor-pointer"
      style={{ boxShadow: "var(--shadow-md)" }}
      whileHover={{
        scale: 1.03,
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
      }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <motion.button
          onClick={handleSave}
          className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Heart
            className={`w-5 h-5 ${
              saved ? "fill-[var(--primary)] text-[var(--primary)]" : "text-gray-600"
            }`}
          />
        </motion.button>
      </div>

      <div className="p-4">
        <h3 className="mb-2 truncate">{name}</h3>

        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1 bg-[var(--secondary)]/10 px-2 py-1 rounded-lg">
            <Star className="w-4 h-4 fill-[var(--secondary)] text-[var(--secondary)]" />
            <span className="text-sm font-medium">{rating}</span>
          </div>
          <span className="text-sm text-[var(--muted)]">({reviewCount})</span>
          <span className="text-sm text-[var(--muted)]">• {cuisine}</span>
        </div>

        <div className="flex items-center justify-between text-sm text-[var(--muted)]">
          <div className="flex items-center gap-1">
            <DollarSign className="w-4 h-4" />
            <span>{"$".repeat(priceLevel)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{deliveryTime}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
