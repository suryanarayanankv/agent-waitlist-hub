
import { useState, useEffect } from 'react';

export const useUserEmail = () => {
  const [userEmail, setUserEmail] = useState<string>('');

  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail');
    if (storedEmail) {
      setUserEmail(storedEmail);
    }
  }, []);

  const saveUserEmail = (email: string) => {
    localStorage.setItem('userEmail', email);
    setUserEmail(email);
  };

  return { userEmail, saveUserEmail };
};
