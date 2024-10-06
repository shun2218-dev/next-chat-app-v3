import { Timestamp } from 'firebase/firestore';
import { FC, memo, useMemo } from 'react';

type Props = {
  timestamp: Timestamp;
};

const ChatDateMemo: FC<Props> = ({ timestamp }) => {
  const formatDate = useMemo((): string => {
    const [, month, date] = timestamp.toDate().toLocaleDateString().split('/');

    const getDayOfWeekFromDate = (dateString: string): string => {
      const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const date = new Date(dateString);

      const dayIndex = date.getDay();

      return daysOfWeek[dayIndex];
    };

    return `${month}/${date} (${getDayOfWeekFromDate(
      timestamp.toDate().toLocaleDateString()
    )})`;
  }, []);

  return (
    <div className="w-full sticky top-0 z-10 text-center">
      <span className="text-sm bg-white bg-opacity-10 rounded-3xl shadow-md px-6 py-2">
        {formatDate}
      </span>
    </div>
  );
};

const ChatDate = memo(ChatDateMemo);

export { ChatDate };
