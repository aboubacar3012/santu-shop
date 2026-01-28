"use client";
import { useState, useEffect, useCallback } from "react";
import {
  Shield,
  ArrowLeft,
  FileText,
  Lock,
  Database,
  UserX,
  Trash2,
  Mail,
  ChevronsRight,
  ExternalLink
} from "lucide-react";
import { useRouter } from "next/navigation";
import Head from "next/head";
import Link from "next/link";

// Sections de la politique de confidentialité
const privacySections = [
  {
    id: "introduction",
    title: "Introduction",
    icon: <FileText className="h-5 w-5 text-orange-600" />,
    content: `CloudHero est conçu dans le respect total de votre vie privée. Notre approche est simple : nous ne collectons aucune donnée personnelle des utilisateurs. Cette politique de confidentialité explique notre approche minimaliste en matière de données.`,
  },
  {
    id: "data-storage",
    title: "Stockage de données",
    icon: <Database className="h-5 w-5 text-orange-600" />,
    content: `Nous utilisons exclusivement le stockage local (localStorage) de votre navigateur pour sauvegarder vos progrès de quiz en cours. Ces données restent sur votre appareil et ne sont jamais transmises à nos serveurs. Elles incluent uniquement vos réponses aux questions, le score et la progression du quiz en cours.`,
  },
  {
    id: "no-collection",
    title: "Absence de collecte de données",
    icon: <UserX className="h-5 w-5 text-orange-600" />,
    content: `Nous ne collectons aucune information personnelle identifiable telle que votre nom, adresse e-mail, ou informations de contact. Nous ne suivons pas votre comportement de navigation et ne créons pas de profils utilisateurs. CloudHero fonctionne sans compte utilisateur et sans système d'authentification.`,
  },
  {
    id: "third-parties",
    title: "Absence de tiers",
    icon: <Shield className="h-5 w-5 text-orange-600" />,
    content: `Nous n'utilisons pas de cookies tiers et ne partageons aucune information avec des services d'analyse ou de publicité. Votre utilisation de CloudHero reste entièrement privée.`,
  },
  {
    id: "user-rights",
    title: "Droits des utilisateurs",
    icon: <Lock className="h-5 w-5 text-orange-600" />,
    content: `Vous avez un contrôle total sur les données stockées localement. Pour effacer toutes les données de CloudHero, vous pouvez à tout moment effacer le localStorage de votre navigateur pour notre site. Nous n'avons pas besoin d'offrir d'options d'exportation ou de suppression de données puisque nous ne stockons aucune information sur nos serveurs.`,
  },
  {
    id: "data-deletion",
    title: "Suppression des données",
    icon: <Trash2 className="h-5 w-5 text-orange-600" />,
    content: `Pour supprimer les données locales de CloudHero, vous pouvez :
    1. Accéder aux paramètres de votre navigateur
    2. Rechercher les options de confidentialité ou de stockage
    3. Effacer les données de site pour cloudhero.app
    
    Alternativement, utiliser le mode de navigation privée empêchera tout stockage permanent des données de quiz.`,
  },
];

export default function PrivacyPage() {
  const router = useRouter();
  const [expandedSection, setExpandedSection] = useState<string | null>(
    "introduction"
  );


  // Optimisation avec useCallback
  const toggleSection = useCallback((sectionId: string) => {
    setExpandedSection((prevSection: string | null) => {
      const newSection = prevSection === sectionId ? null : sectionId;
      
      if (newSection !== null) {
        window.history.replaceState(null, "", `#${sectionId}`);
      } else {
        window.history.replaceState(null, "", window.location.pathname);
      }
      
      return newSection;
    });
  }, []);

  // Gestion des ancres dans l'URL
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const sectionId = hash.substring(1);
      const section = privacySections.find((s) => s.id === sectionId);
      if (section) {
        setExpandedSection(sectionId);

        // Faire défiler jusqu'à la section uniquement à l'initialisation
        setTimeout(() => {
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 300);
      }
    }
  }, []);

  return (
    <>
      <Head>
        <title>Politique de confidentialité - CloudHero</title>
        <meta
          name="description"
          content="Notre politique de confidentialité expliquant comment CloudHero respecte et protège votre vie privée."
        />
        <meta
          name="keywords"
          content="confidentialité, CloudHero, protection des données, RGPD, politique de confidentialité"
        />
      </Head>

      <main className="pt-safe px-safe pb-safe min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 overflow-hidden">
        <div className="w-full max-w-4xl mx-auto flex flex-col">
          <header className="sticky top-0 z-10 bg-orange-50/80 backdrop-blur-lg">
            <div className="px-4 py-4 flex items-center justify-between">
              <div className="flex items-center">
                <button
                  onClick={() => router.back()}
                  className="p-2 rounded-full hover:bg-orange-100 active:bg-orange-200 transition-all"
                  aria-label="Retour"
                >
                  <ArrowLeft className="h-5 w-5 text-orange-600" />
                </button>
                <h1 className="text-xl font-bold ml-2 text-gray-800">
                  Politique de confidentialité
                </h1>
              </div>
              <nav className="hidden md:block">
                <ul className="flex space-x-6">
                  <li>
                    <a
                      href="#introduction"
                      className="text-orange-600 hover:text-orange-800 font-medium transition-colors"
                    >
                      Introduction
                    </a>
                  </li>
                  <li>
                    <a
                      href="#data-storage"
                      className="text-orange-600 hover:text-orange-800 font-medium transition-colors"
                    >
                      Stockage
                    </a>
                  </li>
                  <li>
                    <a
                      href="#user-rights"
                      className="text-orange-600 hover:text-orange-800 font-medium transition-colors"
                    >
                      Vos droits
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </header>

          <div className="px-4 py-2 mb-16 sm:px-6 md:px-8">
            {/* Banner visible uniquement sur desktop - améliorée */}
            <div className="mb-8 relative overflow-hidden rounded-2xl shadow-lg">
              <div className="bg-gradient-to-r from-orange-500 to-orange-400 text-white p-6 sm:p-8 rounded-2xl">
                <div className="max-w-3xl relative z-10">
                  <h2 className="text-2xl font-bold mb-3">
                    Votre vie privée est notre priorité
                  </h2>
                  <p className="text-orange-50 text-lg mb-4">
                    CloudHero fonctionne sans collecter vos données
                    personnelles. Découvrez notre approche minimaliste en
                    matière de confidentialité.
                  </p>
                  <div className="flex flex-wrap gap-3 mt-4">
                    <a
                      href="#data-storage"
                      className="bg-white text-orange-600 px-5 py-2 rounded-lg font-medium hover:bg-orange-50 transition-all inline-flex items-center"
                    >
                      <Database className="h-4 w-4 mr-2" />
                      Stockage des données
                    </a>
                    <a
                      href="#data-deletion"
                      className="bg-orange-700 text-white px-5 py-2 rounded-lg font-medium hover:bg-orange-800 transition-all inline-flex items-center"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Suppression
                    </a>
                  </div>
                </div>
                <div className="absolute right-0 top-0 h-full w-1/3 opacity-20">
                  <svg
                    viewBox="0 0 100 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-full"
                  >
                    <circle cx="80" cy="50" r="40" fill="white" />
                    <circle cx="20" cy="80" r="20" fill="white" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Introduction */}
            <section className="mb-8">
              <div className="bg-white p-5 sm:p-6 md:p-8 rounded-xl shadow-md border border-orange-100 mb-5">
                <div className="flex items-start sm:items-center mb-3 md:mb-4">
                  <div className="bg-orange-100 p-2 md:p-3 rounded-lg mr-3 flex-shrink-0">
                    <Shield className="h-6 w-6 md:h-7 md:w-7 text-orange-600" />
                  </div>
                  <div>
                    <h2 className="text-lg md:text-xl font-bold text-gray-800">
                      Politique de confidentialité CloudHero
                    </h2>
                    <p className="text-sm text-orange-600 font-medium hidden sm:block">
                      Protection et respect de vos données
                    </p>
                  </div>
                </div>
                <p className="text-sm md:text-base text-gray-600 max-w-3xl leading-relaxed">
                  Cette politique a été mise à jour le{" "}
                  {new Date().toLocaleDateString()} et explique comment
                  CloudHero gère les données. Notre principe fondamental : nous
                  ne collectons aucune donnée personnelle et utilisons
                  uniquement le stockage local de votre navigateur pour
                  maintenir votre progression dans les quiz.
                </p>
                <div className="mt-5 lg:hidden">
                  <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0">
                    <a
                      href="#user-rights"
                      className="bg-orange-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-700 transition-colors text-center flex items-center justify-center"
                    >
                      <Lock className="h-4 w-4 mr-2" />
                      Vos droits
                    </a>
                    <a
                      href="#data-deletion"
                      className="border border-orange-500 text-orange-600 px-4 py-2 rounded-lg font-medium hover:bg-orange-50 transition-colors text-center flex items-center justify-center"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Effacer mes données
                    </a>
                  </div>
                </div>
              </div>
            </section>

            {/* Privacy Sections */}
            <section className="mb-12" id="privacy-details">
              <div className="space-y-3">
                {privacySections.map((section) => (
                  <div
                    key={section.id}
                    id={section.id}
                    className="bg-white rounded-xl shadow-sm overflow-hidden border border-orange-100"
                  >
                    <button
                      onClick={() => toggleSection(section.id)}
                      className="w-full px-5 py-4 text-left flex items-center justify-between focus:outline-none focus:bg-orange-50 focus:bg-opacity-50"
                      aria-expanded={expandedSection === section.id}
                      aria-controls={`section-content-${section.id}`}
                    >
                      <span className="font-medium text-gray-800 flex items-center">
                        <span className="mr-3 bg-orange-100 p-2 rounded-lg hidden sm:inline-flex">
                          {section.icon}
                        </span>
                        {section.title}
                      </span>
                      <div
                        className={`p-1 rounded-full bg-orange-100 text-orange-600 transition-transform ${
                          expandedSection === section.id ? "rotate-180" : ""
                        }`}
                      >
                        <ChevronsRight className="w-4 h-4" />
                      </div>
                    </button>
                    {expandedSection === section.id && (
                      <div className="overflow-hidden">
                        <div className="px-5 pb-4 text-sm text-gray-600 border-t border-orange-100 md:text-base pt-3 whitespace-pre-line">
                          {section.content}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              {/* Suggestion d'action */}
              <div className="mt-8 bg-orange-50 rounded-xl p-5 border border-orange-100 text-center">
                <p className="text-gray-700">
                  Vous avez des questions sur le traitement de vos données ?
                </p>
                <div className="mt-3">
                  <a
                    href="#contact"
                    className="inline-flex items-center justify-center text-orange-600 hover:text-orange-700 font-medium"
                  >
                    Contactez-nous
                    <ArrowLeft className="h-4 w-4 ml-2 rotate-180" />
                  </a>
                </div>
              </div>
            </section>

            {/* Contact Section - redesign */}
            <section id="contact" className="mb-8">
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-4 px-1 flex items-center">
                <Mail className="h-6 w-6 mr-2 text-orange-600" />
                Questions sur la confidentialité
              </h2>
              <div className="bg-white p-5 rounded-xl shadow-sm border border-orange-100 hover:shadow-md transition-shadow">
                <p className="text-sm text-gray-600 mb-4 md:mb-5">
                  Si vous avez des questions concernant notre politique de
                  confidentialité, n&apos;hésitez pas à nous contacter :
                </p>
                <Link
                  href="mailto:privacy@cloudhero.app"
                  className="text-orange-500 inline-flex items-center hover:text-orange-600 font-medium bg-orange-50 py-2 px-4 rounded-lg transition-colors"
                >
                  <Mail className="h-4 w-4 mr-2" /> privacy@cloudhero.app
                  <ExternalLink className="h-3.5 w-3.5 ml-2" />
                </Link>
              </div>
            </section>

            {/* Legal & Privacy */}
            <section className="mt-16 mb-4">
              <div className="flex flex-wrap justify-center gap-y-2 gap-x-6 text-sm text-gray-600">
                <Link
                  href="/conditions"
                  className="hover:text-orange-600 hover:underline transition-all"
                >
                  Conditions d&apos;utilisation
                </Link>
                <Link
                  href="/help"
                  className="hover:text-orange-600 hover:underline transition-all"
                >
                  Centre d&apos;aide
                </Link>
                <Link
                  href="/privacy"
                  className="hover:text-orange-600 hover:underline transition-all"
                >
                  Confidentialité
                </Link>
                <Link
                  href="/accessibility"
                  className="hover:text-orange-600 hover:underline transition-all"
                >
                  Accessibilité
                </Link>
              </div>
            </section>
          </div>

          {/* Footer pour version web - amélioré */}
          <footer className="bg-white border-t border-orange-100 py-6 px-4 mt-auto hidden md:block">
            <div className="max-w-4xl mx-auto flex flex-wrap justify-between items-center">
              <p className="text-sm text-gray-600">
                © {new Date().getFullYear()} CloudHero. Tous droits réservés.
              </p>
              <div className="flex space-x-4 items-center">
                {/* Réseaux sociaux */}
                <a
                  href="https://twitter.com/cloudhero"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                  className="text-gray-500 hover:text-orange-600 transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a
                  href="https://linkedin.com/company/cloudhero"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="text-gray-500 hover:text-orange-600 transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
                <a
                  href="https://github.com/cloudhero"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="text-gray-500 hover:text-orange-600 transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </footer>
        </div>
      </main>
    </>
  );
}
