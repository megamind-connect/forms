import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface Option {
  label: string;
  value: string | number;
}

interface CustomSelectProps {
  name: string;
  value: string | number;
  options: Option[];
  placeholder: string;
  onChange: (e: { target: { name: string; value: string | number } }) => void;
  onBlur?: () => void;
  className?: string;
}

export function CustomSelect({
  name,
  value,
  options,
  placeholder,
  onChange,
  onBlur,
  className = "",
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => String(opt.value) === String(value));

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (optionValue: string | number) => {
    onChange({ target: { name, value: optionValue } });
    setIsOpen(false);
  };

  return (
    <div className={`relative w-full ${className}`} ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        onBlur={onBlur}
        className={`
          flex items-center justify-between
          w-full border border-[#D9D9D9] rounded-md p-2 px-3 text-sm
          focus:outline-none focus:border-red-500
          bg-transparent h-12 transition-all duration-300 ease-in-out
          ${!value ? "text-[#8F8881]" : "text-black"}
        `}
      >
        <span className="truncate">{selectedOption ? selectedOption.label : placeholder}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <ChevronDown className="w-4 h-4 text-[#8F8881]" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="absolute z-[100] w-full mt-1 bg-white border border-[#D9D9D9] rounded-md shadow-lg max-h-60 overflow-auto"
          >
            <li
              onClick={() => handleSelect("")}
              className="px-3 py-2 text-sm text-[#8F8881] cursor-pointer hover:bg-gray-50 transition-colors"
            >
              {placeholder}
            </li>
            {options.map((option, idx) => (
              <li
                key={idx}
                onClick={() => handleSelect(option.value)}
                className={`
                  px-3 py-2 text-sm cursor-pointer transition-colors
                  ${String(option.value) === String(value) ? "bg-red-50 text-[#F43F46]" : "text-black hover:bg-gray-100"}
                `}
              >
                {option.label}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
