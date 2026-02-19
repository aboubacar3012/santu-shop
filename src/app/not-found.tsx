"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Store, ShoppingBag, User, Home } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header simple style Santu */}
      <header className="border-b border-gray-100 bg-white/80 backdrop-blur-xl">
        <div className="px-6 sm:px-8 lg:px-12 py-4 max-w-[1600px] mx-auto">
          <Link
            href="/"
            className="flex items-center gap-2 w-fit group"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center font-bold text-sm text-white group-hover:from-gray-800 group-hover:to-gray-600 transition-all">
              S
            </div>
            <span className="text-lg font-semibold text-gray-900 tracking-tight">Santu</span>
          </Link>
        </div>
      </header>

      <main className="px-6 sm:px-8 lg:px-12 py-12 sm:py-16 md:py-24 max-w-[1600px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-xl mx-auto text-center"
        >
          {/* Code 404 */}
          <p className="text-6xl sm:text-7xl md:text-8xl font-bold text-gray-900 tracking-tight mb-2">
            404
          </p>
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3">
            Page non trouvée
          </h1>
          <p className="text-gray-600 text-sm sm:text-base mb-8">
            Désolé, cette page n&apos;existe pas ou a été déplacée. Retournez à l&apos;accueil ou explorez les boutiques.
          </p>

          {/* Illustration */}
          <div className="mb-8 flex justify-center">
            <div className="w-24 h-24 rounded-2xl bg-gray-100 flex items-center justify-center">
              <Store className="w-12 h-12 text-gray-400" />
            </div>
          </div>

          {/* Bouton principal */}
          <Link href="/" className="inline-block mb-6">
            <motion.span
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
            >
              <Home className="w-4 h-4" />
              Retour à l&apos;accueil
            </motion.span>
          </Link>

          {/* Liens rapides */}
          <div className="p-4 sm:p-6 rounded-xl border border-gray-200 bg-gray-50/50">
            <p className="text-sm font-medium text-gray-700 mb-4">
              Liens utiles
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Link
                href="/"
                className="flex items-center gap-2 p-3 rounded-lg border border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50 transition-colors text-left"
              >
                <Home className="w-4 h-4 text-gray-500 flex-shrink-0" />
                <span className="text-sm font-medium text-gray-900">Accueil</span>
              </Link>
              <Link
                href="/cart"
                className="flex items-center gap-2 p-3 rounded-lg border border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50 transition-colors text-left"
              >
                <ShoppingBag className="w-4 h-4 text-gray-500 flex-shrink-0" />
                <span className="text-sm font-medium text-gray-900">Panier</span>
              </Link>
              <Link
                href="/account"
                className="flex items-center gap-2 p-3 rounded-lg border border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50 transition-colors text-left"
              >
                <User className="w-4 h-4 text-gray-500 flex-shrink-0" />
                <span className="text-sm font-medium text-gray-900">Mon compte</span>
              </Link>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
