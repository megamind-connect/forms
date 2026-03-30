"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  vendorStep1Fields,
  vendorStep2Fields,
  vendorStep3Fields,
  vendorStep4Fields,
  vendorStep5Fields,
  vendorStep6Fields,
} from "@/utils/vendorOnboarding";
import toast from "react-hot-toast";

type FormData = Record<string, any>;

export function useVendorOnboarding() {
  const params = useParams();
  const router = useRouter();
  const vendorId = params?.id as string;

  const [step, setStep] = useState(1);
  const [showSplash, setShowSplash] = useState(true);
  const [formData, setFormData] = useState<FormData>({});
  
  // Touched states for each step
  const [touchedSteps, setTouchedSteps] = useState<Record<number, Record<string, boolean>>>({
    2: {}, 3: {}, 4: {}, 5: {}, 6: {}, 7: {}
  });

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const stepStructure: Record<number, number> = {
    1: 1, // Intro
    2: 1, // Step 1
    3: 1, // Step 2
    4: 1, // Step 3
    5: 1, // Step 4
    6: 1, // Step 5
    7: 1, // Step 6
  };

  const totalSteps = 7;

  const validateFields = (fields: any[]) => {
    const errors: Record<string, string> = {};
    fields.forEach((field) => {
      const value = formData[field.name];
      
      // Required check
      if (!field.optional) {
        if (!value || (typeof value === "string" && !value.trim())) {
          errors[field.name] = "This field is required";
          return;
        }
      }

      // Email validation
      if (field.fieldType === "email" && value && typeof value === "string") {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(value)) {
          errors[field.name] = "Please enter a valid email address (e.g., mail@example.com)";
        }
      }
    });
    return errors;
  };

  const getFieldsForStep = (s: number) => {
    switch (s) {
      case 2: return vendorStep1Fields;
      case 3: return vendorStep2Fields;
      case 4: return vendorStep3Fields;
      case 5: return vendorStep4Fields;
      case 6: return vendorStep5Fields;
      case 7: return vendorStep6Fields;
      default: return [];
    }
  };

  const validateCurrentStep = () => {
    if (step === 1) return true;
    const fields = getFieldsForStep(step);
    const errors = validateFields(fields);
    
    if (Object.keys(errors).length > 0) {
      // Mark all fields in current step as touched
      const newTouched = { ...touchedSteps[step] };
      fields.forEach(f => newTouched[f.name] = true);
      setTouchedSteps(prev => ({ ...prev, [step]: newTouched }));
      return false;
    }
    return true;
  };

  const handleNext = async () => {
    if (!validateCurrentStep()) {
      toast.error("Please complete all required fields.");
      return;
    }

    if (step === totalSteps) {
      // Final Submit
      toast.success("Thank you! Vendor onboarding information submitted.");
      // Redirect or reset
      return;
    }

    setStep((prev) => prev + 1);
  };

  const handleStepClick = (target: number) => {
    if (target < step || validateCurrentStep()) {
      setStep(target);
    }
  };

  const updateFormData = (updates: FormData) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const markFieldTouched = (stepNum: number, name: string) => {
    setTouchedSteps(prev => ({
      ...prev,
      [stepNum]: { ...prev[stepNum], [name]: true }
    }));
  };

  const markAllFieldsTouched = (stepNum: number) => {
    const fields = getFieldsForStep(stepNum);
    const newTouched = fields.reduce((acc, f) => ({ ...acc, [f.name]: true }), {});
    setTouchedSteps(prev => ({ ...prev, [stepNum]: newTouched }));
  };

  return {
    step,
    showSplash,
    formData,
    stepStructure,
    totalSteps,
    touchedSteps,
    vendorStep1Fields,
    vendorStep2Fields,
    vendorStep3Fields,
    vendorStep4Fields,
    vendorStep5Fields,
    vendorStep6Fields,
    handleNext,
    handleStepClick,
    updateFormData,
    markFieldTouched,
    markAllFieldsTouched,
    getStepProgress: (num: number) => (num < step ? 100 : num === step ? 50 : 0),
    validateFields,
  };
}
