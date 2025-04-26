import '../styles/globals.css';

import React from 'react';
import type { Preview } from '@storybook/react';
import { NextUIProvider } from '@nextui-org/react';
import { SessionProvider } from 'next-auth/react';

const mockSession = {
  user: {
    id: 'mockUserId',
    name: 'John Doe',
    email: 'mock@example.com',
    image: 'https://placehold.jp/150x150.png',
  },
  expires: new Date(Date.now() + 1000 * 60 * 60 * 24).toString(), // 1 day
};

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
  },
  decorators: [
    (Story) => (
      <SessionProvider session={mockSession}>
        <NextUIProvider>
          <Story />
        </NextUIProvider>
      </SessionProvider>
    ),
  ],
};

export default preview;
