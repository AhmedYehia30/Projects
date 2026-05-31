import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import ScrollReveal from "@/components/animation/ScrollReveal";

const socialLinks = [
  { icon: Facebook, label: "Facebook" },
  { icon: Twitter, label: "Twitter" },
  { icon: Instagram, label: "Instagram" },
  { icon: Linkedin, label: "LinkedIn" },
];

export default function SocialConnect() {
  return (
    <section className="bg-white py-16 pb-20">
      <div className="container-main max-w-[600px] text-center">
        <ScrollReveal>
          <h3 className="font-heading font-medium text-2xl text-[#0F172A] mb-3">
            Connect With Us
          </h3>
          <p className="text-base text-[#64748B] mb-8">
            Follow us on social media for health tips, product updates, and
            special offers.
          </p>
          <div className="flex items-center justify-center gap-6">
            {socialLinks.map((social) => (
              <button
                key={social.label}
                aria-label={social.label}
                className="w-11 h-11 rounded-full bg-[#F1F5F9] flex items-center justify-center text-[#00A99D] hover:bg-[#00A99D] hover:text-white transition-all duration-300"
              >
                <social.icon size={20} />
              </button>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
