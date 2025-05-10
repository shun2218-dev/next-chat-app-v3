import { render, screen } from '@testing-library/react';

import { ErrorPanel } from './ErrorPanel';

describe('ErrorPanel', () => {
  it('renders children text correctly', () => {
    render(<ErrorPanel>Something went wrong</ErrorPanel>);

    const errorElement = screen.getByTestId('error-panel');

    expect(errorElement).toHaveTextContent('Something went wrong');
  });

  it.each([
    'text-red-500',
    'bg-red-500',
    'bg-opacity-10',
    'text-center',
    'p-3',
    'mb-3',
    'rounded-md',
  ] as const)('should have class: %s', (className) => {
    render(<ErrorPanel>Class check</ErrorPanel>);

    const errorElement = screen.getByTestId('error-panel');

    expect(errorElement).toHaveClass(className);
  });
});
