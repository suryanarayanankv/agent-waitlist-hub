
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useWaitlistStatus = (email?: string) => {
  const [isOnWaitlist, setIsOnWaitlist] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const checkWaitlistStatus = async (emailToCheck: string) => {
    if (!emailToCheck) return;
    
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('waitlist')
        .select('id')
        .eq('email', emailToCheck.toLowerCase())
        .maybeSingle();

      if (error) {
        console.error('Error checking waitlist status:', error);
        return;
      }

      setIsOnWaitlist(!!data);
    } catch (error) {
      console.error('Error checking waitlist status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (email) {
      checkWaitlistStatus(email);
    }
  }, [email]);

  return { isOnWaitlist, isLoading, checkWaitlistStatus };
};
