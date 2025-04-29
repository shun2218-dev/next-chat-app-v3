import { useTheme } from 'next-themes';
import { FC, memo, useCallback, useMemo } from 'react';

type Props = {
  timestamp: Date;
  isScrolled: boolean;
};

const ChatDateMemo: FC<Props> = ({ timestamp, isScrolled }) => {
  const { theme } = useTheme();

  const formatDate = useMemo((): string => {
    const [, month, date] = timestamp.toLocaleDateString().split('/');

    const getDayOfWeekFromDate = (dateString: string): string => {
      const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const date = new Date(dateString);

      const dayIndex = date.getDay();

      return daysOfWeek[dayIndex];
    };

    return `${month}/${date} (${getDayOfWeekFromDate(timestamp.toLocaleDateString())})`;
  }, [timestamp]);

  const switchColor = useCallback(
    (isScrolled: boolean) => {
      const commonStyles =
        theme === 'dark'
          ? 'border-gray-200 bg-white'
          : 'border-gray-200 bg-black';

      if (isScrolled) {
        return [
          commonStyles,
          theme === 'dark' ? 'text-black' : 'text-white',
        ].join(' ');
      } else {
        return [commonStyles, 'bg-opacity-10'].join(' ');
      }
    },
    [isScrolled, theme]
  );

  return (
    <div className="w-full sticky top-0 md:top-5 z-10 text-center pt-3 md:pt-0 pb-4">
      <span
        className={[
          'text-sm rounded-3xl shadow-md px-6 py-2',
          switchColor(isScrolled),
        ].join(' ')}
        data-testid="chat-date-text"
      >
        {formatDate}
      </span>
    </div>
  );
};

const ChatDate = memo(ChatDateMemo);

export { ChatDate };
