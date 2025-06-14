
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import BenefitsSection from '@/components/BenefitsSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import WaitlistSection from '@/components/WaitlistSection';
import Footer from '@/components/Footer';
import WaitlistFormModal from '@/components/WaitlistFormModal';

const Index = () => {
  const [showWaitlistForm, setShowWaitlistForm] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleWaitlistClick = () => {
    setShowWaitlistForm(true);
  };

  const handleWaitlistSuccess = () => {
    // Redirect to the link you'll provide
    // For now, I'll add a placeholder - you can replace this with your actual redirect URL
    window.location.href = 'https://example.com/success'; // Replace with your redirect URL
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation onAuthClick={handleWaitlistClick} />
      
      <Hero 
        onJoinWaitlist={handleWaitlistClick}
        onLearnMore={() => scrollToSection('benefits')}
      />
      
      <BenefitsSection />
      <HowItWorksSection />
      <WaitlistSection onAuthClick={handleWaitlistClick} />
      <Footer />

      <WaitlistFormModal
        isOpen={showWaitlistForm}
        onClose={() => setShowWaitlistForm(false)}
        onSuccess={handleWaitlistSuccess}
      />
    </div>
  );
};

export default Index;
