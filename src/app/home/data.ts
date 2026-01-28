import {
  Package,
  MapPin,
  Shield,
  Clock,
  Globe,
  Sparkles,
  Boxes,
  Route,
  Zap,
  DollarSign,
  Navigation,
} from "lucide-react";

export const features = [
  {
    icon: Package,
    title: "Envoi express",
    description:
      "Livraison rapide et sécurisée de vos colis avec suivi en temps réel et gestion des formalités douanières.",
  },
  {
    icon: Shield,
    title: "Assurance incluse",
    description:
      "Tous vos envois sont automatiquement assurés jusqu'à 500€ pour votre tranquillité d'esprit.",
  },
  {
    icon: Navigation,
    title: "Suivi en temps réel",
    description:
      "Suivez votre colis à chaque étape de son parcours avec notre système de traçabilité avancé.",
  },
  {
    icon: Globe,
    title: "Livraison internationale",
    description:
      "Expédiez vos colis vers de nombreuses destinations avec des tarifs compétitifs et des délais optimisés.",
  },
  {
    icon: Zap,
    title: "Service rapide",
    description:
      "Livraison express disponible pour vos envois urgents avec des délais optimisés.",
  },
  {
    icon: DollarSign,
    title: "Tarifs transparents",
    description:
      "Des prix clairs et compétitifs sans frais cachés. Calculez votre tarif en quelques clics.",
  },
];

export const featureColors = [
  "text-orange-500",
  "text-purple-600",
  "text-pink-600",
  "text-amber-600",
  "text-cyan-600",
  "text-teal-600",
];

// Services disponibles (colonne gauche)
export const services = [
  {
    icon: Route,
    title: "Livraison nationale",
    description:
      "Envoi rapide et sécurisé avec suivi en temps réel et gestion des formalités douanières.",
  },
  {
    icon: Globe,
    title: "Livraison internationale",
    description:
      "Expédition vers de nombreuses destinations avec gestion complète des formalités douanières.",
  },
  {
    icon: Boxes,
    title: "Colis volumineux",
    description:
      "Transport de colis jusqu'à 30kg avec emballage professionnel disponible sur demande.",
  },
  {
    icon: Clock,
    title: "Livraison express",
    description:
      "Service express disponible pour vos envois urgents avec des délais optimisés.",
  },
];

// Pays avec liaisons disponibles
export const destinations = [
  { name: "France", flag: "🇫🇷" },
  { name: "Guinée (Conakry)", flag: "🇬🇳" },
  { name: "États-Unis (New York)", flag: "🇺🇸" },
  { name: "Canada", flag: "🇨🇦" },
];

export const heroHighlights = [
  {
    icon: Sparkles,
    title: "Tarifs compétitifs",
    description:
      "Des prix transparents et compétitifs pour tous vos envois",
    iconColor: "text-orange-500",
    badgeColor: "bg-orange-100 text-orange-600",
  },
  {
    icon: MapPin,
    title: "Destinations multiples",
    description: "Livraison vers plusieurs pays avec des routes optimisées",
    iconColor: "text-purple-600",
    badgeColor: "bg-purple-100 text-purple-700",
  },
  {
    icon: Shield,
    title: "Assurance incluse",
    description: "Tous vos colis assurés jusqu'à 500€ automatiquement",
    iconColor: "text-pink-600",
    badgeColor: "bg-pink-100 text-pink-700",
  },
];

// Tarifs par type de service
export const pricingPlans = [
  {
    title: "Express 24h",
    description:
      "Livraison express en 24h pour vos envois urgents en France métropolitaine.",
    features: [
      "Livraison en 24h",
      "Suivi en temps réel",
      "Assurance incluse",
      "Livraison à domicile",
    ],
    price: "À partir de 12,90€",
    popular: true,
  },
  {
    title: "Standard",
    description:
      "Livraison standard en 2-3 jours ouvrés, idéale pour vos envois réguliers.",
    features: [
      "Livraison en 2-3 jours",
      "Suivi complet",
      "Assurance incluse",
      "Point relais disponible",
    ],
    price: "À partir de 6,90€",
    popular: false,
  },
  {
    title: "International",
    description:
      "Envoi vers l'étranger avec gestion des formalités douanières.",
    features: [
      "Livraison 2-5 jours",
      "Gestion douane",
      "Suivi international",
      "Assurance incluse",
    ],
    price: "À partir de 19,90€",
    popular: false,
  },
];

// Fonction pour récupérer les tarifs
export const getPricingPlans = () => {
  return pricingPlans;
};
