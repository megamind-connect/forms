"use client";

import DynamicField from "@/components/client/DynamicFields";
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
    name: "overall_experience_rating",
    label: "How would you rate your overall experience with Megamind?",
    fieldType: "rating5",
  },
  {
    id: "rate2",
    name: "service_impact_rating",
    label: "How would you assess the impact and results of our services on your brand?",
    fieldType: "rating5",
  },
  {
    id: "rate3",
    name: "service_quality_rating",
    label: "Quality of services provided",
    fieldType: "rating5",
  },
  {
    id: "delivery_time",
    name: "delivery_time_option",
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
    name: "strategy_alignment_rating",
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
    name: "services_provided",
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
    id: "rate_s5_1",
    name: "goal_alignment_rating",
    label: "How well do our services align with your business goals this month?",
    fieldType: "rating5",
    options: [
      { value: 1, label: "Extremely well" },
      { value: 2, label: "" },
      { value: 3, label: "Neutral" },
      { value: 4, label: "" },
      { value: 5, label: "Extremely not well" },
    ],
  },
  {
    id: "rate_s5_2",
    name: "deadline_efficiency_rating",
    label: "How would you rate our ability to meet deadlines this month?",
    fieldType: "rating5",
    options: [
      { value: 1, label: "Never" },
      { value: 2, label: "" },
      { value: 3, label: "Sometimes" },
      { value: 4, label: "" },
      { value: 5, label: "Always" },
    ],
  },
  {
    id: "rate_s5_3",
    name: "feedback_understanding_rating",
    label: "Did we understand and incorporate your feedback?",
    fieldType: "rating5",
    options: [
      { value: 1, label: "Never" },
      { value: 2, label: "" },
      { value: 3, label: "Sometimes" },
      { value: 4, label: "" },
      { value: 5, label: "Always" },
    ],
  },
];


  // ----------------------------
  // Step 6 Fields (Previously Step 5)
  // ----------------------------
const step5Fields = [
  {
    id: "rate_s6_1",
    name: "marketing_results_rating",
    label: "How would you rate our digital marketing results?",
    fieldType: "rating5",
    options: [
      { value: 1, label: "Significant Results" },
      { value: 2, label: "" },
      { value: 3, label: "Moderate Results" },
      { value: 4, label: "" },
      { value: 5, label: "No Results" },
    ],
  },
  {
    id: "rate_s6_2",
    name: "brand_representation_rating",
    label: "How well does our content represent your brand?",
    fieldType: "rating5",
    options: [
      { value: 1, label: "Excellent" },
      { value: 2, label: "" },
      { value: 3, label: "Average" },
      { value: 4, label: "" },
      { value: 5, label: "Very Poor" },
    ],
  },
  {
    id: "rate_s6_3",
    name: "responsiveness_rating",
    label: "How well did our team respond to your enquiries?",
    fieldType: "rating5",
    options: [
      { value: 1, label: "Extremely Responsive" },
      { value: 2, label: "" },
      { value: 3, label: "Neutral" },
      { value: 4, label: "" },
      { value: 5, label: "Very Slow" },
    ],
  },
];


  // ----------------------------
  // Step 8 Fields (Final Step)
  // ----------------------------
const step7Fields = [
  {
    id: "rate_s8_1",
    name: "service_continuation_rating",
    label: "How likely are you to continue using our service?",
    fieldType: "rating5",
    options: [
      { value: 1, label: "Definitely yes" },
      { value: 2, label: "" },
      { value: 3, label: "Not sure" },
      { value: 4, label: "" },
      { value: 5, label: "Definitely not" },
    ],
  },
  {
    id: "rate_s8_2",
    name: "recommendation_likelihood_rating",
    label: "How likely are you to recommend Megamind?",
    fieldType: "rating5",
    options: [
      { value: 1, label: "Definitely yes" },
      { value: 2, label: "" },
      { value: 3, label: "Not sure" },
      { value: 4, label: "" },
      { value: 5, label: "Definitely not" },
    ],
  },
  {
    id: "feedback_final",
    name: "final_feedback_text",
    label: "Any comments or suggestions for improvement?",
    fieldType: "textarea",
    placeholder: "Enter your suggestions…",
  },
];


  return (
    <div className="relative min-h-screen !bg-[#FFFBFB] flex flex-col py-10 justify-center overflow-hidden">
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
              title="Your Experience Matters to Us"
              description="Tell us how the journey felt for you. Your perspective helps us refine our process, strengthen collaboration, and ensure every future interaction is smoother, clearer, and more rewarding."
              onNext={handleNext}
              buttonClassName="!bg-[#E31313] !text-lg text-white !font-bold"
            />
          )}

          {/* STEP 4 (OLD STEP 3) */}
          {step === 4 && (
            <div className="px-4 max-w-2xl pb-3 mx-auto md:px-0">
              <h2 className="text-[32px] font-medium text-primary mt-4 mb-6">Overall Experience </h2>
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
                Next &gt;
              </Button>
            </div>
          )}

          {/* STEP 5 (OLD STEP 4) */}
          {step === 5 && (
            <div className="px-4 max-w-2xl mx-auto md:px-0">
              <h2 className="text-[32px] font-medium text-primary mt-4 mb-6">Services Provided </h2>
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
                Next &gt;
              </Button>
            </div>
          )}

          {/* STEP 6 (OLD STEP 5) */}
          {step === 6 && (
            <div className="px-4 max-w-2xl  mx-auto md:px-0">
              <h2 className="text-[32px] font-medium text-primary mt-4 mb-6">Service Performance </h2>
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
                Next &gt;
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
              <h2 className="text-[32px] font-medium text-primary mt-4 mb-6">Scope for Improvement</h2>
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
                Submit
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
