import { useState } from "react";
import { Check } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import type { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
}

export default function ProductCard({ product, onQuickView }: ProductCardProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-[0_2px_16px_rgba(0,0,0,0.04)] overflow-hidden transition-all duration-300 hover:shadow-[0_8px_32px_rgba(0,0,0,0.1)] hover:-translate-y-1 group">
      {/* Image Area */}
      <div
        className="relative aspect-square bg-[#F1F5F9] overflow-hidden cursor-pointer"
        onClick={() => onQuickView(product)}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = "none";
            const parent = target.parentElement;
            if (parent) {
              parent.innerHTML = `<div class="w-full h-full flex items-center justify-center text-[#94A3B8] text-sm font-medium">${product.name}</div>`;
            }
          }}
        />
        {/* Quick View Overlay */}
        <div className="absolute inset-0 bg-[rgba(15,23,42,0.6)] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <span className="text-sm font-semibold text-white uppercase tracking-wide">
            Quick View
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <span className="text-[11px] font-semibold uppercase tracking-[1px] text-[#00A99D]">
          {product.category}
        </span>
        <h3 className="font-heading font-medium text-base text-[#0F172A] mt-2 mb-2">
          {product.name}
        </h3>
        <p className="font-heading font-semibold text-lg text-[#00A99D] mb-4">
          {product.price} EGP
        </p>
        <button
          onClick={handleAddToCart}
          className={`
            w-full py-2.5 rounded-md text-sm font-semibold uppercase tracking-wide
            transition-all duration-300
            ${
              added
                ? "bg-[#10B981] text-white"
                : "bg-[#00A99D] text-white hover:bg-[#008B7F]"
            }
          `}
        >
          {added ? (
            <span className="flex items-center justify-center gap-2">
              <Check size={16} /> Added
            </span>
          ) : (
            "Add to Cart"
          )}
        </button>
      </div>
    </div>
  );
}
