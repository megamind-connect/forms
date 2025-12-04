"use client";

import DynamicField from "@/components/client/DynamicFlieds";
import { IntroStep } from "@/components/client/IntroStep";
import { SplashScreen } from "@/components/client/SplashScreen";
import { Step2Form } from "@/components/client/Step2Form";
import { StepIndicator } from "@/components/client/StepIndicator";
import { StepTextQuestion } from "@/components/client/StepTextQuestion";
import { useOnboarding } from "@/components/hooks/useOnboarding";
import { Button } from "@/components/ui/Button";

/* -----------------------------------------
   STEP 3 FIELDS
-------------------------------------------- */
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

/* -----------------------------------------
   STEP 4 FIELDS
-------------------------------------------- */
const step4Fields = [
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
    id: "14",
    name: "creative_strength_text",
    label: "What creative strength do you appreciate most in this team member?",
    fieldType: "short",
  },
];

/* -----------------------------------------
   STEP 5 FIELDS
-------------------------------------------- */
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
    id: "2",
    name: "on_time_delivery_rating",
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

/* -----------------------------------------
   STEP 7 FIELDS (NEW)
-------------------------------------------- */
const step7Fields = [
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
    id: "2",
    name: "on_time_delivery_rating",
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

export default function ClientPage() {
  const {
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
  } = useOnboarding();

  /* -----------------------------------------
     Updated dynamicSteps to include Step 7
  -------------------------------------------- */
  const dynamicSteps = [step3Fields, step4Fields, step5Fields, step7Fields];

  return (
    <div className="relative min-h-screen max-w-3xl mx-auto flex flex-col justify-center overflow-hidden">
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
              onNext={() => handleNext()}
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
              validateFields={validateStep2Fields}
              touched={touchedStep2}
              markFieldTouched={markStep2FieldTouched}
              markAllFieldsTouched={markAllStep2FieldsTouched}
            />
          )}

          {/* STEP 3,4,5,7 — dynamic field steps */}
          {step >= 3 && step <= 7 && step !== 6 && (
            <>
              {dynamicSteps[step - 3].map((field) => (
                <DynamicField
                  key={field.id}
                  field={field}
                  value={formData[field.name] ?? ""}
                  onChange={(val) => updateFormData({ [field.name]: val })}
                />
              ))}

              <Button
                onClick={() => handleNext()}
                className="!bg-[#FFFBFB] !text-red !border-red border !text-lg px-6 w-full max-w-lg mx-auto"
              >
                Next
              </Button>
            </>
          )}

          {/* STEP 6 – multi text question step */}
          {step === 6 && (
            <StepTextQuestion
              question={stepSixQuestions[subStep - 1]}
              onNext={handleNext}
              isLast={subStep === stepStructure[6]}
              value={String(formData[step6ExtraFields[subStep - 1].name] ?? "")}
              updateFormData={updateFormData}
              validateField={validateStep6Field}
              isTouched={touchedStep6[step6ExtraFields[subStep - 1].name] || false}
              markFieldTouched={markStep6FieldTouched}
            />
          )}
        </>
      )}
    </div>
  );
}
