"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { ElementType, ReactNode } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Trash2,
  Truck,
} from "lucide-react";

import Container from "@/components/app-shell/container";
import TopHeader from "@/components/app-shell/top-header";
import ProductCard from "@/components/home/product-card";
import {
  clearCart,
  getCart,
  removeFromCart,
  updateCartItemQuantity,
} from "@/lib/cart-storage";
import { CartItem } from "@/types/cart";
import { products } from "@/data/products";

function formatPrice(value: number) {
  return `LKR ${value.toLocaleString()}`;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const syncCart = () => {
    setCartItems(getCart());
  };

  useEffect(() => {
    syncCart();
    window.addEventListener("cart-updated", syncCart);

    return () => window.removeEventListener("cart-updated", syncCart);
  }, []);

  const subtotal = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cartItems]);

  const totalItems = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }, [cartItems]);

  const deliveryFee = cartItems.length > 0 ? 500 : 0;
  const total = subtotal + deliveryFee;

  const recommendedProducts = products
    .filter((product) => !cartItems.some((item) => item.id === product.id))
    .slice(0, 4);

  return (
    <main className="app-page text-[#111827]">
      <div className="page-glow" />

      <Container className="pt-6">
        <TopHeader eyebrow="Your cart" title="Bag of premium picks" />

        {cartItems.length === 0 ? (
          <div className="space-y-6">
            <section className="hero-soft relative overflow-hidden rounded-[40px] p-6 shadow-float">
              <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/55 blur-3xl" />
              <div className="absolute -left-6 bottom-0 h-24 w-24 rounded-full bg-[#DDE6FF] blur-3xl" />

              <div className="relative text-center">
                <div className="mx-auto mb-4 flex h-18 w-18 items-center justify-center rounded-[24px] bg-white/80 text-[#111827] shadow-sm backdrop-blur">
                  <ShoppingBag className="h-9 w-9" />
                </div>

                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1.5 text-xs font-semibold text-[#4F7CFF] shadow-sm backdrop-blur">
                  <Sparkles className="h-3.5 w-3.5" />
                  Your cart is waiting
                </div>

                <h2 className="text-[2rem] font-black leading-[0.96] tracking-[-0.05em] text-[#111827]">
                  Nothing here yet, but it can look expensive fast
                </h2>

                <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-[#5B6475]">
                  Start adding products from the catalog and build a checkout flow
                  that actually feels premium.
                </p>

                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <Link
                    href="/explore"
                    className="inline-flex items-center gap-2 rounded-[20px] bg-[#111827] px-5 py-3 text-sm font-semibold text-white shadow-sm transition active:scale-[0.98]"
                  >
                    Browse products
                    <ArrowRight className="h-4 w-4" />
                  </Link>

                  <Link
                    href="/"
                    className="inline-flex items-center gap-2 rounded-[20px] border border-[#E5E9F2] bg-white px-5 py-3 text-sm font-semibold text-[#111827] shadow-sm"
                  >
                    Back to home
                  </Link>
                </div>
              </div>
            </section>

            <section className="surface-card rounded-[36px] p-4">
              <div className="mb-4 flex items-end justify-between gap-4">
                <div>
                  <p className="section-eyebrow">You may like</p>
                  <h2 className="mt-1 section-title">Recommended picks</h2>
                </div>

                <Link
                  href="/explore"
                  className="text-sm font-medium text-[#4F7CFF]"
                >
                  See all
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {recommendedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>
          </div>
        ) : (
<div className="space-y-4">
  <section className="surface-card rounded-[34px] p-5">
    <div className="mb-4 flex items-start justify-between gap-4">
      <div>
        <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-[#EAF0FF] px-3 py-1.5 text-xs font-semibold text-[#4F7CFF]">
          <Sparkles className="h-3.5 w-3.5" />
          Premium cart mode
        </div>

        <h2 className="text-[1.9rem] font-black leading-[0.96] tracking-[-0.05em]">
          {totalItems} item{totalItems === 1 ? "" : "s"} ready for checkout
        </h2>

        <p className="mt-2 text-sm leading-6 text-[#5B6475]">
          Review your picks, fine-tune quantities, and keep the purchase
          flow looking sharp.
        </p>
      </div>

      <button
        onClick={clearCart}
        className="shrink-0 rounded-[18px] border border-[#E5E9F2] bg-[#F6F7FB] px-4 py-2.5 text-sm font-semibold text-[#111827]"
      >
        Clear all
      </button>
    </div>

    <div className="grid grid-cols-3 gap-3">
      <MiniMetric label="Items" value={`${totalItems}`} />
      <MiniMetric label="Subtotal" value={formatPrice(subtotal)} />
      <MiniMetric label="Delivery" value={formatPrice(deliveryFee)} />
    </div>
  </section>

  {cartItems.map((item) => (
    <section
      key={item.id}
      className="surface-card rounded-[34px] p-4"
    >
      <div className="flex gap-4">
        <Link href={`/product/${item.id}`} className="shrink-0">
          <div className="overflow-hidden rounded-[24px] bg-[#F6F7FB]">
            <img
              src={item.image}
              alt={item.name}
              className="h-26 w-26 object-cover"
            />
          </div>
        </Link>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <Link href={`/product/${item.id}`}>
                <p className="line-clamp-2 text-sm font-semibold leading-6">
                  {item.name}
                </p>
              </Link>
              <p className="mt-1 text-xs font-medium text-[#5B6475]">
                {item.category}
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                <span className="rounded-full bg-[#F6F7FB] px-3 py-1.5 text-[11px] font-semibold text-[#111827]">
                  Unit {formatPrice(item.price)}
                </span>
                <span className="rounded-full bg-[#EAF8F2] px-3 py-1.5 text-[11px] font-semibold text-[#14B87A]">
                  Line total {formatPrice(item.price * item.quantity)}
                </span>
              </div>
            </div>

            <button
              onClick={() => removeFromCart(item.id)}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[18px] bg-[#F6F7FB] text-[#111827]"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex w-full items-center justify-between gap-2 rounded-[20px] bg-[#F6F7FB] p-1.5 sm:w-auto sm:justify-start">
              <button
                onClick={() =>
                  updateCartItemQuantity(item.id, item.quantity - 1)
                }
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[16px] bg-white text-[#111827] shadow-sm"
              >
                <Minus className="h-4 w-4" />
              </button>

              <span className="min-w-[44px] text-center text-sm font-bold">
                {item.quantity}
              </span>

              <button
                onClick={() =>
                  updateCartItemQuantity(item.id, item.quantity + 1)
                }
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[16px] bg-white text-[#111827] shadow-sm"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            <Link
              href={`/product/${item.id}`}
              className="inline-flex w-full items-center justify-center rounded-[18px] border border-[#E5E9F2] bg-white px-4 py-3 text-sm font-semibold text-[#111827] shadow-sm sm:w-auto"
            >
              View product
            </Link>
          </div>
        </div>
      </div>
    </section>
  ))}

  <section className="promo-gradient relative overflow-hidden rounded-[40px] p-5 shadow-float">
    <div className="absolute -right-8 top-0 h-28 w-28 rounded-full bg-white/10 blur-3xl" />
    <div className="absolute left-0 bottom-0 h-24 w-24 rounded-full bg-white/10 blur-3xl" />

    <div className="relative">
      <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur">
        <CheckCircle2 className="h-3.5 w-3.5" />
        Order summary
      </div>

      <h3 className="text-[1.8rem] font-black leading-[0.96] tracking-[-0.05em] text-white">
        You’re one step from checkout
      </h3>

      <p className="mt-3 text-sm leading-6 text-white/84">
        Everything is ready. Review totals, confirm the flow, and move
        into checkout.
      </p>

      <div className="mt-5 rounded-[28px] bg-white/12 p-4 backdrop-blur">
        <div className="space-y-3 text-sm text-white">
          <SummaryRow label="Items" value={`${totalItems}`} />
          <SummaryRow label="Subtotal" value={formatPrice(subtotal)} />
          <SummaryRow label="Delivery" value={formatPrice(deliveryFee)} />
          <div className="h-px bg-white/15" />
          <SummaryRow
            label="Total"
            value={formatPrice(total)}
            strong
          />
        </div>
      </div>

      <Link
        href="/checkout"
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-[20px] bg-white px-4 py-3.5 text-sm font-semibold text-[#111827] shadow-sm transition active:scale-[0.98]"
      >
        Proceed to checkout
        <ArrowRight className="h-4 w-4" />
      </Link>

      <Link
        href="/explore"
        className="mt-3 flex w-full items-center justify-center rounded-[20px] border border-white/18 bg-white/10 px-4 py-3.5 text-sm font-semibold text-white"
      >
        Continue shopping
      </Link>

      <div className="mt-5 space-y-3">
        <InfoRow
          icon={Truck}
          title="Fast delivery"
          text="Delivery fee is already included in the summary."
        />
        <InfoRow
          icon={ShieldCheck}
          title="Secure checkout"
          text="The purchase flow stays connected from cart to order tracking."
        />
      </div>
    </div>
  </section>

  <section className="surface-card rounded-[36px] p-4">
    <div className="mb-4 flex items-end justify-between gap-4">
      <div>
        <p className="section-eyebrow">Keep shopping</p>
        <h2 className="mt-1 section-title">Recommended for you</h2>
      </div>

      <Link
        href="/explore"
        className="text-sm font-medium text-[#4F7CFF]"
      >
        See all
      </Link>
    </div>

    <div className="grid grid-cols-2 gap-4">
      {recommendedProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  </section>
</div>
        )}
      </Container>
    </main>
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