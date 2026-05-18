import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronRight, ChevronLeft, X } from "lucide-react";
import { Button } from "./Button";

interface OnboardingProps {
  isOpen: boolean;
  onComplete: () => void;
  onSkip: () => void;
}

const CUISINES = [
  { id: "italian", label: "Italian", icon: "🍝" },
  { id: "japanese", label: "Japanese", icon: "🍣" },
  { id: "mexican", label: "Mexican", icon: "🌮" },
  { id: "chinese", label: "Chinese", icon: "🥡" },
  { id: "indian", label: "Indian", icon: "🍛" },
  { id: "american", label: "American", icon: "🍔" },
  { id: "thai", label: "Thai", icon: "🍜" },
  { id: "french", label: "French", icon: "🥐" },
];

const BUDGETS = [
  { id: "budget", label: "Budget-Friendly", icon: "$", color: "#22C55E" },
  { id: "moderate", label: "Moderate", icon: "$$", color: "#F59E0B" },
  { id: "upscale", label: "Upscale", icon: "$$$", color: "#F97316" },
  { id: "luxury", label: "Fine Dining", icon: "$$$$", color: "#EF4444" },
];

const MOODS = [
  { id: "casual", label: "Casual Dining", emoji: "😊" },
  { id: "romantic", label: "Date Night", emoji: "💕" },
  { id: "family", label: "Family-Friendly", emoji: "👨‍👩‍👧‍👦" },
  { id: "quick", label: "Quick Bites", emoji: "⚡" },
  { id: "fine", label: "Fine Dining", emoji: "🌟" },
  { id: "delivery", label: "Delivery", emoji: "🚗" },
];

export function Onboarding({ isOpen, onComplete, onSkip }: OnboardingProps) {
  const [step, setStep] = useState(0);
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  const [selectedBudget, setSelectedBudget] = useState<string | null>(null);
  const [selectedMoods, setSelectedMoods] = useState<string[]>([]);

  const totalSteps = 3;

  const toggleCuisine = (id: string) => {
    setSelectedCuisines((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const toggleMood = (id: string) => {
    setSelectedMoods((prev) => (prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]));
  };

  const handleNext = () => {
    if (step < totalSteps - 1) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const canProceed = () => {
    if (step === 0) return selectedCuisines.length > 0;
    if (step === 1) return selectedBudget !== null;
    if (step === 2) return selectedMoods.length > 0;
    return true;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-2xl bg-white rounded-[var(--radius-card)] overflow-hidden"
              style={{ boxShadow: "var(--shadow-xl)" }}
            >
              <button
                onClick={onSkip}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="p-8 md:p-12">
                {/* Progress Bar */}
                <div className="mb-8">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-[var(--muted)]">
                      Step {step + 1} of {totalSteps}
                    </span>
                    <button onClick={onSkip} className="text-sm text-[var(--primary)] hover:underline">
                      Skip for now
                    </button>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-[var(--primary)]"
                      initial={{ width: "0%" }}
                      animate={{ width: `${((step + 1) / totalSteps) * 100}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  {step === 0 && (
                    <motion.div
                      key="step-0"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h2 className="mb-3">What cuisines do you love?</h2>
                      <p className="text-[var(--muted)] mb-8">
                        Select your favorite cuisines to get personalized recommendations
                      </p>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {CUISINES.map((cuisine) => (
                          <motion.button
                            key={cuisine.id}
                            onClick={() => toggleCuisine(cuisine.id)}
                            className={`p-4 rounded-xl border-2 transition-all ${
                              selectedCuisines.includes(cuisine.id)
                                ? "border-[var(--primary)] bg-[var(--primary)]/10 shadow-md"
                                : "border-gray-200 hover:border-[var(--primary)]"
                            }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <div className="text-4xl mb-2">{cuisine.icon}</div>
                            <div className="text-sm font-medium">{cuisine.label}</div>
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {step === 1 && (
                    <motion.div
                      key="step-1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h2 className="mb-3">What's your typical budget?</h2>
                      <p className="text-[var(--muted)] mb-8">
                        Help us recommend restaurants that fit your budget
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {BUDGETS.map((budget) => (
                          <motion.button
                            key={budget.id}
                            onClick={() => setSelectedBudget(budget.id)}
                            className={`p-6 rounded-xl border-2 transition-all ${
                              selectedBudget === budget.id
                                ? "border-[var(--primary)] bg-[var(--primary)]/10 shadow-md"
                                : "border-gray-200 hover:border-[var(--primary)]"
                            }`}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                          >
                            <div
                              className="text-3xl font-bold mb-2"
                              style={{ color: budget.color }}
                            >
                              {budget.icon}
                            </div>
                            <div className="font-medium">{budget.label}</div>
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      key="step-2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h2 className="mb-3">What's your dining mood?</h2>
                      <p className="text-[var(--muted)] mb-8">
                        Choose all that apply to personalize your experience
                      </p>

                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {MOODS.map((mood) => (
                          <motion.button
                            key={mood.id}
                            onClick={() => toggleMood(mood.id)}
                            className={`p-4 rounded-xl border-2 transition-all ${
                              selectedMoods.includes(mood.id)
                                ? "border-[var(--primary)] bg-[var(--primary)]/10 shadow-md"
                                : "border-gray-200 hover:border-[var(--primary)]"
                            }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <div className="text-3xl mb-2">{mood.emoji}</div>
                            <div className="text-sm font-medium">{mood.label}</div>
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Navigation */}
                <div className="flex gap-4 mt-12">
                  {step > 0 && (
                    <Button variant="outline" onClick={handleBack}>
                      <ChevronLeft className="w-5 h-5 mr-1" />
                      Back
                    </Button>
                  )}
                  <Button
                    onClick={handleNext}
                    disabled={!canProceed()}
                    fullWidth={step === 0}
                  >
                    {step === totalSteps - 1 ? "Get Started" : "Next"}
                    {step < totalSteps - 1 && <ChevronRight className="w-5 h-5 ml-1" />}
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
