import { NavLink } from "react-router-dom";
import { Cross, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const quickLinks = [
  { to: "/", label: "Home" },
  { to: "/store", label: "Store" },
  { to: "/careers", label: "Careers" },
  { to: "/contact", label: "Contact" },
];

const serviceLinks = [
  "Prescription Medicines",
  "Home Delivery",
  "Healthcare Consultation",
  "Medical Supplies",
  "Baby Care",
  "Personal Care",
];

const socialLinks = [
  { icon: Facebook, label: "Facebook" },
  { icon: Twitter, label: "Twitter" },
  { icon: Instagram, label: "Instagram" },
  { icon: Linkedin, label: "LinkedIn" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0F172A]">
      <div className="container-main pt-20 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center justify-center w-9 h-9 bg-[#00A99D] rounded-lg">
                <Cross className="w-5 h-5 text-white" />
              </div>
              <span className="font-heading font-semibold text-lg text-white">
                Elshaitany Pharmacy
              </span>
            </div>
            <p className="text-sm text-[#94A3B8] leading-relaxed">
              Your Trusted Healthcare Partner
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-medium text-white mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    className="text-sm text-[#94A3B8] hover:text-white transition-colors duration-300"
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading font-medium text-white mb-5">
              Services
            </h4>
            <ul className="space-y-3">
              {serviceLinks.map((service) => (
                <li key={service}>
                  <span className="text-sm text-[#94A3B8]">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-heading font-medium text-white mb-5">
              Contact Info
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone size={16} className="text-[#00A99D] mt-0.5 shrink-0" />
                <span className="text-sm text-[#94A3B8]">+20 115 486 4514</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={16} className="text-[#00A99D] mt-0.5 shrink-0" />
                <span className="text-sm text-[#94A3B8]">assemadham123@gmail.com</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-[#00A99D] mt-0.5 shrink-0" />
                <span className="text-sm text-[#94A3B8]">
                  6C, Takseem Asmaa Fahmy Division, Ard El Golf Heliopolis, Cairo, Egypt
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[13px] text-[#94A3B8]">
            &copy; 2026 Elshaitany Pharmacy. All Rights Reserved.
          </p>
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <button
                key={social.label}
                aria-label={social.label}
                className="text-[#94A3B8] hover:text-white transition-colors duration-300"
              >
                <social.icon size={20} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
