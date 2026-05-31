import { Loader2 } from "lucide-react";

type ButtonVariant = "primary" | "ghost" | "white";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  isLoading?: boolean;
  children: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-[#00A99D] text-white hover:bg-[#008B7F] active:scale-[0.98]",
  ghost:
    "bg-transparent text-[#00A99D] border border-[#00A99D] hover:bg-[#00A99D] hover:text-white active:scale-[0.98]",
  white:
    "bg-white text-[#00A99D] hover:bg-[#E8C876] hover:text-[#0F172A] active:scale-[0.98]",
};

export default function Button({
  variant = "primary",
  isLoading = false,
  children,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
        inline-flex items-center justify-center gap-2
        px-8 py-3 rounded-md
        text-sm font-semibold uppercase tracking-wide
        transition-all duration-300 ease-in-out
        disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100
        ${variantStyles[variant]}
        ${className}
      `}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Loader2 className="w-4 h-4 animate-spin-loader" />}
      {children}
    </button>
  );
}
