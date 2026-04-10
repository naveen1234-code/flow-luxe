"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { ElementType, ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  BadgeCheck,
  ClipboardList,
  CreditCard,
  MapPin,
  PackageCheck,
  Phone,
  ShieldCheck,
  Truck,
  UserRound,
} from "lucide-react";

import Container from "@/components/app-shell/container";
import TopHeader from "@/components/app-shell/top-header";
import { getOrders } from "@/lib/order-storage";
import { Order } from "@/types/order";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
};

function formatPrice(value: number) {
  return `LKR ${value.toLocaleString()}`;
}

function formatDate(value: string) {
  return new Date(value).toLocaleString();
}

function getStatusStyles(status: Order["status"]) {
  switch (status) {
    case "Delivered":
      return "bg-[#EAF8F2] text-[#14B87A]";
    case "Confirmed":
      return "bg-[#EAF0FF] text-[#4F7CFF]";
    default:
      return "bg-[#FFF4E8] text-[#F97316]";
  }
}

function getStatusMessage(status: Order["status"]) {
  switch (status) {
    case "Delivered":
      return "Your order has completed the delivery flow successfully.";
    case "Confirmed":
      return "Your order is confirmed and moving through the shipping stage.";
    default:
      return "Your order has been placed and is currently being prepared.";
  }
}

export default function OrderDetailsPage() {
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

  const totalUnits = useMemo(() => {
    if (!order) return 0;
    return order.items.reduce((sum, item) => sum + item.quantity, 0);
  }, [order]);

  if (!loaded) {
    return (
      <main className="app-page text-[#111827]">
        <div className="page-glow" />
        <Container className="pt-6">
          <TopHeader eyebrow="Order details" title="Loading order..." />
        </Container>
      </main>
    );
  }

  if (!order) {
    return (
      <main className="app-page text-[#111827]">
        <div className="page-glow" />

        <Container className="pt-6">
          <TopHeader eyebrow="Order details" title="Order not found" />

          <div className="hero-soft relative overflow-hidden rounded-[40px] p-8 text-center shadow-float">
            <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/55 blur-3xl" />
            <div className="absolute -left-6 bottom-0 h-24 w-24 rounded-full bg-[#DDE6FF] blur-3xl" />

            <div className="relative">
              <div className="mx-auto mb-4 flex h-18 w-18 items-center justify-center rounded-[24px] bg-white/80 text-[#111827] shadow-sm backdrop-blur">
                <ClipboardList className="h-9 w-9" />
              </div>

              <h2 className="text-[2rem] font-black leading-[0.96] tracking-[-0.05em] text-[#111827]">
                This order could not be found
              </h2>

              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#5B6475]">
                It may have been cleared from browser storage or the link may no
                longer be valid.
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
            href="/orders"
            className="inline-flex items-center gap-2 rounded-[20px] border border-[#E5E9F2] bg-white px-4 py-3 text-sm font-semibold shadow-sm"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>

          <Link
            href={`/orders/${encodeURIComponent(order.id)}/tracking`}
            className="inline-flex items-center gap-2 rounded-[20px] bg-[#111827] px-4 py-3 text-sm font-semibold text-white shadow-sm"
          >
            <Truck className="h-4 w-4" />
            Track order
          </Link>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.38, delay: 0.04 }}
        >
          <TopHeader eyebrow="Order details" title={order.id} />
        </motion.div>

        <motion.section
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.42, delay: 0.08 }}
          className="mb-6"
        >
          <div className="hero-soft relative overflow-hidden rounded-[40px] p-5 shadow-float">
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/45 blur-3xl" />
            <div className="absolute -left-8 bottom-0 h-24 w-24 rounded-full bg-[#DDE6FF] blur-3xl" />

            <div className="relative">
              <div className="mb-3 flex flex-wrap gap-2">
                <HeroChip icon={BadgeCheck} text="Premium order view" />
                <HeroChip icon={PackageCheck} text={`${order.items.length} item${order.items.length === 1 ? "" : "s"}`} />
              </div>

              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="section-eyebrow">Current status</p>
                  <h2 className="mt-1 text-[2rem] font-black leading-[0.96] tracking-[-0.05em] text-[#111827]">
                    {order.status}
                  </h2>
                  <p className="mt-3 max-w-xl text-sm leading-6 text-[#5B6475]">
                    {getStatusMessage(order.status)}
                  </p>
                </div>

                <span
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold ${getStatusStyles(
                    order.status
                  )}`}
                >
                  {order.status}
                </span>
              </div>

              <div className="mt-5 grid grid-cols-3 gap-3">
                <MiniMetric label="Units" value={`${totalUnits}`} />
                <MiniMetric label="Placed" value={new Date(order.createdAt).toLocaleDateString()} />
                <MiniMetric label="Total" value={formatPrice(order.total)} />
              </div>
            </div>
          </div>
        </motion.section>

        <div className="grid gap-6 lg:grid-cols-[1.04fr_0.96fr]">
          <div className="space-y-4">
            <motion.section
              variants={fadeUp}
              initial="hidden"
              animate="show"
              transition={{ duration: 0.4, delay: 0.12 }}
            >
              <div className="surface-card rounded-[36px] p-5">
                <div className="mb-4 flex items-center gap-2">
                  <PackageCheck className="h-4 w-4 text-[#4F7CFF]" />
                  <h3 className="text-xl font-bold tracking-[-0.03em]">
                    Items in this order
                  </h3>
                </div>

                <div className="space-y-3">
                  {order.items.map((item) => (
                    <div
                      key={`${order.id}-${item.id}`}
                      className="rounded-[26px] bg-[#F6F7FB] p-3"
                    >
                      <div className="flex items-start gap-3">
                        <div className="shrink-0 overflow-hidden rounded-[20px] bg-white">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-18 w-18 object-cover"
                          />
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="line-clamp-2 text-sm font-semibold leading-6">
                            {item.name}
                          </p>
                          <p className="mt-1 text-xs text-[#5B6475]">
                            {item.category} • Qty: {item.quantity}
                          </p>

                          <div className="mt-3 flex flex-wrap gap-2">
                            <span className="rounded-full bg-white px-3 py-1.5 text-[11px] font-semibold text-[#111827] shadow-sm">
                              Unit {formatPrice(item.price)}
                            </span>
                            <span className="rounded-full bg-[#EAF8F2] px-3 py-1.5 text-[11px] font-semibold text-[#14B87A]">
                              Line total {formatPrice(item.price * item.quantity)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.section>

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
                    Customer & delivery
                  </h3>
                </div>

                <div className="grid gap-3">
                  <DetailRow icon={UserRound} label="Customer" value={order.customer.fullName} />
                  <DetailRow icon={Phone} label="Phone" value={order.customer.phone} />
                  <DetailRow icon={CreditCard} label="Email" value={order.customer.email} />
                  <DetailRow
                    icon={MapPin}
                    label="Address"
                    value={`${order.customer.city}, ${order.customer.address}`}
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
              transition={{ duration: 0.42, delay: 0.2 }}
            >
              <div className="promo-gradient relative overflow-hidden rounded-[40px] p-5 shadow-float lg:sticky lg:top-6">
                <div className="absolute -right-8 top-0 h-28 w-28 rounded-full bg-white/10 blur-3xl" />
                <div className="absolute left-0 bottom-0 h-24 w-24 rounded-full bg-white/10 blur-3xl" />

                <div className="relative">
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur">
                    <CreditCard className="h-3.5 w-3.5" />
                    Payment summary
                  </div>

                  <h3 className="text-[1.8rem] font-black leading-[0.96] tracking-[-0.05em] text-white">
                    Your order summary stays sharp here
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-white/84">
                    One clean premium card for payment, totals, and the next step into tracking.
                  </p>

                  <div className="mt-5 rounded-[28px] bg-white/12 p-4 backdrop-blur">
                    <div className="space-y-3 text-sm">
                      <SummaryRow
                        label="Payment method"
                        value={order.paymentMethod.toUpperCase()}
                      />
                      <SummaryRow
                        label="Subtotal"
                        value={formatPrice(order.subtotal)}
                      />
                      <SummaryRow
                        label="Delivery"
                        value={formatPrice(order.deliveryFee)}
                      />
                      <div className="h-px bg-white/15" />
                      <SummaryRow
                        strong
                        label="Total"
                        value={formatPrice(order.total)}
                      />
                    </div>
                  </div>

                  <div className="mt-5 space-y-3">
                    <InfoBlock
                      icon={Truck}
                      title="Tracking page available"
                      text="The order progress flow now lives on its own dedicated tracking page."
                    />
                    <InfoBlock
                      icon={ShieldCheck}
                      title="Cleaner order details"
                      text="This page stays focused on summary, items, and customer details only."
                    />
                  </div>

                  <div className="mt-5 flex flex-col gap-3">
                    <Link
                      href={`/orders/${encodeURIComponent(order.id)}/tracking`}
                      className="flex items-center justify-center rounded-[20px] bg-white px-4 py-3.5 text-sm font-semibold text-[#111827] shadow-sm transition active:scale-[0.98]"
                    >
                      Open tracking page
                    </Link>

                    <Link
                      href="/orders"
                      className="flex items-center justify-center rounded-[20px] border border-white/18 bg-white/10 px-4 py-3.5 text-sm font-semibold text-white"
                    >
                      Back to orders
                    </Link>
                  </div>
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

function DetailRow({
  icon: Icon,
  label,
  value,
}: {
  icon: ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-[24px] bg-[#F6F7FB] p-4">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[16px] bg-white text-[#4F7CFF] shadow-sm">
          <Icon className="h-4 w-4" />
        </div>

        <div className="min-w-0">
          <p className="text-xs font-medium text-[#5B6475]">{label}</p>
          <p className="mt-1 break-words text-sm font-semibold leading-6 text-[#111827]">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}

function SummaryRow({
  label,
  value,
  strong = false,
}: {
  label: string;
  value: string;
  strong?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className={strong ? "font-bold text-white" : "text-white/78"}>
        {label}
      </span>
      <span className={strong ? "font-bold text-white" : "font-semibold text-white"}>
        {value}
      </span>
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
    <div className="rounded-[22px] bg-white/10 p-4 backdrop-blur">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-[16px] bg-white/18 text-white">
          <Icon className="h-4 w-4" />
        </div>

        <div>
          <p className="text-sm font-semibold text-white">{title}</p>
          <p className="mt-1 text-xs leading-5 text-white/78">{text}</p>
        </div>
      </div>
    </div>
  );
}