type CardVariant = "glass" | "solid";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  children: React.ReactNode;
}

const variantStyles: Record<CardVariant, string> = {
  glass:
    "bg-white/80 backdrop-blur-[10px] border border-[#E2E8F0] shadow-[0_4px_24px_rgba(0,0,0,0.06)]",
  solid:
    "bg-white border border-[#E2E8F0] shadow-[0_2px_16px_rgba(0,0,0,0.04)]",
};

export default function Card({
  variant = "solid",
  children,
  className = "",
  ...props
}: CardProps) {
  return (
    <div
      className={`
        rounded-xl overflow-hidden
        transition-all duration-300 ease-in-out
        hover:shadow-[0_8px_32px_rgba(0,0,0,0.1)] hover:-translate-y-1
        ${variantStyles[variant]}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
}
