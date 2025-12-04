"use client";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";
import { FormDataValues } from "@/types/onboarding";
import Image from "next/image";

interface QuestionProps {
  question: { name: string; title: string; placeholder: string };
  onNext: (data?: FormDataValues) => void;
  image: string;
 
  value: string;
  updateFormData: (updates: FormDataValues) => void;
  validateField: (fieldName: string, value: string) => string;
  isTouched: boolean;
  markFieldTouched: (fieldName: string) => void;
}

export function StepTextQuestion({ question, onNext, value, updateFormData, validateField, isTouched, markFieldTouched ,image}: QuestionProps) {
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
    <div className="flex flex-col px-4 md:px-0 w-full max-w-2xl  justify-center items-center mx-auto py-10 space-y-6">
      <Image src={question.image} alt="" width={400} height={400}/>
      <h2 className="text-[28px] max-w-2xl w-full  font-medium text-primary ">{question.title}</h2>
      <Textarea
        required
        placeholder={question.placeholder}
        className="max-w-2xl text-sm !border !border-[#D9D9D9] !text-secondary w-full min-h-[120px]"
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {isTouched && error && <p className="text-red-600 text-xs mt-1 self-start max-w-2xl">{error}</p>}
      <Button onClick={handleSubmit} className="!bg-[#FFFBFB] !text-red border !text-lg !border-red px-6  rounded-sm w-full max-w-2xl">
        Next 
      </Button>
    </div>
  );
}
