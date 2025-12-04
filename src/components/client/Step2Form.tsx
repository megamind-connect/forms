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
    <div className="flex flex-col justify-betwee h-[80vh] items-center max-w-2xl w-full mt-5 mx-auto flex-1 px-4 md:px-0 scrollbar-hidden overflow-y-auto max-h-[80vh] space-y-4">
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
  <div className="relative w-full">
    <select
      required
      name={field.name}
      value={formData[field.name] != null ? String(formData[field.name]) : ""}
      className="
        w-full border border-[#D9D9D9] rounded-md p-2 text-sm
        appearance-none         /* removes default arrow */
        focus:outline-none
        pr-10                   /* space for custom icon */
      "
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

    {/* Custom Dropdown Icon */}
    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
   <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.70911 0.139181C10.0267 0.373108 10.0945 0.820234 9.8606 1.13786C9.67889 1.38457 9.49719 1.61908 9.33776 1.82336C9.01956 2.23106 8.58151 2.77718 8.10552 3.32531C7.63268 3.86993 7.10835 4.43298 6.61893 4.86547C6.37501 5.08096 6.12288 5.27917 5.87703 5.42738C5.65083 5.56373 5.33998 5.71408 4.99992 5.71408C4.65986 5.71408 4.34894 5.56373 4.12274 5.42738C3.87689 5.27917 3.62483 5.08096 3.38091 4.86547C2.89143 4.43298 2.36714 3.86993 1.89427 3.32531C1.41832 2.77718 0.980253 2.23106 0.662036 1.82336C0.502634 1.61908 0.320891 1.38457 0.139191 1.13787C-0.0947366 0.820235 -0.0268894 0.373108 0.290735 0.139181C0.418416 0.0451418 0.567025 -0.000121181 0.714306 2.43641e-07H4.99992H9.28548C9.43276 -0.000121181 9.5814 0.0451418 9.70911 0.139181Z" fill="#8F8881"/>
</svg>

    </span>
  </div>
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

      {/* Snackbar Toast */}

    
    </div>
  );
}
