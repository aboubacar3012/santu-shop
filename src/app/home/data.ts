import type { LucideIcon } from "lucide-react";
import {
  Shirt,
  Footprints,
  Smartphone,
  Microwave,
  Package,
} from "lucide-react";

export type CategoryId =
  | "vetements"
  | "chaussures"
  | "electronique"
  | "maisons"
  | "autres";

export interface Category {
  id: CategoryId;
  label: string;
  slug: string;
  icon: LucideIcon;
  gradient: string;
  description?: string;
}

export const categories: Category[] = [
  {
    id: "vetements",
    label: "Vêtements",
    slug: "vetements",
    icon: Shirt,
    gradient: "from-rose-500 to-pink-600",
  },
  {
    id: "chaussures",
    label: "Chaussures",
    slug: "chaussures",
    icon: Footprints,
    gradient: "from-amber-500 to-orange-600",
  },
  {
    id: "electronique",
    label: "Électronique",
    slug: "electronique",
    icon: Smartphone,
    gradient: "from-sky-500 to-blue-600",
  },
  {
    id: "maisons",
    label: "Maison",
    slug: "maisons",
    icon: Microwave,
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    id: "autres",
    label: "Autres",
    slug: "autres",
    icon: Package,
    gradient: "from-slate-500 to-slate-700",
  },
];

// Posts boutique (feed) + produits (page boutique)
export interface ShopPost {
  id: string;
  title: string;
  description: string;
  categoryId: CategoryId;
  /** URLs d’images (ex. Pexels). Au moins 2 images par produit pour le carrousel. */
  images: string[];
  sellerName: string;
  /** Slug pour l’URL de la boutique (ex: /shop/shoe-store) */
  sellerSlug: string;
  likes: number;
  comments: number;
  /** Prix affiché sur la page boutique (optionnel sur le feed) */
  price: number;
  /** Prix barré si promo (optionnel) */
  originalPrice?: number;
  /** Produit en stock (optionnel, utilisé par l’admin) */
  available?: boolean;
  /** Quantité en stock (optionnel, utilisé par l’admin) */
  quantity?: number;
}

export const shopPosts: ShopPost[] = [
  {
    id: "p1",
    title: "Sneakers running",
    description: "Confort et style pour tes sorties. Semelle amortissante, matière respirante. Plusieurs coloris dispo.",
    categoryId: "chaussures",
    images: [
      "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1542294/pexels-photo-1542294.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/267301/pexels-photo-267301.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    sellerName: "Shoe Store",
    sellerSlug: "shoe-store",
    likes: 1240,
    comments: 89,
    price: 79.99,
    originalPrice: 99.99,
    available: true,
    quantity: 15,
  },
  {
    id: "p2",
    title: "Sweat oversize premium",
    description: "Coupe oversize, coton épais. Parfait pour un look décontracté. Collection automne-hiver.",
    categoryId: "vetements",
    images: [
      "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1484801/pexels-photo-1484801.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    sellerName: "StreetWear Co",
    sellerSlug: "streetwear-co",
    likes: 892,
    comments: 42,
    price: 34.99,
    available: true,
    quantity: 8,
  },
  {
    id: "p3",
    title: "Écouteurs sans fil",
    description: "Qualité son premium, autonomie 24h. Réduction de bruit active. Idéal pour le quotidien.",
    categoryId: "electronique",
    images: [
      "https://images.pexels.com/photos/3394661/pexels-photo-3394661.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/577769/pexels-photo-577769.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    sellerName: "Tech Store",
    sellerSlug: "tech-store",
    likes: 2103,
    comments: 156,
    price: 49.99,
    originalPrice: 69.99,
    available: true,
    quantity: 12,
  },
  {
    id: "p4",
    title: "Micro-ondes 20 L",
    description: "Cuisson rapide, design compact. Plateau tournant, programmes automatiques. Livraison offerte.",
    categoryId: "maisons",
    images: [
      "https://images.pexels.com/photos/1111812/pexels-photo-1111812.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/3962292/pexels-photo-3962292.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    sellerName: "Home & Co",
    sellerSlug: "home-co",
    likes: 456,
    comments: 23,
    price: 69,
    available: true,
    quantity: 5,
  },
  {
    id: "p5",
    title: "T-shirt coton basique",
    description: "Coton 100% bio, coupe unisexe. Les essentiels de la garde-robe, à petit prix.",
    categoryId: "vetements",
    images: [
      "https://images.pexels.com/photos/9558602/pexels-photo-9558602.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/428338/pexels-photo-428338.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    sellerName: "Basics",
    sellerSlug: "basics",
    likes: 678,
    comments: 67,
    price: 19.99,
    available: true,
    quantity: 27,
  },
  {
    id: "p6",
    title: "Sandales été",
    description: "Léger et confortable pour l’été. Semelle antidérapante. Plusieurs tailles disponibles.",
    categoryId: "chaussures",
    images: [
      "https://images.pexels.com/photos/267301/pexels-photo-267301.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    sellerName: "Shoe Store",
    sellerSlug: "shoe-store",
    likes: 334,
    comments: 18,
    price: 29.9,
    available: false,
    quantity: 0,
  },
  {
    id: "p7",
    title: "Cafetière programmable",
    description: "Réveil et café prêt. Réservoir 1,2 L, fonction keep warm. Parfait pour le matin.",
    categoryId: "maisons",
    images: [
      "https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/3962292/pexels-photo-3962292.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    sellerName: "Home & Co",
    sellerSlug: "home-co",
    likes: 567,
    comments: 34,
    price: 45.99,
    available: true,
    quantity: 3,
  },
  {
    id: "p8",
    title: "Chargeur rapide USB-C",
    description: "Charge rapide compatible smartphone et tablette. Câble inclus, compact pour le voyage.",
    categoryId: "electronique",
    images: [
      "https://images.pexels.com/photos/1591061/pexels-photo-1591061.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/577769/pexels-photo-577769.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    sellerName: "Tech Store",
    sellerSlug: "tech-store",
    likes: 289,
    comments: 21,
    price: 24.5,
    available: true,
    quantity: 20,
  },
  {
    id: "p9",
    title: "Carnet et stylo set",
    description: "Set cadeau : carnet A5 120 pages + stylo. Idéal pour les notes et le bullet journal.",
    categoryId: "autres",
    images: [
      "https://images.pexels.com/photos/3168912/pexels-photo-3168912.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1591061/pexels-photo-1591061.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    sellerName: "Papeterie",
    sellerSlug: "papeterie",
    likes: 1024,
    comments: 98,
    price: 14.9,
    available: true,
    quantity: 30,
  },
  {
    id: "p10",
    title: "Lampe de bureau LED",
    description: "Éclairage réglable, design minimal. USB rechargeable. Parfait pour le télétravail.",
    categoryId: "maisons",
    images: [
      "https://images.pexels.com/photos/1583576/pexels-photo-1583576.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1111812/pexels-photo-1111812.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    sellerName: "Home & Co",
    sellerSlug: "home-co",
    likes: 456,
    comments: 29,
    price: 39.99,
    available: true,
    quantity: 7,
  },
  // Shoe Store - produits supplémentaires
  { id: "p11", title: "Baskets lifestyle", description: "Style urbain, confort au quotidien.", categoryId: "chaussures", images: ["https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=800", "https://images.pexels.com/photos/1542294/pexels-photo-1542294.jpeg?auto=compress&cs=tinysrgb&w=800"], sellerName: "Shoe Store", sellerSlug: "shoe-store", likes: 520, comments: 31, price: 59.99, originalPrice: 74.99, available: true, quantity: 10 },
  { id: "p12", title: "Bottes cuir", description: "Cuir véritable, semelle antidérapante.", categoryId: "chaussures", images: ["https://images.pexels.com/photos/267301/pexels-photo-267301.jpeg?auto=compress&cs=tinysrgb&w=800", "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=800"], sellerName: "Shoe Store", sellerSlug: "shoe-store", likes: 410, comments: 22, price: 129.99, available: true, quantity: 4 },
  { id: "p13", title: "Mocassins classiques", description: "Élégants pour le bureau ou sortie.", categoryId: "chaussures", images: ["https://images.pexels.com/photos/1542294/pexels-photo-1542294.jpeg?auto=compress&cs=tinysrgb&w=800", "https://images.pexels.com/photos/267301/pexels-photo-267301.jpeg?auto=compress&cs=tinysrgb&w=800"], sellerName: "Shoe Store", sellerSlug: "shoe-store", likes: 289, comments: 15, price: 49.99, available: false, quantity: 0 },
  { id: "p14", title: "Tongs plage", description: "Léger, résistant à l'eau. Plusieurs coloris.", categoryId: "chaussures", images: ["https://images.pexels.com/photos/267301/pexels-photo-267301.jpeg?auto=compress&cs=tinysrgb&w=800", "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=800"], sellerName: "Shoe Store", sellerSlug: "shoe-store", likes: 678, comments: 44, price: 14.99, available: true, quantity: 18 },
  // StreetWear Co
  { id: "p15", title: "Jean slim fit", description: "Jean stretch, coupe moderne.", categoryId: "vetements", images: ["https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=800", "https://images.pexels.com/photos/428338/pexels-photo-428338.jpeg?auto=compress&cs=tinysrgb&w=800"], sellerName: "StreetWear Co", sellerSlug: "streetwear-co", likes: 756, comments: 52, price: 44.99, available: true, quantity: 14 },
  { id: "p16", title: "Veste bomber", description: "Veste légère, style streetwear.", categoryId: "vetements", images: ["https://images.pexels.com/photos/1484801/pexels-photo-1484801.jpeg?auto=compress&cs=tinysrgb&w=800", "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=800"], sellerName: "StreetWear Co", sellerSlug: "streetwear-co", likes: 923, comments: 61, price: 89.99, available: true, quantity: 6 },
  { id: "p17", title: "Hoodie zip", description: "Coton doux, capuche avec cordon.", categoryId: "vetements", images: ["https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=800", "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=800"], sellerName: "StreetWear Co", sellerSlug: "streetwear-co", likes: 612, comments: 38, price: 42.99, available: true, quantity: 9 },
  // Tech Store
  { id: "p18", title: "Support smartphone", description: "Support réglable pour bureau ou voiture.", categoryId: "electronique", images: ["https://images.pexels.com/photos/577769/pexels-photo-577769.jpeg?auto=compress&cs=tinysrgb&w=800", "https://images.pexels.com/photos/3394661/pexels-photo-3394661.jpeg?auto=compress&cs=tinysrgb&w=800"], sellerName: "Tech Store", sellerSlug: "tech-store", likes: 234, comments: 18, price: 19.99, available: true, quantity: 22 },
  { id: "p19", title: "Coque silicone", description: "Protection anti-chocs, plusieurs coloris.", categoryId: "electronique", images: ["https://images.pexels.com/photos/3394661/pexels-photo-3394661.jpeg?auto=compress&cs=tinysrgb&w=800", "https://images.pexels.com/photos/1591061/pexels-photo-1591061.jpeg?auto=compress&cs=tinysrgb&w=800"], sellerName: "Tech Store", sellerSlug: "tech-store", likes: 445, comments: 27, price: 12.99, available: true, quantity: 35 },
  { id: "p20", title: "Câble Lightning 1m", description: "Câble durable, charge rapide.", categoryId: "electronique", images: ["https://images.pexels.com/photos/1591061/pexels-photo-1591061.jpeg?auto=compress&cs=tinysrgb&w=800", "https://images.pexels.com/photos/577769/pexels-photo-577769.jpeg?auto=compress&cs=tinysrgb&w=800"], sellerName: "Tech Store", sellerSlug: "tech-store", likes: 389, comments: 21, price: 15.99, available: true, quantity: 28 },
  { id: "p21", title: "Power bank 10000 mAh", description: "Batterie externe, double port USB.", categoryId: "electronique", images: ["https://images.pexels.com/photos/1591061/pexels-photo-1591061.jpeg?auto=compress&cs=tinysrgb&w=800", "https://images.pexels.com/photos/3394661/pexels-photo-3394661.jpeg?auto=compress&cs=tinysrgb&w=800"], sellerName: "Tech Store", sellerSlug: "tech-store", likes: 567, comments: 33, price: 29.99, available: true, quantity: 16 },
  // Home & Co
  { id: "p22", title: "Bouilloire électrique", description: "1,7 L, arrêt automatique. Inox.", categoryId: "maisons", images: ["https://images.pexels.com/photos/1111812/pexels-photo-1111812.jpeg?auto=compress&cs=tinysrgb&w=800", "https://images.pexels.com/photos/3962292/pexels-photo-3962292.jpeg?auto=compress&cs=tinysrgb&w=800"], sellerName: "Home & Co", sellerSlug: "home-co", likes: 312, comments: 19, price: 34.99, available: true, quantity: 8 },
  { id: "p23", title: "Grille-pain 2 fentes", description: "Décongélation, réchauffage. Design compact.", categoryId: "maisons", images: ["https://images.pexels.com/photos/3962292/pexels-photo-3962292.jpeg?auto=compress&cs=tinysrgb&w=800", "https://images.pexels.com/photos/1111812/pexels-photo-1111812.jpeg?auto=compress&cs=tinysrgb&w=800"], sellerName: "Home & Co", sellerSlug: "home-co", likes: 278, comments: 14, price: 39.99, available: true, quantity: 11 },
  { id: "p24", title: "Set vaisselle 4 pers.", description: "Assiettes et bols en céramique.", categoryId: "maisons", images: ["https://images.pexels.com/photos/3962292/pexels-photo-3962292.jpeg?auto=compress&cs=tinysrgb&w=800", "https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=800"], sellerName: "Home & Co", sellerSlug: "home-co", likes: 534, comments: 28, price: 49.99, available: true, quantity: 6 },
  { id: "p25", title: "Organisateur tiroirs", description: "Range tiroirs, plusieurs tailles.", categoryId: "maisons", images: ["https://images.pexels.com/photos/1111812/pexels-photo-1111812.jpeg?auto=compress&cs=tinysrgb&w=800", "https://images.pexels.com/photos/3962292/pexels-photo-3962292.jpeg?auto=compress&cs=tinysrgb&w=800"], sellerName: "Home & Co", sellerSlug: "home-co", likes: 198, comments: 11, price: 18.99, available: true, quantity: 13 },
  // Basics
  { id: "p26", title: "Pantalon chino", description: "Coton, coupe droite. Couleurs classiques.", categoryId: "vetements", images: ["https://images.pexels.com/photos/428338/pexels-photo-428338.jpeg?auto=compress&cs=tinysrgb&w=800", "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=800"], sellerName: "Basics", sellerSlug: "basics", likes: 423, comments: 25, price: 35.99, available: true, quantity: 19 },
  { id: "p27", title: "Polo coton", description: "Mailles fines, coupe régulière.", categoryId: "vetements", images: ["https://images.pexels.com/photos/9558602/pexels-photo-9558602.jpeg?auto=compress&cs=tinysrgb&w=800", "https://images.pexels.com/photos/428338/pexels-photo-428338.jpeg?auto=compress&cs=tinysrgb&w=800"], sellerName: "Basics", sellerSlug: "basics", likes: 367, comments: 20, price: 24.99, available: true, quantity: 27 },
  { id: "p28", title: "Sous-pull col rond", description: "Coton doux, pack de 2.", categoryId: "vetements", images: ["https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=800", "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=800"], sellerName: "Basics", sellerSlug: "basics", likes: 512, comments: 36, price: 22.99, available: true, quantity: 21 },
  // Papeterie
  { id: "p29", title: "Bloc-notes A4", description: "100 feuilles lignées, couverture rigide.", categoryId: "autres", images: ["https://images.pexels.com/photos/3168912/pexels-photo-3168912.jpeg?auto=compress&cs=tinysrgb&w=800", "https://images.pexels.com/photos/1591061/pexels-photo-1591061.jpeg?auto=compress&cs=tinysrgb&w=800"], sellerName: "Papeterie", sellerSlug: "papeterie", likes: 156, comments: 9, price: 8.99, available: true, quantity: 40 },
  { id: "p30", title: "Trousse complète", description: "Stylos, gomme, règle, crayons. Idéal école.", categoryId: "autres", images: ["https://images.pexels.com/photos/3168912/pexels-photo-3168912.jpeg?auto=compress&cs=tinysrgb&w=800", "https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=800"], sellerName: "Papeterie", sellerSlug: "papeterie", likes: 287, comments: 17, price: 19.99, available: true, quantity: 32 },
  // Maison (électro-ménager inclus)
  { id: "p31", title: "Réfrigérateur 150L", description: "Compact, classe A+, idéal petit espace.", categoryId: "maisons", images: ["https://images.pexels.com/photos/1111812/pexels-photo-1111812.jpeg?auto=compress&cs=tinysrgb&w=800", "https://images.pexels.com/photos/3962292/pexels-photo-3962292.jpeg?auto=compress&cs=tinysrgb&w=800"], sellerName: "Home & Co", sellerSlug: "home-co", likes: 623, comments: 45, price: 299.99, available: true, quantity: 2 },
  { id: "p32", title: "Lave-linge 6kg", description: "Économique, programmes multiples.", categoryId: "maisons", images: ["https://images.pexels.com/photos/3962292/pexels-photo-3962292.jpeg?auto=compress&cs=tinysrgb&w=800", "https://images.pexels.com/photos/1111812/pexels-photo-1111812.jpeg?auto=compress&cs=tinysrgb&w=800"], sellerName: "Home & Co", sellerSlug: "home-co", likes: 789, comments: 58, price: 349.99, available: true, quantity: 1 },
  { id: "p33", title: "Aspirateur sans sac", description: "Puissant, filtre HEPA, compact.", categoryId: "maisons", images: ["https://images.pexels.com/photos/3962292/pexels-photo-3962292.jpeg?auto=compress&cs=tinysrgb&w=800", "https://images.pexels.com/photos/1583576/pexels-photo-1583576.jpeg?auto=compress&cs=tinysrgb&w=800"], sellerName: "Home & Co", sellerSlug: "home-co", likes: 456, comments: 32, price: 129.99, available: true, quantity: 4 },
];
