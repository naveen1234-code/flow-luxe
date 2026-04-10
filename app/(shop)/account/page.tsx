"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  Bell,
  ChevronRight,
  CreditCard,
  Gift,
  History,
  MapPin,
  PackageCheck,
  ReceiptText,
  Settings,
  ShoppingBag,
  Sparkles,
  TicketPercent,
  Truck,
  UserRound,
  Wallet,
} from "lucide-react";

import Container from "@/components/app-shell/container";
import ProductCard from "@/components/home/product-card";
import { products } from "@/data/products";
import { getAccountProfile } from "@/lib/account-storage";
import { getCartCount } from "@/lib/cart-storage";
import { getOrders } from "@/lib/order-storage";
import { Order } from "@/types/order";

type AccountProfile = {
  fullName: string;
  phone: string;
  email: string;
  city: string;
  address: string;
};

export default function AccountPage() {
  const [profile, setProfile] = useState<AccountProfile>({
    fullName: "",
    phone: "",
    email: "",
    city: "",
    address: "",
  });
  const [orders, setOrders] = useState<Order[]>([]);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const sync = () => {
      setProfile(getAccountProfile());
      setOrders(getOrders());
      setCartCount(getCartCount());
    };

    sync();

    window.addEventListener("orders-updated", sync);
    window.addEventListener("cart-updated", sync);
    window.addEventListener("account-updated", sync);

    return () => {
      window.removeEventListener("orders-updated", sync);
      window.removeEventListener("cart-updated", sync);
      window.removeEventListener("account-updated", sync);
    };
  }, []);

  const displayName = profile.fullName.trim() || "Your account";
  const displayEmail = profile.email.trim() || "Complete your profile in settings";
  const firstLetter = displayName.charAt(0).toUpperCase() || "A";

  const processingCount = useMemo(
    () => orders.filter((order) => order.status === "Processing").length,
    [orders]
  );

  const confirmedCount = useMemo(
    () => orders.filter((order) => order.status === "Confirmed").length,
    [orders]
  );

  const deliveredCount = useMemo(
    () => orders.filter((order) => order.status === "Delivered").length,
    [orders]
  );

  const notificationCount = processingCount + confirmedCount;
  const completionScore =
    (profile.fullName ? 1 : 0) +
    (profile.phone ? 1 : 0) +
    (profile.email ? 1 : 0) +
    (profile.city ? 1 : 0) +
    (profile.address ? 1 : 0);

  const profileReady = completionScore >= 4;
  const moreToLove = products.slice(0, 6);

  return (
    <main className="min-h-screen bg-[#F6F7FB] pb-40 text-[#111827]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-gradient-to-b from-[#f8e8ee] via-[#eef3ff] to-transparent blur-3xl opacity-90" />

      <Container className="pt-6">
       {/* Premium profile hero */}
<section className="mb-6 overflow-hidden rounded-[36px] border border-[#E5E9F2] bg-white shadow-sm">
  <div className="relative bg-gradient-to-br from-[#f7dfe9] via-[#eef3ff] to-[#f3e8ff] p-5">
    <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/35 blur-2xl" />
    <div className="absolute -bottom-10 left-10 h-24 w-24 rounded-full bg-[#ffffff]/40 blur-2xl" />

    <div className="relative">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex h-[76px] w-[76px] shrink-0 items-center justify-center rounded-[26px] bg-white/80 text-[2rem] font-bold text-[#4F7CFF] shadow-sm backdrop-blur">
          {firstLetter}
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <Link
            href="/account/settings"
            className="flex h-12 w-12 items-center justify-center rounded-[20px] border border-white/50 bg-white/75 text-[#111827] shadow-sm backdrop-blur"
          >
            <Settings className="h-5 w-5" />
          </Link>

          <button className="relative flex h-12 w-12 items-center justify-center rounded-[20px] border border-white/50 bg-white/75 text-[#111827] shadow-sm backdrop-blur">
            <Bell className="h-5 w-5" />
            {notificationCount > 0 && (
              <span className="absolute right-0 top-0 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#EF5350] px-1 text-[10px] font-semibold text-white">
                {notificationCount}
              </span>
            )}
          </button>
        </div>
      </div>

      <div className="relative min-w-0">
        <div className="mb-2 inline-flex rounded-full bg-[#EAF8F2] px-3 py-1 text-xs font-semibold text-[#14B87A]">
          {profileReady ? "Profile ready" : "Complete profile"}
        </div>

        <h1 className="pr-1 text-[2.2rem] font-black leading-[0.92] tracking-[-0.06em] text-[#111827] break-words">
          {displayName}
        </h1>

        <p className="mt-2 break-all text-sm leading-6 text-[#5B6475]">
          {displayEmail}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          <HeroChip label="Orders" value={String(orders.length)} />
          <HeroChip label="Cart" value={String(cartCount)} />
          <HeroChip
            label="City"
            value={profile.city.trim() || "Not set"}
          />
        </div>
      </div>

      <div className="relative mt-5 grid grid-cols-3 gap-3">
        <HeroStatCard
          label="Processing"
          value={String(processingCount)}
        />
        <HeroStatCard
          label="Confirmed"
          value={String(confirmedCount)}
        />
        <HeroStatCard
          label="Delivered"
          value={String(deliveredCount)}
        />
      </div>
    </div>
  </div>

  <div className="grid grid-cols-2 gap-3 p-4 sm:grid-cols-4">
    <TopActionLink
      href="/orders"
      icon={ReceiptText}
      title="Orders"
      subtitle="View purchases"
    />
    <TopActionLink
      href="/cart"
      icon={ShoppingBag}
      title="Cart"
      subtitle="Review items"
    />
    <TopActionLink
      href="/checkout"
      icon={Wallet}
      title="Checkout"
      subtitle="Complete flow"
    />
    <TopActionLink
      href="/account/settings"
      icon={UserRound}
      title="Settings"
      subtitle="Manage profile"
    />
  </div>
</section>

        {/* Orders shortcuts */}
        <section className="mb-5 rounded-[28px] border border-[#E5E9F2] bg-white p-4 shadow-sm">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-2xl font-bold">My orders</h2>
            <Link
              href="/orders"
              className="inline-flex items-center gap-1 text-sm font-medium text-[#5B6475]"
            >
              View all
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-4 gap-3">
            <CompactShortcut
              href="/orders"
              icon={ReceiptText}
              title="Orders"
              badge={orders.length}
            />
            <CompactShortcut
              href="/orders"
              icon={PackageCheck}
              title="Processing"
              badge={processingCount}
            />
            <CompactShortcut
              href="/orders"
              icon={Truck}
              title="Tracking"
              badge={confirmedCount}
            />
            <CompactShortcut
              href="/orders"
              icon={History}
              title="History"
              badge={deliveredCount}
            />
          </div>
        </section>

        {/* Service rows */}
        <section className="mb-5 rounded-[28px] border border-[#E5E9F2] bg-white p-4 shadow-sm">
          <div className="grid grid-cols-4 gap-3">
            <CompactService
              href="/orders"
              icon={History}
              title="History"
            />
            <CompactService
              href="/explore"
              icon={ShoppingBag}
              title="Explore"
            />
            <CompactService
              href="/checkout"
              icon={CreditCard}
              title="Checkout"
            />
            <CompactService
              href="/account/settings"
              icon={MapPin}
              title="Address"
            />
          </div>
        </section>

        {/* Promo strip */}
        <section className="mb-5 overflow-hidden rounded-[28px] bg-gradient-to-r from-[#8F66FF] via-[#A175FF] to-[#BE95FF] p-5 text-white shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div className="max-w-md">
              <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur">
                <Sparkles className="h-3.5 w-3.5" />
                Shopping benefits
              </div>

              <h2 className="text-3xl font-bold leading-tight">
                Keep your account ready for faster checkout
              </h2>
              <p className="mt-2 text-sm leading-6 text-white/85">
                Saved details, tracked orders, and connected cart flow all in one place.
              </p>

              <Link
                href="/account/settings"
                className="mt-4 inline-flex items-center justify-center rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-[#111827]"
              >
                Update details
              </Link>
            </div>

            <div className="hidden shrink-0 md:block">
              <div className="grid grid-cols-2 gap-3">
                <MiniGlowCard title="Orders" value={String(orders.length)} />
                <MiniGlowCard title="Cart" value={String(cartCount)} />
                <MiniGlowCard title="City" value={profile.city || "—"} />
                <MiniGlowCard title="Status" value={profileReady ? "Ready" : "Setup"} />
              </div>
            </div>
          </div>
        </section>

        <section className="mb-5 rounded-[28px] border border-[#E5E9F2] bg-white p-4 shadow-sm">
          <div className="grid grid-cols-4 gap-3">
            <CompactService
              href="/cart"
              icon={ShoppingBag}
              title="Cart"
            />
            <CompactService
              href="/checkout"
              icon={Wallet}
              title="Checkout"
            />
            <CompactService
              href="/account/settings"
              icon={UserRound}
              title="Profile"
            />
            <CompactService
              href="/account/settings"
              icon={Settings}
              title="Settings"
            />
          </div>
        </section>

        {/* Compact profile snapshot */}
        <section className="mb-5 rounded-[28px] border border-[#E5E9F2] bg-white p-4 shadow-sm">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-[#4F7CFF]">Saved details</p>
              <h2 className="mt-1 text-2xl font-bold">Profile snapshot</h2>
            </div>

            <Link
              href="/account/settings"
              className="text-sm font-medium text-[#4F7CFF]"
            >
              Edit
            </Link>
          </div>

          <div className="grid gap-3 lg:grid-cols-2">
            <SnapshotCard
              title="Personal"
              lines={[
                profile.fullName || "No name saved",
                profile.phone || "No phone saved",
                profile.email || "No email saved",
              ]}
            />
            <SnapshotCard
              title="Delivery"
              lines={[
                profile.city || "No city saved",
                profile.address || "No address saved",
              ]}
            />
          </div>
        </section>

        {/* More to love */}
        <section className="mb-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-2xl font-bold">More to love</h2>
            <Link
              href="/explore"
              className="inline-flex items-center gap-1 text-sm font-medium text-[#5B6475]"
            >
              View more
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {moreToLove.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </Container>
    </main>
  );
}

function HeroChip({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <span className="rounded-full bg-white/65 px-3 py-1 text-xs font-medium text-[#5B6475] backdrop-blur">
      {label}: {value}
    </span>
  );
}

function HeroStatCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-[22px] bg-white/60 p-4 shadow-sm backdrop-blur">
      <p className="text-xs font-medium text-[#5B6475]">{label}</p>
      <p className="mt-1 text-2xl font-bold">{value}</p>
    </div>
  );
}

function TopActionLink({
  href,
  icon: Icon,
  title,
  subtitle,
}: {
  href: string;
  icon: React.ElementType;
  title: string;
  subtitle: string;
}) {
  return (
    <Link
      href={href}
      className="rounded-[22px] bg-[#F6F7FB] p-4 transition hover:bg-[#EEF2FA]"
    >
      <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-[#111827] shadow-sm">
        <Icon className="h-5 w-5" />
      </div>
      <p className="text-sm font-semibold">{title}</p>
      <p className="mt-1 text-xs text-[#5B6475]">{subtitle}</p>
    </Link>
  );
}

function CompactShortcut({
  href,
  icon: Icon,
  title,
  badge,
}: {
  href: string;
  icon: React.ElementType;
  title: string;
  badge?: number;
}) {
  return (
    <Link href={href} className="relative text-center">
      <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F6F7FB] text-[#111827]">
        <Icon className="h-5 w-5" />
      </div>

      {badge && badge > 0 ? (
        <span className="absolute left-1/2 top-0 flex h-5 min-w-5 translate-x-3 items-center justify-center rounded-full bg-[#EF5350] px-1 text-[10px] font-semibold text-white">
          {badge}
        </span>
      ) : null}

      <p className="text-sm font-medium">{title}</p>
    </Link>
  );
}

function CompactService({
  href,
  icon: Icon,
  title,
}: {
  href: string;
  icon: React.ElementType;
  title: string;
}) {
  return (
    <Link href={href} className="text-center">
      <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F6F7FB] text-[#111827]">
        <Icon className="h-5 w-5" />
      </div>
      <p className="text-sm font-medium">{title}</p>
    </Link>
  );
}

function MiniGlowCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-[20px] bg-white/15 p-3 backdrop-blur">
      <p className="text-xs text-white/80">{title}</p>
      <p className="mt-1 truncate text-base font-bold">{value}</p>
    </div>
  );
}

function SnapshotCard({
  title,
  lines,
}: {
  title: string;
  lines: string[];
}) {
  return (
    <div className="rounded-[24px] bg-[#F6F7FB] p-4">
      <p className="text-sm font-semibold">{title}</p>
      <div className="mt-3 space-y-2 text-sm text-[#5B6475]">
        {lines.map((line) => (
          <p key={line} className="break-words">
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}