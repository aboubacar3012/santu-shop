"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight, Sparkles, Rocket, Users } from "lucide-react";
import { ResponsiveContainer } from './ResponsiveContainer';
import HeroAnimation from './HeroSectionRightAnimation';

export const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="relative min-h-screen flex items-center py-16 overflow-hidden">
      <div className="absolute inset-0 z-0">
        {/* Dynamic background with animated particles */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-800 via-gray-900 to-black"></div>
        
        {/* Enhanced animated particles with more variation */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <div 
              key={i}
              className="absolute rounded-full"
              style={{
                width: `${Math.random() * 12 + 4}px`,
                height: `${Math.random() * 12 + 4}px`,
                backgroundColor: i % 3 === 0 ? 'rgba(249, 115, 22, 0.3)' : 'rgba(255, 255, 255, 0.15)',
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float ${Math.random() * 15 + 10}s linear infinite`,
                animationDelay: `${Math.random() * 5}s`,
                opacity: Math.random() * 0.5 + 0.2
              }}
            ></div>
          ))}
        </div>
        
        {/* Enhanced glowing accents */}
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-orange-500/30 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-0 left-20 w-80 h-80 bg-orange-600/15 rounded-full blur-[100px]"></div>
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px]"></div>
      </div>
      
      <ResponsiveContainer className="z-10">
        <div className="grid lg:grid-cols-5 gap-8 md:gap-12 items-center">
          {/* Left content side - enhanced with more impactful messaging */}
          <motion.div
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={fadeIn}
            transition={{ duration: 0.8 }}
            className="lg:col-span-3 text-left"
          >
            <motion.div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-900/30 text-orange-400 border border-orange-500/30 text-sm font-medium mb-6 backdrop-blur-sm"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" as const }}
            >
              <Sparkles className="h-4 w-4" />
              <span>Plateforme #1 d&apos;apprentissage du code</span>
            </motion.div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="block">Maîtrisez le code.</span>
              <span className="block">Construisez votre <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 animate-gradient">avenir.</span></span>
            </h1>
            
            <p className="text-lg sm:text-xl lg:text-2xl mb-8 text-gray-300 font-medium max-w-xl">
              De zéro à pro avec nos parcours d&apos;apprentissage intensifs, des projets réels et un mentorat personnalisé par des experts de l&apos;industrie.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link href="/learning">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="group w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-orange-600 to-orange-500 rounded-full text-base sm:text-lg font-semibold text-white hover:shadow-lg hover:shadow-orange-500/25 transform hover:translate-y-[-2px] transition duration-300 flex items-center justify-center sm:justify-start"
                >
                  <Rocket className="mr-2 h-5 w-5" />
                  Commencer gratuitement
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </motion.button>
              </Link>
              
              <Link href="/learning">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="group w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gray-800/80 backdrop-blur-sm border border-orange-500/30 text-orange-400 rounded-full text-base sm:text-lg font-semibold transition-all duration-300 hover:bg-orange-500/10 flex items-center justify-center sm:justify-start"
                >
                  <Users className="mr-2 h-5 w-5" />
                  <span className="flex items-center">
                    Explorer les formations
                    <ChevronRight className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </span>
                </motion.button>
              </Link>
            </div>
          </motion.div>
          
          {/* Right side with enhanced animated technology icons */}
          <HeroAnimation visible={isVisible} />
        </div>
      </ResponsiveContainer>
      
      {/* Enhanced scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
        <Link href="#features">
          <motion.div 
            animate={{ y: [0, 10, 0] }} 
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center cursor-pointer group"
          >
            <span className="text-gray-400 text-sm mb-2 group-hover:text-orange-400 transition-colors duration-300">Découvrir</span>
            <motion.div 
              className="w-10 h-10 rounded-full border border-orange-500/30 flex items-center justify-center bg-gray-800/80"
              whileHover={{ scale: 1.1, backgroundColor: 'rgba(249, 115, 22, 0.2)' }}
            >
              <svg className="w-6 h-6 text-orange-400 group-hover:text-orange-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </motion.div>
          </motion.div>
        </Link>
      </div>
    </section>
  );
};

