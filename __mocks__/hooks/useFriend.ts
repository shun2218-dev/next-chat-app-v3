import type { FriendUser, MsgWithRoomId } from '@/types';

import { useState } from 'react';
import { useToggle } from 'react-use';

export const useFriend = () => {
  const [friendUsers, setFriendUsers] = useState<FriendUser[] | null>(null);
  const [checkFriendIsLoading, toggleCheckFriendLoading] = useToggle(false);
  const [addFriendIsLoading, toggleAddFriendLoading] = useToggle(false);
  const [getFriendIsLoading, toggleGetFriendLoading] = useToggle(false);

  const isFriendAlready = (): Promise<boolean> => {
    toggleCheckFriendLoading(true);

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true); // Simulate a successful check
        toggleCheckFriendLoading(false);
      }, 1000);
    });
  };

  const addFriend = (): Promise<MsgWithRoomId> => {
    toggleAddFriendLoading(true);

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ message: 'Friend added successfully', roomId: '12345' });
        toggleAddFriendLoading(false);
      }, 1000);
    });
  };

  const getFriendUsers = async () => {
    toggleGetFriendLoading(true);

    const result = await new Promise<FriendUser[]>((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: '1',
            name: 'John Doe',
            email: 'user1@example.com',
            image: 'https://placehold.jp/150x150.png',
            chatId: '12345',
          },
          {
            id: '2',
            name: 'Jane Smith',
            email: 'user2@example.com',
            image: 'https://placehold.jp/150x150.png',
            chatId: '56789',
          },
        ]);
      }, 1000);
    });

    setFriendUsers(result);

    toggleGetFriendLoading(false);
  };

  return {
    isFriendAlready,
    addFriend,
    getFriendUsers,
    friendUsers,
    setFriendUsers,
    isCheckLoading: checkFriendIsLoading,
    isAddLoading: addFriendIsLoading,
    isGetLoading: getFriendIsLoading,
  };
};
