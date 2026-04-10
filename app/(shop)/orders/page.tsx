"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { ElementType } from "react";
import { useEffect, useMemo, useState } from "react";
import {
  CalendarDays,
  ChevronRight,
  ClipboardList,
  PackageCheck,
  Search,
  SlidersHorizontal,
  Sparkles,
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

type StatusFilter = "All" | Order["status"];

function formatPrice(value: number) {
  return `LKR ${value.toLocaleString()}`;
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString();
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

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [search, setSearch] = useState("");
  const [activeStatus, setActiveStatus] = useState<StatusFilter>("All");

  const syncOrders = () => {
    setOrders(getOrders());
  };

  useEffect(() => {
    syncOrders();
    window.addEventListener("orders-updated", syncOrders);

    return () => window.removeEventListener("orders-updated", syncOrders);
  }, []);

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

  const filteredOrders = useMemo(() => {
    const query = search.trim().toLowerCase();

    return orders.filter((order) => {
      const matchesStatus =
        activeStatus === "All" ? true : order.status === activeStatus;

      const firstItemName = order.items[0]?.name?.toLowerCase() ?? "";
      const orderId = order.id.toLowerCase();
      const customerName = order.customer.fullName.toLowerCase();

      const matchesSearch =
        !query ||
        firstItemName.includes(query) ||
        orderId.includes(query) ||
        customerName.includes(query);

      return matchesStatus && matchesSearch;
    });
  }, [orders, search, activeStatus]);

  const clearFilters = () => {
    setSearch("");
    setActiveStatus("All");
  };

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
          <TopHeader eyebrow="Your orders" title="Track every purchase" />
        </motion.div>

        {orders.length === 0 ? (
          <div className="space-y-5">
            <motion.section
              variants={fadeUp}
              initial="hidden"
              animate="show"
              transition={{ duration: 0.42, delay: 0.05 }}
            >
              <div className="hero-soft relative overflow-hidden rounded-[40px] p-8 text-center shadow-float">
                <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/55 blur-3xl" />
                <div className="absolute -left-6 bottom-0 h-24 w-24 rounded-full bg-[#DDE6FF] blur-3xl" />

                <div className="relative">
                  <div className="mx-auto mb-4 flex h-18 w-18 items-center justify-center rounded-[24px] bg-white/80 text-[#111827] shadow-sm backdrop-blur">
                    <ClipboardList className="h-9 w-9" />
                  </div>

                  <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1.5 text-xs font-semibold text-[#4F7CFF] shadow-sm backdrop-blur">
                    <Sparkles className="h-3.5 w-3.5" />
                    Orders will appear here
                  </div>

                  <h2 className="text-[2rem] font-black leading-[0.96] tracking-[-0.05em] text-[#111827]">
                    No purchases yet
                  </h2>

                  <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#5B6475]">
                    Once you place orders, this page becomes your premium order
                    hub with status flow, details pages, and tracking.
                  </p>

                  <Link
                    href="/explore"
                    className="mt-6 inline-flex items-center gap-2 rounded-[20px] bg-[#111827] px-5 py-3 text-sm font-semibold text-white shadow-sm transition active:scale-[0.98]"
                  >
                    Start shopping
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </motion.section>

            <motion.section
              variants={fadeUp}
              initial="hidden"
              animate="show"
              transition={{ duration: 0.42, delay: 0.1 }}
              className="grid gap-4"
            >
              <InfoCard
                icon={PackageCheck}
                title="Order list flow"
                text="Your main orders page stays clean, compact, and easy to scan."
              />
              <InfoCard
                icon={Truck}
                title="Separate details page"
                text="Each order opens into its own dedicated order view and tracking flow."
              />
              <InfoCard
                icon={CalendarDays}
                title="Saved history"
                text="Placed purchases remain visible here as part of your front-end shopping journey."
              />
            </motion.section>
          </div>
        ) : (
          <div className="space-y-5">
            <motion.section
              variants={fadeUp}
              initial="hidden"
              animate="show"
              transition={{ duration: 0.4, delay: 0.05 }}
            >
              <div className="hero-soft relative overflow-hidden rounded-[40px] p-5 shadow-float">
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/45 blur-3xl" />
                <div className="absolute -left-8 bottom-0 h-24 w-24 rounded-full bg-[#DDE6FF] blur-3xl" />

                <div className="relative">
                  <div className="mb-3 flex flex-wrap gap-2">
                    <HeroChip icon={Sparkles} text="Premium order hub" />
                    <HeroChip
                      icon={PackageCheck}
                      text={`${orders.length} order${orders.length === 1 ? "" : "s"} saved`}
                    />
                  </div>

                  <h2 className="text-[2rem] font-black leading-[0.96] tracking-[-0.05em] text-[#111827]">
                    Your purchase history now feels like part of the brand
                  </h2>

                  <p className="mt-3 max-w-xl text-sm leading-6 text-[#5B6475]">
                    Search faster, filter by status, open details cleanly, and
                    move from checkout into order tracking without the design quality dropping.
                  </p>

                  <div className="mt-5 grid grid-cols-3 gap-3">
                    <MiniMetric label="Processing" value={`${processingCount}`} />
                    <MiniMetric label="Confirmed" value={`${confirmedCount}`} />
                    <MiniMetric label="Delivered" value={`${deliveredCount}`} />
                  </div>
                </div>
              </div>
            </motion.section>

            <motion.section
              variants={fadeUp}
              initial="hidden"
              animate="show"
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <div className="surface-card rounded-[34px] p-4">
                <div className="mb-4 flex flex-col gap-3">
                  <div className="flex items-center gap-3 rounded-[22px] bg-[#F6F7FB] px-4 py-3.5">
                    <Search className="h-5 w-5 text-[#8A93A5]" />
                    <input
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search by product, customer, or order ID"
                      className="w-full bg-transparent text-sm font-medium text-[#111827] outline-none placeholder:text-[#8A93A5]"
                    />
                  </div>

                  <div className="no-scrollbar flex gap-3 overflow-x-auto pb-1">
                    <StatusTab
                      active={activeStatus === "All"}
                      label="All"
                      value={orders.length}
                      onClick={() => setActiveStatus("All")}
                    />
                    <StatusTab
                      active={activeStatus === "Processing"}
                      label="Processing"
                      value={processingCount}
                      onClick={() => setActiveStatus("Processing")}
                    />
                    <StatusTab
                      active={activeStatus === "Confirmed"}
                      label="Confirmed"
                      value={confirmedCount}
                      onClick={() => setActiveStatus("Confirmed")}
                    />
                    <StatusTab
                      active={activeStatus === "Delivered"}
                      label="Delivered"
                      value={deliveredCount}
                      onClick={() => setActiveStatus("Delivered")}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="section-eyebrow">Results</p>
                    <h3 className="mt-1 text-xl font-bold tracking-[-0.03em]">
                      {filteredOrders.length} matching order
                      {filteredOrders.length === 1 ? "" : "s"}
                    </h3>
                  </div>

                  {(search.trim() || activeStatus !== "All") && (
                    <button
                      onClick={clearFilters}
                      className="inline-flex items-center gap-2 rounded-[18px] border border-[#E5E9F2] bg-white px-4 py-2.5 text-sm font-semibold text-[#111827] shadow-sm"
                    >
                      <SlidersHorizontal className="h-4 w-4" />
                      Reset
                    </button>
                  )}
                </div>
              </div>
            </motion.section>

            {filteredOrders.length === 0 ? (
              <motion.section
                variants={fadeUp}
                initial="hidden"
                animate="show"
                transition={{ duration: 0.4, delay: 0.15 }}
              >
                <div className="surface-card rounded-[34px] p-8 text-center">
                  <h3 className="text-2xl font-bold tracking-[-0.03em]">
                    No matching orders
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-[#5B6475]">
                    Try another search or switch back to a broader status filter.
                  </p>

                  <button
                    onClick={clearFilters}
                    className="mt-6 rounded-[20px] bg-[#111827] px-5 py-3 text-sm font-semibold text-white shadow-sm"
                  >
                    Clear filters
                  </button>
                </div>
              </motion.section>
            ) : (
              <motion.section
                variants={fadeUp}
                initial="hidden"
                animate="show"
                transition={{ duration: 0.4, delay: 0.15 }}
                className="space-y-4"
              >
                {filteredOrders.map((order) => {
                  const firstItem = order.items[0];
                  const extraItems = order.items.length - 1;

                  return (
                    <div
                      key={order.id}
                      className="surface-card rounded-[36px] p-4"
                    >
                      <div className="mb-4 flex items-start justify-between gap-4">
                        <div>
                          <p className="text-sm font-medium text-[#4F7CFF]">
                            Order reference
                          </p>
                          <h2 className="mt-1 text-lg font-bold tracking-[-0.03em]">
                            {order.id}
                          </h2>
                          <p className="mt-1 text-xs text-[#5B6475]">
                            {formatDate(order.createdAt)}
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

<div className="flex items-start gap-4">
  <div className="shrink-0 overflow-hidden rounded-[24px] bg-[#F6F7FB]">
    <img
      src={firstItem.image}
      alt={firstItem.name}
      className="h-22 w-22 object-cover"
    />
  </div>

  <div className="min-w-0 flex-1">
                          <p className="line-clamp-2 text-sm font-semibold leading-6">
                            {firstItem.name}
                          </p>

                          <p className="mt-1 text-xs text-[#5B6475]">
                            Qty: {firstItem.quantity}
                            {extraItems > 0
                              ? ` • +${extraItems} more item${extraItems > 1 ? "s" : ""}`
                              : ""}
                          </p>

                          <div className="mt-3 flex flex-wrap gap-2">
                            <MetaPill
                              icon={PackageCheck}
                              text={`${order.items.length} item${
                                order.items.length === 1 ? "" : "s"
                              }`}
                            />
                            <MetaPill
                              icon={Truck}
                              text={order.paymentMethod.toUpperCase()}
                            />
                          </div>

                          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                            <div>
                              <p className="text-xs text-[#5B6475]">Customer</p>
                              <p className="mt-1 text-sm font-semibold">
                                {order.customer.fullName}
                              </p>
                            </div>

                            <div className="text-right">
                              <p className="text-xs text-[#5B6475]">Total</p>
                              <p className="mt-1 text-lg font-bold">
                                {formatPrice(order.total)}
                              </p>
                            </div>
                          </div>

                          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                            <Link
                              href={`/orders/${encodeURIComponent(order.id)}`}
                              className="inline-flex w-full items-center justify-center gap-2 rounded-[18px] bg-[#111827] px-4 py-3 text-sm font-semibold text-white shadow-sm sm:w-auto"
                            >
                              View details
                              <ChevronRight className="h-4 w-4" />
                            </Link>

                            <Link
                              href={`/orders/${encodeURIComponent(order.id)}/tracking`}
                              className="inline-flex w-full items-center justify-center rounded-[18px] border border-[#E5E9F2] bg-white px-4 py-3 text-sm font-semibold text-[#111827] shadow-sm sm:w-auto"
                            >
                              Tracking
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </motion.section>
            )}
          </div>
        )}
      </Container>
    </main>
  );
}

function HeroChip({
  icon: Icon,
  text,
}: {
  icon: React.ElementType;
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
      <p className="mt-1 text-lg font-bold tracking-[-0.03em] text-[#111827]">
        {value}
      </p>
    </div>
  );
}

function StatusTab({
  active,
  label,
  value,
  onClick,
}: {
  active: boolean;
  label: string;
  value: number;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`shrink-0 rounded-full px-4 py-2.5 text-sm font-semibold transition ${
        active
          ? "bg-[#111827] text-white shadow-sm"
          : "border border-[#E5E9F2] bg-white text-[#111827]"
      }`}
    >
      {label} ({value})
    </button>
  );
}

function MetaPill({
  icon: Icon,
  text,
}: {
  icon: ElementType;
  text: string;
}) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-[#F6F7FB] px-3 py-1.5 text-xs font-medium text-[#5B6475]">
      <Icon className="h-3.5 w-3.5" />
      {text}
    </span>
  );
}

function InfoCard({
  icon: Icon,
  title,
  text,
}: {
  icon: ElementType;
  title: string;
  text: string;
}) {
  return (
    <div className="surface-card rounded-[28px] p-5">
      <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-[18px] bg-[#EAF0FF] text-[#4F7CFF]">
        <Icon className="h-5 w-5" />
      </div>
      <p className="text-sm font-semibold">{title}</p>
      <p className="mt-1 text-xs leading-6 text-[#5B6475]">{text}</p>
    </div>
  );
}