import { Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import Layout from "@/components/layout/Layout";
import HomePage from "@/pages/HomePage";
import StorePage from "@/pages/StorePage";
import CheckoutPage from "@/pages/CheckoutPage";
import CareersPage from "@/pages/CareersPage";
import ContactPage from "@/pages/ContactPage";

function App() {
  return (
    <CartProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/store" element={<StorePage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Route>
      </Routes>
    </CartProvider>
  );
}

export default App;
