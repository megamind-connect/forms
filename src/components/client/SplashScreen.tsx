"use client";

import { motion, AnimatePresence } from "framer-motion";

export function SplashScreen() {
  return (
    <AnimatePresence>
      <motion.div
        className="absolute inset-0 flex items-center justify-center z-20 bg-[#FFFBFB]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }} 
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        {/* LEFT Decorative SVG */}
        <motion.img
          src="/svgs/red-screen-left.svg"
          alt="Decor Left"
          className="absolute top-0 left-0 w-32 sm:w-48 md:w-64"
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />

        {/* LOGO */}
        <motion.img
          src="/svgs/megamind-logo-black.svg"
          alt="megamind logo"
          className="w-32 sm:w-48 md:w-64 mx-auto"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        />

        {/* RIGHT Decorative SVG */}
        <motion.img
          src="/svgs/red-screen-right.svg"
          alt="Decor Right"
          className="absolute bottom-0 right-0 w-32 sm:w-48 md:w-64"
          initial={{ x: 80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
        />
      </motion.div>
    </AnimatePresence>
  );
}
