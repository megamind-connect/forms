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
    full_name: "",
    company: "",
    phone: "",
    email: "",
  });

  const [touchedStep2, setTouchedStep2] = useState<Record<string, boolean>>({});
  const [touchedStep6, setTouchedStep6] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // UPDATED: Step Structure now includes 8 steps
  const stepStructure: Record<number, number> = {
    1: 1,
    2: 1,
    3: 1, // NEW INTRO STEP
    4: 1,
    5: 1,
    6: 1,
    7: step6Questions.length + 1, // long text questions
    8: 1, // final review
  };

  const totalSteps = 8;

  // VALIDATION LOGIC (unchanged)
  const validateCurrentStep = () => {
    if (step === 2) {
      const missing = formFields.filter((f) => !formData[f.name]);
      return missing.length === 0;
    }

    if (step === 4) {
      const required = ["team_rating10", "team_rating1", "team_rating2", "delivery_time", "team_rating4"];
      return required.every((field) => !!formData[field]);
    }

    if (step === 5) {
      const services = formData["services_provided_step4"];
      if (!services || !services.list || services.list.length === 0) return false;
      const requiredRatings = ["team_rating4114", "team_rating411", "team_rating41132"];
      return requiredRatings.every((f) => !!formData[f]);
    }

    if (step === 6) {
      const required = ["team_ratreing4114", "team_rrewating411", "team_rarewrting41132"];
      return required.every((f) => !!formData[f]);
    }

    if (step === 8) {
      return (
        !!formData["team_rrewating411"] &&
        !!formData["team_rarewrting41132"] &&
        !!formData["feedback"]?.trim()
      );
    }

    if (step === 7) {
      const fieldName = step6Questions[subStep - 1].name;
      return !!formData[fieldName]?.trim();
    }

    return true;
  };

  const handleNext = async () => {
    if (!validateCurrentStep()) {
      alert("Please complete all required fields.");
      return;
    }

    if (step === 7 && subStep < step6Questions.length) {
      setSubStep((prev) => prev + 1);
      return;
    }

    if (step === 7 && subStep === step6Questions.length) {
      setStep(8);
      setSubStep(1);
      return;
    }

    if (step < totalSteps) {
      setStep((prev) => prev + 1);
      setSubStep(1);
    } else {
      console.log("FINAL FORM DATA:", formData);
      alert("Thank you! Your review has been submitted.");
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
    if (num === 7) return ((subStep - 1) / step6Questions.length) * 100;
    return 100;
  };

  const updateFormData = (updates: FormData) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const markStep2FieldTouched = (name: string) => {
    setTouchedStep2((prev) => ({ ...prev, [name]: true }));
  };

  const markAllStep2FieldsTouched = () => {
    const touched = formFields.reduce((acc, f) => ({ ...acc, [f.name]: true }), {});
    setTouchedStep2(touched);
  };

  const markStep6FieldTouched = (name: string) => {
    setTouchedStep6((prev) => ({ ...prev, [name]: true }));
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
