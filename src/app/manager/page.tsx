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
  { id: "11", name: "name", label: "Your Name", fieldType: "short" },
  { id: "21", name: "employee_name", label: "Employee's Name", fieldType: "short" },

  {
    id: "1",
    name: "brief_understanding",
    label: "Does the team member understand the brief clearly without needing frequent re-explanation?",
    fieldType: "dropdown",
    options: ["Always", "Often", "Sometimes", "Rarely"],
  },
  {
    id: "2",
    name: "timely_delivery_quality",
    label: "Do they deliver tasks on time without compromising on creative quality?",
    fieldType: "dropdown",
    options: ["Always", "Mostly", "Sometimes", "Often miss both"],
  },
  {
    id: "3",
    name: "feedback_implementation",
    label: "How well do they implement feedback in revisions?",
    fieldType: "dropdown",
    options: ["Very well", "Mostly well", "Needs effort", "Resistant"],
  },
  {
    id: "4",
    name: "creative_contribution",
    label: "Do they actively contribute creative ideas or suggest value additions beyond the brief?",
    fieldType: "dropdown",
    options: ["Frequently", "Occasionally", "Rarely", "Never"],
  },
  {
    id: "5",
    name: "attention_to_detail",
    label: "How consistent is their attention to detail (e.g., layout, brand alignment, transitions)?",
    fieldType: "dropdown",
    options: ["Very consistent", "Mostly good", "Inconsistent", "Needs improvement"],
  },
  {
    id: "6",
    name: "collaboration",
    label: "How well do they collaborate with other team members (writers, editors, designers, client-facing roles)?",
    fieldType: "dropdown",
    options: ["Excellent", "Good", "Needs work", "Poor"],
  },
  {
    id: "7",
    name: "self_management",
    label: "Are they self-managed in terms of time, file organization, and communication?",
    fieldType: "dropdown",
    options: ["Very independent", "Mostly independent", "Needs follow-up", "Constant reminders needed"],
  },
  {
    id: "8",
    name: "deadline_handling",
    label: "How do they handle tight deadlines or sudden scope changes?",
    fieldType: "dropdown",
    options: ["Calm & adaptable", "Manageable", "Stressed but deliver", "Struggle consistently"],
  },
  {
    id: "9",
    name: "growth_progress",
    label: "Have they shown progress in skill, speed, or creative maturity in recent months?",
    fieldType: "dropdown",
    options: ["Strong growth", "Some growth", "No change", "Regressive"],
  },
  {
    id: "10",
    name: "learning_initiative",
    label: "Are they learning or experimenting with new tools, formats, or creative trends?",
    fieldType: "dropdown",
    options: ["Yes, proactively", "Occasionally", "Not really", "No"],
  },
  {
    id: "11a",
    name: "understand_last_minute_source",
    label: "Do they understand whether last-minute requests are coming from the client or internal team?",
    fieldType: "dropdown",
    options: ["Yes, always clear", "Sometimes clear", "Often unclear", "Not communicated"],
  },
  {
    id: "12",
    name: "last_minute_quality",
    label: "How well do they handle last-minute requests while maintaining work quality?",
    fieldType: "dropdown",
    options: ["Very well", "Manageable", "Compromised quality", "Struggles often"],
  },
  {
    id: "13",
    name: "deadline_clarity",
    label: "Are deadlines and expectations being communicated to them clearly and in advance?",
    fieldType: "dropdown",
    options: ["Always", "Usually", "Sometimes late", "Rarely clear"],
  },
  {
    id: "14",
    name: "appreciated_strength",
    label: "What creative strength do you appreciate most in this team member?",
    fieldType: "short",
    placeholder: "Write here",
  },
  {
    id: "15",
    name: "improvement_area",
    label: "What is one area they could improve to become more effective in their role?",
    fieldType: "short",
    placeholder: "Write here",
  },
  {
    id: "16",
    name: "process_limitation",
    label: "What internal process, habit, or system do you think limits their output or growth?",
    fieldType: "short",
    placeholder: "Write here",
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
