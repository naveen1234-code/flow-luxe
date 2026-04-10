"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export type SortOption = "popular" | "newest" | "price-low" | "price-high";
export type StockOption = "all" | "in-stock" | "out-of-stock";
export type PriceOption =
  | "all"
  | "under-5000"
  | "5000-10000"
  | "10000-20000"
  | "20000-plus";

type FilterSheetProps = {
  open: boolean;
  onClose: () => void;
  sortBy: SortOption;
  setSortBy: (value: SortOption) => void;
  stockFilter: StockOption;
  setStockFilter: (value: StockOption) => void;
  priceFilter: PriceOption;
  setPriceFilter: (value: PriceOption) => void;
  onReset: () => void;
};

function OptionButton({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-4 py-2 text-sm font-medium transition active:scale-95 ${
        active
          ? "bg-[#EAF0FF] text-[#4F7CFF]"
          : "border border-[#E5E9F2] bg-white text-[#111827]"
      }`}
    >
      {label}
    </button>
  );
}

export default function FilterSheet({
  open,
  onClose,
  sortBy,
  setSortBy,
  stockFilter,
  setStockFilter,
  priceFilter,
  setPriceFilter,
  onReset,
}: FilterSheetProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-[70] bg-black/20 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="fixed inset-x-0 bottom-0 z-[80] mx-auto w-full max-w-md rounded-t-[32px] border border-[#E5E9F2] bg-white p-5 shadow-2xl"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.28, ease: "easeOut" }}
          >
            <div className="mx-auto mb-4 h-1.5 w-14 rounded-full bg-[#D8DDE8]" />

            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-sm text-[#5B6475]">Filters</p>
                <h3 className="text-xl font-bold text-[#111827]">
                  Refine products
                </h3>
              </div>

              <button
                onClick={onClose}
                className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#F6F7FB] text-[#111827]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl bg-[#F6F7FB] p-4">
                <p className="mb-3 text-sm font-semibold text-[#111827]">
                  Price range
                </p>
                <div className="flex flex-wrap gap-2">
  <OptionButton
    active={priceFilter === "all"}
    label="All"
    onClick={() => setPriceFilter("all")}
  />
  <OptionButton
    active={priceFilter === "under-5000"}
    label="Under 5,000"
    onClick={() => setPriceFilter("under-5000")}
  />
  <OptionButton
    active={priceFilter === "5000-10000"}
    label="5,000–10,000"
    onClick={() => setPriceFilter("5000-10000")}
  />
  <OptionButton
    active={priceFilter === "10000-20000"}
    label="10,000–20,000"
    onClick={() => setPriceFilter("10000-20000")}
  />
  <OptionButton
    active={priceFilter === "20000-plus"}
    label="20,000+"
    onClick={() => setPriceFilter("20000-plus")}
  />
</div>
              </div>

              <div className="rounded-2xl bg-[#F6F7FB] p-4">
                <p className="mb-3 text-sm font-semibold text-[#111827]">
                  Availability
                </p>
                <div className="flex flex-wrap gap-2">
  <OptionButton
    active={stockFilter === "all"}
    label="All"
    onClick={() => setStockFilter("all")}
  />
  <OptionButton
    active={stockFilter === "in-stock"}
    label="In stock only"
    onClick={() => setStockFilter("in-stock")}
  />
  <OptionButton
    active={stockFilter === "out-of-stock"}
    label="Out of stock"
    onClick={() => setStockFilter("out-of-stock")}
  />
</div>
              </div>

              <div className="rounded-2xl bg-[#F6F7FB] p-4">
                <p className="mb-3 text-sm font-semibold text-[#111827]">
                  Sort by
                </p>
                <div className="flex flex-wrap gap-2">
                  <OptionButton
                    active={sortBy === "popular"}
                    label="Popular"
                    onClick={() => setSortBy("popular")}
                  />
                  <OptionButton
                    active={sortBy === "newest"}
                    label="Newest"
                    onClick={() => setSortBy("newest")}
                  />
                  <OptionButton
                    active={sortBy === "price-low"}
                    label="Price low to high"
                    onClick={() => setSortBy("price-low")}
                  />
                  <OptionButton
                    active={sortBy === "price-high"}
                    label="Price high to low"
                    onClick={() => setSortBy("price-high")}
                  />
                </div>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <button
  onClick={() => {
    onReset();
    onClose();
  }}
                className="rounded-2xl border border-[#E5E9F2] bg-white px-4 py-3 text-sm font-semibold text-[#111827]"
              >
                Reset
              </button>
              <button
                onClick={onClose}
                className="rounded-2xl bg-[#111827] px-4 py-3 text-sm font-semibold text-white"
              >
                Apply filters
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}