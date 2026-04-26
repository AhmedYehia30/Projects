import { useState } from "react";
import { Filter, X, SlidersHorizontal, Star } from "lucide-react";
import { RestaurantCard } from "./RestaurantCard";
import { CategoryChip } from "./CategoryChip";
import { Button } from "./Button";
import { RestaurantCardSkeleton } from "./LoadingSkeleton";
import { motion, AnimatePresence } from "motion/react";

interface ExplorePageProps {
  onNavigate: (page: string, restaurantId?: string) => void;
  onLoginPrompt: () => void;
  isLoggedIn: boolean;
}

const CUISINES = ["Italian", "Japanese", "American", "Mexican", "Chinese", "Indian", "Thai", "French"];
const PRICE_LEVELS = [
  { label: "$", value: 1 },
  { label: "$$", value: 2 },
  { label: "$$$", value: 3 },
  { label: "$$$$", value: 4 },
];

const MOCK_RESTAURANTS = [
  {
    id: "1",
    name: "Bella Italia",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800",
    rating: 4.8,
    reviewCount: 324,
    cuisine: "Italian",
    priceLevel: 2,
    deliveryTime: "25-35 min",
  },
  {
    id: "2",
    name: "Tokyo Sushi Bar",
    image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800",
    rating: 4.9,
    reviewCount: 512,
    cuisine: "Japanese",
    priceLevel: 3,
    deliveryTime: "30-40 min",
  },
  {
    id: "3",
    name: "The Burger Joint",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800",
    rating: 4.7,
    reviewCount: 289,
    cuisine: "American",
    priceLevel: 1,
    deliveryTime: "15-25 min",
  },
  {
    id: "4",
    name: "Spice Garden",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800",
    rating: 4.6,
    reviewCount: 198,
    cuisine: "Indian",
    priceLevel: 2,
    deliveryTime: "35-45 min",
  },
  {
    id: "5",
    name: "La Brasserie",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
    rating: 4.7,
    reviewCount: 412,
    cuisine: "French",
    priceLevel: 3,
    deliveryTime: "40-50 min",
  },
  {
    id: "6",
    name: "Dragon Palace",
    image: "https://images.unsplash.com/photo-1526318896980-cf78c088247c?w=800",
    rating: 4.5,
    reviewCount: 267,
    cuisine: "Chinese",
    priceLevel: 2,
    deliveryTime: "25-35 min",
  },
];

export function ExplorePage({ onNavigate, onLoginPrompt, isLoggedIn }: ExplorePageProps) {
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  const [selectedPrices, setSelectedPrices] = useState<number[]>([]);
  const [minRating, setMinRating] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const toggleCuisine = (cuisine: string) => {
    setSelectedCuisines((prev) =>
      prev.includes(cuisine) ? prev.filter((c) => c !== cuisine) : [...prev, cuisine]
    );
  };

  const togglePrice = (price: number) => {
    setSelectedPrices((prev) =>
      prev.includes(price) ? prev.filter((p) => p !== price) : [...prev, price]
    );
  };

  const clearFilters = () => {
    setSelectedCuisines([]);
    setSelectedPrices([]);
    setMinRating(0);
  };

  const handleSave = (id: string) => {
    if (!isLoggedIn) {
      onLoginPrompt();
    }
  };

  const FilterSidebar = () => (
    <div className="space-y-8">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3>Filters</h3>
          <button onClick={clearFilters} className="text-sm text-[var(--primary)] hover:underline">
            Clear all
          </button>
        </div>
      </div>

      <div>
        <h4 className="mb-4">Cuisine Type</h4>
        <div className="space-y-2">
          {CUISINES.map((cuisine) => (
            <label key={cuisine} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedCuisines.includes(cuisine)}
                onChange={() => toggleCuisine(cuisine)}
                className="w-5 h-5 rounded border-2 border-gray-300 text-[var(--primary)] focus:ring-[var(--primary)] cursor-pointer"
              />
              <span className="group-hover:text-[var(--primary)] transition-colors">{cuisine}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h4 className="mb-4">Price Range</h4>
        <div className="flex gap-2">
          {PRICE_LEVELS.map((price) => (
            <button
              key={price.value}
              onClick={() => togglePrice(price.value)}
              className={`flex-1 py-2 rounded-lg border-2 transition-all ${
                selectedPrices.includes(price.value)
                  ? "border-[var(--primary)] bg-[var(--primary)]/10 text-[var(--primary)]"
                  : "border-gray-200 hover:border-[var(--primary)]"
              }`}
            >
              {price.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="mb-4">Minimum Rating</h4>
        <div className="space-y-2">
          {[4.5, 4.0, 3.5, 3.0].map((rating) => (
            <button
              key={rating}
              onClick={() => setMinRating(rating)}
              className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all ${
                minRating === rating
                  ? "border-[var(--primary)] bg-[var(--primary)]/10"
                  : "border-gray-200 hover:border-[var(--primary)]"
              }`}
            >
              <Star className="w-4 h-4 fill-[var(--secondary)] text-[var(--secondary)]" />
              <span>{rating}+ stars</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[var(--background)] pt-20">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Mobile Filter Button */}
        <div className="lg:hidden mb-6">
          <Button
            variant="outline"
            onClick={() => setShowMobileFilters(true)}
            fullWidth
          >
            <SlidersHorizontal className="w-5 h-5 mr-2" />
            Filters
          </Button>
        </div>

        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-80 flex-shrink-0">
            <div className="sticky top-24 bg-white rounded-[var(--radius-card)] p-6 shadow-md">
              <FilterSidebar />
            </div>
          </aside>

          {/* Mobile Filters */}
          <AnimatePresence>
            {showMobileFilters && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setShowMobileFilters(false)}
                  className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 lg:hidden"
                />
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "-100%" }}
                  transition={{ type: "spring", damping: 25 }}
                  className="fixed left-0 top-0 bottom-0 w-80 bg-white z-50 p-6 overflow-y-auto lg:hidden"
                >
                  <button
                    onClick={() => setShowMobileFilters(false)}
                    className="absolute top-4 right-4 w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <FilterSidebar />
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Restaurant Grid */}
          <main className="flex-1">
            <div className="mb-6">
              <h2 className="mb-2">Explore Restaurants</h2>
              <p className="text-[var(--muted)]">
                {MOCK_RESTAURANTS.length} restaurants found
              </p>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <RestaurantCardSkeleton key={i} />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {MOCK_RESTAURANTS.map((restaurant) => (
                  <RestaurantCard
                    key={restaurant.id}
                    {...restaurant}
                    onClick={() => onNavigate("restaurant", restaurant.id)}
                    onSave={handleSave}
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
