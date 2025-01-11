'use client';
import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

function ChatRoomLayout({ children }: Props) {
  return <div className="h-full flex gap-x-4">{children}</div>;
}

export default ChatRoomLayout;
