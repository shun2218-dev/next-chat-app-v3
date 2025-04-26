import type { StorybookConfig } from '@storybook/nextjs';

import { join, dirname, resolve } from 'path';

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, 'package.json')));
}
const config: StorybookConfig = {
  stories: ['../components/**/*.stories.@(ts|tsx)'],
  build: {
    test: {
      disabledAddons: [
        '@storybook/addon-docs',
        '@storybook/addon-essentials/docs',
      ],
    },
  },
  addons: [
    getAbsolutePath('@storybook/addon-essentials'),
    getAbsolutePath('@storybook/addon-onboarding'),
    getAbsolutePath('@chromatic-com/storybook'),
  ],
  framework: {
    name: getAbsolutePath('@storybook/nextjs'),
    options: {},
  },
  staticDirs: ['..\\public'],
  webpackFinal: async (config) => {
    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@/hooks/useRealTimeChat': resolve(
          __dirname,
          '../__mocks__/hooks/useRealTimeChat.ts'
        ),
      };
    }

    return config;
  },
};
export default config;
