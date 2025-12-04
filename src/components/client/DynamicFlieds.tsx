"use client";

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
  if (fieldType === "dropdown" && options) {
    const handleSelect = (val: string) => onChange(val);

    return (
      <div className="w-full space-y-3 bg-white rounded-md p-5 md:p-10">
        <label className="text-base md:text-[24px] font-medium text-[#202020]">
          {label} <span className="text-red-500">*</span>
        </label>

        <div className="flex flex-wrap md:flex-nowrap md:items-center justify-center gap-6 md:gap-20 mt-5 md:mt-12">
          {options.map((opt) => (
            <label
              key={opt.value}
              className="flex flex-row md:flex-col gap-4 md:gap-0 items-center cursor-pointer text-center"
            >
              <input
                type="radio"
                name={name}
                checked={value === opt.value}
                onClick={() => handleSelect(opt.value)}
                className="appearance-none w-4 h-4 md:w-6 md:h-6 border-2 border-red rounded-full cursor-pointer relative
                after:content-[''] after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2
                after:w-2 after:h-2 md:after:w-4 md:after:h-4 after:rounded-full after:bg-transparent
                checked:after:bg-[#F43F46] checked:border-[#F43F46] transition-all"
              />

              <span className="text-sm md:text-lg font-medium text-[#8F8881]">{opt.label}</span>
            </label>
          ))}
        </div>
      </div>
    );
  }

  /* ---------------------------- NORMAL SELECT ---------------------------- */
  if (fieldType === "dropdownselect" && options) {
    return (
      <div className="w-full flex flex-col rounded-md gap-2 bg-white p-5 md:p-10">
        <label className="text-base md:text-[24px] font-medium text-[#202020]">
          {label} <span className="text-red-500">*</span>
        </label>

        <div className="relative w-full">
          <select
            name={name}
            value={value || ""}
            required
            onChange={(e) => onChange(e.target.value)}
            className="w-full border border-[#D9D9D9] rounded-md p-3 text-sm focus:outline-none appearance-none bg-white pr-10"
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
            ▼
          </span>
        </div>
      </div>
    );
  }

  /* ---------------------------- CHECKBOX GROUP ---------------------------- */
  if (fieldType === "checkbox_group" && options) {
    const selected = value?.list || [];

    const toggleItem = (val: string) => {
      let updated = [...selected];
      if (updated.includes(val)) {
        updated = updated.filter((v) => v !== val);
      } else {
        updated.push(val);
      }
      onChange({ list: updated, other: value?.other || "" });
    };

    const hasOthers = selected.includes("others");

    return (
      <div className="w-full flex flex-col rounded-md gap-4 bg-white p-5 md:p-10">
        <label className="text-base md:text-[24px] font-medium text-[#202020]">
          {label} <span className="text-red-500">*</span>
        </label>

        <div className="flex flex-col gap-4 mt-4">
          {options.map((opt) => (
            <div key={opt.value} className="flex flex-col">
              <label className="flex items-center gap-3 cursor-pointer text-[#202020]">
                <div
                  onClick={() => toggleItem(opt.value)}
                  className={`w-5 h-5 border-2 rounded-md ${
                    selected.includes(opt.value)
                      ? "border-[#E31212] bg-[#E31212]"
                      : "border-[#E31212] bg-white"
                  } flex items-center justify-center transition-all`}
                >
                  {selected.includes(opt.value) && (
                    <span className="text-white text-sm font-bold">✓</span>
                  )}
                </div>

                <span className="text-sm md:text-lg">{opt.label}</span>
              </label>

              {opt.value === "others" && hasOthers && (
                <input
                  type="text"
                  placeholder="Please specify..."
                  className="ml-8 mt-2 border-b border-gray-400 outline-none text-sm md:text-lg py-1 placeholder:text-gray-400"
                  value={value?.other || ""}
                  onChange={(e) =>
                    onChange({
                      list: selected,
                      other: e.target.value,
                    })
                  }
                />
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  /* ---------------------------- SHORT INPUT ---------------------------- */
  if (fieldType === "short") {
    return (
      <div className="w-full flex flex-col rounded-sm gap-2 bg-white p-5 md:p-10">
        <label className="text-base md:text-[24px] font-medium text-[#202020]">
          {label} <span className="text-red-500">*</span>
        </label>

        <input
          type="text"
          className="border-b border-gray-300 text-[#202020] placeholder:text-[#202020] 
                     placeholder:text-sm md:placeholder:text-base focus:border-gray-800 outline-none 
                     py-1 text-lg font-medium"
          placeholder={placeholder || "Write your answer..."}
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    );
  }

  return null;
}
