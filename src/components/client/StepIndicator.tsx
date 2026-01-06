interface StepIndicatorProps {
  step: number;
  stepStructure: Record<number, number>;
  getStepProgress: (n: number) => number;
  handleStepClick: (n: number) => void;
}

export function StepIndicator({ step, stepStructure, getStepProgress, handleStepClick }: StepIndicatorProps) {
  return (
    <div className="flex justify-between items-center px-4 md:px-0 w-full max-w-2xl mx-auto gap-3  py-4 relative z-10">
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
                n === step ? "w-12 sm:w-20 h-2 bg-[#FFCED4]" : "w-2 h-2"
              } ${n < step ? "bg-[#931C2A]" : "bg-[#FFCED4]"}`}
            >
              {n === step && (
                <div 
                  style={{ 
                    backgroundImage: "linear-gradient(to right, #931C2A, #E31313, #FFCED4)", 
                    width: `${fillPercent}%` 
                  }} 
                  className="absolute top-0 left-0 h-full transition-all duration-500"
                ></div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
