"use client";

import { useState } from "react";

import Image from "next/image";

import DynamicField from "@/components/shared/DynamicField";
import apiClient from "@/lib/api";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/Button";

interface FormField {
    id: string;
    name: string;
    label: string;
    fieldType: string;
    type?: string;
    options?: any[] | null;
    placeholder?: string;
}

export default function ProjectToOperation() {
    const [formData, setFormData] = useState<Record<string, any>>({});
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const step2Fields = [
        { id: "1", name: "submitted_by_id", label: "Your Name", fieldType: "searchable" },
        { id: "2", name: "submitted_for_id", label: "Operations Manager's Name", fieldType: "searchable" },

        {
            id: "3",
            name: "expectations_clarity_rating",
            label: "Expectations are communicated clearly.",
            fieldType: "dropdown",
            type: "Clarity & Direction",
            options: [
                { label: "1", value: "1" },
                { label: "2", value: "2" },
                { label: "3", value: "3" },
                { label: "4", value: "4" },
                { label: "5", value: "5" },
            ],
        },
        {
            id: "4",
            name: "priorities_shared_rating",
            label: "Priorities are shared in a timely manner.",
            fieldType: "dropdown",
            type: "Clarity & Direction",
            options: [
                { label: "1", value: "1" },
                { label: "2", value: "2" },
                { label: "3", value: "3" },
                { label: "4", value: "4" },
                { label: "5", value: "5" },
            ],
        },
        {
            id: "5",
            name: "guidance_provided_rating",
            label: "Guidance is provided when required.",
            fieldType: "dropdown",
            type: "Clarity & Direction",
            options: [
                { label: "1", value: "1" },
                { label: "2", value: "2" },
                { label: "3", value: "3" },
                { label: "4", value: "4" },
                { label: "5", value: "5" },
            ],
        },
        {
            id: "6",
            name: "decisions_explained_rating",
            label: "Decisions are explained clearly.",
            fieldType: "dropdown",
            type: "Clarity & Direction",
            options: [
                { label: "1", value: "1" },
                { label: "2", value: "2" },
                { label: "3", value: "3" },
                { label: "4", value: "4" },
                { label: "5", value: "5" },
            ],
        },
        {
            id: "7",
            name: "respectful_communication_rating",
            label: "Communication is respectful and professional.",
            fieldType: "dropdown",
            type: "Behaviour",
            options: [
                { label: "1", value: "1" },
                { label: "2", value: "2" },
                { label: "3", value: "3" },
                { label: "4", value: "4" },
                { label: "5", value: "5" },
            ],
        },
        {
            id: "8",
            name: "constructive_feedback_rating",
            label: "Feedback is given constructively.",
            fieldType: "dropdown",
            type: "Behaviour",
            options: [
                { label: "1", value: "1" },
                { label: "2", value: "2" },
                { label: "3", value: "3" },
                { label: "4", value: "4" },
                { label: "5", value: "5" },
            ],
        },
        {
            id: "9",
            name: "concerns_listened_rating",
            label: "Concerns are listened to seriously.",
            fieldType: "dropdown",
            type: "Behaviour",
            options: [
                { label: "1", value: "1" },
                { label: "2", value: "2" },
                { label: "3", value: "3" },
                { label: "4", value: "4" },
                { label: "5", value: "5" },
            ],
        },
        {
            id: "10",
            name: "supportive_environment_rating",
            label: "A supportive work environment is encouraged.",
            fieldType: "dropdown",
            type: "Behaviour",
            options: [
                { label: "1", value: "1" },
                { label: "2", value: "2" },
                { label: "3", value: "3" },
                { label: "4", value: "4" },
                { label: "5", value: "5" },
            ],
        },
        {
            id: "11",
            name: "team_needs_understanding_rating",
            label: "The Operations Manager understands team needs.",
            fieldType: "dropdown",
            type: "Management Competency",
            options: [
                { label: "1", value: "1" },
                { label: "2", value: "2" },
                { label: "3", value: "3" },
                { label: "4", value: "4" },
                { label: "5", value: "5" },
            ],
        },
        {
            id: "12",
            name: "effective_challenges_addressing_rating",
            label: "Challenges are addressed effectively.",
            fieldType: "dropdown",
            type: "Management Competency",
            options: [
                { label: "1", value: "1" },
                { label: "2", value: "2" },
                { label: "3", value: "3" },
                { label: "4", value: "4" },
                { label: "5", value: "5" },
            ],
        },
        {
            id: "13",
            name: "team_coordination_rating",
            label: "Coordination between teams is managed well.",
            fieldType: "dropdown",
            type: "Management Competency",
            options: [
                { label: "1", value: "1" },
                { label: "2", value: "2" },
                { label: "3", value: "3" },
                { label: "4", value: "4" },
                { label: "5", value: "5" },
            ],
        },
        {
            id: "14",
            name: "flexibility_rating",
            label: "Flexibility is shown when required.",
            fieldType: "dropdown",
            type: "Management Competency",
            options: [
                { label: "1", value: "1" },
                { label: "2", value: "2" },
                { label: "3", value: "3" },
                { label: "4", value: "4" },
                { label: "5", value: "5" },
            ],
        },
        {
            id: "15",
            name: "work_effectiveness_improvement_rating",
            label: "Support improves work effectiveness.",
            fieldType: "dropdown",
            type: "Impact & Results",
            options: [
                { label: "1", value: "1" },
                { label: "2", value: "2" },
                { label: "3", value: "3" },
                { label: "4", value: "4" },
                { label: "5", value: "5" },
            ],
        },
        {
            id: "16",
            name: "team_functioning_improvement_rating",
            label: "Team functioning improves under the Operations.",
            fieldType: "dropdown",
            type: "Impact & Results",
            options: [
                { label: "1", value: "1" },
                { label: "2", value: "2" },
                { label: "3", value: "3" },
                { label: "4", value: "4" },
                { label: "5", value: "5" },
            ],
        },
        {
            id: "17",
            name: "smooth_work_progress_rating",
            label: "Work progress feels smooth and organized.",
            fieldType: "dropdown",
            type: "Impact & Results",
            options: [
                { label: "1", value: "1" },
                { label: "2", value: "2" },
                { label: "3", value: "3" },
                { label: "4", value: "4" },
                { label: "5", value: "5" },
            ],
        },
        {
            id: "18",
            name: "overall_operations_support_rating",
            label: "Overall operations support is effective.",
            fieldType: "dropdown",
            type: "Impact & Results",
            options: [
                { label: "1", value: "1" },
                { label: "2", value: "2" },
                { label: "3", value: "3" },
                { label: "4", value: "4" },
                { label: "5", value: "5" },
            ],
        },
        {
            id: "19",
            name: "works_well_text",
            label: "What support from the Operations Manager works well?",
            fieldType: "short",
            type: "Open-Ended Questions",
        },
        {
            id: "20",
            name: "challenges_text",
            label: "What challenges do you face?",
            fieldType: "short",
            type: "Open-Ended Questions",
        },
        {
            id: "21",
            name: "improvement_text",
            label: "What should be improved going forward?",
            fieldType: "short",
            type: "Open-Ended Questions",
        },
    ];

    const submitHandler = async () => {
        const missingFields = step2Fields.filter((f) => {
            const value = formData[f.name];

            if (f.fieldType === "searchable") return !value?.id;
            return !value || value === "";
        });

        if (missingFields.length > 0) {
            const firstMissing = missingFields[0];
            toast.error(`Please fill: ${firstMissing.label}`);
            return;
        }

        const payload = {
            submitted_for_id: formData.submitted_for_id?.id,
            submitted_by_id: formData.submitted_by_id?.id,

            expectations_clarity_rating: formData.expectations_clarity_rating,
            priorities_shared_rating: formData.priorities_shared_rating,
            guidance_provided_rating: formData.guidance_provided_rating,
            decisions_explained_rating: formData.decisions_explained_rating,
            respectful_communication_rating: formData.respectful_communication_rating,
            constructive_feedback_rating: formData.constructive_feedback_rating,
            concerns_listened_rating: formData.concerns_listened_rating,
            supportive_environment_rating: formData.supportive_environment_rating,
            team_needs_understanding_rating: formData.team_needs_understanding_rating,
            effective_challenges_addressing_rating: formData.effective_challenges_addressing_rating,
            team_coordination_rating: formData.team_coordination_rating,
            flexibility_rating: formData.flexibility_rating,
            work_effectiveness_improvement_rating: formData.work_effectiveness_improvement_rating,
            team_functioning_improvement_rating: formData.team_functioning_improvement_rating,
            smooth_work_progress_rating: formData.smooth_work_progress_rating,
            overall_operations_support_rating: formData.overall_operations_support_rating,

            works_well_text: formData.works_well_text || "",
            challenges_text: formData.challenges_text || "",
            improvement_text: formData.improvement_text || "",
        };

        try {
            setIsLoading(true);
            const res = await apiClient.post(`/api/v1/feedback/project-manager-to-operations-manager`, payload,
                {
                    headers: {
                        "x-api-key": process.env.NEXT_PUBLIC_INTERNAL_API_KEY,
                    },
                });
            router.push("/project-to-operation-feedback/thank-you");

            setFormData({});
        } catch (err: any) {
            console.error("Submission error:", err);
            toast.error("Something went wrong. Please check required fields or API schema.");
        } finally {
            setIsLoading(false);
        }
    };

    const month = new Date().toLocaleString("en-US", { month: "long" });
    return (
        <div className="relative min-h-screen flex flex-col  justify-center bg-[#F9F9F9] overflow-hidden">
            <div className="max-w-6xl mx-auto py-10">
                <div className="w-full relative flex  px-6 justify-center items-center mb-6">
                    <Image
                        src="/images/feedBackImage.png"
                        alt="Feedback Banner"
                        width={1400}
                        height={300}
                        className="w-full object-cover rounded-md"
                    />

                    <div className="absolute left-16 top-[30%] -translate-y-1/2">
                        {/* <h1 className="text-xl lg:text-[80px] font-bold text-[#E31313]">{month}</h1> */}
                        <h1 className="text-xl lg:text-[60px] font-bold text-[#E31313]">Feedback Form</h1>
                    </div>
                </div>

                <form
                    className="flex flex-col items-center px-6 overflow-y-auto  space-y-4"
                    onSubmit={(e) => {
                        e.preventDefault();
                        submitHandler();
                    }}
                >
                    <div className="space-y-6 w-full">
                        {step2Fields.map((field, index) => {
                            const prevField = index > 0 ? step2Fields[index - 1] : null;
                            const showTypeHeading = field.type && (!prevField || prevField.type !== field.type);

                            return (
                                <div key={field.id}>
                                    {showTypeHeading && (
                                        <h3 className="text-lg font-semibold text-[#E31313] mb-3 mt-6">
                                            {field.type}
                                        </h3>
                                    )}
                                    <DynamicField
                                        field={field}
                                        value={formData[field.name] || ""}
                                        onChange={(val: any) => setFormData((p) => ({ ...p, [field.name]: val }))}
                                    />
                                </div>
                            );
                        })}

                        <Button
                            type="submit"
                            isLoading={isLoading}
                            className="text-center cursor-pointer mx-auto px-5 py-2 bg-[#F43F46] text-white text-[17px] rounded-full font-semibold gap-2 flex items-center justify-center"
                        >
                            {!isLoading && <Image width={20} height={20} alt="submitlogo" src="/svgs/submit-logo.svg" />}
                            Submit
                        </Button>

                        <div className="mt-8 text-center text-gray-600 text-sm max-w-2xl mx-auto">
                            <p>This feedback form is used to review and evaluate individual employee performance based on different criteria. It helps the organization understand performance levels and areas for improvement.</p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
