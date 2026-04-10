"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { ElementType, ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import {
  BadgeCheck,
  CheckCircle2,
  CreditCard,
  Landmark,
  MapPin,
  ShieldCheck,
  Sparkles,
  Truck,
  UserRound,
} from "lucide-react";

import Container from "@/components/app-shell/container";
import TopHeader from "@/components/app-shell/top-header";
import { getAccountProfile } from "@/lib/account-storage";
import { clearCart, getCart } from "@/lib/cart-storage";
import { addOrder } from "@/lib/order-storage";
import { CartItem } from "@/types/cart";
import { Order, PaymentMethod } from "@/types/order";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
};

function formatPrice(value: number) {
  return `LKR ${value.toLocaleString()}`;
}

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [successOrder, setSuccessOrder] = useState<Order | null>(null);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cod");

  useEffect(() => {
    setCartItems(getCart());

    const profile = getAccountProfile();
    setFullName(profile.fullName);
    setPhone(profile.phone);
    setEmail(profile.email);
    setCity(profile.city);
    setAddress(profile.address);
  }, []);

  const subtotal = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cartItems]);

  const totalItems = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }, [cartItems]);

  const deliveryFee = cartItems.length > 0 ? 500 : 0;
  const total = subtotal + deliveryFee;

  const loadSavedDetails = () => {
    const profile = getAccountProfile();
    setFullName(profile.fullName);
    setPhone(profile.phone);
    setEmail(profile.email);
    setCity(profile.city);
    setAddress(profile.address);
  };

  const clearForm = () => {
    setFullName("");
    setPhone("");
    setEmail("");
    setCity("");
    setAddress("");
  };

  const handlePlaceOrder = () => {
    if (
      !fullName.trim() ||
      !phone.trim() ||
      !email.trim() ||
      !city.trim() ||
      !address.trim()
    ) {
      alert("Please fill all delivery details.");
      return;
    }

    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    const newOrder: Order = {
      id: `FL-${Date.now()}`,
      createdAt: new Date().toISOString(),
      items: cartItems,
      subtotal,
      deliveryFee,
      total,
      paymentMethod,
      status: "Processing",
      customer: {
        fullName,
        phone,
        email,
        city,
        address,
      },
    };

    addOrder(newOrder);
    clearCart();
    setCartItems([]);
    setSuccessOrder(newOrder);
  };

  if (successOrder) {
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
            <TopHeader eyebrow="Checkout complete" title="Order placed successfully" />
          </motion.div>

          <motion.section
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.42, delay: 0.05 }}
            className="mb-6"
          >
            <div className="promo-gradient relative overflow-hidden rounded-[42px] p-6 shadow-float">
              <div className="absolute -right-10 top-0 h-32 w-32 rounded-full bg-white/10 blur-3xl" />
              <div className="absolute left-0 bottom-0 h-24 w-24 rounded-full bg-white/10 blur-3xl" />

              <div className="relative text-center">
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-[26px] bg-white/18 text-white backdrop-blur">
                  <CheckCircle2 className="h-10 w-10" />
                </div>

                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur">
                  <BadgeCheck className="h-3.5 w-3.5" />
                  Order confirmed
                </div>

                <h2 className="text-[2rem] font-black leading-[0.96] tracking-[-0.05em] text-white">
                  Your checkout flow is complete
                </h2>

                <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-white/84">
                  Your order has been saved successfully and is now part of your
                  premium front-end purchase journey.
                </p>
              </div>
            </div>
          </motion.section>

          <motion.section
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.42, delay: 0.1 }}
            className="mb-6"
          >
            <div className="surface-card rounded-[36px] p-4">
              <div className="grid gap-4">
                <SuccessInfoCard
                  title="Order details"
                  rows={[
                    { label: "Order ID", value: successOrder.id },
                    { label: "Items", value: `${successOrder.items.length}` },
                    {
                      label: "Payment",
                      value: successOrder.paymentMethod.toUpperCase(),
                    },
                    { label: "Total", value: formatPrice(successOrder.total) },
                  ]}
                />

                <SuccessInfoCard
                  title="Delivery details"
                  rows={[
                    { label: "Name", value: successOrder.customer.fullName },
                    { label: "Phone", value: successOrder.customer.phone },
                    { label: "Email", value: successOrder.customer.email },
                    { label: "City", value: successOrder.customer.city },
                    { label: "Address", value: successOrder.customer.address },
                  ]}
                />
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/orders"
                  className="inline-flex items-center justify-center rounded-[20px] bg-[#111827] px-5 py-3 text-sm font-semibold text-white shadow-sm transition active:scale-[0.98]"
                >
                  View orders
                </Link>

                <Link
                  href="/explore"
                  className="inline-flex items-center justify-center rounded-[20px] border border-[#E5E9F2] bg-white px-5 py-3 text-sm font-semibold text-[#111827] shadow-sm"
                >
                  Continue shopping
                </Link>
              </div>
            </div>
          </motion.section>
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
          transition={{ duration: 0.38 }}
        >
          <TopHeader eyebrow="Checkout" title="Finish with a premium checkout" />
        </motion.div>

        {cartItems.length === 0 ? (
          <motion.section
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.42, delay: 0.05 }}
            className="mb-6"
          >
            <div className="hero-soft relative overflow-hidden rounded-[40px] p-8 text-center shadow-float">
              <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/55 blur-3xl" />
              <div className="absolute -left-6 bottom-0 h-24 w-24 rounded-full bg-[#DDE6FF] blur-3xl" />

              <div className="relative">
                <div className="mx-auto mb-4 flex h-18 w-18 items-center justify-center rounded-[24px] bg-white/80 text-3xl shadow-sm backdrop-blur">
                  📦
                </div>

                <h2 className="text-[2rem] font-black leading-[0.96] tracking-[-0.05em] text-[#111827]">
                  No items ready for checkout
                </h2>
                <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-[#5B6475]">
                  Add products to your cart before entering the checkout flow.
                </p>

                <Link
                  href="/explore"
                  className="mt-6 inline-flex items-center justify-center rounded-[20px] bg-[#111827] px-5 py-3 text-sm font-semibold text-white shadow-sm transition active:scale-[0.98]"
                >
                  Browse products
                </Link>
              </div>
            </div>
          </motion.section>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1.04fr_0.96fr]">
            <div className="space-y-4">
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
                      <HeroChip icon={Sparkles} text="Luxury checkout flow" />
                      <HeroChip icon={Truck} text={`${totalItems} items ready`} />
                    </div>

                    <h2 className="text-[2rem] font-black leading-[0.96] tracking-[-0.05em] text-[#111827]">
                      Confirm your details and let the flow feel expensive
                    </h2>

                    <p className="mt-3 max-w-xl text-sm leading-6 text-[#5B6475]">
                      Your account details can auto-fill this step, so the experience
                      stays faster, cleaner, and more premium on mobile.
                    </p>

                    <div className="mt-5 grid grid-cols-3 gap-3">
                      <MiniMetric label="Items" value={`${totalItems}`} />
                      <MiniMetric label="Delivery" value={formatPrice(deliveryFee)} />
                      <MiniMetric label="Total" value={formatPrice(total)} />
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
                <div className="surface-card rounded-[36px] p-5">
                  <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="section-eyebrow">Delivery details</p>
                      <h2 className="mt-1 section-title">Shipping information</h2>
                      <p className="mt-2 text-sm leading-6 text-[#5B6475]">
                        Saved account details are loaded automatically when available.
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={loadSavedDetails}
                        className="rounded-[18px] border border-[#E5E9F2] bg-[#F6F7FB] px-4 py-2.5 text-sm font-semibold text-[#111827]"
                      >
                        Use saved details
                      </button>

                      <button
                        type="button"
                        onClick={clearForm}
                        className="rounded-[18px] border border-[#E5E9F2] bg-white px-4 py-2.5 text-sm font-semibold text-[#111827]"
                      >
                        Clear form
                      </button>
                    </div>
                  </div>

                  <div className="grid gap-3">
                    <FormInput
                      icon={UserRound}
                      placeholder="Full name"
                      value={fullName}
                      onChange={setFullName}
                    />
                    <FormInput
                      icon={Truck}
                      placeholder="Phone number"
                      value={phone}
                      onChange={setPhone}
                    />
                    <FormInput
                      icon={BadgeCheck}
                      placeholder="Email address"
                      value={email}
                      onChange={setEmail}
                      type="email"
                    />
                    <FormInput
                      icon={MapPin}
                      placeholder="City"
                      value={city}
                      onChange={setCity}
                    />
                    <FormTextarea
                      icon={MapPin}
                      placeholder="Full delivery address"
                      value={address}
                      onChange={setAddress}
                    />
                  </div>
                </div>
              </motion.section>

              <motion.section
                variants={fadeUp}
                initial="hidden"
                animate="show"
                transition={{ duration: 0.4, delay: 0.15 }}
              >
                <div className="surface-card rounded-[36px] p-5">
                  <p className="section-eyebrow">Payment</p>
                  <h3 className="mt-1 section-title">Choose payment method</h3>

                  <div className="mt-5 grid gap-3">
                    <PaymentCard
                      active={paymentMethod === "cod"}
                      onClick={() => setPaymentMethod("cod")}
                      icon={Truck}
                      title="Cash on Delivery"
                      text="Pay when your order arrives."
                    />

                    <PaymentCard
                      active={paymentMethod === "bank"}
                      onClick={() => setPaymentMethod("bank")}
                      icon={Landmark}
                      title="Bank Transfer"
                      text="Manual confirmation flow ready for later backend connection."
                    />

                    <PaymentCard
                      active={paymentMethod === "card"}
                      onClick={() => setPaymentMethod("card")}
                      icon={CreditCard}
                      title="Card Payment"
                      text="Premium card payment UI that can connect to a gateway later."
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
                      <ShieldCheck className="h-3.5 w-3.5" />
                      Order review
                    </div>

                    <h3 className="text-[1.8rem] font-black leading-[0.96] tracking-[-0.05em] text-white">
                      A premium order summary that closes the deal
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-white/84">
                      Review every item, total, and delivery cost before you place
                      the order.
                    </p>

                    <div className="mt-5 space-y-3">
                      {cartItems.map((item) => (
                        <div
                          key={item.id}
                          className="rounded-[24px] bg-white/12 p-3 backdrop-blur"
                        >
                          <div className="flex items-center gap-3">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="h-16 w-16 rounded-[18px] object-cover"
                            />

                            <div className="min-w-0 flex-1">
                              <p className="line-clamp-2 text-sm font-semibold text-white">
                                {item.name}
                              </p>
                              <p className="mt-1 text-xs text-white/74">
                                Qty: {item.quantity}
                              </p>
                            </div>

                            <p className="text-sm font-bold text-white">
                              {formatPrice(item.price * item.quantity)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-5 rounded-[28px] bg-white/12 p-4 backdrop-blur">
                      <div className="space-y-3 text-sm">
                        <SummaryRow label="Items" value={`${totalItems}`} />
                        <SummaryRow label="Subtotal" value={formatPrice(subtotal)} />
                        <SummaryRow label="Delivery" value={formatPrice(deliveryFee)} />
                        <div className="h-px bg-white/15" />
                        <SummaryRow strong label="Total" value={formatPrice(total)} />
                      </div>
                    </div>

                    <button
                      onClick={handlePlaceOrder}
                      className="mt-5 w-full rounded-[20px] bg-white px-4 py-3.5 text-sm font-semibold text-[#111827] shadow-sm transition active:scale-[0.98]"
                    >
                      Place order
                    </button>

                    <Link
                      href="/cart"
                      className="mt-3 flex w-full items-center justify-center rounded-[20px] border border-white/18 bg-white/10 px-4 py-3.5 text-sm font-semibold text-white"
                    >
                      Back to cart
                    </Link>

                    <div className="mt-5 space-y-3">
                      <InfoRow
                        icon={ShieldCheck}
                        title="Secure checkout"
                        text="A smoother purchase flow with stronger visual clarity."
                      />
                      <InfoRow
                        icon={BadgeCheck}
                        title="Saved details support"
                        text="Account details can be loaded straight into checkout."
                      />
                      <InfoRow
                        icon={MapPin}
                        title="Delivery-ready layout"
                        text="Shipping form, payment cards, and summary stay fully connected."
                      />
                    </div>
                  </div>
                </div>
              </motion.section>
            </div>
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
      <p className="mt-1 text-lg font-bold tracking-[-0.03em] text-[#111827]">
        {value}
      </p>
    </div>
  );
}

function FormInput({
  icon: Icon,
  placeholder,
  value,
  onChange,
  type = "text",
}: {
  icon: ElementType;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-[22px] border border-[#E5E9F2] bg-[#F6F7FB] px-4 py-3.5">
      <div className="flex h-10 w-10 items-center justify-center rounded-[16px] bg-white text-[#4F7CFF] shadow-sm">
        <Icon className="h-4 w-4" />
      </div>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent text-sm font-medium text-[#111827] placeholder:text-[#8A93A5] outline-none"
      />
    </div>
  );
}

function FormTextarea({
  icon: Icon,
  placeholder,
  value,
  onChange,
}: {
  icon: ElementType;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="rounded-[22px] border border-[#E5E9F2] bg-[#F6F7FB] p-4">
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-[16px] bg-white text-[#4F7CFF] shadow-sm">
        <Icon className="h-4 w-4" />
      </div>
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="min-h-[120px] w-full resize-none bg-transparent text-sm font-medium text-[#111827] placeholder:text-[#8A93A5] outline-none"
      />
    </div>
  );
}

function PaymentCard({
  active,
  onClick,
  icon: Icon,
  title,
  text,
}: {
  active: boolean;
  onClick: () => void;
  icon: ElementType;
  title: string;
  text: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-[26px] border p-4 text-left transition ${
        active
          ? "border-[#4F7CFF] bg-[#EAF0FF] shadow-sm"
          : "border-[#E5E9F2] bg-[#F6F7FB]"
      }`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-[18px] ${
            active ? "bg-white text-[#4F7CFF]" : "bg-white text-[#111827]"
          } shadow-sm`}
        >
          <Icon className="h-5 w-5" />
        </div>

        <div>
          <p className="text-sm font-semibold">{title}</p>
          <p className="mt-1 text-xs leading-5 text-[#5B6475]">{text}</p>
        </div>
      </div>
    </button>
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

function InfoRow({
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

function SuccessInfoCard({
  title,
  rows,
}: {
  title: string;
  rows: { label: string; value: string }[];
}) {
  return (
    <div className="rounded-[28px] bg-[#F6F7FB] p-5">
      <p className="text-sm font-semibold">{title}</p>

      <div className="mt-4 space-y-3 text-sm">
        {rows.map((row) => (
          <div
            key={`${title}-${row.label}`}
            className="flex items-start justify-between gap-4"
          >
            <span className="text-[#5B6475]">{row.label}</span>
            <span className="text-right font-semibold text-[#111827]">
              {row.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}