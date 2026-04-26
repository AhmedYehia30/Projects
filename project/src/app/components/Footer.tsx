import { Search, Heart, Instagram, Twitter, Facebook, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white border-t border-[var(--border)] mt-24">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-[var(--primary)] to-orange-600 rounded-xl flex items-center justify-center">
                <Search className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">FoodFinder</span>
            </div>
            <p className="text-[var(--muted)] text-sm">
              Discover and explore the best restaurants near you, all in one place.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-sm">Company</h4>
            <ul className="space-y-2 text-sm text-[var(--muted)]">
              <li>
                <a href="#" className="hover:text-[var(--primary)] transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[var(--primary)] transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[var(--primary)] transition-colors">
                  Press
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[var(--primary)] transition-colors">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm">Support</h4>
            <ul className="space-y-2 text-sm text-[var(--muted)]">
              <li>
                <a href="#" className="hover:text-[var(--primary)] transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[var(--primary)] transition-colors">
                  Safety Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[var(--primary)] transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[var(--primary)] transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm">Connect</h4>
            <div className="flex gap-3 mb-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-[var(--primary)] hover:text-white flex items-center justify-center transition-all"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-[var(--primary)] hover:text-white flex items-center justify-center transition-all"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-[var(--primary)] hover:text-white flex items-center justify-center transition-all"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
            <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
              <Mail className="w-4 h-4" />
              <span>hello@foodfinder.com</span>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-[var(--border)] text-center text-sm text-[var(--muted)]">
          <p>&copy; 2026 FoodFinder. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
