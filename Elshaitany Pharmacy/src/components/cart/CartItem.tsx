import { Minus, Plus, X } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import type { CartItem as CartItemType } from "@/contexts/CartContext";

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart();

  return (
    <div className="flex gap-4 py-4 border-b border-[#E2E8F0]">
      <div className="w-16 h-16 rounded-lg bg-[#F1F5F9] flex items-center justify-center shrink-0 overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h4 className="text-sm font-medium text-[#0F172A] truncate">{item.name}</h4>
          <button
            onClick={() => removeItem(item.id)}
            className="p-1 rounded hover:bg-[#F1F5F9] transition-colors shrink-0"
          >
            <X size={14} className="text-[#94A3B8]" />
          </button>
        </div>
        <p className="text-sm font-semibold text-[#00A99D] mt-1">{item.price} EGP</p>
        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={() => updateQuantity(item.id, -1)}
            className="w-7 h-7 rounded-md border border-[#E2E8F0] flex items-center justify-center hover:bg-[#F1F5F9] transition-colors"
          >
            <Minus size={14} />
          </button>
          <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
          <button
            onClick={() => updateQuantity(item.id, 1)}
            className="w-7 h-7 rounded-md border border-[#E2E8F0] flex items-center justify-center hover:bg-[#F1F5F9] transition-colors"
          >
            <Plus size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
