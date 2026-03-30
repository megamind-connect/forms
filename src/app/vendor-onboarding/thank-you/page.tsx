import Image from "next/image";
import React from "react";

const ThankYouPage = () => {
    return (
        <div className="min-h-screen bg-[#F9F9F9] flex items-center justify-center px-6">
            <div className="flex flex-col md:flex-row items-center gap-10 text-[#E31313]">
                {/* Text Content */}
                <div className="text-center md:text-left">
                    <h1 className="text-4xl md:text-[90px] font-bold mb-4 leading-tight">Thank You!</h1>
                    <p className="text-lg md:text-[32px] font-medium leading-relaxed">
                        Your onboarding information <br className="hidden md:block" /> has been submitted successfully.
                    </p>
                    <p className="text-sm md:text-lg text-gray-600 mt-6 max-w-md">
                        Our team will review your application and get back to you shortly.
                    </p>
                </div>

                {/* Illustration */}
                <div className="relative">
                    <Image
                        src="/images/thankyou.png"
                        alt="Thank you illustration"
                        width={500}
                        height={500}
                        className="object-cover"
                        priority
                    />
                </div>
            </div>
        </div>
    );
};

export default ThankYouPage;
