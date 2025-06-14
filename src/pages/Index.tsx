
import React, { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import BenefitsSection from '@/components/BenefitsSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import WaitlistSection from '@/components/WaitlistSection';
import Footer from '@/components/Footer';
import WaitlistFormModal from '@/components/WaitlistFormModal';
import { useUserEmail } from '@/hooks/useUserEmail';
import { useWaitlistStatus } from '@/hooks/useWaitlistStatus';

const Index = () => {
  const [showWaitlistForm, setShowWaitlistForm] = useState(false);
  const { userEmail, saveUserEmail } = useUserEmail();
  const { isOnWaitlist, checkWaitlistStatus } = useWaitlistStatus(userEmail);

  // Check waitlist status when component mounts and when userEmail changes
  useEffect(() => {
    if (userEmail) {
      console.log('Index: Checking waitlist status for email:', userEmail);
      checkWaitlistStatus(userEmail);
    }
  }, [userEmail, checkWaitlistStatus]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleWaitlistClick = () => {
    console.log('Waitlist click - isOnWaitlist:', isOnWaitlist);
    if (isOnWaitlist) {
      // Redirect to MVP
      window.location.href = 'https://example.com/mvp'; // Replace with your MVP URL
    } else {
      setShowWaitlistForm(true);
    }
  };

  const handleWaitlistSuccess = (email: string) => {
    saveUserEmail(email);
    // Redirect to the success URL
    window.location.href = 'https://example.com/success'; // Replace with your redirect URL
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation onAuthClick={handleWaitlistClick} isOnWaitlist={isOnWaitlist} />
      
      <Hero 
        onJoinWaitlist={handleWaitlistClick}
        onLearnMore={() => scrollToSection('benefits')}
        isOnWaitlist={isOnWaitlist}
      />
      
      <BenefitsSection />
      <HowItWorksSection />
      <WaitlistSection onAuthClick={handleWaitlistClick} isOnWaitlist={isOnWaitlist} />
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
