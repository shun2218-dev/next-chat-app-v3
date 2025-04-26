import { useEffect, useState } from 'react';

export const useSession = () => {
  const [status, setStatus] = useState<
    'authenticated' | 'loading' | 'unauthenticated'
  >('loading');

  useEffect(() => {
    setTimeout(() => {
      setStatus('authenticated');
    }, 1000);
  }, []);

  return {
    data: {
      user: {
        id: 'user1',
        name: 'John Doe',
        email: 'test@example.com',
        image: 'https://placehold.jp/150x150.png',
      },
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(), // 1 day
    },
    status,
  };
};
