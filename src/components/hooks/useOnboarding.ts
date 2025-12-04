import { useState, useEffect } from "react";
import { commonPersonalFields } from "@/utils/onboarding";

type FormData = Record<string, any>;

const step6Questions = [
  { image:"/images/steps/3.png", name: "pleasant_surprise", title: "Were any deliverables a pleasant surprise?", placeholder: "If Yes , we would love to know which ones and what made them stand out for you. " },
  { image:"/images/steps/4.png", name: "experience_description", title: "How would you describe your overall experience with our team?", placeholder: "Please specify any areas where we fell short" },
  { image:"/images/steps/5.png", name: "additional_services", title: "Are there any additional services or improvements you would like to see in the coming months?", placeholder: "If Yes , we would love to know which ones and what made them stand out for you." },
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

  // UPDATED: Step Structure now includes 6 steps (4 is combined with 3 sub-steps)
  const stepStructure: Record<number, number> = {
    1: 1,
    2: 1,
    3: 1, // intro
    4: 3, // combined: sub-step1 (experience), sub-step2 (services), sub-step3 (performance)
    5: step6Questions.length, // long text questions (multi-substep)
    6: 1, // final review / submit
  };

  const totalSteps = 6;

  // VALIDATION LOGIC
  const validateCurrentStep = () => {
    if (step === 2) {
      const missing = formFields.filter((f) => !formData[f.name]);
      return missing.length === 0;
    }

    // Combined step 4 validation depends on subStep
    if (step === 4) {
      if (subStep === 1) {
        const required = [
          "overall_experience_rating",
          "service_impact_rating",
          "service_quality_rating",
          "delivery_time_option",
          "strategy_alignment_rating",
        ];
        return required.every((field) => !!formData[field]);
      }

      if (subStep === 2) {
        const services = formData["services_provided"];
        if (!services || !services.list || services.list.length === 0) return false;

        const requiredRatings = [
          "goal_alignment_rating",
          "deadline_efficiency_rating",
          "feedback_understanding_rating",
        ];
        return requiredRatings.every((f) => !!formData[f]);
      }

      if (subStep === 3) {
        const required = [
          "marketing_results_rating",
          "brand_representation_rating",
          "responsiveness_rating",
        ];
        return required.every((f) => !!formData[f]);
      }
    }

    // long text questions (now step 5)
    if (step === 5) {
      const fieldName = step6Questions[subStep - 1].name;
      return !!formData[fieldName]?.trim();
    }

    if (step === 6) {
      return (
        !!formData["pleasant_surprise"] &&
        !!formData["experience_description"] &&
        !!formData["additional_services"]?.trim()
      );
    }

    return true;
  };

  const handleNext = async () => {
    if (!validateCurrentStep()) {
      alert("Please complete all required fields.");
      return;
    }

    // If we're in combined Step 4, move between its sub-steps first
    if (step === 4 && subStep < 3) {
      setSubStep((prev) => prev + 1);
      return;
    }

    // If we're in long-text step (now step 5) and have more sub-questions
    if (step === 5 && subStep < step6Questions.length) {
      setSubStep((prev) => prev + 1);
      return;
    }

    // If we're at step 4 and subStep === 3, or step 5 completed, advance to next major step
    if (step < totalSteps) {
      setStep((prev) => prev + 1);
      setSubStep(1);
      return;
    }

    // final submit (step === totalSteps)
    console.log("FINAL FORM DATA:", formData);
    alert("Thank you! Your review has been submitted.");
  };

  const handleStepClick = (target: number) => {
    // allow going back freely, going forward only if current step valid
    if (target < step || validateCurrentStep()) {
      setStep(target);
      setSubStep(1);
    }
  };

  const getStepProgress = (num: number) => {
    if (num < step) return 100;
    if (num > step) return 0;

    // For combined step 4 show sub-step progress
    if (num === 4) return ((subStep - 1) / 3) * 100;

    // For multi-question long text step (now step 5)
    if (num === 5) return ((subStep - 1) / step6Questions.length) * 100;

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
