"use client";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { FileUpload } from "@/components/ui/FileUpload";
import { CustomSelect } from "@/components/ui/CustomSelect";

import { useState } from "react";

interface FormField {
  id: string;
  name: string;
  label: string;
  placeholder?: string;
  fieldType: string;
  options?: { label: string; value: string | number | boolean }[] | null;
  hideLabel?: boolean;
}

interface Step2FormProps {
  formFields: FormField[];
  formData: Record<string, any>;
  onNext: () => void;
  updateFormData: (updates: Record<string, any>) => void;
  validateFields: (data: Record<string, any>) => Record<string, string>;
  touched: Record<string, boolean>;
  markFieldTouched: (name: string) => void;
  markAllFieldsTouched: () => void;
  headerTitle?: string;
  isClientPage?: boolean;
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
  headerTitle = "General Information",
  isClientPage = false
}: Step2FormProps) {
  const [snackbar, setSnackbar] = useState<{ type: 'error' | 'success'; message: string } | null>(null);

  // Derived state for errors
  const errors = validateFields(formData);

  const handleArrayChange = (fieldName: string, index: number, value: string) => {
    const currentArray = (formData[fieldName] as string[]) || [""];
    const newArray = [...currentArray];
    newArray[index] = value;
    updateFormData({ [fieldName]: newArray });
  };

  const addArrayItem = (fieldName: string) => {
    const currentArray = (formData[fieldName] as string[]) || [""];
    updateFormData({ [fieldName]: [...currentArray, ""] });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  const handleBlur = (name: string) => {
    markFieldTouched(name);
  };

  const handleSubmit = () => {
    markAllFieldsTouched();
    const currentErrors = validateFields(formData);
    if (Object.keys(currentErrors).length === 0) {
      onNext();
    } else {
      setSnackbar({ type: 'error', message: 'Please check the form for errors.' });
      setTimeout(() => setSnackbar(null), 3000);
    }
  };

  return (
    <div className="flex flex-col justify-betwee h-[80vh] items-center max-w-2xl w-full mt-5 mx-auto flex-1 px-4 md:px-0 scrollbar-hidden overflow-y-auto max-h-[80vh] space-y-8">
      <h2 className={`${isClientPage ? 'text-[32px]' : 'text-[44px]'} font-medium w-full text-black mb-4`}>{headerTitle}</h2>
      
      {formFields.map((field, index) => {
        const fieldError = errors[field.name];
        const isTouched = touched[field.name] || false;
        
        // Define placeholder logic
        const placeholderText = field.placeholder || field.label;

        // Custom Layout Logic based on fieldType
        if (field.fieldType === "header") {
            return (
                <div key={index} className="w-full pt-6 pb-2 max-w-2xl">
                    <h3 className="text-2xl font-medium text-[#202020]">{field.label}</h3>
                </div>
            )
        }

        if (field.fieldType === "array") {
             const values = (formData[field.name] as string[]) || [""];
             return (
                 <div key={index} className="space-y-1 w-full max-w-2xl text-left">
                     <label className="text-xl font-medium text-[#57534E]">{field.label}</label>
                     {values.map((val, i) => (
                         <div key={i} className="mb-2">
                            <Input
                                type="text"
                                value={val}
                                placeholder={placeholderText.replace("(s)", "")} 
                                className="!border-[#D9D9D9]"
                                onChange={(e) => handleArrayChange(field.name, i, e.target.value)}
                                onBlur={() => handleBlur(field.name)}
                            />
                         </div>
                     ))}
                     <Button 
                        onClick={() => addArrayItem(field.name)}
                        className="w-full !bg-white border !border-[#D9D9D9] !text-black h-10 mt-2 hover:!bg-gray-50 flex items-center justify-center gap-2"
                     >
                        <span className="text-xl leading-none mb-1">+</span> Add Another Number
                     </Button>
                     {isTouched && fieldError && <p className="text-red-600 text-xs mt-1">{fieldError}</p>}
                 </div>
             )
        }

         if (field.fieldType === "platform_array") {
              const values = (formData[field.name] as { platform: string; url: string }[]) || [{ platform: "", url: "" }];

              const handlePlatformChange = (idx: number, key: "platform" | "url", val: string) => {
                  const newArray = [...values];
                  newArray[idx] = { ...newArray[idx], [key]: val };
                  updateFormData({ [field.name]: newArray });
              };

              const addPlatformItem = () => {
                  updateFormData({ [field.name]: [...values, { platform: "", url: "" }] });
              };

              return (
                  <div key={index} className="space-y-1 w-full max-w-2xl text-left">
                      <label className="text-2xl font-medium text-[#57534E]">{field.label}</label>
                      {values.map((val, i) => (
                          <div key={i} className="mb-2 space-y-2">
                             <Input
                                 type="text"
                                 value={val.platform}
                                 placeholder="Platform Name"
                                 className="!border-[#D9D9D9]"
                                 onChange={(e) => handlePlatformChange(i, "platform", e.target.value)}
                             />
                             <Input
                                 type="text"
                                 value={val.url}
                                 placeholder="Platform URL"
                                 className="!border-[#D9D9D9]"
                                 onChange={(e) => handlePlatformChange(i, "url", e.target.value)}
                             />
                          </div>
                      ))}
                      <Button 
                         onClick={addPlatformItem}
                         className="w-full !bg-white border !border-[#D9D9D9] !text-black h-10 mt-2 hover:!bg-gray-50 flex items-center justify-center gap-2"
                      >
                         <span className="text-xl leading-none mb-1">+</span> Add Another Platform
                      </Button>
                  </div>
              )
         }

         if (field.fieldType === "toggle_input") {
              const fieldValue = formData[field.name] || { enabled: false, value: "" };
              const isEnabled = fieldValue.enabled || false;
              const inputValue = fieldValue.value || "";

              const handleToggle = () => {
                  updateFormData({ 
                      [field.name]: { 
                          enabled: !isEnabled, 
                          value: !isEnabled ? inputValue : "" 
                      } 
                  });
              };

              const handleInputChange = (val: string) => {
                  updateFormData({ 
                      [field.name]: { 
                          enabled: isEnabled, 
                          value: val 
                      } 
                  });
              };

              return (
                  <div key={index} className="space-y-2 w-full max-w-2xl text-left">
                      <div className="flex items-center justify-between">
                          <label className="text-lg font-medium text-[#57534E]">{field.label}</label>
                          <button
                              type="button"
                              onClick={handleToggle}
                              className={`relative w-14 h-6 rounded-full transition-colors flex items-center ${
                                  isEnabled ? "bg-[#FFEAED]" : "bg-[#D9D9D9]"
                              }`}
                          >
                              <span
                                  className={`absolute left-2 text-[10px] font-normal text-[#931C2A] transition-opacity duration-300 ${
                                      isEnabled ? "opacity-100" : "opacity-0"
                                  }`}
                              >
                                  Yes
                              </span>
                              <span
                                  className={`absolute right-2 text-[10px] font-normal text-[#303030] transition-opacity duration-300 ${
                                      !isEnabled ? "opacity-100" : "opacity-0"
                                  }`}
                              >
                                  No
                              </span>
                              <span
                                  className={`absolute top-1 left-1 w-4 h-4  rounded-full transition-transform duration-300 shadow-sm ${
                                      isEnabled ? "translate-x-7  bg-[#E31313] "  : "bg-[#656565] translate-x-0"
                                  }`}
                              />
                          </button>
                      </div>
                      {isEnabled && (
                          <Input
                              type="text"
                              value={inputValue}
                              placeholder={placeholderText}
                              className="!border-[#D9D9D9] placeholder:text-[#8F8881]"
                              onChange={(e) => handleInputChange(e.target.value)}
                              onBlur={() => handleBlur(field.name)}
                          />
                      )}
                      {isTouched && fieldError && <p className="text-red-600 text-xs mt-1">{fieldError}</p>}
                  </div>
              )
         }

         if (field.fieldType === "radio") {
              const selectedValue = formData[field.name] || "";
              return (
                  <div key={index} className="space-y-2 w-full max-w-2xl text-left">
                      <label className="text-lg font-normal text-[#57534E]">{field.label}</label>
                      <div className="flex items-center gap-6">
                          {field.options?.map((option, idx) => (
                              <label key={idx} className="flex items-center gap-2 cursor-pointer">
                                  <input
                                      type="radio"
                                      name={field.name}
                                      value={option.value}
                                      checked={selectedValue === option.value}
                                      onChange={(e) => updateFormData({ [field.name]: e.target.value })}
                                      className="w-4 h-4 text-[#E31212] focus:ring-[#E31212]"
                                  />
                                  <span className="text-sm text-gray-700">{option.label}</span>
                              </label>
                          ))}
                      </div>
                      {isTouched && fieldError && <p className="text-red-600 text-xs mt-1">{fieldError}</p>}
                  </div>
              )
         }

         if (field.fieldType === "checkbox_single") {
              const isChecked = formData[field.name] || false;
              return (
                  <div key={index} className="space-y-1 w-full max-w-2xl text-left">
                      <label className="flex items-start gap-3 cursor-pointer">
                          <input
                              type="checkbox"
                              name={field.name}
                              checked={isChecked}
                              onChange={(e) => updateFormData({ [field.name]: e.target.checked })}
                              className="w-5 h-5 mt-0.5 text-[#E31212] rounded focus:ring-[#E31212]"
                          />
                          <span className="text-base text-[#57534E]">{field.label}</span>
                      </label>
                  </div>
              )
         }

         if (field.fieldType === "subheader") {
              return (
                  <div key={index} className="w-full pt-4 pb-1 max-w-2xl">
                      <h3 className="text-xl font-medium text-[#202020]">{field.label}</h3>
                  </div>
              )
         }

         if (field.fieldType === "password") {
              return (
                  <div key={index} className="space-y-1 w-full max-w-2xl text-left">
                      {!field.hideLabel && <label className="text-xl font-medium text-[#57534E]">{field.label}</label>}
                      <Input
                          type="password"
                          name={field.name}
                          value={formData[field.name] != null ? String(formData[field.name]) : ""}
                          placeholder={placeholderText}
                          className="!border-[#D9D9D9] placeholder:text-[#8F8881]"
                          onChange={handleChange}
                          onBlur={() => handleBlur(field.name)}
                      />
                      {isTouched && fieldError && <p className="text-red-600 text-xs mt-1">{fieldError}</p>}
                  </div>
              )
         }

        return (
          <div key={index} className="space-y-1 w-full max-w-2xl text-left">
            {!field.hideLabel && <label className="text-xl font-medium text-[#57534E]">{field.label}</label>}
            
            {field.fieldType === "text" && (
                  <Input
                    type="text"
                    name={field.name}
                    value={formData[field.name] != null ? String(formData[field.name]) : ""}
                    placeholder={placeholderText}
                    className="!border-[#D9D9D9] placeholder:text-[#8F8881]"
                    required={!["gstin", "whatsapp_business_number", "whatsapp_business_link", "website_url"].includes(field.name)}
                    onChange={handleChange}
                    onBlur={() => handleBlur(field.name)}
                  />
            )}
            
            {field.fieldType === "textarea" && (
                  <Textarea
                    name={field.name}
                    value={formData[field.name] != null ? String(formData[field.name]) : ""}
                    placeholder={placeholderText}
                    className="!border-[#D9D9D9] min-h-[100px] placeholder:text-[#8F8881]"
                    onChange={handleChange}
                    onBlur={() => handleBlur(field.name)}
                  />
            )}
            
            {field.fieldType === "file" && (
                  <FileUpload
                    label="" // Label is already rendered by parent
                    placeholder={field.placeholder}
                    value={formData[field.name]}
                    onChange={(file) => updateFormData({ [field.name]: file })}
                    className="-mt-2"
                  />
            )}

            {field.fieldType === "phone" && (
               <div className="flex w-full border border-[#D9D9D9] rounded-md overflow-hidden bg-white">
                  <div className="border-r border-[#D9D9D9] bg-[#FAFAFA] px-3 flex items-center justify-center">
                     <span className="text-[#57534E] text-sm md:text-base pr-2">+91</span>
                     <svg width="8" height="5" viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 5L0 0H8L4 5Z" fill="#57534E"/>
                     </svg>
                  </div>
                  <Input
                    type="tel"
                    name={field.name}
                    value={formData[field.name] != null ? String(formData[field.name]) : ""}
                    placeholder={placeholderText}
                    className="!border-none flex-1 focus:!ring-0 rounded-none placeholder:text-[#8F8881]"
                    onChange={handleChange}
                    onBlur={() => handleBlur(field.name)}
                  />
               </div>
            )}
            
            {field.fieldType === "dropdown" && field.options && (
              <div className="relative w-full">
                <CustomSelect
                  name={field.name}
                  value={formData[field.name] != null ? String(formData[field.name]) : ""}
                  options={field.options}
                  placeholder={placeholderText}
                  onChange={handleChange}
                  onBlur={() => handleBlur(field.name)}
                />
              </div>
            )}
            
            {isTouched && fieldError && <p className="text-red-600 text-xs mt-1">{fieldError}</p>}
          </div>
        );
      })}

      {isClientPage ? (
        <Button 
          onClick={handleSubmit} 
          className="w-full !bg-[#E31212] !text-white !font-medium !text-xl max-w-2xl mt-8 h-14 flex justify-center items-center px-4 hover:!bg-[#c40f0f]"
        >
          Proceed
        </Button>
      ) : (
        <Button onClick={handleSubmit} className="w-full !bg-white border !border-red !text-red !font-normal !text-lg max-w-2xl mt-8 flex justify-between items-center px-4 hover:bg-red-50">
          Next <span className="font-bold text-xl">&gt;</span>
        </Button>
      )}

       {snackbar && (
        <div className={`fixed bottom-4 right-4 p-4 rounded-md text-white ${snackbar.type === 'error' ? 'bg-red-500' : 'bg-green-500'} transition-opacity`}>
          {snackbar.message}
        </div>
      )}
    </div>
  );
}
