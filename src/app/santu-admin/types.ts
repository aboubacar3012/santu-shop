

export type OrderStatus = "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";


export interface Seller {
  id: string;
  name: string;
  slug: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  categoryId: string;
  images: string[];
  price: number;
  originalPrice?: number;
  available: boolean;
  quantity: number;
  sellerName: string;
  sellerSlug: string;
  createdAt: string;
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

// Formulaire vendeur / boutique (modal ajout)
export interface SellerFormData {
  name: string;
  slug: string;
}

// Formulaire produit (modal ajout/édition)
export interface ProductFormData {
  title: string;
  description: string;
  categoryId: string; // ID de la catégorie depuis la base de données
  price: string;
  originalPrice?: string; // optionnel, prix barré
  available: boolean;
  quantity: string;
}

/** Payload pour la création d’un produit (API + mutation). Pas d’id, sellerName, sellerSlug, createdAt. */
export interface CreateProductInput {
  title: string;
  description: string;
  categoryId: string;
  images: string[];
  price: number;
  originalPrice?: number;
  available: boolean;
  quantity: number;
}

