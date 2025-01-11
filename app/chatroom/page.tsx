'use client';
import { FriendUserList } from '@/components/projects/FriendUserList/FriendUserList';
import { Sidebar } from '@/components/projects/Sidebar/Sidebar';

export default function ChatroomPage() {
  return (
    <Sidebar>
      <FriendUserList />
    </Sidebar>
  );
}
