import { useState } from "react";
import { motion } from "motion/react";
import { Plus, Folder, Heart, MoreVertical, Edit2, Trash2 } from "lucide-react";
import { RestaurantCard } from "./RestaurantCard";
import { Button } from "./Button";

interface SavedPageProps {
  onNavigate: (page: string, restaurantId?: string) => void;
}

const MOCK_COLLECTIONS = [
  {
    id: "1",
    name: "Favorites",
    count: 12,
    color: "#F97316",
    restaurants: [
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
    ],
  },
  {
    id: "2",
    name: "Date Night",
    count: 8,
    color: "#EC4899",
    restaurants: [
      {
        id: "3",
        name: "La Brasserie",
        image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
        rating: 4.7,
        reviewCount: 412,
        cuisine: "French",
        priceLevel: 3,
        deliveryTime: "40-50 min",
      },
    ],
  },
  {
    id: "3",
    name: "Quick Bites",
    count: 15,
    color: "#22C55E",
    restaurants: [
      {
        id: "4",
        name: "The Burger Joint",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800",
        rating: 4.7,
        reviewCount: 289,
        cuisine: "American",
        priceLevel: 1,
        deliveryTime: "15-25 min",
      },
    ],
  },
];

export function SavedPage({ onNavigate }: SavedPageProps) {
  const [selectedCollection, setSelectedCollection] = useState(MOCK_COLLECTIONS[0]);
  const [showCollectionMenu, setShowCollectionMenu] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[var(--background)] pt-20">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="mb-2">My Collections</h1>
            <p className="text-[var(--muted)]">Organize your favorite restaurants</p>
          </div>
          <Button>
            <Plus className="w-5 h-5 mr-2" />
            New Collection
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Collections Sidebar */}
          <aside className="lg:col-span-1">
            <div className="space-y-2">
              {MOCK_COLLECTIONS.map((collection) => (
                <motion.div
                  key={collection.id}
                  onClick={() => setSelectedCollection(collection)}
                  className={`group relative p-4 rounded-xl cursor-pointer transition-all ${
                    selectedCollection.id === collection.id
                      ? "bg-white shadow-md"
                      : "bg-white/50 hover:bg-white hover:shadow-sm"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${collection.color}20` }}
                    >
                      <Folder className="w-6 h-6" style={{ color: collection.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="truncate">{collection.name}</h4>
                      <p className="text-sm text-[var(--muted)]">{collection.count} places</p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowCollectionMenu(
                          showCollectionMenu === collection.id ? null : collection.id
                        );
                      }}
                      className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-100 rounded transition-opacity"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>

                  {showCollectionMenu === collection.id && (
                    <div className="absolute right-4 top-16 bg-white rounded-lg shadow-xl border border-[var(--border)] py-2 z-10">
                      <button className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2">
                        <Edit2 className="w-4 h-4" />
                        Edit
                      </button>
                      <button className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2 text-red-500">
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </div>
                  )}

                  {/* Preview Images */}
                  {collection.restaurants.length > 0 && (
                    <div className="flex gap-1 mt-3 overflow-hidden rounded-lg">
                      {collection.restaurants.slice(0, 3).map((restaurant, idx) => (
                        <img
                          key={idx}
                          src={restaurant.image}
                          alt=""
                          className="w-full h-16 object-cover"
                        />
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </aside>

          {/* Collection Content */}
          <main className="lg:col-span-3">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${selectedCollection.color}20` }}
                >
                  <Folder className="w-5 h-5" style={{ color: selectedCollection.color }} />
                </div>
                <h2>{selectedCollection.name}</h2>
              </div>
              <p className="text-[var(--muted)]">{selectedCollection.count} saved restaurants</p>
            </div>

            {selectedCollection.restaurants.length === 0 ? (
              <div className="bg-white rounded-[var(--radius-card)] p-12 text-center">
                <Heart className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <h3 className="mb-2">No restaurants yet</h3>
                <p className="text-[var(--muted)] mb-6">
                  Start adding restaurants to this collection
                </p>
                <Button onClick={() => onNavigate("explore")}>Explore Restaurants</Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {selectedCollection.restaurants.map((restaurant) => (
                  <RestaurantCard
                    key={restaurant.id}
                    {...restaurant}
                    isSaved={true}
                    onClick={() => onNavigate("restaurant", restaurant.id)}
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
