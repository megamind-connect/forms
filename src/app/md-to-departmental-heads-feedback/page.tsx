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

export default function MDToDeptHead() {
    const [formData, setFormData] = useState<Record<string, any>>({});
    const router = useRouter();

    const ratingOptions = [
        { label: "1", value: "1" },
        { label: "2", value: "2" },
        { label: "3", value: "3" },
        { label: "4", value: "4" },
        { label: "5", value: "5" },
    ];

    const step2Fields = [
        { id: "1", name: "submitted_by_id", label: "Your Name", fieldType: "searchable" },
        { id: "2", name: "submitted_for_id", label: "Departmental Head's Name", fieldType: "searchable" },

        // A. Role Ownership & Actions
        {
            id: "3",
            name: "understands_responsibilities_rating",
            label: "1. Understands responsibilities and expectations clearly.",
            fieldType: "dropdown",
            type: "Role Ownership & Actions",
            options: ratingOptions,
        },
        {
            id: "4",
            name: "takes_ownership_rating",
            label: "2. Takes ownership of assigned goals.",
            fieldType: "dropdown",
            type: "Role Ownership & Actions",
            options: ratingOptions,
        },
        {
            id: "5",
            name: "plans_prioritizes_rating",
            label: "3. Plans and prioritizes work effectively.",
            fieldType: "dropdown",
            type: "Role Ownership & Actions",
            options: ratingOptions,
        },
        {
            id: "6",
            name: "follows_up_rating",
            label: "4. Follows up on commitments and deliverables.",
            fieldType: "dropdown",
            type: "Role Ownership & Actions",
            options: ratingOptions,
        },

        // B. People & Behaviour
        {
            id: "7",
            name: "communicates_clearly_rating",
            label: "5. Communicates clearly with team members.",
            fieldType: "dropdown",
            type: "People & Behaviour",
            options: ratingOptions,
        },
        {
            id: "8",
            name: "treats_fairly_rating",
            label: "6. Treats team members fairly and respectfully.",
            fieldType: "dropdown",
            type: "People & Behaviour",
            options: ratingOptions,
        },
        {
            id: "9",
            name: "handles_challenges_rating",
            label: "7. Handles challenges in a calm and professional manner.",
            fieldType: "dropdown",
            type: "People & Behaviour",
            options: ratingOptions,
        },
        {
            id: "10",
            name: "open_to_feedback_rating",
            label: "8. Is open to feedback and improvement.",
            fieldType: "dropdown",
            type: "People & Behaviour",
            options: ratingOptions,
        },

        // C. Managerial Competency
        {
            id: "11",
            name: "sound_decision_making_rating",
            label: "9. Demonstrates sound decision-making.",
            fieldType: "dropdown",
            type: "Managerial Competency",
            options: ratingOptions,
        },
        {
            id: "12",
            name: "supports_team_rating",
            label: "10. Supports team members in achieving their goals.",
            fieldType: "dropdown",
            type: "Managerial Competency",
            options: ratingOptions,
        },
        {
            id: "13",
            name: "identifies_addresses_issues_rating",
            label: "11. Identifies and addresses issues proactively.",
            fieldType: "dropdown",
            type: "Managerial Competency",
            options: ratingOptions,
        },
        {
            id: "14",
            name: "adapts_to_requirements_rating",
            label: "12. Adapts well to changing requirements.",
            fieldType: "dropdown",
            type: "Managerial Competency",
            options: ratingOptions,
        },

        // D. Results & Impact
        {
            id: "15",
            name: "team_output_meets_expectations_rating",
            label: "13. Team output meets expectations.",
            fieldType: "dropdown",
            type: "Results & Impact",
            options: ratingOptions,
        },
        {
            id: "16",
            name: "contributes_to_business_goals_rating",
            label: "14. Contributes positively to overall business goals.",
            fieldType: "dropdown",
            type: "Results & Impact",
            options: ratingOptions,
        },
        {
            id: "17",
            name: "alignment_with_company_direction_rating",
            label: "15. Maintains alignment between team and company direction.",
            fieldType: "dropdown",
            type: "Results & Impact",
            options: ratingOptions,
        },
        {
            id: "18",
            name: "overall_performance_effective_rating",
            label: "16. Overall performance as a manager is effective.",
            fieldType: "dropdown",
            type: "Results & Impact",
            options: ratingOptions,
        },

        // Open-Ended Questions
        {
            id: "19",
            name: "leadership_behaviours_well_text",
            label: "1. What leadership behaviours are working well?",
            fieldType: "short",
            type: "Open-Ended Questions",
        },
        {
            id: "20",
            name: "areas_need_improvement_text",
            label: "2. What areas need improvement?",
            fieldType: "short",
            type: "Open-Ended Questions",
        },
        {
            id: "21",
            name: "done_differently_going_forward_text",
            label: "3. What should be done differently going forward?",
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

            understands_brief_rating: formData.understands_responsibilities_rating,
            on_time_delivery_rating: formData.takes_ownership_rating,
            feedback_implementation_rating: formData.plans_prioritizes_rating,
            creative_contribution_rating: formData.follows_up_rating,
            attention_to_detail_rating: formData.communicates_clearly_rating,
            collaboration_rating: formData.treats_fairly_rating,
            self_management_rating: formData.handles_challenges_rating,
            adaptability_rating: formData.open_to_feedback_rating,
            growth_rating: formData.sound_decision_making_rating,
            learning_rating: formData.supports_team_rating,
            last_minute_reason_clarity_rating: formData.identifies_addresses_issues_rating,
            last_minute_handling_rating: formData.adapts_to_requirements_rating,
            deadline_communication_rating: formData.team_output_meets_expectations_rating,

            creative_strength_text: formData.contributes_to_business_goals_rating || "",
            improvement_area_text: formData.alignment_with_company_direction_rating || "",
            process_limitation_text: formData.overall_performance_effective_rating || "",

            what_went_well_text: formData.leadership_behaviours_well_text || "",
            what_needs_improvement_text: formData.areas_need_improvement_text || "",
            what_should_be_done_differently_text: formData.done_differently_going_forward_text || "",
        };

        try {
            await apiClient.post(`/api/v1/feedback/md-to-department-heads`, payload, {
                headers: {
                    "x-api-key": process.env.NEXT_PUBLIC_INTERNAL_API_KEY,
                },
            });
            router.push("/md-to-departmental-heads-feedback/thank-you");
            setFormData({});
        } catch (err: any) {
            console.error("Submission error:", err);
            toast.error("Something went wrong. Please check required fields or API schema.");
        }
    };

    return (
        <div className="relative min-h-screen flex flex-col justify-center bg-[#F9F9F9] overflow-hidden">
            <div className="max-w-6xl mx-auto py-10">
                <div className="w-full relative flex px-6 justify-center items-center mb-6">
                    <Image
                        src="/images/feedBackImage.png"
                        alt="Feedback Banner"
                        width={1400}
                        height={300}
                        className="w-full object-cover rounded-md"
                    />
                    <div className="absolute left-16 top-[30%] -translate-y-1/2">
                        <h1 className="text-xl lg:text-[60px] font-bold text-[#E31313]">Feedback Form</h1>
                    </div>
                </div>

                <form
                    className="flex flex-col items-center px-6 overflow-y-auto space-y-4"
                    onSubmit={(e) => {
                        e.preventDefault();
                        submitHandler();
                    }}
                >
                    <div className="space-y-6 w-full">
                        {step2Fields.map((field, index) => {
                            const prevField = index > 0 ? step2Fields[index - 1] : null;
                            const showTypeHeading = field.type && (!prevField || (prevField as any).type !== field.type);

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
                                        onChange={(val) => setFormData((p) => ({ ...p, [field.name]: val }))}
                                    />
                                </div>
                            );
                        })}

                        <button
                            type="submit"
                            className="text-center cursor-pointer mx-auto px-5 py-2 bg-[#F43F46] text-white text-[17px] rounded-full font-semibold gap-2 flex items-center justify-center mt-8"
                        >
                            <Image width={20} height={20} alt="submitlogo" src="/svgs/submit-logo.svg" />
                            Submit
                        </button>

                        <div className="mt-8 text-center text-gray-600 text-sm max-w-2xl mx-auto">
                            <p>This feedback form is used to review and evaluate individual employee performance based on different criteria. It helps the organization understand performance levels and areas for improvement.</p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
