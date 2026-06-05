"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#FDFDFD] flex items-center justify-center relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-red-50 rounded-full blur-[120px] opacity-30 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center gap-6"
      >
        <div className="relative">
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold text-[#1a1a1a] tracking-tighter"
          >
           Megamind
          </motion.h1>
          
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ delay: 0.8, duration: 0.8, ease: "easeInOut" }}
            className="absolute -bottom-2 left-0 h-1 bg-red-500 rounded-full"
          />
        </div>

        
      </motion.div>

      {/* Footer Branding */}
      <div className="absolute bottom-10 left-0 w-full text-center">
        <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">
          © {new Date().getFullYear()} Megamind Studio
        </p>
      </div>
    </div>
  );
}
