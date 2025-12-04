import { useState, useEffect } from "react";
import { commonPersonalFields } from "@/utils/onboarding";

interface FormField {
  id: string;
  name: string;
  label: string;
  fieldType: string;
  options?: { label: string; value: string | number | boolean }[] | null;
}

type FormDataValues = Record<string, any>;

/* -----------------------------------------
   NEW STEP 6 QUESTIONS (renamed from old step 7)
-------------------------------------------- */
const step6ExtraFieldList: FormField[] = [
  {
    id: "601",
    name: "overall_experience",
    label: "How was your overall experience with our creative team?",
    fieldType: "long",
  },
  {
    id: "602",
    name: "improvement_areas",
    label: "What areas do you think we can improve on?",
    fieldType: "long",
  },
  {
    id: "603",
    name: "final_message",
    label: "Any final message or suggestions for our team?",
    fieldType: "long",
  },
];

export function useOnboarding() {
  const [step, setStep] = useState<number>(1);
  const [subStep, setSubStep] = useState<number>(1);

  const [showSplash, setShowSplash] = useState<boolean>(true);

  const [formFields, setFormFields] = useState<FormField[]>([]);
  const [step6ExtraFields, setStep6ExtraFields] = useState<FormField[]>([]);

  const [formData, setFormData] = useState<FormDataValues>({});

  const [touchedStep2, setTouchedStep2] = useState<Record<string, boolean>>({});
  const [touchedStep6, setTouchedStep6] = useState<Record<string, boolean>>({});

  /* -----------------------------
     Load splash
  ----------------------------- */
  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  /* -----------------------------
     Load default fields
  ----------------------------- */
  useEffect(() => {
    setFormFields([...commonPersonalFields]);
    setStep6ExtraFields(step6ExtraFieldList);
  }, []);

  /* -----------------------------
     Updated Step Structure
     Step 7 Added
  ----------------------------- */
  const stepStructure: Record<number, number> = {
    1: 1,
    2: 1,
    3: 1,
    4: 1,
    5: 1,
    6: step6ExtraFields.length + 1, // intro + questions
    7: 1, // NEW STEP 7
  };

  const totalSteps = 7;

  /* -----------------------------
     Final Submit
  ----------------------------- */
  const handleSubmit = async (finalData: FormDataValues = formData) => {
    console.log("Final submission:", finalData);
    // Add API call here
  };

  /* -----------------------------
     Validation Rules
  ----------------------------- */
  const validateFields = (data: FormDataValues) => {
    if (step === 2) {
      const empty = formFields.filter((f) => !data[f.name] || String(data[f.name]).trim() === "");
      if (empty.length > 0) {
        alert("Please fill all required fields in Step 2");
        return false;
      }
    }

    if (step === 6) {
      const field = step6ExtraFields[subStep - 1];
      if (field) {
        const val = data[field.name];
        if (!val || String(val).trim() === "") {
          alert(`${field.label} is required`);
          return false;
        }
      }
    }

    return true;
  };

  const validateStep2Fields = (data: FormDataValues) => {
    const errors: Record<string, string> = {};
    formFields.forEach((field) => {
      if (!data[field.name] || String(data[field.name]).trim() === "") {
        errors[field.name] = `${field.label} is required`;
      }
    });
    return errors;
  };

  const validateStep6Field = (fieldName: string, value: string) => {
    const field = step6ExtraFields.find((f) => f.name === fieldName);
    if (!field) return "";
    if (!value || String(value).trim() === "") return `${field.label} is required`;
    return "";
  };

  const markStep2FieldTouched = (name: string) => {
    setTouchedStep2((prev) => ({ ...prev, [name]: true }));
  };

  const markAllStep2FieldsTouched = () => {
    const allTouched: any = {};
    formFields.forEach((f) => (allTouched[f.name] = true));
    setTouchedStep2(allTouched);
  };

  const markStep6FieldTouched = (name: string) => {
    setTouchedStep6((prev) => ({ ...prev, [name]: true }));
  };

  /* -----------------------------
     NEXT BUTTON LOGIC
  ----------------------------- */
  const handleNext = async (incoming?: FormDataValues) => {
    const updatedData = incoming ? { ...formData, ...incoming } : { ...formData };
    setFormData(updatedData);

    if (step !== 1 && !validateFields(updatedData)) return;

    // handle final multi-step text questions
    if (step === 6 && subStep === stepStructure[6]) {
      setStep(7); // go to step 7
      setSubStep(1);
      return;
    }

    if (step === 6 && subStep < stepStructure[6]) {
      setSubStep((prev) => prev + 1);
      return;
    }

    // move to next step
    if (step < totalSteps) {
      setStep((prev) => prev + 1);
      setSubStep(1);
    } else {
      await handleSubmit(updatedData);
    }
  };

  /* -----------------------------
     Step indicator click
  ----------------------------- */
  const handleStepClick = (target: number) => {
    if (!validateFields(formData)) return;
    setStep(target);
    setSubStep(1);
  };

  /* -----------------------------
     Progress
  ----------------------------- */
  const getStepProgress = (num: number) => {
    if (num < step) return 100;
    if (num > step) return 0;

    const totalSubs = stepStructure[num];
    if (totalSubs === 1) return 100;

    return (subStep / totalSubs) * 100;
  };

  /* -----------------------------
     Helpers
  ----------------------------- */
  const updateFormData = (updates: FormDataValues) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const stepSixQuestions = step6ExtraFields.map((f) => ({
    name: f.name,
    title: f.label,
    placeholder: f.label,
  }));

  return {
    step,
    subStep,
    showSplash,
    formFields,
    step6ExtraFields,
    formData,
    stepStructure,
    stepSixQuestions,
    touchedStep2,
    touchedStep6,
    handleNext,
    handleStepClick,
    getStepProgress,
    updateFormData,
    validateStep2Fields,
    validateStep6Field,
    markStep2FieldTouched,
    markAllStep2FieldsTouched,
    markStep6FieldTouched,
    handleSubmit,
  };
}
