'use client';
import type { ReactNode } from 'react';

import { Sidebar } from '@/components/projects/Sidebar/Sidebar';
import { FriendUserList } from '@/components/projects/FriendUserList/FriendUserList';

type Props = {
  children: ReactNode;
};

function ChatRoomLayout({ children }: Props) {
  return (
    <div className="h-full flex gap-x-4">
      <Sidebar>
        <FriendUserList />
      </Sidebar>
      {children}
    </div>
  );
}

export default ChatRoomLayout;
