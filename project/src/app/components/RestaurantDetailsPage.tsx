import { useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, Heart, Star, Clock, DollarSign, MapPin, Phone, Globe } from "lucide-react";
import { Button } from "./Button";

interface RestaurantDetailsPageProps {
  restaurantId: string;
  onNavigate: (page: string) => void;
  onLoginPrompt: () => void;
  isLoggedIn: boolean;
}

const MOCK_RESTAURANT = {
  id: "1",
  name: "Bella Italia",
  image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200",
  rating: 4.8,
  reviewCount: 324,
  cuisine: "Italian",
  priceLevel: 2,
  deliveryTime: "25-35 min",
  address: "123 Main Street, San Francisco, CA 94102",
  phone: "+1 (415) 555-0123",
  website: "www.bellaitalia.com",
  description:
    "Experience authentic Italian cuisine in the heart of San Francisco. Our family recipes have been passed down for generations, bringing you the true taste of Italy.",
  hours: "Mon-Sun: 11:00 AM - 10:00 PM",
  menu: [
    {
      id: "1",
      name: "Margherita Pizza",
      description: "Fresh mozzarella, basil, tomato sauce",
      price: 18,
      image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400",
    },
    {
      id: "2",
      name: "Carbonara Pasta",
      description: "Eggs, pecorino cheese, guanciale, black pepper",
      price: 22,
      image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400",
    },
    {
      id: "3",
      name: "Tiramisu",
      description: "Classic Italian dessert with coffee and mascarpone",
      price: 12,
      image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400",
    },
  ],
  reviews: [
    {
      id: "1",
      author: "Sarah M.",
      rating: 5,
      date: "2 days ago",
      comment: "Absolutely amazing! The pasta was cooked to perfection and the ambiance was wonderful.",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
    },
    {
      id: "2",
      author: "John D.",
      rating: 4,
      date: "1 week ago",
      comment: "Great food and service. The pizza is authentic and delicious!",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
    },
  ],
};

export function RestaurantDetailsPage({
  restaurantId,
  onNavigate,
  onLoginPrompt,
  isLoggedIn,
}: RestaurantDetailsPageProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "menu" | "reviews">("overview");
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    if (!isLoggedIn) {
      onLoginPrompt();
      return;
    }
    setIsSaved(!isSaved);
  };

  return (
    <div className="min-h-screen bg-[var(--background)] pt-16">
      {/* Hero Image */}
      <div className="relative h-[50vh] overflow-hidden">
        <img
          src={MOCK_RESTAURANT.image}
          alt={MOCK_RESTAURANT.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        <button
          onClick={() => onNavigate("explore")}
          className="absolute top-6 left-6 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>

        <motion.button
          onClick={handleSave}
          className="absolute top-6 right-6 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Heart
            className={`w-6 h-6 ${
              isSaved ? "fill-[var(--primary)] text-[var(--primary)]" : "text-gray-600"
            }`}
          />
        </motion.button>
      </div>

      {/* Floating Info Card */}
      <div className="max-w-5xl mx-auto px-6 -mt-24 relative z-10">
        <div className="bg-white rounded-[var(--radius-card)] p-8 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div className="flex-1">
              <h1 className="mb-3">{MOCK_RESTAURANT.name}</h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1 bg-[var(--secondary)]/10 px-3 py-1.5 rounded-lg">
                  <Star className="w-5 h-5 fill-[var(--secondary)] text-[var(--secondary)]" />
                  <span className="font-medium">{MOCK_RESTAURANT.rating}</span>
                  <span className="text-[var(--muted)] text-sm">
                    ({MOCK_RESTAURANT.reviewCount})
                  </span>
                </div>
                <span className="text-[var(--muted)]">• {MOCK_RESTAURANT.cuisine}</span>
                <span className="text-[var(--muted)]">
                  • {"$".repeat(MOCK_RESTAURANT.priceLevel)}
                </span>
              </div>
              <p className="text-[var(--muted)] mb-4">{MOCK_RESTAURANT.description}</p>
              <div className="flex items-center gap-1 text-[var(--muted)]">
                <Clock className="w-4 h-4" />
                <span>{MOCK_RESTAURANT.deliveryTime}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-8">
          <div className="flex gap-1 border-b border-[var(--border)] mb-8">
            {(["overview", "menu", "reviews"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 font-medium transition-colors relative ${
                  activeTab === tab
                    ? "text-[var(--primary)]"
                    : "text-[var(--muted)] hover:text-[var(--foreground)]"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                {activeTab === tab && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--primary)]"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="pb-24">
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div className="bg-white rounded-[var(--radius-card)] p-6">
                  <h3 className="mb-4">Contact Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-[var(--muted)] mt-1" />
                      <div>
                        <p className="font-medium">Address</p>
                        <p className="text-[var(--muted)]">{MOCK_RESTAURANT.address}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Phone className="w-5 h-5 text-[var(--muted)] mt-1" />
                      <div>
                        <p className="font-medium">Phone</p>
                        <p className="text-[var(--muted)]">{MOCK_RESTAURANT.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Globe className="w-5 h-5 text-[var(--muted)] mt-1" />
                      <div>
                        <p className="font-medium">Website</p>
                        <p className="text-[var(--muted)]">{MOCK_RESTAURANT.website}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-[var(--muted)] mt-1" />
                      <div>
                        <p className="font-medium">Hours</p>
                        <p className="text-[var(--muted)]">{MOCK_RESTAURANT.hours}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "menu" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {MOCK_RESTAURANT.menu.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-[var(--radius-card)] overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                  >
                    <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h4>{item.name}</h4>
                        <span className="text-[var(--primary)] font-medium">${item.price}</span>
                      </div>
                      <p className="text-[var(--muted)] text-sm">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-6">
                {MOCK_RESTAURANT.reviews.map((review) => (
                  <div key={review.id} className="bg-white rounded-[var(--radius-card)] p-6">
                    <div className="flex items-start gap-4">
                      <img
                        src={review.avatar}
                        alt={review.author}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4>{review.author}</h4>
                          <span className="text-sm text-[var(--muted)]">{review.date}</span>
                        </div>
                        <div className="flex items-center gap-1 mb-3">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-4 h-4 fill-[var(--secondary)] text-[var(--secondary)]"
                            />
                          ))}
                        </div>
                        <p className="text-[var(--muted)]">{review.comment}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sticky Mobile Action Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[var(--border)] p-4 z-30">
        <div className="flex gap-3">
          <Button variant="outline" fullWidth onClick={handleSave}>
            <Heart
              className={`w-5 h-5 mr-2 ${isSaved ? "fill-[var(--primary)]" : ""}`}
            />
            {isSaved ? "Saved" : "Save"}
          </Button>
          <Button fullWidth>Order Now</Button>
        </div>
      </div>
    </div>
  );
}
