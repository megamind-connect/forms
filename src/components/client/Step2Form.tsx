"use client";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";

import { useState } from "react";

interface FormField {
  id: string;
  name: string;
  label: string;
  fieldType: string;
  options?: { label: string; value: string | number | boolean }[] | null;
}
type FormDataValues = Record<string, string | number | boolean | null>;
interface Step2FormProps {
  formFields: FormField[];
  formData: FormDataValues;
  onNext: (data: FormDataValues) => void;
  updateFormData: (updates: FormDataValues) => void;
  validateFields: (data: FormDataValues) => Record<string, string>;
  touched: Record<string, boolean>;
  markFieldTouched: (fieldName: string) => void;
  markAllFieldsTouched: () => void;
}

export function Step2Form({
  formFields,
  formData,
  onNext,
  updateFormData,
  validateFields,
  touched,
  markFieldTouched,
  markAllFieldsTouched,
}: Step2FormProps) {
  const [snackbar, setSnackbar] = useState<{ message: string; type: "success" | "error" | "info" | "warning" } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  const handleBlur = (name: string) => {
    markFieldTouched(name);
  };

  const handleSubmit = () => {
    const errors = validateFields(formData);
    markAllFieldsTouched();
    if (Object.values(errors).some((m) => m && m.length > 0)) {
      setSnackbar({ message: "Please fill in all required fields correctly.", type: "error" });
      return;
    }
    onNext(formData);
  };

  const errors = validateFields(formData);

  return (
    <div className="flex flex-col items-center max-w-2xl w-full mt-5 mx-auto flex-1 px-4 md:px-0 scrollbar-hidden overflow-y-auto max-h-[80vh] space-y-4">
      <h2 className="text-[44px] font-medium w-full  text-primary mb-4">General Information</h2>
      {formFields.map((field, index) => {
        const isPartnerField = field.name === "partner_name" || field.name === "partner_occupation" || field.name === "partner_contact_number";

        if (isPartnerField && formData.marital_status !== "married") {
          return null;
        }

        // Show only if user is married
        if (field.name === "number_of_children" && formData.marital_status !== "married") {
          return null;
        }

        const isJobRoleField = field.name === "job_role";
        const fieldError = errors[field.name];
        const isTouched = touched[field.name] || false;

        return (
          <div key={index} className="space-y-1 w-full max-w-2xl text-left">
            <label className="text-base font-medium text-[#57534E]">{field.label}</label>
            {isJobRoleField ? (
              <Input
                type="text"
                name={field.name}
                value={formData[field.name] != null ? String(formData[field.name]) : ""}
                disabled
                className="!border-[#D9D9D9] bg-gray-100 cursor-not-allowed"
              />
            ) : (
              <>
                {field.fieldType === "text" && (
                  <Input
                    type="text"
                    name={field.name}
                    value={formData[field.name] != null ? String(formData[field.name]) : ""}
                    placeholder={field.label}
                    className="!border-[#D9D9D9]"
                    required
                    onChange={handleChange}
                    onBlur={() => handleBlur(field.name)}
                  />
                )}
                {field.fieldType === "number" && (
                  <Input
                    type="number"
                    name={field.name}
                    value={formData[field.name] != null ? String(formData[field.name]) : ""}
                    placeholder={field.label}
                    required
                    className="!border-[#D9D9D9]"
                    onChange={handleChange}
                    onBlur={() => handleBlur(field.name)}
                  />
                )}
                {field.fieldType === "date" && (
                  <Input
                    required
                    type="date"
                    name={field.name}
                    value={formData[field.name] != null ? String(formData[field.name]) : ""}
                    className="!border-[#D9D9D9]"
                    onChange={handleChange}
                    onBlur={() => handleBlur(field.name)}
                  />
                )}
                {field.fieldType === "textarea" && (
                  <Textarea
                    required
                    name={field.name}
                    value={formData[field.name] != null ? String(formData[field.name]) : ""}
                    placeholder={field.label}
                    className="!border-[#D9D9D9]"
                    onChange={handleChange}
                    onBlur={() => handleBlur(field.name)}
                  />
                )}
                {field.fieldType === "dropdown" && field.options && (
                  <select
                    required
                    name={field.name}
                    value={formData[field.name] != null ? String(formData[field.name]) : ""}
                    className="w-full border border-[#D9D9D9] rounded-md p-2 text-sm focus:outline-none"
                    onChange={handleChange}
                    onBlur={() => handleBlur(field.name)}
                  >
                    <option value="">Select {field.label}</option>
                    {field.options.map((option, index) => (
                      <option key={index} value={String(option.value)}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                )}
                {isTouched && fieldError && <p className="text-red-600 text-xs mt-1">{fieldError}</p>}
              </>
            )}
          </div>
        );
      })}
      <Button onClick={handleSubmit} className="w-full !bg-red border-none text-white  !font-normal !text-lg max-w-2xl mt-4">
        Proceed
      </Button>
    </div>
  );
}
