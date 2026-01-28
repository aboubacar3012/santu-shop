"use client";

import { motion } from 'framer-motion';
import { Smartphone, Clock, AppleIcon } from "lucide-react";
import { ResponsiveContainer } from './ResponsiveContainer';
import Image from 'next/image';

export const MobileAppSection = () => {
  return (
    <section className="py-20 px-4 bg-gray-900 relative overflow-hidden" id="mobile-app">
      <div className="absolute top-0 right-0 w-1/2 h-1/3 bg-orange-500/5 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/3 bg-orange-600/5 blur-3xl rounded-full"></div>
      
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
              APPLICATION MOBILE
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white">Formez-vous partout, n&apos;importe quand</h2>
            <p className="text-base sm:text-lg text-gray-300 mb-8">
              Emportez KodeCraft avec vous et accédez à tous vos cours et exercices pratiques sur votre smartphone. Apprenez le code en déplacement et progressez à votre rythme.
            </p>
            
            <div className="space-y-6">
              <FeatureItem 
                icon={<Smartphone className="h-6 w-6" />}
                title="Mode hors-ligne"
                description="Téléchargez vos cours et exercices pour y accéder même sans connexion internet."
              />
              
              <FeatureItem 
                icon={<Clock className="h-6 w-6" />}
                title="Mini-projets quotidiens"
                description="Des exercices courts à réaliser chaque jour pour renforcer vos compétences."
              />
            </div>
            
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <AppStoreButton />
              <GooglePlayButton />
            </div>
          </motion.div>
          
          <PhoneMockups />
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

const AppStoreButton = () => (
  <a href="#" className="flex items-center bg-black text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-gray-900 transition-colors duration-300">
    <AppleIcon className="h-5 w-5 sm:h-6 sm:w-6 mr-2" />
    <div className="text-left">
      <div className="text-xs">Télécharger sur l&apos;</div>
      <div className="font-semibold text-sm sm:text-lg">App Store</div>
    </div>
  </a>
);

const GooglePlayButton = () => (
  <a href="#" className="flex items-center bg-black text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-gray-900 transition-colors duration-300">
    <svg viewBox="0 0 24 24" className="h-5 w-5 sm:h-6 sm:w-6 mr-2" fill="currentColor">
      <path d="M3,20.5C3,21.3 3.8,22 4.5,22C5.2,22 6,21.3 6,20.5V3.5C6,2.7 5.2,2 4.5,2C3.8,2 3,2.7 3,3.5V20.5M16.5,2C15.8,2 15,2.7 15,3.5V20.5C15,21.3 15.8,22 16.5,22C17.2,22 18,21.3 18,20.5V3.5C18,2.7 17.2,2 16.5,2M10,6.5C10,7.3 10.8,8 11.5,8C12.2,8 13,7.3 13,6.5V3.5C13,2.7 12.2,2 11.5,2C10.8,2 10,2.7 10,3.5V6.5M10,13.5C10,14.3 10.8,15 11.5,15C12.2,15 13,14.3 13,13.5V10.5C13,9.7 12.2,9 11.5,9C10.8,9 10,9.7 10,10.5V13.5M10,20.5C10,21.3 10.8,22 11.5,22C12.2,22 13,21.3 13,20.5V17.5C13,16.7 12.2,16 11.5,16C10.8,16 10,16.7 10,17.5V20.5M20,3.5C20,2.7 19.2,2 18.5,2C17.8,2 17,2.7 17,3.5V9.5C17,10.3 17.8,11 18.5,11C19.2,11 20,10.3 20,9.5V3.5M20,16.5C20,15.7 19.2,15 18.5,15C17.8,15 17,15.7 17,16.5V20.5C17,21.3 17.8,22 18.5,22C19.2,22 20,21.3 20,20.5V16.5M8,3.5C8,2.7 7.2,2 6.5,2C5.8,2 5,2.7 5,3.5V9.5C5,10.3 5.8,11 6.5,11C7.2,11 8,10.3 8,9.5V3.5M8,16.5C8,15.7 7.2,15 6.5,15C5.8,15 5,15.7 5,16.5V20.5C5,21.3 5.8,22 6.5,22C7.2,22 8,21.3 8,20.5V16.5Z" />
    </svg>
    <div className="text-left">
      <div className="text-xs">Télécharger sur</div>
      <div className="font-semibold text-sm sm:text-lg">Google Play</div>
    </div>
  </a>
);

const PhoneMockups = () => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="relative h-[400px] sm:h-[500px] md:h-[600px] hidden sm:block"
    >
      {/* Overlapping phone mockups */}
      <div className="absolute z-20 top-0 left-0 right-0 mx-auto w-48 sm:w-56 md:w-64 shadow-xl rounded-3xl overflow-hidden border-8 border-gray-800 transform -rotate-6">
        <div className="relative bg-gray-800 pt-6 pb-2 rounded-t-2xl">
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-16 sm:w-20 h-1 bg-gray-700 rounded-full"></div>
        </div>
        <Image 
          src="https://placehold.co/640x1280/383F51/FFFFFF/png?text=CloudHero+Quiz" 
          alt="CloudHero App Quiz Screen"
          width={640}
          height={1280}
          className="w-full h-auto bg-gray-800"
        />
      </div>
      
      <div className="absolute z-10 top-32 sm:top-36 md:top-40 right-0 w-48 sm:w-56 md:w-64 shadow-xl rounded-3xl overflow-hidden border-8 border-gray-800 transform rotate-6">
        <div className="relative bg-gray-800 pt-6 pb-2 rounded-t-2xl">
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-16 sm:w-20 h-1 bg-gray-700 rounded-full"></div>
        </div>
        <Image 
          src="https://placehold.co/640x1280/273046/FFFFFF/png?text=CloudHero+Stats" 
          alt="CloudHero App Stats Screen" 
          width={640}
          height={1280}
          className="w-full h-auto bg-gray-800"
        />
      </div>
      
      {/* Glow effects */}
      <div className="absolute bottom-10 left-10 w-24 sm:w-32 h-24 sm:h-32 bg-orange-500/20 rounded-full blur-xl"></div>
      <div className="absolute top-20 right-10 w-16 sm:w-24 h-16 sm:h-24 bg-orange-600/20 rounded-full blur-xl"></div>
    </motion.div>
  );
};