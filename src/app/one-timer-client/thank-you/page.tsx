// src/app/md-to-operation/thank-you/page.tsx
import Image from "next/image";
import React from "react";

const ThankYouPage = () => {
    return (
        <div className="min-h-screen bg-[#F9F9F9] flex items-center justify-center px-6">
            <div className=" flex flex-col md:flex-row items-center gap-10 text-[#E31313]">

                {/* Text Content */}
                <div className="text-center md:text-left">
                    <h1 className="text-4xl md:text-[90px] font-bold mb-4">Thank You!</h1>
                    <p className="text-lg md:text-[42px] font-medium">We appreciate your input!</p>
                    <p className="text-lg md:text-[42px] font-medium">We’ll address it shortly.</p>
                </div>

                {/* Dummy Illustration (Replace this image later) */}
                <div>
                    <Image
                        src="/images/thankyou.png"
                        alt="Thank you illustration"
                        width={500}
                        height={500}
                        className="object-cover"
                    />
                </div>

            </div>
        </div>
    );
};

export default ThankYouPage;
