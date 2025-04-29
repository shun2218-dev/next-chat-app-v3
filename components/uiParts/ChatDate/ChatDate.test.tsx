import { useTheme } from 'next-themes';
import { render, screen } from '@testing-library/react';

import { ChatDate } from './ChatDate';

jest.mock('next-themes', () => ({
  useTheme: jest.fn(),
}));

describe('ChatDate', () => {
  const mockUseTheme = useTheme as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders formatted date correctly', () => {
    mockUseTheme.mockReturnValue({ thtme: 'light' });
    const testDate = new Date('2025-04-30T00:00:00Z');

    render(<ChatDate isScrolled={false} timestamp={testDate} />);

    const dateElement = screen.getByTestId('chat-date-text');

    expect(dateElement).toHaveTextContent('4/30 (Wed)');
  });

  it('applies correct class when isScrolled is true in light theme', () => {
    mockUseTheme.mockReturnValue({ thtme: 'light' });
    const testDate = new Date();

    render(<ChatDate isScrolled={true} timestamp={testDate} />);

    const datelement = screen.getByTestId('chat-date-text');

    expect(datelement.className).toContain('text-white');
  });

  it('applies correct class when isScrolled is false in light theme', () => {
    mockUseTheme.mockReturnValue({ thtme: 'light' });
    const testDate = new Date();

    render(<ChatDate isScrolled={false} timestamp={testDate} />);

    const datelement = screen.getByTestId('chat-date-text');

    expect(datelement.className).toContain('bg-opacity-10');
  });
});
