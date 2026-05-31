import { useState, useRef, type FormEvent } from "react";
import { Upload, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import ScrollReveal from "@/components/animation/ScrollReveal";
import FormInput from "@/components/ui/FormInput";

interface ApplicationFormProps {
  selectedPosition: string;
}

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  position: string;
  coverLetter: string;
  cvFile: File | null;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  position?: string;
  coverLetter?: string;
}

export default function ApplicationForm({ selectedPosition }: ApplicationFormProps) {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    position: selectedPosition,
    coverLetter: "",
    cvFile: null,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateField = (name: keyof FormData, value: string): string | undefined => {
    switch (name) {
      case "fullName":
        return value.length < 2 ? "Name must be at least 2 characters" : undefined;
      case "email":
        return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? "Please enter a valid email" : undefined;
      case "phone":
        return value.length < 8 ? "Please enter a valid phone number" : undefined;
      case "position":
        return value === "" ? "Please select a position" : undefined;
      case "coverLetter":
        return value.length < 50 ? "Cover letter must be at least 50 characters" : undefined;
      default:
        return undefined;
    }
  };

  const handleBlur = (field: keyof FormData) => {
    const value = formData[field];
    if (typeof value === "string") {
      const error = validateField(field, value);
      setErrors((prev) => ({ ...prev, [field]: error }));
    }
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const newErrors: FormErrors = {};
    (Object.keys(formData) as Array<keyof FormData>).forEach((key) => {
      if (key !== "cvFile") {
        const error = validateField(key, formData[key] as string);
        if (error) newErrors[key as keyof FormErrors] = error;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus(null), 5000);
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setSubmitStatus("success");

    // Reset form
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      position: "",
      coverLetter: "",
      cvFile: null,
    });

    setTimeout(() => setSubmitStatus(null), 5000);
  };

  const positionOptions = [
    "Select Position",
    "Pharmacist",
    "Assistant Pharmacist",
    "Customer Service Representative",
    "Delivery Representative",
  ];

  return (
    <section className="bg-white py-20 lg:pb-[120px]" id="application-form">
      <div className="container-main max-w-[720px]">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="font-heading font-medium text-3xl text-[#0F172A] mb-3">
              Apply Now
            </h2>
            <p className="text-base text-[#64748B]">
              Fill out the form below to apply for a position at Elshaitany
              Pharmacy. We&apos;ll review your application and get back to you soon.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-[0_2px_16px_rgba(0,0,0,0.04)] p-8 md:p-12">
            {/* Status Messages */}
            {submitStatus === "success" && (
              <div className="mb-6 p-4 rounded-lg bg-[#10B981]/10 border border-[#10B981]/20 flex items-start gap-3">
                <CheckCircle size={20} className="text-[#10B981] shrink-0 mt-0.5" />
                <p className="text-sm text-[#10B981]">
                  Thank you! Your application has been submitted successfully. We&apos;ll contact you soon.
                </p>
              </div>
            )}
            {submitStatus === "error" && (
              <div className="mb-6 p-4 rounded-lg bg-[#EF4444]/10 border border-[#EF4444]/20 flex items-start gap-3">
                <AlertCircle size={20} className="text-[#EF4444] shrink-0 mt-0.5" />
                <p className="text-sm text-[#EF4444]">
                  Please fill in all required fields correctly.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Row 1 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput
                  label="Full Name *"
                  placeholder="Your full name"
                  value={formData.fullName}
                  onChange={(e) => handleChange("fullName", e.target.value)}
                  onBlur={() => handleBlur("fullName")}
                  error={errors.fullName}
                />
                <FormInput
                  label="Email Address *"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  onBlur={() => handleBlur("email")}
                  error={errors.email}
                />
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput
                  label="Phone Number *"
                  type="tel"
                  placeholder="+20 1XX XXX XXXX"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  onBlur={() => handleBlur("phone")}
                  error={errors.phone}
                />
                <div>
                  <label className="block text-sm font-medium text-[#0F172A] mb-2">
                    Position *
                  </label>
                  <select
                    value={formData.position}
                    onChange={(e) => handleChange("position", e.target.value)}
                    onBlur={() => handleBlur("position")}
                    className={`
                      w-full px-4 py-3.5 rounded-lg
                      bg-[#F1F5F9] border border-[#E2E8F0]
                      text-sm text-[#64748B]
                      focus:outline-none focus:border-[#00A99D] focus:ring-[3px] focus:ring-[rgba(0,169,157,0.1)]
                      ${errors.position ? "border-[#EF4444]" : ""}
                    `}
                  >
                    {positionOptions.map((opt) => (
                      <option key={opt} value={opt === "Select Position" ? "" : opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  {errors.position && (
                    <p className="mt-1 text-xs text-[#EF4444]">{errors.position}</p>
                  )}
                </div>
              </div>

              {/* File Upload */}
              <div>
                <label className="block text-sm font-medium text-[#0F172A] mb-2">
                  Upload CV
                </label>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-[#E2E8F0] rounded-lg p-8 text-center cursor-pointer hover:border-[#00A99D] hover:bg-[rgba(0,169,157,0.03)] transition-all duration-200"
                >
                  <Upload size={32} className="text-[#94A3B8] mx-auto mb-3" />
                  <p className="text-sm text-[#94A3B8]">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-[#94A3B8]/70 mt-1">
                    PDF, DOC, DOCX up to 5MB
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        cvFile: e.target.files?.[0] || null,
                      }))
                    }
                  />
                </div>
                {formData.cvFile && (
                  <p className="mt-2 text-sm text-[#00A99D]">
                    {formData.cvFile.name}
                  </p>
                )}
              </div>

              {/* Cover Letter */}
              <div>
                <label className="block text-sm font-medium text-[#0F172A] mb-2">
                  Cover Letter *
                </label>
                <textarea
                  placeholder="Tell us why you're a great fit for this position..."
                  rows={6}
                  value={formData.coverLetter}
                  onChange={(e) => handleChange("coverLetter", e.target.value)}
                  onBlur={() => handleBlur("coverLetter")}
                  className={`
                    w-full px-4 py-3.5 rounded-lg
                    bg-[#F1F5F9] border border-[#E2E8F0]
                    text-sm text-[#64748B] placeholder:text-[#94A3B8]
                    focus:outline-none focus:border-[#00A99D] focus:ring-[3px] focus:ring-[rgba(0,169,157,0.1)]
                    resize-none
                    ${errors.coverLetter ? "border-[#EF4444]" : ""}
                  `}
                />
                {errors.coverLetter && (
                  <p className="mt-1 text-xs text-[#EF4444]">{errors.coverLetter}</p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-[#00A99D] text-white rounded-md text-sm font-semibold uppercase tracking-wide hover:bg-[#008B7F] transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting && <Loader2 size={16} className="animate-spin-loader" />}
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </button>
            </form>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
