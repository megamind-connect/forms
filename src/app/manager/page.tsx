"use client";

import { useState, useEffect } from "react";
import apiClient from "@/lib/api";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { SplashScreen } from "@/components/shared/SplashScreen";
import { StepIndicator } from "@/components/shared/StepIndicator";
import { IntroStep } from "@/components/shared/IntroStep";
import { StepTextQuestion } from "@/components/shared/StepTextQuestion";

interface FormField {
  id: string;
  name: string;
  label: string;
  fieldType: string;
  options?: string[] | null;
}

export default function Employee() {
  const [step, setStep] = useState(1);
  const [subStep, setSubStep] = useState(1);
  const [showSplash, setShowSplash] = useState(true);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 900);
    return () => clearTimeout(timer);
  }, []);

  const step2Fields: FormField[] = [
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
      label: "How consistent is their attention to detail?",
      fieldType: "dropdown",
      options: ["Very consistent", "Mostly good", "Inconsistent", "Needs improvement"],
    },
    {
      id: "6",
      name: "team_collaboration",
      label: "How well do they collaborate with other team members?",
      fieldType: "dropdown",
      options: ["Excellent", "Good", "Needs work", "Poor"],
    },
    {
      id: "7",
      name: "self_management",
      label: "Are they self-managed in time, file organization, and communication?",
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
      label: "Have they shown progress in skill, speed, or creative maturity recently?",
      fieldType: "dropdown",
      options: ["Strong growth", "Some growth", "No change", "Regressive"],
    },
    {
      id: "10",
      name: "learning_initiative",
      label: "Are they learning or experimenting with new tools or trends?",
      fieldType: "dropdown",
      options: ["Yes, proactively", "Occasionally", "Not really", "No"],
    },
    {
      id: "11",
      name: "last_minute_source_clarity",
      label: "Do they understand whether last-minute requests are from client or internal team?",
      fieldType: "dropdown",
      options: ["Always clear", "Sometimes clear", "Often unclear", "Not communicated"],
    },
    {
      id: "12",
      name: "last_minute_quality",
      label: "How well do they handle last-minute requests while maintaining quality?",
      fieldType: "dropdown",
      options: ["Very well", "Manageable", "Compromised quality", "Struggles often"],
    },
    {
      id: "13",
      name: "clarity_of_expectations",
      label: "Are deadlines and expectations communicated clearly in advance?",
      fieldType: "dropdown",
      options: ["Always", "Usually", "Sometimes late", "Rarely clear"],
    },
  ];

  const step3Questions = [
    {
      name: "appreciated_strength",
      title: "What creative strength do you appreciate most in this team member?",
      placeholder: "Write your response…",
    },
    { name: "improvement_area", title: "One area they could improve to become more effective in their role?", placeholder: "Write your response…" },
    {
      name: "process_limitation",
      title: "What internal process, habit, or system do you think limits their output or growth?",
      placeholder: "Write your response…",
    },
  ];

  const stepStructure: Record<number, number> = {
    1: 1,
    2: 1,
    3: step3Questions.length,
  };

  const totalSteps = Object.keys(stepStructure).length;

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleNext = async (newData?: Record<string, any>) => {
    if (newData) {
      setFormData((prev) => ({ ...prev, ...newData }));
    }

    if (!hasStarted) setHasStarted(true);

    const maxSub = stepStructure[step];

    if (subStep < maxSub) {
      setSubStep((prev) => prev + 1);
    } else if (step < totalSteps) {
      setStep((prev) => prev + 1);
      setSubStep(1);
    } else {
      await apiClient.post("/api/v1/hr/employee-feedback", formData);
    }
  };

  const handleStepClick = (n: number) => {
    setStep(n);
    setSubStep(1);
  };

  const getStepProgress = (n: number) => {
    if (!hasStarted) return 0;
    if (n < step) return 100;
    if (n > step) return 0;
    return subStep > 1 ? (subStep / stepStructure[n]) * 100 : 0;
  };
  console.log(formData);
  return (
    <div className="relative min-h-screen flex flex-col justify-center bg-[#FFFBFB] overflow-hidden">
      {showSplash ? (
        <SplashScreen />
      ) : (
        <>
          <StepIndicator step={step} stepStructure={stepStructure} getStepProgress={getStepProgress} handleStepClick={handleStepClick} />

          {step === 1 && (
            <IntroStep
              title="Employee Feedback"
              description="Your experiences help us improve."
              onNext={() => handleNext()}
              buttonClassName="!bg-[#E31313] !font-bold !text-lg"
            />
          )}

          {step === 2 && (
            <form
              className="flex flex-col items-center flex-1 px-6 overflow-y-auto max-h-[80vh] space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                handleNext();
              }}
            >
              <div className="space-y-6 px-4 md:px-0 w-full max-w-lg mx-auto">
                {step2Fields.map((field) => (
                  <div key={field.id} className="w-full">
                    <label className="block text-base font-medium mb-2 text-[#57534E]">{field.label}</label>

                    {field.fieldType === "text" && (
                      <Input
                        type="text"
                        name={field.name}
                        value={formData[field.name] || ""}
                        onChange={handleChange}
                        placeholder={field.label}
                        className="w-full border border-[#D9D9D9] !bg-[#FFFBFB] rounded-md p-2 text-lg"
                      />
                    )}
                    {field.fieldType === "dropdown" && field.options && (
                      <div className="space-y-1 w-full">
                        {field.options.map((option, i) => (
                          <label key={i} className="flex items-center gap-2 text-base cursor-pointer select-none">
                            <input
                              type="radio"
                              name={field.name}
                              value={option}
                              checked={formData[field.name] === option}
                              onChange={handleChange}
                              className="accent-red"
                            />
                            {option}
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                <Button type="submit" className="w-full !bg-[#E31313] text-white !text-lg rounded-md !font-bold !max-w-lg mx-auto block">
                  Next &gt;
                </Button>
              </div>
            </form>
          )}

          {step === 3 && (
            <StepTextQuestion
              question={step3Questions[subStep - 1]}
              onNext={handleNext}
              isLast={subStep === stepStructure[3]}
              value={formData[step3Questions[subStep - 1].name] || ""}
            />
          )}
        </>
      )}
    </div>
  );
}
