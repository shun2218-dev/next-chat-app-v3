import { createJsWithTsEsmPreset, type JestConfigWithTsJest } from 'ts-jest';

const presetConfig = createJsWithTsEsmPreset({
  tsconfig: '<rootDir>/tsconfig.test.json',
});

const jestConfig: JestConfigWithTsJest = {
  ...presetConfig,
  testEnvironment: 'jest-environment-jsdom',
  testMatch: [
    '<rootDir>/components/**/*.test.ts',
    '<rootDir>/components/**/*.test.tsx',
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
};

export default jestConfig;
