"use client";

import { ReactNode, useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import IntroScreen from "@/components/home/intro-screen";
import OnboardingOverlay from "@/components/home/onboarding-overlay";
import BottomNav from "@/components/navigation/bottom-nav";

export default function ShopLayout({
  children,
}: {
  children: ReactNode;
}) {
  const [showIntro, setShowIntro] = useState(true);
  const [showGuide, setShowGuide] = useState(false);

  useEffect(() => {
    const introTimer = setTimeout(() => setShowIntro(false), 1800);

    const hasSeenGuide = localStorage.getItem("flow-luxe-guide-seen");
    if (!hasSeenGuide) {
      const guideTimer = setTimeout(() => setShowGuide(true), 2100);
      return () => {
        clearTimeout(introTimer);
        clearTimeout(guideTimer);
      };
    }

    return () => clearTimeout(introTimer);
  }, []);

  const handleCloseGuide = () => {
    localStorage.setItem("flow-luxe-guide-seen", "true");
    setShowGuide(false);
  };

  return (
    <>
      <AnimatePresence>{showIntro && <IntroScreen />}</AnimatePresence>
      {showGuide && <OnboardingOverlay onClose={handleCloseGuide} />}
      {children}
      <BottomNav />
    </>
  );
}