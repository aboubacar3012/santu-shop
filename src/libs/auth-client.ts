import { twoFactorClient } from "better-auth/plugins";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  plugins: [
    twoFactorClient({
      onTwoFactorRedirect() {
        // Cette fonction sera appelée globalement si twoFactorRedirect est true
        // Mais on gère cela dans le composant sign-in avec onSuccess
      },
    }),
  ],
});

export const { signIn, signUp, signOut, useSession } = authClient;

/**
 * Vide tous les cookies et données de session Better Auth
 * Cette fonction doit être appelée avant chaque connexion ou création de compte
 * pour s'assurer qu'aucune session précédente n'interfère
 *
 * Note: Cette fonction supprime uniquement les cookies et données locales.
 * Elle ne tente pas de déconnecter une session existante pour éviter les erreurs
 * si aucune session n'est active.
 */
export async function clearAllAuthData() {
  // 1. Supprimer tous les cookies qui pourraient être liés à Better Auth
  // Better Auth utilise généralement des cookies avec des préfixes comme "better-auth"
  const cookiesToDelete = [
    "better-auth.session_token",
    "better-auth.session-token",
    "better_auth_session_token",
    "betterAuth.session_token",
    "session_token",
    "auth.session_token",
  ];

  // Supprimer les cookies avec différents chemins et domaines
  const domain = window.location.hostname;
  const path = "/";

  cookiesToDelete.forEach((cookieName) => {
    // Supprimer avec le domaine actuel
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path}; domain=${domain};`;
    // Supprimer sans domaine spécifique
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path};`;
    // Supprimer avec le domaine parent (pour les sous-domaines)
    const domainParts = domain.split(".");
    if (domainParts.length > 1) {
      const parentDomain = "." + domainParts.slice(-2).join(".");
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path}; domain=${parentDomain};`;
    }
  });

  // 2. Supprimer tous les cookies qui commencent par "better-auth" ou "better_auth"
  const allCookies = document.cookie.split(";");
  allCookies.forEach((cookie) => {
    const cookieName = cookie.split("=")[0].trim();
    if (
      cookieName.toLowerCase().includes("better-auth") ||
      cookieName.toLowerCase().includes("better_auth") ||
      cookieName.toLowerCase().includes("session_token")
    ) {
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path}; domain=${domain};`;
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path};`;
    }
  });

  // 3. Nettoyer le localStorage et sessionStorage des données liées à l'auth
  try {
    const localStorageKeys = Object.keys(localStorage);
    localStorageKeys.forEach((key) => {
      if (
        key.toLowerCase().includes("auth") ||
        key.toLowerCase().includes("session") ||
        key.toLowerCase().includes("better")
      ) {
        localStorage.removeItem(key);
      }
    });
  } catch (error) {
    console.debug("Erreur lors du nettoyage du localStorage:", error);
  }

  try {
    const sessionStorageKeys = Object.keys(sessionStorage);
    sessionStorageKeys.forEach((key) => {
      if (
        key.toLowerCase().includes("auth") ||
        key.toLowerCase().includes("session") ||
        key.toLowerCase().includes("better")
      ) {
        sessionStorage.removeItem(key);
      }
    });
  } catch (error) {
    console.debug("Erreur lors du nettoyage du sessionStorage:", error);
  }
}

// Wrapper pour permettre l'inscription sans passer `name`
export async function signUpEmailNoName(params: {
  email: string;
  password: string;
}) {
  // @ts-expect-error: Le SDK tape `name` comme requis, mais on ne souhaite pas l'envoyer
  return signUp.email({
    email: params.email,
    password: params.password,
    fetchOptions: { disableValidation: true },
  });
}
