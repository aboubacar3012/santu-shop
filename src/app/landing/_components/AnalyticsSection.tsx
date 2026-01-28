"use client";

import { motion } from 'framer-motion';
import { BarChart4, Clock, Trophy, Star } from "lucide-react";
import { ResponsiveContainer } from './ResponsiveContainer';
import { SectionHeading } from './SectionHeading';

export const AnalyticsSection = () => {
  return (
    <section className="py-20 px-4 bg-gray-900 relative overflow-hidden" id="analytics">
      <div className="absolute top-0 right-0 w-1/2 h-1/3 bg-orange-500/5 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/3 bg-orange-600/5 blur-3xl rounded-full"></div>
      
      <ResponsiveContainer className="relative z-10">
        <SectionHeading
          badge="PROGRESSION"
          title="Suivez votre évolution"
          description="Visualisez votre progression et restez motivé dans votre apprentissage"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
          <StatsCard 
            title="Progression par module" 
            icon={<BarChart4 className="h-6 w-6 text-orange-400" />}
            delay={0}
            type="bar"
          />
          
          <ActivityCard 
            title="Activité récente" 
            icon={<Clock className="h-6 w-6 text-orange-400" />}
            delay={0.1}
          />
          
          <BadgesCard 
            title="Certifications & Badges" 
            icon={<Trophy className="h-6 w-6 text-orange-400" />}
            delay={0.2}
          />
        </div>
      </ResponsiveContainer>
    </section>
  );
};

type CardProps = {
  title: string;
  icon: React.ReactNode;
  delay: number;
  type?: string;
}

const StatsCard = ({ title, icon, delay }: CardProps) => (
  <motion.div 
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    variants={{
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 }
    }}
    transition={{ duration: 0.5, delay }}
    className="bg-gray-800 p-6 rounded-xl border border-gray-700 h-full"
  >
    <div className="flex items-center justify-between mb-6">
      <h3 className="text-lg sm:text-xl font-bold text-white">{title}</h3>
      {icon}
    </div>
    
    <div className="space-y-4">
      {[
        { category: "HTML/CSS", rate: 92 },
        { category: "JavaScript", rate: 78 },
        { category: "React", rate: 65 },
        { category: "Node.js", rate: 45 },
      ].map((item, index) => (
        <div key={index} className="space-y-1">
          <div className="flex justify-between text-xs sm:text-sm">
            <span className="text-gray-300">{item.category}</span>
            <span className="text-orange-400 font-medium">{item.rate}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div className="bg-orange-500 h-2 rounded-full" style={{ width: `${item.rate}%` }}></div>
          </div>
        </div>
      ))}
    </div>
  </motion.div>
);

const ActivityCard = ({ title, icon, delay }: CardProps) => (
  <motion.div 
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    variants={{
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 }
    }}
    transition={{ duration: 0.5, delay }}
    className="bg-gray-800 p-6 rounded-xl border border-gray-700 h-full"
  >
    <div className="flex items-center justify-between mb-6">
      <h3 className="text-lg sm:text-xl font-bold text-white">{title}</h3>
      {icon}
    </div>
    
    <div className="space-y-4">
      {[
        { course: "React.js Fondamentaux", date: "Aujourd'hui", progress: "Leçon 8/10" },
        { course: "API REST avec Node.js", date: "Hier", progress: "TP terminé" },
        { course: "CSS Avancé", date: "Il y a 3 jours", progress: "4/6 modules" },
        { course: "Git & GitHub", date: "Il y a 5 jours", progress: "Complété" },
      ].map((item, index) => (
        <div key={index} className="flex items-center justify-between py-2 border-b border-gray-700 last:border-0">
          <div className="max-w-[70%]">
            <p className="text-white font-medium text-sm sm:text-base truncate">{item.course}</p>
            <p className="text-gray-400 text-xs sm:text-sm">{item.date}</p>
          </div>
          <div className="bg-orange-900/30 px-2 py-1 rounded text-orange-400 font-medium text-xs sm:text-sm">
            {item.progress}
          </div>
        </div>
      ))}
    </div>
  </motion.div>
);

const BadgesCard = ({ title, icon, delay }: CardProps) => (
  <motion.div 
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    variants={{
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 }
    }}
    transition={{ duration: 0.5, delay }}
    className="bg-gray-800 p-6 rounded-xl border border-gray-700 h-full"
  >
    <div className="flex items-center justify-between mb-6">
      <h3 className="text-lg sm:text-xl font-bold text-white">{title}</h3>
      {icon}
    </div>
    
    <div className="grid grid-cols-2 gap-3 sm:gap-4">
      {[
        { name: "HTML/CSS Master", unlocked: true },
        { name: "JavaScript Pro", unlocked: true },
        { name: "React Developer", unlocked: false },
        { name: "Full Stack Dev", unlocked: false },
        { name: "API Expert", unlocked: false },
        { name: "Git Master", unlocked: false },
      ].map((badge, index) => (
        <div 
          key={index} 
          className={`p-2 sm:p-3 rounded-lg border text-center ${
            badge.unlocked 
              ? "border-orange-500/30 bg-orange-900/20" 
              : "border-gray-700 bg-gray-800/50 opacity-60"
          }`}
        >
          <div className="flex justify-center mb-1 sm:mb-2">
            {badge.unlocked ? (
              <Star className="h-5 w-5 sm:h-6 sm:w-6 text-orange-400" />
            ) : (
              <Star className="h-5 w-5 sm:h-6 sm:w-6 text-gray-500" />
            )}
          </div>
          <p className={`text-xs sm:text-sm ${badge.unlocked ? "text-white" : "text-gray-400"}`}>
            {badge.name}
          </p>
        </div>
      ))}
    </div>
  </motion.div>
);