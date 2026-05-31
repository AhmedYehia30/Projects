import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import type { Product } from "@/data/products";

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function QuickViewModal({
  product,
  onClose,
}: QuickViewModalProps) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      });
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {product && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 z-[999]"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-0 z-[1000] flex items-center justify-center p-4"
          >
            <div className="relative w-full max-w-[800px] max-h-[90vh] overflow-auto rounded-2xl bg-white shadow-2xl">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-lg hover:bg-[#F1F5F9] transition-colors z-10"
              >
                <X size={24} className="text-[#0F172A]" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-[45%_55%] gap-6 md:gap-10 p-6 md:p-10">
                {/* Image */}
                <div className="rounded-xl overflow-hidden bg-[#F1F5F9]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full aspect-square object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>

                {/* Details */}
                <div className="flex flex-col">
                  <span className="text-xs font-semibold uppercase tracking-[1px] text-[#00A99D] mb-2">
                    {product.category}
                  </span>
                  <h2 className="font-heading font-medium text-2xl text-[#0F172A] mb-2">
                    {product.name}
                  </h2>
                  <p className="font-heading font-semibold text-[28px] text-[#00A99D] mb-4">
                    {product.price} EGP
                  </p>
                  <p className="text-[15px] text-[#64748B] leading-[26px] mb-6">
                    {product.description}
                  </p>

                  {/* Quantity */}
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-sm font-medium text-[#0F172A]">
                      Quantity:
                    </span>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-9 h-9 rounded-lg border border-[#E2E8F0] flex items-center justify-center hover:bg-[#F1F5F9] transition-colors"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="text-base font-medium w-8 text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(Math.min(10, quantity + 1))}
                        className="w-9 h-9 rounded-lg border border-[#E2E8F0] flex items-center justify-center hover:bg-[#F1F5F9] transition-colors"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Add to Cart */}
                  <button
                    onClick={handleAddToCart}
                    className="self-start inline-flex items-center justify-center px-6 py-3 bg-[#00A99D] text-white rounded-md text-sm font-semibold uppercase tracking-wide hover:bg-[#008B7F] transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
