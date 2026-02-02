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
            { value: "Very Poor", label: "Very Poor" },
            { value: "Poor", label: "Poor" },
            { value: "Average", label: "Average" },
            { value: "Good", label: "Good" },
            { value: "Exceptional", label: "Exceptional" },
        ],
    },
    {
        id: "impact_res",
        name: "impact_results",
        label: "5. How would you assess the impact and results of our services on your brand?",
        fieldType: "rating5",
        options: [
            { value: "Very Poor", label: "Very Poor" },
            { value: "Poor", label: "Poor" },
            { value: "Average", label: "Average" },
            { value: "Good", label: "Good" },
            { value: "Exceptional", label: "Exceptional" },
        ],
    },
    {
        id: "qual_serv",
        name: "quality_services",
        label: "6. Quality of services provided?",
        fieldType: "rating5",
        options: [
            { value: "Very Poor", label: "Very Poor" },
            { value: "Poor", label: "Poor" },
            { value: "Average", label: "Average" },
            { value: "Good", label: "Good" },
            { value: "Exceptional", label: "Exceptional" },
        ],
    },
    {
        id: "del_time",
        name: "delivery_time",
        label: "7. Delivery Time of services",
        fieldType: "rating5",
        options: [
            { value: "Very Poor", label: "Very Poor" },
            { value: "Poor", label: "Poor" },
            { value: "Average", label: "Average" },
            { value: "Good", label: "Good" },
            { value: "Exceptional", label: "Exceptional" },
        ],
    },
    {
        id: "brand_strat",
        name: "brand_strategy",
        label: "8. How would you rate our Brand Strategy in terms of aligning with your business",
        fieldType: "rating5",
        options: [
            { value: "Very Poor", label: "Very Poor" },
            { value: "Poor", label: "Poor" },
            { value: "Average", label: "Average" },
            { value: "Good", label: "Good" },
            { value: "Exceptional", label: "Exceptional" },
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
            { label: "Graphic Design", value: "Graphic Design" },
            { label: "PPC", value: "PPC" },
            { label: "Video Shoot / Production", value: "Video Shoot / Production" },
            { label: "Video Editing", value: "Video Editing" },
            { label: "Social Media Management", value: "Social Media Management" },
            { label: "Social Media Marketing (includes Graphic Design, Video Shoot, Video Editing, and Management)", value: "Social Media Marketing" },
            { label: "Website Development", value: "Website Development" },
            { label: "Software Development", value: "Software Development" },
            { label: "Others…", value: "other" },
        ],
    },
    {
        id: "service_align_buisness",
        name: "service_align_buisness",
        label: "10. How well do our services align with your business goals this month?  ",
        fieldType: "rating5",
        options: [
            { value: "Extremely Well", label: "Extremely Well" },
            { value: "Somewhat Well", label: "Somewhat Well" },
            { value: "Neutral", label: "Neutral" },
            { value: "Somewhat Not Well", label: "Somewhat Not Well" },
            { value: "Extremely Not Well", label: "Extremely Not Well" },
        ],
    },
    {
        id: "rate_ability_deadlines",
        name: "rate_ability_deadlines",
        label: "11. How would you rate our ability to meet deadlines this month?   ",
        fieldType: "rating5",
        options: [
            { value: "Never", label: "Never" },
            { value: "Rarely", label: "Rarely" },
            { value: "Sometimes", label: "Sometimes" },
            { value: "Usually", label: "Usually" },
            { value: "Always", label: "Always" },
        ],
    },
    {
        id: "feedback_requests_understanding",
        name: "feedback_requests_understanding",
        label: "12. Do you feel your feedback and requests were understood and incorporated into the work?   ",
        fieldType: "rating5",
        options: [
            { value: "Excellent", label: "Excellent" },
            { value: "Good", label: "Good" },
            { value: "Average", label: "Average" },
            { value: "Poor", label: "Poor" },
            { value: "Very Poor", label: "Very Poor" },
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
            { value: "Significant Results", label: "Significant Results" },
            { value: "Strong Results", label: "Strong Results" },
            { value: "Moderate Results", label: "Moderate Results" },
            { value: "Minimal Results", label: "Minimal Results" },
            { value: "No Results", label: "No Results" },
        ],
    },
    {
        id: "creative_work",
        name: "creative_work",
        label: "14. How would you rate our content creation and creative work in representing your brand? ",
        fieldType: "rating5",
        options: [
            { value: "Excellent", label: "Excellent" },
            { value: "Good", label: "Good" },
            { value: "Average", label: "Average" },
            { value: "Very Slow", label: "Very Slow" },
            { value: "Slow", label: "Slow" },
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
            { value: "Extremely Responsive", label: "Extremely Responsive" },
            { value: "Responsive", label: "Responsive" },
            { value: "Neutral", label: "Neutral" },
            { value: "Very Slow", label: "Very Slow" },
            { value: "Slow", label: "Slow" },
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
            { value: "Definitely Yes", label: "Definitely Yes" },
            { value: "Probably Yes", label: "Probably Yes" },
            { value: "Not sure yet", label: "Not sure yet" },
            { value: "Probably Not", label: "Probably Not" },
            { value: "Definitely Not", label: "Definitely Not" },
        ],
    },
    {
        id: "recommendation",
        name: "recommendation",
        label: "20.How likely are you to recommend Megamind to others?   ",
        fieldType: "rating5",
        options: [
            { value: "Definitely Yes", label: "Definitely Yes" },
            { value: "Probably Yes", label: "Probably Yes" },
            { value: "Not sure", label: "Not sure" },
            { value: "Probably Not", label: "Probably Not" },
            { value: "Definitely Not", label: "Definitely Not" },
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

export default function RetainerFeedbackPage() {
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
        const payload = {
            clientId: id,
            organisation_name: formData.organisation_name,
            person_name: formData.person_name,
            position_role: formData.position_role,
            overall_experience: formData.overall_experience || "",
            impact_results: formData.impact_results || "",
            quality_services: formData.quality_services || "",
            delivery_time: formData.delivery_time || "",
            brand_strategy: formData.brand_strategy || "",
            services_provided: formData.services_provided?.list || [],
            service_align_buisness: formData.service_align_buisness || "",
            rate_ability_deadlines: formData.rate_ability_deadlines || "",
            feedback_requests_understanding: formData.feedback_requests_understanding || "",
            digital_marketing_results: formData.digital_marketing_results || "",
            creative_work: formData.creative_work || "",
            surprised_deliverables: formData.surprised_deliverables || "",
            enquiries_response: formData.enquiries_response || "",
            overall_work_relationship: formData.overall_work_relationship || "",
            project_improvements: formData.project_improvements || "",
            future_service: formData.future_service || "",
            recommendation: formData.recommendation || "",
            comments_suggestions: formData.comments_suggestions || "",
        };

        try {
            await apiClient.post(`/api/v1/feedback/retainer`, payload, {
                headers: {
                    "x-api-key": process.env.NEXT_PUBLIC_INTERNAL_API_KEY,
                },
            });
            toast.success("Thank you! Your feedback has been submitted.");
            router.push("/retainer-feedback/thank-you");
            setFormData({});
            setStep(1);
        } catch (err) {
            console.error("Submission error:", err);
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

            {step === STEPS_COUNT && (
                <div className="mt-8 text-center text-gray-600 text-sm max-w-2xl mx-auto">
                    <p>This feedback form is used to review and evaluate individual employee performance based on different criteria. It helps the organization understand performance levels and areas for improvement.</p>
                </div>
            )}
        </div>
    );

    return (
        <div className="relative min-h-screen !bg-[#FFFBFB] flex flex-col py-10 justify-center overflow-hidden">
            <StepIndicator
                step={step}
                stepStructure={stepStructure}
                getStepProgress={getStepProgress}
                handleStepClick={handleStepClick}
            />

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
                    headerTitle=""
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
