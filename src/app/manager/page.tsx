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

export default function Manager() {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const router = useRouter();

  const step2Fields = [
    { id: "11", name: "submitted_by_id", label: "Your Name", fieldType: "searchable" },
    { id: "21", name: "submitted_for_id", label: "Employee's Name", fieldType: "searchable" },

    {
      id: "1",
      name: "understands_brief_rating",
      label: "Does the team member understand the brief clearly without needing frequent re-explanation?",
      fieldType: "dropdown",
      options: [
        { label: "Always", value: "always" },
        { label: "Often", value: "often" },
        { label: "Sometimes", value: "sometimes" },
        { label: "Rarely", value: "rarely" },
      ],
    },
    {
      id: "2",
      name: "on_time_delivery_rating",
      label: "Do they deliver tasks on time without compromising on creative quality?",
      fieldType: "dropdown",
      options: [
        { label: "Always", value: "always" },
        { label: "Mostly", value: "mostly" },
        { label: "Sometimes", value: "sometimes" },
        { label: "Often miss both", value: "often_miss_both" },
      ],
    },
    {
      id: "3",
      name: "feedback_implementation_rating",
      label: "How well do they implement feedback in revisions?",
      fieldType: "dropdown",
      options: [
        { label: "Very well", value: "very_well" },
        { label: "Mostly well", value: "mostly_well" },
        { label: "Needs effort", value: "needs_effort" },
        { label: "Resistant", value: "resistant" },
      ],
    },
    {
      id: "4",
      name: "creative_contribution_rating",
      label: "Do they actively contribute creative ideas or suggest value additions beyond the brief?",
      fieldType: "dropdown",
      options: [
        { label: "Frequently", value: "frequently" },
        { label: "Occasionally", value: "occasionally" },
        { label: "Rarely", value: "rarely" },
        { label: "Never", value: "never" },
      ],
    },
    {
      id: "5",
      name: "attention_to_detail_rating",
      label: "How consistent is their attention to detail (e.g., layout, brand alignment, transitions)?",
      fieldType: "dropdown",
      options: [
        { label: "Very consistent", value: "very_consistent" },
        { label: "Mostly good", value: "mostly_good" },
        { label: "Inconsistent", value: "inconsistent" },
        { label: "Needs improvement", value: "needs_improvement" },
      ],
    },
    {
      id: "6",
      name: "collaboration_rating",
      label: "How well do they collaborate with other team members (writers, editors, designers, client-facing roles)?",
      fieldType: "dropdown",
      options: [
        { label: "Excellent", value: "excellent" },
        { label: "Good", value: "good" },
        { label: "Needs work", value: "needs_work" },
        { label: "Poor", value: "poor" },
      ],
    },
    {
      id: "7",
      name: "self_management_rating",
      label: "Are they self-managed in terms of time, file organization, and communication?",
      fieldType: "dropdown",
      options: [
        { label: "Very independent", value: "very_independent" },
        { label: "Mostly independent", value: "mostly_independent" },
        { label: "Needs follow-up", value: "needs_follow_up" },
        { label: "Constant reminders needed", value: "constant_reminders" },
      ],
    },
    {
      id: "8",
      name: "adaptability_rating",
      label: "How do they handle tight deadlines or sudden scope changes?",
      fieldType: "dropdown",
      options: [
        { label: "Calm & adaptable", value: "calm_adaptable" },
        { label: "Manageable", value: "manageable" },
        { label: "Stressed but deliver", value: "stressed_but_deliver" },
        { label: "Struggle consistently", value: "struggle_consistently" },
      ],
    },
    {
      id: "9",
      name: "growth_rating",
      label: "Have they shown progress in skill, speed, or creative maturity in recent months?",
      fieldType: "dropdown",
      options: [
        { label: "Strong growth", value: "strong_growth" },
        { label: "Some growth", value: "some_growth" },
        { label: "No change", value: "no_change" },
        { label: "Regressive", value: "regressive" },
      ],
    },
    {
      id: "10",
      name: "learning_rating",
      label: "Are they learning or experimenting with new tools, formats, or creative trends?",
      fieldType: "dropdown",
      options: [
        { label: "Yes, proactively", value: "proactively" },
        { label: "Occasionally", value: "occasionally" },
        { label: "Not really", value: "not_really" },
        { label: "No", value: "no" },
      ],
    },
    {
      id: "11a",
      name: "last_minute_reason_clarity_rating",
      label: "Do they understand whether last-minute requests are coming from the client or internal team?",
      fieldType: "dropdown",
      options: [
        { label: "Client request", value: "client" },
        { label: "Internal team", value: "internal" },
        { label: "Mix of both", value: "mix" },
        { label: "Not communicated", value: "not_communicated" },
      ],
    },

    {
      id: "12",
      name: "last_minute_handling_rating",
      label: "How well do they handle last-minute requests while maintaining work quality?",
      fieldType: "dropdown",
      options: [
        { label: "Very well", value: "very_well" },
        { label: "Manageable", value: "manageable" },
        { label: "Compromised quality", value: "compromised_quality" },
        { label: "Struggles often", value: "struggles_often" },
      ],
    },
    {
      id: "13",
      name: "deadline_communication_rating",
      label: "Are deadlines and expectations being communicated to them clearly and in advance?",
      fieldType: "dropdown",
      options: [
        { label: "Always", value: "always" },
        { label: "Usually", value: "usually" },
        { label: "Sometimes late", value: "sometimes_late" },
        { label: "Rarely clear", value: "rarely_clear" },
      ],
    },

    { id: "14", name: "creative_strength_text", label: "What creative strength do you appreciate most in this team member?", fieldType: "short" },
    {
      id: "15",
      name: "improvement_area_text",
      label: "What is one area they could improve to become more effective in their role?",
      fieldType: "short",
    },
    {
      id: "16",
      name: "process_limitation_text",
      label: "What internal process, habit, or system do you think limits their output or growth?",
      fieldType: "short",
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
    };


    try {
      const res = await apiClient.post(`/api/v1/feedback/manager-to-employee`, payload);
      router.push("/manager/thank-you");

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
            <h1 className="text-base lg:text-3xl font-semibold text-[#E31313]">Q2 Feedback Form</h1>
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
