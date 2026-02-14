"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { LogIn, Mail, Lock, AlertCircle, Loader2, ArrowLeft } from "lucide-react";
import { signIn, clearAllAuthData } from "@/libs/auth-client";

const translateError = (errorMessage: string): string => {
  const errorTranslations: Record<string, string> = {
    "Invalid password": "Mot de passe incorrect",
    "Invalid credentials": "Identifiants invalides",
    "User not found": "Utilisateur introuvable",
    "Invalid code": "Code invalide",
  };

  if (errorTranslations[errorMessage]) {
    return errorTranslations[errorMessage];
  }

  const lowerErrorMessage = errorMessage.toLowerCase();
  for (const [key, translation] of Object.entries(errorTranslations)) {
    if (lowerErrorMessage.includes(key.toLowerCase())) {
      return translation;
    }
  }

  return errorMessage;
};

export default function SignInPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    await clearAllAuthData();

    try {
      const res = await signIn.email(
        {
          email: email.trim(),
          password,
        },
        {
          onSuccess() {
            router.push("/home");
            setLoading(false);
          },
        }
      );

      if (res.error) {
        const errorMessage = res.error.message || "Erreur lors de la connexion";
        setError(translateError(errorMessage));
      } else {
        setTimeout(() => router.push("/home"), 50);
      }
      setLoading(false);
    } catch (err) {
      setError(
        err instanceof Error
          ? translateError(err.message)
          : "Erreur lors de la connexion"
      );
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <main className="flex-1 flex items-center justify-center py-8 px-4 sm:py-12">
        <div className="w-full max-w-md">
          <Link
            href="/home"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour à l'accueil
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden"
          >
            <div className="p-6 sm:p-8 border-b border-gray-100">
              <h1 className="text-xl font-semibold text-gray-900">
                Se connecter
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Accédez à votre compte pour commander et suivre vos livraisons.
              </p>
            </div>

            <div className="p-6 sm:p-8">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 flex items-center gap-2 rounded-lg bg-red-50 border border-red-100 px-3 py-2.5 text-sm text-red-700"
                >
                  <AlertCircle className="h-4 w-4 shrink-0 text-red-600" />
                  <span>{error}</span>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    <Mail className="h-3.5 w-3.5 inline mr-1.5 text-gray-500" />
                    Adresse email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="vous@exemple.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading}
                    className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-shadow disabled:opacity-60 disabled:cursor-not-allowed"
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    <Lock className="h-3.5 w-3.5 inline mr-1.5 text-gray-500" />
                    Mot de passe
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loading}
                    className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-shadow disabled:opacity-60 disabled:cursor-not-allowed"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="w-full mt-2 py-3 px-4 rounded-lg border-2 border-gray-900 bg-gray-900 text-white font-medium hover:bg-gray-800 hover:border-gray-800 transition-colors disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:bg-gray-900"
                >
                  {loading ? (
                    <span className="inline-flex items-center justify-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Connexion...
                    </span>
                  ) : (
                    <span className="inline-flex items-center justify-center gap-2">
                      <LogIn className="h-4 w-4" />
                      Se connecter
                    </span>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>

          <p className="mt-6 text-center text-sm text-gray-500">
            Pas encore de compte ?{" "}
            <Link
              href="/sign-up"
              className="font-medium text-gray-900 hover:underline"
            >
              Créer un compte
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
