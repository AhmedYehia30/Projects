import { useState, type ChangeEvent, type FormEvent } from "react";
import { NavLink } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const [formValues, setFormValues] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    notes: "",
  });
  const [orderPlaced, setOrderPlaced] = useState(false);

  const shippingFee = items.length > 0 ? 25 : 0;
  const total = subtotal + shippingFee;

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (items.length === 0) return;
    setOrderPlaced(true);
    clearCart();
  };

  return (
    <section className="bg-[#F8FAFB] pt-28 pb-24">
      <div className="container-main">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#00A99D] mb-3">
            Checkout
          </p>
          <h1 className="font-heading text-4xl md:text-5xl font-semibold text-[#0F172A] mb-4">
            Complete your order
          </h1>
          <p className="text-sm text-[#64748B] max-w-2xl mx-auto">
            Verify your delivery and payment information. Here you can review
            your order summary and complete checkout easily.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2 text-sm text-[#64748B]">
            <NavLink to="/" className="hover:text-[#00A99D] transition-colors">
              Home
            </NavLink>
            <span>/</span>
            <NavLink
              to="/store"
              className="hover:text-[#00A99D] transition-colors"
            >
              Store
            </NavLink>
            <span>/</span>
            <span className="text-[#0F172A]">Checkout</span>
          </div>
        </div>

        <div className="grid gap-8 xl:grid-cols-[1.7fr_1fr]">
          <div className="rounded-[28px] border border-[#E2E8F0] bg-white p-8 shadow-[0_2px_16px_rgba(0,0,0,0.04)]">
            {orderPlaced ? (
              <div className="space-y-6 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#E6FFFA] text-[#0F766E]">
                  ✓
                </div>
                <h2 className="text-2xl font-semibold text-[#0F172A]">
                  Your order has been placed successfully!
                </h2>
                <p className="text-[#64748B]">
                  Thank you. Your order will be prepared and shipped shortly. If
                  you want to continue shopping, return to the store.
                </p>
                <NavLink
                  to="/store"
                  className="inline-flex items-center justify-center rounded-md bg-[#00A99D] px-6 py-3.5 text-sm font-semibold text-white hover:bg-[#008B7F] transition-colors"
                >
                  تابع التسوق
                </NavLink>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-4">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#00A99D]">
                    Delivery details
                  </p>
                  <p className="text-sm text-[#64748B]">
                    Enter your correct details to ensure delivery to the right
                    address.
                  </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <label className="block text-sm font-medium text-[#0F172A]">
                    Full name
                    <Input
                      name="fullName"
                      value={formValues.fullName}
                      onChange={handleChange}
                      placeholder="Ahmed Ali"
                      className="mt-2"
                    />
                  </label>
                  <label className="block text-sm font-medium text-[#0F172A]">
                    Email
                    <Input
                      type="email"
                      name="email"
                      value={formValues.email}
                      onChange={handleChange}
                      placeholder="example@email.com"
                      className="mt-2"
                    />
                  </label>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <label className="block text-sm font-medium text-[#0F172A]">
                    Phone number
                    <Input
                      type="tel"
                      name="phone"
                      value={formValues.phone}
                      onChange={handleChange}
                      placeholder="0112 345 6789"
                      className="mt-2"
                    />
                  </label>
                  <label className="block text-sm font-medium text-[#0F172A]">
                    City
                    <Input
                      name="city"
                      value={formValues.city}
                      onChange={handleChange}
                      placeholder="Cairo"
                      className="mt-2"
                    />
                  </label>
                </div>

                <label className="block text-sm font-medium text-[#0F172A]">
                  Delivery address
                  <Input
                    name="address"
                    value={formValues.address}
                    onChange={handleChange}
                    placeholder="123 El-Tahrir St, Nasr City"
                    className="mt-2"
                  />
                </label>

                <label className="block text-sm font-medium text-[#0F172A]">
                  Special instructions
                  <textarea
                    name="notes"
                    value={formValues.notes}
                    onChange={handleChange}
                    rows={4}
                    className="mt-2 w-full rounded-lg border border-[#E2E8F0] bg-[#F8FAFB] px-4 py-3 text-sm text-[#0F172A] outline-none transition-colors focus:border-[#00A99D] focus:ring-[#00A99D]/20"
                    placeholder="اكتب ملاحظات إضافية لو حابب"
                  />
                </label>

                <Button
                  type="submit"
                  className="w-full bg-[#00A99D] text-white hover:bg-[#008B7F]"
                >
                  Place order
                </Button>
              </form>
            )}
          </div>

          <aside className="rounded-[28px] border border-[#E2E8F0] bg-white p-8 shadow-[0_2px_16px_rgba(0,0,0,0.04)]">
            <div className="mb-6">
              <p className="text-sm text-[#64748B] uppercase tracking-[0.2em]">
                Order summary
              </p>
              <h2 className="font-heading text-2xl font-semibold text-[#0F172A] mt-3">
                {items.length > 0 ? "Your basket" : "No products yet"}
              </h2>
            </div>

            {items.length === 0 ? (
              <div className="space-y-4">
                <p className="text-sm text-[#64748B]">
                  Your cart is empty. Add products from the store page and then
                  return here to complete your order.
                </p>
                <NavLink
                  to="/store"
                  className="inline-flex w-full items-center justify-center rounded-md bg-[#00A99D] px-5 py-3.5 text-sm font-semibold text-white hover:bg-[#008B7F] transition-colors"
                >
                  Browse store
                </NavLink>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 rounded-3xl border border-[#E2E8F0] p-4"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-16 w-16 rounded-2xl object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-[#0F172A] truncate">
                          {item.name}
                        </p>
                        <p className="text-sm text-[#64748B] mt-1">
                          {item.quantity} × {item.price.toLocaleString()} EGP
                        </p>
                      </div>
                      <p className="text-sm font-semibold text-[#0F172A]">
                        {(item.price * item.quantity).toLocaleString()} EGP
                      </p>
                    </div>
                  ))}
                </div>

                <div className="rounded-3xl bg-[#F8FAFB] p-5">
                  <div className="flex items-center justify-between text-sm text-[#64748B] mb-3">
                    <span>Subtotal</span>
                    <span>{subtotal.toLocaleString()} EGP</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-[#64748B] mb-3">
                    <span>Shipping</span>
                    <span>{shippingFee.toLocaleString()} EGP</span>
                  </div>
                  <div className="border-t border-[#E2E8F0] pt-4 flex items-center justify-between text-base font-semibold text-[#0F172A]">
                    <span>Total</span>
                    <span>{total.toLocaleString()} EGP</span>
                  </div>
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
}
