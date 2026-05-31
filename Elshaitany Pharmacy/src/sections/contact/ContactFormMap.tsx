import { useState, type FormEvent } from "react";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import ScrollReveal from "@/components/animation/ScrollReveal";
import FormInput from "@/components/ui/FormInput";

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export default function ContactFormMap() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);

  const validateField = (name: keyof FormData, value: string): string | undefined => {
    switch (name) {
      case "name":
        return value.length < 2 ? "Name must be at least 2 characters" : undefined;
      case "email":
        return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? "Please enter a valid email" : undefined;
      case "subject":
        return value.length < 3 ? "Subject must be at least 3 characters" : undefined;
      case "message":
        return value.length < 10 ? "Message must be at least 10 characters" : undefined;
      default:
        return undefined;
    }
  };

  const handleBlur = (field: keyof FormData) => {
    const error = validateField(field, formData[field]);
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const newErrors: FormErrors = {};
    (["name", "email", "subject", "message"] as const).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus(null), 5000);
      return;
    }

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitStatus("success");
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    setTimeout(() => setSubmitStatus(null), 5000);
  };

  return (
    <section className="bg-[#F8FAFB] py-16 lg:py-[120px]">
      <div className="container-main">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <ScrollReveal direction="left">
            <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-[0_2px_16px_rgba(0,0,0,0.04)] p-8 md:p-10">
              <h3 className="font-heading font-medium text-2xl text-[#0F172A] mb-2">
                Send Us a Message
              </h3>
              <p className="text-sm text-[#64748B] mb-8">
                Have a question or need assistance? Fill out the form and
                we&apos;ll get back to you as soon as possible.
              </p>

              {/* Status Messages */}
              {submitStatus === "success" && (
                <div className="mb-6 p-4 rounded-lg bg-[#10B981]/10 border border-[#10B981]/20 flex items-start gap-3">
                  <CheckCircle size={20} className="text-[#10B981] shrink-0 mt-0.5" />
                  <p className="text-sm text-[#10B981]">
                    Thank you! Your message has been sent successfully.
                  </p>
                </div>
              )}
              {submitStatus === "error" && (
                <div className="mb-6 p-4 rounded-lg bg-[#EF4444]/10 border border-[#EF4444]/20 flex items-start gap-3">
                  <AlertCircle size={20} className="text-[#EF4444] shrink-0 mt-0.5" />
                  <p className="text-sm text-[#EF4444]">
                    Please fill in all required fields.
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <FormInput
                    label="Name *"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    onBlur={() => handleBlur("name")}
                    error={errors.name}
                  />
                  <FormInput
                    label="Email *"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    onBlur={() => handleBlur("email")}
                    error={errors.email}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <FormInput
                    label="Phone"
                    type="tel"
                    placeholder="Your phone number"
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                  />
                  <FormInput
                    label="Subject *"
                    placeholder="How can we help?"
                    value={formData.subject}
                    onChange={(e) => handleChange("subject", e.target.value)}
                    onBlur={() => handleBlur("subject")}
                    error={errors.subject}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#0F172A] mb-2">
                    Message *
                  </label>
                  <textarea
                    placeholder="Your message..."
                    rows={6}
                    value={formData.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    onBlur={() => handleBlur("message")}
                    className={`
                      w-full px-4 py-3.5 rounded-lg
                      bg-[#F1F5F9] border border-[#E2E8F0]
                      text-sm text-[#64748B] placeholder:text-[#94A3B8]
                      focus:outline-none focus:border-[#00A99D] focus:ring-[3px] focus:ring-[rgba(0,169,157,0.1)]
                      resize-none
                      ${errors.message ? "border-[#EF4444]" : ""}
                    `}
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs text-[#EF4444]">{errors.message}</p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-[#00A99D] text-white rounded-md text-sm font-semibold uppercase tracking-wide hover:bg-[#008B7F] transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting && <Loader2 size={16} className="animate-spin-loader" />}
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </ScrollReveal>

          {/* Map */}
          <ScrollReveal direction="right" delay={0.15}>
            <div className="rounded-xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.06)] h-full min-h-[400px] lg:min-h-[500px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3452.2755336376283!2d31.3246!3d30.0891!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDA1JzIwLjgiTiAzMcKwMTknMjguNiJF!5e0!3m2!1sen!2seg!4v1700000000000!5m2!1sen!2seg"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "100%" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Elshaitany Pharmacy Location"
                className="h-full min-h-[400px] lg:min-h-full"
              />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
