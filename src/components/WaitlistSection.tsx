
import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

interface WaitlistSectionProps {
  onAuthClick: () => void;
  isOnWaitlist: boolean;
}

const WaitlistSection: React.FC<WaitlistSectionProps> = ({ onAuthClick, isOnWaitlist }) => {
  const handleJoinClick = () => {
    onAuthClick();
  };

  return (
    <section id="waitlist" className="py-24 bg-gradient-to-br from-emerald-500 to-blue-500">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-12 border border-white/20">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {isOnWaitlist ? 'Ready to Try Our MVP?' : 'Ready to Automate Everything?'}
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            {isOnWaitlist 
              ? 'You\'re already on our waitlist! Try out our MVP and experience the future of automation.'
              : 'Join the waitlist for early access to AutoAgent. Limited spots available for our exclusive beta program.'
            }
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button 
              size="lg"
              onClick={handleJoinClick}
              className="bg-white text-emerald-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {isOnWaitlist ? 'Try out MVP' : 'Join the Waitlist'}
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-white/80">
            <div className="flex items-center justify-center space-x-2">
              <CheckCircle size={20} />
              <span>{isOnWaitlist ? 'MVP access' : 'Free early access'}</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <CheckCircle size={20} />
              <span>Priority support</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <CheckCircle size={20} />
              <span>{isOnWaitlist ? 'Full features' : '50% discount'}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WaitlistSection;
