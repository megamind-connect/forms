"use client";

import apiClient from "@/lib/api";
import { useEffect, useState } from "react";

interface DynamicFieldProps {
  field: {
    id: string;
    name: string;
    label: string;
    fieldType: string;
    options?: { label: string; value: string }[]; // ← FIXED
    placeholder?: string;
  };
  value: any;
  onChange: (val: any) => void;
}

export default function DynamicField({ field, value, onChange }: DynamicFieldProps) {
  const { label, name, fieldType, options, placeholder } = field;

  const [search, setSearch] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  // Keep input text synced with stored value
  useEffect(() => {
    if (fieldType === "searchable" && value?.fullName) {
      setSearch(value.fullName);
    }
  }, [value, fieldType]);

  useEffect(() => {
    if (fieldType !== "searchable") return;

    const fetchUsers = async () => {
      if (!search || search.length < 1) {
        setResults([]);
        return;
      }

      try {
        const res = await apiClient.get(`/api/v1/users/search?name=${search}`);
        const data = res.data?.users || res.data?.data || res.data || [];
        setResults(Array.isArray(data) ? data : []);
      } catch (err) {
        console.log("Search Error:", err);
      }
    };

    const delay = setTimeout(fetchUsers, 250);
    return () => clearTimeout(delay);
  }, [search, fieldType]);

  // ✅ Searchable Field
  if (fieldType === "searchable") {
    return (
      <div className="w-full flex flex-col rounded-md gap-2 bg-white p-5 md:p-10 relative">
        <label className="text-base md:text-[24px] font-medium text-[#202020]">
          {label} <span className="text-red-500">*</span>
        </label>

        <input
          type="text"
          className="border-b border-gray-300 text-[#202020] placeholder:text-[#202020] placeholder:text-sm md:placeholder:text-base focus:border-gray-800 outline-none py-1 text-lg font-medium"
          placeholder={`Search ${label}`}
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setShowDropdown(true);
          }}
        />

        {showDropdown && results.length > 0 && (
          <ul className="absolute top-full left-0 text-secondary w-full bg-white border border-gray-300 rounded-md shadow-md max-h-56 overflow-auto z-20">
            {results.map((user) => {
              const fullName = `${user.first_name} ${user.last_name}`;

              return (
                <li
                  key={user.id}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => {
                    onChange({ id: user.id, fullName }); // ✅ Save ID + Name in formData
                    setSearch(fullName);
                    setShowDropdown(false);
                  }}
                >
                  {fullName} — <span className="text-secondary/80">{user.position}</span>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    );
  }

  // ✅ Dropdown Field (No Changes)
 if (fieldType === "dropdown" && options) {
  const handleSelect = (val: string) => onChange(val);

  return (
    <div className="w-full space-y-3 bg-white rounded-md p-5 md:p-10">
      <div className="flex flex-col md:flex-row justify-between items-start gap-2">
        <p className="text-base md:text-[24px] font-medium text-[#202020] leading-tight">
          {(() => {
            const words = label.trim().split(/\s+/);
            const last = words.pop();
            const rest = words.join(" ");

            return (
              <>
                {rest && <span>{rest} </span>}
                <span className="whitespace-nowrap">
                  {last} <span className="text-red-500">*</span>
                </span>
              </>
            );
          })()}
        </p>

        {value && (
          <button
            onClick={() => onChange(null)}
            type="button"
            className="text-sm text-[#989898] hover:text-gray-600 whitespace-nowrap"
          >
            Clear Selection
          </button>
        )}
      </div>

      <div className="flex flex-col md:flex-row mt-5 md:mt-12 flex-wrap md:flex-nowrap md:items-center justify-center gap-6 md:gap-20">
        {options.map((opt) => (
          <label
            key={opt.value}
            className="flex flex-row md:flex-col gap-4 md:gap-0 items-center cursor-pointer text-center"
          >
            <span className="text-sm md:text-lg mb-3 hidden md:block font-medium text-[#202020]">
              {opt.label}
            </span>

            <input
              type="radio"
              name={name}
              checked={value === opt.value}
              onClick={() => handleSelect(opt.value)}
              className="appearance-none w-4 h-4 md:w-6 md:h-6 border-2 border-[#202020] rounded-full cursor-pointer relative
                         after:content-[''] after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2
                         after:w-2 after:h-2 md:after:w-4 md:after:h-4 after:rounded-full after:bg-transparent
                         checked:after:bg-[#F43F46] checked:border-[#F43F46] transition-all"
            />

            <span className="text-sm md:text-lg md:hidden font-medium text-[#202020]">
              {opt.label}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}


  // ✅ Short Input (No Changes)
  if (fieldType === "short") {
    return (
      <div className="w-full flex flex-col rounded-sm gap-2 bg-white p-5 md:p-10">
        <label className="text-base md:text-[24px] font-medium text-[#202020]">
          {label} <span className="text-red-500">*</span>
        </label>

        <input
          type="text"
          className="border-b border-gray-300 text-[#202020] placeholder:text-[#202020] placeholder:text-sm md:placeholder:text-base  focus:border-gray-800 outline-none py-1 text-lg font-medium"
          placeholder={placeholder || "Write your answer..."}
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    );
  }

  return null;
}
