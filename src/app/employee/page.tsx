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
  options?: string[] | null;
  placeholder?: string;
}

export default function Employee() {
  const [formData, setFormData] = useState<Record<string, any>>({});

   const router = useRouter();

  const step2Fields = [
    { id: "1", name: "submitted_by_id", label: "Your Name", fieldType: "searchable" },
    { id: "2", name: "submitted_for_id", label: "Manager's Name", fieldType: "searchable" },

    {
      id: "3",
      name: "brief_shared_rating",
      label:
        "Are project briefs shared with you before the start of the work, with all key details (objectives, references, deliverables, timeline)?",
      fieldType: "dropdown",
      options: [
        { label: "Always", value: "always" },
        { label: "Often", value: "often" },
        { label: "Sometimes", value: "sometimes" },
        { label: "Rarely", value: "rarely" },
        { label: "Never", value: "never" },
      ],
    },
    {
      id: "4",
      name: "brief_understandability_rating",
      label: "Are the briefs usually clear and easy to understand, or do they often require clarification?",
      fieldType: "dropdown",
      options: [
        { label: "Always clear", value: "always_clear" },
        { label: "Sometimes need clarity", value: "sometimes_need_clarity" },
        { label: "Often unclear", value: "often_unclear" },
        { label: "Usually incomplete", value: "usually_incomplete" },
      ],
    },
    {
      id: "5",
      name: "manager_clarifies_brief_rating",
      label: "When a brief is unclear, does your manager take responsibility to clarify it quickly?",
      fieldType: "dropdown",
      options: [
        { label: "Always", value: "always" },
        { label: "Sometimes", value: "sometimes" },
        { label: "Rarely", value: "rarely" },
        { label: "Not applicable", value: "not_applicable" },
      ],
    },
    {
      id: "6",
      name: "creative_comfort_rating",
      label: "Do you feel comfortable raising creative suggestions or concerns directly with your manager?",
      fieldType: "dropdown",
      options: [
        { label: "Always", value: "always" },
        { label: "Usually", value: "usually" },
        { label: "Not really", value: "not_really" },
        { label: "Avoid it", value: "avoid_it" },
      ],
    },
    {
      id: "7",
      name: "balance_rating",
      label: "Does your manager balance timelines and creative quality, or is the focus usually on fast delivery?",
      fieldType: "dropdown",
      options: [
        { label: "Balanced", value: "balanced" },
        { label: "Leans toward quality", value: "leans_quality" },
        { label: "Leans toward speed", value: "leans_speed" },
        { label: "Always rushed", value: "always_rushed" },
      ],
    },
    {
      id: "8",
      name: "growth_feedback_rating",
      label: "How frequently do you receive feedback that helps you grow creatively?",
      fieldType: "dropdown",
      options: [
        { label: "Very often", value: "very_often" },
        { label: "Sometimes", value: "sometimes" },
        { label: "Rarely", value: "rarely" },
        { label: "Never", value: "never" },
      ],
    },
    {
      id: "9",
      name: "deadline_clarity_rating",
      label: "Do you receive deadlines in a timely and clear manner?",
      fieldType: "dropdown",
      options: [
        { label: "Always", value: "always" },
        { label: "Usually", value: "usually" },
        { label: "Sometimes last-minute", value: "sometimes_last_minute" },
        { label: "Rarely on time", value: "rarely_on_time" },
      ],
    },
    {
      id: "10",
      name: "last_minute_work_reason_rating",
      label: "When there's last-minute work, do you know whether it's due to the client or internal planning?",
      fieldType: "dropdown",
      options: [
        { label: "Mostly from client", value: "client" },
        { label: "Mostly from internal team", value: "internal" },
        { label: "A mix of both", value: "mix" },
        { label: "Not communicated", value: "not_communicated" },
      ],
    },
    {
      id: "11",
      name: "support_rating",
      label: "Do you feel supported in managing urgent turnarounds (e.g., prioritization, rescheduling, backup)?",
      fieldType: "dropdown",
      options: [
        { label: "Yes, fully supported", value: "fully_supported" },
        { label: "Sometimes", value: "sometimes" },
        { label: "Rarely", value: "rarely" },
        { label: "No support", value: "no_support" },
      ],
    },
    {
      id: "12",
      name: "workload_rating",
      label: "Is your workload generally managed in a way that avoids burnout or constant rush?",
      fieldType: "dropdown",
      options: [
        { label: "Yes", value: "yes" },
        { label: "Sometimes", value: "sometimes" },
        { label: "No", value: "no" },
        { label: "Often overwhelmed", value: "often_overwhelmed" },
      ],
    },
    {
      id: "13",
      name: "acknowledgement_rating",
      label: "Are your efforts or creative ideas acknowledged in final outcomes or team meetings?",
      fieldType: "dropdown",
      options: [
        { label: "Always", value: "always" },
        { label: "Sometimes", value: "sometimes" },
        { label: "Rarely", value: "rarely" },
        { label: "Never", value: "never" },
      ],
    },
    {
      id: "14",
      name: "manager_does_well_text",
      label: "What is one thing your manager does well that you appreciate?",
      fieldType: "short",
      placeholder: "Write your response…",
    },
    {
      id: "15",
      name: "manager_could_improve_text",
      label: "What is one thing your manager could improve to support your creative process?",
      fieldType: "short",
      placeholder: "Write your response…",
    },
    {
      id: "16",
      name: "process_improvement_text",
      label: "What process or system could be improved to help you do better work? (e.g., brief quality, review flow, communication)",
      fieldType: "short",
      placeholder: "Write your response…",
    },
    {
      id: "17",
      name: "support_expect_from_manager",
      label: "What support do you expect from managers?",
      fieldType: "short",
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

    manager_does_well_text: formData.manager_does_well_text || "",
    manager_could_improve_text: formData.manager_could_improve_text || "",
    process_improvement_text: formData.process_improvement_text || "",
    
    // ✅ Rename to backend key
    support_expect_from_manager: formData.support_expect_from_manager || "",
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
            {step2Fields.map((field) => (
              <DynamicField
                key={field.id}
                field={field}
                value={formData[field.name] || ""}
                onChange={(val) => setFormData((p) => ({ ...p, [field.name]: val }))}
              />
            ))}

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
