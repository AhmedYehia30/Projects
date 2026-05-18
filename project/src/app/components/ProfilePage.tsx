import { motion } from "motion/react";
import { User, Heart, Star, MapPin, Settings, LogOut, TrendingUp } from "lucide-react";
import { Button } from "./Button";
import { RestaurantCard } from "./RestaurantCard";

interface ProfilePageProps {
  onNavigate: (page: string, restaurantId?: string) => void;
  onLogout: () => void;
}

const MOCK_USER = {
  name: "Sarah Johnson",
  email: "sarah.johnson@email.com",
  avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200",
  joinDate: "January 2024",
  stats: {
    saved: 42,
    reviews: 18,
    visited: 127,
  },
};

const MOCK_RECENT = [
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
];

const PREFERENCES = [
  { id: "italian", label: "Italian", active: true },
  { id: "japanese", label: "Japanese", active: true },
  { id: "mexican", label: "Mexican", active: false },
  { id: "indian", label: "Indian", active: true },
];

export function ProfilePage({ onNavigate, onLogout }: ProfilePageProps) {
  return (
    <div className="min-h-screen bg-[var(--background)] pt-20">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-[var(--radius-card)] p-8 mb-8 shadow-md">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <img
              src={MOCK_USER.avatar}
              alt={MOCK_USER.name}
              className="w-24 h-24 rounded-full object-cover"
            />
            <div className="flex-1">
              <h1 className="mb-1">{MOCK_USER.name}</h1>
              <p className="text-[var(--muted)] mb-4">{MOCK_USER.email}</p>
              <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
                <MapPin className="w-4 h-4" />
                <span>San Francisco, CA</span>
                <span>•</span>
                <span>Member since {MOCK_USER.joinDate}</span>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline">
                <Settings className="w-5 h-5 mr-2" />
                Settings
              </Button>
              <Button variant="outline" onClick={onLogout}>
                <LogOut className="w-5 h-5 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            className="bg-white rounded-[var(--radius-card)] p-6 shadow-md cursor-pointer"
            whileHover={{ scale: 1.02 }}
            onClick={() => onNavigate("saved")}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[var(--primary)]/10 rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-[var(--primary)]" />
              </div>
              <div>
                <p className="text-3xl font-bold">{MOCK_USER.stats.saved}</p>
                <p className="text-[var(--muted)]">Saved Places</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-white rounded-[var(--radius-card)] p-6 shadow-md cursor-pointer"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[var(--secondary)]/10 rounded-xl flex items-center justify-center">
                <Star className="w-6 h-6 text-[var(--secondary)]" />
              </div>
              <div>
                <p className="text-3xl font-bold">{MOCK_USER.stats.reviews}</p>
                <p className="text-[var(--muted)]">Reviews Written</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-white rounded-[var(--radius-card)] p-6 shadow-md cursor-pointer"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <p className="text-3xl font-bold">{MOCK_USER.stats.visited}</p>
                <p className="text-[var(--muted)]">Places Visited</p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Recently Viewed */}
            <div className="bg-white rounded-[var(--radius-card)] p-6 shadow-md">
              <div className="flex items-center justify-between mb-6">
                <h2>Recently Viewed</h2>
                <button className="text-[var(--primary)] hover:underline">View all</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {MOCK_RECENT.map((restaurant) => (
                  <RestaurantCard
                    key={restaurant.id}
                    {...restaurant}
                    onClick={() => onNavigate("restaurant", restaurant.id)}
                  />
                ))}
              </div>
            </div>

            {/* Activity Timeline */}
            <div className="bg-white rounded-[var(--radius-card)] p-6 shadow-md">
              <h2 className="mb-6">Recent Activity</h2>
              <div className="space-y-4">
                {[
                  {
                    action: "Saved to Favorites",
                    restaurant: "Bella Italia",
                    time: "2 hours ago",
                  },
                  { action: "Left a review", restaurant: "Tokyo Sushi Bar", time: "1 day ago" },
                  {
                    action: "Added to Date Night",
                    restaurant: "La Brasserie",
                    time: "3 days ago",
                  },
                ].map((activity, idx) => (
                  <div key={idx} className="flex items-start gap-4 pb-4 border-b last:border-0">
                    <div className="w-2 h-2 bg-[var(--primary)] rounded-full mt-2" />
                    <div className="flex-1">
                      <p>
                        <span className="font-medium">{activity.action}</span> •{" "}
                        <span className="text-[var(--primary)]">{activity.restaurant}</span>
                      </p>
                      <p className="text-sm text-[var(--muted)]">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Preferences */}
            <div className="bg-white rounded-[var(--radius-card)] p-6 shadow-md">
              <h3 className="mb-4">Cuisine Preferences</h3>
              <div className="space-y-3">
                {PREFERENCES.map((pref) => (
                  <label key={pref.id} className="flex items-center justify-between cursor-pointer">
                    <span>{pref.label}</span>
                    <input
                      type="checkbox"
                      defaultChecked={pref.active}
                      className="w-10 h-5 appearance-none bg-gray-200 rounded-full relative transition-colors checked:bg-[var(--primary)] cursor-pointer
                        before:content-[''] before:absolute before:w-4 before:h-4 before:bg-white before:rounded-full before:top-0.5 before:left-0.5 before:transition-transform
                        checked:before:translate-x-5"
                    />
                  </label>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-[var(--radius-card)] p-6 shadow-md">
              <h3 className="mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Button variant="outline" fullWidth onClick={() => onNavigate("saved")}>
                  <Heart className="w-4 h-4 mr-2" />
                  View Collections
                </Button>
                <Button variant="outline" fullWidth onClick={() => onNavigate("explore")}>
                  <Star className="w-4 h-4 mr-2" />
                  Discover New
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
