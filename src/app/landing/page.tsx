'use client';

import { HeroSection } from './_components/HeroSection';
import { StatsSection } from './_components/StatsSection';
import { FeaturesSection } from './_components/FeaturesSection';
import { TechnologiesSection } from './_components/TechnologiesSection';
import { LearningPathSection } from './_components/LearningPathSection';
import { QuizSection } from './_components/QuizSection';
import { AnalyticsSection } from './_components/AnalyticsSection';
import { MobileAppSection } from './_components/MobileAppSection';
import { PricingSection } from './_components/PricingSection';
import { FAQSection } from './_components/FAQSection';
import { CTASection } from './_components/CTASection';
import { Footer } from './_components/Footer';

const LandingPage = () => {
  return (
    <div className="small-scrollbar min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-gray-100">
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <TechnologiesSection />
      <LearningPathSection />
      <QuizSection />
      <AnalyticsSection />
      <MobileAppSection />
      <PricingSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default LandingPage;