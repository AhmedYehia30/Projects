import { motion } from "motion/react";
import { Search, MapPin, TrendingUp } from "lucide-react";
import { Input } from "./Input";
import { Button } from "./Button";
import { CategoryChip } from "./CategoryChip";
import { RestaurantCard } from "./RestaurantCard";
import { useState } from "react";

interface HomePageProps {
  onNavigate: (page: string, restaurantId?: string) => void;
  onLoginPrompt: () => void;
  isLoggedIn: boolean;
}

const CATEGORIES = [
  { id: "pizza", label: "Pizza", icon: "🍕" },
  { id: "burger", label: "Burgers", icon: "🍔" },
  { id: "sushi", label: "Sushi", icon: "🍣" },
  { id: "italian", label: "Italian", icon: "🍝" },
  { id: "mexican", label: "Mexican", icon: "🌮" },
  { id: "chinese", label: "Chinese", icon: "🥡" },
  { id: "indian", label: "Indian", icon: "🍛" },
  { id: "thai", label: "Thai", icon: "🍜" },
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
];

export function HomePage({ onNavigate, onLoginPrompt, isLoggedIn }: HomePageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    onNavigate("explore");
  };

  const handleSave = (id: string) => {
    if (!isLoggedIn) {
      onLoginPrompt();
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, rgba(249, 115, 22, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(251, 146, 60, 0.1) 0%, transparent 50%)",
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-6 max-w-4xl mx-auto"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mb-6"
          >
            Discover Your Next
            <br />
            <span className="text-[var(--primary)]">Favorite Restaurant</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl text-[var(--muted)] mb-12"
          >
            Find the best restaurants near you, curated just for your taste
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="max-w-2xl mx-auto"
          >
            <div className="flex gap-3">
              <div className="flex-1">
                <Input
                  icon={<Search className="w-5 h-5" />}
                  placeholder="Search for restaurants, cuisines, or dishes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  className="h-14 text-lg shadow-lg"
                />
              </div>
              <Button onClick={handleSearch} size="lg">
                Search
              </Button>
            </div>
            <div className="flex items-center gap-2 mt-4 text-sm text-[var(--muted)]">
              <MapPin className="w-4 h-4" />
              <span>San Francisco, CA</span>
              <button className="text-[var(--primary)] hover:underline ml-2">
                Change location
              </button>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2>Browse by Category</h2>
            <button
              onClick={() => onNavigate("explore")}
              className="text-[var(--primary)] hover:underline"
            >
              View all
            </button>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
            {CATEGORIES.map((category) => (
              <CategoryChip
                key={category.id}
                label={category.label}
                icon={category.icon}
                active={selectedCategory === category.id}
                onClick={() => setSelectedCategory(category.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Trending Section */}
      <section className="py-16 px-6 bg-[var(--background)]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <TrendingUp className="w-8 h-8 text-[var(--primary)]" />
            <h2>Trending Near You</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {MOCK_RESTAURANTS.map((restaurant) => (
              <RestaurantCard
                key={restaurant.id}
                {...restaurant}
                onClick={() => onNavigate("restaurant", restaurant.id)}
                onSave={handleSave}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Recommendations Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="mb-8">Recommended For You</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {MOCK_RESTAURANTS.slice()
              .reverse()
              .map((restaurant) => (
                <RestaurantCard
                  key={restaurant.id}
                  {...restaurant}
                  onClick={() => onNavigate("restaurant", restaurant.id)}
                  onSave={handleSave}
                />
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}
