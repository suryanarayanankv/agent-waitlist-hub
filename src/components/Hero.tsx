
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

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Button 
              size="lg"
              onClick={onJoinWaitlist}
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
            >
              <span>{isOnWaitlist ? 'Try out MVP' : 'Join the Waitlist'}</span>
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

          {/* Feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤖</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Smart Automation</h3>
              <p className="text-gray-600">AI-powered agents that learn and adapt to your workflows</p>
            </div>
            
            <div className="p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Lightning Fast</h3>
              <p className="text-gray-600">Process thousands of tasks in minutes, not hours</p>
            </div>
            
            <div className="p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Precision Accuracy</h3>
              <p className="text-gray-600">99.9% accuracy with continuous learning capabilities</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
