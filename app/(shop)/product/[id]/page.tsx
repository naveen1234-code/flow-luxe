"use client";

import Link from "next/link";
import { notFound, useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import type { ElementType, ReactNode } from "react";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Star,
  Truck,
} from "lucide-react";

import Container from "@/components/app-shell/container";
import ProductCard from "@/components/home/product-card";
import { addToCart } from "@/lib/cart-storage";
import { products } from "@/data/products";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
};

function formatPrice(value: number) {
  return `LKR ${value.toLocaleString()}`;
}

function getDiscountPercent(price: number, originalPrice?: number) {
  if (!originalPrice || originalPrice <= price) return null;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}

function getSavings(price: number, originalPrice?: number) {
  if (!originalPrice || originalPrice <= price) return 0;
  return originalPrice - price;
}

function getCategoryMood(category: string) {
  switch (category) {
    case "Fashion":
      return "Styled for a cleaner, more elevated everyday look.";
    case "Tech":
      return "Built to feel sharp, modern, and desk-worthy.";
    case "Beauty":
      return "Designed to make routine products feel more refined.";
    case "Home":
      return "A premium touch for calmer and better-looking spaces.";
    case "Fitness":
      return "Made to support stronger daily movement and training.";
    case "Lifestyle":
      return "Daily essentials with a richer, more polished feel.";
    default:
      return "A premium catalog pick with a cleaner shopping presentation.";
  }
}

function getFitLine(category: string) {
  switch (category) {
    case "Fashion":
      return "Perfect for wardrobe upgrades and cleaner daily style.";
    case "Tech":
      return "Great for desk setups, gadgets, and modern utility.";
    case "Beauty":
      return "Fits self-care routines and polished beauty edits.";
    case "Home":
      return "Ideal for décor, atmosphere, and home comfort.";
    case "Fitness":
      return "Best for active routines, gym kits, and home training.";
    case "Lifestyle":
      return "Useful for work, travel, and everyday carry.";
    default:
      return "A strong fit for premium everyday shopping.";
  }
}

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);

  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [buying, setBuying] = useState(false);

  const product = products.find((item) => item.id === id);

  if (!product) {
    notFound();
  }

  const discount = getDiscountPercent(product.price, product.originalPrice);
  const savings = getSavings(product.price, product.originalPrice);

  const relatedProducts = useMemo(() => {
    return products
      .filter(
        (item) => item.category === product.category && item.id !== product.id
      )
      .slice(0, 4);
  }, [product.category, product.id]);

  const handleAddToCart = () => {
    if (!product.inStock) return;

    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        name: product.name,
        category: product.category,
        price: product.price,
        image: product.image,
      });
    }

    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  const handleBuyNow = () => {
    if (!product.inStock) return;

    setBuying(true);

    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        name: product.name,
        category: product.category,
        price: product.price,
        image: product.image,
      });
    }

    router.push("/cart");
  };

  return (
    <main className="app-page text-[#111827]">
      <div className="page-glow" />

      <Container className="pt-6">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.35 }}
          className="mb-5 flex items-center justify-between gap-3"
        >
          <Link
            href="/explore"
            className="inline-flex items-center gap-2 rounded-[20px] border border-[#E5E9F2] bg-white px-4 py-3 text-sm font-semibold shadow-sm"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>

          <Link
            href="/cart"
            className="inline-flex items-center gap-2 rounded-[20px] border border-[#E5E9F2] bg-white px-4 py-3 text-sm font-semibold shadow-sm"
          >
            <ShoppingCart className="h-4 w-4" />
            Cart
          </Link>
        </motion.div>

        <motion.section
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.42, delay: 0.04 }}
          className="mb-6"
        >
          <div className="surface-card overflow-hidden rounded-[40px] p-4">
            <div className="grid gap-4">
              <div className="relative overflow-hidden rounded-[34px] bg-gradient-to-br from-[#EEF3FF] via-[#F7F9FF] to-[#F6F7FB] p-3">
                <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/70 blur-3xl" />
                <div className="absolute -left-6 bottom-0 h-24 w-24 rounded-full bg-[#DDE6FF] blur-3xl" />

                <div className="relative overflow-hidden rounded-[28px]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-[360px] w-full object-cover"
                  />

                  <div className="absolute left-4 top-4 flex flex-col gap-2">
                    {product.badge && (
                      <span className="rounded-full bg-[#111827] px-3 py-1.5 text-[11px] font-semibold text-white shadow-sm">
                        {product.badge}
                      </span>
                    )}
                    {discount && (
                      <span className="rounded-full bg-[#EF5350] px-3 py-1.5 text-[11px] font-semibold text-white shadow-sm">
                        -{discount}% OFF
                      </span>
                    )}
                  </div>

                  <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                    <GlassBadge>{product.category}</GlassBadge>
                    <GlassBadge>
                      {product.inStock ? "Ready to ship" : "Restock soon"}
                    </GlassBadge>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <MiniMetric
                  label="Status"
                  value={product.inStock ? "Live" : "Paused"}
                />
                <MiniMetric
                  label="Savings"
                  value={savings > 0 ? formatPrice(savings) : "—"}
                />
                <MiniMetric
                  label="Quantity"
                  value={`${quantity}`}
                />
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.42, delay: 0.08 }}
          className="mb-6"
        >
          <div className="surface-card rounded-[40px] p-5">
            <div className="mb-3 flex flex-wrap gap-2">
              <TopTag tone="brand">{product.category}</TopTag>
              {product.newArrival && <TopTag tone="brand">New Arrival</TopTag>}
              {product.trending && <TopTag tone="warn">Trending</TopTag>}
              {product.inStock ? (
                <TopTag tone="success">In stock</TopTag>
              ) : (
                <TopTag tone="danger">Out of stock</TopTag>
              )}
            </div>

            <h1 className="text-[2rem] font-black leading-[0.95] tracking-[-0.05em] text-[#111827]">
              {product.name}
            </h1>

            <p className="mt-3 text-sm leading-6 text-[#5B6475]">
              {product.shortDescription}
            </p>

            <div className="mt-5 rounded-[28px] bg-gradient-to-br from-[#F8FAFF] via-[#FFFFFF] to-[#F6F7FB] p-4">
              <div className="flex flex-wrap items-end gap-3">
                <p className="text-[2rem] font-black leading-none tracking-[-0.04em]">
                  {formatPrice(product.price)}
                </p>

                {product.originalPrice && product.originalPrice > product.price && (
                  <p className="pb-1 text-sm text-[#8A93A5] line-through">
                    {formatPrice(product.originalPrice)}
                  </p>
                )}
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {discount && (
                  <span className="rounded-full bg-[#FFF0EF] px-3 py-1.5 text-xs font-semibold text-[#EF5350]">
                    Save {discount}% today
                  </span>
                )}
                {savings > 0 && (
                  <span className="rounded-full bg-[#EAF8F2] px-3 py-1.5 text-xs font-semibold text-[#14B87A]">
                    You save {formatPrice(savings)}
                  </span>
                )}
              </div>
            </div>

            <div className="mt-5 rounded-[28px] bg-[#F6F7FB] p-4">
              <div className="mb-3 flex items-center justify-between gap-3">
                <p className="text-sm font-semibold">Choose quantity</p>
                <p className="text-xs font-medium text-[#5B6475]">
                  Total: {formatPrice(product.price * quantity)}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="flex h-12 w-12 items-center justify-center rounded-[18px] bg-white text-[#111827] shadow-sm"
                >
                  <Minus className="h-4 w-4" />
                </button>

                <div className="flex h-12 min-w-[64px] items-center justify-center rounded-[18px] bg-white px-4 text-base font-bold shadow-sm">
                  {quantity}
                </div>

                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="flex h-12 w-12 items-center justify-center rounded-[18px] bg-white text-[#111827] shadow-sm"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-3">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`inline-flex items-center justify-center gap-2 rounded-[20px] px-4 py-3.5 text-sm font-semibold shadow-sm transition ${
                  !product.inStock
                    ? "cursor-not-allowed bg-[#C9CED8] text-white"
                    : added
                    ? "bg-[#14B87A] text-white"
                    : "bg-[#111827] text-white"
                }`}
              >
                {added ? (
                  <>
                    <Check className="h-4 w-4" />
                    Added to cart
                  </>
                ) : !product.inStock ? (
                  "Currently unavailable"
                ) : (
                  <>
                    <ShoppingCart className="h-4 w-4" />
                    Add to cart
                  </>
                )}
              </button>

              <button
                onClick={handleBuyNow}
                disabled={!product.inStock}
                className={`inline-flex items-center justify-center gap-2 rounded-[20px] px-4 py-3.5 text-sm font-semibold transition ${
                  !product.inStock
                    ? "cursor-not-allowed border border-[#E5E9F2] bg-white text-[#A0A8B8]"
                    : "border border-[#E5E9F2] bg-white text-[#111827] shadow-sm"
                }`}
              >
                {buying && product.inStock ? "Opening cart..." : "Buy now"}
                {product.inStock && <ArrowRight className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </motion.section>

        <motion.section
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.42, delay: 0.12 }}
          className="mb-6"
        >
          <div className="grid gap-4">
            <FeatureCard
              icon={Sparkles}
              title="Why it stands out"
            >
              <p className="text-sm leading-7 text-[#5B6475]">
                {getCategoryMood(product.category)} {product.description}
              </p>
            </FeatureCard>

            <FeatureCard
              icon={Star}
              title="Good fit for"
            >
              <p className="text-sm leading-7 text-[#5B6475]">
                {getFitLine(product.category)} This item is presented as part of
                the premium catalog, so it fits best when you want browsing to
                feel more curated than ordinary shopping pages.
              </p>
            </FeatureCard>
          </div>
        </motion.section>

        <motion.section
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.42, delay: 0.16 }}
          className="mb-6"
        >
          <div className="grid gap-3">
            <TrustRow
              icon={Truck}
              title="Fast delivery"
              text="Estimated delivery in 2–5 business days depending on your location."
            />
            <TrustRow
              icon={ShieldCheck}
              title="Secure checkout"
              text="Your cart, checkout, and order flow are already connected for a smoother buying experience."
            />
            <TrustRow
              icon={CheckCircle2}
              title="Easy returns"
              text="The return section is front-end ready and designed to scale later with backend support."
            />
          </div>
        </motion.section>

        {relatedProducts.length > 0 && (
          <motion.section
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.42, delay: 0.2 }}
            className="mb-6"
          >
            <div className="surface-card rounded-[38px] p-4">
              <div className="mb-4 flex items-end justify-between gap-4">
                <div>
                  <p className="section-eyebrow">Keep the energy going</p>
                  <h2 className="mt-1 section-title">Related products</h2>
                </div>

                <Link
                  href="/explore"
                  className="text-sm font-medium text-[#4F7CFF]"
                >
                  Browse all
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {relatedProducts.map((item) => (
                  <ProductCard key={item.id} product={item} />
                ))}
              </div>
            </div>
          </motion.section>
        )}
      </Container>
    </main>
  );
}

function GlassBadge({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <span className="rounded-full bg-white/78 px-3 py-1.5 text-[11px] font-semibold text-[#111827] shadow-sm backdrop-blur">
      {children}
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
      <p className="mt-1 text-lg font-bold tracking-[-0.03em] text-[#111827]">
        {value}
      </p>
    </div>
  );
}

function TopTag({
  children,
  tone,
}: {
  children: ReactNode;
  tone: "brand" | "success" | "warn" | "danger";
}) {
  const className =
    tone === "brand"
      ? "bg-[#EAF0FF] text-[#4F7CFF]"
      : tone === "success"
      ? "bg-[#EAF8F2] text-[#14B87A]"
      : tone === "warn"
      ? "bg-[#FFF4E8] text-[#F97316]"
      : "bg-[#FFF0EF] text-[#EF5350]";

  return (
    <span className={`rounded-full px-3 py-1.5 text-xs font-semibold ${className}`}>
      {children}
    </span>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  children,
}: {
  icon: ElementType;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="surface-card rounded-[32px] p-5">
      <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-[18px] bg-[#EAF0FF] text-[#4F7CFF]">
        <Icon className="h-5 w-5" />
      </div>
      <p className="text-lg font-bold tracking-[-0.03em]">{title}</p>
      <div className="mt-2">{children}</div>
    </div>
  );
}

function TrustRow({
  icon: Icon,
  title,
  text,
}: {
  icon: ElementType;
  title: string;
  text: string;
}) {
  return (
    <div className="surface-card rounded-[28px] p-4">
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[18px] bg-[#EAF0FF] text-[#4F7CFF]">
          <Icon className="h-5 w-5" />
        </div>

        <div>
          <p className="text-sm font-semibold">{title}</p>
          <p className="mt-1 text-sm leading-6 text-[#5B6475]">{text}</p>
        </div>
      </div>
    </div>
  );
}