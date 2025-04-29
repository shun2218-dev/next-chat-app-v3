import { render, screen } from '@testing-library/react';

import { ChatBubble } from './ChatBubble';

describe('ChatBubble', () => {
  it('renders message text correctly', () => {
    render(<ChatBubble message="Hello from own" sender="own" />);
    expect(screen.getByText('Hello from own')).toBeInTheDocument();
  });

  describe('applies correct classes for own sender', () => {
    it.each(['own', 'bg-blue-500', 'text-white'] as const)(
      'container should have class: %s',
      (className) => {
        render(<ChatBubble message="Own message" sender="own" />);

        const container = screen.getByTestId('chat-bubble-container');

        expect(container).toHaveClass(className);
      }
    );

    it('triangle should have class border-l-blue-500', () => {
      render(<ChatBubble message="Own message" sender="own" />);

      const triangle = screen.getByTestId('chat-bubble-triangle');

      expect(triangle).toHaveClass('border-l-blue-500');
    });
  });

  describe('applies correct classes for other sender', () => {
    it.each(['other', 'bg-gray-300', 'text-gray-900'] as const)(
      'container should have class: %s',
      (className) => {
        render(<ChatBubble message="Own message" sender="other" />);

        const container = screen.getByTestId('chat-bubble-container');

        expect(container).toHaveClass(className);
      }
    );

    it('triangle should have class border-r-gray-300', () => {
      render(<ChatBubble message="Own message" sender="other" />);

      const triangle = screen.getByTestId('chat-bubble-triangle');

      expect(triangle).toHaveClass('border-r-gray-300');
    });
  });
});
