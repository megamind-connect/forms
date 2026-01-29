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

export default function ManagerToIntern() {
    const [formData, setFormData] = useState<Record<string, any>>({});
    const [errors, setErrors] = useState<Record<string, string>>({});

    const router = useRouter();

    const step2Fields = [
        { id: "11", name: "submitted_by_id", label: "Your Name", fieldType: "searchable" },
        { id: "21", name: "submitted_for_id", label: "Employee's Name", fieldType: "searchable" },

        // Work & Actions
        {
            id: "1",
            name: "understands_brief_rating",
            label: "Understand the tasks assigned.",
            fieldType: "dropdown",
            type: "Work & Actions",
            options: [
                { label: "1", value: "1" },
                { label: "2", value: "2" },
                { label: "3", value: "3" },
                { label: "4", value: "4" },
                { label: "5", value: "5" },
            ],
        },
        {
            id: "2",
            name: "on_time_delivery_rating",
            label: "Completes assigned work on time.",
            fieldType: "dropdown",
            type: "Work & Actions",
            options: [
                   { label: "1", value: "1" },
                { label: "2", value: "2" },
                { label: "3", value: "3" },
                { label: "4", value: "4" },
                { label: "5", value: "5" },
            ],
        },
        {
            id: "3",
            name: "feedback_implementation_rating",
            label: "Follows instructions clearly.",
            fieldType: "dropdown",
            type: "Work & Actions",
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
            name: "creative_contribution_rating",
            label: "Shows responsibility towards assigned tasks.",
            fieldType: "dropdown",
            type: "Work & Actions",
            options: [
                   { label: "1", value: "1" },
                { label: "2", value: "2" },
                { label: "3", value: "3" },
                { label: "4", value: "4" },
                { label: "5", value: "5" },
            ],
        },

        // Behaviour & Attitude
        {
            id: "5",
            name: "attention_to_detail_rating",
            label: "Communicates respectfully.",
            fieldType: "dropdown",
            type: "Behaviour & Attitude",
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
            name: "collaboration_rating",
            label: "Is open to feedback and guidance.",
            fieldType: "dropdown",
            type: "Behaviour & Attitude",
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
            name: "self_management_rating",
            label: "Shows a positive attitude towards work.",
            fieldType: "dropdown",
            type: "Behaviour & Attitude",
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
            name: "adaptability_rating",
            label: "Works well with team members.",
            fieldType: "dropdown",
            type: "Behaviour & Attitude",
            options: [
                   { label: "1", value: "1" },
                { label: "2", value: "2" },
                { label: "3", value: "3" },
                { label: "4", value: "4" },
                { label: "5", value: "5" },
            ],
        },

        // Learning & Competency
        {
            id: "9",
            name: "growth_rating",
            label: "Shows willingness to learn new skills.",
            fieldType: "dropdown",
            type: "Learning & Competency",
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
            name: "learning_rating",
            label: "Applies learning to assigned work.",
            fieldType: "dropdown",
            type: "Learning & Competency",
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
            name: "last_minute_reason_clarity_rating",
            label: "Asks questions when unsure.",
            fieldType: "dropdown",
            type: "Learning & Competency",
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
            name: "last_minute_handling_rating",
            label: "Adapts well to new tasks.",
            fieldType: "dropdown",
            type: "Learning & Competency",
            options: [
                   { label: "1", value: "1" },
                { label: "2", value: "2" },
                { label: "3", value: "3" },
                { label: "4", value: "4" },
                { label: "5", value: "5" },
            ],
        },

        // Contribution & Results
        {
            id: "13",
            name: "deadline_communication_rating",
            label: "Work meets expectations for the role.",
            fieldType: "dropdown",
            type: "Contribution & Results",
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
            name: "creative_strength_text",
            label: "Contributes positively to the team.",
            fieldType: "dropdown",
            type: "Contribution & Results",
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
            name: "improvement_area_text",
            label: "Shows improvement over time.",
            fieldType: "dropdown",
            type: "Contribution & Results",
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
            name: "process_limitation_text",
            label: "Overall performance is satisfactory.",
            fieldType: "dropdown",
            type: "Contribution & Results",
            options: [
                   { label: "1", value: "1" },
                { label: "2", value: "2" },
                { label: "3", value: "3" },
                { label: "4", value: "4" },
                { label: "5", value: "5" },
            ],
        },

        // Open-Ended Questions
        {
            id: "17",
            name: "what_went_well_text",
            label: "What went well?",
            fieldType: "short",
            type: "Open-Ended Questions",
        },
        {
            id: "18",
            name: "what_needs_improvement_text",
            label: "What areas need improvement?",
            fieldType: "short",
            type: "Open-Ended Questions",
        },
        {
            id: "19",
            name: "what_should_be_done_differently_text",
            label: "What should be focused on going forward?",
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

            understands_brief_rating: formData.understands_brief_rating,
            on_time_delivery_rating: formData.on_time_delivery_rating,
            feedback_implementation_rating: formData.feedback_implementation_rating,
            creative_contribution_rating: formData.creative_contribution_rating,
            attention_to_detail_rating: formData.attention_to_detail_rating,
            collaboration_rating: formData.collaboration_rating,
            self_management_rating: formData.self_management_rating,
            adaptability_rating: formData.adaptability_rating,
            growth_rating: formData.growth_rating,
            learning_rating: formData.learning_rating,
            last_minute_reason_clarity_rating: formData.last_minute_reason_clarity_rating,
            last_minute_handling_rating: formData.last_minute_handling_rating,
            deadline_communication_rating: formData.deadline_communication_rating,

            creative_strength_text: formData.creative_strength_text || "",
            improvement_area_text: formData.improvement_area_text || "",
            process_limitation_text: formData.process_limitation_text || "",
            what_went_well_text: formData.what_went_well_text || "",
            what_needs_improvement_text: formData.what_needs_improvement_text || "",
            what_should_be_done_differently_text: formData.what_should_be_done_differently_text || "",
        };


        try {
            const res = await apiClient.post(`/api/v1/feedback/manager-to-intern`, payload,
                {
                    headers: {
                        "x-api-key": process.env.NEXT_PUBLIC_INTERNAL_API_KEY,
                    },
                });
            router.push("/manager-to-intern/thank-you");

            setFormData({});
        } catch (err: any) {
            toast.error("Something went wrong. Please check required fields or API schema.");
        }
    };

    const month = new Date().toLocaleString("en-US", { month: "long" });
    return (
        <div className="relative min-h-screen flex flex-col  justify-center bg-[#F9F9F9] overflow-hidden">
                   <div className="w-3xl max-w-6xl mx-auto py-10">
                       <div className="w-full relative flex  px-6 justify-center items-center mb-6">
                           <Image
                               src="/images/feedBackImage.png" // <-- your image here
                               alt="Feedback Banner"
                               width={1400}
                               height={300}
                               className="w-full object-cover rounded-md"
                           />
       
                           {/* ✅ Month Name Overlaid */}
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
                           <div className="space-y-6 w-full  ">
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
