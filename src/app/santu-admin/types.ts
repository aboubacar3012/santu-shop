export type OrderStatus = "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";

export interface Seller {
  id: string;
  name: string;
  slug: string;
}

export interface Order {
  id: string;
  productId: string;
  productTitle: string;
  productPrice: number;
  quantity: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  orderDate: Date;
  status: OrderStatus;
}
