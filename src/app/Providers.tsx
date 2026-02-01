"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter, usePathname } from "next/navigation";
import { useSession } from "@/libs/auth-client";
import applySafeAreaInsets from "@/libs/applySafeAreaInsets";
import { Capacitor } from "@capacitor/core";
import { Analytics } from "@vercel/analytics/next";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a client
export const queryClient = new QueryClient();




// Composant qui gère la mise en page avec la grille
function GridLayout({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="grid w-full h-dvh transition-all duration-300 ease-in-out grid-rows-1">
      {/* Contenu principal */}
      <div className="overflow-auto">{children}</div>
    </div>
  );
}

// Composant principal des providers
export default function ProvidersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, isPending } = useSession();

  useEffect(() => {
    setIsClient(true);
    
    // Configuration Capacitor pour mobile
    if (Capacitor.isNativePlatform()) {
      applySafeAreaInsets();
    }
  }, []);

  // useEffect(() => {
  //   // Pages publiques qui ne nécessitent pas d'authentification
  //   const publicPages = [
  //     "/sign-in",
  //     "/sign-up",
  //     "/",
  //     "/home",
  //     "/account", // L'academy est maintenant accessible sans authentification
  //     "/admin",
  //     "/not-found",
  //   ];

  //   // Normaliser le pathname en supprimant le slash final
  //   const normalizedPathname = pathname.replace(/\/$/, "") || "/";

  //   // Vérifier si le pathname commence par une page publique (pour les routes dynamiques)
  //   const isPublicRoute = publicPages.some((page) => {
  //     if (page === "/") {
  //       return normalizedPathname === "/";
  //     }
  //     return (
  //       normalizedPathname === page ||
  //       normalizedPathname.startsWith(`${page}/`)
  //     );
  //   });

  //   // Rediriger vers sign-in si l'utilisateur n'est pas connecté et n'est pas sur une page publique
  //   if (!isPending && session === null && !isPublicRoute) {
  //     router.push("/sign-in");
  //   }
  // }, [isPending, session, router, pathname]);

  return (
    <>
    <QueryClientProvider client={queryClient}>
      <Analytics />
      {isClient ? (
          <GridLayout>{children}</GridLayout>
      ) : (
        <div className="w-full h-dvh overflow-auto">
          {children}
        </div>
      )}
      </QueryClientProvider>
    </>
  );
}