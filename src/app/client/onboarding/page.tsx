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
    generalFormFields,
    financialFields,
    contactFormFields,
    brandIdFields,
    marketFields,
    scopeFields,
    socialFields,
    assetFields,
    websiteFields,
    accountFields,
    businessVerificationFields,
    formData,
    step6Questions, // Old Step 5
    stepStructure,
    touchedStep2,
    touchedStep3,
    touchedStep4,
    touchedStep6,
    touchedStep7,
    touchedStep8,
    touchedStep9,
    touchedStep11,
    touchedStep13,
    touchedStep15,
    touchedStep16,
    handleNext,
    handleStepClick,
    getStepProgress,
    updateFormData,
    validateCurrentStep,
    validateStep2Fields,
    validateStep3Fields,
    validateStep4Fields,
    validateStep6Fields,
    validateStep7Fields,
    validateStep8Fields,
    validateStep9Fields,
    validateStep11Fields,
    validateStep13Fields,
    validateStep15Fields,
    validateStep16Fields,
    markStep2FieldTouched,
    markStep3FieldTouched,
    markStep4FieldTouched,
    markStep6FieldTouched,
    markStep7FieldTouched,
    markStep8FieldTouched,
    markStep9FieldTouched,
    markStep11FieldTouched,
    markStep13FieldTouched,
    markStep15FieldTouched,
    markStep16FieldTouched,
    markAllStep2FieldsTouched,
    markAllStep3FieldsTouched,
    markAllStep4FieldsTouched,
    markAllStep6FieldsTouched,
    markAllStep7FieldsTouched,
    markAllStep8FieldsTouched,
    markAllStep9FieldsTouched,
    markAllStep11FieldsTouched,
    markAllStep13FieldsTouched,
    markAllStep15FieldsTouched,
    markAllStep16FieldsTouched,
    socialAccessFields,
  } = useOnboarding();

  // ----------------------------
  // Step 6 Sub-steps (Previously Step 4) - OLD FLOW ONLY
  // ----------------------------
  const step6FieldSub1 = [
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
        { label: "Very Late", value: "very_late" },
        { label: "Late", value: "late" },
        { label: "On Time (Occasionally Late)", value: "on_time_occasionally_late" },
        { label: "On Time", value: "on_time" },
        { label: "Mostly On Time", value: "mostly_on_time" },
        { label: "Always On Time", value: "always_on_time" },
      ],
    },
    {
      id: "rate5",
      name: "strategy_alignment_rating",
      label: "How would you rate our Brand Strategy in terms of aligning with your business?",
      fieldType: "rating5",
      options: [
        { value: "not_aligned", label: "Not Aligned" },
        { value: "slightly_aligned", label: "" },
        { value: "moderately_aligned", label: "Moderately Aligned" },
        { value: "well_aligned", label: "" },
        { value: "perfectly_aligned", label: "Perfectly Aligned" },
      ],
    },
  ];

  const step6FieldSub2 = [
    {
      id: "200b",
      name: "services_provided",
      label: "Which service(s) did we provide for you?",
      fieldType: "checkbox_group",
      options: [
        { label: "Graphic Design", value: "graphic_design" },
        { label: "PPC", value: "ppc" },
        { label: "Video Shoot / Production", value: "video_shoot_production" },
        { label: "Video Editing", value: "video_editing" },
        { label: "Social Media Management", value: "social_media_management" },
        { label: "Social Media Marketing", value: "social_media_marketing" },
        { label: "Website Development", value: "website_development" },
        { label: "Software Development", value: "software_development" },
        { label: "Others…", value: "other" },
      ],
    },
    {
      id: "rate_s5_1",
      name: "goal_alignment_rating",
      label: "How well do our services align with your business goals this month?",
      fieldType: "rating5",
      options: [
        { value: "extremely_well", label: "Extremely well" },
        { value: "somewhat_well", label: "" },
        { value: "neutral", label: "Neutral" },
        { value: "somewhat_not_well", label: "" },
        { value: "extremely_not_well", label: "Extremely not well" },
      ],
    },
    {
      id: "rate_s5_2",
      name: "deadline_efficiency_rating",
      label: "How would you rate our ability to meet deadlines this month?",
      fieldType: "rating5",
      options: [
        { value: "never", label: "Never" },
        { value: "rarely", label: "" },
        { value: "sometimes", label: "Sometimes" },
        { value: "usually", label: "" },
        { value: "always", label: "Always" },
      ],
    },
    {
      id: "rate_s5_3",
      name: "feedback_understanding_rating",
      label: "Do you feel your feedback and requests were understood?",
      fieldType: "rating5",
      options: [
        { value: "never", label: "Never" },
        { value: "rarely", label: "" },
        { value: "sometimes", label: "Sometimes" },
        { value: "usually", label: "" },
        { value: "always", label: "Always" },
      ],
    },
  ];

  const step6FieldSub3 = [
    {
      id: "rate_s6_1",
      name: "marketing_results_rating",
      label: "How would you rate our digital marketing results?",
      fieldType: "rating5",
      options: [
        { value: "significant_results", label: "Significant Results" },
        { value: "strong_results", label: "" },
        { value: "moderate_results", label: "Moderate Results" },
        { value: "minimal_results", label: "" },
        { value: "no_results", label: "No Results" },
      ],
    },
    {
      id: "rate_s6_2",
      name: "brand_representation_rating",
      label: "How well does our content represent your brand?",
      fieldType: "rating5",
      options: [
        { value: "excellent", label: "Excellent" },
        { value: "good", label: "" },
        { value: "average", label: "Average" },
        { value: "poor", label: "" },
        { value: "very_poor", label: "Very Poor" },
      ],
    },
    {
      id: "rate_s6_3",
      name: "responsiveness_rating",
      label: "How well did our team respond to your enquiries?",
      fieldType: "rating5",
      options: [
        { value: "extremely_responsive", label: "Extremely Responsive" },
        { value: "responsive", label: "" },
        { value: "neutral", label: "Neutral" },
        { value: "slow", label: "" },
        { value: "very_slow", label: "Very Slow" },
      ],
    },
  ];


  // ----------------------------
  // Step 8 Fields (Final Step) - OLD FLOW ONLY
  // ----------------------------
  const step8Fields = [
    {
      id: "rate_s8_1",
      name: "service_continuation_rating",
      label: "How likely are you to continue using our service?",
      fieldType: "rating5",
      options: [
        { value: "definitely_yes", label: "Definitely yes" },
        { value: "probably_yes", label: "" },
        { value: "not_sure", label: "Not sure" },
        { value: "probably_not", label: "" },
        { value: "definitely_not", label: "Definitely not" },
      ],
    },
    {
      id: "rate_s8_2",
      name: "recommendation_likelihood_rating",
      label: "How likely are you to recommend Megamind?",
      fieldType: "rating5",
      options: [
        { value: "definitely_yes", label: "Definitely yes" },
        { value: "probably_yes", label: "" },
        { value: "not_sure", label: "Not sure" },
        { value: "probably_not", label: "" },
        { value: "definitely_not", label: "Definitely not" },
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

          {/* STEP 1: INTRO */}
          {step === 1 && (
            <IntroStep
              img="/images/onb-steps/1.png"
              title="Let’s Start With the Essentials"
              description="We’ll start with your core brand and contact details so we can identify you clearly and keep our communication accurate from day one."
              onNext={handleNext}
              buttonClassName="!bg-[#E31313] !text-lg text-white !font-bold"
            />
          )}

          {/* STEP 2: General Information Form */}
          {step === 2 && (
            <Step2Form
              formFields={generalFormFields}
              formData={formData}
              onNext={handleNext}
              updateFormData={updateFormData}
              validateFields={validateStep2Fields}
              touched={touchedStep2}
              markFieldTouched={markStep2FieldTouched}
              markAllFieldsTouched={markAllStep2FieldsTouched}
            />
          )}

          {/* STEP 3: Financial & Legal Details */}
           {step === 3 && (
             <div className="flex flex-col h-full w-full">
               <Step2Form
                 formFields={financialFields}
                 formData={formData}
                 onNext={handleNext}
                 updateFormData={updateFormData}
                 validateFields={validateStep3Fields}
                 touched={touchedStep3}
                 markFieldTouched={markStep3FieldTouched}
                 markAllFieldsTouched={markAllStep3FieldsTouched}
                 headerTitle="Financial & Legal Details"
               />
             </div>
           )}

          {/* STEP 4: Contact Information */}
           {step === 4 && (
             <div className="flex flex-col h-full w-full">
               <Step2Form
                 formFields={contactFormFields}
                 formData={formData}
                 onNext={handleNext}
                 updateFormData={updateFormData}
                 validateFields={validateStep4Fields}
                 touched={touchedStep4}
                 markFieldTouched={markStep4FieldTouched}
                 markAllFieldsTouched={markAllStep4FieldsTouched}
                 headerTitle="Contact Information"
               />
             </div>
           )}

            {/* STEP 5: Tell Us Your Story (Intro) */}
            {step === 5 && (
            <IntroStep
                img="/images/steps/5.png"
                title="Tell Us Your Story"
                description="Share what you do, why you do it, and what makes you unique. Your story will guide us in creating work that feels authentically you."
                onNext={handleNext}
                buttonClassName="!bg-[#E31313] !text-lg text-white !font-bold"
            />
            )}

            {/* STEP 6: Brand Identity & Overview */}
            {step === 6 && (
            <Step2Form
                formFields={brandIdFields}
                formData={formData}
                onNext={handleNext}
                updateFormData={updateFormData}
                validateFields={validateStep6Fields}
                touched={touchedStep6}
                markFieldTouched={markStep6FieldTouched}
                markAllFieldsTouched={markAllStep6FieldsTouched}
                headerTitle="Brand Identity & Overview"
            />
            )}

            {/* STEP 7: Market, Audience & Positioning */}
            {step === 7 && (
                <Step2Form
                formFields={marketFields}
                formData={formData}
                onNext={handleNext}
                updateFormData={updateFormData}
                validateFields={validateStep7Fields}
                touched={touchedStep7}
                markFieldTouched={markStep7FieldTouched}
                markAllFieldsTouched={markAllStep7FieldsTouched}
                headerTitle="Market, Audience & Positioning"
            />
            )}

            {/* STEP 8: Project Scope & Expectations */}
            {step === 8 && (
                <Step2Form
                formFields={scopeFields}
                formData={formData}
                onNext={handleNext}
                updateFormData={updateFormData}
                validateFields={validateStep8Fields}
                touched={touchedStep8}
                markFieldTouched={markStep8FieldTouched}
                markAllFieldsTouched={markAllStep8FieldsTouched}
                headerTitle="Project Scope & Expectations"
            />
            )}

            {/* STEP 9: Asset Types (Moved from 10) */}
            {step === 9 && (
                <Step2Form
                formFields={assetFields}
                formData={formData}
                onNext={handleNext}
                updateFormData={updateFormData}
                validateFields={validateStep9Fields}
                touched={touchedStep9}
                markFieldTouched={markStep9FieldTouched}
                markAllFieldsTouched={markAllStep9FieldsTouched}
                headerTitle="Asset Types"
            />
            )}

            {/* STEP 10: Social Presence Intro (NEW) */}
            {step === 10 && (
            <IntroStep
                img="/images/steps/6.png" // Using existing image for now as I don't have the new one in public folder
                title="Let’s Align Your Social Presence"
                description="Share access to your social media and digital channels so we can manage, optimise, and grow your online presence efficiently. Wherever possible, please add our agency email instead of sharing passwords."
                onNext={handleNext}
                buttonClassName="!bg-[#E31313] !text-lg text-white !font-bold"
            />
            )}

            {/* STEP 11: Social Presence Form (URLs + Access) */}
            {step === 11 && (
                <Step2Form
                formFields={[...socialFields, ...socialAccessFields]}
                formData={formData}
                onNext={handleNext}
                updateFormData={updateFormData}
                validateFields={validateStep11Fields}
                touched={touchedStep11}
                markFieldTouched={markStep11FieldTouched}
                markAllFieldsTouched={markAllStep11FieldsTouched}
                headerTitle="Account Details"
            />
            )}

            {/* STEP 12: Let's Get Your Website Ready (Intro) */}
            {step === 12 && (
            <IntroStep
                img="/images/steps/7.png"
                title="Let's Get Your Website Ready"
                description="Share access to your website platforms and upload any relevant documents so we can review, manage, and optimise your site smoothly. Wherever possible, please add our agency email instead of sharing passwords."
                onNext={handleNext}
                buttonClassName="!bg-[#E31313] !text-lg text-white !font-bold"
            />
            )}

            {/* STEP 13: Website Details */}
            {step === 13 && (
                <Step2Form
                formFields={websiteFields}
                formData={formData}
                onNext={handleNext}
                updateFormData={updateFormData}
                validateFields={validateStep13Fields}
                touched={touchedStep13}
                markFieldTouched={markStep13FieldTouched}
                markAllFieldsTouched={markAllStep13FieldsTouched}
                headerTitle="Website Details"
            />
            )}

            {/* STEP 14: Let's Get Your Ads Running (Intro) */}
            {step === 14 && (
            <IntroStep
                img="/images/onb-steps/1.png"
                title="Let's Get Your Ads Running"
                description="Upload the relevant documents and grant us access to your advertising accounts so we can review, manage, and optimise your campaigns effectively. Wherever possible, please add our agency email instead of sharing passwords."
                onNext={handleNext}
                buttonClassName="!bg-[#E31313] !text-lg text-white !font-bold"
            />
            )}

            {/* STEP 15: Account Details (Ads Form) */}
            {step === 15 && (
                <Step2Form
                formFields={accountFields}
                formData={formData}
                onNext={handleNext}
                updateFormData={updateFormData}
                validateFields={validateStep15Fields}
                touched={touchedStep15}
                markFieldTouched={markStep15FieldTouched}
                markAllFieldsTouched={markAllStep15FieldsTouched}
                headerTitle="Account Details"
            />
            )}

            {/* STEP 16: Business Verification Documents & Contact Details */}
            {step === 16 && (
                <Step2Form
                formFields={businessVerificationFields}
                formData={formData}
                onNext={handleNext}
                updateFormData={updateFormData}
                validateFields={validateStep16Fields}
                touched={touchedStep16}
                markFieldTouched={markStep16FieldTouched}
                markAllFieldsTouched={markAllStep16FieldsTouched}
                headerTitle="Business Verification Documents & Contact Details"
            />
            )}

        </>
      )}
    </div>
  );
}
