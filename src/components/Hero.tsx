
import React from 'react';
import { Button } from '@/components/ui/button';
import { Play, ArrowDown } from 'lucide-react';

interface HeroProps {
  onJoinWaitlist: () => void;
  onLearnMore: () => void;
}

const Hero: React.FC<HeroProps> = ({ onJoinWaitlist, onLearnMore }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-emerald-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Meet the{' '}
            <span className="bg-gradient-to-r from-emerald-500 to-blue-500 bg-clip-text text-transparent">
              Autonomous Agent
            </span>{' '}
            That Works While You Work
          </h1>
          
          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            No setups, no prompts, just pure execution. 
            <br />
            Your AI agent handles workflows so you can focus on what matters.
          </p>

          {/* Video Placeholder */}
          <div className="relative mx-auto mb-12 max-w-4xl">
            <div className="relative bg-gray-900 rounded-2xl overflow-hidden shadow-2xl aspect-video">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-blue-500/20"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Button 
                  size="lg" 
                  className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-white border border-white/30"
                >
                  <Play className="mr-2 h-6 w-6" />
                  Watch Demo
                </Button>
              </div>
              <div className="absolute bottom-4 left-4 text-white/80 text-sm">
                See AutoAgent in action
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              size="lg" 
              onClick={onJoinWaitlist}
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Join the Waitlist
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={onLearnMore}
              className="border-2 border-gray-300 hover:border-emerald-500 px-8 py-4 text-lg font-semibold"
            >
              Learn How It Works
            </Button>
          </div>

          {/* Social Proof */}
          <div className="flex items-center justify-center space-x-6 text-gray-600">
            <div className="flex items-center space-x-2">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div 
                    key={i}
                    className="w-8 h-8 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-full border-2 border-white"
                  ></div>
                ))}
              </div>
              <span className="text-sm font-medium">Join 500+ others already waiting</span>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <button 
              onClick={onLearnMore}
              className="animate-bounce text-gray-400 hover:text-emerald-500 transition-colors"
            >
              <ArrowDown size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
