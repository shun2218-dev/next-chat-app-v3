'use client';
import type { FC, ReactNode } from 'react';

import { useRouter } from 'next/navigation';

import { checkAuth } from '@/libs/features/auth/authSlice';
import { useAppSelector } from '@/libs/hooks';

type Props = {
  children: ReactNode;
};

const AuthGuard: FC<Props> = ({ children }) => {
  const isLoggedIn = useAppSelector(checkAuth);
  const router = useRouter();

  if (!isLoggedIn) {
    router.push('/login');
  }

  return <div className="AuthGuard">{children}</div>;
};

export default AuthGuard;
