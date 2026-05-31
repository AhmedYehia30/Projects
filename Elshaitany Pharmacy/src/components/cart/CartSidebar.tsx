import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { NavLink } from "react-router-dom";
import CartItem from "./CartItem";

export default function CartSidebar() {
  const { items, isOpen, closeCart, subtotal } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/40 z-[1001]"
            onClick={closeCart}
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="fixed top-0 right-0 w-full max-w-[400px] h-full bg-white z-[1002] shadow-xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#E2E8F0]">
              <h2 className="font-heading font-medium text-xl text-[#0F172A]">
                Your Cart
              </h2>
              <button
                onClick={closeCart}
                className="p-2 rounded-lg hover:bg-[#F1F5F9] transition-colors"
              >
                <X size={24} className="text-[#0F172A]" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full py-16">
                  <ShoppingBag size={48} className="text-[#94A3B8] mb-4" />
                  <p className="text-base text-[#94A3B8] mb-6">
                    Your cart is empty
                  </p>
                  <NavLink
                    to="/store"
                    onClick={closeCart}
                    className="px-6 py-3 border border-[#00A99D] text-[#00A99D] rounded-md text-sm font-semibold uppercase tracking-wide hover:bg-[#00A99D] hover:text-white transition-colors"
                  >
                    Browse Products
                  </NavLink>
                </div>
              ) : (
                <div>
                  {items.map((item) => (
                    <CartItem key={item.id} item={item} />
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-6 py-5 border-t border-[#E2E8F0] bg-white">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-[#64748B]">Subtotal</span>
                  <span className="text-lg font-semibold text-[#0F172A]">
                    {subtotal.toLocaleString()} EGP
                  </span>
                </div>
                <NavLink
                  to="/checkout"
                  onClick={closeCart}
                  className="block w-full py-3.5 text-center bg-[#00A99D] text-white rounded-md text-sm font-semibold uppercase tracking-wide hover:bg-[#008B7F] transition-colors"
                >
                  Checkout
                </NavLink>
                <button
                  onClick={closeCart}
                  className="w-full mt-3 text-center text-sm text-[#00A99D] font-medium hover:text-[#008B7F] transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
