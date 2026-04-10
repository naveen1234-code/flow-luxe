"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Heart } from "lucide-react";
import { addToCart } from "@/lib/cart-storage";

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  badge?: string;
  inStock?: boolean;
};

type ProductCardProps = {
  product: Product;
  horizontal?: boolean;
};

function formatPrice(price: number) {
  return `LKR ${price.toLocaleString()}`;
}

function getDiscountPercent(price: number, originalPrice?: number) {
  if (!originalPrice || originalPrice <= price) return null;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}

export default function ProductCard({
  product,
  horizontal = false,
}: ProductCardProps) {
  const [added, setAdded] = useState(false);
  const discount = getDiscountPercent(product.price, product.originalPrice);

  const handleAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    addToCart({
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
      image: product.image,
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <Link href={`/product/${product.id}`} className="block">
      <motion.div
        whileTap={{ scale: 0.985 }}
        className={`group rounded-[26px] border border-[#E5E9F2] bg-white p-3 shadow-sm transition hover:-translate-y-1 hover:shadow-lg ${
          horizontal ? "min-w-[240px] md:min-w-[280px]" : ""
        }`}
      >
        <div className="relative mb-3 overflow-hidden rounded-[22px] bg-[#F6F7FB]">
          <img
            src={product.image}
            alt={product.name}
            className={`w-full object-cover transition duration-500 group-hover:scale-105 ${
              horizontal ? "h-52" : "h-44 md:h-56"
            }`}
          />

          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-white/90 shadow transition active:scale-90"
          >
            <Heart className="h-4 w-4" />
          </button>

          <div className="absolute left-3 top-3 flex flex-col gap-2">
            {product.badge && (
              <span className="rounded-full bg-[#111827] px-3 py-1 text-[10px] font-semibold text-white">
                {product.badge}
              </span>
            )}

            {discount && (
              <span className="rounded-full bg-[#EF5350] px-3 py-1 text-[10px] font-semibold text-white">
                -{discount}%
              </span>
            )}
          </div>

          {product.inStock === false && (
            <span className="absolute bottom-3 left-3 rounded-full bg-white/95 px-3 py-1 text-[10px] font-semibold text-[#111827] shadow">
              Out of stock
            </span>
          )}
        </div>

        <p className="line-clamp-2 text-sm font-semibold leading-snug">
          {product.name}
        </p>
        <p className="mt-1 text-xs text-[#5B6475]">{product.category}</p>

        <div className="mt-3 flex items-end justify-between gap-2">
          <div>
            <p className="text-sm font-bold">{formatPrice(product.price)}</p>
            {product.originalPrice && product.originalPrice > product.price && (
              <p className="mt-1 text-xs text-[#8A93A5] line-through">
                {formatPrice(product.originalPrice)}
              </p>
            )}
          </div>

          <button
            onClick={handleAdd}
            disabled={product.inStock === false}
            className={`inline-flex min-w-[78px] items-center justify-center gap-1 rounded-2xl px-4 py-2 text-xs font-semibold text-white transition active:scale-95 ${
              product.inStock === false
                ? "cursor-not-allowed bg-[#C9CED8]"
                : added
                ? "bg-[#14B87A]"
                : "bg-[#111827]"
            }`}
          >
            {product.inStock === false ? (
              "Sold out"
            ) : added ? (
              <>
                <Check className="h-3.5 w-3.5" />
                Added
              </>
            ) : (
              "Add"
            )}
          </button>
        </div>
      </motion.div>
    </Link>
  );
}