import { NavLink } from "react-router-dom";

export default function StoreHero() {
  return (
    <section
      className="pt-32 pb-16 md:pt-36 md:pb-20"
      style={{
        background: "linear-gradient(135deg, #00A99D 0%, #008B7F 100%)",
      }}
    >
      <div className="container-main text-center">
        <h1 className="font-heading font-medium text-4xl md:text-5xl text-white mb-3">
          Our Store
        </h1>
        <div className="text-sm text-white/70">
          <NavLink to="/" className="text-white hover:underline">
            Home
          </NavLink>
          <span className="mx-2">/</span>
          <span className="text-white/70">Store</span>
        </div>
      </div>
    </section>
  );
}
