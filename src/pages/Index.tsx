
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import BenefitsSection from '@/components/BenefitsSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import WaitlistSection from '@/components/WaitlistSection';
import Footer from '@/components/Footer';
import AuthModal from '@/components/AuthModal';

const Index = () => {
  const { loading } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAuthClick = () => {
    console.log('Auth modal opening...');
    setShowAuthModal(true);
  };

  const handleAuthClose = () => {
    console.log('Auth modal closing...');
    setShowAuthModal(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-emerald-50">
        <div className="text-center">
          <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-lg mx-auto mb-4 animate-pulse"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation onAuthClick={handleAuthClick} />
      
      <Hero 
        onJoinWaitlist={handleAuthClick}
        onLearnMore={() => scrollToSection('benefits')}
      />
      
      <BenefitsSection />
      <HowItWorksSection />
      <WaitlistSection onAuthClick={handleAuthClick} />
      <Footer />

      <AuthModal 
        isOpen={showAuthModal} 
        onClose={handleAuthClose} 
      />
    </div>
  );
};

export default Index;
