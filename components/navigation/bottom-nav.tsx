"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass, Home, Package, ShoppingCart, User } from "lucide-react";
import { useEffect, useState } from "react";
import { getCartCount } from "@/lib/cart-storage";

const items = [
  { href: "/", label: "Home", icon: Home },
  { href: "/explore", label: "Explore", icon: Compass },
  { href: "/cart", label: "Cart", icon: ShoppingCart },
  { href: "/orders", label: "Orders", icon: Package },
  { href: "/account", label: "Account", icon: User },
];

export default function BottomNav() {
  const pathname = usePathname();
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const syncCartCount = () => setCartCount(getCartCount());
    syncCartCount();
    window.addEventListener("cart-updated", syncCartCount);

    return () => window.removeEventListener("cart-updated", syncCartCount);
  }, []);

  return (
    <div className="fixed bottom-4 left-1/2 z-50 w-[94%] max-w-[430px] -translate-x-1/2">
      <div className="rounded-[24px] border border-[#E5E9F2] bg-white/96 p-2 shadow-[0_12px_30px_rgba(17,24,39,0.10)] backdrop-blur-[8px]">
        <div className="grid grid-cols-5 gap-1">
          {items.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            const isCart = item.href === "/cart";

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative flex flex-col items-center justify-center rounded-[18px] px-1 py-2.5 text-[11px] font-medium transition ${
                  active
                    ? "bg-[#EAF0FF] text-[#111827] shadow-sm"
                    : "text-[#5B6475]"
                }`}
              >
                <div className="relative mb-1">
                  <Icon className="h-5 w-5" />
                  {isCart && cartCount > 0 && (
                    <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#111827] px-1 text-[9px] font-semibold text-white">
                      {cartCount > 99 ? "99+" : cartCount}
                    </span>
                  )}
                </div>
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}