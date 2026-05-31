import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { products, categories, type Category } from "@/data/products";
import type { Product } from "@/data/products";
import ProductCard from "./ProductCard";
import QuickViewModal from "./QuickViewModal";

export default function ProductCatalog() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(
    null,
  );

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        activeCategory === "All" || product.category === activeCategory;
      const matchesSearch =
        searchQuery === "" ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section className="bg-[#F8FAFB] pb-24 lg:pb-[120px]">
      <div className="container-main">
        {/* Search & Filter Bar */}
        <div className="flex flex-col items-stretch gap-4 mb-12">
          {/* Search */}
          <div className="relative max-w-[400px] w-full">
            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]"
            />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg bg-[#F1F5F9] border border-[#E2E8F0] text-sm text-[#64748B] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#00A99D] transition-colors"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 mt-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`
                  px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300
                  ${
                    activeCategory === category
                      ? "bg-[#00A99D] text-white"
                      : "bg-white text-[#00A99D] border border-[#E2E8F0] hover:bg-[#F1F5F9]"
                  }
                `}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={setQuickViewProduct}
            />
          ))}
        </div>

        {/* No Results */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-lg text-[#94A3B8]">
              No products found matching your criteria.
            </p>
          </div>
        )}

        {/* Showing All */}
        {filteredProducts.length > 0 &&
          searchQuery === "" &&
          activeCategory === "All" && (
            <p className="text-center text-sm text-[#94A3B8] mt-12">
              Showing all {filteredProducts.length} products
            </p>
          )}
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </section>
  );
}
