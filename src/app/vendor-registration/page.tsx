"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input, Textarea, Button, CustomSelect, MultiSelect, RadioGroup, Checkbox, FileUpload } from '@/components/ui';
import { FormHeader } from '@/components/shared';
import apiClient from '@/lib/api';
import toast from 'react-hot-toast';
import {
  VendorFormData,
  VendorType,
  VendorCategory,
  VendorGSTStatus,
  VendorService,
  VendorExperience,
  AccountType,
  BankDetail
} from '@/types/vendor';
import Image from 'next/image';

const VendorRegistration = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState<VendorFormData>({
    name: '',
    legalName: '',
    yearOfEstablishment: '',
    natureOfBusiness: '',
    vendorTypes: [],
    otherVendorType: '',
    category: VendorCategory.OTHERS,
    otherCategory: '',
    contactPerson: '',
    designation: '',
    email: '',
    phoneNumber: '',
    alternateContactPerson: '',
    alternateContactDetails: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'India',
    panNumber: '',
    gstStatus: VendorGSTStatus.NO,
    gstin: '',
    isMsmeRegistered: false,
    msmeNumber: '',
    servicesOffered: [],
    otherService: '',
    serviceDescription: '',
    industryExperience: VendorExperience.LESS_THAN_1_YEAR,
    keyClients: '',
    portfolioLink: '',
    canSignNda: false,
    outsourcesWork: false,
    subcontractingDetails: '',
    hasConflictOfInterest: false,
    isDeclared: false,
    authorizedSignatoryName: '',
    panCard: null,
    gstCertificate: null,
    portfolio: null,
    bankProof: null,
    otherDocuments: null,
    bankDetail: {
      accountName: '',
      accountNumber: '',
      ifscCode: '',
      bankName: '',
      branchName: '',
      accountType: AccountType.CURRENT,
    }
  });

  const handleChange = (name: string, value: any) => {
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof VendorFormData] as any),
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (name: string, file: File | null) => {
    setFormData(prev => ({ ...prev, [name]: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.isDeclared) {
      toast.error("Please confirm the declaration before submitting.");
      return;
    }

    setIsLoading(true);
    try {
      const submitData = new FormData();

      // Add regular fields
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'bankDetail') {
          submitData.append(key, JSON.stringify(value));
        } else if (Array.isArray(value)) {
          submitData.append(key, JSON.stringify(value));
        } else if (value instanceof File) {
          submitData.append(key, value);
        } else if (value !== null && value !== undefined) {
          submitData.append(key, String(value));
        }
      });

      await apiClient.post('/api/v1/vendors', submitData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success("Registration submitted successfully!");
      router.push('/thank-you');
    } catch (error: any) {
      console.error("Submission error:", error);
      toast.error(error.response?.data?.message || "Failed to submit registration. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const vendorTypeOptions = Object.values(VendorType).map(v => ({ label: v.replace(/_/g, ' '), value: v }));
  const categoryOptions = Object.values(VendorCategory).map(v => ({ label: v.replace(/_/g, ' '), value: v }));
  const serviceOptions = Object.values(VendorService).map(v => ({ label: v.replace(/_/g, ' '), value: v }));
  const experienceOptions = Object.values(VendorExperience).map(v => ({ label: v.replace(/_/g, ' '), value: v }));
  const gstStatusOptions = Object.values(VendorGSTStatus).map(v => ({ label: v, value: v }));
  const accountTypeOptions = Object.values(AccountType).map(v => ({ label: v, value: v }));

  return (
    <div className="min-h-screen bg-[#FDFDFD] py-10 px-4">


      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
        <div className="w-full relative flex justify-center items-center mb-6">
          <Image
            src="/images/feedBackImage.png"
            alt="Feedback Banner"
            width={1400}
            height={300}
            className="w-full object-cover rounded-md"
          />

          <div className="absolute left-0 top-[30%] -translate-y-1/2">
            {/* <h1 className="text-xl lg:text-[80px] font-bold text-[#E31313]">{month}</h1> */}
            <h1 className="text-xl lg:text-[50px] font-bold text-[#E31313]">Vendor  Registration</h1>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-16">

          {/* BASIC ENTITY DETAILS */}
          <section className="space-y-10">
            <h2 className="text-xl font-bold text-[#202020] uppercase border-b pb-2">Basic Entity Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <label className="text-sm font-medium text-[#57534E]">Vendor Type (Select all that apply)</label>
                <MultiSelect
                  name="vendorTypes"
                  value={formData.vendorTypes}
                  options={vendorTypeOptions}
                  placeholder="Select Vendor Type(s)"
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-4">
                <label className="text-sm font-medium text-[#57534E]">Vendor / Brand Name *</label>
                <Input
                  placeholder="Enter Name"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  required
                />
              </div>

              {formData.vendorTypes.includes(VendorType.OTHER) && (
                <div className="md:col-span-2 space-y-4">
                  <label className="text-sm font-medium text-[#57534E]">Specify Other Vendor Type *</label>
                  <Input
                    placeholder="Specify..."
                    value={formData.otherVendorType}
                    onChange={(e) => handleChange('otherVendorType', e.target.value)}
                    required
                  />
                </div>
              )}

              <div className="space-y-4">
                <label className="text-sm font-medium text-[#57534E]">Legal Entity Name (as per PAN / GST) *</label>
                <Input
                  placeholder="Enter Legal Name"
                  value={formData.legalName}
                  onChange={(e) => handleChange('legalName', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-4">
                <label className="text-sm font-medium text-[#57534E]">Year of Establishment</label>
                <Input
                  placeholder="YYYY"
                  value={formData.yearOfEstablishment}
                  onChange={(e) => handleChange('yearOfEstablishment', e.target.value)}
                />
              </div>
              <div className="md:col-span-2 space-y-4">
                <label className="text-sm font-medium text-[#57534E]">Nature of Business (1–2 lines)</label>
                <Textarea
                  placeholder="Enter short description..."
                  className="min-h-[100px]"
                  value={formData.natureOfBusiness}
                  onChange={(e) => handleChange('natureOfBusiness', e.target.value)}
                />
              </div>
              <div className="space-y-4">
                <label className="text-sm font-medium text-[#57534E]">Category</label>
                <CustomSelect
                  name="category"
                  value={formData.category}
                  options={categoryOptions}
                  placeholder="Select Category"
                  onChange={(e) => handleChange('category', e.target.value)}
                />
              </div>
              {formData.category === VendorCategory.OTHERS && (
                <div className="space-y-4">
                  <label className="text-sm font-medium text-[#57534E]">Specify Other Category *</label>
                  <Input
                    placeholder="Specify..."
                    value={formData.otherCategory}
                    onChange={(e) => handleChange('otherCategory', e.target.value)}
                    required
                  />
                </div>
              )}
            </div>
          </section>

          {/* REGISTERED ADDRESS DETAILS */}
          <section className="space-y-10">
            <h2 className="text-xl font-bold text-[#202020] uppercase border-b pb-2">Registered Address Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <label className="text-sm font-medium text-[#57534E]">Address Line 1</label>
                <Input
                  placeholder="Flat/House No., Street"
                  value={formData.addressLine1}
                  onChange={(e) => handleChange('addressLine1', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-4">
                <label className="text-sm font-medium text-[#57534E]">Address Line 2</label>
                <Input
                  placeholder="Area, Landmark"
                  value={formData.addressLine2}
                  onChange={(e) => handleChange('addressLine2', e.target.value)}
                />
              </div>
              <div className="space-y-4">
                <label className="text-sm font-medium text-[#57534E]">Country</label>
                <Input
                  placeholder="India"
                  value={formData.country}
                  onChange={(e) => handleChange('country', e.target.value)}
                />
              </div>
              <div className="space-y-4">
                <label className="text-sm font-medium text-[#57534E]">State</label>
                <Input
                  placeholder="Select State"
                  value={formData.state}
                  onChange={(e) => handleChange('state', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-4">
                <label className="text-sm font-medium text-[#57534E]">City / District</label>
                <Input
                  placeholder="Select City"
                  value={formData.city}
                  onChange={(e) => handleChange('city', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-4">
                <label className="text-sm font-medium text-[#57534E]">PIN Code</label>
                <Input
                  placeholder="Enter PIN"
                  value={formData.zipCode}
                  onChange={(e) => handleChange('zipCode', e.target.value)}
                  required
                />
              </div>
            </div>
          </section>

          {/* PRIMARY CONTACT DETAILS */}
          <section className="space-y-10">
            <h2 className="text-xl font-bold text-[#202020] uppercase border-b pb-2">Primary Contact Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="space-y-4">
                <label className="text-sm font-medium text-[#57534E]">Primary Contact Person Name *</label>
                <Input
                  placeholder="Enter Name"
                  value={formData.contactPerson}
                  onChange={(e) => handleChange('contactPerson', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-4">
                <label className="text-sm font-medium text-[#57534E]">Designation</label>
                <Input
                  placeholder="Enter Designation"
                  value={formData.designation}
                  onChange={(e) => handleChange('designation', e.target.value)}
                />
              </div>
              <div className="space-y-4">
                <label className="text-sm font-medium text-[#57534E]">Email Address *</label>
                <Input
                  type="email"
                  placeholder="Enter Email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-4">
                <label className="text-sm font-medium text-[#57534E]">Phone Number<br />
                  (WhatsApp preferred)*</label>
                <Input
                  placeholder="Enter Phone"
                  value={formData.phoneNumber}
                  onChange={(e) => handleChange('phoneNumber', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-4">
                <label className="text-sm font-medium text-[#57534E]">Alternate Contact Person</label>
                <Input
                  placeholder="Enter Alternate Name"
                  value={formData.alternateContactPerson}
                  onChange={(e) => handleChange('alternateContactPerson', e.target.value)}
                />
              </div>
              <div className="space-y-4">
                <label className="text-sm font-medium text-[#57534E]">Alternate Phone / Email</label>
                <Input
                  placeholder="Enter Details"
                  value={formData.alternateContactDetails}
                  onChange={(e) => handleChange('alternateContactDetails', e.target.value)}
                />
              </div>
            </div>
          </section>

          {/* BUSINESS & TAX INFORMATION */}
          <section className="space-y-10">
            <h2 className="text-xl font-bold text-[#202020] uppercase border-b pb-2">Business & Tax Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="space-y-4">
                <label className="text-sm font-medium text-[#57534E]">PAN Number *</label>
                <Input
                  placeholder="Enter PAN"
                  value={formData.panNumber}
                  onChange={(e) => handleChange('panNumber', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-4">
                <label className="text-sm font-medium text-[#57534E]">GST Registered</label>
                <CustomSelect
                  name="gstStatus"
                  value={formData.gstStatus}
                  options={gstStatusOptions}
                  placeholder="Select"
                  onChange={(e) => handleChange('gstStatus', e.target.value)}
                />
              </div>
              <div className="space-y-4">
                <label className="text-sm font-medium text-[#57534E]">GST ID (If applicable)</label>
                <Input
                  placeholder="Enter GST ID"
                  value={formData.gstin}
                  onChange={(e) => handleChange('gstin', e.target.value)}
                  disabled={formData.gstStatus === VendorGSTStatus.NO}
                />
              </div>
              <div className="space-y-4">
                <label className="text-sm font-medium text-[#57534E]">MSME Registered</label>
                <RadioGroup
                  name="isMsmeRegistered"
                  value={formData.isMsmeRegistered}
                  options={[
                    { label: 'Yes', value: true },
                    { label: 'No', value: false }
                  ]}
                  onChange={handleChange}
                />
              </div>
              <div className="md:col-span-2 space-y-4">
                <label className="text-sm font-medium text-[#57534E]">MSME Registration Number (If applicable)</label>
                <Input
                  placeholder="Enter MSME No."
                  value={formData.msmeNumber}
                  onChange={(e) => handleChange('msmeNumber', e.target.value)}
                  disabled={!formData.isMsmeRegistered}
                />
              </div>
            </div>
          </section>

          {/* SERVICES & CAPABILITIES */}
          <section className="space-y-10">
            <h2 className="text-xl font-bold text-[#202020] uppercase border-b pb-2">Services & Capabilities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <label className="text-sm font-medium text-[#57534E]">Services Offered (Select all that apply)</label>
                <MultiSelect
                  name="servicesOffered"
                  value={formData.servicesOffered}
                  options={serviceOptions}
                  placeholder="Select Service(s)"
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-4">
                <label className="text-sm font-medium text-[#57534E]">Industry Experience</label>
                <CustomSelect
                  name="industryExperience"
                  value={formData.industryExperience}
                  options={experienceOptions}
                  placeholder="Select Experience"
                  onChange={(e) => handleChange('industryExperience', e.target.value)}
                />
              </div>

              {formData.servicesOffered.includes(VendorService.OTHER) && (
                <div className="md:col-span-2 space-y-4">
                  <label className="text-sm font-medium text-[#57534E]">Specify Other Service *</label>
                  <Input
                    placeholder="Specify..."
                    value={formData.otherService}
                    onChange={(e) => handleChange('otherService', e.target.value)}
                    required
                  />
                </div>
              )}

              <div className="md:col-span-2 space-y-4">
                <label className="text-sm font-medium text-[#57534E]">Detailed Description of Services</label>
                <Textarea
                  placeholder="Enter details..."
                  className="min-h-[120px]"
                  value={formData.serviceDescription}
                  onChange={(e) => handleChange('serviceDescription', e.target.value)}
                />
              </div>

              <div className="space-y-4">
                <label className="text-sm font-medium text-[#57534E]">Portfolio / Website / Drive Link</label>
                <Input
                  placeholder="https://..."
                  value={formData.portfolioLink}
                  onChange={(e) => handleChange('portfolioLink', e.target.value)}
                />
              </div>

              <div className="md:col-span-2 space-y-4">
                <label className="text-sm font-medium text-[#57534E]">Key Clients / Past Work (Optional but recommended)</label>
                <Textarea
                  placeholder="List key clients or projects..."
                  className="min-h-[100px]"
                  value={formData.keyClients}
                  onChange={(e) => handleChange('keyClients', e.target.value)}
                />
              </div>
            </div>
          </section>

          {/* BANK & SETTLEMENT DETAILS */}
          <section className="space-y-10">
            <h2 className="text-xl font-bold text-[#202020] uppercase border-b pb-2">Bank & Settlement Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="space-y-4">
                <label className="text-sm font-medium text-[#57534E]">Bank Name *</label>
                <Input
                  placeholder="Enter Bank"
                  value={formData.bankDetail.bankName}
                  onChange={(e) => handleChange('bankDetail.bankName', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-4">
                <label className="text-sm font-medium text-[#57534E]">Account Holder Name *</label>
                <Input
                  placeholder="Enter Name"
                  value={formData.bankDetail.accountName}
                  onChange={(e) => handleChange('bankDetail.accountName', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-4">
                <label className="text-sm font-medium text-[#57534E]">Account Number *</label>
                <Input
                  placeholder="Enter Acc No."
                  value={formData.bankDetail.accountNumber}
                  onChange={(e) => handleChange('bankDetail.accountNumber', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-4">
                <label className="text-sm font-medium text-[#57534E]">Branch Name *</label>
                <Input
                  placeholder="Enter Branch"
                  value={formData.bankDetail.branchName}
                  onChange={(e) => handleChange('bankDetail.branchName', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-4">
                <label className="text-sm font-medium text-[#57534E]">IFSC Code *</label>
                <Input
                  placeholder="Enter IFSC"
                  value={formData.bankDetail.ifscCode}
                  onChange={(e) => handleChange('bankDetail.ifscCode', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-4">
                <label className="text-sm font-medium text-[#57534E]">Account Type</label>
                <CustomSelect
                  name="bankDetail.accountType"
                  value={formData.bankDetail.accountType}
                  options={accountTypeOptions}
                  placeholder="Select Type"
                  onChange={(e) => handleChange('bankDetail.accountType', e.target.value)}
                />
              </div>
            </div>
          </section>

          {/* COMPLIANCE & DECLARATIONS */}
          <section className="space-y-10">
            <h2 className="text-xl font-bold text-[#202020] uppercase border-b pb-2">Compliance & Declarations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <label className="text-sm font-medium text-[#57534E]">Can you sign NDAs and Work Agreements?</label>
                <RadioGroup
                  name="canSignNda"
                  value={formData.canSignNda}
                  options={[
                    { label: 'Yes', value: true },
                    { label: 'No', value: false }
                  ]}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-4">
                <label className="text-sm font-medium text-[#57534E]">Do you outsource any part of the work?</label>
                <RadioGroup
                  name="outsourcesWork"
                  value={formData.outsourcesWork}
                  options={[
                    { label: 'Yes', value: true },
                    { label: 'No', value: false }
                  ]}
                  onChange={handleChange}
                />
              </div>
              {formData.outsourcesWork && (
                <div className="md:col-span-2 space-y-4">
                  <label className="text-sm font-medium text-[#57534E]">If yes, please provide subcontracting details</label>
                  <Textarea
                    placeholder="Enter details..."
                    className="min-h-[80px]"
                    value={formData.subcontractingDetails}
                    onChange={(e) => handleChange('subcontractingDetails', e.target.value)}
                  />
                </div>
              )}
              <div className="md:col-span-2 space-y-4">
                <label className="text-sm font-medium text-[#57534E]">Any conflict of interest with Megamind clients?</label>
                <RadioGroup
                  name="hasConflictOfInterest"
                  value={formData.hasConflictOfInterest}
                  options={[
                    { label: 'Yes', value: true },
                    { label: 'No', value: false }
                  ]}
                  onChange={handleChange}
                />
              </div>
            </div>
          </section>

          {/* DOCUMENT UPLOADS */}
          <section className="space-y-10">
            <h2 className="text-xl font-bold text-[#202020] uppercase border-b pb-2">Document Uploads</h2>
            <p className="text-sm text-gray-500 italic">Upload clear copies of the following documents for verification.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FileUpload
                label="PAN Card Copy"
                placeholder="Click to Upload Document"
                onChange={(file) => handleFileChange('panCard', file)}
                value={formData.panCard}
              />
              <FileUpload
                label="GST Certificate Copy"
                placeholder="Click to Upload Document"
                onChange={(file) => handleFileChange('gstCertificate', file)}
                value={formData.gstCertificate}
              />
              <FileUpload
                label="Portfolio / Work Samples"
                placeholder="Click to Upload Document"
                onChange={(file) => handleFileChange('portfolio', file)}
                value={formData.portfolio}
              />
              <FileUpload
                label="Bank Proof (Passbook/Cheque)"
                placeholder="Click to Upload Document"
                onChange={(file) => handleFileChange('bankProof', file)}
                value={formData.bankProof}
              />
              <FileUpload
                label="Other Relevant Documents"
                placeholder="Click to Upload Document"
                onChange={(file) => handleFileChange('otherDocuments', file)}
                value={formData.otherDocuments}
              />
            </div>
          </section>

          {/* FINAL DECLARATION */}
       <section className="bg-gray-50 p-4 sm:p-6 md:p-10 rounded-xl space-y-6 md:space-y-10">
  <h2 className="text-lg md:text-xl font-bold text-[#202020] uppercase">Declaration</h2>
  
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-start">
    <Checkbox
      name="isDeclared"
      checked={formData.isDeclared}
      onChange={handleChange}
      label="I confirm that all the information provided above is true and accurate. I understand that Megamind reserves the right to approve or reject vendor onboarding based on internal evaluation."
      className="mt-1 md:mt-2 text-sm md:text-base leading-relaxed"
    />
    
    <div className="space-y-2 md:space-y-4">
      <label className="text-sm font-medium text-[#57534E] block">
        Authorized Signatory Name *
      </label>
      <Input
        placeholder="Enter Name"
        value={formData.authorizedSignatoryName}
        onChange={(e) => handleChange('authorizedSignatoryName', e.target.value)}
        className="bg-white w-full"
        required
      />
    </div>
  </div>
</section>

          <div className="flex flex-col md:flex-row justify-end gap-4 pt-6 border-t">
            <Button
              variant="outline"
              type="button"
              className="bg-white text-[#F43F46] border border-[#F43F46] hover:bg-gray-100 px-10 h-14"
              onClick={() => router.back()}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-[#F43F46] hover:bg-red-600 text-white px-10 h-14"
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

export default VendorRegistration;