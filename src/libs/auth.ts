import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "@/libs/prisma";

/**
 * Configuration de l'authentification Better Auth
 *
 * Ce fichier configure l'authentification pour l'application en utilisant Better Auth
 * avec authentification par email et mot de passe.
 */
export const auth = betterAuth({
  // Configuration de la base de données avec Prisma
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  appName: "Santu Academy",

  // Activation de l'authentification par email et mot de passe
  emailAndPassword: {
    enabled: true,
  },

  // Configuration des origines de confiance
  // Liste des domaines/origines autorisés pour les requêtes CORS
  trustedOrigins: [
    "http://localhost:3001", // Port de développement alternatif
    "http://localhost:3000", // Port de développement standard
    "http://192.168.1.32:3000", // Adresse IP locale pour les tests réseau
    "https://hub.santu.io", // URL de production
  ],
});
