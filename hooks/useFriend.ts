import type { FriendUser, MsgWithRoomId } from '@/types';

import { useCallback, useState } from 'react';
import { useToggle } from 'react-use';

export const useFriend = () => {
  const [friendUsers, setFriendUsers] = useState<FriendUser[] | null>(null);
  const [checkFriendIsLoading, toggleCheckFriendLoading] = useToggle(false);
  const [addFriendIsLoading, toggleAddFriendLoading] = useToggle(false);
  const [getFriendIsLoading, toggleGetFriendLoading] = useToggle(false);

  const isFriendAlready = useCallback(
    async (friendId: string): Promise<boolean> => {
      // Logic to check the friend registration status
      // Returns true if they are friends, false otherwise
      toggleCheckFriendLoading(true);
      try {
        if (checkFriendIsLoading) throw new Error('Checking the friend now');
        const res = await fetch(`/api/user/friend/check?friendId=${friendId}`, {
          method: 'GET',
        });

        if (!res.ok) throw new Error('Internal server error');

        const isFriend = (await res.json()) as boolean;

        return isFriend;
      } catch (err: unknown) {
        if (err instanceof Error) {
          // eslint-disable-next-line no-console
          console.error(err.message);
        }

        return false;
      } finally {
        toggleCheckFriendLoading(false);
      }
    },
    []
  );

  const addFriend = useCallback(
    async (friendId: string): Promise<MsgWithRoomId> => {
      toggleAddFriendLoading(true);
      try {
        if (addFriendIsLoading) throw new Error('Adding the friend now');
        const isFriend = await isFriendAlready(friendId);

        if (isFriend) throw new Error('The friend had already added');

        const res = await fetch('/api/user/friend/add', {
          method: 'POST',
          body: JSON.stringify({ friendId }),
        });

        if (!res.ok) throw new Error('Failed to add friend');

        const results = (await res.json()) as MsgWithRoomId;

        return results;
      } catch (err: unknown) {
        if (err instanceof Error) {
          // eslint-disable-next-line no-console
          console.error(err.message);

          return { message: err.message };
        }

        return { message: 'Something seems to be wrong' };
      } finally {
        toggleAddFriendLoading(false);
      }
    },
    []
  );

  const getFriendUsers = useCallback(async () => {
    toggleGetFriendLoading(true);
    setFriendUsers(null);
    try {
      const res = await fetch('/api/user/friend', {
        method: 'GET',
      });

      if (!res.ok) throw new Error('Could not get users');

      const results = (await res.json()) as FriendUser[];

      setFriendUsers(results);
    } catch (err: unknown) {
      if (err instanceof Error) {
        // eslint-disable-next-line no-console
        console.error(err);
      }

      setFriendUsers([]);
    } finally {
      toggleGetFriendLoading(false);
    }
  }, []);

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
