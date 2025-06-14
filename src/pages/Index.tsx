
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import BenefitsSection from '@/components/BenefitsSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import WaitlistSection from '@/components/WaitlistSection';
import Footer from '@/components/Footer';
import AuthModal from '@/components/AuthModal';
import WaitlistFormModal from '@/components/WaitlistFormModal';

const Index = () => {
  const { user, loading } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showWaitlistForm, setShowWaitlistForm] = useState(false);

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

  const handleWaitlistClick = () => {
    if (!user) {
      setShowAuthModal(true);
    } else {
      setShowWaitlistForm(true);
    }
  };

  const handleSignUpSuccess = () => {
    // After successful signup, show waitlist form
    setShowWaitlistForm(true);
  };

  const handleWaitlistSuccess = () => {
    // Redirect to the link you'll provide
    // For now, I'll add a placeholder - you can replace this with your actual redirect URL
    window.location.href = 'https://example.com/success'; // Replace with your redirect URL
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
      <Navigation onAuthClick={handleWaitlistClick} />
      
      <Hero 
        onJoinWaitlist={handleWaitlistClick}
        onLearnMore={() => scrollToSection('benefits')}
      />
      
      <BenefitsSection />
      <HowItWorksSection />
      <WaitlistSection onAuthClick={handleWaitlistClick} />
      <Footer />

      <AuthModal 
        isOpen={showAuthModal} 
        onClose={handleAuthClose}
        onSignUpSuccess={handleSignUpSuccess}
      />

      <WaitlistFormModal
        isOpen={showWaitlistForm}
        onClose={() => setShowWaitlistForm(false)}
        onSuccess={handleWaitlistSuccess}
      />
    </div>
  );
};

export default Index;
