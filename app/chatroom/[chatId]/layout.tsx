import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const ChatRoomWithSomeoneLayout = ({ children }: Props) => {
  return (
    <div className="w-full md:w-[80%] h-full border-small mx-auto px-1 pb-2 rounded-small border-default-200 dark:border-default-100 relative">
      {children}
    </div>
  );
};

export default ChatRoomWithSomeoneLayout;
