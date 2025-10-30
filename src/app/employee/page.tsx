"use client";

import { useState, useEffect } from "react";
import apiClient from "@/lib/api";
import { SplashScreen } from "@/components/shared/SplashScreen";
import { StepIndicator } from "@/components/shared/StepIndicator";
import { StepTextQuestion } from "@/components/shared/StepTextQuestion";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { IntroStep } from "@/components/shared/IntroStep";



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

  // Splash delay
  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 900);
    return () => clearTimeout(timer);
  }, []);

  // Step 2 fields (Static)
  const step2Fields: FormField[] = [
    { id: "1", name: "name", label: "Name", fieldType: "text" },
    { id: "2", name: "manager_name", label: "Manager's Name", fieldType: "text" },
    {
      id: "3",
      name: "project_brief_shared",
      label: "Are project briefs shared before work?",
      fieldType: "dropdown",
      options: ["Always", "Often", "Sometimes", "Rarely", "Never"],
    },
    {
      id: "4",
      name: "brief_clarity",
      label: "Are briefs usually clear?",
      fieldType: "dropdown",
      options: ["Always clear", "Sometimes clear", "Often unclear"],
    },
    {
      id: "5",
      name: "manager_clarifies",
      label: "Does your manager clarify unclear briefs quickly?",
      fieldType: "dropdown",
      options: ["Always", "Sometimes", "Rarely", "Not applicable"],
    },
    {
      id: "6",
      name: "comfortable_feedback",
      label: "Do you feel comfortable suggesting creative inputs?",
      fieldType: "dropdown",
      options: ["Always", "Usually", "Not really", "Avoid it"],
    },
    {
      id: "7",
      name: "timeline_quality_balance",
      label: "Does your manager balance timelines and quality?",
      fieldType: "dropdown",
      options: ["Balanced", "Quality focused", "Speed focused", "Rushed"],
    },
    {
      id: "8",
      name: "feedback_frequency",
      label: "How often do you receive helpful feedback?",
      fieldType: "dropdown",
      options: ["Very often", "Sometimes", "Rarely", "Never"],
    },
  ];

  // Step 3 Text Questions
  const step3Questions = [
    {
      name: "manager_strength",
      title: "What is one thing your manager does well?",
      placeholder: "Write your response…",
    },
    {
      name: "manager_improvement",
      title: "One thing your manager could improve?",
      placeholder: "Write your response…",
    },
    {
      name: "process_improvement",
      title: "What process could improve your workflow?",
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
                        className="w-full border border-[#D9D9D9] !bg-[#FFFBFB] rounded-md p-2 !text-sm"
                      />
                    )}
                    {field.fieldType === "dropdown" && field.options && (
                      <div className="space-y-1 w-full">
                        {field.options.map((option, i) => (
                          <label key={i} className="flex items-center gap-2 !text-sm cursor-pointer select-none">
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
