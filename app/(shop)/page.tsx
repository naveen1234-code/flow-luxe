"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { ElementType, ReactNode } from "react";
import {
  ArrowRight,
  BadgePercent,
  Clock3,
  Flame,
  Gift,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Truck,
  Zap,
} from "lucide-react";

import Container from "@/components/app-shell/container";
import SearchBar from "@/components/app-shell/search-bar";
import TopHeader from "@/components/app-shell/top-header";
import ProductCard from "@/components/home/product-card";
import {
  categories,
  featuredProducts,
  newArrivals,
  trendingProducts,
} from "@/data/home-data";
import { products } from "@/data/products";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
};

const flashDeals = products
  .filter((product) => product.originalPrice && product.originalPrice > product.price)
  .slice(0, 8);

const under5000Products = products.filter((product) => product.price <= 5000).slice(0, 8);

const styleEdit = products.slice(10, 16);

const heroProduct = featuredProducts[0] ?? products[0];
const spotlightProducts = trendingProducts.slice(0, 4);
const collectionCards = [
  {
    title: "Modern Fashion",
    text: "Refined layers, premium basics, and cleaner silhouettes.",
    chip: "Style drop",
    href: "/explore",
  },
  {
    title: "Tech That Looks Premium",
    text: "Desk gear and gadgets that feel more elevated than ordinary store items.",
    chip: "Smart picks",
    href: "/explore",
  },
  {
    title: "Home Comfort Edit",
    text: "Soft décor, lighting, and quiet essentials for a richer daily feel.",
    chip: "Warm spaces",
    href: "/explore",
  },
  {
    title: "Everyday Lifestyle",
    text: "Portable, neat, and practical products styled for modern routines.",
    chip: "Daily carry",
    href: "/explore",
  },
];

function formatPrice(value: number) {
  return `LKR ${value.toLocaleString()}`;
}

function getDiscountPercent(price: number, originalPrice?: number) {
  if (!originalPrice || originalPrice <= price) return null;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}

export default function ShopHomePage() {
  const heroDiscount = getDiscountPercent(heroProduct.price, heroProduct.originalPrice);

  return (
    <main className="app-page text-[#111827]">
      <div className="page-glow" />

      <Container className="pt-6">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.38 }}
        >
          <TopHeader title="Luxury shopping, rebuilt for mobile" eyebrow="Flow Luxe" />
          <SearchBar />
        </motion.div>

        <motion.section
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.38, delay: 0.04 }}
          className="mb-6"
        >
          <div className="no-scrollbar flex gap-3 overflow-x-auto pb-2">
            {categories.map((cat, index) => (
              <Link
                key={cat}
                href="/explore"
                className={`shrink-0 rounded-full px-4 py-2.5 text-sm font-semibold transition ${
                  index === 0
                    ? "bg-[#111827] text-white shadow-sm"
                    : "border border-[#E5E9F2] bg-white text-[#111827]"
                }`}
              >
                {cat}
              </Link>
            ))}
          </div>
        </motion.section>

        <motion.section
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.42, delay: 0.08 }}
          className="mb-6"
        >
          <div className="hero-dark relative overflow-hidden rounded-[42px] p-5 shadow-float">
            <div className="absolute -right-10 -top-12 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -left-8 bottom-0 h-28 w-28 rounded-full bg-[#8EA8FF]/25 blur-3xl" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_32%)]" />

            <div className="relative grid gap-5">
              <div>
                <div className="mb-3 flex flex-wrap gap-2">
                  <HeroPill icon={Sparkles} text="God mode premium UI" />
                  <HeroPill icon={Clock3} text="Today’s best drops" />
                </div>

                <h1 className="max-w-xl text-[2.2rem] font-black leading-[0.94] tracking-[-0.06em] text-white">
                  This is the kind of storefront that makes people stare
                </h1>

                <p className="mt-4 max-w-xl text-sm leading-6 text-white/82">
                  A richer home screen, stronger visual hierarchy, sharper cards,
                  and a more expensive mobile feel than a normal marketplace clone.
                </p>

                <div className="mt-5 flex flex-wrap gap-3">
                  <Link
                    href="/explore"
                    className="inline-flex items-center gap-2 rounded-[20px] bg-white px-5 py-3 text-sm font-semibold text-[#111827] shadow-lg transition active:scale-[0.98]"
                  >
                    Enter the catalog
                    <ArrowRight className="h-4 w-4" />
                  </Link>

                  <Link
                    href="/cart"
                    className="inline-flex items-center gap-2 rounded-[20px] border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur"
                  >
                    Open cart
                  </Link>
                </div>
              </div>

              <div className="grid gap-3">
                <div className="glass-panel rounded-[30px] p-3">
                  <div className="grid grid-cols-[88px_1fr] gap-3">
                    <div className="overflow-hidden rounded-[22px] bg-white/10">
                      <img
                        src={heroProduct.image}
                        alt={heroProduct.name}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div className="min-w-0">
                      <div className="mb-2 flex flex-wrap gap-2">
                        <span className="rounded-full bg-white/12 px-2.5 py-1 text-[10px] font-semibold text-white">
                          Spotlight item
                        </span>
                        {heroDiscount && (
                          <span className="rounded-full bg-[#EF5350] px-2.5 py-1 text-[10px] font-semibold text-white">
                            -{heroDiscount}% off
                          </span>
                        )}
                      </div>

                      <p className="line-clamp-2 text-sm font-semibold text-white">
                        {heroProduct.name}
                      </p>
                      <p className="mt-1 text-xs leading-5 text-white/72">
                        {heroProduct.shortDescription}
                      </p>

                      <div className="mt-3 flex items-end gap-2">
                        <p className="text-base font-bold text-white">
                          {formatPrice(heroProduct.price)}
                        </p>
                        {heroProduct.originalPrice && (
                          <p className="text-xs text-white/55 line-through">
                            {formatPrice(heroProduct.originalPrice)}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <GlassStat value="50+" label="Catalog" />
                  <GlassStat value="6" label="Categories" />
                  <GlassStat value="100%" label="Front-end" />
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.38, delay: 0.12 }}
          className="mb-6"
        >
          <div className="grid grid-cols-2 gap-4">
            <CommandCard
              href="/explore"
              icon={Flame}
              title="Flash storm"
              text="Heavy discounts and hot drops"
            />
            <CommandCard
              href="/explore"
              icon={Zap}
              title="New wave"
              text="Latest premium arrivals"
            />
            <CommandCard
              href="/orders"
              icon={Truck}
              title="Track flow"
              text="Open orders and delivery"
            />
            <CommandCard
              href="/account"
              icon={Gift}
              title="Account vault"
              text="Profile, settings, history"
            />
          </div>
        </motion.section>

        <motion.section
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.4, delay: 0.16 }}
          className="mb-8"
        >
          <div className="surface-card rounded-[36px] p-4">
            <SectionHeader eyebrow="Today’s momentum" title="Flash deals" href="/explore" />

            <div className="mb-4 grid gap-4">
              <div className="overflow-hidden rounded-[28px] bg-gradient-to-br from-[#FFF1EC] via-[#FFF7F3] to-[#FFFFFF] p-4">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-[#F97316]">Live deal spotlight</p>
                    <h3 className="mt-1 text-xl font-bold tracking-[-0.03em] text-[#111827]">
                      Premium offers that actually feel premium
                    </h3>
                  </div>

                  <div className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#111827] shadow-sm">
                    Ends tonight
                  </div>
                </div>

                <div className="no-scrollbar flex gap-4 overflow-x-auto pb-2">
                  {flashDeals.map((product) => (
                    <ProductCard key={product.id} product={product} horizontal />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mb-8"
        >
          <div className="grid gap-4">
            <EditorialCard
              icon={Star}
              title="This layout finally feels expensive"
              text="Instead of repeating the same strip-and-grid pattern, this version uses stronger hero hierarchy, layered cards, and more dramatic section changes."
            />
            <EditorialCard
              icon={BadgePercent}
              title="Affordable doesn’t have to look cheap"
              text="Budget products, deal products, and featured products now live in more intentional section styles."
            />
            <EditorialCard
              icon={Sparkles}
              title="Premium mobile first"
              text="This redesign is built to feel like a real high-end app home, not just a prettier template."
            />
          </div>
        </motion.section>

        <motion.section
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.4, delay: 0.24 }}
          className="mb-8"
        >
          <div className="surface-card rounded-[36px] p-4">
            <SectionHeader eyebrow="Sharp picks" title="Trending now" href="/explore" />

            <div className="no-scrollbar flex gap-4 overflow-x-auto pb-2">
              {trendingProducts.map((product) => (
                <ProductCard key={product.id} product={product} horizontal />
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.4, delay: 0.28 }}
          className="mb-8"
        >
          <div className="grid gap-4">
            <div className="surface-card rounded-[36px] p-4">
              <SectionHeader eyebrow="Fresh in" title="New arrivals" href="/explore" />
              <div className="grid grid-cols-2 gap-4">
                {newArrivals.slice(0, 4).map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>

            <div className="surface-card rounded-[36px] p-4">
              <SectionHeader eyebrow="Featured energy" title="Picked for your style" href="/explore" />
              <div className="grid grid-cols-2 gap-4">
                {featuredProducts.slice(0, 4).map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.4, delay: 0.32 }}
          className="mb-8"
        >
          <div className="surface-card rounded-[36px] p-4">
            <SectionHeader eyebrow="Styled collections" title="Shop by mood" href="/explore" />

            <div className="grid grid-cols-2 gap-4">
              {collectionCards.map((card) => (
                <CollectionCard
                  key={card.title}
                  href={card.href}
                  title={card.title}
                  text={card.text}
                  chip={card.chip}
                />
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.4, delay: 0.36 }}
          className="mb-8"
        >
          <div className="surface-card rounded-[36px] p-4">
            <SectionHeader eyebrow="Budget edit" title="Under LKR 5,000" href="/explore" />

            <div className="no-scrollbar flex gap-4 overflow-x-auto pb-2">
              {under5000Products.map((product) => (
                <ProductCard key={product.id} product={product} horizontal />
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.4, delay: 0.4 }}
          className="mb-8"
        >
          <div className="surface-card rounded-[36px] p-4">
            <SectionHeader eyebrow="Style board" title="Editor’s picks" href="/explore" />

            <div className="grid grid-cols-2 gap-4">
              {styleEdit.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.4, delay: 0.44 }}
          className="mb-8"
        >
          <div className="grid gap-3">
            <TrustCard
              icon={ShieldCheck}
              title="Secure checkout"
              desc="Clearer call-to-actions, softer shells, and stronger visual confidence across the purchase flow."
            />
            <TrustCard
              icon={Truck}
              title="Cleaner delivery flow"
              desc="Product page, cart, checkout, order details, and tracking already feel like one connected product."
            />
            <TrustCard
              icon={ShoppingBag}
              title="Marketplace feel, luxury finish"
              desc="It keeps the energy of a big marketplace while looking much more premium on mobile."
            />
          </div>
        </motion.section>

        <motion.section
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.44, delay: 0.48 }}
          className="mb-6"
        >
          <div className="promo-gradient relative overflow-hidden rounded-[42px] p-6 shadow-float">
            <div className="absolute -right-10 top-0 h-32 w-32 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-24 w-24 rounded-full bg-white/10 blur-3xl" />

            <div className="relative">
              <p className="text-sm font-medium text-white/82">Final premium push</p>
              <h2 className="mt-2 text-[2rem] font-black leading-[0.96] tracking-[-0.05em] text-white">
                Browse the full catalog and let the design do the flexing
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-white/84">
                50+ products, multiple filters, dynamic product pages, cart, checkout,
                order details, tracking, account settings — all wrapped in a stronger visual system.
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/explore"
                  className="inline-flex items-center gap-2 rounded-[20px] bg-white px-5 py-3 text-sm font-semibold text-[#111827] transition active:scale-[0.98]"
                >
                  Browse all products
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  href="/account"
                  className="inline-flex items-center gap-2 rounded-[20px] border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white"
                >
                  Open account
                </Link>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <GlassStat value="50+" label="Products" />
                <GlassStat value="6" label="Categories" />
                <GlassStat value="3" label="Payment UIs" />
                <GlassStat value="100%" label="Front-end" />
              </div>
            </div>
          </div>
        </motion.section>
      </Container>
    </main>
  );
}

function SectionHeader({
  eyebrow,
  title,
  href,
}: {
  eyebrow: string;
  title: string;
  href: string;
}) {
  return (
    <div className="mb-4 flex items-end justify-between gap-4">
      <div>
        <p className="section-eyebrow">{eyebrow}</p>
        <h2 className="mt-1 section-title">{title}</h2>
      </div>

      <Link href={href} className="text-sm font-medium text-[#4F7CFF]">
        See all
      </Link>
    </div>
  );
}

function HeroPill({
  icon: Icon,
  text,
}: {
  icon: ElementType;
  text: string;
}) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-white/95 backdrop-blur">
      <Icon className="h-3.5 w-3.5" />
      {text}
    </span>
  );
}

function HeroMiniCard({
  icon: Icon,
  title,
  text,
}: {
  icon: ElementType;
  title: string;
  text: string;
}) {
  return (
    <div className="glass-panel rounded-[24px] p-4 text-white">
      <Icon className="mb-3 h-5 w-5 text-white" />
      <p className="text-sm font-semibold text-white">{title}</p>
      <p className="mt-1 text-xs leading-5 text-white/80">{text}</p>
    </div>
  );
}

function GlassStat({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div className="glass-panel rounded-[22px] p-4 text-center text-white">
      <p className="text-xl font-bold text-white">{value}</p>
      <p className="mt-1 text-xs text-white/78">{label}</p>
    </div>
  );
}

function CommandCard({
  href,
  icon: Icon,
  title,
  text,
}: {
  href: string;
  icon: ElementType;
  title: string;
  text: string;
}) {
  return (
    <Link
      href={href}
      className="surface-card interactive-lift rounded-[30px] p-4"
    >
      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-[20px] bg-[#EEF1F7]">
        <Icon className="h-5 w-5" />
      </div>
      <p className="text-sm font-semibold">{title}</p>
      <p className="mt-1 text-xs leading-5 text-[#5B6475]">{text}</p>
    </Link>
  );
}

function EditorialCard({
  icon: Icon,
  title,
  text,
}: {
  icon: ElementType;
  title: string;
  text: string;
}) {
  return (
    <div className="surface-card rounded-[30px] p-5">
      <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-[18px] bg-[#EAF0FF] text-[#4F7CFF]">
        <Icon className="h-5 w-5" />
      </div>
      <p className="text-base font-bold tracking-[-0.02em]">{title}</p>
      <p className="mt-2 text-sm leading-6 text-[#5B6475]">{text}</p>
    </div>
  );
}

function CollectionCard({
  href,
  title,
  text,
  chip,
}: {
  href: string;
  title: string;
  text: string;
  chip: string;
}) {
  return (
    <Link
      href={href}
      className="interactive-lift overflow-hidden rounded-[30px] border border-[#E5E9F2] bg-gradient-to-br from-white via-[#FBFCFF] to-[#F3F6FF] p-5 shadow-sm"
    >
      <span className="inline-flex rounded-full bg-[#EAF0FF] px-3 py-1 text-[11px] font-semibold text-[#4F7CFF]">
        {chip}
      </span>
      <h3 className="mt-3 text-lg font-bold tracking-[-0.03em]">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-[#5B6475]">{text}</p>
      <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#111827]">
        Explore
        <ArrowRight className="h-4 w-4" />
      </div>
    </Link>
  );
}

function TrustCard({
  icon: Icon,
  title,
  desc,
}: {
  icon: ElementType;
  title: string;
  desc: string;
}) {
  return (
    <div className="surface-card rounded-[28px] p-4">
      <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-[18px] bg-[#EAF0FF] text-[#4F7CFF]">
        <Icon className="h-5 w-5" />
      </div>
      <p className="text-sm font-semibold">{title}</p>
      <p className="mt-1 text-xs leading-5 text-[#5B6475]">{desc}</p>
    </div>
  );
}