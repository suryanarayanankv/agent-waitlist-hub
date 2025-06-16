
import React from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { LogOut, User } from 'lucide-react';

interface NavigationProps {
  onAuthClick: () => void;
  isOnWaitlist: boolean;
}

const Navigation: React.FC<NavigationProps> = ({ onAuthClick, isOnWaitlist }) => {
  const { user, signOut } = useAuth();

  return (
    <nav className="w-full bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-lg"></div>
            <span className="ml-2 text-xl font-bold text-gray-900">Axiom</span>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <User size={16} />
                  <span>{user.email}</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={signOut}
                  className="flex items-center space-x-2"
                >
                  <LogOut size={16} />
                  <span>Sign Out</span>
                </Button>
              </div>
            ) : (
              <Button 
                onClick={onAuthClick} 
                className="bg-emerald-500 hover:bg-emerald-600"
                disabled={isOnWaitlist}
              >
                {isOnWaitlist ? 'Early Access Reserved' : 'Join Waitlist'}
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
