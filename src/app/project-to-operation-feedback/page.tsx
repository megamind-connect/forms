"use client";

import { useState } from "react";

import Image from "next/image";

import DynamicField from "@/components/shared/DynamicField";
import apiClient from "@/lib/api";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

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
            name: "workload_manageable_rating",
            label: "The workload is manageable most of the time.",
            fieldType: "dropdown",
            type: "Work Environment & Growth",
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
            name: "work_life_balance_rating",
            label: "I feel a healthy work-life balance is encouraged.",
            fieldType: "dropdown",
            type: "Work Environment & Growth",
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
            name: "professional_growth_rating",
            label: "Megamind feels like a place where I can grow professionally.",
            fieldType: "dropdown",
            type: "Work Environment & Growth",
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
            name: "hr_approachable_rating",
            label: "HR is approachable and easy to talk to.",
            fieldType: "dropdown",
            type: "HR Experience",
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
            name: "hr_listens_rating",
            label: "HR listens to employee concerns seriously.",
            fieldType: "dropdown",
            type: "HR Experience",
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
            name: "hr_culture_rating",
            label: "HR contributes positively to workplace culture.",
            fieldType: "dropdown",
            type: "HR Experience",
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
            name: "enjoy_working_text",
            label: "What do you enjoy most about working at Megamind?",
            fieldType: "short",
            type: "Open-Ended Questions",
        },
        {
            id: "17",
            name: "challenges_faced_text",
            label: "What challenges or difficulties do you face at work?",
            fieldType: "short",
            type: "Open-Ended Questions",
        },
        {
            id: "18",
            name: "improve_life_text",
            label: "What can be done to improve Life at Megamind?",
            fieldType: "short",
            type: "Open-Ended Questions",
        },
        {
            id: "19",
            name: "anonymous_share_text",
            label: "Is there anything you would like to share anonymously with the HR Team?",
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
            workload_manageable_rating: formData.workload_manageable_rating,
            work_life_balance_rating: formData.work_life_balance_rating,
            professional_growth_rating: formData.professional_growth_rating,
            hr_approachable_rating: formData.hr_approachable_rating,
            hr_listens_rating: formData.hr_listens_rating,
            hr_culture_rating: formData.hr_culture_rating,

            enjoy_working_text: formData.enjoy_working_text || "",
            challenges_faced_text: formData.challenges_faced_text || "",
            improve_life_text: formData.improve_life_text || "",
            anonymous_share_text: formData.anonymous_share_text || "",
        };

        try {
            const res = await apiClient.post(`/api/v1/feedback/project-to-operation`, payload,
                {
                    headers: {
                        "x-api-key": process.env.NEXT_PUBLIC_INTERNAL_API_KEY,
                    },
                });
            router.push("/project-to-operation/thank-you");

            setFormData({});
        } catch (err: any) {
            console.error("Submission error:", err);
            toast.error("Something went wrong. Please check required fields or API schema.");
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
                        <h1 className="text-xl lg:text-[80px] font-bold text-[#E31313]">{month}</h1>
                        <h1 className="text-base lg:text-3xl font-semibold text-[#E31313]">Feedback Form</h1>
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

                        <button
                            type="submit"
                            className=" text-center cursor-pointer mx-auto px-5 py-2 bg-[#F43F46] text-white text-[17px] rounded-full font-semibold  gap-2 flex items-center justify-center"
                        >
                            <Image width={20} height={20} alt="submitlogo" src="/svgs/submit-logo.svg" />
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
