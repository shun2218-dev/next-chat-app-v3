'use client';

import type { ReactNode } from 'react';

import { NextUIProvider } from '@nextui-org/system';
import { useRouter } from 'next/navigation';
import {
  ThemeProvider as NextThemesProvider,
  ThemeProviderProps,
} from 'next-themes';
import { SessionProvider } from 'next-auth/react';

export interface ProvidersProps {
  children: ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();

  return (
    <SessionProvider>
      <NextUIProvider navigate={router.push}>
        <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
      </NextUIProvider>
    </SessionProvider>
  );
}
