import type { SubmitHandler } from 'react-hook-form';
import type { LoginInputs } from '@/types';

import { signIn as _signIn } from 'next-auth/react';
import { useState } from 'react';
import { useToggle } from 'react-use';

export const useSignIn = () => {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, toggleIsLoading] = useToggle(false);

  const signIn: SubmitHandler<LoginInputs> = async ({ email, password }) => {
    try {
      toggleIsLoading(true);
      const res = await _signIn('credentials', {
        email,
        password,
        callbackUrl: '/mypage',
      });

      if (!res) throw new Error('Failed to sign in');

      if (res.ok) {
        setErrorMsg(null);
      }

      if (res.error) {
        setErrorMsg(res.error);
      }
    } catch (err) {
      console.error(err);
    } finally {
      toggleIsLoading(false);
    }
  };

  return {
    isLoading,
    errorMsg,
    signIn,
  };
};
