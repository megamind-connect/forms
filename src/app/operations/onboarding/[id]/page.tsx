"use client";

import { SplashScreen } from "@/components/client/SplashScreen";
import { IntroStep } from "@/components/client/IntroStep";
import { Step2Form } from "@/components/client/Step2Form";
import { StepIndicator } from "@/components/client/StepIndicator";
import { useOnboarding } from "@/components/hooks/useOnboarding";
import { FormHeader } from "@/components/shared/FormHeader";

export default function OperationsOnboardingPage() {
    const {
        step,
        showSplash,
        assetFields,
        socialFields,
        socialAccessFields,
        formData,
        stepStructure,
        touchedStep9,
        touchedStep11,
        handleNext,
        handleStepClick,
        getStepProgress,
        updateFormData,
        validateStep9Fields,
        validateOperationsDynamicStep,
        markStep9FieldTouched,
        markAllStep9FieldsTouched,
        operationsStepsConfig,
        markStep11FieldTouched,
        markAllStep11FieldsTouched
    } = useOnboarding();

    return (
        <div className="relative min-h-screen !bg-[#FFFBFB] flex flex-col py-10 justify-center overflow-hidden">
            {showSplash ? (
                <SplashScreen />
            ) : (
                <>
                    <FormHeader formName="Operations Onboarding" />

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
                            title="Let’s Gather Your Technical Assets"
                            description="We need your technical assets and platform access credentials to properly set up and manage your accounts."
                            onNext={handleNext}
                            buttonClassName="!bg-[#E31313] !text-lg text-white !font-bold"
                        />
                    )}

                    {/* STEP 2: Asset Types (Previously Step 5 globally) */}
                    {step === 2 && (
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

                    {/* STEP 3+: Dynamic Form Configurations (Social, PPC, Website) */}
                    {operationsStepsConfig.map((config, index) => {
                        const currentStepIndex = 3 + index;
                        const isLastStep = currentStepIndex === 2 + operationsStepsConfig.length;
                        return step === currentStepIndex && (
                            <Step2Form
                                key={config.id}
                                formFields={config.fields}
                                formData={formData}
                                onNext={handleNext}
                                updateFormData={updateFormData}
                                validateFields={(data) => validateOperationsDynamicStep(data, config.fields)}
                                touched={touchedStep11} // Using touchedStep11 as the common dictionary for these forms
                                markFieldTouched={markStep11FieldTouched}
                                markAllFieldsTouched={markAllStep11FieldsTouched}
                                headerTitle={config.title}
                                buttonText={isLastStep ? "Submit" : "Next"}
                                isClientPage={true}
                            />
                        );
                    })}
                </>
            )}
        </div>
    );
}
