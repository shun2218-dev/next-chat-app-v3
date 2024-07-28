'use client';

import type { ReactNode } from 'react';
import type { AppStore } from '@/libs/store';

import { useRef } from 'react';
import { Provider } from 'react-redux';
import { NextUIProvider } from '@nextui-org/system';
import { useRouter } from 'next/navigation';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { ThemeProviderProps } from 'next-themes/dist/types';
import { PersistGate } from 'redux-persist/integration/react';
import { Persistor, persistStore } from 'redux-persist';
import { SessionProvider } from 'next-auth/react';

import { makeStore, persistor } from '@/libs/store';

export interface ProvidersProps {
  children: ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();
  const storeRef = useRef<AppStore>();
  const persistorRef = useRef<Persistor>(persistor);

  if (!storeRef.current) {
    // Create the store instance the first time this renders
    const store = makeStore();

    storeRef.current = store;
    persistorRef.current = persistStore(store);
  }

  return (
    <SessionProvider>
      <Provider store={storeRef.current}>
        <PersistGate loading={null} persistor={persistorRef.current}>
          <NextUIProvider navigate={router.push}>
            <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
          </NextUIProvider>
        </PersistGate>
      </Provider>
    </SessionProvider>
  );
}
