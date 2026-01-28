"use client";
import { useState, useEffect, useMemo, useCallback } from "react";
import {
  Mail,
  Phone,
  MessageSquare,
  HelpCircle,
  ArrowLeft,
  ExternalLink,
  Code,
  BookOpen,
  GraduationCap,
  ChevronsRight,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Head from "next/head";
import Link from "next/link";

// FAQ data avec le contenu adapté à KodeCraft
const faqItems = [
  {
    question: "Comment fonctionne KodeCraft ?",
    answer:
      "KodeCraft est une plateforme d'apprentissage interactive dédiée au développement et à la programmation. Parcourez nos cours structurés, suivez des tutoriels vidéo, pratiquez avec des exercices interactifs et développez des projets concrets pour maîtriser différents langages et technologies de programmation.",
  },
  {
    question: "Les cours sont-ils à jour avec les dernières technologies ?",
    answer:
      "Absolument ! Notre équipe d'experts et de développeurs met régulièrement à jour tous nos contenus pour refléter les dernières évolutions des langages de programmation, frameworks et bonnes pratiques de l'industrie du développement.",
  },
  {
    question: "Puis-je obtenir de l'aide sur un exercice spécifique ?",
    answer:
      "Oui, KodeCraft dispose d'une communauté active d'apprenants et de mentors. Vous pouvez poser des questions dans les forums de discussion associés à chaque cours, participer à des sessions d'entraide en direct ou contacter directement notre équipe de support par e-mail à support@kodecraft.io.",
  },
  {
    question: "Les contenus sont-ils accessibles hors ligne ?",
    answer:
      "Une grande partie des cours textuels est disponible hors ligne après un premier chargement. Cependant, les vidéos, exercices interactifs et certaines fonctionnalités nécessitent une connexion internet. Nous travaillons actuellement sur l'amélioration de l'expérience hors ligne.",
  },
  {
    question: "Comment suivre ma progression d'apprentissage ?",
    answer:
      "KodeCraft offre un tableau de bord personnel qui suit votre progression dans chaque cours, vos réalisations, les badges obtenus et votre parcours d'apprentissage. Consultez la section 'Mon profil' pour visualiser toutes vos statistiques et suivre votre évolution.",
  },
  {
    question: "Quels langages et technologies puis-je apprendre sur KodeCraft ?",
    answer:
      "Notre plateforme couvre un large éventail de technologies incluant HTML/CSS, JavaScript, TypeScript, React, Node.js, Python, Java, Docker, AWS et bien d'autres. Nous ajoutons régulièrement de nouveaux cours pour couvrir les technologies émergentes et les demandes du marché.",
  },
];

export default function HelpPage() {
  const router = useRouter();
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // Mémoriser les méthodes de contact pour éviter les re-rendus inutiles
  const contactMethods = useMemo(() => [
    {
      icon: <Mail className="h-5 w-5" />,
      title: "Email",
      detail: "support@kodecraft.io",
      action: "Nous envoyer un email",
      link: "mailto:support@kodecraft.io",
    },
    {
      icon: <MessageSquare className="h-5 w-5" />,
      title: "Chat communautaire",
      detail: "Réponse < 2h en semaine",
      action: "Rejoindre le Discord",
      link: "https://discord.gg/kodecraft",
    },
    {
      icon: <Phone className="h-5 w-5" />,
      title: "Assistance",
      detail: "+33 (0)1 23 45 67 89",
      action: "Prendre RDV",
      link: "https://calendly.com/kodecraft/support",
    },
  ], []);


  // Optimisation avec useCallback - modification pour ne plus faire défiler
  const toggleFaq = useCallback((index: number) => {
    setExpandedFaq((prevIndex: number | null) => {
      const newIndex = prevIndex === index ? null : index;
      
      // Mise à jour de l'URL avec une ancre pour permettre le partage direct
      // mais sans forcer le défilement
      if (newIndex !== null) {
        window.history.replaceState(null, "", `#faq-${index}`);
      } else {
        window.history.replaceState(null, "", window.location.pathname);
      }
      
      return newIndex;
    });
  }, []);

  // Gestion des ancres de FAQ dans l'URL
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const faqIndex = parseInt(hash.replace("#faq-", ""));
      if (!isNaN(faqIndex) && faqIndex >= 0 && faqIndex < faqItems.length) {
        setExpandedFaq(faqIndex);
        
        // Défilement doux uniquement lors du chargement initial avec une ancre
        setTimeout(() => {
          const element = document.getElementById(`faq-${faqIndex}`);
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
        <title>Centre d&apos;Aide - KodeCraft</title>
        <meta
          name="description"
          content="Trouvez des réponses à vos questions sur KodeCraft, la plateforme d&apos;apprentissage pour les développeurs."
        />
        <meta
          name="keywords"
          content="KodeCraft, programmation, développement, cours, tutoriels, aide, FAQ, support"
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
                  Centre d&apos;aide
                </h1>
              </div>
              <nav className="hidden md:block">
                <ul className="flex space-x-6">
                  <li>
                    <a
                      href="#faq"
                      className="text-orange-600 hover:text-orange-800 font-medium transition-colors"
                    >
                      FAQ
                    </a>
                  </li>
                  <li>
                    <a
                      href="#contact"
                      className="text-orange-600 hover:text-orange-800 font-medium transition-colors"
                    >
                      Contact
                    </a>
                  </li>
                  <li>
                    <a
                      href="#resources"
                      className="text-orange-600 hover:text-orange-800 font-medium transition-colors"
                    >
                      Ressources
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </header>

          <div className="px-4 py-2 mb-16 sm:px-6 md:px-8">
            {/* Banner avec appel à l'action - version desktop */}
            <div className="hidden lg:block mb-8 relative overflow-hidden rounded-2xl shadow-lg">
              <div className="bg-gradient-to-r from-orange-500 to-orange-400 text-white p-8 rounded-2xl">
                <div className="max-w-3xl relative z-10">
                  <h2 className="text-2xl font-bold mb-3">
                    Comment pouvons-nous vous aider ?
                  </h2>
                  <p className="text-orange-50 text-lg mb-4">
                    Trouvez des réponses dans notre documentation, posez vos questions à la communauté 
                    ou contactez-nous directement.
                  </p>
                  <div className="flex flex-wrap gap-4 mt-2">
                    <a
                      href="#faq"
                      className="bg-white text-orange-600 px-5 py-2 rounded-lg font-medium hover:bg-orange-50 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-orange-600 focus:outline-none transition-all"
                    >
                      Voir la FAQ
                    </a>
                    <a
                      href="#contact"
                      className="bg-orange-700 text-white px-5 py-2 rounded-lg font-medium hover:bg-orange-800 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-orange-600 focus:outline-none transition-all"
                    >
                      Nous contacter
                    </a>
                    <a
                      href="/learning"
                      className="bg-orange-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-orange-700 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-orange-600 focus:outline-none transition-all flex items-center"
                    >
                      <BookOpen className="h-4 w-4 mr-2" />
                      Explorer les cours
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

            {/* Introduction avec optimisation mobile et desktop */}
            <section className="mb-8">
              <div className="bg-white p-5 sm:p-6 md:p-8 rounded-xl shadow-md border border-orange-100 mb-5">
                <div className="flex items-start sm:items-center mb-3 md:mb-4">
                  <div className="bg-orange-100 p-2 md:p-3 rounded-lg mr-3 flex-shrink-0">
                    <GraduationCap className="h-6 w-6 md:h-7 md:w-7 text-orange-600" />
                  </div>
                  <div>
                    <h2 className="text-lg md:text-xl font-bold text-gray-800">
                      Centre d&apos;aide KodeCraft
                    </h2>
                    <p className="text-sm text-orange-600 font-medium hidden sm:block">
                      Votre parcours d&apos;apprentissage simplifié
                    </p>
                  </div>
                </div>
                <p className="text-sm md:text-base text-gray-600 max-w-3xl leading-relaxed">
                  Bienvenue dans notre centre d&apos;assistance. Que vous débutiez en programmation 
                  ou que vous soyez déjà expert, nous sommes là pour vous aider à tirer le meilleur 
                  parti de KodeCraft et vous accompagner dans votre progression.
                </p>
                <div className="mt-5 lg:hidden">
                  <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0">
                    <a
                      href="#faq"
                      className="bg-orange-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-700 transition-colors text-center flex items-center justify-center"
                    >
                      <HelpCircle className="h-4 w-4 mr-2" />
                      Voir la FAQ
                    </a>
                    <a
                      href="#contact"
                      className="border border-orange-500 text-orange-600 px-4 py-2 rounded-lg font-medium hover:bg-orange-50 transition-colors text-center flex items-center justify-center"
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Nous contacter
                    </a>
                  </div>
                </div>
              </div>
            </section>

            {/* FAQ Section avec UX améliorée */}
            <section className="mb-12" id="faq">
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-4 px-1 flex items-center">
                <HelpCircle className="h-6 w-6 mr-2 text-orange-600" />
                Questions fréquentes
              </h2>
              <div className="space-y-3">
                {faqItems.map((item, index) => (
                  <div
                    key={index}
                    id={`faq-${index}`}
                    className="bg-white rounded-xl shadow-sm overflow-hidden border border-orange-100"
                  >
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full px-5 py-4 text-left flex items-center justify-between focus:outline-none focus:bg-orange-50 focus:bg-opacity-50"
                      aria-expanded={expandedFaq === index}
                      aria-controls={`faq-content-${index}`}
                    >
                      <span className="font-medium text-gray-800">
                        {item.question}
                      </span>
                      <div
                        className={`p-1 rounded-full bg-orange-100 text-orange-600 transition-transform ${
                          expandedFaq === index ? "rotate-180" : ""
                        }`}
                      >
                        <ChevronsRight className="w-4 h-4" />
                      </div>
                    </button>
                    {expandedFaq === index && (
                      <div className="overflow-hidden">
                        <div className="px-5 pb-4 text-sm text-gray-600 border-t border-orange-100 md:text-base pt-3">
                          {item.answer}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Suggestion de question non trouvée */}
              <div className="mt-8 bg-orange-50 rounded-xl p-5 border border-orange-100 text-center">
                <p className="text-gray-700">
                  Vous n&apos;avez pas trouvé ce que vous cherchiez ?
                </p>
                <div className="mt-3">
                  <a
                    href="#contact"
                    className="inline-flex items-center justify-center text-orange-600 hover:text-orange-700 font-medium"
                  >
                    Contactez notre équipe
                    <ArrowLeft className="h-4 w-4 ml-2 rotate-180" />
                  </a>
                </div>
              </div>
            </section>

            {/* Resource Section - Nouvelle section */}
            <section className="mb-12" id="resources">
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-4 px-1 flex items-center">
                <BookOpen className="h-6 w-6 mr-2 text-orange-600" />
                Ressources utiles
              </h2>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    title: "Documentation",
                    description: "Guides détaillés et références techniques",
                    icon: <Code className="h-5 w-5" />,
                    link: "/docs",
                  },
                  {
                    title: "Tutoriels vidéo",
                    description: "Apprenez visuellement avec nos instructeurs",
                    icon: <BookOpen className="h-5 w-5" />,
                    link: "/tutorials",
                  },
                  {
                    title: "Forum communautaire",
                    description: "Posez vos questions et partagez vos connaissances",
                    icon: <MessageSquare className="h-5 w-5" />,
                    link: "/community",
                  },
                ].map((resource, index) => (
                  <a
                    key={index}
                    href={resource.link}
                    className="bg-white p-4 rounded-xl shadow-sm border border-orange-100 hover:shadow-md transition-all group"
                  >
                    <div className="flex items-start">
                      <div className="bg-orange-100 p-2 rounded-lg mr-3">
                        {resource.icon}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800 group-hover:text-orange-600 transition-colors">
                          {resource.title}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1">
                          {resource.description}
                        </p>
                      </div>
                      <div className="ml-auto opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                        <ArrowLeft className="h-4 w-4 text-orange-500 rotate-180" />
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </section>

            {/* Contact Section - Redesignée */}
            <section id="contact" className="mb-12">
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-4 px-1 flex items-center">
                <MessageSquare className="h-6 w-6 mr-2 text-orange-600" />
                Nous contacter
              </h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {contactMethods.map((method: typeof contactMethods[0], index: number) => (
                  <div
                    key={index}
                    className="bg-white p-5 rounded-xl shadow-sm flex items-start flex-col border border-orange-100 transition-all h-full hover:shadow-md"
                  >
                    <div className="bg-orange-100 p-3 rounded-lg mb-3">
                      {method.icon}
                    </div>
                    <div className="mb-4">
                      <h3 className="font-semibold text-gray-800 mb-0.5">
                        {method.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {method.detail}
                      </p>
                    </div>
                    <Link
                      href={method.link}
                      className="mt-auto text-orange-600 text-sm font-medium flex items-center hover:text-orange-800 transition-colors"
                      aria-label={method.action}
                    >
                      {method.action}
                      <ExternalLink className="h-3.5 w-3.5 ml-1" />
                    </Link>
                  </div>
                ))}
              </div>
            </section>

            {/* Legal & Privacy - Version améliorée */}
            <section className="mt-16 mb-4">
              <div className="flex flex-wrap justify-center gap-y-2 gap-x-6 text-sm text-gray-600">
                <Link
                  href="/conditions"
                  className="hover:text-orange-600 hover:underline transition-all"
                >
                  Conditions d&apos;utilisation
                </Link>
                <Link
                  href="/privacy"
                  className="hover:text-orange-600 hover:underline transition-all"
                >
                  Politique de confidentialité
                </Link>
                <Link
                  href="/cookies"
                  className="hover:text-orange-600 hover:underline transition-all"
                >
                  Gestion des cookies
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

          {/* Footer optimisé */}
          <footer className="bg-white border-t border-orange-100 py-6 px-4 mt-auto hidden md:block">
            <div className="max-w-4xl mx-auto flex flex-wrap justify-between items-center">
              <p className="text-sm text-gray-600">
                © {new Date().getFullYear()} KodeCraft. Tous droits réservés.
              </p>
              <div className="flex space-x-4 items-center">
                {/* Réseaux sociaux */}
                <a
                  href="https://twitter.com/kodecraft"
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
                  href="https://linkedin.com/company/kodecraft"
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
                  href="https://github.com/kodecraft"
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
