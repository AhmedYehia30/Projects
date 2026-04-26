import { motion, useScroll, useTransform } from "motion/react";
import { Search, Heart, User, Home, Compass } from "lucide-react";
import { useState } from "react";

interface NavbarProps {
  onLoginClick: () => void;
  isLoggedIn?: boolean;
  currentPage?: string;
  onNavigate: (page: string) => void;
}

export function Navbar({ onLoginClick, isLoggedIn = false, currentPage = "home", onNavigate }: NavbarProps) {
  const { scrollY } = useScroll();
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ["rgba(250, 250, 250, 0)", "rgba(250, 250, 250, 0.95)"]
  );
  const backdropBlur = useTransform(scrollY, [0, 100], ["blur(0px)", "blur(12px)"]);

  return (
    <motion.nav
      style={{
        backgroundColor,
        backdropFilter: backdropBlur,
      }}
      className="fixed top-0 left-0 right-0 z-40 border-b border-[var(--border)] transition-all"
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => onNavigate("home")}
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-[var(--primary)] to-orange-600 rounded-xl flex items-center justify-center">
              <Search className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold">FoodFinder</span>
          </motion.div>

          <div className="hidden md:flex items-center gap-6">
            <NavLink
              icon={<Home className="w-5 h-5" />}
              label="Home"
              active={currentPage === "home"}
              onClick={() => onNavigate("home")}
            />
            <NavLink
              icon={<Compass className="w-5 h-5" />}
              label="Explore"
              active={currentPage === "explore"}
              onClick={() => onNavigate("explore")}
            />
            {isLoggedIn && (
              <>
                <NavLink
                  icon={<Heart className="w-5 h-5" />}
                  label="Saved"
                  active={currentPage === "saved"}
                  onClick={() => onNavigate("saved")}
                />
                <NavLink
                  icon={<User className="w-5 h-5" />}
                  label="Profile"
                  active={currentPage === "profile"}
                  onClick={() => onNavigate("profile")}
                />
              </>
            )}
          </div>

          <div>
            {isLoggedIn ? (
              <div className="w-10 h-10 bg-gradient-to-br from-[var(--primary)] to-orange-600 rounded-full flex items-center justify-center cursor-pointer">
                <User className="w-5 h-5 text-white" />
              </div>
            ) : (
              <motion.button
                onClick={onLoginClick}
                className="px-6 py-2 bg-[var(--primary)] text-white rounded-[var(--radius-button)]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Sign In
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}

function NavLink({
  icon,
  label,
  active,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
        active
          ? "text-[var(--primary)] bg-[var(--primary)]/10"
          : "text-[var(--foreground)] hover:bg-gray-100"
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {icon}
      <span>{label}</span>
    </motion.button>
  );
}
