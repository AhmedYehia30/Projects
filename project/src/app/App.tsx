import { useState } from "react";
import { Navbar } from "./components/Navbar";
import { HomePage } from "./components/HomePage";
import { ExplorePage } from "./components/ExplorePage";
import { RestaurantDetailsPage } from "./components/RestaurantDetailsPage";
import { SavedPage } from "./components/SavedPage";
import { ProfilePage } from "./components/ProfilePage";
import { AuthModals } from "./components/AuthModals";
import { Onboarding } from "./components/Onboarding";
import { Footer } from "./components/Footer";

type Page = "home" | "explore" | "restaurant" | "saved" | "profile";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);

  const handleNavigate = (page: string, restaurantId?: string) => {
    setCurrentPage(page as Page);
    if (restaurantId) {
      setSelectedRestaurantId(restaurantId);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLoginPrompt = () => {
    setIsLoginModalOpen(true);
  };

  const handleLogin = (email: string, password: string) => {
    setIsLoggedIn(true);
    setIsLoginModalOpen(false);
  };

  const handleRegister = (name: string, email: string, password: string) => {
    setIsLoggedIn(true);
    setIsRegisterModalOpen(false);
    setShowOnboarding(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage("home");
  };

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Navbar
        onLoginClick={() => setIsLoginModalOpen(true)}
        isLoggedIn={isLoggedIn}
        currentPage={currentPage}
        onNavigate={handleNavigate}
      />

      {currentPage === "home" && (
        <HomePage
          onNavigate={handleNavigate}
          onLoginPrompt={handleLoginPrompt}
          isLoggedIn={isLoggedIn}
        />
      )}

      {currentPage === "explore" && (
        <ExplorePage
          onNavigate={handleNavigate}
          onLoginPrompt={handleLoginPrompt}
          isLoggedIn={isLoggedIn}
        />
      )}

      {currentPage === "restaurant" && selectedRestaurantId && (
        <RestaurantDetailsPage
          restaurantId={selectedRestaurantId}
          onNavigate={handleNavigate}
          onLoginPrompt={handleLoginPrompt}
          isLoggedIn={isLoggedIn}
        />
      )}

      {currentPage === "saved" && isLoggedIn && (
        <SavedPage onNavigate={handleNavigate} />
      )}

      {currentPage === "profile" && isLoggedIn && (
        <ProfilePage onNavigate={handleNavigate} onLogout={handleLogout} />
      )}

      <AuthModals
        isLoginOpen={isLoginModalOpen}
        isRegisterOpen={isRegisterModalOpen}
        onCloseLogin={() => setIsLoginModalOpen(false)}
        onCloseRegister={() => setIsRegisterModalOpen(false)}
        onSwitchToRegister={() => {
          setIsLoginModalOpen(false);
          setIsRegisterModalOpen(true);
        }}
        onSwitchToLogin={() => {
          setIsRegisterModalOpen(false);
          setIsLoginModalOpen(true);
        }}
        onLogin={handleLogin}
        onRegister={handleRegister}
      />

      <Onboarding
        isOpen={showOnboarding}
        onComplete={() => setShowOnboarding(false)}
        onSkip={() => setShowOnboarding(false)}
      />

      <Footer />
    </div>
  );
}