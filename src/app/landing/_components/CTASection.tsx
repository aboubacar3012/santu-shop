import { motion } from 'framer-motion';
import Link from 'next/link';
import { BookMarked } from "lucide-react";
import { ResponsiveContainer } from './ResponsiveContainer';

export const CTASection = () => {
  return (
    <section className="py-16 sm:py-20 px-4 bg-gradient-to-r from-orange-600 to-orange-500 relative overflow-hidden" id="cta">
      <div className="absolute inset-0 opacity-20">
        <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path fill="white" d="M0,0 L100,0 C50,33 50,67 100,100 L0,100 Z" />
        </svg>
      </div>
      
      <ResponsiveContainer className="relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 text-white">Prêt à commencer votre formation ?</h2>
          <p className="text-base sm:text-xl mb-8 sm:mb-10 max-w-2xl mx-auto text-orange-100">
            Rejoignez des milliers d&apos;apprenants et lancez-vous dans le développement avec nos formations interactives
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/learning">
              <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white text-orange-600 rounded-lg text-base sm:text-lg font-semibold hover:bg-orange-50 transform hover:scale-105 transition duration-300 flex items-center justify-center">
                <BookMarked className="mr-2 h-5 w-5" />
                Découvrir les formations
              </button>
            </Link>
            <Link href="#">
              <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-transparent border-2 border-white text-white rounded-lg text-base sm:text-lg font-semibold hover:bg-white/10 transform hover:scale-105 transition duration-300">
                Créer un compte gratuit
              </button>
            </Link>
          </div>
        </motion.div>
      </ResponsiveContainer>
    </section>
  );
};