"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  LogIn,
  Mail,
  Lock,
  AlertCircle,
  Loader2,
  Shield,
  CheckCircle2,
} from "lucide-react";
import { signIn, clearAllAuthData, authClient } from "@/libs/auth-client";
import Header from "./header";

// Fonction pour traduire les messages d'erreur Better Auth en français
const translateError = (errorMessage: string): string => {
  const errorTranslations: Record<string, string> = {
    "Invalid password": "Mot de passe incorrect",
    "Invalid credentials": "Identifiants invalides",
    "User not found": "Utilisateur introuvable",
    "Invalid code": "Code invalide",
    "Invalid TOTP code": "Code TOTP invalide",
    "Two factor authentication required":
      "Authentification à deux facteurs requise",
    "Two factor code required":
      "Code d'authentification à deux facteurs requis",
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
  const [requiresTwoFactor, setRequiresTwoFactor] = useState(false);
  const [totpCode, setTotpCode] = useState("");
  const [verifyingTotp, setVerifyingTotp] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Vider tous les cookies et données de session Better Auth avant la connexion
    await clearAllAuthData();

    try {
      const res = await signIn.email(
        {
          email: email.trim(),
          password,
        },
        {
          async onSuccess(context) {
            // Selon la documentation Better Auth, vérifier twoFactorRedirect
            if (context.data?.twoFactorRedirect === true) {
              setRequiresTwoFactor(true);
              setLoading(false);
              return;
            }

            // Connexion réussie sans 2FA
            router.push("/academy");
            setLoading(false);
          },
        }
      );

      if (res.error) {
        const errorMessage = res.error.message || "Erreur lors de la connexion";
        setError(translateError(errorMessage));
        setLoading(false);
        return;
      }

      // Vérifier aussi dans la réponse directe (fallback si onSuccess n'a pas géré le cas)
      // Utiliser 'in' pour vérifier la présence de twoFactorRedirect comme suggéré dans la doc
      const hasTwoFactorRedirect =
        (res.data &&
          "twoFactorRedirect" in res.data &&
          res.data.twoFactorRedirect === true) ||
        ("twoFactorRedirect" in res && res.twoFactorRedirect === true);

      if (hasTwoFactorRedirect) {
        setRequiresTwoFactor(true);
        setLoading(false);
        return;
      }

      // Si pas d'erreur et pas de 2FA, laisser onSuccess gérer la redirection
      // Si onSuccess n'a pas été appelé, rediriger après un court délai
      if (!res.error && !hasTwoFactorRedirect) {
        // Attendre un peu pour laisser onSuccess s'exécuter si nécessaire
        setTimeout(() => {
          if (!requiresTwoFactor) {
            router.push("/academy");
            setLoading(false);
          }
        }, 50);
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? translateError(err.message)
          : "Erreur lors de la connexion"
      );
      setLoading(false);
    }
  }

  async function handleVerifyTotp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setVerifyingTotp(true);

    if (!totpCode || totpCode.length !== 6) {
      setError("Veuillez entrer un code à 6 chiffres");
      setVerifyingTotp(false);
      return;
    }

    try {
      const result = await authClient.twoFactor.verifyTotp({
        code: totpCode,
        trustDevice: true,
      });

      if (result.error) {
        const errorMessage =
          result.error.message || "Code invalide. Veuillez réessayer.";
        setError(translateError(errorMessage));
        setVerifyingTotp(false);
        return;
      }

      // Connexion réussie avec 2FA
      router.push("/academy");
    } catch (err) {
      setError(
        err instanceof Error
          ? translateError(err.message)
          : "Erreur lors de la vérification du code"
      );
      setVerifyingTotp(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-8 px-4">
      <div className="w-full max-w-2xl">
        <div className="space-y-6">
          <Header />

          {/* Formulaire de connexion */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="bg-white border border-gray-200 rounded-xl shadow-sm p-6"
          >
            {/* <div className="flex items-center gap-2 mb-4">
              <div className={`p-1.5 ${colorClasses.primary.bg} rounded-md`}>
                <LogIn className={`h-4 w-4 ${colorClasses.primary.text}`} />
              </div>
              <h2
                className={`text-lg font-semibold ${colorClasses.text.primary}`}
              >
                Connexion à votre compte
              </h2>
            </div> */}

            {/* Affichage des erreurs */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4 flex items-center gap-2"
              >
                <AlertCircle className="h-4 w-4 text-red-600" />
                <span className="text-sm text-red-700">{error}</span>
              </motion.div>
            )}

            {!requiresTwoFactor ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    <Mail className="h-3 w-3 inline mr-1" />
                    Adresse email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john.doe@santu.io"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading}
                    className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#7451EB] focus:border-[#7451EB] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    <Lock className="h-3 w-3 inline mr-1" />
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
                    className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#7451EB] focus:border-[#7451EB] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                  />
                </div>

                {/* Bouton de soumission */}
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full text-white font-semibold rounded-lg px-4 py-3 flex items-center justify-center transition-all duration-200 disabled:opacity-80 disabled:cursor-not-allowed"
                  style={{
                    backgroundColor: loading ? "#9ca3af" : "#7451EB",
                  }}
                  onMouseEnter={(e) => {
                    if (!loading) {
                      e.currentTarget.style.backgroundColor = "#6341d9";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!loading) {
                      e.currentTarget.style.backgroundColor = "#7451EB";
                    }
                  }}
                >
                  {loading ? (
                    <span className="inline-flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Connexion...
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1">
                      <LogIn className="h-4 w-4" />
                      Se connecter
                    </span>
                  )}
                </motion.button>
              </form>
            ) : (
              <form onSubmit={handleVerifyTotp} className="space-y-4">
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="h-4 w-4 text-[#7451EB]" />
                    <h3 className="text-base font-semibold text-gray-900">
                      Vérification en deux étapes
                    </h3>
                  </div>
                  <p className="text-xs text-gray-600">
                    Entrez le code à 6 chiffres généré par votre application
                    d'authentification (Microsoft Authenticator, Google
                    Authenticator, Authy, etc.)
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="totp"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    <Shield className="h-3 w-3 inline mr-1" />
                    Code d'authentification
                  </label>
                  <input
                    id="totp"
                    name="totp"
                    type="text"
                    placeholder="000000"
                    value={totpCode}
                    onChange={(e) =>
                      setTotpCode(e.target.value.replace(/\D/g, "").slice(0, 6))
                    }
                    maxLength={6}
                    required
                    disabled={verifyingTotp}
                    className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#7451EB] focus:border-[#7451EB] transition-all duration-200 text-center text-xl font-mono tracking-widest disabled:opacity-60 disabled:cursor-not-allowed"
                  />
                </div>

                <div className="flex gap-2">
                  <motion.button
                    type="button"
                    onClick={() => {
                      setRequiresTwoFactor(false);
                      setTotpCode("");
                      setError(null);
                    }}
                    disabled={verifyingTotp}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 bg-gray-100 text-gray-700 border border-gray-200 rounded-lg px-4 py-3 font-semibold transition-all duration-200 hover:bg-gray-200 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    Retour
                  </motion.button>
                  <motion.button
                    type="submit"
                    disabled={verifyingTotp || totpCode.length !== 6}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 text-white font-semibold rounded-lg px-4 py-3 flex items-center justify-center transition-all duration-200 disabled:opacity-80 disabled:cursor-not-allowed"
                    style={{
                      backgroundColor:
                        verifyingTotp || totpCode.length !== 6
                          ? "#9ca3af"
                          : "#7451EB",
                    }}
                    onMouseEnter={(e) => {
                      if (!verifyingTotp && totpCode.length === 6) {
                        e.currentTarget.style.backgroundColor = "#6341d9";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!verifyingTotp && totpCode.length === 6) {
                        e.currentTarget.style.backgroundColor = "#7451EB";
                      }
                    }}
                  >
                    {verifyingTotp ? (
                      <span className="inline-flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Vérification...
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1">
                        <CheckCircle2 className="h-4 w-4" />
                        Vérifier
                      </span>
                    )}
                  </motion.button>
                </div>
              </form>
            )}
          </motion.div>

          {/* Informations supplémentaires */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="bg-white border border-gray-200 rounded-xl shadow-sm p-6"
          >
            <div className="text-center">
              <h3 className="text-base font-semibold text-gray-900 mb-1">
                Pas encore de compte ?
              </h3>
              <p className="text-xs text-gray-600 mb-3">
                Créez votre compte pour accéder à toutes les fonctionnalités
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push("/sign-up")}
                className="bg-gray-100 text-gray-700 border border-gray-200 rounded-lg px-4 py-2 font-semibold transition-all duration-200 hover:bg-gray-200"
              >
                Créer un compte
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
