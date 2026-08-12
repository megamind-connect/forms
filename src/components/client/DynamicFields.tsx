"use client";

import { Textarea } from "../ui/Textarea";
import { FileUpload } from "../ui/FileUpload";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

interface DynamicFieldProps {
  field: {
    id: string;
    name: string;
    label: string;
    fieldType: string;
    options?: { label: string; value: string }[];
    placeholder?: string;
  };
  value: any;
  onChange: (val: any) => void;
}

export default function DynamicField({ field, value, onChange }: DynamicFieldProps) {
  const { label, name, fieldType, options, placeholder } = field;

  /* ---------------------------- RADIO DROPDOWN ---------------------------- */
  if ((fieldType === "dropdown" || fieldType === "radio") && options) {
    const handleSelect = (val: string) => onChange(val);

    return (
      <div className="w-full space-y-3   rounded-md pb-5 md:pb-10">
        <label className="text-base md:text-[24px] font-medium text-[#202020]">
          {label}
        </label>

        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-20 mt-5 md:mt-12 max-w-full">

          {options.map((opt) => {
            const isOther = opt.value.toLowerCase() === "other";
            const currentSelected = typeof value === "object" ? value.selected : value;
            const isSelected = currentSelected === opt.value;

            return (
              <label
                key={opt.value}
                className="flex flex-row md:flex-col gap-4 md:gap-0 items-center cursor-pointer text-center  transition-all duration-300 ease-in-out"
              >
                <input
                  type="radio"
                  name={name}
                  checked={isSelected}
                  onChange={() => onChange(isOther ? { selected: opt.value, otherText: typeof value === 'object' ? value.otherText : "" } : opt.value)}
                  className="appearance-none w-4 h-4 md:w-6 md:h-6 border-2 border-red rounded-full cursor-pointer relative
                  after:content-[''] after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2
                  after:w-2 after:h-2 md:after:w-4 md:after:h-4 after:rounded-full after:bg-transparent
                  checked:after:bg-[#E31212] checked:border-[#E31212] transition-all duration-300 ease-in-out"
                />

                {isOther ? (
                  <input
                    type="text"
                    placeholder="Other..."
                    value={typeof value === "object" && isSelected ? value.otherText : ""}
                    onChange={(e) => onChange({ selected: opt.value, otherText: e.target.value })}
                    className="border-b border-gray-300 text-[#8F8881] placeholder:text-[#8F8881] outline-none text-sm md:text-lg bg-transparent w-24 md:w-32 text-center"
                  />
                ) : (
                  <span className="text-sm md:text-lg font-medium text-[#8F8881]">{opt.label}</span>
                )}
              </label>
            );
          })}
        </div>
      </div>
    );
  }

  /* ---------------------------- RADIO ROW (Horizontal) ---------------------------- */
  if (fieldType === "radio_row" && options) {
    return (
      <div className="w-full space-y-3 rounded-md pb-5 md:pb-10">
        <label className="text-base md:text-[24px] font-medium text-[#202020]">
          {label}
        </label>

        <div className="flex flex-row items-start justify-between gap-2 mt-5 md:mt-12 overflow-x-auto pb-4 scrollbar-hide">
          {options.map((opt) => {
            const isOther = opt.value.toLowerCase() === "other";
            const currentSelected = typeof value === "object" ? value.selected : value;
            const isSelected = currentSelected === opt.value;

            return (
              <label
                key={opt.value}
                className="flex flex-col items-center gap-2 cursor-pointer text-center min-w-[80px] md:min-w-[100px] transition-all duration-300 ease-in-out"
              >
                <input
                  type="radio"
                  name={name}
                  checked={isSelected}
                  onChange={() => onChange(isOther ? { selected: opt.value, otherText: typeof value === 'object' ? value.otherText : "" } : opt.value)}
                  className="appearance-none w-4 h-4 md:w-6 md:h-6 border-2 border-red rounded-full cursor-pointer relative
                  after:content-[''] after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2
                  after:w-2 after:h-2 md:after:w-4 md:after:h-4 after:rounded-full after:bg-transparent
                  checked:after:bg-[#F43F46] checked:border-[#F43F46] transition-all duration-300 ease-in-out"
                />

                {isOther ? (
                  <input
                    type="text"
                    placeholder="Other..."
                    value={typeof value === "object" && isSelected ? value.otherText : ""}
                    onChange={(e) => onChange({ selected: opt.value, otherText: e.target.value })}
                    className="border-b border-gray-300 text-[#8F8881] placeholder:text-[#8F8881] outline-none text-[10px] md:text-sm bg-transparent w-full text-center"
                  />
                ) : (
                  <span className="text-[10px] md:text-sm font-medium text-[#8F8881] leading-tight max-w-[120px]">
                    {opt.label}
                  </span>
                )}
              </label>
            );
          })}
        </div>
      </div>
    );
  }
  /* ---------------------------- RADIO STACKED (Vertical) ---------------------------- */
  if (fieldType === "radio_stacked" && options) {
    const handleSelect = (val: string) => onChange(val);

    return (
      <div className="w-full space-y-3 rounded-md pb-5 md:pb-10 ">
        <label className="text-base md:text-[24px] font-medium text-[#202020]">
          {label}
        </label>

        <div className="flex flex-col gap-4 mt-5 md:mt- max-w-full">
          {options.map((opt) => {
            // 1. Determine if this specific option is selected
            const isOther = opt.value.toLowerCase() === "other";
            const currentSelected = typeof value === "object" ? value.selected : value;
            const isSelected = currentSelected === opt.value;

            return (
              <label
                key={opt.value}
                // 2. Conditionally apply classes based on 'isSelected'
                className={`flex items-center gap-4 cursor-pointer p-4 rounded-lg border-2 transition-all duration-300 ease-in-out
          ${isSelected
                    ? "bg-red-50 border-[#E31212]"   // Style when selected (Red BG & Border)
                    : "border-transparent hover:bg-gray-50" // Style when NOT selected
                  }`}
              >
                <input
                  type="radio"
                  name={name}
                  checked={isSelected}
                  // Changed onClick to onChange for better React standard practice
                  onChange={() => onChange(isOther ? { selected: opt.value, otherText: typeof value === 'object' ? value.otherText : "" } : opt.value)}
                  className="appearance-none w-4 h-4 md:w-6 md:h-6 border-2 border-red-500 rounded-full cursor-pointer relative
          after:content-[''] after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2
          after:w-2 after:h-2 md:after:w-4 md:after:h-4 after:rounded-full after:bg-transparent
          checked:after:bg-[#E31212] checked:border-[#E31212] transition-all duration-300 ease-in-out accent-[#E31212]"
                />

                {isOther ? (
                  <input
                    type="text"
                    placeholder="Other..."
                    value={typeof value === "object" && isSelected ? value.otherText : ""}
                    onChange={(e) => onChange({ selected: opt.value, otherText: e.target.value })}
                    className={`flex-1 border-b outline-none text-sm md:text-lg font-medium bg-transparent ${isSelected ? "text-[#E31212] border-[#E31212]" : "text-[#8F8881] border-gray-400"}`}
                  />
                ) : (
                  <span className={`text-sm md:text-lg font-medium ${isSelected ? "text-[#E31212]" : "text-[#8F8881]"}`}>
                    {opt.label}
                  </span>
                )}
              </label>
            );
          })}
        </div>
      </div>
    );
  }

  /* ---------------------------- 5-POINT RATING (aligned) ---------------------------- */
  /* ---------------------------- 5-POINT OR CUSTOM RATING (dynamic) ---------------------------- */
  if (fieldType === "rating5") {
    // Use dynamic options, fallback to default if not provided
    const ratingOptionsradio_stacked = field.options || [
      { value: 1, label: "Very Poor" },
      { value: 2, label: "" },
      { value: 3, label: "Average" },
      { value: 4, label: "" },
      { value: 5, label: "Exceptional" },
    ];

    return (
      <div className="w-full max-w-2xl mx-auto pb-5 md:pb-10">
        <label className="text-base md:text-[24px] font-medium text-[#202020]">
          {label}
        </label>

        <div className="flex items-start justify-center gap-6 mt-6">
          {ratingOptionsradio_stacked.map((opt) => (
            <div key={opt.value} className="w-14 md:w-16 flex flex-col items-center">
              <input
                type="radio"
                name={name}
                value={opt.value}
                checked={value === opt.value}
                onChange={() => onChange(opt.value)}
                className="appearance-none w-4 h-4 md:w-6 md:h-6 border-2 border-red rounded-full cursor-pointer relative
                after:content-[''] after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2
                after:w-2 after:h-2 md:after:w-4 md:after:h-4 after:rounded-full after:bg-transparent
                checked:after:bg-[#E31212] checked:border-[#E31212] transition-all"
              />

              <span className="text-xs md:text-sm font-medium text-[#8F8881] text-center w-full mt-2 leading-tight">
                {opt.label || "\u00A0"}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }


  /* ---------------------------- NORMAL SELECT ---------------------------- */
  if (fieldType === "dropdownselect" && options) {
    return (
      <div className="w-full flex flex-col  rounded-md gap-2 pb-5 md:pb-10">
        <label className="text-base md:text-[24px] font-medium text-[#202020]">
          {label}
        </label>

        <div className="relative w-full">
          <select
            name={name}
            value={value || ""}
            required
            onChange={(e) => onChange(e.target.value)}
            className="w-full border border-[#D9D9D9] text-[#202020] rounded-md p-3 text-sm focus:outline-none appearance-none pr-10"
            style={{
              WebkitAppearance: "none",
              MozAppearance: "none",
              backgroundImage: "none",
            }}
          >
            <option value="">Select {label}</option>
            {options.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>

          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.70911 0.139181C10.0267 0.373108 10.0945 0.820234 9.8606 1.13786C9.67889 1.38457 9.49719 1.61908 9.33776 1.82336C9.01956 2.23106 8.58151 2.77718 8.10552 3.32531C7.63268 3.86993 7.10835 4.43298 6.61893 4.86547C6.37501 5.08096 6.12288 5.27917 5.87703 5.42738C5.65083 5.56373 5.33998 5.71408 4.99992 5.71408C4.65986 5.71408 4.34894 5.56373 4.12274 5.42738C3.87689 5.27917 3.62483 5.08096 3.38091 4.86547C2.89143 4.43298 2.36714 3.86993 1.89427 3.32531C1.41832 2.77718 0.980253 2.23106 0.662036 1.82336C0.502634 1.61908 0.320891 1.38457 0.139191 1.13787C-0.0947366 0.820235 -0.0268894 0.373108 0.290735 0.139181C0.418416 0.0451418 0.567025 -0.000121181 0.714306 2.43641e-07H4.99992H9.28548C9.43276 -0.000121181 9.5814 0.0451418 9.70911 0.139181Z" fill="#8F8881" />
            </svg>

          </span>
        </div>
      </div>
    );
  }

  /* ---------------------------- CHECKBOX GROUP ---------------------------- */
  /* ---------------------------- CHECKBOX GROUP (OTHER input always visible) ---------------------------- */
  /* ---------------------------- CHECKBOX GROUP ---------------------------- */
  if (fieldType === "checkbox_group" && options) {
    const selected = value?.list || [];

    // FIXED LOGIC → preserves other_service_description
    const toggleItem = (val: string) => {
      let updated = [...selected];

      if (updated.includes(val)) {
        updated = updated.filter((v) => v !== val);
      } else {
        updated.push(val);
      }

      onChange({
        list: updated,
        other_service_description: value?.other_service_description || "",
      });
    };

    return (
      <div className="w-full flex flex-col rounded-md gap-4 pb-5 md:pb-10">
        <label className="text-base md:text-[24px] font-medium text-[#202020]">
          {label}
        </label>

        <div className="flex flex-col gap-4 mt-4">

          {options.map((opt) => {

            /* ---------------------------- OTHER OPTION (INLINE INPUT) ---------------------------- */
            if (opt.value === "other") {
              const isSelected = selected.includes("other");
              return (
                <div key="other-input" className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    {/* Checkbox */}
                    <div
                      onClick={() => toggleItem("other")}
                      className={`w-5 h-5 border-2 rounded-md ${isSelected
                        ? "border-[#E31212] bg-[#E31212]"
                        : "border-[#E31212] bg-white"
                        } flex items-center justify-center cursor-pointer transition-all`}
                    >
                      {isSelected && (
                        <span className="text-white text-sm font-bold">✓</span>
                      )}
                    </div>
                    <span className="text-sm text-[#8F8881] md:text-lg">Others…</span>
                  </div>

                  {/* Conditional input */}
                  {isSelected && (
                    <input
                      type="text"
                      placeholder="Please specify other services..."
                      className="flex-1 border-b border-gray-400 outline-none text-sm md:text-lg py-1 text-[#8F8881] placeholder:text-gray-400 ml-8"
                      value={value?.other_service_description || ""}
                      onChange={(e) =>
                        onChange({
                          list: selected,
                          other_service_description: e.target.value,
                        })
                      }
                    />
                  )}
                </div>
              );
            }

            /* ---------------------------- NORMAL CHECKBOX OPTIONS ---------------------------- */
            return (
              <div key={opt.value} className="flex flex-col">
                <label className="flex items-center gap-3 cursor-pointer text-[#202020]">
                  <div
                    onClick={() => toggleItem(opt.value)}
                    className={`w-5 h-5 border-2 rounded-md ${selected.includes(opt.value)
                      ? "border-[#E31212] bg-[#E31212]"
                      : "border-[#E31212] bg-white"
                      } flex items-center justify-center transition-all`}
                  >
                    {selected.includes(opt.value) && (
                      <span className="text-white text-sm font-bold">✓</span>
                    )}
                  </div>

                  <span className="text-sm text-[#8F8881] md:text-lg">
                    {opt.label}
                  </span>
                </label>
              </div>
            );
          })}
        </div>
      </div>
    );
  }


  /* ---------------------------- SHORT INPUT ---------------------------- */
  if (fieldType === "short" || fieldType === "text" || fieldType === "short_text" || fieldType === "email") {
    return (
      <div className="w-full flex flex-col  rounded-sm gap-2 pb-5 md:pb-10">
        <label className="text-base md:text-[24px] font-medium text-[#202020]">
          {label}
        </label>

        <input
          type={fieldType === "email" ? "email" : "text"}
          className="border-b border-gray-300 text-[#8F8881] placeholder:text-[#8F8881] 
                     placeholder:text-sm md:placeholder:text-base focus:border-gray-800 outline-none 
                     py-1 text-lg font-medium mt-6"
          placeholder={placeholder || "Write your answer..."}
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    );
  }

  if (fieldType === "textarea") {
    return (
      <div className="flex flex-col px-4 md:px-0 w-full     space-y-6">
        <h2 className="text-[28px] text-start font-medium text-primary">{label}</h2>

        <Textarea
          required
          placeholder={placeholder || "Write your answer..."}
          className="max-w-2xl text-sm !border !border-[#D9D9D9] !text-secondary w-full min-h-[120px]"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    );
  }


  /* ---------------------------- HEADER ---------------------------- */
  if (fieldType === "header" || fieldType === "description_only") {
    return (
      <div className="w-full pt-4 md:pt-6 pb-2">
        <h3 className="text-xl md:text-2xl font-medium text-[#57534E]">{label}</h3>
      </div>
    );
  }

    // ✅ Select Field (True Dropdown)
  if (fieldType === "select" && options) {
    return (
      <div className="w-full flex flex-col rounded-sm gap-4 bg-white p-5 md:p-10">
        <label className="text-base md:text-[24px] font-medium text-[#202020] mb-1">
          {label} <span className="text-red-500">*</span>
        </label>
        
        <select
          className="border-b border-gray-300 text-[#202020] focus:border-gray-800 outline-none py-1 text-lg font-medium bg-transparent cursor-pointer"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="" disabled hidden>{placeholder || "Select an option"}</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="text-base">
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    );
  }

  /* ---------------------------- PHONE INPUT ---------------------------- */
  if (fieldType === "phone") {
    return (
      <div className="w-full flex flex-col rounded-sm gap-2 pb-5 md:pb-10">
        <label className="text-base md:text-[24px] font-medium text-[#202020]">
          {label}
        </label>

        <div className="w-full">
          <PhoneInput
            country={'in'}
            value={value || ""}
            onChange={(phone) => onChange(phone)}
            inputStyle={{
              width: '100%',
              height: '45px',
              fontSize: '16px',
              paddingLeft: '48px',
              border: '1px solid #D9D9D9',
              borderRadius: '6px',
              backgroundColor: 'white',
              color: 'black'
            }}
            buttonStyle={{
              border: '1px solid #D9D9D9',
              borderRight: 'none',
              borderRadius: '6px 0 0 6px',
              backgroundColor: '#FAFAFA'
            }}
            dropdownStyle={{
              width: '300px',
              color: 'black'
            }}
            placeholder={placeholder || "Phone"}
          />
        </div>
      </div>
    );
  }

  /* ---------------------------- FILE UPLOAD ---------------------------- */
  if (fieldType === "file") {
    return (
      <FileUpload
        label={label}
        value={value}
        onChange={(file) => onChange(file)}
        placeholder={placeholder}
        className=""
      />
    );
  }

  return null;
}
