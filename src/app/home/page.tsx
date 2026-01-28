"use client";

import { motion } from "framer-motion";
import { Package, ArrowRight, Search, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import {
  features,
  featureColors,
  services,
  heroHighlights,
  destinations,
} from "./data";

export default function HomePage() {
  const [trackingNumber, setTrackingNumber] = useState("");

  const handleTrackPackage = () => {
    if (trackingNumber.trim()) {
      console.log("Recherche du colis:", trackingNumber);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-slate-50 via-slate-50 to-white text-slate-900">
      {/* Background décoratif global (subtil) */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.35]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(249,115,22,0.12),transparent_40%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(15,23,42,0.10),transparent_45%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.04)_1px,transparent_1px)] bg-[size:84px_84px] [mask-image:radial-gradient(ellipse_70%_55%_at_50%_25%,black,transparent)]" />
      </div>

      {/* Hero Section (mobile-first) */}
      <section className="relative pt-3 sm:pt-8 pb-8 sm:pb-14 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Grande carte hero */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative bg-gradient-to-br from-slate-900 via-slate-950 to-slate-950 rounded-2xl sm:rounded-3xl p-4 sm:p-10 lg:p-12 text-white shadow-[0_30px_80px_rgba(2,6,23,0.35)] overflow-hidden border border-white/10"
          >
            {/* Pattern décoratif */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,white,transparent_50%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,white,transparent_50%)]" />
            </div>
            {/* Accent orange très subtil */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_0%,rgba(249,115,22,0.20),transparent_55%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_80%,rgba(255,255,255,0.08),transparent_55%)]" />

            <div className="relative z-10">
              {/* Header compact */}
              <div className="flex items-center justify-between gap-3 mb-4 sm:mb-7">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center">
                    <Package className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-orange-200" />
                  </div>
                  <div className="leading-tight">
                    <p className="text-[13px] sm:text-sm font-semibold">Santu Express</p>
                    <p className="text-[10px] sm:text-[11px] text-white/70">Envoi de colis</p>
                  </div>
                </div>
                <Link
                  href="#destinations"
                  className="text-[11px] sm:text-[12px] font-semibold text-white/80 hover:text-white inline-flex items-center gap-1 rounded-lg px-2 py-1 hover:bg-white/5 transition"
                >
                  Destinations
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 mb-3 sm:mb-5"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-300 opacity-60"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-300"></span>
                </span>
                <span className="text-[11px] sm:text-sm font-medium text-white/85">
                  Livraison nationale et internationale
                </span>
              </motion.div>

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
                className="text-[13px] sm:text-lg text-white/70 mb-4 sm:mb-7 max-w-2xl"
              >
                Service de livraison rapide, sécurisé et fiable. Suivez votre colis en temps réel.
              </motion.p>

              {/* Suivi (mobile-first) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mb-3.5 sm:mb-6"
              >
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleTrackPackage();
                  }}
                  className="bg-white/95 backdrop-blur-sm rounded-2xl p-2.5 sm:p-3 shadow-[0_18px_50px_rgba(2,6,23,0.22)] border border-white/25"
                >
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <p className="text-[11px] sm:text-xs font-semibold text-slate-800">
                      Suivre un colis
                    </p>
                    <p className="text-[10px] sm:text-[11px] text-slate-500">
                      Exemple: `SE-123456`
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4.5 h-4.5 sm:w-5 sm:h-5 text-slate-400" />
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
                        className="w-full pl-10 pr-3 h-11 sm:h-12 bg-white rounded-xl border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-200/70 focus:border-orange-200/70 text-[14px] sm:text-base shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]"
                      />
                    </div>
                    <button
                      type="submit"
                      className="h-11 sm:h-12 px-3.5 sm:px-4 rounded-xl bg-slate-900 text-white text-[14px] sm:text-base font-semibold hover:bg-slate-800 transition-all duration-300 shadow-md active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-orange-200/70"
                    >
                      Suivre
                    </button>
                  </div>
                </form>
              </motion.div>

              {/* Boutons d'action */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-2.5 sm:gap-3"
              >
                <Link
                  href="#services"
                  className="group inline-flex items-center justify-center bg-white text-slate-900 rounded-xl px-4 sm:px-5 py-3 font-bold text-[14px] sm:text-base hover:bg-orange-50/70 transition-all duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-orange-200/70"
                >
                  <Package className="w-5 h-5 mr-2 text-orange-500 group-hover:scale-110 transition-transform" />
                  Créer un envoi
                  <ArrowRight className="w-4.5 h-4.5 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </div>

            {/* Éléments décoratifs flottants */}
            <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 left-10 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
          </motion.div>

          {/* Highlights (carousel mobile) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="mt-4 sm:mt-8"
          >
            <div className="flex gap-4 overflow-x-auto pb-2 -mx-4 px-4 snap-x snap-mandatory sm:mx-0 sm:px-0 sm:grid sm:grid-cols-3 sm:gap-6 sm:overflow-visible">
              {heroHighlights.map((highlight) => {
                const Icon = highlight.icon;
                return (
                  <div
                    key={highlight.title}
                    className="snap-start min-w-[230px] sm:min-w-0 bg-white rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-200 hover:-translate-y-0.5"
                  >
                    <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl ${highlight.badgeColor} flex items-center justify-center mb-2.5 sm:mb-3`}>
                      <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${highlight.iconColor}`} />
                    </div>
                    <h3 className="text-[15px] sm:text-base font-bold text-slate-900 mb-1">{highlight.title}</h3>
                    <p className="text-[13px] sm:text-sm text-slate-600">{highlight.description}</p>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services (mobile-first) */}
      <section id="services" className="py-8 sm:py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6 sm:mb-10">
            <p className="text-[11px] sm:text-xs font-semibold tracking-wide text-orange-600/80 mb-2">
              SERVICES
            </p>
            <h2 className="text-xl sm:text-4xl font-extrabold text-slate-900 mb-2">
              Nos services
            </h2>
            <p className="text-sm sm:text-lg text-slate-600 max-w-2xl">
              Des solutions complètes pour tous vos besoins de livraison
            </p>
          </div>

          {/* Mobile: cards compactes / Desktop: 2 colonnes */}
          <div className="grid gap-3 sm:gap-6 md:grid-cols-2">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group bg-white rounded-2xl p-3.5 sm:p-6 border border-slate-200 hover:border-orange-300 transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-0.5"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-orange-100 to-white flex items-center justify-center flex-shrink-0 border border-orange-100">
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1">
                        {service.title}
                      </h3>
                      <p className="text-[13px] sm:text-sm text-slate-600 leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-300 mt-1 group-hover:text-orange-400 transition-colors" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Destinations (mobile-first) */}
      <section id="destinations" className="relative py-8 sm:py-16 px-4 sm:px-6 lg:px-8 bg-slate-50 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(249,115,22,0.08),transparent_45%)]" />
        <div className="max-w-7xl mx-auto">
          <div className="mb-6 sm:mb-10">
            <p className="text-[11px] sm:text-xs font-semibold tracking-wide text-orange-600/80 mb-2">
              DESTINATIONS
            </p>
            <h2 className="text-xl sm:text-4xl font-extrabold text-slate-900 mb-2">
              Nos destinations
            </h2>
            <p className="text-sm sm:text-lg text-slate-600 max-w-2xl">
              Pays et villes desservis par nos services de livraison
            </p>
          </div>

          {/* Mobile: chips scrollables / Desktop: grille */}
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-4 sm:gap-4 sm:overflow-visible">
            {destinations.map((destination, index) => (
              <motion.div
                key={destination.name}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                className="min-w-[160px] sm:min-w-0 bg-white rounded-2xl px-3.5 sm:px-4 py-3.5 sm:py-4 border border-slate-200 hover:border-orange-300 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <div className="text-xl sm:text-2xl">{destination.flag}</div>
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

      {/* Features (mobile-first) */}
      <section id="features" className="py-8 sm:py-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6 sm:mb-10">
            <p className="text-[11px] sm:text-xs font-semibold tracking-wide text-orange-600/80 mb-2">
              AVANTAGES
            </p>
            <h2 className="text-xl sm:text-4xl font-extrabold text-slate-900 mb-2">
              Pourquoi nous choisir
            </h2>
            <p className="text-sm sm:text-lg text-slate-600 max-w-2xl">
              Des avantages qui font la différence
            </p>
          </div>

          <div className="grid gap-3 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const accent = featureColors[index % featureColors.length];
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group bg-white rounded-2xl p-3.5 sm:p-6 border border-slate-200 hover:border-orange-300 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-orange-100 to-white flex items-center justify-center flex-shrink-0 border border-orange-100">
                      <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${accent}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-[13px] sm:text-sm text-slate-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section - Grande carte moderne */}
      <section className="py-10 sm:py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-7 sm:p-16 text-center text-white shadow-2xl"
          >
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold mb-3 sm:mb-4">
              Prêt à envoyer votre colis ?
            </h2>
            <p className="text-[13px] sm:text-xl text-slate-300 mb-5 sm:mb-8 max-w-2xl mx-auto">
              Créez votre envoi en quelques clics et bénéficiez de nos services de livraison rapides et sécurisés.
            </p>
            <Link
              href="#services"
              className="inline-flex items-center justify-center bg-orange-400 text-white rounded-xl px-6 sm:px-10 py-3.5 sm:py-5 font-bold text-[14px] sm:text-lg hover:bg-orange-500 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Package className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
              Créer un envoi maintenant
              <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-orange-400 flex items-center justify-center">
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