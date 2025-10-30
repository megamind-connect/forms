// components/onboarding/IntroStep.tsx

import { Button } from "@/components/ui/Button";

interface IntroStepProps {
  title: string;
  description: string;
  buttonLabel?: string;
  onNext: () => void;
  buttonClassName?: string;
}

export function IntroStep({ title, description, buttonLabel = "Next >", onNext, buttonClassName }: IntroStepProps) {
  return (
    <div className="flex flex-col px-4 md:px-0 w-full max-w-lg mx-auto justify-center  items-center text-center  py-10 space-y-4">
      <h2 className="text-[44px] text-center font-medium  text-primary">{title}</h2>
      <p className="text-base text-start font-normal text-secondary max-w-lg mb-8">{description}</p>
      <Button onClick={onNext} className={`w-full max-w-lg ${buttonClassName || "!bg-[#E31313]"}`}>
        {buttonLabel}
      </Button>
    </div>
  );
}
