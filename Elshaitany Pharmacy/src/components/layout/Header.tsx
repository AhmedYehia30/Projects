import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Menu, ShoppingCart, Cross } from "lucide-react";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { useCart } from "@/contexts/CartContext";
import MobileMenu from "./MobileMenu";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/store", label: "Store" },
  { to: "/careers", label: "Careers" },
  { to: "/contact", label: "Contact" },
];

export default function Header() {
  const isScrolled = useScrollPosition(50);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isCheckoutPage = location.pathname === "/checkout";
  const { itemCount, toggleCart } = useCart();

  return (
    <>
      <header
        className={`
          fixed top-0 left-0 right-0 z-[1000]
          transition-all duration-300 ease-in-out
          ${
            isScrolled
              ? "bg-white/90 backdrop-blur-[12px] shadow-[0_1px_8px_rgba(0,0,0,0.06)]"
              : isCheckoutPage
                ? "bg-[#00A99D]"
                : "bg-transparent"
          }
          `}
      >
        <div className="container-main">
          <div className="flex items-center justify-between h-[72px] md:h-[72px]">
            {/* Logo */}
            <NavLink to="/" className="flex items-center gap-2">
              <div className="flex items-center justify-center w-9 h-9 bg-[#00A99D] rounded-lg">
                <Cross className="w-5 h-5 text-white" />
              </div>
              <span
                className={`font-heading font-semibold text-lg transition-colors duration-300 ${
                  isScrolled ? "text-[#0F172A]" : "text-white"
                }`}
              >
                Elshaitany Pharmacy
              </span>
            </NavLink>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) => `
                    text-sm font-medium transition-colors duration-300
                    ${isActive ? "text-[#D4A853]" : isScrolled ? "text-[#00A99D] hover:text-[#D4A853]" : "text-white/90 hover:text-white"}
                  `}
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              {/* Cart Button */}
              <button
                onClick={toggleCart}
                className={`
                  relative p-2 rounded-lg transition-colors duration-300
                  ${isScrolled ? "hover:bg-[#F1F5F9]" : "hover:bg-white/10"}
                `}
              >
                <ShoppingCart
                  size={20}
                  className={isScrolled ? "text-[#00A99D]" : "text-white"}
                />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-[18px] h-[18px] bg-[#00A99D] text-white text-[11px] font-bold rounded-full flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </button>

              {/* Desktop CTA */}
              <NavLink
                to="/contact"
                className="hidden md:inline-flex px-6 py-2.5 bg-[#00A99D] text-white text-sm font-semibold uppercase tracking-wide rounded-md hover:bg-[#008B7F] transition-colors duration-300"
              >
                Contact Us
              </NavLink>

              {/* Mobile Hamburger */}
              <button
                onClick={() => setMenuOpen(true)}
                className={`
                  md:hidden p-2 rounded-lg transition-colors duration-300
                  ${isScrolled ? "hover:bg-[#F1F5F9]" : "hover:bg-white/10"}
                `}
              >
                <Menu
                  size={24}
                  className={isScrolled ? "text-[#0F172A]" : "text-white"}
                />
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
