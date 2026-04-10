import { AccountProfile } from "@/types/account";

const ACCOUNT_KEY = "flow-luxe-account";

export function getAccountProfile(): AccountProfile {
  if (typeof window === "undefined") {
    return {
      fullName: "",
      phone: "",
      email: "",
      city: "",
      address: "",
    };
  }

  try {
    const raw = localStorage.getItem(ACCOUNT_KEY);
    if (!raw) {
      return {
        fullName: "",
        phone: "",
        email: "",
        city: "",
        address: "",
      };
    }

    return JSON.parse(raw) as AccountProfile;
  } catch {
    return {
      fullName: "",
      phone: "",
      email: "",
      city: "",
      address: "",
    };
  }
}

export function saveAccountProfile(profile: AccountProfile) {
  if (typeof window === "undefined") return;
  localStorage.setItem(ACCOUNT_KEY, JSON.stringify(profile));
  window.dispatchEvent(new Event("account-updated"));
}