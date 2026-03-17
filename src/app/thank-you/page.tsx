"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, Home } from "lucide-react";
import { Button } from "@/components/ui";

const SharedThankYouPage = () => {
  return (
    <div className="min-h-screen bg-[#FDFDFD] flex items-center justify-center px-6 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-50 rounded-full blur-[120px] opacity-50 pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-red-50 rounded-full blur-[120px] opacity-50 pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-2xl w-full bg-white/80 backdrop-blur-md rounded-[32px] shadow-2xl shadow-gray-200/50 border border-white p-8 md:p-16 text-center space-y-10 relative z-10"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ 
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.3 
          }}
          className="flex justify-center"
        >
          <div className="bg-red-50 p-6 rounded-full">
            <CheckCircle2 className="w-20 h-20 text-[#F43F46]" />
          </div>
        </motion.div>

        <div className="space-y-4">
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-4xl md:text-6xl font-bold text-[#1a1a1a] tracking-tight"
          >
            Thank You!
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-lg md:text-2xl text-[#57534E] font-medium max-w-md mx-auto leading-relaxed"
          >
            Your submission has been received successfully. We appreciate your time and input.
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
        >
          <Link href="/" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto bg-[#F43F46] hover:bg-red-600 text-white h-14 px-8 rounded-full flex items-center gap-2 text-lg shadow-lg shadow-red-200 transition-all hover:scale-105 active:scale-95">
              <Home className="w-5 h-5" />
              Return Home
            </Button>
          </Link>
          <Button 
            variant="outline"
            className="w-full sm:w-auto border-2 border-gray-200 text-gray-700 hover:bg-gray-50 h-14 px-8 rounded-full flex items-center gap-2 text-lg transition-all hover:border-gray-300"
            onClick={() => window.close()}
          >
            Close Window
          </Button>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="pt-8 flex justify-center items-center gap-3 text-gray-400"
        >
          <div className="h-px w-8 bg-gray-200" />
          <span className="text-sm font-medium uppercase tracking-wider">Megamind Forms</span>
          <div className="h-px w-8 bg-gray-200" />
        </motion.div>
      </motion.div>

      {/* Modern illustration background */}
      <div className="hidden lg:block absolute right-10 bottom-10 opacity-10">
        <Image
          src="/images/thankyou.png"
          alt="Illustration"
          width={300}
          height={300}
          className="grayscale"
        />
      </div>
    </div>
  );
};

export default SharedThankYouPage;
