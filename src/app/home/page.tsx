"use client";

import { motion } from "framer-motion";
import {
  Banknote,
  Box,
  Calendar,
  ChevronRight,
  MapPin,
  MessageCircle,
  Package,
  Scale,
  Search,
  User,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { destinations } from "./data";

type RouteId = "FR_TO_GN" | "GN_TO_FR" | "GN_TO_US" | "GN_TO_CA";
type TransportType = "colis" | "objets" | "argent";

type TravelAnnouncement = {
  id: string;
  route: RouteId;
  travelDateIso: string;
  travelerName: string;
  travelerInitials: string;
  weightKgAvailable: number;
  accepts: TransportType[];
  message?: string;
  createdAtIso: string;
};

function routeLabel(route: RouteId): string {
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

/** Libellé de la date (départ ou arrivée) selon la liaison */
function dateLabelByRoute(route: RouteId): string {
  switch (route) {
    case "FR_TO_GN":
      return "Départ France";
    case "GN_TO_FR":
      return "Départ Conakry";
    case "GN_TO_US":
      return "Départ Conakry";
    case "GN_TO_CA":
      return "Départ Conakry";
  }
}

function transportLabel(t: TransportType): string {
  switch (t) {
    case "colis":
      return "Colis";
    case "objets":
      return "Objets";
    case "argent":
      return "Argent";
  }
}

const ROUTES: { value: RouteId; label: string }[] = [
  { value: "FR_TO_GN", label: "France → Conakry" },
  { value: "GN_TO_FR", label: "Conakry → France" },
  { value: "GN_TO_US", label: "Conakry → États-Unis (NY)" },
  { value: "GN_TO_CA", label: "Conakry → Canada" },
];

const MOCK_ANNOUNCEMENTS: TravelAnnouncement[] = [
  {
    id: "A1",
    route: "FR_TO_GN",
    travelDateIso: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5).toISOString(),
    travelerName: "Express Conakry",
    travelerInitials: "EC",
    weightKgAvailable: 15,
    accepts: ["colis", "objets"],
    message: "Vol Paris–Conakry. Colis ou objets acceptés.",
    createdAtIso: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
  {
    id: "A2",
    route: "GN_TO_FR",
    travelDateIso: new Date(Date.now() + 1000 * 60 * 60 * 24 * 12).toISOString(),
    travelerName: "Trans Africa",
    travelerInitials: "TA",
    weightKgAvailable: 10,
    accepts: ["colis", "objets", "argent"],
    message: "Conakry–Lyon. Colis, objets et enveloppes scellées.",
    createdAtIso: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
  {
    id: "A3",
    route: "FR_TO_GN",
    travelDateIso: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3).toISOString(),
    travelerName: "Colis Guinée",
    travelerInitials: "CG",
    weightKgAvailable: 8,
    accepts: ["colis"],
    createdAtIso: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
  },
  {
    id: "A4",
    route: "GN_TO_CA",
    travelDateIso: new Date(Date.now() + 1000 * 60 * 60 * 24 * 20).toISOString(),
    travelerName: "Santu Livraison",
    travelerInitials: "SL",
    weightKgAvailable: 20,
    accepts: ["colis", "objets"],
    message: "Conakry–Montréal. Bagage supplémentaire disponible.",
    createdAtIso: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
  },
];

export default function HomePage() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [filterRoute, setFilterRoute] = useState<RouteId | "">("");
  const [filterType, setFilterType] = useState<TransportType | "">("");
  const [filterSearch, setFilterSearch] = useState("");

  const filteredAnnouncements = useMemo(() => {
    let list = [...MOCK_ANNOUNCEMENTS];
    if (filterRoute) list = list.filter((a) => a.route === filterRoute);
    if (filterType) list = list.filter((a) => a.accepts.includes(filterType));
    const q = filterSearch.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (a) =>
          routeLabel(a.route).toLowerCase().includes(q) ||
          a.travelerName.toLowerCase().includes(q) ||
          a.message?.toLowerCase().includes(q)
      );
    }
    return list;
  }, [filterRoute, filterType, filterSearch]);

  const handleTrackPackage = () => {
    if (trackingNumber.trim()) {
      console.log("Recherche du colis:", trackingNumber);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-slate-50 via-slate-50 to-white text-slate-900">
      {/* Header covoiturage colis (avant le hero) */}
      <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/80 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-violet-600 text-white flex items-center justify-center shrink-0">
                <Package className="w-5 h-5" />
              </div>
              <div className="leading-tight min-w-0">
                <p className="text-[13px] sm:text-sm font-semibold text-slate-900">
                  Accueil • Santu Express
                </p>
                <p className="text-[11px] text-slate-500">
                  Envoyez ou suivez vos colis facilement.
                </p>
              </div>
            </div>
            <Link
              href="/account"
              className="shrink-0 inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-[13px] font-semibold text-slate-700 hover:bg-slate-50 transition"
            >
              <User className="w-4 h-4 text-violet-500" />
              Mon compte
            </Link>
          </div>
        </div>
      </header>

      {/* Background décoratif global */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.35]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(139,92,246,0.12),transparent_40%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(15,23,42,0.10),transparent_45%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.04)_1px,transparent_1px)] bg-[size:84px_84px] [mask-image:radial-gradient(ellipse_70%_55%_at_50%_25%,black,transparent)]" />
      </div>

      {/* Hero */}
      <section className="relative pt-4 sm:pt-4 py-6 sm:py-8 lg:py-10 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          {/* Grande carte hero */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative bg-gradient-to-br from-slate-900 via-slate-950 to-slate-950 rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-12 text-white shadow-[0_30px_80px_rgba(2,6,23,0.35)] overflow-hidden border border-white/10"
          >
            {/* Pattern décoratif */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,white,transparent_50%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,white,transparent_50%)]" />
            </div>
            {/* Accent violet */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_0%,rgba(139,92,246,0.20),transparent_55%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_80%,rgba(255,255,255,0.08),transparent_55%)]" />

            <div className="relative z-10 flex flex-col gap-5 sm:gap-6 lg:gap-7">
              <div className="space-y-2 sm:space-y-3">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-2xl sm:text-5xl lg:text-6xl font-extrabold mb-2.5 sm:mb-4 leading-[1.05] tracking-tight"
              >
                Envoyez vos colis
                <span className="block text-white/70 font-semibold text-base sm:text-2xl lg:text-3xl mt-1.5 sm:mt-2">
                  en toute simplicité
                </span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-[13px] sm:text-lg text-white/70 max-w-2xl"
              >
                Service de livraison rapide, sécurisé et fiable. Suivez votre colis en temps réel.
              </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleTrackPackage();
                  }}
                  className="bg-white/95 backdrop-blur-sm rounded-2xl p-3 sm:p-4 shadow-[0_18px_50px_rgba(2,6,23,0.22)] border border-white/25"
                >
                  <div className="flex items-center justify-between gap-3 mb-2.5">
                    <p className="text-[11px] sm:text-xs font-semibold text-slate-800">
                      Suivre un colis
                    </p>
                    <p className="text-[10px] sm:text-[11px] text-slate-500">
                      Exemple: SE-123456
                    </p>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="flex-1 relative min-w-0">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4.5 h-4.5 sm:w-5 sm:h-5 text-slate-400 pointer-events-none" />
                      <input
                        type="text"
                        inputMode="text"
                        autoComplete="off"
                        placeholder="Saisir le numéro de suivi"
                        value={trackingNumber}
                        onChange={(e) => setTrackingNumber(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleTrackPackage();
                        }}
                        className="w-full pl-10 pr-3 h-11 sm:h-12 bg-white rounded-xl border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-200/70 focus:border-violet-200/70 text-[14px] sm:text-base shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]"
                      />
                    </div>
                    <button
                      type="submit"
                      className="h-11 sm:h-12 lg:min-w-[200px] sm:min-w-[0px] px-6 sm:px-8 rounded-xl bg-slate-900 text-white text-[14px] sm:text-base font-semibold hover:bg-slate-800 transition-all duration-300 shadow-md active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-violet-200/70 shrink-0"
                    >
                      Suivre
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>

            <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-10 left-10 w-40 h-40 bg-white/5 rounded-full blur-3xl pointer-events-none" />
          </motion.div>          
        </div>
      </section>

      {/* Annonces — hauteur fixe, scrollable */}
      <div className="h-[70vh] min-h-[320px] overflow-y-auto border-t border-slate-200 bg-slate-50/60">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-5 sm:py-6">
          <section className="rounded-3xl bg-white shadow-sm ring-1 ring-slate-200/80 overflow-hidden">
            {/* En-tête + filtres */}
            <div className="p-5 sm:p-6 bg-gradient-to-b from-violet-50/80 to-white border-b border-slate-100">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                    Trajets disponibles
                  </h2>
                  <p className="text-[13px] text-slate-600 mt-0.5 max-w-md">
                    Dates de départ ou d’arrivée selon la liaison — colis, objets ou argent.
                  </p>
                </div>
                {filteredAnnouncements.length > 0 && (
                  <p className="text-[12px] text-slate-500 font-medium">
                    {filteredAnnouncements.length} annonce{filteredAnnouncements.length !== 1 ? "s" : ""} trouvée{filteredAnnouncements.length !== 1 ? "s" : ""}
                  </p>
                )}
              </div>

              {/* Filtres */}
              <div className="flex flex-col gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  <input
                    value={filterSearch}
                    onChange={(e) => setFilterSearch(e.target.value)}
                    placeholder="Liaison, entreprise, message…"
                    className="w-full h-10 pl-9 pr-3 rounded-xl border border-slate-200 bg-white text-[13px] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-300 transition"
                  />
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <select
                    value={filterRoute}
                    onChange={(e) => setFilterRoute((e.target.value || "") as RouteId | "")}
                    className="h-9 rounded-lg border border-slate-200 bg-white pl-2.5 pr-7 py-1.5 text-[12px] text-slate-700 focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-300"
                  >
                    <option value="">Toutes les liaisons</option>
                    {ROUTES.map((r) => (
                      <option key={r.value} value={r.value}>
                        {r.label}
                      </option>
                    ))}
                  </select>
                  {(["colis", "objets", "argent"] as const).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setFilterType((prev) => (prev === t ? "" : t))}
                      className={`h-9 rounded-lg px-3 text-[12px] font-semibold border transition ${
                        filterType === t
                          ? "bg-violet-500 border-violet-500 text-white shadow-sm"
                          : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:border-slate-300"
                      }`}
                    >
                      {transportLabel(t)}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Liste ou état vide */}
            <div className="p-4 sm:p-5">
              {filteredAnnouncements.length === 0 ? (
                <div className="rounded-2xl bg-slate-50/80 border border-slate-100 p-8 sm:p-10 text-center">
                  <div className="w-14 h-14 rounded-2xl bg-violet-100 flex items-center justify-center mx-auto mb-4">
                    <Package className="w-7 h-7 text-violet-500" />
                  </div>
                  <p className="text-[15px] font-semibold text-slate-800">
                    Aucune annonce ne correspond
                  </p>
                  <p className="text-[13px] text-slate-600 mt-1.5 max-w-xs mx-auto">
                    Modifiez les filtres ou publiez votre trajet depuis votre compte.
                  </p>
                  <Link
                    href="/account"
                    className="mt-5 inline-flex items-center justify-center gap-2 h-11 rounded-xl bg-violet-500 text-white font-semibold text-[13px] px-5 hover:bg-violet-600 active:scale-[0.98] transition shadow-sm"
                  >
                    <User className="w-4 h-4" />
                    Publier un trajet
                  </Link>
                </div>
              ) : (
                <ul className="space-y-3">
                  {filteredAnnouncements.map((ann) => (
                    <li key={ann.id}>
                      <article className="rounded-2xl bg-white border border-slate-200/90 shadow-sm overflow-hidden hover:shadow-md hover:border-violet-200 transition-all duration-200">
                        {/* Bandeau liaison + date (départ/arrivée selon liaison) */}
                        <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 bg-violet-50/70 border-b border-violet-100/80">
                          <div className="flex items-center gap-2 min-w-0">
                            <MapPin className="w-3.5 h-3.5 text-violet-500 shrink-0" />
                            <span className="text-[13px] font-bold text-slate-900 truncate">
                              {routeLabel(ann.route)}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5 text-[12px] text-slate-600">
                            <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <span className="font-medium text-slate-500">
                              {dateLabelByRoute(ann.route)}
                            </span>
                            <span className="text-slate-400">·</span>
                            <time
                              dateTime={ann.travelDateIso}
                              className="font-semibold text-slate-700"
                            >
                              {new Date(ann.travelDateIso).toLocaleDateString("fr-FR", {
                                weekday: "short",
                                day: "numeric",
                                month: "short",
                              })}
                            </time>
                          </div>
                        </div>

                        {/* Corps */}
                        <div className="p-4 flex flex-col sm:flex-row sm:items-center gap-4">
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-200/50 flex items-center justify-center shrink-0 ring-2 ring-white shadow-sm">
                              <span className="text-[13px] font-bold text-violet-700">
                                {ann.travelerInitials}
                              </span>
                            </div>
                            <div className="min-w-0">
                              <p className="text-[13px] font-bold text-slate-900 truncate">
                                {ann.travelerName}
                              </p>
                              <p className="flex items-center gap-1 text-[12px] text-slate-600">
                                <Scale className="w-3.5 h-3.5 text-violet-500" />
                                {ann.weightKgAvailable} kg dispo.
                              </p>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-1.5 sm:flex-1">
                            {ann.accepts.map((t) => (
                              <span
                                key={t}
                                className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-semibold bg-violet-100 text-violet-700 border border-violet-200/50"
                              >
                                {t === "colis" && <Box className="w-3 h-3" />}
                                {t === "objets" && <Package className="w-3 h-3" />}
                                {t === "argent" && <Banknote className="w-3 h-3" />}
                                {transportLabel(t)}
                              </span>
                            ))}
                          </div>

                          {ann.message && (
                            <p className="text-[12px] text-slate-600 leading-snug line-clamp-2 sm:max-w-[200px]">
                              {ann.message}
                            </p>
                          )}

                          <div className="flex gap-2 sm:ml-auto shrink-0">
                            <button
                              type="button"
                              className="h-9 rounded-lg bg-violet-500 text-white font-semibold text-[12px] px-3.5 hover:bg-violet-600 active:scale-[0.98] transition inline-flex items-center gap-1.5 shadow-sm"
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                              Contacter
                            </button>
                            <button
                              type="button"
                              className="h-9 rounded-lg border border-slate-200 bg-white text-slate-600 font-semibold text-[12px] px-3.5 hover:bg-slate-50 inline-flex items-center gap-1.5 transition"
                            >
                              Profil
                              <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </article>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        </div>
      </div>

      {/* Destinations */}
      <section
        id="destinations"
        className="relative py-10 sm:py-14 lg:py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 overflow-hidden"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(139,92,246,0.08),transparent_45%)]" />
        <div className="max-w-6xl mx-auto relative">
          <header className="mb-8 sm:mb-10">
            <p className="text-[11px] sm:text-xs font-semibold tracking-wide text-violet-600/80 mb-1.5">
              DESTINATIONS
            </p>
            <h2 className="text-xl sm:text-4xl font-extrabold text-slate-900 mb-2">
              Nos destinations
            </h2>
            <p className="text-sm sm:text-lg text-slate-600 max-w-2xl">
              Pays et villes desservis par nos services de livraison
            </p>
          </header>

          <div className="flex gap-4 sm:gap-6 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-4 sm:overflow-visible">
            {destinations.map((destination, index) => (
              <motion.div
                key={destination.name}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                className="min-w-[160px] sm:min-w-0 bg-white rounded-2xl px-4 py-4 border border-slate-200 hover:border-violet-300 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl sm:text-2xl shrink-0">{destination.flag}</span>
                  <div className="min-w-0">
                    <p className="font-bold text-slate-900 text-[13px] sm:text-base truncate">
                      {destination.name}
                    </p>
                    <p className="text-[11px] sm:text-xs text-slate-500">Disponible</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Séparateur entre sections */}
      <div className="h-px bg-slate-200/80 mx-4 sm:mx-6 lg:mx-8" aria-hidden />

      

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-10 sm:py-14 lg:py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-violet-500 flex items-center justify-center shrink-0">
                  <Package className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold">Santu Express</span>
              </div>
              <p className="text-slate-400 text-sm max-w-sm">
                Service de livraison rapide et sécurisé pour vos envois nationaux et internationaux.
              </p>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-800">
            <p className="text-sm text-slate-400 text-center">
              © 2026 Santu Express. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}