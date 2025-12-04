"use client";


import DynamicField from "@/components/client/DynamicFlieds";
import { IntroStep } from "@/components/client/IntroStep";
import { SplashScreen } from "@/components/client/SplashScreen";
import { Step2Form } from "@/components/client/Step2Form";
import { StepIndicator } from "@/components/client/StepIndicator";
import { StepTextQuestion } from "@/components/client/StepTextQuestion";
import { useOnboarding } from "@/components/hooks/useOnboarding";
import { Button } from "@/components/ui/Button";

export default function ClientPage() {
  const {
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
  } = useOnboarding();

  // Dynamic fields per step (Step 3 → index 0, Step 4 → 1, etc.)
// ----------------------------
// Step 3 Fields
// ----------------------------
const step3Fields = [
  {
    id: "100",
    name: "delivery_time",
    label: "Delivery Time of Services",
    fieldType: "dropdownselect",
    options: [
      { label: "Within 24 Hours", value: "24h" },
      { label: "1–3 Days", value: "1_3_days" },
      { label: "3–7 Days", value: "3_7_days" },
      { label: "More than a week", value: "1_week_plus" },
    ],
  },
  {
    id: "2",
    name: "on_time_delivery_rating",
    label: "Do they deliver tasks on time without compromising on creative quality?",
    fieldType: "dropdown",
    options: [
      { label: "Always", value: "always" },
      { label: "Mostly", value: "mostly" },
      { label: "Sometimes", value: "sometimes" },
      { label: "Often miss both", value: "often_miss_both" },
    ],
  },
  {
    id: "200",
    name: "services_provided",
    label: "Which service(s) did we provide for you?",
    fieldType: "checkbox_group",
    options: [
      { label: "Graphic Design", value: "graphic_design" },
      { label: "PPC (Pay-Per-Click Advertising)", value: "ppc" },
      { label: "Video Shoot / Production", value: "video_shoot" },
      { label: "Video Editing", value: "video_editing" },
      { label: "Social Media Management", value: "smm" },
      { label: "Social Media Marketing", value: "smm_marketing" },
      { label: "Others…", value: "others" },
    ],
  },
  {
    id: "14",
    name: "creative_strength_text",
    label: "What creative strength do you appreciate most in this team member?",
    fieldType: "short",
  },
];

// ----------------------------
// Step 4 Fields
// ----------------------------
const step4Fields = [
  {
    id: "200b",
    name: "services_provided_step4",
    label: "Which service(s) did we provide for you?",
    fieldType: "checkbox_group",
    options: [
      { label: "Graphic Design", value: "graphic_design" },
      { label: "PPC", value: "ppc" },
      { label: "Video Shoot / Production", value: "video_shoot" },
      { label: "Video Editing", value: "video_editing" },
      { label: "Social Media Management", value: "smm" },
      { label: "Social Media Marketing", value: "smm_marketing" },
      { label: "Others…", value: "others" },
    ],
  },
  {
    id: "100b",
    name: "delivery_time_step4",
    label: "Delivery Time of Services",
    fieldType: "dropdownselect",
    options: [
      { label: "Within 24 Hours", value: "24h" },
      { label: "1–3 Days", value: "1_3_days" },
      { label: "3–7 Days", value: "3_7_days" },
      { label: "More than a week", value: "1_week_plus" },
    ],
  },
  {
    id: "14b",
    name: "creative_strength_text_step4",
    label: "What creative strength do you appreciate most?",
    fieldType: "short",
  },
];

// ----------------------------
// Step 5 Fields
// ----------------------------
const step5Fields = [
  {
    id: "1",
    name: "understands_brief_rating",
    label: "Does the team member understand the brief clearly?",
    fieldType: "dropdown",
    options: [
      { label: "Always", value: "always" },
      { label: "Often", value: "often" },
      { label: "Sometimes", value: "sometimes" },
      { label: "Rarely", value: "rarely" },
    ],
  },
  {
    id: "2b",
    name: "on_time_delivery_rating_step5",
    label: "Do they deliver tasks on time?",
    fieldType: "dropdown",
    options: [
      { label: "Always", value: "always" },
      { label: "Mostly", value: "mostly" },
      { label: "Sometimes", value: "sometimes" },
      { label: "Often miss both", value: "often_miss_both" },
    ],
  },
];

// ----------------------------
// Step 7 Fields (Final Step)
// ----------------------------
const step7Fields = [
  {
    id: "701",
    name: "recommendation_rating",
    label: "How likely are you to recommend us to a friend or colleague?",
    fieldType: "dropdown",
    options: [
      { label: "Very Likely", value: "10" },
      { label: "Likely", value: "8" },
      { label: "Neutral", value: "5" },
      { label: "Unlikely", value: "2" },
    ],
  },
  {
    id: "702",
    name: "future_projects",
    label: "Do you have any upcoming projects we can help with?",
    fieldType: "dropdownselect",
    options: [
      { label: "Yes, immediately", value: "yes_now" },
      { label: "Yes, in a few months", value: "yes_later" },
      { label: "Not at the moment", value: "no" },
    ],
  },
];


  return (
    <div className="relative min-h-screen !bg-[#FFFBFB]  flex flex-col justify-center overflow-hidden">
      {showSplash ? (
        <SplashScreen />
      ) : (
        <>
          <StepIndicator
            step={step}
            stepStructure={stepStructure}
            getStepProgress={getStepProgress}
            handleStepClick={handleStepClick}
          />

          {/* STEP 1 */}
          {step === 1 && (
            <IntroStep
              img="/images/steps/1.png"
              title="Let's Start With the Essentials"
              description="This form gathers your clear, upfront inputs..."
              onNext={handleNext}
              buttonClassName="!bg-[#E31313] !text-lg text-white !font-bold"
            />
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <Step2Form
              formFields={formFields}
              formData={formData}
              onNext={handleNext}
              updateFormData={updateFormData}
              validateFields={validateCurrentStep}
              touched={touchedStep2}
              markFieldTouched={markStep2FieldTouched}
              markAllFieldsTouched={markAllStep2FieldsTouched}
            />
          )}

          {/* STEP 3–5 & 7 – Dynamic Fields */}
     {step === 3 && (
  <div className=" px-4 max-w-2xl mx-auto md:px-0">
    <h2 className="text-[32px] font-medium text-primary my-4">General Information</h2>
    {step3Fields.map((field) => (
      <DynamicField
        key={field.id}
        field={field}
        value={formData[field.name] || ""}
        onChange={(val) => updateFormData({ [field.name]: val })}
      />
    ))}
    <Button onClick={handleNext} className="!bg-[#FFFBFB] !text-red border-red border !text-lg w-full max-w-2xl mx-auto">
      Next
    </Button>
  </div>
)}

{step === 4 && (
  <div className=" px-4 md:px-0">
    <h2 className="text-[32px] font-medium text-primary my-4">General Information</h2>
    {step4Fields.map((field) => (
      <DynamicField
        key={field.id}
        field={field}
        value={formData[field.name] || ""}
        onChange={(val) => updateFormData({ [field.name]: val })}
      />
    ))}
    <Button onClick={handleNext} className="!bg-[#FFFBFB] !text-red border-red border !text-lg w-full max-w-lg mx-auto">
      Next
    </Button>
  </div>
)}

{step === 5 && (
  <div className=" px-4 md:px-0">
    <h2 className="text-[32px] font-medium text-primary my-4">General Information</h2>
    {step5Fields.map((field) => (
      <DynamicField
        key={field.id}
        field={field}
        value={formData[field.name] || ""}
        onChange={(val) => updateFormData({ [field.name]: val })}
      />
    ))}
    <Button onClick={handleNext} className="!bg-[#FFFBFB] !text-red border-red border !text-lg w-full max-w-lg mx-auto">
      Next
    </Button>
  </div>
)}

{step === 7 && (
  <div className="space-y-8 px-4 md:px-0">
    <h2 className="text-[32px] font-medium text-primary my-4">General Information</h2>
    {step7Fields.map((field) => (
      <DynamicField
        key={field.id}
        field={field}
        value={formData[field.name] || ""}
        onChange={(val) => updateFormData({ [field.name]: val })}
      />
    ))}
    <Button onClick={handleNext} className="!bg-[#FFFBFB] !text-red border-red border !text-lg w-full max-w-lg mx-auto">
      Submit Review
    </Button>
  </div>
)}

          {/* STEP 6 – Long Text Questions */}
          {step === 6 && (
            <StepTextQuestion
              question={step6Questions[subStep - 1]}
              onNext={handleNext}
              
              value={formData[step6Questions[subStep - 1].name] || ""}
              updateFormData={updateFormData}
              validateField={() => ""}
              isTouched={touchedStep6[step6Questions[subStep - 1].name] || false}
              markFieldTouched={markStep6FieldTouched}
            />
          )}
        </>
      )}
    </div>
  );
}