"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpDown,
  Package2,
  RotateCcw,
  SlidersHorizontal,
  Sparkles,
  Zap,
} from "lucide-react";

import Container from "@/components/app-shell/container";
import SearchBar from "@/components/app-shell/search-bar";
import TopHeader from "@/components/app-shell/top-header";
import CategoryRail from "@/components/home/category-rail";
import FilterSheet, {
  PriceOption,
  SortOption,
  StockOption,
} from "@/components/home/filter-sheet";
import ProductCard from "@/components/home/product-card";
import { exploreCategories, exploreProducts } from "@/data/explore-data";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
};

function StatTile({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div className="glass-panel rounded-[22px] p-4 text-center">
      <p className="text-xl font-bold text-[#111827]">{value}</p>
      <p className="mt-1 text-xs text-[#5B6475]">{label}</p>
    </div>
  );
}

function ActiveChip({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <span className="inline-flex items-center rounded-full bg-[#EAF0FF] px-3 py-1.5 text-xs font-semibold text-[#4F7CFF]">
      {children}
    </span>
  );
}

export default function ExplorePage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [openFilter, setOpenFilter] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>("popular");
  const [stockFilter, setStockFilter] = useState<StockOption>("all");
  const [priceFilter, setPriceFilter] = useState<PriceOption>("all");

  const filteredProducts = useMemo(() => {
    let products = [...exploreProducts];

    if (activeCategory !== "All") {
      products = products.filter(
        (product) => product.category === activeCategory
      );
    }

    if (search.trim()) {
      const query = search.toLowerCase();
      products = products.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query)
      );
    }

    if (stockFilter === "in-stock") {
      products = products.filter((product) => product.inStock);
    } else if (stockFilter === "out-of-stock") {
      products = products.filter((product) => !product.inStock);
    }

    if (priceFilter === "under-5000") {
      products = products.filter((product) => product.price < 5000);
    } else if (priceFilter === "5000-10000") {
      products = products.filter(
        (product) => product.price >= 5000 && product.price <= 10000
      );
    } else if (priceFilter === "10000-20000") {
      products = products.filter(
        (product) => product.price > 10000 && product.price <= 20000
      );
    } else if (priceFilter === "20000-plus") {
      products = products.filter((product) => product.price > 20000);
    }

    if (sortBy === "price-low") {
      products.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      products.sort((a, b) => b.price - a.price);
    } else if (sortBy === "newest") {
      products.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    }

    return products;
  }, [activeCategory, search, stockFilter, priceFilter, sortBy]);

  const activeFilterCount =
    (stockFilter !== "all" ? 1 : 0) +
    (priceFilter !== "all" ? 1 : 0) +
    (sortBy !== "popular" ? 1 : 0);

  const hasActiveFilters =
    !!search.trim() ||
    activeCategory !== "All" ||
    stockFilter !== "all" ||
    priceFilter !== "all" ||
    sortBy !== "popular";

  const resetFilters = () => {
    setSearch("");
    setActiveCategory("All");
    setSortBy("popular");
    setStockFilter("all");
    setPriceFilter("all");
  };

  const sortLabel =
    sortBy === "newest"
      ? "Newest"
      : sortBy === "price-low"
      ? "Price low to high"
      : sortBy === "price-high"
      ? "Price high to low"
      : "Popularity";

  return (
    <>
      <main className="app-page text-[#111827]">
        <div className="page-glow" />

        <Container className="pt-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.38 }}
          >
            <TopHeader eyebrow="Explore" title="Browse the premium catalog" />
            <SearchBar
              placeholder="Search across all products"
              value={search}
              onChange={setSearch}
            />
          </motion.div>

          <motion.section
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.42, delay: 0.04 }}
            className="mb-6"
          >
            <div className="hero-soft relative overflow-hidden rounded-[40px] p-5 shadow-float">
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/40 blur-3xl" />
              <div className="absolute -bottom-8 left-4 h-24 w-24 rounded-full bg-[#DDE6FF] blur-3xl" />

              <div className="relative">
                <div className="mb-3 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1.5 text-xs font-semibold text-[#4F7CFF] shadow-sm backdrop-blur">
                    <Sparkles className="h-3.5 w-3.5" />
                    Premium browsing
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1.5 text-xs font-semibold text-[#111827] shadow-sm backdrop-blur">
                    <Zap className="h-3.5 w-3.5" />
                    50+ products ready
                  </span>
                </div>

                <h2 className="max-w-xl text-[2rem] font-black leading-[0.96] tracking-[-0.05em] text-[#111827]">
                  Richer browsing, stronger filters, cleaner mobile feel
                </h2>

                <p className="mt-3 max-w-xl text-sm leading-6 text-[#5B6475]">
                  Scroll fast, filter deep, and explore the catalog with a
                  sharper premium layout instead of a plain product grid.
                </p>

                <div className="mt-5 grid grid-cols-3 gap-3">
                  <StatTile
                    value={String(exploreProducts.length)}
                    label="Catalog"
                  />
                  <StatTile
                    value={String(filteredProducts.length)}
                    label="Showing"
                  />
                  <StatTile
                    value={String(exploreCategories.length - 1)}
                    label="Categories"
                  />
                </div>
              </div>
            </div>
          </motion.section>

          <motion.section
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.38, delay: 0.08 }}
            className="mb-6"
          >
            <div className="surface-card rounded-[32px] p-4">
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <p className="section-eyebrow">Category rail</p>
                  <h2 className="mt-1 section-title">
                    {activeCategory === "All"
                      ? "Browse every category"
                      : `${activeCategory} edit`}
                  </h2>
                </div>

                <button
                  onClick={() => setOpenFilter(true)}
                  className="inline-flex shrink-0 items-center gap-2 rounded-[20px] bg-[#111827] px-4 py-3 text-sm font-semibold text-white shadow-sm"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  Filter
                  {activeFilterCount > 0 && (
                    <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1 text-[10px] font-bold text-[#111827]">
                      {activeFilterCount}
                    </span>
                  )}
                </button>
              </div>

              <CategoryRail
                categories={exploreCategories}
                activeCategory={activeCategory}
                onChange={setActiveCategory}
              />
            </div>
          </motion.section>

          <motion.section
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.38, delay: 0.12 }}
            className="mb-6"
          >
            <div className="surface-card rounded-[32px] p-4">
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <p className="section-eyebrow">Result control</p>
                  <h2 className="mt-1 section-title">
                    {filteredProducts.length} item
                    {filteredProducts.length === 1 ? "" : "s"} found
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-[#5B6475]">
                    Sorted by {sortLabel.toLowerCase()}.
                    {activeCategory !== "All"
                      ? ` Focused on ${activeCategory.toLowerCase()}.`
                      : " Showing all categories."}
                  </p>
                </div>

                {hasActiveFilters && (
                  <button
                    onClick={resetFilters}
                    className="inline-flex shrink-0 items-center gap-2 rounded-[20px] border border-[#E5E9F2] bg-[#F6F7FB] px-4 py-3 text-sm font-semibold text-[#111827]"
                  >
                    <RotateCcw className="h-4 w-4" />
                    Reset
                  </button>
                )}
              </div>

              <div className="mb-4 flex flex-wrap gap-2">
                {search.trim() && <ActiveChip>Search: {search}</ActiveChip>}
                {activeCategory !== "All" && (
                  <ActiveChip>Category: {activeCategory}</ActiveChip>
                )}
                {stockFilter === "in-stock" && (
                  <ActiveChip>In stock only</ActiveChip>
                )}
                {stockFilter === "out-of-stock" && (
                  <ActiveChip>Out of stock</ActiveChip>
                )}
                {priceFilter === "under-5000" && (
                  <ActiveChip>Under 5,000</ActiveChip>
                )}
                {priceFilter === "5000-10000" && (
                  <ActiveChip>5,000–10,000</ActiveChip>
                )}
                {priceFilter === "10000-20000" && (
                  <ActiveChip>10,000–20,000</ActiveChip>
                )}
                {priceFilter === "20000-plus" && (
                  <ActiveChip>20,000+</ActiveChip>
                )}
                {sortBy === "newest" && <ActiveChip>Newest</ActiveChip>}
                {sortBy === "price-low" && (
                  <ActiveChip>Price: low to high</ActiveChip>
                )}
                {sortBy === "price-high" && (
                  <ActiveChip>Price: high to low</ActiveChip>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <ExploreMetric
                  icon={Package2}
                  label="Visible now"
                  value={`${filteredProducts.length}`}
                />
                <ExploreMetric
                  icon={ArrowUpDown}
                  label="Sort mode"
                  value={sortLabel}
                />
              </div>
            </div>
          </motion.section>

          <motion.section
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.4, delay: 0.16 }}
            className="mb-6"
          >
            {filteredProducts.length === 0 ? (
              <div className="surface-card rounded-[34px] p-8 text-center">
                <div className="mx-auto mb-4 flex h-18 w-18 items-center justify-center rounded-[24px] bg-[#F6F7FB] text-3xl">
                  🔎
                </div>

                <h3 className="text-2xl font-bold tracking-[-0.03em]">
                  No products found
                </h3>
                <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-[#5B6475]">
                  Try another search, remove some filters, or jump back to all
                  categories for a wider result set.
                </p>

                <button
                  onClick={resetFilters}
                  className="mt-6 rounded-[20px] bg-[#111827] px-5 py-3 text-sm font-semibold text-white shadow-sm"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="surface-card rounded-[34px] p-4">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div>
                    <p className="section-eyebrow">Catalog grid</p>
                    <h2 className="mt-1 section-title">
                      Scroll the collection
                    </h2>
                  </div>

                  <div className="rounded-full bg-[#F6F7FB] px-3 py-1.5 text-xs font-semibold text-[#5B6475]">
                    Premium browse mode
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            )}
          </motion.section>
        </Container>
      </main>

      <FilterSheet
        open={openFilter}
        onClose={() => setOpenFilter(false)}
        sortBy={sortBy}
        setSortBy={setSortBy}
        stockFilter={stockFilter}
        setStockFilter={setStockFilter}
        priceFilter={priceFilter}
        setPriceFilter={setPriceFilter}
        onReset={resetFilters}
      />
    </>
  );
}

function ExploreMetric({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-[22px] bg-[#F6F7FB] p-4">
      <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-[18px] bg-white text-[#4F7CFF] shadow-sm">
        <Icon className="h-4 w-4" />
      </div>
      <p className="text-xs font-medium text-[#5B6475]">{label}</p>
      <p className="mt-1 text-sm font-semibold text-[#111827]">{value}</p>
    </div>
  );
}