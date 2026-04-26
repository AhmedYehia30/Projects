import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ icon, className = "", ...props }, ref) => {
    return (
      <div className="relative w-full">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted)]">
            {icon}
          </div>
        )}
        <input
          ref={ref}
          className={`w-full px-4 py-3 ${
            icon ? "pl-12" : ""
          } bg-[var(--input-background)] border border-[var(--border)] rounded-[var(--radius-input)] transition-all duration-200 outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 ${className}`}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = "Input";
