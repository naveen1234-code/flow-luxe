"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { ElementType } from "react";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  Mail,
  MapPin,
  Phone,
  Save,
  Sparkles,
  UserRound,
} from "lucide-react";

import Container from "@/components/app-shell/container";
import {
  getAccountProfile,
  saveAccountProfile,
} from "@/lib/account-storage";

type AccountProfile = {
  fullName: string;
  phone: string;
  email: string;
  city: string;
  address: string;
};

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
};

export default function AccountSettingsPage() {
  const [profile, setProfile] = useState<AccountProfile>({
    fullName: "",
    phone: "",
    email: "",
    city: "",
    address: "",
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setProfile(getAccountProfile());
  }, []);

  const completionCount = useMemo(() => {
    return [
      profile.fullName,
      profile.phone,
      profile.email,
      profile.city,
      profile.address,
    ].filter((value) => value.trim()).length;
  }, [profile]);

  const completionPercent = Math.round((completionCount / 5) * 100);

  const handleSave = () => {
    saveAccountProfile(profile);
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  return (
    <main className="app-page text-[#111827]">
      <div className="page-glow" />

      <Container className="pt-6">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.36 }}
          className="mb-5 flex items-center justify-between gap-3"
        >
          <Link
            href="/account"
            className="inline-flex items-center gap-2 rounded-[20px] border border-[#E5E9F2] bg-white px-4 py-3 text-sm font-semibold shadow-sm"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>

          <button
            onClick={handleSave}
            className={`inline-flex items-center gap-2 rounded-[20px] px-4 py-3 text-sm font-semibold text-white shadow-sm transition ${
              saved ? "bg-[#14B87A]" : "bg-[#111827]"
            }`}
          >
            {saved ? (
              <>
                <CheckCircle2 className="h-4 w-4" />
                Saved
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Save changes
              </>
            )}
          </button>
        </motion.div>

        <motion.section
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.4, delay: 0.04 }}
          className="mb-6"
        >
          <div className="hero-soft relative overflow-hidden rounded-[40px] p-5 shadow-float">
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/45 blur-3xl" />
            <div className="absolute -left-8 bottom-0 h-24 w-24 rounded-full bg-[#DDE6FF] blur-3xl" />

            <div className="relative">
              <div className="mb-3 flex flex-wrap gap-2">
                <HeroChip icon={Sparkles} text="Premium profile settings" />
                <HeroChip icon={UserRound} text={`${completionPercent}% complete`} />
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-[24px] bg-white/80 text-[#4F7CFF] shadow-sm backdrop-blur">
                  <UserRound className="h-9 w-9" />
                </div>

                <div className="min-w-0">
                  <p className="section-eyebrow">Account settings</p>
                  <h1 className="mt-1 text-[2rem] font-black leading-[0.96] tracking-[-0.05em] text-[#111827]">
                    Make your profile feel complete
                  </h1>
                  <p className="mt-3 max-w-xl text-sm leading-6 text-[#5B6475]">
                    Update the saved details used across checkout, delivery,
                    account flow, and premium purchase experience.
                  </p>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-3 gap-3">
                <MiniMetric label="Completed" value={`${completionCount}/5`} />
                <MiniMetric label="Ready" value={`${completionPercent}%`} />
                <MiniMetric
                  label="Checkout"
                  value={completionCount >= 4 ? "Fast" : "Setup"}
                />
              </div>
            </div>
          </div>
        </motion.section>

        <div className="grid gap-6 lg:grid-cols-[1.02fr_0.98fr]">
          <div className="space-y-4">
            <motion.section
              variants={fadeUp}
              initial="hidden"
              animate="show"
              transition={{ duration: 0.4, delay: 0.08 }}
            >
              <div className="surface-card rounded-[36px] p-5">
                <div className="mb-4 flex items-center gap-2">
                  <UserRound className="h-4 w-4 text-[#4F7CFF]" />
                  <h2 className="text-xl font-bold tracking-[-0.03em]">
                    Personal information
                  </h2>
                </div>

                <div className="grid gap-3">
                  <FormInput
                    icon={UserRound}
                    placeholder="Full name"
                    value={profile.fullName}
                    onChange={(value) =>
                      setProfile((prev) => ({ ...prev, fullName: value }))
                    }
                  />

                  <FormInput
                    icon={Phone}
                    placeholder="Phone number"
                    value={profile.phone}
                    onChange={(value) =>
                      setProfile((prev) => ({ ...prev, phone: value }))
                    }
                  />

                  <FormInput
                    icon={Mail}
                    placeholder="Email address"
                    value={profile.email}
                    onChange={(value) =>
                      setProfile((prev) => ({ ...prev, email: value }))
                    }
                    type="email"
                  />
                </div>
              </div>
            </motion.section>

            <motion.section
              variants={fadeUp}
              initial="hidden"
              animate="show"
              transition={{ duration: 0.4, delay: 0.12 }}
            >
              <div className="surface-card rounded-[36px] p-5">
                <div className="mb-4 flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-[#4F7CFF]" />
                  <h2 className="text-xl font-bold tracking-[-0.03em]">
                    Delivery information
                  </h2>
                </div>

                <div className="grid gap-3">
                  <FormInput
                    icon={MapPin}
                    placeholder="City"
                    value={profile.city}
                    onChange={(value) =>
                      setProfile((prev) => ({ ...prev, city: value }))
                    }
                  />

                  <FormTextarea
                    icon={MapPin}
                    placeholder="Full delivery address"
                    value={profile.address}
                    onChange={(value) =>
                      setProfile((prev) => ({ ...prev, address: value }))
                    }
                  />
                </div>
              </div>
            </motion.section>
          </div>

          <div className="space-y-4">
            <motion.section
              variants={fadeUp}
              initial="hidden"
              animate="show"
              transition={{ duration: 0.42, delay: 0.16 }}
            >
              <div className="promo-gradient relative overflow-hidden rounded-[40px] p-5 shadow-float lg:sticky lg:top-6">
                <div className="absolute -right-8 top-0 h-28 w-28 rounded-full bg-white/10 blur-3xl" />
                <div className="absolute left-0 bottom-0 h-24 w-24 rounded-full bg-white/10 blur-3xl" />

                <div className="relative">
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Live profile preview
                  </div>

                  <h3 className="text-[1.8rem] font-black leading-[0.96] tracking-[-0.05em] text-white">
                    Preview what checkout will use
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-white/84">
                    These details are used to auto-fill your checkout and keep
                    the purchase flow faster and cleaner.
                  </p>

                  <div className="mt-5 space-y-3">
                    <PreviewRow
                      icon={UserRound}
                      label="Full name"
                      value={profile.fullName || "Not set"}
                    />
                    <PreviewRow
                      icon={Phone}
                      label="Phone"
                      value={profile.phone || "Not set"}
                    />
                    <PreviewRow
                      icon={Mail}
                      label="Email"
                      value={profile.email || "Not set"}
                    />
                    <PreviewRow
                      icon={MapPin}
                      label="City"
                      value={profile.city || "Not set"}
                    />
                    <PreviewRow
                      icon={MapPin}
                      label="Address"
                      value={profile.address || "Not set"}
                    />
                  </div>

                  <button
                    onClick={handleSave}
                    className={`mt-5 flex w-full items-center justify-center gap-2 rounded-[20px] px-4 py-3.5 text-sm font-semibold text-white shadow-sm transition active:scale-[0.98] ${
                      saved ? "bg-[#14B87A]" : "bg-[#111827]"
                    }`}
                  >
                    {saved ? (
                      <>
                        <CheckCircle2 className="h-4 w-4" />
                        Saved successfully
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4" />
                        Save profile
                      </>
                    )}
                  </button>

                  <Link
                    href="/checkout"
                    className="mt-3 flex w-full items-center justify-center rounded-[20px] border border-white/18 bg-white/10 px-4 py-3.5 text-sm font-semibold text-white"
                  >
                    Go to checkout
                  </Link>
                </div>
              </div>
            </motion.section>
          </div>
        </div>
      </Container>
    </main>
  );
}

function HeroChip({
  icon: Icon,
  text,
}: {
  icon: ElementType;
  text: string;
}) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1.5 text-xs font-semibold text-[#111827] shadow-sm backdrop-blur">
      <Icon className="h-3.5 w-3.5 text-[#4F7CFF]" />
      {text}
    </span>
  );
}

function MiniMetric({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="glass-panel rounded-[22px] p-4 text-center">
      <p className="text-xs font-medium text-[#5B6475]">{label}</p>
      <p className="mt-1 text-sm font-bold tracking-[-0.03em] text-[#111827]">
        {value}
      </p>
    </div>
  );
}

function FormInput({
  icon: Icon,
  placeholder,
  value,
  onChange,
  type = "text",
}: {
  icon: ElementType;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-[22px] border border-[#E5E9F2] bg-[#F6F7FB] px-4 py-3.5">
      <div className="flex h-10 w-10 items-center justify-center rounded-[16px] bg-white text-[#4F7CFF] shadow-sm">
        <Icon className="h-4 w-4" />
      </div>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent text-sm font-medium text-[#111827] placeholder:text-[#8A93A5] outline-none"
      />
    </div>
  );
}

function FormTextarea({
  icon: Icon,
  placeholder,
  value,
  onChange,
}: {
  icon: ElementType;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="rounded-[22px] border border-[#E5E9F2] bg-[#F6F7FB] p-4">
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-[16px] bg-white text-[#4F7CFF] shadow-sm">
        <Icon className="h-4 w-4" />
      </div>
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="min-h-[140px] w-full resize-none bg-transparent text-sm font-medium text-[#111827] placeholder:text-[#8A93A5] outline-none"
      />
    </div>
  );
}

function PreviewRow({
  icon: Icon,
  label,
  value,
}: {
  icon: ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-[22px] bg-white/10 p-4 backdrop-blur">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-[16px] bg-white/18 text-white">
          <Icon className="h-4 w-4" />
        </div>

        <div className="min-w-0">
          <p className="text-xs font-medium text-white/72">{label}</p>
          <p className="mt-1 break-words text-sm font-semibold text-white">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}