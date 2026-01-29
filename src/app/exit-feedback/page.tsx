"use client";

import { useState } from "react";
import DynamicField from "@/components/client/DynamicFields";
import { Step2Form } from "@/components/client/Step2Form";
import { StepIndicator } from "@/components/client/StepIndicator";
import { Button } from "@/components/ui/Button";
import toast from "react-hot-toast";

// --- Field Definitions ---

// Step 1: Questions 1-2
const step1Fields = [
    {
        id: "respondent_name",
        name: "respondent_name",
        label: "1. Name",
        placeholder: "Enter your answer",
        fieldType: "text",
    },
    {
        id: "position_role",
        name: "position_role",
        label: "2. Position/Role",
        fieldType: "radio_stacked",
        options: [
            { label: "Managing Director", value: "Managing Director" },
            { label: "Marketing Director", value: "Marketing Director" },
            { label: "CEO / Founder", value: "CEO / Founder" },
            { label: "CMO / Head of Marketing", value: "CMO / Head of Marketing" },
            { label: "Marketing Manager", value: "Marketing Manager" },
            { label: "Marketing POC / Coordinator", value: "Marketing POC / Coordinator" },
            { label: "Brand Manager", value: "Brand Manager" },
            { label: "PR Head", value: "PR Head" },
            { label: "Other", value: "Other" },
        ],
    },
];

// Step 2: Questions 3-6
const step2Fields = [
    {
        id: "initial_expectations",
        name: "initial_expectations",
        label: "3. What were your initial expectations when you began working with Megamind?",
        placeholder: "Enter your answer",
        fieldType: "text",
    },
    {
        id: "team_understood",
        name: "team_understood_business",
        label: "4. Do you feel our team understood your business and what you’re trying to achieve?",
        fieldType: "radio",
        options: [
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" },
            { value: "maybe", label: "Maybe" },
            { value: "other", label: "Other" },
        ],
    },
    {
        id: "strategic_guidance",
        name: "strategic_guidance_effectiveness",
        label: "5. How effective was Megamind’s strategic guidance and planning in meeting your marketing needs?",
        fieldType: "radio_row",
        options: [
            { value: "very_effective", label: "Very effective" },
            { value: "somewhat_effective", label: "Somewhat effective" },
            { value: "neither", label: "Neither effective nor ineffective" },
            { value: "somewhat_ineffective", label: "Somewhat ineffective" },
            { value: "very_ineffective", label: "Very ineffective" },
        ],
    },
    {
        id: "services_aligned",
        name: "services_aligned_brand",
        label: "6. Were the delivered services aligned with your brand?",
        fieldType: "radio",
        options: [
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" },
            { value: "maybe", label: "Maybe" },
        ],
    },
];

// Step 3: Questions 7-8
// Q7 is a grid, broken down here into individual fields for data capture
const step3Fields = [
    {
        id: "q7_header", // Helper text for the grid
        name: "q7_header",
        label: "7. Please rate your overall satisfaction with the following services",
        fieldType: "description_only", // Assuming your component supports a label without input, otherwise handle in render
    },
    {
        id: "sat_social_media",
        name: "satisfaction_social_media",
        label: "Social Media Management",
        fieldType: "radio", // Rendered as row in UI, logic here
        options: [
            { value: "excellent", label: "Excellent" },
            { value: "good", label: "Good" },
            { value: "average", label: "Average" },
            { value: "fair", label: "Fair" },
            { value: "poor", label: "Poor" },
        ],
    },
    {
        id: "sat_graphic_design",
        name: "satisfaction_graphic_design",
        label: "Graphic Design",
        fieldType: "radio",
        options: [
            { value: "excellent", label: "Excellent" },
            { value: "good", label: "Good" },
            { value: "average", label: "Average" },
            { value: "fair", label: "Fair" },
            { value: "poor", label: "Poor" },
        ],
    },
    {
        id: "sat_video_prod",
        name: "satisfaction_video_production",
        label: "Video Production",
        fieldType: "radio",
        options: [
            { value: "excellent", label: "Excellent" },
            { value: "good", label: "Good" },
            { value: "average", label: "Average" },
            { value: "fair", label: "Fair" },
            { value: "poor", label: "Poor" },
        ],
    },
    {
        id: "sat_video_editing",
        name: "satisfaction_video_editing",
        label: "Video Editing",
        fieldType: "radio",
        options: [
            { value: "excellent", label: "Excellent" },
            { value: "good", label: "Good" },
            { value: "average", label: "Average" },
            { value: "fair", label: "Fair" },
            { value: "poor", label: "Poor" },
        ],
    },
    {
        id: "sat_ppc",
        name: "satisfaction_ppc",
        label: "PPC Execution",
        fieldType: "radio",
        options: [
            { value: "excellent", label: "Excellent" },
            { value: "good", label: "Good" },
            { value: "average", label: "Average" },
            { value: "fair", label: "Fair" },
            { value: "poor", label: "Poor" },
        ],
    },
    {
        id: "sat_strategy",
        name: "satisfaction_strategy",
        label: "Strategy",
        fieldType: "radio",
        options: [
            { value: "excellent", label: "Excellent" },
            { value: "good", label: "Good" },
            { value: "average", label: "Average" },
            { value: "fair", label: "Fair" },
            { value: "poor", label: "Poor" },
        ],
    },
    {
        id: "sat_content",
        name: "satisfaction_content_writing",
        label: "Content Writing",
        fieldType: "radio",
        options: [
            { value: "excellent", label: "Excellent" },
            { value: "good", label: "Good" },
            { value: "average", label: "Average" },
            { value: "fair", label: "Fair" },
            { value: "poor", label: "Poor" },
        ],
    },
    {
        id: "challenges_issues",
        name: "specific_challenges",
        label: "8. Did you experience any specific challenges or issues with our services (e.g., delays, quality concerns, reporting gaps)? Please describe.",
        placeholder: "Enter your answer",
        fieldType: "text",
    },
];

// Step 4: Questions 9-12
const step4Fields = [
    {
        id: "deadlines_met",
        name: "deadlines_met",
        label: "9. Were project deadlines and commitments consistently met?",
        fieldType: "radio",
        options: [
            { value: "always", label: "Always" },
            { value: "often", label: "Often" },
            { value: "sometimes", label: "Sometimes" },
            { value: "rarely", label: "Rarely" },
            { value: "never", label: "Never" },
        ],
    },
    {
        id: "comm_rating",
        name: "communication_responsiveness_rating",
        label: "10. How would you rate the communication and responsiveness of our project manager and team?",
        fieldType: "radio",
        options: [
            { value: "excellent", label: "Excellent" },
            { value: "good", label: "Good" },
            { value: "average", label: "Average" },
            { value: "poor", label: "Poor" },
            { value: "fair", label: "Fair" },
        ],
    },
    {
        id: "comm_examples",
        name: "communication_examples",
        label: "11. Please share examples of communication strengths or any gaps you experienced during the engagement.",
        placeholder: "Enter your answer",
        fieldType: "text",
    },
    {
        id: "felt_heard",
        name: "felt_heard_valued",
        label: "12. Did you feel heard, valued, and that your feedback and concerns were acknowledged and acted upon throughout the project?",
        fieldType: "radio",
        options: [
            { value: "always", label: "Always" },
            { value: "often", label: "Often" },
            { value: "sometimes", label: "Sometimes" },
            { value: "rarely", label: "Rarely" },
            { value: "never", label: "Never" },
        ],
    },
];

// Step 5: Questions 13-20
const step5Fields = [
    {
        id: "fall_short",
        name: "where_fell_short",
        label: "13. Where did Megamind fall short of your past experiences or expectations?",
        placeholder: "Enter your answer",
        fieldType: "text",
    },
    {
        id: "stand_out",
        name: "where_stood_out",
        label: "14. Compared to other agencies or freelancers you have worked with, where did Megamind stand out most?",
        placeholder: "Enter your answer",
        fieldType: "text",
    },
    {
        id: "appreciate_most",
        name: "appreciate_most",
        label: "15. What did you appreciate most about working with the Megamind team?",
        placeholder: "Enter your answer",
        fieldType: "text",
    },
    {
        id: "frustrations",
        name: "frustrations_disappointment",
        label: "16. What aspects of our work or process caused the most frustration or disappointment?",
        placeholder: "Enter your answer",
        fieldType: "text",
    },
    {
        id: "key_change",
        name: "key_change_suggestion",
        label: "17. What is one key change Megamind could have made that might have convinced you to continue working with us?",
        placeholder: "Enter your answer",
        fieldType: "text",
    },
    {
        id: "reasons_ending",
        name: "reasons_ending_service",
        label: "18. What are the main reasons you decided to end service with Megamind?",
        fieldType: "checkbox_group", // Squares in photo indicate checkbox (multiple selection)
        options: [
            { label: "Service quality issues", value: "Service quality issues" },
            { label: "Missed deadlines", value: "Missed deadlines" },
            { label: "Poor communication", value: "Poor communication" },
            { label: "Cost concerns", value: "Cost concerns" },
            { label: "Lack of measurable results or ROI", value: "Lack of measurable results or ROI" },
            { label: "Strategy not clear or actionable", value: "Strategy not clear or actionable" },
            { label: "Team lacked relevant expertise", value: "Team lacked relevant expertise" },
            { label: "Switched to another agency or freelancer", value: "Switched to another agency or freelancer" },
            { label: "Other", value: "Other" },
        ],
    },
    {
        id: "recommend",
        name: "recommend_megamind",
        label: "19. Would you recommend Megamind to other businesses or colleagues?",
        fieldType: "radio",
        options: [
            { value: "yes", label: "Yes" },
            { value: "maybe", label: "Maybe" },
            { value: "no", label: "No" },
        ],
    },
    {
        id: "final_thoughts",
        name: "final_thoughts",
        label: "20. Any final thoughts, suggestions, or messages for the Megamind leadership team?",
        placeholder: "Enter your answer",
        fieldType: "text",
    },
];

// 5 Steps Configuration
const STEPS_COUNT = 5;
const stepStructure = { 1: 1, 2: 1, 3: 1, 4: 1, 5: 1 };

export default function OffboardingClientPage() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState<Record<string, any>>({});
    const [touched, setTouched] = useState<Record<string, boolean>>({});

    const updateFormData = (updates: Record<string, any>) => {
        setFormData((prev) => ({ ...prev, ...updates }));
    };

    const markFieldTouched = (name: string) => {
        setTouched((prev) => ({ ...prev, [name]: true }));
    };

    const markAllFieldsTouched = (fields: any[]) => {
        const updates: Record<string, boolean> = {};
        fields.forEach(field => {
            // Skip header/description fields if they exist in validation
            if (field.fieldType !== 'description_only') {
                updates[field.name] = true;
            }
        });
        setTouched((prev) => ({ ...prev, ...updates }));
    };

    const validateFields = (fields: any[]) => {
        const errors: Record<string, string> = {};
        fields.forEach((field) => {
            if (field.fieldType === 'description_only') return; // Skip headers

            // Validation: Check if required fields are empty
            if (!formData[field.name]) {
                // In this form, almost all fields seem required based on the red asterisk in photos
                errors[field.name] = "This field is required";
            }
        });
        return errors;
    };

    const validateCurrentStep = () => {
        let fields: any[] = [];
        if (step === 1) fields = step1Fields;
        if (step === 2) fields = step2Fields;
        if (step === 3) fields = step3Fields;
        if (step === 4) fields = step4Fields;
        if (step === 5) fields = step5Fields;

        const errors = validateFields(fields);
        markAllFieldsTouched(fields);

        // Block navigation if errors exist
        return Object.keys(errors).length === 0;
    };

    const handleNext = () => {
        if (!validateCurrentStep()) {
            toast.error("Please fill all required fields");
            return;
        }

        if (step < STEPS_COUNT) {
            setStep((prev) => prev + 1);
            window.scrollTo(0, 0);
        } else {
            handleSubmit();
        }
    };

    const handleBack = () => {
        if (step > 1) {
            setStep((prev) => prev - 1);
            window.scrollTo(0, 0);
        }
    };

    const handleSubmit = async () => {
        console.log("Submitting Form Data:", formData);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/client-feedback`, {
                method: "POST",
                headers: { "Content-Type": "application/json", "x-api-key": process.env.NEXT_PUBLIC_INTERNAL_API_KEY || "" },
                body: JSON.stringify({
                    ...formData,
                    form_type: "offboarding-client"
                }),
            });
            if (!res.ok) throw new Error("Failed to submit");
            toast.success("Thank you! Your feedback has been submitted.");
            setStep(1);
            setFormData({});
        } catch (err) {
            console.error(err);
            toast.error("Something went wrong. Please try again.");
        }
    };

    const getStepProgress = (n: number) => {
        if (n < step) return 100;
        if (n === step) return 50;
        return 0;
    };

    const handleStepClick = (n: number) => {
        if (n < step) {
            setStep(n);
        }
    };

    // Helper to render the Title for each section
    const renderSectionHeader = (title: string) => (
        <h2 className="text-[32px] font-medium text-[#E31313] mt-4 mb-6">{title}</h2>
    );

    // Render logic helpers
    const renderStepFields = (fields: any[]) => (
        <div className="px-4 max-w-2xl w-full pb-3 mx-auto md:px-0">
            {/* Dynamic Headers based on Step */}
            {step === 1 && renderSectionHeader("Respondent Details")}
            {step === 2 && renderSectionHeader("Expectations & Strategic Alignment")}
            {step === 3 && renderSectionHeader("Service Quality & Performance")}
            {step === 4 && renderSectionHeader("Timelines, Communication & Responsiveness")}
            {step === 5 && renderSectionHeader("Overall Experience & Final Feedback")}

            {fields.map((field) => (
                <DynamicField
                    key={field.id}
                    field={field}
                    value={formData[field.name]}
                    onChange={(val) => updateFormData({ [field.name]: val })}
                />
            ))}
            <div className="flex gap-4 mt-8">
                {step > 1 && (
                    <Button
                        onClick={handleBack}
                        className="!bg-white !text-black border border-gray-300 !text-lg w-full max-w-2xl mx-auto"
                    >
                        Back
                    </Button>
                )}
                <Button
                    onClick={handleNext}
                    className="!bg-[#E31313] !text-white !font-bold !text-lg w-full max-w-2xl mx-auto"
                >
                    {step === STEPS_COUNT ? "Submit" : "Next"}
                </Button>
            </div>
        </div>
    );

    return (
        <div className="relative min-h-screen !bg-[#FFFBFB] flex flex-col py-10 justify-center overflow-hidden">

            {/* Step Progress Indicator */}
            <StepIndicator
                step={step}
                stepStructure={stepStructure}
                getStepProgress={getStepProgress}
                handleStepClick={handleStepClick}
            />

            {/* Render Current Step */}
            {step === 1 && (
                <Step2Form
                    formFields={step1Fields}
                    formData={formData}
                    onNext={handleNext}
                    updateFormData={updateFormData}
                    validateFields={() => validateFields(step1Fields)}
                    touched={touched}
                    markFieldTouched={markFieldTouched}
                    markAllFieldsTouched={() => markAllFieldsTouched(step1Fields)}
                    headerTitle="Respondent Details" // Passing title directly for Step 1
                    isClientPage={true}
                />
            )}

            {step === 2 && renderStepFields(step2Fields)}
            {step === 3 && renderStepFields(step3Fields)}
            {step === 4 && renderStepFields(step4Fields)}
            {step === 5 && renderStepFields(step5Fields)}

        </div>
    );
}