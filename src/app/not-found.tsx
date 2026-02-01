"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className="no-scrollbar sm:small-scrollbar min-h-screen bg-gray-50">
      {/* Hero Header avec le même style que la page learning */}
      <header className="pt-safe relative overflow-hidden bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white">
        {/* Background elements - version statique */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-violet-500 rounded-full opacity-20 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-violet-600 rounded-full opacity-10 blur-3xl" />
          <div className="absolute top-1/4 left-1/3 w-40 h-40 bg-violet-400 rounded-full opacity-5 blur-2xl" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/30" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex justify-center">
          <div className="flex flex-col justify-center items-center w-full max-w-4xl pt-4 pb-14 md:pt-16 md:pb-14 lg:pt-20 lg:pb-16">
            <div className="text-center w-full">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-6"
              >
                <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold tracking-tight mb-4">
                  <span className="bg-gradient-to-r from-violet-400 to-violet-600 bg-clip-text text-transparent">
                    404
                  </span>
                </h1>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-2 sm:mb-3">
                  Page non trouvée
                </h2>
              </motion.div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-2 sm:mt-3 max-w-2xl mx-auto text-sm sm:text-base md:text-xl text-gray-300"
              >
                Désolé, la page que vous recherchez n&apos;existe pas ou a été déplacée.
              </motion.p>
            </div>
          </div>
        </div>
        
        {/* Bottom curve */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 38">
            <path fill="#f9fafb" fillOpacity="1" d="M0,32L80,26.7C160,21,320,11,480,10.7C640,11,800,21,960,26.7C1120,32,1280,32,1360,32L1440,32L1440,40L1360,40C1280,40,1120,40,960,40C800,40,640,40,480,40C320,40,160,40,80,40L0,40Z"></path>
          </svg>
        </div>
      </header>

      {/* Espacement dynamique */}
      <div className="h-2 sm:h-3 md:h-4"></div>

      {/* Contenu principal */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Illustration ou icône */}
          <div className="mb-8">
            <div className="mx-auto w-32 h-32 bg-gradient-to-r from-violet-400 to-violet-600 rounded-full flex items-center justify-center">
              <svg
                className="w-16 h-16 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.291-1.044-5.709-2.573M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </div>
          </div>

          {/* Message d'erreur détaillé */}
          <div className="mb-8">
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
              Oups ! Cette page semble introuvable
            </h3>
            <p className="text-gray-600 mb-6">
              Il se peut que l&apos;URL soit incorrecte ou que la page ait été supprimée.
              Pas de panique, vous pouvez retourner à l&apos;accueil ou explorer le site.
            </p>
          </div>

          {/* Boutons d'action */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/home">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-violet-500 to-violet-600 text-white font-semibold rounded-lg shadow-lg hover:from-violet-600 hover:to-violet-700 transition-all duration-200"
              >
                Retour à l&apos;accueil
              </motion.button>
            </Link>
            <Link href="/account">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-8 py-3 border-2 border-violet-500 text-violet-600 font-semibold rounded-lg hover:bg-violet-50 transition-all duration-200"
              >
                Espace client
              </motion.button>
            </Link>
          </div>

          {/* Suggestions */}
          <div className="mt-12 p-6 bg-white rounded-lg shadow-sm border border-gray-200">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">
              Vous pourriez être intéressé par :
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Link href="/home" className="block">
                <div className="p-4 border border-gray-200 rounded-lg hover:border-violet-300 hover:bg-violet-50 transition-all duration-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-violet-100 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-violet-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                      </svg>
                    </div>
                    <span className="text-gray-700 font-medium">Accueil</span>
                  </div>
                </div>
              </Link>
              <Link href="/account" className="block">
                <div className="p-4 border border-gray-200 rounded-lg hover:border-violet-300 hover:bg-violet-50 transition-all duration-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-violet-100 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-violet-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700 font-medium">Espace client</span>
                  </div>
                </div>
              </Link>
              <Link href="/public" className="block">
                <div className="p-4 border border-gray-200 rounded-lg hover:border-violet-300 hover:bg-violet-50 transition-all duration-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-violet-100 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-violet-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                      </svg>
                    </div>
                    <span className="text-gray-700 font-medium">Annonces</span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Footer avec espace */}
        <div className="pb-10 sm:pb-16 mt-8 sm:mt-12"></div>
      </div>
    </div>
  );
};

export default NotFoundPage;
