
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useWaitlistStatus = (email?: string) => {
  const [isOnWaitlist, setIsOnWaitlist] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const checkWaitlistStatus = async (emailToCheck: string) => {
    if (!emailToCheck) return;
    
    setIsLoading(true);
    try {
      console.log('Checking waitlist status for:', emailToCheck);
      const { data, error } = await supabase
        .from('waitlist')
        .select('id')
        .eq('email', emailToCheck.toLowerCase())
        .maybeSingle();

      if (error) {
        console.error('Error checking waitlist status:', error);
        return;
      }

      const isOnWaitlistResult = !!data;
      console.log('Waitlist status result:', isOnWaitlistResult);
      setIsOnWaitlist(isOnWaitlistResult);
    } catch (error) {
      console.error('Error checking waitlist status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (email) {
      console.log('Email changed, checking waitlist status for:', email);
      checkWaitlistStatus(email);
    }
  }, [email]);

  return { isOnWaitlist, isLoading, checkWaitlistStatus };
};
