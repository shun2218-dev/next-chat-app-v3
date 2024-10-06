import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const ChatRoomWithSomeoneLayout = ({ children }: Props) => {
  return (
    <div className="w-full h-full border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
      {children}
    </div>
  );
};

export default ChatRoomWithSomeoneLayout;
