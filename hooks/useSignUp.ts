import { useToggle } from 'react-use';

export const useSignUp = () => {
  const [isLoading, toggleIsLoading] = useToggle(false);

  const createAccount = async () => {};

  return {
    isLoading,
    createAccount,
  };
};
