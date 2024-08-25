import type { SubmitHandler } from 'react-hook-form';
import type { RegisterInputs } from '@/types';

import { useState } from 'react';
import { useToggle } from 'react-use';

import { useSignIn } from './useSignIn';

export const useSignUp = () => {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, toggleIsLoading] = useToggle(false);
  const { signIn } = useSignIn();

  const createAccount: SubmitHandler<RegisterInputs> = async ({
    email,
    password,
    name,
  }) => {
    try {
      toggleIsLoading(true);
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name }),
      });

      if (!res.ok) throw new Error('Failed to create new account');

      if (res.ok) {
        setErrorMsg(null);
        await signIn({ email, password });
      }

      return { message: 'OK' };
    } catch (err) {
      if (err instanceof Error) {
        console.error(err);
        setErrorMsg(err.message);
      }

      return { message: 'NG' };
    } finally {
      toggleIsLoading(false);
    }
  };

  return {
    isLoading,
    errorMsg,
    createAccount,
  };
};
