interface StepIndicatorProps {
  step: number;
  stepStructure: Record<number, number>;
  getStepProgress: (n: number) => number;
  handleStepClick: (n: number) => void;
}

export function StepIndicator({ step, stepStructure, getStepProgress, handleStepClick }: StepIndicatorProps) {
  return (
    <div className="flex justify-between items-center px-4 md:px-0 w-full max-w-lg mx-auto gap-3  py-4 relative z-10">
      <img src="/svgs/MM-logo-black-small.svg" className="w-10 h-10 sm:w-12 sm:h-12" />
      <div className="flex items-center gap-2">
        {Object.keys(stepStructure).map((key) => {
          const n = Number(key);
          const fillPercent = getStepProgress(n);
          return (
            <button
              key={n}
              onClick={() => handleStepClick(n)}
              className={`relative rounded-full transition-all duration-300 overflow-hidden ${
                n === step ? "w-8 sm:w-14 h-2 rounded-full bg-[#FFCED4]" : "w-2 h-2 rounded-full"
              } ${n < step ? "bg-[#931C2A]" : "bg-[#FFCED4]"}`}
            >
              {n === step && (
                <div className="absolute top-0 left-0 h-full bg-[#931C2A] transition-all duration-500" style={{ width: `${fillPercent}%` }}></div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
