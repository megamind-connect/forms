"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input, Textarea, Button, CustomSelect, MultiSelect, RadioGroup } from '@/components/ui';
import apiClient from '@/lib/api';
import toast from 'react-hot-toast';
import Image from 'next/image';

enum ServiceCategory {
  EQUIPMENT_RENTAL = 'EQUIPMENT_RENTAL',
  CATERING = 'CATERING',
  TRANSPORT = 'TRANSPORT',
  TALENT_AGENCY = 'TALENT_AGENCY',
  LOCATION_SERVICES = 'LOCATION_SERVICES',
  SET_DESIGN = 'SET_DESIGN',
  PROPS_COSTUMES = 'PROPS_COSTUMES',
  LIGHTING = 'LIGHTING',
  SOUND_EQUIPMENT = 'SOUND_EQUIPMENT',
  OTHER = 'OTHER',
}

enum VendorScale {
  INDIVIDUAL = 'INDIVIDUAL',
  SMALL_TEAM = 'SMALL_TEAM',
  MEDIUM_COMPANY = 'MEDIUM_COMPANY',
  LARGE_ENTERPRISE = 'LARGE_ENTERPRISE',
}

interface VendorEntryFormData {
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  serviceCategories: string[];
  otherServiceCategory: string;
  location: string;
  city: string;
  state: string;
  pricingSheetLink: string;
  websiteLink: string;
  experience: string;
  vendorScale: string;
  keyClients: string;
  gstRegistered: boolean;
  gstin: string;
  panNumber: string;
  canProvideInvoice: boolean;
  willingToNegotiate: boolean;
}

const VendorEntry = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState<VendorEntryFormData>({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    serviceCategories: [],
    otherServiceCategory: '',
    location: '',
    city: '',
    state: '',
    pricingSheetLink: '',
    websiteLink: '',
    experience: '',
    vendorScale: VendorScale.SMALL_TEAM,
    keyClients: '',
    gstRegistered: false,
    gstin: '',
    panNumber: '',
    canProvideInvoice: true,
    willingToNegotiate: true,
  });

  const handleChange = (name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await apiClient.post('/api/v1/public/production/forms/public-submit/vendor-entry', formData);
      toast.success("Vendor registration submitted successfully!");
      router.push('/vendor-entry/thank-you');
    } catch (error: any) {
      console.error("Submission error:", error);
      toast.error(error.response?.data?.message || "Failed to submit. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const serviceCategoryOptions = Object.values(ServiceCategory).map(v => ({
    label: v.replace(/_/g, ' '),
    value: v,
  }));

  const vendorScaleOptions = Object.values(VendorScale).map(v => ({
    label: v.replace(/_/g, ' '),
    value: v,
  }));

  return (
    <div className="min-h-screen bg-[#FDFDFD] py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">

        {/* Header Banner */}
        <div className="w-full relative flex justify-center items-center mb-6">
          <Image
            src="/images/feedBackImage.png"
            alt="Feedback Banner"
            width={1400}
            height={300}
            className="w-full object-cover rounded-md"
          />
          <div className="absolute left-0 top-[30%] -translate-y-1/2">
            <h1 className="text-xl lg:text-[50px] font-bold text-[#E31313]">Vendor Entry</h1>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-16">

          {/* COMPANY DETAILS */}
          <section className="space-y-10">
            <h2 className="text-xl font-bold text-[#202020] uppercase border-b pb-2">Company Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <label className="text-sm font-medium text-[#57534E]">Company / Brand Name *</label>
                <Input
                  placeholder="Enter company name"
                  value={formData.companyName}
                  onChange={(e) => handleChange('companyName', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-4">
                <label className="text-sm font-medium text-[#57534E]">Contact Person *</label>
                <Input
                  placeholder="Enter contact person name"
                  value={formData.contactPerson}
                  onChange={(e) => handleChange('contactPerson', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-4">
                <label className="text-sm font-medium text-[#57534E]">Email Address *</label>
                <Input
                  type="email"
                  placeholder="Enter email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-4">
                <label className="text-sm font-medium text-[#57534E]">Phone Number (WhatsApp preferred) *</label>
                <Input
                  placeholder="Enter phone number"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-4">
                <label className="text-sm font-medium text-[#57534E]">Vendor Scale</label>
                <CustomSelect
                  name="vendorScale"
                  value={formData.vendorScale}
                  options={vendorScaleOptions}
                  placeholder="Select Scale"
                  onChange={(e) => handleChange('vendorScale', e.target.value)}
                />
              </div>
              <div className="space-y-4">
                <label className="text-sm font-medium text-[#57534E]">Website Link</label>
                <Input
                  placeholder="https://..."
                  value={formData.websiteLink}
                  onChange={(e) => handleChange('websiteLink', e.target.value)}
                />
              </div>
            </div>
          </section>

          {/* LOCATION */}
          <section className="space-y-10">
            <h2 className="text-xl font-bold text-[#202020] uppercase border-b pb-2">Location Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="space-y-4">
                <label className="text-sm font-medium text-[#57534E]">Address / Location</label>
                <Input
                  placeholder="Area, Landmark"
                  value={formData.location}
                  onChange={(e) => handleChange('location', e.target.value)}
                />
              </div>
              <div className="space-y-4">
                <label className="text-sm font-medium text-[#57534E]">City</label>
                <Input
                  placeholder="Enter city"
                  value={formData.city}
                  onChange={(e) => handleChange('city', e.target.value)}
                />
              </div>
              <div className="space-y-4">
                <label className="text-sm font-medium text-[#57534E]">State</label>
                <Input
                  placeholder="Enter state"
                  value={formData.state}
                  onChange={(e) => handleChange('state', e.target.value)}
                />
              </div>
            </div>
          </section>

          {/* SERVICES & CAPABILITIES */}
          <section className="space-y-10">
            <h2 className="text-xl font-bold text-[#202020] uppercase border-b pb-2">Services & Capabilities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <label className="text-sm font-medium text-[#57534E]">Service Category (Select all that apply) *</label>
                <MultiSelect
                  name="serviceCategories"
                  value={formData.serviceCategories}
                  options={serviceCategoryOptions}
                  placeholder="Select Service(s)"
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-4">
                <label className="text-sm font-medium text-[#57534E]">Pricing Sheet / Rate Card Link</label>
                <Input
                  placeholder="https://drive.google.com/..."
                  value={formData.pricingSheetLink}
                  onChange={(e) => handleChange('pricingSheetLink', e.target.value)}
                />
              </div>

              {formData.serviceCategories.includes(ServiceCategory.OTHER) && (
                <div className="md:col-span-2 space-y-4">
                  <label className="text-sm font-medium text-[#57534E]">Specify Other Service *</label>
                  <Input
                    placeholder="Specify..."
                    value={formData.otherServiceCategory}
                    onChange={(e) => handleChange('otherServiceCategory', e.target.value)}
                    required
                  />
                </div>
              )}

              <div className="md:col-span-2 space-y-4">
                <label className="text-sm font-medium text-[#57534E]">Describe Your Services & Past Work *</label>
                <Textarea
                  placeholder="Briefly describe your services, equipment, past productions you've worked on..."
                  className="min-h-[120px]"
                  value={formData.experience}
                  onChange={(e) => handleChange('experience', e.target.value)}
                  required
                />
              </div>

              <div className="md:col-span-2 space-y-4">
                <label className="text-sm font-medium text-[#57534E]">Key Clients / Past Projects (Optional)</label>
                <Textarea
                  placeholder="List key clients or notable projects..."
                  className="min-h-[100px]"
                  value={formData.keyClients}
                  onChange={(e) => handleChange('keyClients', e.target.value)}
                />
              </div>
            </div>
          </section>

          {/* BUSINESS & TAX INFORMATION */}
          <section className="space-y-10">
            <h2 className="text-xl font-bold text-[#202020] uppercase border-b pb-2">Business & Tax Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="space-y-4">
                <label className="text-sm font-medium text-[#57534E]">PAN Number</label>
                <Input
                  placeholder="Enter PAN"
                  value={formData.panNumber}
                  onChange={(e) => handleChange('panNumber', e.target.value)}
                />
              </div>
              <div className="space-y-4">
                <label className="text-sm font-medium text-[#57534E]">GST Registered</label>
                <RadioGroup
                  name="gstRegistered"
                  value={formData.gstRegistered}
                  options={[
                    { label: 'Yes', value: true },
                    { label: 'No', value: false }
                  ]}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-4">
                <label className="text-sm font-medium text-[#57534E]">GSTIN (If applicable)</label>
                <Input
                  placeholder="Enter GSTIN"
                  value={formData.gstin}
                  onChange={(e) => handleChange('gstin', e.target.value)}
                  disabled={!formData.gstRegistered}
                />
              </div>
            </div>
          </section>

          {/* COMPLIANCE & DECLARATIONS */}
          <section className="  space-y-6 md:space-y-10">
            <h2 className="text-lg md:text-xl font-bold text-[#202020] uppercase">Compliance & Declarations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-start">
              <div className="space-y-4">
                <label className="text-sm font-medium text-[#57534E]">Can you provide proper invoices?</label>
                <RadioGroup
                  name="canProvideInvoice"
                  value={formData.canProvideInvoice}
                  options={[
                    { label: 'Yes', value: true },
                    { label: 'No', value: false }
                  ]}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-4">
                <label className="text-sm font-medium text-[#57534E]">Willing to negotiate on rates?</label>
                <RadioGroup
                  name="willingToNegotiate"
                  value={formData.willingToNegotiate}
                  options={[
                    { label: 'Yes', value: true },
                    { label: 'No', value: false }
                  ]}
                  onChange={handleChange}
                />
              </div>
            </div>
          </section>

          {/* BUTTONS */}
          <div className="flex flex-col md:flex-row justify-center gap-4 pt-6 border-t">
       
            <Button
              type="submit"
              className="bg-[#E31313] hover:bg-[#E31313]/80 text-white px-10 h-14"
              isLoading={isLoading}
            >
              Submit Registration
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VendorEntry;
