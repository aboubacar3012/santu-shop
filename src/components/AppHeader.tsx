"use client";

import Link from "next/link";
import { ArrowLeft, ShoppingBag, User } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useCart } from "@/contexts/CartContext";

export interface AppHeaderProps {
  /** Afficher un lien "Retour" à la place du logo */
  backLink?: { href: string; label?: string };
  /** Titre de la page affiché au centre (style /account) */
  title?: string;
}

export function AppHeader({ backLink, title }: AppHeaderProps) {
  const showCenteredTitle = backLink && title;
  const { totalItems } = useCart();
  const prevTotalRef = useRef(totalItems);
  const [bounce, setBounce] = useState(false);

  useEffect(() => {
    if (totalItems > prevTotalRef.current) {
      setBounce(true);
      const t = setTimeout(() => {
        setBounce(false);
        prevTotalRef.current = totalItems;
      }, 500);
      return () => clearTimeout(t);
    }
    prevTotalRef.current = totalItems;
  }, [totalItems]);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
      <div className="px-6 sm:px-8 lg:px-12 py-4 max-w-[1600px] mx-auto">
        <div className="flex items-center justify-between gap-4 sm:gap-6">
          {backLink ? (
            <Link
              href={backLink.href}
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors shrink-0"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>{backLink.label ?? "Retour"}</span>
            </Link>
          ) : (
            <Link href="/home" className="flex items-center gap-2 shrink-0 group">
              <span className="text-lg font-semibold text-gray-900 tracking-tight">Santu</span>
            </Link>
          )}

          {showCenteredTitle && (
            <h1 className="text-lg font-semibold text-gray-900 text-center flex-1 min-w-0 truncate">
              {title}
            </h1>
          )}

          {!showCenteredTitle ? (
            <div className="flex items-center gap-2 shrink-0">
              <Link
                href="/cart"
                className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-2"
                title="Panier"
              >
                <motion.span
                  animate={{ scale: bounce ? [1, 1.35, 1] : 1 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="inline-flex"
                >
                  <ShoppingBag className="w-5 h-5 text-gray-600" />
                </motion.span>
                {totalItems > 0 && (
                  <span className="flex items-center justify-center min-w-[1.25rem] h-5 px-1.5 rounded-full bg-gray-900 text-white text-xs font-semibold">
                    {totalItems > 99 ? "99+" : totalItems}
                  </span>
                )}
                <span className="text-sm font-medium text-gray-600">Panier</span>
              </Link>
              <Link
                href="/account"
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-2"
                title="Mon compte"
              >
                <User className="w-5 h-5 text-gray-600" />
                <span className="text-sm font-medium text-gray-600">Mon compte</span>
              </Link>
            </div>
          ) : (
            <div className="w-16 shrink-0" aria-hidden />
          )}
        </div>
      </div>
    </header>
  );
}