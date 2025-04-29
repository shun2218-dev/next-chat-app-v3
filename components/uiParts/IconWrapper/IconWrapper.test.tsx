import { render, screen } from '@testing-library/react';

import { IconWrapper } from './IconWrapper';

describe('IconWrapper', () => {
  it('renders children correctly', () => {
    render(
      <IconWrapper className="custom-class">
        <span>Icon</span>
      </IconWrapper>
    );

    expect(screen.getByText('Icon')).toBeInTheDocument();
  });

  it.each([
    'custom-class',
    'flex',
    'items-center',
    'rounded-small',
    'justify-center',
    'w-7',
    'h-7',
  ] as const)('should have class: %s', (className) => {
    render(
      <IconWrapper className="custom-class">
        <span>Check</span>
      </IconWrapper>
    );

    const wrapper = screen.getByTestId('icon-wrapper');

    expect(wrapper).toHaveClass(className);
  });
});
