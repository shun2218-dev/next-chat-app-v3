import { FC, useMemo } from 'react';

type Props = {
  sender: 'own' | 'other';
  message: string;
};

const ChatBubble: FC<Props> = ({ sender, message }) => {
  const switchContainerStyle = useMemo(() => {
    const commonStyles = ['relative', 'max-w-xs', 'p-3', 'rounded-lg'];

    switch (sender) {
      case 'own':
        return [...commonStyles, 'own', 'bg-blue-500', 'text-white'].join(' ');
      case 'other':
        return [...commonStyles, 'other', 'bg-gray-300', 'text-gray-900'].join(
          ' '
        );
    }
  }, []);

  const switchTriangleStyle = useMemo(() => {
    const commonStyles = [
      'absolute',
      'w-0',
      'h-0',
      'border-t-8',
      'border-t-transparent',
      'border-b-8',
      'border-b-transparent',
      '!bg-transparent',
    ];

    switch (sender) {
      case 'own':
        return [
          ...commonStyles,
          'own',
          'right-0',
          '-mr-2',
          'bg-blue-500',
          'text-white',
          'border-l-8',
          'border-l-blue-500',
        ].join(' ');
      case 'other':
        return [
          ...commonStyles,
          'other',
          'left-0',
          '-ml-2',
          'bg-gray-300',
          'text-gray-900',
          'border-r-8',
          'border-r-gray-300',
        ].join(' ');
    }
  }, []);

  return (
    <div className={switchContainerStyle} data-testid="chat-bubble-container">
      <div className={switchTriangleStyle} data-testid="chat-bubble-triangle" />
      <p>{message}</p>
    </div>
  );
};

export { ChatBubble };
