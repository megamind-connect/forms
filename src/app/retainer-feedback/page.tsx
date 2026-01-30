"use client";

import { useState } from "react";
import DynamicField from "@/components/client/DynamicFields";
import { Step2Form } from "@/components/client/Step2Form";
import { StepIndicator } from "@/components/client/StepIndicator";
import { Button } from "@/components/ui/Button";
import toast from "react-hot-toast";

// --- Field Definitions ---

const step1Fields = [
    {
        id: "org_name",
        name: "organisation_name",
        label: "1. Organisation Name",
        placeholder: "Enter your answer",
        fieldType: "text",
    },
    {
        id: "person_name",
        name: "person_name",
        label: "2. Name of the person",
        placeholder: "Enter your answer",
        fieldType: "text",
    },
    {
        id: "role",
        name: "position_role",
        label: "3. Position/Role in the Organisation",
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
        ],
    },
];

const step2Fields = [
    {
        id: "overall_exp",
        name: "overall_experience",
        label: "4. How would you rate your overall experience with Megamind?",
        fieldType: "rating5",
        options: [
            { value: "very_poor", label: "Very Poor" },
            { value: "poor", label: "" },
            { value: "average", label: "Average" },
            { value: "good", label: "" },
            { value: "excellent", label: "Excellent" },
            { value: "exceptional", label: "Exceptional" },
        ],
    },
    {
        id: "impact_res",
        name: "impact_results",
        label: "5. How would you assess the impact and results of our services on your brand?",
        fieldType: "rating5",
        options: [
            { value: "very_poor", label: "Very Poor" },
            { value: "poor", label: "" },
            { value: "average", label: "Average" },
            { value: "good", label: "" },
            { value: "excellent", label: "Excellent" },
            { value: "exceptional", label: "Exceptional" },
        ],
    },
    {
        id: "qual_serv",
        name: "quality_services",
        label: "6. Quality of services provided?",
        fieldType: "rating5",
        options: [
            { value: "very_poor", label: "Very Poor" },
            { value: "poor", label: "" },
            { value: "average", label: "Average" },
            { value: "good", label: "" },
            { value: "excellent", label: "Excellent" },
            { value: "exceptional", label: "Exceptional" },
        ],
    },
    {
        id: "del_time",
        name: "delivery_time",
        label: "7. Delivery Time of services",
        fieldType: "rating5",
        options: [
            { value: "very_poor", label: "Very Poor" },
            { value: "poor", label: "" },
            { value: "average", label: "Average" },
            { value: "good", label: "" },
            { value: "excellent", label: "Excellent" },
            { value: "exceptional", label: "Exceptional" },
        ],
    },
    {
        id: "brand_strat",
        name: "brand_strategy",
        label: "8. How would you rate our Brand Strategy in terms of aligning with your business",
        fieldType: "rating5",
        options: [
            { value: "very_poor", label: "Very Poor" },
            { value: "poor", label: "" },
            { value: "average", label: "Average" },
            { value: "good", label: "" },
            { value: "excellent", label: "Excellent" },
            { value: "exceptional", label: "Exceptional" },
        ],
    },
];

const step3Fields = [
    {
        id: "services_provided",
        name: "services_provided",
        label: "9. Which service(s) did we provide for you?",
        fieldType: "checkbox_group",
        options: [
            { label: "Graphic Design", value: "graphic_design" },
            { label: "PPC", value: "ppc" },
            { label: "Video Shoot / Production", value: "video_shoot_production" },
            { label: "Video Editing", value: "video_editing" },
            { label: "Social Media Management", value: "social_media_management" },
            { label: "Social Media Marketing (includes Graphic Design, Video Shoot, Video Editing, and Management)", value: "social_media_marketing" },
            { label: "Website Development", value: "website_development" },
            { label: "Software Development", value: "software_development" },
            { label: "Others…", value: "other" },
        ],
    },
    {
        id: "service_align_buisness",
        name: "service_align_buisness",
        label: "10. How well do our services align with your business goals this month?  ",
        fieldType: "rating5",
        options: [
            { value: "extremely_well", label: "Extremely Well" },
            { value: "somewhat_well", label: "Somewhat Well" },
            { value: "neutral", label: "Neutral" },
            { value: "somewhat_not_well", label: "Somewhat Not Well" },
            { value: "extremely_not_well", label: "Extremely Not Well" },
        ],
    },
    {
        id: "rate_ability_deadlines",
        name: "rate_ability_deadlines",
        label: "11. How would you rate our ability to meet deadlines this month?   ",
        fieldType: "rating5",
        options: [
            { value: "never", label: "Never" },
            { value: "rarely", label: "Rarely" },
            { value: "sometimes", label: "Sometimes" },
            { value: "usually", label: "Usually" },
            { value: "always", label: "Always" },
        ],
    },
    {
        id: "feedback_requests_understanding",
        name: "feedback_requests_understanding",
        label: "12. Do you feel your feedback and requests were understood and incorporated into the work?   ",
        fieldType: "rating5",
        options: [
            { value: "excellent", label: "Excellent" },
            { value: "good", label: "Good" },
            { value: "average", label: "Average" },
            { value: "poor", label: "Poor" },
            { value: "very_poor", label: "Very Poor" },
        ],
    },
];

const step4Fields = [

    {
        id: "digital_marketing_results",
        name: "digital_marketing_results",
        label: "13. How would you rate our Digital Marketing services in driving measurable results for your business?   ",
        fieldType: "rating5",
        options: [
            { value: "significant_results", label: "Significant Results" },
            { value: "strong_results", label: "Strong Results" },
            { value: "moderate_results", label: "Moderate Results" },
            { value: "minimal_results", label: "Minimal Results" },
            { value: "no_results", label: "No Results" },
        ],

    },
    {
        id: "creative_work",
        name: "creative_work",
        label: "14. How would you rate our content creation and creative work in representing your brand? ",
        fieldType: "rating5",
        options: [
            { value: "excellent", label: "Excellent" },
            { value: "good", label: "Good" },
            { value: "average", label: "Average" },
            { value: "very_slow", label: "Very Slow" },
            { value: "slow", label: "Slow" },
        ],
    },
    {
        id: "surprised_deliverables",
        name: "surprised_deliverables",
        label: "15. Were there any deliverables that pleasantly surprised you? If so, we would love to know which ones and what made them stand out for you. ",
        fieldType: "text",

    },
    {
        id: "enquiries_response",
        name: "enquiries_response",
        label: "16. How well did our team respond to your enquiries?  ",
        fieldType: "rating5",
        options: [
            { value: "extremely_responsive", label: "Extremely Responsive" },
            { value: "responsive", label: "Responsive" },
            { value: "neutral", label: "Neutral" },
            { value: "very_slow", label: "Very Slow" },
            { value: "slow", label: "Slow" },
        ],
    },


];

const step5Fields = [
    {
        id: "overall_work_relationship",
        name: "overall_work_relationship",
        label: "17. How would you describe the overall working relationship with our team?  (Please specify any areas where we fell short)",
        fieldType: "short_text",

    },
    {
        id: "project_improvements",
        name: "project_improvements",
        label: "18. Are there any improvements you would like to see in the coming months?  ",
        fieldType: "short_text",

    },
    {
        id: "future_service",
        name: "future_service",
        label: "19. How likely are you to continue using our service in the coming months? ",
        fieldType: "rating5",
        options: [
            { value: "definitely_yes", label: "Definitely Yes" },
            { value: "probably_yes", label: "Probably Yes" },
            { value: "not_sure_yet", label: "Not sure yet" },
            { value: "probably_not", label: "Probably Not" },
            { value: "definitely_not", label: "Definitely Not" },
        ],
    },

    {
        id: "recommendation",
        name: "recommendation",
        label: "20.How likely are you to recommend Megamind to others?   ",
        fieldType: "rating5",
        options: [
            { value: "definitely_yes", label: "Definitely Yes" },
            { value: "probably_yes", label: "Probably Yes" },
            { value: "not_sure", label: "Not sure" },
            { value: "probably_not", label: "Probably Not" },
            { value: "definitely_not", label: "Definitely Not" },
        ],
    },
    {
        id: "comments_suggestions",
        name: "comments_suggestions",
        label: "21. Any other comments or suggestions for improvement? ",
        fieldType: "short_text",

    },
];

// Combine all for step indicators (we have 5 steps)
const STEPS_COUNT = 5;
const stepStructure = { 1: 1, 2: 1, 3: 1, 4: 1, 5: 1 };

export default function OneTimerClientPage() {
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
            updates[field.name] = true;
        });
        setTouched((prev) => ({ ...prev, ...updates }));
    };

    const validateFields = (fields: any[]) => {
        const errors: Record<string, string> = {};
        fields.forEach((field) => {
            if (!formData[field.name]) {
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
        // TODO: Connect to API
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/client-feedback`, {
                method: "POST",
                headers: { "Content-Type": "application/json", "x-api-key": process.env.NEXT_PUBLIC_INTERNAL_API_KEY || "" },
                body: JSON.stringify({
                    ...formData,
                    form_type: "one-timer-client" // Optional discriminator
                }),
            });
            if (!res.ok) throw new Error("Failed to submit");
            toast.success("Thank you! Your feedback has been submitted.");
            setStep(1);
            setFormData({});
        } catch (err) {
            console.error("Submission error:", err);
            toast.error("Something went wrong. Please try again.");
        }
    };

    const getStepProgress = (n: number) => {
        if (n < step) return 100;
        if (n === step) return 50; // Partial progress for current step? Or just 0.
        return 0;
    };

    const handleStepClick = (n: number) => {
        // Only allow going back or to current step, or forward if validated?
        // For simplicity, allow going back.
        if (n < step) {
            setStep(n);
        }
    };

    // Render logic helpers
    const renderStepFields = (fields: any[]) => (
        <div className="px-4 max-w-2xl w-full pb-3 mx-auto md:px-0">
            {step === 2 && <h2 className="text-[32px] font-medium text-primary mt-4 mb-6">Overall Experience</h2>}

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

            {/* STEP 1 */}
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
                    headerTitle="" // Title is empty as per Image 0? Or maybe "Step 1"? Image 0 doesn't show big header for the form itself.
                    isClientPage={true}
                />
            )}

            {/* STEP 2 */}
            {step === 2 && renderStepFields(step2Fields)}

            {/* STEP 3 */}
            {step === 3 && renderStepFields(step3Fields)}

            {/* STEP 4 */}
            {step === 4 && renderStepFields(step4Fields)}

            {/* STEP 5 */}
            {step === 5 && renderStepFields(step5Fields)}

        </div>
    );
}
