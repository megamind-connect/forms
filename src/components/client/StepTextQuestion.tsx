"use client";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";
import { FormDataValues } from "@/types/onboarding";

interface QuestionProps {
  question: { name: string; title: string; placeholder: string };
  onNext: (data?: FormDataValues) => void;
  isLast: boolean;
  value: string;
  updateFormData: (updates: FormDataValues) => void;
  validateField: (fieldName: string, value: string) => string;
  isTouched: boolean;
  markFieldTouched: (fieldName: string) => void;
}

export function StepTextQuestion({ question, onNext, value, updateFormData, validateField, isTouched, markFieldTouched }: QuestionProps) {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newVal = e.target.value;
    updateFormData({ [question.name]: newVal });
  };

  const handleBlur = () => {
    markFieldTouched(question.name);
  };

  const handleSubmit = () => {
    if (!question?.name) return;
    const error = validateField(question.name, value);
    markFieldTouched(question.name);
    if (error) return;
    onNext({ [question.name]: value });
  };

  const error = isTouched ? validateField(question.name, value) : "";

  return (
    <div className="flex flex-col px-4 md:px-0 w-full max-w-lg justify-center items-center mx-auto py-10 space-y-6">
      <h2 className="text-[28px] max-w-lg font-medium text-primary ">{question.title}</h2>
      <Textarea
        required
        placeholder={question.placeholder}
        className="max-w-lg text-sm !border !border-[#D9D9D9] !text-secondary w-full min-h-[120px]"
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {isTouched && error && <p className="text-red-600 text-xs mt-1 self-start max-w-lg">{error}</p>}
      <Button onClick={handleSubmit} className="!bg-[#FFFBFB] !text-red border !text-lg !border-red px-6  rounded-sm w-full max-w-lg">
        Next 
      </Button>
    </div>
  );
}
