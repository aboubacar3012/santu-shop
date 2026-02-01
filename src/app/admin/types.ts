export type AdminTab = "create" | "invoices" | "parcels";

export type PackageSize = "S" | "M" | "L" | "XL";

export type ShipmentDraft = {
  route: "FR_TO_GN" | "GN_TO_FR" | "GN_TO_US" | "GN_TO_CA";
  service: "standard" | "express";
  size: PackageSize;
  weightKg: string;
  lengthCm: string;
  widthCm: string;
  heightCm: string;
  declaredValueEur: string;
  currency: "EUR";
  notes: string;
  senderName: string;
  senderPhone: string;
  senderEmail: string;
  senderAddress: string;
  recipientName: string;
  recipientPhone: string;
  recipientEmail: string;
  recipientAddress: string;
};

export type Invoice = {
  id: string;
  createdAtIso: string;
  customerName: string;
  routeLabel: string;
  totalEur: number;
  status: "brouillon" | "envoyée" | "payée";
};

export type ParcelStatus =
  | "Créé"
  | "Pris en charge"
  | "En transit"
  | "Arrivé"
  | "Livré"
  | "Annulé";

export type Parcel = {
  trackingId: string;
  createdAtIso: string;
  route: ShipmentDraft["route"];
  service: ShipmentDraft["service"];
  size: PackageSize;
  weightKg: number;
  senderName: string;
  recipientName: string;
  status: ParcelStatus;
  comment?: string;
};

export type CreateUiState = {
  optionsOpen: boolean;
  senderOpen: boolean;
  recipientOpen: boolean;
};

export type ToastState = null | { kind: "ok" | "warn"; msg: string };

export type Estimate = {
  base: number;
  perKg: number;
  sizeFee: number;
  insurance: number;
  total: number;
};
