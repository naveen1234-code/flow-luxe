import { CartItem } from "./cart";

export type PaymentMethod = "cod" | "bank" | "card";
export type OrderStatus = "Processing" | "Confirmed" | "Delivered";

export type Order = {
  id: string;
  createdAt: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  customer: {
    fullName: string;
    phone: string;
    email: string;
    city: string;
    address: string;
  };
};