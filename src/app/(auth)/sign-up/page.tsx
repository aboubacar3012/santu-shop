"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  UserPlus,
  Mail,
  Lock,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { clearAllAuthData } from "@/libs/auth-client";
import Header from "./header";
import ModalConfirm from "@/components/ModalConfirm";

export default function SignUpPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Vider tous les cookies et données de session Better Auth avant la création de compte
    await clearAllAuthData();

    // Validation de l'email
    if (!email || !email.trim()) {
      setError("L'email est requis");
      setLoading(false);
      return;
    }

    // Validation des mots de passe
    if (password.length < 8) {
      setError("Le mot de passe doit contenir au moins 8 caractères");
      setLoading(false);
      return;
    }

    if (password !== passwordConfirmation) {
      setError("Les deux mots de passe ne correspondent pas");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        setError(
          data.error || "Une erreur est survenue lors de l'inscription."
        );
      } else {
        setShowSuccessModal(true);
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Une erreur est survenue lors de l'inscription"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-8 px-4">
      <div className="w-full max-w-2xl">
        <div className="space-y-6">
          <Header />

          {/* Formulaire d'inscription */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="bg-white border border-gray-200 rounded-xl shadow-sm p-6"
          >
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

              <div>
                <label
                  htmlFor="passwordConfirmation"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  <Lock className="h-3 w-3 inline mr-1" />
                  Confirmation du mot de passe
                </label>
                <input
                  id="passwordConfirmation"
                  name="passwordConfirmation"
                  type="password"
                  placeholder="Confirmation du mot de passe"
                  value={passwordConfirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
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
                    Création du compte...
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1">
                    <UserPlus className="h-4 w-4" />
                    Créer mon compte
                  </span>
                )}
              </motion.button>
            </form>
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
                Déjà un compte ?
              </h3>
              <p className="text-xs text-gray-600 mb-3">
                Connectez-vous à votre compte existant
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push("/sign-in")}
                className="bg-gray-100 text-gray-700 border border-gray-200 rounded-lg px-4 py-2 font-semibold transition-all duration-200 hover:bg-gray-200"
              >
                Se connecter
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>

    <ModalConfirm
      isOpen={showSuccessModal}
      onClose={() => setShowSuccessModal(false)}
      onConfirm={() => {
        setShowSuccessModal(false);
        router.push("/sign-in");
      }}
      title="Compte créé"
      message="Votre compte a bien été créé. Vous pouvez maintenant vous connecter."
      confirmLabel="Se connecter"
      cancelLabel="Fermer"
    />
    </>
  );
}
