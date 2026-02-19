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
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  appName: "Santu Academy",

  emailAndPassword: {
    enabled: true,
  },

  trustedOrigins: [
    "http://localhost:3001", // Port de développement alternatif
    "http://localhost:3000", // Port de développement standard
    "http://192.168.1.32:3000", // Adresse IP locale pour les tests réseau
    "https://hub.santu.io",
    "https://www.santu.io", // Production
    "https://santu.io",
  ],
});
