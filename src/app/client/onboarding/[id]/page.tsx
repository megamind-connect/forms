"use client";

import DynamicField from "@/components/client/DynamicFields";
import { IntroStep } from "@/components/client/IntroStep";
import { SplashScreen } from "@/components/client/SplashScreen";
import { Step2Form } from "@/components/client/Step2Form";
import { StepIndicator } from "@/components/client/StepIndicator";
import { StepTextQuestion } from "@/components/client/StepTextQuestion";
import { useOnboarding } from "@/components/hooks/useOnboarding";
import { Button } from "@/components/ui/Button";

import { FormHeader } from "@/components/shared/FormHeader";

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
          {step > 1 && <FormHeader formName="Client Onboarding" />}
          {/* Step Progress Indicator */}
          {step > 1 && (
            <StepIndicator
              step={step}
              stepStructure={stepStructure}
              getStepProgress={getStepProgress}
              handleStepClick={handleStepClick}
            />
          )}

          {/* STEP 1: INTRO */}
          {step === 1 && (
            <IntroStep
              img="/images/onb-steps/1.png"
              title="Client Onboarding Form"
              description="This form collects your basic business information."
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

          {/* STEP 4: Contact Information (Final Step) */}
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
                buttonText="Submit"
                isClientPage={true}
                />
            </div>
          )}

        </>
      )}
    </div>
  );
}
