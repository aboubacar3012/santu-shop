"use client";

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

type FeatureCardProps = {
  icon: ReactNode;
  title: string;
  description: string;
  delay?: number;
  badge?: string;
  className?: string;
}

export const FeatureCard = ({ 
  icon, 
  title, 
  description, 
  delay = 0, 
  badge,
  className = '' 
}: FeatureCardProps) => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeIn}
      transition={{ duration: 0.5, delay }}
      className={`bg-gradient-to-br from-gray-800 to-gray-900 p-6 sm:p-8 rounded-xl border border-gray-700/50 hover:border-orange-500/30 transition-all duration-300 transform hover:-translate-y-2 group hover:shadow-xl hover:shadow-orange-500/10 ${className}`}
    >
      <div className="p-3 mb-4 rounded-lg bg-orange-900/20 inline-block text-orange-400 group-hover:bg-orange-900/30 transition-colors duration-300">
        {icon}
      </div>
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3">
        <h3 className="text-xl sm:text-2xl font-semibold text-white">{title}</h3>
        {badge && (
          <span className={`text-xs px-2 py-1 rounded-full mt-2 sm:mt-0 inline-block
            ${badge === "Débutant" ? "bg-green-900/30 text-green-400 border border-green-500/30" :
            badge === "Intermédiaire" ? "bg-orange-900/30 text-orange-400 border border-orange-500/30" :
            badge === "Avancé" ? "bg-amber-900/30 text-amber-400 border border-amber-500/30" :
            "bg-red-900/30 text-red-400 border border-red-500/30"}`}
          >
            {badge}
          </span>
        )}
      </div>
      
      <p className="text-gray-400">{description}</p>
    </motion.div>
  );
};