"use client";

import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";
import { useEffect, useState } from "react";

interface QuestionProps {
  question: { name: string; title: string; placeholder: string };
  onNext: (data?: Record<string, any>) => void;
  isLast: boolean;
  value: string;
}

export function StepTextQuestion({ question, onNext, isLast, value: savedValue }: QuestionProps) {
  const [value, setValue] = useState(savedValue || "");

  useEffect(() => {
    setValue(savedValue || "");
  }, [question?.name, savedValue]);

  const handleSubmit = () => {
    if (!question?.name) return;
    onNext({ [question.name]: value });
  };

  return (
    <div className="flex flex-col px-4 md:px-0 w-full max-w-lg justify-center items-center mx-auto py-10 space-y-6">
      <h2 className="text-[28px] max-w-lg font-medium text-primary ">{question.title}</h2>
      <Textarea
        placeholder={question.placeholder}
        className="max-w-lg text-sm !border !border-[#D9D9D9] !text-secondary w-full min-h-[120px]"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Button onClick={handleSubmit} className="!bg-[#FFFBFB] !text-red border !text-lg !border-red px-6 py-2 rounded-sm w-full max-w-lg">
        {isLast ? "Submit" : "Next >"}
      </Button>
    </div>
  );
}
