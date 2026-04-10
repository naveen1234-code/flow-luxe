"use client";

import Link from "next/link";
import { ShoppingCart, User } from "lucide-react";
import { useEffect, useState } from "react";
import { getCartCount } from "@/lib/cart-storage";

type TopHeaderProps = {
  eyebrow?: string;
  title: string;
};

export default function TopHeader({
  eyebrow = "Welcome back",
  title,
}: TopHeaderProps) {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const syncCart = () => setCartCount(getCartCount());
    syncCart();
    window.addEventListener("cart-updated", syncCart);

    return () => window.removeEventListener("cart-updated", syncCart);
  }, []);

  return (
    <header className="mb-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="section-eyebrow">{eyebrow}</p>
          <h1 className="mt-1 text-[2rem] font-bold leading-[1.02] tracking-[-0.04em] text-[#111827] sm:text-[2.15rem]">
            {title}
          </h1>
        </div>

        <div className="flex shrink-0 items-center gap-2 pt-1">
          <Link
            href="/cart"
            className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-[#E5E9F2] bg-white/95 text-[#111827] shadow-sm backdrop-blur"
          >
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#111827] px-1 text-[10px] font-semibold text-white">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </Link>

          <Link
            href="/account"
            className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#E5E9F2] bg-white/95 text-[#111827] shadow-sm backdrop-blur"
          >
            <User className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </header>
  );
}