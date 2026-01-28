import { motion } from 'framer-motion';
import { 
  Code, 
  MoveRight,
  Users,
  VideoIcon,
  Terminal,
  Briefcase
} from "lucide-react";

import { ResponsiveContainer } from './ResponsiveContainer';
import { SectionHeading } from './SectionHeading';
import { FeatureCard } from './FeatureCard';
import Link from 'next/link';

export const FeaturesSection = () => {
  const features = [
    {
      title: "Cours vidéo interactifs",
      description: "Des vidéos explicatives de haute qualité avec des exemples concrets et des explications détaillées",
      icon: <VideoIcon className="h-8 w-8" />,
      delay: 0,
    },
    {
      title: "Éditeur de code intégré",
      description: "Pratiquez directement dans votre navigateur avec notre IDE en ligne",
      icon: <Code className="h-8 w-8" />,
      delay: 0.1,
    },
    {
      title: "Projets guidés",
      description: "Des projets complets pour mettre en pratique vos connaissances et construire votre portfolio",
      icon: <Briefcase className="h-8 w-8" />,
      delay: 0.2,
    },
    {
      title: "Exercices pratiques",
      description: "Des challenges de code pour tester et renforcer vos compétences",
      icon: <Terminal className="h-8 w-8" />,
      delay: 0.3,
    },
    {
      title: "Communauté d'entraide",
      description: "Échangez avec d'autres apprenants et nos experts pour progresser plus rapidement",
      icon: <Users className="h-8 w-8" />,
      delay: 0.4,
    },
    {
      title: "Certifications reconnues",
      description: "Obtenez des certificats validant vos compétences pour valoriser votre CV",
      icon: <Users className="h-8 w-8" />,
      delay: 0.5,
    },
  ];

  return (
    <section className="py-20 px-4 bg-gray-900 relative overflow-hidden" id="features">
      <div className="absolute inset-0 opacity-10 bg-grid-pattern"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-600/10 blur-3xl rounded-full"></div>
      
      <ResponsiveContainer className="relative z-10">
        <SectionHeading
          badge="FONCTIONNALITÉS"
          title="Pourquoi choisir KodeCraft ?"
          description="Notre plateforme vous offre tous les outils nécessaires pour maîtriser le développement web et mobile"
        />
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={feature.delay}
            />
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link href="/learning">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors duration-300"
            >
              Découvrir toutes nos formations
              <MoveRight className="h-5 w-5" />
            </motion.button>
          </Link>
        </div>
      </ResponsiveContainer>
    </section>
  );
};