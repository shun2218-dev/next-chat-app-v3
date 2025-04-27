import '../styles/globals.css';

import type { Preview } from '@storybook/react';

import React from 'react';
import { HeroUIProvider } from '@heroui/react';
import { SessionProvider } from 'next-auth/react';
import { initialize, mswLoader } from 'msw-storybook-addon';
import { http, HttpResponse } from 'msw';

const mockSession = {
  user: {
    id: 'user1',
    name: 'John Doe',
    image: 'https://placehold.jp/150x150.png',
    email: 'storybook@example.com',
    role: 'USER',
  },
  expires: new Date(Date.now() + 1000 * 60 * 5).toISOString(), // 5 minutes
};

initialize();

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    nextjs: {
      appDirectory: true,
    },
    msw: {
      handlers: [
        http.get('/api/auth/session', () => {
          return HttpResponse.json({
            ...mockSession,
            expires: new Date(Date.now() + 1000 * 60 * 5).toISOString(),
          });
        }),
      ],
    },
  },
  decorators: [
    (Story) => (
      <SessionProvider session={mockSession}>
        <HeroUIProvider>
          <Story />
        </HeroUIProvider>
      </SessionProvider>
    ),
  ],
  loaders: [mswLoader],
};

export default preview;
