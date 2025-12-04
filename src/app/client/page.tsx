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

  // ----------------------------
  // Step 4 Fields (Previously Step 3)
  // ----------------------------
  const step3Fields = [
    {
      id: "rate1",
      name: "team_rating10",
      label: "How would you rate your overall experience with Megamind? ",
      fieldType: "rating5",
    },
    {
      id: "rate2",
      name: "team_rating1",
      label: "How would you assess the impact and results of our services on your brand?",
      fieldType: "rating5",
    },
    {
      id: "rate3",
      name: "team_rating2",
      label: "Quality of services provided ",
      fieldType: "rating5",
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
      id: "rate5",
      name: "team_rating4",
      label: "How would you rate our Brand Strategy in terms of aligning with your business?",
      fieldType: "rating5",
      options: [
        { value: 1, label: "Not Aligned" },
        { value: 2, label: "" },
        { value: 3, label: "Moderately Aligned" },
        { value: 4, label: "" },
        { value: 5, label: "Perfectly Aligned" },
      ],
    },
  ];

  // ----------------------------
  // Step 5 Fields (Previously Step 4)
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
      id: "rate5",
      name: "team_rating4114",
      label: "How would you rate our Brand Strategy in terms of aligning with your business?",
      fieldType: "rating5",
      options: [
        { value: 1, label: "Not Aligned" },
        { value: 2, label: "" },
        { value: 3, label: "Moderately Aligned" },
        { value: 4, label: "" },
        { value: 5, label: "Perfectly Aligned" },
      ],
    },
    {
      id: "rate5",
      name: "team_rating411",
      label: "How would you rate our Brand Strategy in terms of aligning with your business?",
      fieldType: "rating5",
      options: [
        { value: 1, label: "Not Aligned" },
        { value: 2, label: "" },
        { value: 3, label: "Moderately Aligned" },
        { value: 4, label: "" },
        { value: 5, label: "Perfectly Aligned" },
      ],
    },
    {
      id: "rate5",
      name: "team_rating41132",
      label: "How would you rate our Brand Strategy in terms of aligning with your business?",
      fieldType: "rating5",
      options: [
        { value: 1, label: "Not Aligned" },
        { value: 2, label: "" },
        { value: 3, label: "Moderately Aligned" },
        { value: 4, label: "" },
        { value: 5, label: "Perfectly Aligned" },
      ],
    },
  ];

  // ----------------------------
  // Step 6 Fields (Previously Step 5)
  // ----------------------------
  const step5Fields = [
    {
      id: "rate5",
      name: "team_ratreing4114",
      label: "How would you rate our Brand Strategy in terms of aligning with your business?",
      fieldType: "rating5",
      options: [
        { value: 1, label: "Not Aligned" },
        { value: 2, label: "" },
        { value: 3, label: "Moderately Aligned" },
        { value: 4, label: "" },
        { value: 5, label: "Perfectly Aligned" },
      ],
    },
    {
      id: "rate5",
      name: "team_rrewating411",
      label: "How would you rate our Brand Strategy in terms of aligning with your business?",
      fieldType: "rating5",
      options: [
        { value: 1, label: "Not Aligned" },
        { value: 2, label: "" },
        { value: 3, label: "Moderately Aligned" },
        { value: 4, label: "" },
        { value: 5, label: "Perfectly Aligned" },
      ],
    },
    {
      id: "rate5",
      name: "team_rarewrting41132",
      label: "How would you rate our Brand Strategy in terms of aligning with your business?",
      fieldType: "rating5",
      options: [
        { value: 1, label: "Not Aligned" },
        { value: 2, label: "" },
        { value: 3, label: "Moderately Aligned" },
        { value: 4, label: "" },
        { value: 5, label: "Perfectly Aligned" },
      ],
    },
  ];

  // ----------------------------
  // Step 8 Fields (Final Step)
  // ----------------------------
  const step7Fields = [
    {
      id: "rate5",
      name: "team_rrewating411",
      label: "How would you rate our Brand Strategy in terms of aligning with your business?",
      fieldType: "rating5",
      options: [
        { value: 1, label: "Not Aligned" },
        { value: 2, label: "" },
        { value: 3, label: "Moderately Aligned" },
        { value: 4, label: "" },
        { value: 5, label: "Perfectly Aligned" },
      ],
    },
    {
      id: "rate5",
      name: "team_rarewrting41132",
      label: "How would you rate our Brand Strategy in terms of aligning with your business?",
      fieldType: "rating5",
      options: [
        { value: 1, label: "Not Aligned" },
        { value: 2, label: "" },
        { value: 3, label: "Moderately Aligned" },
        { value: 4, label: "" },
        { value: 5, label: "Perfectly Aligned" },
      ],
    },
    {
      id: "feedback",
      name: "feedback",
      label: "Write your detailed feedback",
      fieldType: "textarea",
      placeholder: "Start typing...",
    },
  ];

  return (
    <div className="relative min-h-screen !bg-[#FFFBFB] flex flex-col justify-center overflow-hidden">
      {showSplash ? (
        <SplashScreen />
      ) : (
        <>
          {/* Step Progress Indicator */}
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
              title="Your Insights Shape the Work"
              description="This form gathers your clear, upfront inputs so we understand what worked, what didn’t, and where you want the creative to go next."
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

          {/* ✅ NEW STEP 3 */}
          {step === 3 && (
            <IntroStep
              img="/images/steps/2.png"
              title="Your Insights Shape the Work"
              description="This form gathers your , what didn’t, and where you want the creative to go next."
              onNext={handleNext}
              buttonClassName="!bg-[#E31313] !text-lg text-white !font-bold"
            />
          )}

          {/* STEP 4 (OLD STEP 3) */}
          {step === 4 && (
            <div className="px-4 max-w-2xl mx-auto md:px-0">
              <h2 className="text-[32px] font-medium text-primary my-4">General Information</h2>
              {step3Fields.map((field) => (
                <DynamicField
                  key={field.id}
                  field={field}
                  value={formData[field.name] || ""}
                  onChange={(val) => updateFormData({ [field.name]: val })}
                />
              ))}
              <Button
                onClick={handleNext}
                className="!bg-[#FFFBFB] !text-red border-red border !text-lg w-full max-w-2xl mx-auto"
              >
                Next
              </Button>
            </div>
          )}

          {/* STEP 5 (OLD STEP 4) */}
          {step === 5 && (
            <div className="px-4 max-w-2xl mx-auto md:px-0">
              <h2 className="text-[32px] font-medium text-primary my-4">General Information</h2>
              {step4Fields.map((field) => (
                <DynamicField
                  key={field.id}
                  field={field}
                  value={formData[field.name] || ""}
                  onChange={(val) => updateFormData({ [field.name]: val })}
                />
              ))}
              <Button
                onClick={handleNext}
                className="!bg-[#FFFBFB] !text-red border-red border !text-lg w-full max-w-2xl mx-auto"
              >
                Next
              </Button>
            </div>
          )}

          {/* STEP 6 (OLD STEP 5) */}
          {step === 6 && (
            <div className="px-4 max-w-2xl mx-auto md:px-0">
              <h2 className="text-[32px] font-medium text-primary my-4">General Information</h2>
              {step5Fields.map((field) => (
                <DynamicField
                  key={field.id}
                  field={field}
                  value={formData[field.name] || ""}
                  onChange={(val) => updateFormData({ [field.name]: val })}
                />
              ))}
              <Button
                onClick={handleNext}
                className="!bg-[#FFFBFB] !text-red border-red border !text-lg w-full max-w-2xl mx-auto"
              >
                Next
              </Button>
            </div>
          )}

          {/* STEP 7 (OLD STEP 6 – long text questions) */}
          {step === 7 && (
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

          {/* STEP 8 (OLD STEP 7 – final review) */}
          {step === 8 && (
            <div className="px-4 max-w-2xl mx-auto md:px-0 space-y-8">
              <h2 className="text-[32px] font-medium text-primary my-4">General Information</h2>
              {step7Fields.map((field) => (
                <DynamicField
                  key={field.id}
                  field={field}
                  value={formData[field.name] || ""}
                  onChange={(val) => updateFormData({ [field.name]: val })}
                />
              ))}
              <Button
                onClick={handleNext}
                className="!bg-[#FFFBFB] !text-red border-red border !text-lg w-full max-w-2xl mx-auto"
              >
                Submit Review
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
