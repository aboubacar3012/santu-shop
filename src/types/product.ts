/**
 * Produit tel que retourné par l’API /api/products (affichage boutique, panier, etc.).
 */
export interface ShopPost {
  id: string;
  title: string;
  description: string;
  categoryId: string;
  images: string[];
  sellerName: string;
  sellerSlug: string;
  price: number;
  originalPrice?: number;
  available?: boolean;
  quantity?: number;
  likes?: number;
  comments?: number;
  createdAt?: string;
}
