import { motion } from 'framer-motion';
import { Terminal, BookOpen, Code } from "lucide-react";
import { ResponsiveContainer } from './ResponsiveContainer';

export const QuizSection = () => {
  return (
    <section className="py-20 px-4 bg-gray-800 relative" id="quiz">
      <ResponsiveContainer className="relative z-10">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-4 px-4 py-1 rounded-full bg-orange-900/30 text-orange-400 border border-orange-500/30 text-sm font-semibold inline-block">
              EXERCICES PRATIQUES
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white">Apprenez en pratiquant le code</h2>
            <p className="text-base sm:text-lg text-gray-300 mb-8">
              KodeCraft vous propose des exercices pratiques pour mettre en application vos connaissances et développer vos compétences de programmation à travers des challenges concrets.
            </p>
            
            <div className="space-y-6">
              <FeatureItem 
                icon={<Code className="h-6 w-6" />}
                title="Coding challenges"
                description="Des centaines d'exercices de programmation couvrant tous les niveaux de difficulté, du débutant à l'expert."
              />
              
              <FeatureItem 
                icon={<Terminal className="h-6 w-6" />}
                title="Environnement intégré"
                description="Développez directement dans votre navigateur avec notre éditeur de code et exécutez votre code en temps réel."
              />
              
              <FeatureItem 
                icon={<BookOpen className="h-6 w-6" />}
                title="Projets guidés"
                description="Apprenez à construire des applications complètes pas à pas avec nos projets guidés et tutoriels détaillés."
              />
            </div>
          </motion.div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-gray-900 rounded-xl p-6 sm:p-8 border border-gray-700"
          >
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-6">Votre progression de code</h3>
            
            <div className="space-y-6">
              {[
                { name: "HTML & CSS", progress: 100, completed: true },
                { name: "JavaScript Fondamentaux", progress: 85, completed: true },
                { name: "React.js", progress: 65, completed: false },
                { name: "Node.js & Express", progress: 45, completed: false },
                { name: "MongoDB & Bases de données", progress: 30, completed: false },
                { name: "GraphQL & API", progress: 15, completed: false },
              ].map((course, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-white font-medium text-sm sm:text-base">{course.name}</span>
                    <span className="text-orange-400 text-sm sm:text-base">{course.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${course.completed ? 'bg-green-500' : 'bg-orange-500'}`} 
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 text-center">
                <div className="text-2xl sm:text-3xl font-bold text-white mb-1">12</div>
                <div className="text-xs sm:text-sm text-gray-400">Projets complétés</div>
              </div>
              <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 text-center">
                <div className="text-2xl sm:text-3xl font-bold text-white mb-1">3</div>
                <div className="text-xs sm:text-sm text-gray-400">Certifications</div>
              </div>
            </div>
            
          </motion.div>
        </div>
      </ResponsiveContainer>
    </section>
  );
};

interface FeatureItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureItem = ({ icon, title, description }: FeatureItemProps) => (
  <div className="flex gap-4 items-start">
    <div className="bg-orange-900/20 p-2 rounded-lg text-orange-400 flex-shrink-0">
      {icon}
    </div>
    <div>
      <h3 className="text-lg sm:text-xl font-semibold text-white mb-1 sm:mb-2">{title}</h3>
      <p className="text-sm sm:text-base text-gray-400">
        {description}
      </p>
    </div>
  </div>
);