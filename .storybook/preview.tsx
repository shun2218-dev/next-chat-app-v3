import '../styles/globals.css';

import React from 'react';
import type { Preview } from '@storybook/react';
import { NextUIProvider } from '@nextui-org/react';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <NextUIProvider>
        <Story />
      </NextUIProvider>
    ),
  ],
};

export default preview;
