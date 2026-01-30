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
    showSplash,
    generalFormFields,
    financialFields,
    contactFormFields,
    socialFields,
    assetFields,
    websiteFields,
    accountFields,
    businessVerificationFields,
    formData,
    stepStructure,
    touchedStep2,
    touchedStep3,
    touchedStep4,
    touchedStep9,
    touchedStep11,
    touchedStep13,
    touchedStep15,
    touchedStep16,
    handleNext,
    handleStepClick,
    getStepProgress,
    updateFormData,
    validateStep2Fields,
    validateStep3Fields,
    validateStep4Fields,
    validateStep9Fields,
    validateStep11Fields,
    validateStep13Fields,
    validateStep15Fields,
    validateStep16Fields,
    markStep2FieldTouched,
    markStep3FieldTouched,
    markStep4FieldTouched,
    markStep9FieldTouched,
    markStep11FieldTouched,
    markStep13FieldTouched,
    markStep15FieldTouched,
    markStep16FieldTouched,
    markAllStep2FieldsTouched,
    markAllStep3FieldsTouched,
    markAllStep4FieldsTouched,
    markAllStep9FieldsTouched,
    markAllStep11FieldsTouched,
    markAllStep13FieldsTouched,
    markAllStep15FieldsTouched,
    markAllStep16FieldsTouched,
    socialAccessFields,
  } = useOnboarding();

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

          {/* STEP 5: Asset Types */}
          {step === 5 && (
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

          {/* STEP 6: Social Presence Intro */}
          {step === 6 && (
            <IntroStep
              img="/images/steps/6.png"
              title="Let’s Align Your Social Presence"
              description="Share access to your social media and digital channels so we can manage, optimise, and grow your online presence efficiently. Wherever possible, please add our agency email instead of sharing passwords."
              onNext={handleNext}
              buttonClassName="!bg-[#E31313] !text-lg text-white !font-bold"
            />
          )}

          {/* STEP 7: Social Presence Form (URLs + Access) */}
          {step === 7 && (
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

          {/* STEP 8: Let's Get Your Website Ready (Intro) */}
          {step === 8 && (
            <IntroStep
              img="/images/steps/7.png"
              title="Let's Get Your Website Ready"
              description="Share access to your website platforms and upload any relevant documents so we can review, manage, and optimise your site smoothly. Wherever possible, please add our agency email instead of sharing passwords."
              onNext={handleNext}
              buttonClassName="!bg-[#E31313] !text-lg text-white !font-bold"
            />
          )}

          {/* STEP 9: Website Details */}
          {step === 9 && (
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

          {/* STEP 10: Let's Get Your Ads Running (Intro) */}
          {step === 10 && (
            <IntroStep
              img="/images/onb-steps/1.png"
              title="Let's Get Your Ads Running"
              description="Upload the relevant documents and grant us access to your advertising accounts so we can review, manage, and optimise your campaigns effectively. Wherever possible, please add our agency email instead of sharing passwords."
              onNext={handleNext}
              buttonClassName="!bg-[#E31313] !text-lg text-white !font-bold"
            />
          )}

          {/* STEP 11: Account Details (Ads Form) */}
          {step === 11 && (
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

          {/* STEP 12: Business Verification Documents & Contact Details */}
          {step === 12 && (
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
