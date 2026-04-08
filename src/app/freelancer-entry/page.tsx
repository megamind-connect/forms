"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input, Textarea, Button, CustomSelect, MultiSelect, RadioGroup } from '@/components/ui';
import apiClient from '@/lib/api';
import toast from 'react-hot-toast';
import Image from 'next/image';

enum Specialization {
  VIDEO_EDITOR = 'VIDEO_EDITOR',
  GRAPHIC_DESIGNER = 'GRAPHIC_DESIGNER',
  ANIMATOR = 'ANIMATOR',
  DIRECTOR = 'DIRECTOR',
  SCRIPTWRITER = 'SCRIPTWRITER',
  PHOTOGRAPHER = 'PHOTOGRAPHER',
  SOUND_ENGINEER = 'SOUND_ENGINEER',
  VFX_ARTIST = 'VFX_ARTIST',
  OTHER = 'OTHER',
}

enum Availability {
  IMMEDIATE = 'IMMEDIATE',
  ONE_WEEK = '1_WEEK_NOTICE',
  ONE_MONTH = '1_MONTH_NOTICE',
  TWO_WEEKS = '2_WEEKS_NOTICE',
}

enum PaymentPreference {
  PER_PROJECT = 'PER_PROJECT',
  DAY_RATE = 'DAY_RATE',
  HOURLY = 'HOURLY',
  MONTHLY_RETAINER = 'MONTHLY_RETAINER',
}

interface FreelancerFormData {
  fullName: string;
  email: string;
  phone: string;
  specializations: string[];
  otherSpecialization: string;
  portfolioLink: string;
  dayRate: string;
  availability: string;
  paymentPreference: string;
  experienceYears: string;
  bio: string;
  city: string;
  state: string;
  canWorkRemotely: boolean;
  canSignNda: boolean;
  linkedinProfile: string;
  reelOrSampleLink: string;
}

const FreelancerEntry = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState<FreelancerFormData>({
    fullName: '',
    email: '',
    phone: '',
    specializations: [],
    otherSpecialization: '',
    portfolioLink: '',
    dayRate: '',
    availability: Availability.IMMEDIATE,
    paymentPreference: PaymentPreference.DAY_RATE,
    experienceYears: '',
    bio: '',
    city: '',
    state: '',
    canWorkRemotely: true,
    canSignNda: false,
    linkedinProfile: '',
    reelOrSampleLink: '',
  });

  const handleChange = (name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await apiClient.post('/api/v1/public/production/forms/public-submit/freelancer-entry', formData);
      toast.success("Freelancer registration submitted successfully!");
      router.push('/freelancer-entry/thank-you');
    } catch (error: any) {
      console.error("Submission error:", error);
      toast.error(error.response?.data?.message || "Failed to submit. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const specializationOptions = Object.values(Specialization).map(v => ({
    label: v.replace(/_/g, ' '),
    value: v,
  }));

  const availabilityOptions = [
    { label: 'Immediate', value: Availability.IMMEDIATE },
    { label: '1 Week Notice', value: Availability.ONE_WEEK },
    { label: '2 Weeks Notice', value: Availability.TWO_WEEKS },
    { label: '1 Month Notice', value: Availability.ONE_MONTH },
  ];

  const paymentOptions = Object.values(PaymentPreference).map(v => ({
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
            <h1 className="text-xl lg:text-[50px] font-bold text-[#E31313]">Freelancer Registration</h1>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-16">

          {/* PERSONAL DETAILS */}
          <section className="space-y-10">
            <h2 className="text-xl font-bold text-[#202020] uppercase border-b pb-2">Personal Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <label className="text-sm font-medium text-[#57534E]">Full Name *</label>
                <Input
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={(e) => handleChange('fullName', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-4">
                <label className="text-sm font-medium text-[#57534E]">Email Address *</label>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-4">
                <label className="text-sm font-medium text-[#57534E]">Phone Number (WhatsApp preferred) *</label>
                <Input
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-4">
                <label className="text-sm font-medium text-[#57534E]">City</label>
                <Input
                  placeholder="Enter your city"
                  value={formData.city}
                  onChange={(e) => handleChange('city', e.target.value)}
                />
              </div>
              <div className="space-y-4">
                <label className="text-sm font-medium text-[#57534E]">State</label>
                <Input
                  placeholder="Enter your state"
                  value={formData.state}
                  onChange={(e) => handleChange('state', e.target.value)}
                />
              </div>
              <div className="space-y-4">
                <label className="text-sm font-medium text-[#57534E]">LinkedIn Profile</label>
                <Input
                  placeholder="https://linkedin.com/in/..."
                  value={formData.linkedinProfile}
                  onChange={(e) => handleChange('linkedinProfile', e.target.value)}
                />
              </div>
            </div>
          </section>

          {/* SKILLS & EXPERTISE */}
          <section className="space-y-10">
            <h2 className="text-xl font-bold text-[#202020] uppercase border-b pb-2">Skills & Expertise</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <label className="text-sm font-medium text-[#57534E]">Specialization (Select all that apply) *</label>
                <MultiSelect
                  name="specializations"
                  value={formData.specializations}
                  options={specializationOptions}
                  placeholder="Select Specialization(s)"
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-4">
                <label className="text-sm font-medium text-[#57534E]">Years of Experience</label>
                <Input
                  type="number"
                  placeholder="e.g. 3"
                  value={formData.experienceYears}
                  onChange={(e) => handleChange('experienceYears', e.target.value)}
                />
              </div>

              {formData.specializations.includes(Specialization.OTHER) && (
                <div className="md:col-span-2 space-y-4">
                  <label className="text-sm font-medium text-[#57534E]">Specify Other Specialization *</label>
                  <Input
                    placeholder="Specify..."
                    value={formData.otherSpecialization}
                    onChange={(e) => handleChange('otherSpecialization', e.target.value)}
                    required
                  />
                </div>
              )}

              <div className="md:col-span-2 space-y-4">
                <label className="text-sm font-medium text-[#57534E]">Brief Bio / Summary of Experience</label>
                <Textarea
                  placeholder="Tell us about your experience, style, and strengths..."
                  className="min-h-[120px]"
                  value={formData.bio}
                  onChange={(e) => handleChange('bio', e.target.value)}
                />
              </div>
            </div>
          </section>

          {/* PORTFOLIO & LINKS */}
          <section className="space-y-10">
            <h2 className="text-xl font-bold text-[#202020] uppercase border-b pb-2">Portfolio & Links</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <label className="text-sm font-medium text-[#57534E]">Portfolio / Website Link</label>
                <Input
                  placeholder="https://..."
                  value={formData.portfolioLink}
                  onChange={(e) => handleChange('portfolioLink', e.target.value)}
                />
              </div>
              <div className="space-y-4">
                <label className="text-sm font-medium text-[#57534E]">Reel / Sample Work Link</label>
                <Input
                  placeholder="https://drive.google.com/... or YouTube link"
                  value={formData.reelOrSampleLink}
                  onChange={(e) => handleChange('reelOrSampleLink', e.target.value)}
                />
              </div>
            </div>
          </section>

          {/* AVAILABILITY & RATES */}
          <section className="space-y-10">
            <h2 className="text-xl font-bold text-[#202020] uppercase border-b pb-2">Availability & Rates</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <label className="text-sm font-medium text-[#57534E]">Availability</label>
                <RadioGroup
                  name="availability"
                  value={formData.availability}
                  options={availabilityOptions}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-4">
                <label className="text-sm font-medium text-[#57534E]">Day Rate (INR)</label>
                <Input
                  type="number"
                  placeholder="e.g. 5000"
                  value={formData.dayRate}
                  onChange={(e) => handleChange('dayRate', e.target.value)}
                />
              </div>
              <div className="space-y-4">
                <label className="text-sm font-medium text-[#57534E]">Payment Preference</label>
                <CustomSelect
                  name="paymentPreference"
                  value={formData.paymentPreference}
                  options={paymentOptions}
                  placeholder="Select Preference"
                  onChange={(e) => handleChange('paymentPreference', e.target.value)}
                />
              </div>
              <div className="space-y-4">
                <label className="text-sm font-medium text-[#57534E]">Can you work remotely?</label>
                <RadioGroup
                  name="canWorkRemotely"
                  value={formData.canWorkRemotely}
                  options={[
                    { label: 'Yes', value: true },
                    { label: 'No', value: false }
                  ]}
                  onChange={handleChange}
                />
              </div>
            </div>
          </section>

          {/* COMPLIANCE */}
          <section className="  space-y-6 md:space-y-10">
            <h2 className="text-lg md:text-xl font-bold text-[#202020] uppercase">Compliance</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-start">
              <div className="space-y-4">
                <label className="text-sm font-medium text-[#57534E]">Are you willing to sign NDAs / Work Agreements?</label>
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

export default FreelancerEntry;
