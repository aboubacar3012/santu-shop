"use client";

import { motion } from 'framer-motion';
import { Check, X } from "lucide-react";

import { ResponsiveContainer } from './ResponsiveContainer';
import { SectionHeading } from './SectionHeading';
import Link from 'next/link';
import { useState } from 'react';

export const PricingSection = () => {
  const [isAnnual, setIsAnnual] = useState(true);
  
  const plans = [
    {
      name: "Free",
      description: "Parfait pour découvrir la plateforme",
      price: {
        monthly: 0,
        annual: 0
      },
      features: [
        { included: true, text: "Accès à tous les cours" },
        { included: true, text: "Exercices pratiques limités" },
        { included: true, text: "Communauté d'entraide" },
        { included: false, text: "Certifications" },
        { included: false, text: "Projets guidés avancés" },
        { included: false, text: "Support personnalisé" }
      ],
      cta: "Commencer gratuitement",
      highlight: false,
    },
    {
      name: "Premium",
      description: "La formule idéale pour se former sérieusement",
      price: {
        monthly: 4.90,
        annual: 3.90
      },
      features: [
        { included: true, text: "Accès complet aux cours" },
        { included: true, text: "Tous les exercices pratiques" },
        { included: true, text: "Communauté d'entraide" },
        { included: true, text: "Certifications incluses" },
        { included: true, text: "Projets guidés avancés" },
        { included: false, text: "Support personnalisé" }
      ],
      cta: "Choisir Premium",
      highlight: true,
    },
    {
      name: "Pro",
      description: "Pour un apprentissage accéléré et coaché",
      price: {
        monthly: 9.90,
        annual: 7.90
      },
      features: [
        { included: true, text: "Accès complet aux cours" },
        { included: true, text: "Tous les exercices pratiques" },
        { included: true, text: "Communauté d'entraide" },
        { included: true, text: "Certifications incluses" },
        { included: true, text: "Projets guidés avancés" },
        { included: true, text: "Support personnalisé" }
      ],
      cta: "Choisir Pro",
      highlight: false,
    },
  ];

  return (
    <section className="py-20 px-4 bg-gray-800 relative overflow-hidden" id="pricing">
      <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-600/10 blur-3xl rounded-full"></div>
      
      <ResponsiveContainer className="relative z-10">
        <SectionHeading
          badge="TARIFS"
          title="Des formules adaptées à vos besoins"
          description="Choisissez l'offre qui vous convient le mieux pour votre apprentissage"
        />
        
        <div className="flex justify-center mb-12">
          <div className="bg-gray-900 p-1 rounded-full inline-flex items-center">
            <button 
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                !isAnnual ? 'bg-orange-500 text-white' : 'text-gray-400 hover:text-white'
              }`}
              onClick={() => setIsAnnual(false)}
            >
              Mensuel
            </button>
            <button 
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                isAnnual ? 'bg-orange-500 text-white' : 'text-gray-400 hover:text-white'
              }`}
              onClick={() => setIsAnnual(true)}
            >
              Annuel <span className="text-xs font-normal ml-1 opacity-75">-25%</span>
            </button>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {plans.map((plan, index) => (
            <PricingCard
              key={index}
              plan={plan}
              isAnnual={isAnnual}
              delay={index * 0.1}
            />
          ))}
        </div>
        
        <div className="mt-12 text-center text-gray-400 text-sm">
          Tous nos abonnements sont sans engagement. <Link href="/pricing" className="text-orange-400 hover:underline">Voir tous les détails</Link>
        </div>
      </ResponsiveContainer>
    </section>
  );
};

interface PricingCardProps {
  plan: {
    name: string;
    description: string;
    price: {
      monthly: number;
      annual: number;
    };
    features: {
      included: boolean;
      text: string;
    }[];
    cta: string;
    highlight: boolean;
  };
  isAnnual: boolean;
  delay: number;
}

const PricingCard = ({ plan, isAnnual, delay }: PricingCardProps) => {
  const price = isAnnual ? plan.price.annual : plan.price.monthly;
  const isFree = price === 0;
  
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
      transition={{ duration: 0.5, delay }}
      className={`rounded-xl overflow-hidden ${
        plan.highlight 
          ? 'bg-gradient-to-b from-gray-900 to-orange-900/20 border-2 border-orange-500/50 transform -translate-y-4 md:-translate-y-6 shadow-lg shadow-orange-500/10' 
          : 'bg-gradient-to-b from-gray-900 to-gray-900/50 border border-gray-700'
      } ${!isFree ? 'opacity-60' : ''}`}
    >
      {plan.highlight && (
        <div className="bg-orange-500 text-white py-1 text-center text-sm font-medium">
          Recommandé
        </div>
      )}
      
      <div className="p-6 md:p-8">
        <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{plan.name}</h3>
        <p className="text-gray-400 mb-6">{plan.description}</p>
        
        <div className="mb-6">
          <div className="flex items-end">
            <span className="text-3xl md:text-4xl font-bold text-white">
              {price === 0 ? 'Gratuit' : `${price.toFixed(2)}€`}
            </span>
            {price > 0 && (
              <span className="text-gray-400 ml-2 mb-1">/ mois</span>
            )}
          </div>
          {isAnnual && price > 0 && (
            <div className="text-sm text-orange-400 mt-1">Facturé annuellement</div>
          )}
        </div>
        
        <ul className="space-y-3 mb-8">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start">
              {feature.included ? (
                <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
              ) : (
                <X className="h-5 w-5 text-gray-600 mr-3 flex-shrink-0 mt-0.5" />
              )}
              <span className={feature.included ? 'text-gray-300' : 'text-gray-500'}>
                {feature.text}
              </span>
            </li>
          ))}
        </ul>
        
        {isFree ? (
          <Link href="/register">
            <button 
              className="w-full py-3 rounded-lg font-medium bg-orange-500 hover:bg-orange-600 text-white transition-colors duration-300"
            >
              {plan.cta}
            </button>
          </Link>
        ) : (
          <button 
            disabled
            className="w-full py-3 rounded-lg font-medium bg-gray-700 text-gray-400 cursor-not-allowed border border-gray-600"
          >
            Bientôt disponible
          </button>
        )}
        
        {!isFree && (
          <div className="text-center mt-3 text-gray-400 text-sm">
            Formule momentanément indisponible
          </div>
        )}
      </div>
    </motion.div>
  );
};