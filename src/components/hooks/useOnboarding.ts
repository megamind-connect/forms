// components/hooks/useOnboarding.ts
import { useState, useEffect } from "react";
import { commonPersonalFields } from "@/utils/onboarding";

type FormData = Record<string, any>;

const step6Questions = [
  { name: "overall_experience", title: "How was your overall experience?", placeholder: "Share your thoughts..." },
  { name: "improvement_areas", title: "What can we improve?", placeholder: "Your feedback helps us grow..." },
  { name: "final_message", title: "Any final message for the team?", placeholder: "We’d love to hear it!" },
];

export function useOnboarding() {
  const [step, setStep] = useState(1);
  const [subStep, setSubStep] = useState(1);
  const [showSplash, setShowSplash] = useState(true);
  const [formFields] = useState(commonPersonalFields);

  const [formData, setFormData] = useState<FormData>({
    full_name: "John Doe",
    company: "Tech Pvt Ltd",
    phone: "9876543210",
    email: "demo@email.com",
    // ... all other dummy data
  });

  const [touchedStep2, setTouchedStep2] = useState<Record<string, boolean>>({});
  const [touchedStep6, setTouchedStep6] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const stepStructure: Record<number, number> = {
    1: 1, 2: 1, 3: 1, 4: 1, 5: 1,
    6: step6Questions.length + 1,
    7: 1,
  };

  const totalSteps = 7;

  // Validation per step
  const validateCurrentStep = () => {
    if (step === 2) {
      const missing = formFields.filter(f => !formData[f.name]);
      return missing.length === 0;
    }
    if (step === 6) {
      const fieldName = step6Questions[subStep - 1].name;
      return !!(formData[fieldName]?.trim());
    }
    if ([3, 4, 5, 7].includes(step)) {
      const requiredFields = {
        3: ["delivery_time", "on_time_delivery_rating", "services_provided", "creative_strength_text"],
        4: ["services_provided_step4", "delivery_time_step4", "creative_strength_text_step4"],
        5: ["understands_brief_rating", "on_time_delivery_rating_step5"],
        7: ["recommendation_rating", "future_projects"],
      }[step];

      return requiredFields.every(field => {
        const val = formData[field];
        if (field.includes("services")) return val?.list?.length > 0;
        if (field.includes("text")) return val?.trim();
        return !!val;
      });
    }
    return true;
  };

  const handleNext = async () => {
    if (!validateCurrentStep()) {
      alert("Please complete all required fields.");
      return;
    }

    // Step 6 sub-steps
    if (step === 6 && subStep < step6Questions.length) {
      setSubStep(prev => prev + 1);
      return;
    }

    if (step === 6 && subStep === step6Questions.length) {
      setStep(7);
      setSubStep(1);
      return;
    }

    if (step < totalSteps) {
      setStep(prev => prev + 1);
      setSubStep(1);
    } else {
      console.log("FINAL SUBMISSION:", formData);
      alert("Thank you! Your review has been submitted.");
      // await fetch("/api/submit", { method: "POST", body: JSON.stringify(formData) });
    }
  };

  const handleStepClick = (target: number) => {
    if (target < step || validateCurrentStep()) {
      setStep(target);
      setSubStep(1);
    }
  };

  const getStepProgress = (num: number) => {
    if (num < step) return 100;
    if (num > step) return 0;
    if (num === 6) return ((subStep - 1) / step6Questions.length) * 100;
    return 100;
  };

  const updateFormData = (updates: FormData) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const markStep2FieldTouched = (name: string) => {
    setTouchedStep2(prev => ({ ...prev, [name]: true }));
  };

  const markAllStep2FieldsTouched = () => {
    const touched = formFields.reduce((acc, f) => ({ ...acc, [f.name]: true }), {});
    setTouchedStep2(touched);
  };

  const markStep6FieldTouched = (name: string) => {
    setTouchedStep6(prev => ({ ...prev, [name]: true }));
  };

  return {
    step,
    subStep,
    showSplash,
    formFields,
    formData,
    step6Questions,
    stepStructure,
    touchedStep2,
    touchedStep6,
    handleNext,
    handleStepClick,
    getStepProgress,
    updateFormData,
    validateCurrentStep,
    markStep2FieldTouched,
    markAllStep2FieldsTouched,
    markStep6FieldTouched,
  };
}