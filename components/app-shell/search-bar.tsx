"use client";

import { Search } from "lucide-react";

type SearchBarProps = {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
};

export default function SearchBar({
  placeholder = "Search products, brands, or categories",
  value = "",
  onChange,
}: SearchBarProps) {
  return (
    <div className="sticky top-3 z-30 mb-6">
      <div className="glass-panel gradient-border rounded-[24px] px-4 py-3 shadow-medium">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white text-[#5B6475] shadow-xs">
            <Search className="h-4.5 w-4.5" />
          </div>

          <input
            type="text"
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            placeholder={placeholder}
            className="w-full bg-transparent text-sm font-medium text-[#111827] placeholder:text-[#8A93A5] outline-none"
          />
        </div>
      </div>
    </div>
  );
}