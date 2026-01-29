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

export default function Employee() {
  const [formData, setFormData] = useState<Record<string, any>>({});

  const router = useRouter();

  const step2Fields = [
    { id: "1", name: "submitted_by_id", label: "Your Name", fieldType: "searchable" },
    { id: "2", name: "submitted_for_id", label: "Manager's Name", fieldType: "searchable" },

    // Actions
    {
      id: "3",
      name: "brief_shared_rating",
      label: "My manager clearly explains expectations and goals.",
      fieldType: "dropdown",
      type: "Actions",
      options: [
        { label: "5", value: "5" },
        { label: "4", value: "4" },
        { label: "3", value: "3" },
        { label: "2", value: "2" },
        { label: "1", value: "1" },
      ],
    },
    {
      id: "4",
      name: "brief_understandability_rating",
      label: "My manager provides timely guidance when needed.",
      fieldType: "dropdown",
      type: "Actions",
      options: [
        { label: "5", value: "5" },
        { label: "4", value: "4" },
        { label: "3", value: "3" },
        { label: "2", value: "2" },
        { label: "1", value: "1" },
      ],
    },
    {
      id: "5",
      name: "manager_clarifies_brief_rating",
      label: "My manager follows up on work constructively.",
      fieldType: "dropdown",
      type: "Actions",
      options: [
        { label: "5", value: "5" },
        { label: "4", value: "4" },
        { label: "3", value: "3" },
        { label: "2", value: "2" },
        { label: "1", value: "1" },
      ],
    },

    // Behaviour
    {
      id: "6",
      name: "creative_comfort_rating",
      label: "My manager listens to my concerns.",
      fieldType: "dropdown",
      type: "Behaviour",
      options: [
        { label: "5", value: "5" },
        { label: "4", value: "4" },
        { label: "3", value: "3" },
        { label: "2", value: "2" },
        { label: "1", value: "1" },
      ],
    },
    {
      id: "7",
      name: "balance_rating",
      label: "My manager treats the team members fairly.",
      fieldType: "dropdown",
      type: "Behaviour",
      options: [
        { label: "5", value: "5" },
        { label: "4", value: "4" },
        { label: "3", value: "3" },
        { label: "2", value: "2" },
        { label: "1", value: "1" },
      ],
    },
    {
      id: "8",
      name: "growth_feedback_rating",
      label: "My manager gives feedback in a respectful way.",
      fieldType: "dropdown",
      type: "Behaviour",
      options: [
        { label: "5", value: "5" },
        { label: "4", value: "4" },
        { label: "3", value: "3" },
        { label: "2", value: "2" },
        { label: "1", value: "1" },
      ],
    },
    {
      id: "9",
      name: "deadline_clarity_rating",
      label: "I feel comfortable approaching my manager.",
      fieldType: "dropdown",
      type: "Behaviour",
      options: [
        { label: "5", value: "5" },
        { label: "4", value: "4" },
        { label: "3", value: "3" },
        { label: "2", value: "2" },
        { label: "1", value: "1" },
      ],
    },

    // Competency
    {
      id: "10",
      name: "last_minute_work_reason_rating",
      label: "My manager has a good understanding of our work process.",
      fieldType: "dropdown",
      type: "Competency",
      options: [
        { label: "5", value: "5" },
        { label: "4", value: "4" },
        { label: "3", value: "3" },
        { label: "2", value: "2" },
        { label: "1", value: "1" },
      ],
    },
    {
      id: "11",
      name: "support_rating",
      label: "My manager makes informed decisions.",
      fieldType: "dropdown",
      type: "Competency",
      options: [
        { label: "5", value: "5" },
        { label: "4", value: "4" },
        { label: "3", value: "3" },
        { label: "2", value: "2" },
        { label: "1", value: "1" },
      ],
    },
    {
      id: "12",
      name: "workload_rating",
      label: "My manager supports my learning and growth.",
      fieldType: "dropdown",
      type: "Competency",
      options: [
        { label: "5", value: "5" },
        { label: "4", value: "4" },
        { label: "3", value: "3" },
        { label: "2", value: "2" },
        { label: "1", value: "1" },
      ],
    },

    // Results
    {
      id: "13",
      name: "acknowledgement_rating",
      label: "My manager helps the team achieve targets.",
      fieldType: "dropdown",
      type: "Results",
      options: [
        { label: "5", value: "5" },
        { label: "4", value: "4" },
        { label: "3", value: "3" },
        { label: "2", value: "2" },
        { label: "1", value: "1" },
      ],
    },
    {
      id: "14",
      name: "manager_motivates_team_rating",
      label: "My manager motivates the team effectively.",
      fieldType: "dropdown",
      type: "Results",
      options: [
        { label: "5", value: "5" },
        { label: "4", value: "4" },
        { label: "3", value: "3" },
        { label: "2", value: "2" },
        { label: "1", value: "1" },
      ],
    },
    {
      id: "15",
      name: "manager_contributes_to_team_rating",
      label: "My manager contributes positively to team performance.",
      fieldType: "dropdown",
      type: "Results",
      options: [
        { label: "5", value: "5" },
        { label: "4", value: "4" },
        { label: "3", value: "3" },
        { label: "2", value: "2" },
        { label: "1", value: "1" },
      ],
    },

    // Open-Ended Questions
    {
      id: "16",
      name: "manager_does_well_text",
      label: "What did your manager do well?",
      fieldType: "short",
      type: "Open-Ended Questions",
      placeholder: "Write your response…",
    },
    {
      id: "17",
      name: "manager_could_improve_text",
      label: "What could your manager improve?",
      fieldType: "short",
      type: "Open-Ended Questions",
      placeholder: "Write your response…",
    },
    {
      id: "18",
      name: "manager_future_expectations_text",
      label: "What do you expect your manager to do differently in the future?",
      fieldType: "short",
      type: "Open-Ended Questions",
      placeholder: "Write your response…",
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

      brief_shared_rating: formData.brief_shared_rating,
      brief_understandability_rating: formData.brief_understandability_rating,
      manager_clarifies_brief_rating: formData.manager_clarifies_brief_rating,
      creative_comfort_rating: formData.creative_comfort_rating,
      balance_rating: formData.balance_rating,
      growth_feedback_rating: formData.growth_feedback_rating,
      deadline_clarity_rating: formData.deadline_clarity_rating,
      last_minute_work_reason_rating: formData.last_minute_work_reason_rating,
      support_rating: formData.support_rating,
      workload_rating: formData.workload_rating,
      acknowledgement_rating: formData.acknowledgement_rating,
      manager_motivates_team_rating: formData.manager_motivates_team_rating,
      manager_contributes_to_team_rating: formData.manager_contributes_to_team_rating,

      manager_does_well_text: formData.manager_does_well_text || "",
      manager_could_improve_text: formData.manager_could_improve_text || "",
      manager_future_expectations_text: formData.manager_future_expectations_text || "",
    };


    try {
      const res = await apiClient.post(`/api/v1/feedback/employee-to-manager`,
        payload,
        {
          headers: {
            "x-api-key": process.env.NEXT_PUBLIC_INTERNAL_API_KEY,
          },
        }
      );

      router.push("/employee/thank-you");
      setFormData({});
    } catch (err: any) {
      toast.error("Something went wrong. Please check required fields or API schema.");
    }
  };


  const month = new Date().toLocaleString("en-US", { month: "long" });
  return (
    <div className="relative min-h-screen flex flex-col  justify-center bg-[#F9F9F9] overflow-hidden">
      <div className="max-w-6xl mx-auto py-10">
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
