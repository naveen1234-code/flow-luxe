"use client";

import { motion } from "framer-motion";

type OnboardingOverlayProps = {
  onClose: () => void;
};

const steps = [
  {
    title: "Search products here",
    text: "Quickly find products, brands, or categories.",
  },
  {
    title: "Browse categories",
    text: "Swipe through categories and explore faster.",
  },
  {
    title: "Track cart and orders",
    text: "Use the bottom navigation to manage your shopping.",
  },
];

export default function OnboardingOverlay({
  onClose,
}: OnboardingOverlayProps) {
  return (
    <div className="fixed inset-0 z-[90] bg-black/20 backdrop-blur-[2px]">
      <div className="flex min-h-screen items-end justify-center px-4 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="w-full max-w-md rounded-[28px] border border-[#E5E9F2] bg-white p-5 shadow-2xl"
        >
          <p className="mb-1 text-sm font-medium text-[#4F7CFF]">
            Welcome guide
          </p>
          <h2 className="text-xl font-bold text-[#111827]">
            Your Flow Luxe tour
          </h2>

          <div className="mt-4 space-y-4">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className="rounded-2xl bg-[#F6F7FB] p-4"
              >
                <p className="text-sm font-semibold text-[#111827]">
                  {index + 1}. {step.title}
                </p>
                <p className="mt-1 text-sm text-[#5B6475]">{step.text}</p>
              </div>
            ))}
          </div>

          <button
            onClick={onClose}
            className="mt-5 w-full rounded-2xl bg-[#111827] px-4 py-3 text-sm font-semibold text-white transition active:scale-[0.98]"
          >
            Got it
          </button>
        </motion.div>
      </div>
    </div>
  );
}