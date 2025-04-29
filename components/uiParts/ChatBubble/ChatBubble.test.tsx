import { render, screen } from '@testing-library/react';

import { ChatBubble } from './ChatBubble';

describe('ChatBubble', () => {
  it('renders message text correctly', () => {
    render(<ChatBubble message="Hello from own" sender="own" />);
    expect(screen.getByText('Hello from own')).toBeInTheDocument();
  });

  it('applies correct classes for own sender', () => {
    render(<ChatBubble message="Own message" sender="own" />);

    const parentDiv = screen.getByTestId('chat-bubble-container');

    expect(parentDiv).toHaveClass('own');
    expect(parentDiv).toHaveClass('bg-blue-500');
    expect(parentDiv).toHaveClass('text-white');

    const triangleDiv = screen.getByTestId('chat-bubble-triangle');

    expect(triangleDiv).toHaveClass('border-l-blue-500');
  });

  it('applies correct classes for other sender', () => {
    render(<ChatBubble message="Other message" sender="other" />);

    const parentDiv = screen.getByTestId('chat-bubble-container');

    expect(parentDiv).toHaveClass('other');
    expect(parentDiv).toHaveClass('bg-gray-300');
    expect(parentDiv).toHaveClass('text-gray-900');

    const triangleDiv = screen.getByTestId('chat-bubble-triangle');

    expect(triangleDiv).toHaveClass('border-r-gray-300');
  });
});
