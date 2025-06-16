
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';

interface HeroProps {
  onJoinWaitlist: () => void;
  onLearnMore: () => void;
  isOnWaitlist: boolean;
}

const Hero: React.FC<HeroProps> = ({ onJoinWaitlist, onLearnMore, isOnWaitlist }) => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-emerald-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Automate Everything with
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-blue-500">
              {" "}AI Agents
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Transform your business with intelligent automation. Our AI agents handle repetitive tasks, 
            streamline workflows, and boost productivity while you focus on what matters most.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button 
              size="lg"
              onClick={onJoinWaitlist}
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
            >
              <span>{isOnWaitlist ? 'Early Access Reserved' : 'Join the Waitlist'}</span>
              <ArrowRight size={20} />
            </Button>
            
            <Button 
              variant="outline"
              size="lg"
              onClick={onLearnMore}
              className="border-2 border-gray-300 hover:border-emerald-500 px-8 py-4 text-lg font-semibold transition-all duration-300 flex items-center space-x-2"
            >
              <Play size={20} />
              <span>Learn More</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
