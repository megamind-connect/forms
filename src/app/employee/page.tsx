"use client";

import { useState } from "react";

import Image from "next/image";

import DynamicField from "@/components/shared/DynamicField";

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

 
  

const step2Fields: FormField[] = [
  { id: "1", name: "name", label: "Your Name", fieldType: "short" },
  { id: "2", name: "manager_name", label: "Manager's Name", fieldType: "short" },

  {
    id: "3",
    name: "brief_shared_before_work",
    label: "Are project briefs shared with you before the start of the work, with all key details (objectives, references, deliverables, timeline)?",
    fieldType: "dropdown",
    options: ["Always", "Often", "Sometimes", "Rarely", "Never"],
  },
  {
    id: "4",
    name: "brief_clarity",
    label: "Are the briefs usually clear and easy to understand, or do they often require clarification?",
    fieldType: "dropdown",
    options: ["Always clear", "Sometimes need clarity", "Often unclear", "Usually incomplete"],
  },
  {
    id: "5",
    name: "manager_clarifies_brief",
    label: "When a brief is unclear, does your manager take responsibility to clarify it quickly?",
    fieldType: "dropdown",
    options: ["Always", "Sometimes", "Rarely", "Not applicable"],
  },
  {
    id: "6",
    name: "comfort_speaking_up",
    label: "Do you feel comfortable raising creative suggestions or concerns directly with your manager?",
    fieldType: "dropdown",
    options: ["Always", "Usually", "Not really", "Avoid it"],
  },
  {
    id: "7",
    name: "quality_vs_speed",
    label: "Does your manager balance timelines and creative quality, or is the focus usually on fast delivery?",
    fieldType: "dropdown",
    options: ["Balanced", "Leans toward quality", "Leans toward speed", "Always rushed"],
  },
  {
    id: "8",
    name: "feedback_frequency",
    label: "How frequently do you receive feedback that helps you grow creatively?",
    fieldType: "dropdown",
    options: ["Very often", "Sometimes", "Rarely", "Never"],
  },
  {
    id: "9",
    name: "deadline_clarity",
    label: "Do you receive deadlines in a timely and clear manner?",
    fieldType: "dropdown",
    options: ["Always", "Usually", "Sometimes last-minute", "Rarely on time"],
  },
  {
    id: "10",
    name: "source_last_minute_work",
    label: "When there's last-minute work, do you know whether it's due to the client or internal planning?",
    fieldType: "dropdown",
    options: ["Mostly from client", "Mostly from internal team", "A mix of both", "Not communicated"],
  },
  {
    id: "11",
    name: "support_in_urgent",
    label: "Do you feel supported in managing urgent turnarounds (e.g., prioritization, rescheduling, backup)?",
    fieldType: "dropdown",
    options: ["Yes, fully supported", "Sometimes", "Rarely", "No support"],
  },
  {
    id: "12",
    name: "workload_balance",
    label: "Is your workload generally managed in a way that avoids burnout or constant rush?",
    fieldType: "dropdown",
    options: ["Yes", "Sometimes", "No", "Often overwhelmed"],
  },
  {
    id: "13",
    name: "idea_acknowledgement",
    label: "Are your efforts or creative ideas acknowledged in final outcomes or team meetings?",
    fieldType: "dropdown",
    options: ["Always", "Sometimes", "Rarely", "Never"],
  },
  {
    id: "14",
    name: "manager_strength",
    label: "What is one thing your manager does well that you appreciate?",
    fieldType: "short",
    placeholder: "Write your response…",
  },
  {
    id: "15",
    name: "manager_improvement",
    label: "What is one thing your manager could improve to support your creative process?",
    fieldType: "short",
    placeholder: "Write your response…",
  },
  {
    id: "16",
    name: "process_improvement",
    label: "What process or system could be improved to help you do better work? (e.g., brief quality, review flow, communication)",
    fieldType: "short",
    placeholder: "Write your response…",
  },
 {
  id: "17",
  name: "expected_support",
  label: "What support do you expect from managers?",
  fieldType: "short",
  placeholder: "Write your response…",
},
];


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
            console.log("Form submitted:", formData);
            // await apiClient.post("/employee-feedback", formData);
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
