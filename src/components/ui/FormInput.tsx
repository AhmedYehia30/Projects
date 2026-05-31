import React from "react";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, className = "", ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-[#0F172A] mb-2">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`
            w-full px-4 py-3.5 rounded-lg
            bg-[#F1F5F9] border border-[#E2E8F0]
            text-sm text-[#64748B] placeholder:text-[#94A3B8]
            transition-all duration-200
            focus:outline-none focus:border-[#00A99D] focus:ring-[3px] focus:ring-[rgba(0,169,157,0.1)]
            ${error ? "border-[#EF4444] focus:border-[#EF4444] focus:ring-[rgba(239,68,68,0.1)]" : ""}
            ${className}
          `}
          {...props}
        />
        {error && (
          <p className="mt-1 text-xs text-[#EF4444]">{error}</p>
        )}
      </div>
    );
  }
);

FormInput.displayName = "FormInput";

export default FormInput;
