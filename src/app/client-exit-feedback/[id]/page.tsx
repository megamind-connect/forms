"use client";
import { useState } from "react";
import DynamicField from "@/components/client/DynamicFields";
import { Step2Form } from "@/components/client/Step2Form";
import { StepIndicator } from "@/components/client/StepIndicator";
import { Button } from "@/components/ui/Button";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import apiClient from "@/lib/api";

// --- Field Definitions ---

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
            { value: "Yes", label: "Yes" },
            { value: "No", label: "No" },
            { value: "Maybe", label: "Maybe" },
        ],
    },
    {
        id: "strategic_guidance",
        name: "strategic_guidance_effectiveness",
        label: "5. How effective was Megamind’s strategic guidance and planning in meeting your marketing needs?",
        fieldType: "radio_row",
        options: [
            { value: "Very effective", label: "Very effective" },
            { value: "Somewhat effective", label: "Somewhat effective" },
            { value: "Neither", label: "Neither" },
            { value: "Somewhat ineffective", label: "Somewhat ineffective" },
            { value: "Very ineffective", label: "Very ineffective" },
        ],
    },
    {
        id: "services_aligned",
        name: "services_aligned_brand",
        label: "6. Were the delivered services aligned with your brand?",
        fieldType: "radio",
        options: [
            { value: "Yes", label: "Yes" },
            { value: "No", label: "No" },
            { value: "Maybe", label: "Maybe" },
        ],
    },
];

const step3Fields = [
    {
        id: "sat_social_media",
        name: "satisfaction_social_media",
        label: "7. Please rate your overall satisfaction: Social Media Management",
        fieldType: "radio_row",
        options: [
            { value: "Excellent", label: "Excellent" },
            { value: "Good", label: "Good" },
            { value: "Average", label: "Average" },
            { value: "Fair", label: "Fair" },
            { value: "Poor", label: "Poor" },
        ],
    },
    {
        id: "sat_graphic_design",
        name: "satisfaction_graphic_design",
        label: "Graphic Design",
        fieldType: "radio_row",
        options: [
            { value: "Excellent", label: "Excellent" },
            { value: "Good", label: "Good" },
            { value: "Average", label: "Average" },
            { value: "Fair", label: "Fair" },
            { value: "Poor", label: "Poor" },
        ],
    },
    {
        id: "sat_video_prod",
        name: "satisfaction_video_production",
        label: "Video Production",
        fieldType: "radio_row",
        options: [
            { value: "Excellent", label: "Excellent" },
            { value: "Good", label: "Good" },
            { value: "Average", label: "Average" },
            { value: "Fair", label: "Fair" },
            { value: "Poor", label: "Poor" },
        ],
    },
    {
        id: "sat_video_editing",
        name: "satisfaction_video_editing",
        label: "Video Editing",
        fieldType: "radio_row",
        options: [
            { value: "Excellent", label: "Excellent" },
            { value: "Good", label: "Good" },
            { value: "Average", label: "Average" },
            { value: "Fair", label: "Fair" },
            { value: "Poor", label: "Poor" },
        ],
    },
    {
        id: "sat_ppc",
        name: "satisfaction_ppc",
        label: "PPC Execution",
        fieldType: "radio_row",
        options: [
            { value: "Excellent", label: "Excellent" },
            { value: "Good", label: "Good" },
            { value: "Average", label: "Average" },
            { value: "Fair", label: "Fair" },
            { value: "Poor", label: "Poor" },
        ],
    },
    {
        id: "sat_strategy",
        name: "satisfaction_strategy",
        label: "Strategy",
        fieldType: "radio_row",
        options: [
            { value: "Excellent", label: "Excellent" },
            { value: "Good", label: "Good" },
            { value: "Average", label: "Average" },
            { value: "Fair", label: "Fair" },
            { value: "Poor", label: "Poor" },
        ],
    },
    {
        id: "sat_content",
        name: "satisfaction_content_writing",
        label: "Content Writing",
        fieldType: "radio_row",
        options: [
            { value: "Excellent", label: "Excellent" },
            { value: "Good", label: "Good" },
            { value: "Average", label: "Average" },
            { value: "Fair", label: "Fair" },
            { value: "Poor", label: "Poor" },
        ],
    },
    {
        id: "challenges_issues",
        name: "specific_challenges",
        label: "8. Did you experience any specific challenges or issues with our services?",
        placeholder: "Enter your answer",
        fieldType: "text",
    },
];

const step4Fields = [
    {
        id: "deadlines_met",
        name: "deadlines_met",
        label: "9. Were project deadlines and commitments consistently met?",
        fieldType: "radio",
        options: [
            { value: "Always", label: "Always" },
            { value: "Often", label: "Often" },
            { value: "Sometimes", label: "Sometimes" },
            { value: "Rarely", label: "Rarely" },
            { value: "Never", label: "Never" },
        ],
    },
    {
        id: "comm_rating",
        name: "communication_responsiveness_rating",
        label: "10. How would you rate the communication and responsiveness of our project manager and team?",
        fieldType: "radio",
        options: [
            { value: "Excellent", label: "Excellent" },
            { value: "Good", label: "Good" },
            { value: "Average", label: "Average" },
            { value: "Poor", label: "Poor" },
            { value: "Fair", label: "Fair" },
        ],
    },
    {
        id: "comm_examples",
        name: "communication_examples",
        label: "11. Please share examples of communication strengths or any gaps you experienced.",
        placeholder: "Enter your answer",
        fieldType: "text",
    },
    {
        id: "felt_heard",
        name: "felt_heard_valued",
        label: "12. Did you feel heard, valued, and that your feedback was acted upon?",
        fieldType: "radio",
        options: [
            { value: "Always", label: "Always" },
            { value: "Often", label: "Often" },
            { value: "Sometimes", label: "Sometimes" },
            { value: "Rarely", label: "Rarely" },
            { value: "Never", label: "Never" },
        ],
    },
];

const step5Fields = [
    {
        id: "fall_short",
        name: "where_fell_short",
        label: "13. Where did Megamind fall short of your expectations?",
        placeholder: "Enter your answer",
        fieldType: "text",
    },
    {
        id: "stand_out",
        name: "where_stood_out",
        label: "14. Where did Megamind stand out most compared to others?",
        placeholder: "Enter your answer",
        fieldType: "text",
    },
    {
        id: "appreciate_most",
        name: "appreciate_most",
        label: "15. What did you appreciate most about working with us?",
        placeholder: "Enter your answer",
        fieldType: "text",
    },
    {
        id: "frustrations",
        name: "frustrations_disappointment",
        label: "16. What aspects caused the most frustration or disappointment?",
        placeholder: "Enter your answer",
        fieldType: "text",
    },
    {
        id: "key_change",
        name: "key_change_suggestion",
        label: "17. What key change might have convinced you to continue?",
        placeholder: "Enter your answer",
        fieldType: "text",
    },
    {
        id: "reasons_ending",
        name: "reasons_ending_service",
        label: "18. Main reasons you decided to end service?",
        fieldType: "checkbox_group",
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
        label: "19. Would you recommend Megamind to others?",
        fieldType: "radio",
        options: [
            { value: "Yes", label: "Yes" },
            { value: "Maybe", label: "Maybe" },
            { value: "No", label: "No" },
        ],
    },
    {
        id: "final_thoughts",
        name: "final_thoughts",
        label: "20. Any final thoughts or suggestions for leadership?",
        placeholder: "Enter your answer",
        fieldType: "text",
    },
];

const STEPS_COUNT = 5;
const stepStructure = { 1: 1, 2: 1, 3: 1, 4: 1, 5: 1 };

export default function ClientExitFeedbackPage() {
    const params = useParams();
    const router = useRouter();
    const id = params?.id as string;

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
            if (field.fieldType !== 'description_only') {
                updates[field.name] = true;
            }
        });
        setTouched((prev) => ({ ...prev, ...updates }));
    };

    const validateFields = (fields: any[]) => {
        const errors: Record<string, string> = {};
        fields.forEach((field) => {
            if (field.fieldType === 'description_only') return;
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
        const payload = {
            clientId: id,
            respondent_name: formData.respondent_name,
            position_role: formData.position_role,
            initial_expectations: formData.initial_expectations,
            team_understood_business: formData.team_understood_business,
            strategic_guidance_effectiveness: formData.strategic_guidance_effectiveness,
            services_aligned_brand: formData.services_aligned_brand,
            satisfaction_social_media: formData.satisfaction_social_media,
            satisfaction_graphic_design: formData.satisfaction_graphic_design,
            satisfaction_video_production: formData.satisfaction_video_production,
            satisfaction_video_editing: formData.satisfaction_video_editing,
            satisfaction_ppc: formData.satisfaction_ppc,
            satisfaction_strategy: formData.satisfaction_strategy,
            satisfaction_content_writing: formData.satisfaction_content_writing,
            specific_challenges: formData.specific_challenges,
            deadlines_met: formData.deadlines_met,
            communication_responsiveness_rating: formData.communication_responsiveness_rating,
            communication_examples: formData.communication_examples,
            felt_heard_valued: formData.felt_heard_valued,
            where_fell_short: formData.where_fell_short,
            where_stood_out: formData.where_stood_out,
            appreciate_most: formData.appreciate_most,
            frustrations_disappointment: formData.frustrations_disappointment,
            key_change_suggestion: formData.key_change_suggestion,
            reasons_ending_service: formData.reasons_ending_service?.list || [],
            recommend_megamind: formData.recommend_megamind,
            final_thoughts: formData.final_thoughts,
        };

        try {
            await apiClient.post(`/api/v1/feedback/client-exit`, payload, {
                headers: {
                    "x-api-key": process.env.NEXT_PUBLIC_INTERNAL_API_KEY,
                },
            });
            toast.success("Thank you for your valuable feedback!");
            router.push("/client-exit-feedback/thank-you");
            setFormData({});
            setStep(1);
        } catch (err) {
            console.error("Submission error:", err);
            toast.error("Something went wrong. Please try again.");
        }
    };

    const renderSectionHeader = (title: string) => (
        <h2 className="text-[32px] font-medium text-[#E31313] mt-4 mb-6">{title}</h2>
    );

    const renderStepFields = (fields: any[]) => (
        <div className="px-4 max-w-2xl w-full pb-3 mx-auto md:px-0">
            {step === 1 && renderSectionHeader("Respondent Details")}
            {step === 2 && renderSectionHeader("Expectations & Strategic Alignment")}
            {step === 3 && renderSectionHeader("Service Quality & Performance")}
            {step === 4 && renderSectionHeader("Communication & Responsiveness")}
            {step === 5 && renderSectionHeader("Overall Experience")}

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
                    <Button onClick={handleBack} className="!bg-white !text-black border border-gray-300 !text-lg w-full max-w-2xl mx-auto">Back</Button>
                )}
                <Button onClick={handleNext} className="!bg-[#E31313] !text-white !font-bold !text-lg w-full max-w-2xl mx-auto">
                    {step === STEPS_COUNT ? "Submit" : "Next"}
                </Button>
            </div>
        </div>
    );

    return (
        <div className="relative min-h-screen !bg-[#FFFBFB] flex flex-col py-10 justify-center overflow-hidden">
            <StepIndicator step={step} stepStructure={stepStructure} getStepProgress={(n) => n < step ? 100 : n === step ? 50 : 0} handleStepClick={(n) => n < step && setStep(n)} />
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
                    headerTitle="Respondent Details"
                    isClientPage={true}
                />
            )}
            {step >= 2 && renderStepFields(
                step === 2 ? step2Fields :
                    step === 3 ? step3Fields :
                        step === 4 ? step4Fields : step5Fields
            )}
        </div>
    );
}