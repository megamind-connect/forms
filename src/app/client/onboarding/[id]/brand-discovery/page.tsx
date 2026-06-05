"use client";

import { IntroStep } from "@/components/client/IntroStep";
import { SplashScreen } from "@/components/client/SplashScreen";
import { Step2Form } from "@/components/client/Step2Form";
import { StepIndicator } from "@/components/client/StepIndicator";
import { useOnboarding } from "@/components/hooks/useOnboarding";
import { FormHeader } from "@/components/shared/FormHeader";

export default function BrandIdentityPage() {
    const {
        step,
        showSplash,
        brandIdFields,
        marketFields,
        scopeFields,
        formData,
        stepStructure,
        touchedStep6,
        touchedStep7,
        touchedStep8,
        handleNext,
        handleStepClick,
        getStepProgress,
        updateFormData,
        validateStep6Fields,
        validateStep7Fields,
        validateStep8Fields,
        markStep6FieldTouched,
        markStep7FieldTouched,
        markStep8FieldTouched,
        markAllStep6FieldsTouched,
        markAllStep7FieldsTouched,
        markAllStep8FieldsTouched,
        assetFields,
        socialFields,
        touchedStep9,
        touchedStep11,
        validateStep9Fields,
        validateStep11Fields,
        markStep9FieldTouched,
        markStep11FieldTouched,
        markAllStep9FieldsTouched,
        markAllStep11FieldsTouched,
        isLoading,
    } = useOnboarding();

    return (
        <div className="relative min-h-screen !bg-[#FFFBFB] flex flex-col py-10 justify-center overflow-hidden">
            {showSplash ? (
                <SplashScreen />
            ) : (
                <>
                    {step > 1 && <FormHeader formName="Brand Discovery" />}
                    {/* Step Progress Indicator */}
                    {step > 1 && (
                        <StepIndicator
                            step={step}
                            stepStructure={stepStructure}
                            getStepProgress={getStepProgress}
                            handleStepClick={handleStepClick}
                        />
                    )}

                    {/* STEP 1: Tell Us Your Story (Intro) */}
                    {step === 1 && (
                        <IntroStep
                            img="/images/steps/5.png"
                            title="Brand Discovery Form "
                            description="Share what you do, why you do it, and what makes you unique. Your story will guide us in creating work that feels authentically you."
                            onNext={handleNext}
                            buttonClassName="!bg-[#E31313] !text-lg text-white !font-bold"
                        />
                    )}

                    {/* STEP 2: Brand Identity & Overview */}
                    {step === 2 && (
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

                    {/* STEP 3: Market, Audience & Positioning */}
                    {step === 3 && (
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

                    {/* STEP 4: Project Scope & Expectations */}
                    {step === 4 && (
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

                    {/* STEP 5: Asset Types */}
                    {step === 5 && (
                        <Step2Form
                            formFields={assetFields}
                            formData={formData}
                            onNext={handleNext}
                            updateFormData={updateFormData}
                            validateFields={validateStep9Fields} // Using Step 9 validation from hook
                            touched={touchedStep9}
                            markFieldTouched={markStep9FieldTouched}
                            markAllFieldsTouched={markAllStep9FieldsTouched}
                            headerTitle="Asset Types"
                            hideToggleInput={true}
                            
                        />
                    )}

                    {/* STEP 6: Social & Digital Platform */}
                    {step === 6 && (
                        <Step2Form
                            formFields={socialFields}
                            formData={formData}
                            onNext={handleNext}
                            updateFormData={updateFormData}
                            validateFields={validateStep11Fields} // Using Step 11 validation from hook
                            touched={touchedStep11}
                            markFieldTouched={markStep11FieldTouched}
                            markAllFieldsTouched={markAllStep11FieldsTouched}
                            headerTitle="Social & Digital Platform"
                            buttonText="Submit"
                            isLoading={isLoading}
                        />
                    )}
                </>
            )}
        </div>
    );
}
