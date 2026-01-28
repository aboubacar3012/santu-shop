import { motion } from 'framer-motion';
import { BookOpen, Trophy, Users, ThumbsUp } from "lucide-react";
import { ResponsiveContainer } from './ResponsiveContainer';



export const StatsSection = () => {
  const stats = [
    {
      value: "150+",
      label: "Cours complets",
      description: "Des formations détaillées couvrant tous les aspects du développement",
      icon: <BookOpen className="h-5 w-5" />,
    },
    {
      value: "2.5K+",
      label: "Apprenants actifs",
      description: "Une communauté dynamique de développeurs en formation",
      icon: <Users className="h-5 w-5" />,
    },
    {
      value: "98%",
      label: "Taux de satisfaction",
      description: "Nos apprenants recommandent KodeCraft pour se former",
      icon: <ThumbsUp className="h-5 w-5" />,
    },
    {
      value: "85%",
      label: "Taux de réussite",
      description: "De nos apprenants trouvent un emploi après leur formation",
      icon: <Trophy className="h-5 w-5" />,
    },
  ];

  return (
    <section className="py-16 px-4 bg-gray-800">
      <ResponsiveContainer>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 text-center hover:border-orange-500/30 hover:bg-orange-900/10 transition-all duration-300"
            >
              <div className="bg-orange-900/30 text-orange-400 w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-4">
                {stat.icon}
              </div>
              <div className="text-3xl sm:text-4xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-lg font-semibold text-orange-400 mb-2">{stat.label}</div>
              <p className="text-sm text-gray-400">{stat.description}</p>
            </motion.div>
          ))}
        </div>
      </ResponsiveContainer>
    </section>
  );
};