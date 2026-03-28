"use client";

import DynamicField from "@/components/client/DynamicFields";
import { IntroStep } from "@/components/client/IntroStep";
import { SplashScreen } from "@/components/client/SplashScreen";
import { Step2Form } from "@/components/client/Step2Form";
import { StepIndicator } from "@/components/client/StepIndicator";
import { useVendorOnboarding } from "@/components/hooks/useVendorOnboarding";
import { FormHeader } from "@/components/shared/FormHeader";

export default function VendorOnboardingPage() {
  const {
    step,
    showSplash,
    formData,
    stepStructure,
    vendorStep1Fields,
    vendorStep2Fields,
    vendorStep3Fields,
    vendorStep4Fields,
    vendorStep5Fields,
    vendorStep6Fields,
    touchedSteps,
    handleNext,
    handleStepClick,
    getStepProgress,
    updateFormData,
    markFieldTouched,
    markAllFieldsTouched,
    validateFields,
  } = useVendorOnboarding();

  return (
    <div className="relative min-h-screen !bg-[#FFFBFB] flex flex-col py-10 justify-center overflow-hidden">
      {showSplash ? (
        <SplashScreen />
      ) : (
        <>
          {step > 1 && <FormHeader formName="Vendor Onboarding" />}
          
          {step > 1 && (
            <StepIndicator
              step={step}
              stepStructure={stepStructure}
              getStepProgress={getStepProgress}
              handleStepClick={handleStepClick}
            />
          )}

          {/* INTRO STEP */}
          {step === 1 && (
            <IntroStep
              img="/images/onb-steps/1.png"
              title="Vendor Onboarding Form"
              description="Welcome! Please complete the following steps to onboard as a vendor."
              onNext={handleNext}
              buttonClassName="!bg-[#E31313] !text-lg text-white !font-bold"
            />
          )}

          {/* STEP 1 */}
          {step === 2 && (
            <Step2Form
              headerTitle="Basic Vendor Details"
              formFields={vendorStep1Fields}
              formData={formData}
              onNext={handleNext}
              updateFormData={updateFormData}
              validateFields={() => validateFields(vendorStep1Fields)}
              touched={touchedSteps[2]}
              markFieldTouched={(name) => markFieldTouched(2, name)}
              markAllFieldsTouched={() => markAllFieldsTouched(2)}
            />
          )}

          {/* STEP 2 */}
          {step === 3 && (
            <Step2Form
              headerTitle="Contact Details"
              formFields={vendorStep2Fields}
              formData={formData}
              onNext={handleNext}
              updateFormData={updateFormData}
              validateFields={() => validateFields(vendorStep2Fields)}
              touched={touchedSteps[3]}
              markFieldTouched={(name) => markFieldTouched(3, name)}
              markAllFieldsTouched={() => markAllFieldsTouched(3)}
            />
          )}

          {/* STEP 3 */}
          {step === 4 && (
            <Step2Form
              headerTitle="Address Details"
              formFields={vendorStep3Fields}
              formData={formData}
              onNext={handleNext}
              updateFormData={updateFormData}
              validateFields={() => validateFields(vendorStep3Fields)}
              touched={touchedSteps[4]}
              markFieldTouched={(name) => markFieldTouched(4, name)}
              markAllFieldsTouched={() => markAllFieldsTouched(4)}
            />
          )}

          {/* STEP 4 */}
          {step === 5 && (
            <Step2Form
              headerTitle="Bank Account Details"
              formFields={vendorStep4Fields}
              formData={formData}
              onNext={handleNext}
              updateFormData={updateFormData}
              validateFields={() => validateFields(vendorStep4Fields)}
              touched={touchedSteps[5]}
              markFieldTouched={(name) => markFieldTouched(5, name)}
              markAllFieldsTouched={() => markAllFieldsTouched(5)}
            />
          )}

          {/* STEP 5 */}
          {step === 6 && (
            <Step2Form
              headerTitle="Business & Tax Information"
              formFields={vendorStep5Fields}
              formData={formData}
              onNext={handleNext}
              updateFormData={updateFormData}
              validateFields={() => validateFields(vendorStep5Fields)}
              touched={touchedSteps[6]}
              markFieldTouched={(name) => markFieldTouched(6, name)}
              markAllFieldsTouched={() => markAllFieldsTouched(6)}
            />
          )}

          {/* STEP 6 */}
          {step === 7 && (
            <Step2Form
              headerTitle="Document Uploads"
              formFields={vendorStep6Fields}
              formData={formData}
              onNext={handleNext}
              updateFormData={updateFormData}
              validateFields={() => validateFields(vendorStep6Fields)}
              touched={touchedSteps[7]}
              markFieldTouched={(name) => markFieldTouched(7, name)}
              markAllFieldsTouched={() => markAllFieldsTouched(7)}
              buttonText="Submit"
            />
          )}
        </>
      )}
    </div>
  );
}
