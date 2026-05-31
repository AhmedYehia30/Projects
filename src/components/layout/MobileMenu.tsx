import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { NavLink } from "react-router-dom";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/store", label: "Store" },
  { to: "/careers", label: "Careers" },
  { to: "/contact", label: "Contact" },
];

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/40 z-[998]"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="fixed top-0 right-0 w-[280px] h-full bg-white z-[999] shadow-xl"
          >
            <div className="flex items-center justify-between p-6 border-b border-[#E2E8F0]">
              <span className="font-heading font-semibold text-lg text-[#0F172A]">
                Menu
              </span>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-[#F1F5F9] transition-colors"
              >
                <X size={24} className="text-[#0F172A]" />
              </button>
            </div>
            <nav className="flex flex-col py-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={onClose}
                  className={({ isActive }) => `
                    px-6 py-4 text-base font-medium
                    transition-colors duration-200
                    ${isActive ? "text-[#D4A853]" : "text-[#00A99D] hover:text-[#D4A853]"}
                  `}
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>
            <div className="absolute bottom-8 left-0 right-0 px-6">
              <NavLink
                to="/contact"
                onClick={onClose}
                className="block w-full py-3 text-center bg-[#00A99D] text-white rounded-md font-semibold text-sm uppercase tracking-wide hover:bg-[#008B7F] transition-colors"
              >
                Contact Us
              </NavLink>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
