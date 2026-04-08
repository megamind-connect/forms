"use client";

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui';
import { CheckCircle2 } from 'lucide-react';

export default function VendorEntryThankYouPage() {
  return (
    <div className="min-h-screen bg-[#FDFDFD] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-10 text-center space-y-6">
        <div className="flex justify-center">
          <CheckCircle2 className="w-20 h-20 text-green-500" />
        </div>
        <h1 className="text-3xl font-bold text-[#202020]">Thank You!</h1>
        <p className="text-[#57534E]">
          Your vendor registration has been submitted successfully.
          Our production team will review your details and get back to you soon.
        </p>
        <Link href="/" className="block">
          <Button className="w-full bg-[#F43F46] hover:bg-red-600 text-white h-12">
            Return Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
