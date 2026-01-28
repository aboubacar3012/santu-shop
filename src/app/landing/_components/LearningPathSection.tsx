import { Cloud, Code, Layers, Server, Smartphone, Brain } from "lucide-react";
import { ResponsiveContainer } from './ResponsiveContainer';
import { SectionHeading } from './SectionHeading';
import { FeatureCard } from './FeatureCard';

export const LearningPathSection = () => {
  const modules = [
    {
      title: "Développement Frontend",
      description: "Maîtrisez HTML, CSS, JavaScript et les frameworks modernes comme React et Vue.js",
      icon: <Code className="h-8 w-8 sm:h-10 sm:w-10 text-orange-400" />,
      level: "Débutant",
    },
    {
      title: "Développement Backend",
      description: "Apprenez Node.js, Python, les bases de données et la création d'APIs",
      icon: <Server className="h-8 w-8 sm:h-10 sm:w-10 text-orange-400" />,
      level: "Intermédiaire",
    },
    {
      title: "Technologies Mobile",
      description: "Créez des applications mobiles avec React Native et Flutter",
      icon: <Smartphone className="h-8 w-8 sm:h-10 sm:w-10 text-orange-400" />,
      level: "Intermédiaire",
    },
    {
      title: "Architecture & DevOps",
      description: "Découvrez le cloud, Docker, et les pratiques DevOps modernes",
      icon: <Cloud className="h-8 w-8 sm:h-10 sm:w-10 text-orange-400" />,
      level: "Avancé",
    },
    {
      title: "Data & IA",
      description: "Plongez dans la data science, le machine learning et l'intelligence artificielle",
      icon: <Brain className="h-8 w-8 sm:h-10 sm:w-10 text-orange-400" />,
      level: "Avancé",
    },
    {
      title: "Projets Pratiques",
      description: "Mettez en pratique vos compétences sur des projets réels et construisez votre portfolio",
      icon: <Layers className="h-8 w-8 sm:h-10 sm:w-10 text-orange-400" />,
      level: "Tous niveaux",
    },
  ];

  return (
    <section className="py-20 px-4 bg-gray-900 relative overflow-hidden" id="learning-path">
      <div className="absolute inset-0 opacity-10 bg-grid-pattern"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-600/10 blur-3xl rounded-full"></div>
      
      <ResponsiveContainer className="relative z-10">
        <SectionHeading
          badge="PARCOURS D'APPRENTISSAGE"
          title="De Débutant à Développeur Pro"
          description="Des formations complètes et structurées pour maîtriser le développement"
        />
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {modules.map((module, index) => (
            <FeatureCard
              key={index}
              icon={module.icon}
              title={module.title}
              description={module.description}
              badge={module.level}
              delay={index * 0.1}
            />
          ))}
        </div>
      </ResponsiveContainer>
    </section>
  );
};