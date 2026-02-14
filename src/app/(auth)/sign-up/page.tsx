"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  UserPlus,
  Mail,
  Lock,
  LockKeyhole,
  AlertCircle,
  Loader2,
  ArrowLeft,
} from "lucide-react";
import { clearAllAuthData } from "@/libs/auth-client";
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

    await clearAllAuthData();

    if (!email?.trim()) {
      setError("L'email est requis");
      setLoading(false);
      return;
    }

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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        setError(data.error || "Une erreur est survenue lors de l'inscription.");
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
                  Créer un compte
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                  Inscrivez-vous pour commander sur Santu et suivre vos livraisons.
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
                      placeholder="Au moins 8 caractères"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      disabled={loading}
                      className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-shadow disabled:opacity-60 disabled:cursor-not-allowed"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="passwordConfirmation"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      <LockKeyhole className="h-3.5 w-3.5 inline mr-1.5 text-gray-500" />
                      Confirmer le mot de passe
                    </label>
                    <input
                      id="passwordConfirmation"
                      name="passwordConfirmation"
                      type="password"
                      placeholder="Saisissez à nouveau le mot de passe"
                      value={passwordConfirmation}
                      onChange={(e) => setPasswordConfirmation(e.target.value)}
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
                        Création du compte...
                      </span>
                    ) : (
                      <span className="inline-flex items-center justify-center gap-2">
                        <UserPlus className="h-4 w-4" />
                        Créer mon compte
                      </span>
                    )}
                  </motion.button>
                </form>
              </div>
            </motion.div>

            <p className="mt-6 text-center text-sm text-gray-500">
              Déjà un compte ?{" "}
              <Link
                href="/sign-in"
                className="font-medium text-gray-900 hover:underline"
              >
                Se connecter
              </Link>
            </p>
          </div>
        </main>
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
