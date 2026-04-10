"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function IntroScreen() {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#F6F7FB]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.02 }}
      transition={{ duration: 0.45 }}
    >
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-[28px] bg-gradient-to-br from-[#4F7CFF] to-[#8FB1FF] shadow-xl"
        >
          <Sparkles className="h-8 w-8 text-white" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.45 }}
          className="text-2xl font-bold text-[#111827]"
        >
          Flow Luxe
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.45 }}
          className="mt-2 text-sm text-[#5B6475]"
        >
          Preparing your shopping experience
        </motion.p>

        <motion.div
          className="mx-auto mt-6 h-2 w-44 overflow-hidden rounded-full bg-[#E5E9F2]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
        >
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-[#4F7CFF] to-[#8FB1FF]"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.1, delay: 0.45, ease: "easeOut" }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}