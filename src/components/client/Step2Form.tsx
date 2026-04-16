"use client";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { FileUpload } from "@/components/ui/FileUpload";
import { CustomSelect } from "@/components/ui/CustomSelect";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

import { useState } from "react";

interface FormField {
  id: string;
  name: string;
  label: string;
  placeholder?: string;
  fieldType: string;
  options?: { label: string; value: string | number | boolean }[] | null;
  hideLabel?: boolean;
  optional?: boolean;
  dependsOn?: string;
  hasToggle?: boolean;
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
  buttonText?: string;
  hideToggleInput?: boolean;
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
  headerTitle = "Brand Name",
  isClientPage = false,
  buttonText,
  hideToggleInput = false
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

      {(() => {
        let isCurrentHeaderVisible = true;

        return formFields.map((field, index) => {
          if (field.fieldType === "header") {
            const headerState = formData[field.name];
            isCurrentHeaderVisible = field.hasToggle ? (headerState === undefined ? false : headerState) : true;
          }

          if (field.dependsOn !== undefined && !formData[field.dependsOn]) {
            return null;
          }

          if (!isCurrentHeaderVisible && field.fieldType !== "header") {
            return null;
          }

          const fieldError = errors[field.name];
          const isTouched = touched[field.name] || false;

          // Define placeholder logic
          const placeholderText = field.placeholder || field.label;

          // Custom Layout Logic based on fieldType
          if (field.fieldType === "header") {
            const isEnabled = formData[field.name] === undefined ? false : formData[field.name];
            return (
              <div key={index} className={`flex flex-col w-full pb-2 max-w-2xl text-left ${index !== 0 ? 'border-t border-[#D9D9D9] mt-6 pt-6' : 'pt-6'}`}>
                <div className="flex items-center justify-between w-full gap-4">
                  <h3 className="text-2xl font-medium text-[#202020] flex-1">{field.label}</h3>
                  {field.hasToggle && (
                    <button
                      type="button"
                      onClick={() => {
                        updateFormData({ [field.name]: !isEnabled });
                        markFieldTouched(field.name);
                      }}
                      className={`relative w-14 h-6 shrink-0 rounded-full transition-colors flex items-center ${isEnabled ? "bg-[#FFEAED]" : "bg-[#D9D9D9]"}`}
                    >
                      <span className={`absolute left-2 text-[10px] font-normal text-[#931C2A] transition-opacity duration-300 ${isEnabled ? "opacity-100" : "opacity-0"}`}>
                        Yes
                      </span>
                      <span className={`absolute right-2 text-[10px] font-normal text-[#303030] transition-opacity duration-300 ${!isEnabled ? "opacity-100" : "opacity-0"}`}>
                        No
                      </span>
                      <span className={`absolute top-1 left-1 w-4 h-4 rounded-full transition-transform duration-300 shadow-sm ${isEnabled ? "translate-x-7 bg-[#E31313]" : "bg-[#656565] translate-x-0"}`} />
                    </button>
                  )}
                </div>
                {isTouched && fieldError && !field.hasToggle && <p className="text-red-600 text-xs mt-1 w-full">{fieldError}</p>}
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
                <div className="flex items-center justify-between gap-4">
                  <label className="text-lg font-medium text-[#57534E] flex-1">{field.label}</label>
                  <button
                    type="button"
                    onClick={handleToggle}
                    className={`relative w-14 h-6 shrink-0 rounded-full transition-colors flex items-center ${isEnabled ? "bg-[#FFEAED]" : "bg-[#D9D9D9]"
                      }`}
                  >
                    <span
                      className={`absolute left-2 text-[10px] font-normal text-[#931C2A] transition-opacity duration-300 ${isEnabled ? "opacity-100" : "opacity-0"
                        }`}
                    >
                      Yes
                    </span>
                    <span
                      className={`absolute right-2 text-[10px] font-normal text-[#303030] transition-opacity duration-300 ${!isEnabled ? "opacity-100" : "opacity-0"
                        }`}
                    >
                      No
                    </span>
                    <span
                      className={`absolute top-1 left-1 w-4 h-4  rounded-full transition-transform duration-300 shadow-sm ${isEnabled ? "translate-x-7  bg-[#E31313] " : "bg-[#656565] translate-x-0"
                        }`}
                    />
                  </button>
                </div>
                {isEnabled && !hideToggleInput && (
                  <Input
                    type="text"
                    value={inputValue}
                    placeholder={placeholderText}
                    className="border-[#D9D9D9]! placeholder:text-[#8F8881]"
                    onChange={(e) => handleInputChange(e.target.value)}
                    onBlur={() => handleBlur(field.name)}
                  />
                )}
                {isTouched && fieldError && <p className="text-red-600 text-xs mt-1">{fieldError}</p>}
              </div>
            )
          }

          if (field.fieldType === "radio" || field.fieldType === "radio_stacked") {
            const rawValue = formData[field.name];
            const selectedValue = typeof rawValue === 'object' && rawValue !== null ? rawValue.selected : (rawValue != null ? String(rawValue) : "");
            const isOtherSelected = selectedValue === "others";

            return (
              <div key={index} className="space-y-2 w-full max-w-2xl text-left">
                <label className="text-xl font-medium text-[#57534E]">{field.label}</label>
                <div className={`flex ${field.fieldType === "radio_stacked" ? "flex-col gap-4" : "items-center gap-6"}`}>
                  {field.options?.map((option, idx) => (
                    <label key={idx} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name={field.name}
                        value={String(option.value)}
                        checked={selectedValue === String(option.value)}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (val === "others") {
                            updateFormData({
                              [field.name]: {
                                selected: "others",
                                otherText: typeof rawValue === 'object' && rawValue !== null ? rawValue.otherText : ""
                              }
                            });
                          } else {
                            updateFormData({ [field.name]: val });
                          }
                        }}
                        className="w-4 h-4 text-[#E31212] focus:ring-[#E31212]"
                      />
                      <span className="text-sm text-gray-700">{option.label}</span>
                    </label>
                  ))}
                </div>
                {isOtherSelected && (
                  <div className="mt-2">
                    <Input
                      type="text"
                      placeholder="Please specify your role..."
                      value={typeof rawValue === 'object' && rawValue !== null ? rawValue.otherText : ""}
                      className="border-[#D9D9D9]! placeholder:text-[#8F8881]"
                      onChange={(e) => {
                        updateFormData({
                          [field.name]: {
                            selected: "others",
                            otherText: e.target.value
                          }
                        });
                      }}
                      onBlur={() => handleBlur(field.name)}
                    />
                  </div>
                )}
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

          if (field.fieldType === "or_divider") {
            return (
              <div key={index} className="w-full py-2 max-w-2xl text-left">
                <p className="text-lg italic font-medium text-[#E31212]">{field.label}</p>
              </div>
            )
          }

          if (field.fieldType === "description_text") {
            return (
              <div key={index} className="w-full pb-4 max-w-2xl text-left">
                <p className="text-base italic text-[#57534E]">{field.label}</p>
              </div>
            )
          }

          if (field.fieldType === "subheader") {
            return (
              <div key={index} className="w-full pt-4 pb-1 max-w-2xl">
                <h3 className="text-xl font-medium text-[#202020]">{field.label}</h3>
                {isTouched && fieldError && <p className="text-red-600 text-xs mt-1">{fieldError}</p>}
              </div>
            )
          }



          if (field.fieldType === "toggle") {
            const isEnabled = formData[field.name] || false;

            const handleToggle = () => {
              const newValue = !isEnabled;
              const updates: Record<string, any> = { [field.name]: newValue };
              
              if (newValue) {
                if (field.name.endsWith('_access_toggle')) {
                  const prefix = field.name.replace('_access_toggle', '');
                  updates[`${prefix}_invite_toggle`] = false;
                } else if (field.name.endsWith('_invite_toggle')) {
                  const prefix = field.name.replace('_invite_toggle', '');
                  updates[`${prefix}_access_toggle`] = false;
                }
              }
              
              updateFormData(updates);
              markFieldTouched(field.name);
            };

            return (
              <div key={index} className="flex flex-col w-full pt-4 pb-1 max-w-2xl text-left">
                <div className="flex items-center justify-between w-full gap-4">
                  <h3 className="text-xl font-medium text-[#202020] flex-1">{field.label}</h3>
                  <button
                    type="button"
                    onClick={handleToggle}
                    className={`relative w-14 h-6 shrink-0 rounded-full transition-colors flex items-center ${isEnabled ? "bg-[#FFEAED]" : "bg-[#D9D9D9]"
                      }`}
                  >
                    <span
                      className={`absolute left-2 text-[10px] font-normal text-[#931C2A] transition-opacity duration-300 ${isEnabled ? "opacity-100" : "opacity-0"
                        }`}
                    >
                      Yes
                    </span>
                    <span
                      className={`absolute right-2 text-[10px] font-normal text-[#303030] transition-opacity duration-300 ${!isEnabled ? "opacity-100" : "opacity-0"
                        }`}
                    >
                      No
                    </span>
                    <span
                      className={`absolute top-1 left-1 w-4 h-4 rounded-full transition-transform duration-300 shadow-sm ${isEnabled ? "translate-x-7 bg-[#E31313]" : "bg-[#656565] translate-x-0"
                        }`}
                    />
                  </button>
                </div>
              </div>
            );
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

              {(field.fieldType === "text" || field.fieldType === "email") && (
                <Input
                  type={field.fieldType}
                  name={field.name}
                  value={formData[field.name] != null ? String(formData[field.name]) : ""}
                  placeholder={placeholderText}
                  className="!border-[#D9D9D9] placeholder:text-[#8F8881]"
                  required={!field.optional && !isClientPage && !["gstin", "whatsapp_business_number", "whatsapp_business_link", "website_url"].includes(field.name)}
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
                <div className="w-full">
                  <PhoneInput
                    country={'in'}
                    value={formData[field.name] != null ? String(formData[field.name]) : ""}
                    onChange={(phone) => updateFormData({ [field.name]: phone })}
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
                    placeholder={placeholderText}
                  />
                </div>
              )}

              {field.fieldType === "dropdown" && field.options && (
                <div className="relative w-full">
                  <CustomSelect
                    name={field.name}
                    options={field.options.map(opt => ({ label: opt.label, value: String(opt.value) }))}
                    value={formData[field.name] || ""}
                    onChange={(e) => {
                      const val = e.target.value;
                      updateFormData({ [field.name]: val });
                      if (val !== 'other') {
                        updateFormData({ [`${field.name}_other`]: "" });
                      }
                    }}
                    onBlur={() => handleBlur(field.name)}
                    placeholder={placeholderText}
                  />

                  {formData[field.name] === "other" && (
                    <div className="mt-2 text-left">
                      <Input
                        type="text"
                        name={`${field.name}_other`}
                        value={formData[`${field.name}_other`] || ""}
                        placeholder={`Please specify your ${field.label.toLowerCase()}...`}
                        className="!border-[#D9D9D9] placeholder:text-[#8F8881]"
                        required={true}
                        onChange={handleChange}
                        onBlur={() => handleBlur(`${field.name}_other`)}
                      />
                      {touched[`${field.name}_other`] && errors[`${field.name}_other`] && (
                        <p className="text-red-600 text-xs mt-1">{errors[`${field.name}_other`]}</p>
                      )}
                    </div>
                  )}
                </div>
              )}

              {isTouched && fieldError && <p className="text-red-600 text-xs mt-1">{fieldError}</p>}
            </div>
          );
        });
      })()}

      {isClientPage ? (
        <Button
          onClick={handleSubmit}
          className="w-full !bg-[#E31212] !text-white !font-medium !text-xl max-w-2xl mt-8 h-14 flex justify-center items-center px-4 hover:!bg-[#c40f0f]"
        >
          {buttonText || "Proceed"}
        </Button>
      ) : (
        <Button onClick={handleSubmit} className="w-full !bg-white border !border-red !text-red !font-normal !text-lg max-w-2xl mt-8 flex justify-between items-center px-4 hover:bg-red-50">
          {buttonText || "Next"} <span className="font-bold text-xl">&gt;</span>
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
