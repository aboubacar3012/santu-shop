import type { ShipmentDraft } from "./types";

export function routeLabel(route: ShipmentDraft["route"]) {
  switch (route) {
    case "FR_TO_GN":
      return "France → Conakry";
    case "GN_TO_FR":
      return "Conakry → France";
    case "GN_TO_US":
      return "Conakry → États-Unis (NY)";
    case "GN_TO_CA":
      return "Conakry → Canada";
  }
}

export function parseNumberOrZero(v: string) {
  const n = Number(String(v).replace(",", "."));
  return Number.isFinite(n) ? n : 0;
}
