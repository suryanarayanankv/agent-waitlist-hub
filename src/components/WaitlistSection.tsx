
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useProfile } from '@/hooks/useProfile';
import WaitlistForm from './WaitlistForm';
import { CheckCircle, Users, Clock, Zap } from 'lucide-react';

interface WaitlistSectionProps {
  onAuthClick: () => void;
}

const WaitlistSection: React.FC<WaitlistSectionProps> = ({ onAuthClick }) => {
  const { user } = useAuth();
  const { profile } = useProfile();
  const [showForm, setShowForm] = useState(false);

  const handleJoinClick = () => {
    if (!user) {
      onAuthClick();
    } else {
      setShowForm(true);
    }
  };

  if (profile?.is_on_waitlist) {
    return (
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-3xl p-12 border border-emerald-200">
            <CheckCircle className="h-16 w-16 text-emerald-500 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              You're on the waitlist! 🎉
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Thanks for joining! We'll notify you as soon as early access becomes available.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <Users className="h-8 w-8 text-emerald-500 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Position: <span className="font-semibold">#247</span></p>
              </div>
              <div className="text-center">
                <Clock className="h-8 w-8 text-emerald-500 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Est. Access: <span className="font-semibold">2-3 weeks</span></p>
              </div>
              <div className="text-center">
                <Zap className="h-8 w-8 text-emerald-500 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Early Bird: <span className="font-semibold">50% off</span></p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (showForm && user) {
    return <WaitlistForm onClose={() => setShowForm(false)} />;
  }

  return (
    <section id="waitlist" className="py-24 bg-gradient-to-br from-emerald-500 to-blue-500">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-12 border border-white/20">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Automate Everything?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join the waitlist for early access to AutoAgent. Limited spots available for our exclusive beta program.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button 
              size="lg"
              onClick={handleJoinClick}
              className="bg-white text-emerald-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {user ? 'Complete Waitlist Application' : 'Join the Waitlist'}
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-white/80">
            <div className="flex items-center justify-center space-x-2">
              <CheckCircle size={20} />
              <span>Free early access</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <CheckCircle size={20} />
              <span>Priority support</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <CheckCircle size={20} />
              <span>50% discount</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WaitlistSection;
