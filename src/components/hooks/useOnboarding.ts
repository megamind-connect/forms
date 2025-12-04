import { useState, useEffect } from "react";
import { commonPersonalFields } from "@/utils/onboarding";

type FormData = Record<string, any>;

const step6Questions = [
  {
    image: "/images/steps/3.png",
    name: "pleasant_surprise",
    title: "Were any deliverables a pleasant surprise?",
    placeholder:
      "If Yes , we would love to know which ones and what made them stand out for you. ",
  },
  {
    image: "/images/steps/4.png",
    name: "experience_description",
    title: "How would you describe your overall experience with our team?",
    placeholder: "Please specify any areas where we fell short",
  },
  {
    image: "/images/steps/5.png",
    name: "additional_services",
    title:
      "Are there any additional services or improvements you would like to see in the coming months?",
    placeholder:
      "If Yes , we would love to know which ones and what made them stand out for you.",
  },
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

  // Step config
  const stepStructure: Record<number, number> = {
    1: 1,
    2: 1,
    3: 1,
    4: 3,
    5: step6Questions.length,
    6: 1,
  };

  const totalSteps = 6;

  // ---------------------------
  // VALIDATION
  // ---------------------------
  const validateCurrentStep = () => {
    if (step === 2) {
      const missing = formFields.filter((f) => !formData[f.name]);
      return missing.length === 0;
    }

    if (step === 4) {
      if (subStep === 1) {
        const required = [
          "overall_experience_rating",
          "service_impact_rating",
          "service_quality_rating",
          "delivery_time_option",
          "strategy_alignment_rating",
        ];
        return required.every((f) => !!formData[f]);
      }

      if (subStep === 2) {
        const services = formData["services_provided"];
        if (!services || !services.list || services.list.length === 0)
          return false;

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

  // ---------------------------
  // HANDLE NEXT
  // ---------------------------
  const handleNext = async () => {
    if (!validateCurrentStep()) {
      alert("Please complete all required fields.");
      return;
    }

    // Handle substeps for step 4
    if (step === 4 && subStep < 3) {
      setSubStep((prev) => prev + 1);
      return;
    }

    // Handle long text questions (step 5)
    if (step === 5 && subStep < step6Questions.length) {
      setSubStep((prev) => prev + 1);
      return;
    }

    // Final step → SUBMIT
    if (step === totalSteps) {
      const payload = {
        name: formData.name,
        brand_name: formData.organisation_name,
        position_role: formData.role_in_organisation,

        overall_experience: formData.overall_experience_rating,
        impact_assessment: formData.service_impact_rating,
        quality_of_services: formData.service_quality_rating,
        delivery_time: formData.delivery_time_option,
        brand_strategy_alignment: formData.strategy_alignment_rating,

        services_provided: formData.services_provided?.list || [],

        services_align_with_goals: formData.goal_alignment_rating,
        meet_deadlines_rating: formData.deadline_efficiency_rating,
        feedback_understood_rating: formData.feedback_understanding_rating,

        digital_marketing_results: formData.marketing_results_rating,
        content_creation_rating: formData.brand_representation_rating,
        team_responsiveness: formData.responsiveness_rating,

        surprised_deliverables: formData.pleasant_surprise,
        working_relationship_description: formData.experience_description,
        additional_services_improvements: formData.additional_services,
other_service_description: formData.services_provided?.other_service_description || "",

        likelihood_to_continue: formData.service_continuation_rating,
        likelihood_to_recommend:
          formData.recommendation_likelihood_rating,

        other_comments: formData.final_feedback_text,
      };

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/client-feedback`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!res.ok) throw new Error("Failed to submit");

        alert("Thank you! Your feedback has been submitted.");
        console.log("SUBMITTED PAYLOAD:", payload);
      } catch (err) {
        console.error(err);
        alert("Something went wrong. Please try again.");
      }

      return;
    }

    // Move to next major step
    if (step < totalSteps) {
      setStep((prev) => prev + 1);
      setSubStep(1);
      return;
    }
  };

  // ---------------------------
  // STEP CLICK NAVIGATION
  // ---------------------------
  const handleStepClick = (target: number) => {
    if (target < step || validateCurrentStep()) {
      setStep(target);
      setSubStep(1);
    }
  };

  // ---------------------------
  // STEP PROGRESS (Visual)
  // ---------------------------
  const getStepProgress = (num: number) => {
    if (num < step) return 100;
    if (num > step) return 0;

    if (num === 4) return ((subStep - 1) / 3) * 100;

    if (num === 5)
      return ((subStep - 1) / step6Questions.length) * 100;

    return 100;
  };

  // ---------------------------
  // HELPERS
  // ---------------------------
  const updateFormData = (updates: FormData) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const markStep2FieldTouched = (name: string) => {
    setTouchedStep2((prev) => ({ ...prev, [name]: true }));
  };

  const markAllStep2FieldsTouched = () => {
    const touched = formFields.reduce(
      (acc, f) => ({ ...acc, [f.name]: true }),
      {}
    );
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
