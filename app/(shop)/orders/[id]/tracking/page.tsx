"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { ElementType, ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  MapPin,
  PackageCheck,
  ShieldCheck,
  Truck,
} from "lucide-react";

import Container from "@/components/app-shell/container";
import TopHeader from "@/components/app-shell/top-header";
import { getOrders } from "@/lib/order-storage";
import { Order } from "@/types/order";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
};

function formatDate(value: string) {
  return new Date(value).toLocaleString();
}

function getStatusStep(status: Order["status"]) {
  if (status === "Delivered") return 3;
  if (status === "Confirmed") return 2;
  return 1;
}

function getTrackingMessage(status: Order["status"]) {
  switch (status) {
    case "Delivered":
      return "Your order has been delivered successfully and the full purchase flow is complete.";
    case "Confirmed":
      return "Your order has been confirmed and is moving toward delivery.";
    default:
      return "Your order has been placed and is currently being prepared.";
  }
}

function getStatusPill(status: Order["status"]) {
  switch (status) {
    case "Delivered":
      return "bg-[#EAF8F2] text-[#14B87A]";
    case "Confirmed":
      return "bg-[#EAF0FF] text-[#4F7CFF]";
    default:
      return "bg-[#FFF4E8] text-[#F97316]";
  }
}

export default function OrderTrackingPage() {
  const params = useParams();
  const orderId = decodeURIComponent(String(params.id));

  const [order, setOrder] = useState<Order | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const orders = getOrders();
    const found = orders.find((item) => item.id === orderId) ?? null;
    setOrder(found);
    setLoaded(true);
  }, [orderId]);

  const step = useMemo(() => {
    if (!order) return 1;
    return getStatusStep(order.status);
  }, [order]);

  const totalUnits = useMemo(() => {
    if (!order) return 0;
    return order.items.reduce((sum, item) => sum + item.quantity, 0);
  }, [order]);

  if (!loaded) {
    return (
      <main className="app-page text-[#111827]">
        <div className="page-glow" />
        <Container className="pt-6">
          <TopHeader eyebrow="Tracking" title="Loading tracking..." />
        </Container>
      </main>
    );
  }

  if (!order) {
    return (
      <main className="app-page text-[#111827]">
        <div className="page-glow" />

        <Container className="pt-6">
          <TopHeader eyebrow="Tracking" title="Order not found" />

          <div className="hero-soft relative overflow-hidden rounded-[40px] p-8 text-center shadow-float">
            <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/55 blur-3xl" />
            <div className="absolute -left-6 bottom-0 h-24 w-24 rounded-full bg-[#DDE6FF] blur-3xl" />

            <div className="relative">
              <div className="mx-auto mb-4 flex h-18 w-18 items-center justify-center rounded-[24px] bg-white/80 text-[#111827] shadow-sm backdrop-blur">
                <ClipboardList className="h-9 w-9" />
              </div>

              <h2 className="text-[2rem] font-black leading-[0.96] tracking-[-0.05em] text-[#111827]">
                Tracking could not be loaded
              </h2>

              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#5B6475]">
                This order may no longer exist in browser storage.
              </p>

              <Link
                href="/orders"
                className="mt-6 inline-flex items-center gap-2 rounded-[20px] bg-[#111827] px-5 py-3 text-sm font-semibold text-white shadow-sm transition active:scale-[0.98]"
              >
                Back to orders
              </Link>
            </div>
          </div>
        </Container>
      </main>
    );
  }

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
            href={`/orders/${encodeURIComponent(order.id)}`}
            className="inline-flex items-center gap-2 rounded-[20px] border border-[#E5E9F2] bg-white px-4 py-3 text-sm font-semibold shadow-sm"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.38, delay: 0.04 }}
        >
          <TopHeader eyebrow="Tracking" title="Order tracking" />
        </motion.div>

        <motion.section
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.42, delay: 0.08 }}
          className="mb-6"
        >
          <div className="promo-gradient relative overflow-hidden rounded-[42px] p-6 shadow-float">
            <div className="absolute -right-10 top-0 h-32 w-32 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute left-0 bottom-0 h-24 w-24 rounded-full bg-white/10 blur-3xl" />

            <div className="relative">
              <div className="mb-3 flex flex-wrap gap-2">
                <HeroChip icon={Truck} text="Live-style tracking" />
                <HeroChip icon={PackageCheck} text={order.id} />
              </div>

              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-white/82">Current status</p>
                  <h2 className="mt-2 text-[2.1rem] font-black leading-[0.94] tracking-[-0.06em] text-white">
                    {order.status}
                  </h2>
                  <p className="mt-3 max-w-xl text-sm leading-6 text-white/84">
                    {getTrackingMessage(order.status)}
                  </p>
                </div>

                <div className="flex h-20 w-20 items-center justify-center rounded-[24px] bg-white/14 text-white backdrop-blur">
                  <Truck className="h-10 w-10" />
                </div>
              </div>

              <div className="mt-5 grid grid-cols-3 gap-3">
                <GlassMetric label="Stage" value={`${step}/3`} />
                <GlassMetric label="Units" value={`${totalUnits}`} />
                <GlassMetric label="Placed" value={new Date(order.createdAt).toLocaleDateString()} />
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.4, delay: 0.12 }}
          className="mb-6"
        >
          <div className="surface-card rounded-[36px] p-4">
            <div className="mb-4 flex flex-wrap gap-2">
              <MetaPill icon={CalendarDays} text={formatDate(order.createdAt)} />
              <MetaPill icon={PackageCheck} text={`${order.items.length} item${order.items.length === 1 ? "" : "s"}`} />
              <span
                className={`rounded-full px-3 py-1.5 text-xs font-semibold ${getStatusPill(
                  order.status
                )}`}
              >
                {order.status}
              </span>
            </div>

            <div className="grid gap-4">
              <TrackingCard
                active={step >= 1}
                title="Processing"
                text="Your order was placed successfully and entered the order system."
                stepLabel="Step 1"
              />
              <TrackingCard
                active={step >= 2}
                title="Confirmed"
                text="Your order has been confirmed and prepared for shipment."
                stepLabel="Step 2"
              />
              <TrackingCard
                active={step >= 3}
                title="Delivered"
                text="Your order was completed and delivered successfully."
                stepLabel="Step 3"
                last
              />
            </div>
          </div>
        </motion.section>

        <div className="grid gap-6 lg:grid-cols-[1.04fr_0.96fr]">
          <div className="space-y-4">
            <motion.section
              variants={fadeUp}
              initial="hidden"
              animate="show"
              transition={{ duration: 0.4, delay: 0.16 }}
            >
              <div className="surface-card rounded-[36px] p-5">
                <div className="mb-4 flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-[#4F7CFF]" />
                  <h3 className="text-xl font-bold tracking-[-0.03em]">
                    Delivery destination
                  </h3>
                </div>

                <div className="rounded-[28px] bg-[#F6F7FB] p-4">
                  <p className="text-base font-bold tracking-[-0.02em] text-[#111827]">
                    {order.customer.fullName}
                  </p>
                  <div className="mt-3 space-y-2 text-sm leading-6 text-[#5B6475]">
                    <p>{order.customer.phone}</p>
                    <p>{order.customer.city}</p>
                    <p>{order.customer.address}</p>
                  </div>
                </div>
              </div>
            </motion.section>

            <motion.section
              variants={fadeUp}
              initial="hidden"
              animate="show"
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <div className="surface-card rounded-[36px] p-5">
                <div className="mb-4 flex items-center gap-2">
                  <PackageCheck className="h-4 w-4 text-[#4F7CFF]" />
                  <h3 className="text-xl font-bold tracking-[-0.03em]">
                    Order snapshot
                  </h3>
                </div>

                <div className="space-y-3">
                  {order.items.map((item) => (
                    <div
                      key={`${order.id}-${item.id}`}
                      className="rounded-[24px] bg-[#F6F7FB] p-3"
                    >
                      <div className="flex items-start gap-3">
                        <div className="shrink-0 overflow-hidden rounded-[18px] bg-white">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-16 w-16 object-cover"
                          />
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="line-clamp-2 text-sm font-semibold leading-6 text-[#111827]">
                            {item.name}
                          </p>
                          <p className="mt-1 text-xs text-[#5B6475]">
                            {item.category} • Qty: {item.quantity}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.section>
          </div>

          <div className="space-y-4">
            <motion.section
              variants={fadeUp}
              initial="hidden"
              animate="show"
              transition={{ duration: 0.42, delay: 0.24 }}
            >
              <div className="surface-card rounded-[36px] p-5 lg:sticky lg:top-6">
                <div className="mb-4 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#4F7CFF]" />
                  <h3 className="text-xl font-bold tracking-[-0.03em]">
                    Tracking note
                  </h3>
                </div>

                <div className="rounded-[28px] bg-[#F6F7FB] p-4 text-sm leading-7 text-[#5B6475]">
                  This page is designed to focus only on delivery progress,
                  status movement, and tracking context so the order flow feels
                  cleaner and more realistic on mobile.
                </div>

                <div className="mt-5 space-y-3">
                  <InfoBlock
                    icon={Truck}
                    title="Dedicated tracking flow"
                    text="Tracking stays separate from order details so status changes are easier to follow."
                  />
                  <InfoBlock
                    icon={ShieldCheck}
                    title="Clear mobile structure"
                    text="Status, destination, and order snapshot now live in cleaner premium cards."
                  />
                </div>

                <div className="mt-5 flex flex-col gap-3">
                  <Link
                    href={`/orders/${encodeURIComponent(order.id)}`}
                    className="flex items-center justify-center rounded-[20px] bg-[#111827] px-4 py-3.5 text-sm font-semibold text-white shadow-sm transition active:scale-[0.98]"
                  >
                    Back to order details
                  </Link>

                  <Link
                    href="/orders"
                    className="flex items-center justify-center rounded-[20px] border border-[#E5E9F2] bg-white px-4 py-3.5 text-sm font-semibold text-[#111827] shadow-sm"
                  >
                    Back to all orders
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
    <span className="inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur">
      <Icon className="h-3.5 w-3.5" />
      {text}
    </span>
  );
}

function GlassMetric({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-[22px] bg-white/12 p-4 text-center backdrop-blur">
      <p className="text-xs font-medium text-white/72">{label}</p>
      <p className="mt-1 text-sm font-bold tracking-[-0.03em] text-white">
        {value}
      </p>
    </div>
  );
}

function MetaPill({
  icon: Icon,
  text,
}: {
  icon: React.ElementType;
  text: string;
}) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-[#F6F7FB] px-3 py-1.5 text-xs font-medium text-[#5B6475]">
      <Icon className="h-3.5 w-3.5" />
      {text}
    </span>
  );
}

function TrackingCard({
  active,
  title,
  text,
  stepLabel,
  last = false,
}: {
  active: boolean;
  title: string;
  text: string;
  stepLabel: string;
  last?: boolean;
}) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div
          className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold ${
            active
              ? "bg-[#4F7CFF] text-white"
              : "bg-[#D6DBE6] text-[#6F7787]"
          }`}
        >
          {active ? "✓" : ""}
        </div>

        {!last && (
          <div
            className={`mt-2 w-[2px] flex-1 ${
              active ? "bg-[#4F7CFF]" : "bg-[#E5E9F2]"
            }`}
          />
        )}
      </div>

      <div
        className={`flex-1 rounded-[26px] p-4 ${
          active ? "bg-[#EEF3FF]" : "bg-[#F6F7FB]"
        }`}
      >
        <div className="mb-2 flex items-center justify-between gap-3">
          <p className="text-sm font-semibold text-[#111827]">{title}</p>
          <span className="rounded-full bg-white px-3 py-1 text-[11px] font-semibold text-[#5B6475] shadow-sm">
            {stepLabel}
          </span>
        </div>
        <p className="text-sm leading-6 text-[#5B6475]">{text}</p>
      </div>
    </div>
  );
}

function InfoBlock({
  icon: Icon,
  title,
  text,
}: {
  icon: ElementType;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-[22px] bg-[#F6F7FB] p-4">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-[16px] bg-white text-[#4F7CFF] shadow-sm">
          <Icon className="h-4 w-4" />
        </div>

        <div>
          <p className="text-sm font-semibold text-[#111827]">{title}</p>
          <p className="mt-1 text-xs leading-5 text-[#5B6475]">{text}</p>
        </div>
      </div>
    </div>
  );
}