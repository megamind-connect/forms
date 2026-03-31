"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";

import { Input } from "@/components/ui/Input";
import { CustomSelect } from "@/components/ui/CustomSelect";
import { FileUpload } from "@/components/ui/FileUpload";
import { Button } from "@/components/ui/Button";
import { SplashScreen } from "@/components/client/SplashScreen";
import { useVendorOnboarding } from "@/components/hooks/useVendorOnboarding";
import apiClient from "@/lib/api";

export default function VendorOnboardingPage() {
  const router = useRouter();
  const {
    showSplash,
    formData,
    vendorStep1Fields,
    vendorStep2Fields,
    vendorStep3Fields,
    vendorStep4Fields,
    vendorStep5Fields,
    vendorStep6Fields,
    updateFormData,
    validateFields,
  } = useVendorOnboarding();

  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState(false);

  const allFields = [
    ...vendorStep1Fields,
    ...vendorStep2Fields,
    ...vendorStep3Fields,
    ...vendorStep4Fields,
    ...vendorStep5Fields,
    ...vendorStep6Fields,
  ];

  const handleGlobalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all as touched for validation UI
    const allTouched: Record<string, boolean> = {};
    allFields.forEach((f) => {
      allTouched[f.name] = true;
    });
    setTouched(allTouched);

    const errors = validateFields(allFields);
    if (Object.keys(errors).length > 0) {
      toast.error("Please complete all required fields.");
      return;
    }

    setIsLoading(true);
    try {
      const submitData = new FormData();

      // Add Registration Category
      submitData.append("registrationCategory", "VENDOR");

      // Reconstruct the nested bankDetail object from the flat formData keys
      const bankDetailKeys = ["accountName", "bankName", "branchName", "accountNumber", "ifscCode", "accountType"];
      const bankDetail: any = {};
      let hasBankDetail = false;

      bankDetailKeys.forEach((key) => {
        if (formData[key]) {
          bankDetail[key] = formData[key];
          hasBankDetail = true;
        }
      });

      if (hasBankDetail) {
        submitData.append("bankDetail", JSON.stringify(bankDetail));
      }

      // Add regular fields
      Object.entries(formData).forEach(([key, value]) => {
        if (bankDetailKeys.includes(key)) return; // Skip fields packed into bankDetail

        if (key === "bankDetail") {
          submitData.append(key, JSON.stringify(value));
        } else if (Array.isArray(value)) {
          submitData.append(key, JSON.stringify(value));
        } else if (value instanceof File) {
          submitData.append(key, value);
        } else if (value !== null && value !== undefined) {
          submitData.append(key, String(value));
        }
      });

      await apiClient.post("/api/v1/vendors", submitData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Thank you! Vendor onboarding information submitted.");
      router.push("/vendor-registration/thank-you");
    } catch (error: any) {
      console.error("Submission error:", error);
      toast.error(error.response?.data?.message || "Failed to submit. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const renderField = (field: any) => {
    const error = validateFields([field])[field.name];
    const isTouched = touched[field.name];

    if (field.fieldType === "file") {
      return (
        <div key={field.id} className="flex flex-col h-full space-y-1">
          <FileUpload
            label={field.label}
            placeholder={field.placeholder}
            value={formData[field.name]}
            onChange={(file) => updateFormData({ [field.name]: file })}
            className=""
          />
          {isTouched && error && <p className="text-red-600 text-xs mt-1">{error}</p>}
        </div>
      );
    }

    return (
      <div key={field.id} className="space-y-4">
        <label className="text-sm font-medium text-[#57534E]">
          {field.label} {!field.optional && "*"}
        </label>

        {(field.fieldType === "text" || field.fieldType === "email") && (
          <Input
            type={field.fieldType}
            placeholder={field.placeholder}
            value={formData[field.name] || ""}
            onChange={(e) => updateFormData({ [field.name]: e.target.value })}
            onBlur={() => setTouched((prev) => ({ ...prev, [field.name]: true }))}
          />
        )}

        {field.fieldType === "dropdown" && (
          <div className="relative w-full">
            <CustomSelect
              name={field.name}
              options={
                field.options?.map((o: any) => ({
                  label: o.label,
                  value: o.value,
                })) || []
              }
              placeholder={field.placeholder}
              value={formData[field.name] || ""}
              onChange={(e) => {
                updateFormData({ [field.name]: e.target.value });
                setTouched((prev) => ({ ...prev, [field.name]: true }));
                if (e.target.value !== "other") {
                  updateFormData({ [`${field.name}_other`]: "" });
                }
              }}
            />
            {formData[field.name] === "other" && (
              <div className="mt-2 text-left">
                <Input
                  type="text"
                  name={`${field.name}_other`}
                  value={formData[`${field.name}_other`] || ""}
                  placeholder={`Please specify your ${field.label.toLowerCase()}...`}
                  onChange={(e) => updateFormData({ [`${field.name}_other`]: e.target.value })}
                  onBlur={() =>
                    setTouched((prev) => ({
                      ...prev,
                      [`${field.name}_other`]: true,
                    }))
                  }
                  required
                />
              </div>
            )}
          </div>
        )}

        {isTouched && error && <p className="text-red-600 text-xs mt-1">{error}</p>}
      </div>
    );
  };

  const renderSection = (title: string, fields: any[]) => (
    <section className="space-y-10">
      <h2 className="text-xl font-bold text-[#202020] uppercase border-b pb-2">{title}</h2>
      <div className={`grid grid-cols-1 md:grid-cols-2 ${fields.some((f) => f.fieldType === "file") ? "md:grid-cols-3" : "lg:grid-cols-3"} gap-8`}>
        {fields.map(renderField)}
      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-[#FDFDFD] py-10 px-4">
      <div className="max-w-4xl mx-auto flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
        {/* Header Banner */}
        <div className="w-full relative flex justify-center items-center mb-6">
          <Image src="/images/feedBackImage.png" alt="Vendor Registration" width={1400} height={300} className="w-full object-cover rounded-md" />
          <div className="absolute left-0 top-[30%] -translate-y-1/2">
            <h1 className="text-xl lg:text-[50px] font-bold text-red ml-10">Vendor Registration</h1>
          </div>
        </div>

        <form onSubmit={handleGlobalSubmit} className="space-y-16 mt-10">
          {renderSection("Basic Details", vendorStep1Fields)}
          {renderSection("Contact Details", vendorStep2Fields)}
          {renderSection("Address Details", vendorStep3Fields)}
          {renderSection("Bank Account Details", vendorStep4Fields)}
          {renderSection("Business & Tax Information", vendorStep5Fields)}

          <section className="space-y-10">
            <h2 className="text-xl font-bold text-[#202020] uppercase border-b pb-2">Document Uploads</h2>
            <p className="text-sm text-gray-500 italic">Upload clear copies of the following documents for verification.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">{vendorStep6Fields.map(renderField)}</div>
          </section>

          <div className="flex flex-col md:flex-row justify-end gap-4 pt-6 border-t mt-8">
            <Button
              variant="outline"
              type="button"
              className="bg-white text-[#F43F46] border border-[#F43F46] hover:bg-gray-100 px-10 h-14"
              onClick={() => router.back()}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-[#F43F46] hover:bg-red-600 text-white px-10 h-14" isLoading={isLoading}>
              Submit Onboarding
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
