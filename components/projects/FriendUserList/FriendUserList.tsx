'use client';
import { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Listbox, ListboxItem } from '@nextui-org/listbox';
import { Avatar } from '@nextui-org/avatar';
import { Spinner } from '@nextui-org/spinner';

import { ErrorPanel } from '@/components/uiParts/ErrorPanel/ErrorPanel';
import { useFriend } from '#hooks/useFriend';
import { AddFriend } from '@/components/projects/AddFriend/AddFriend';

export const FriendUserList = () => {
  const [selectedKeys, setSelectedKeys] = useState<
    'all' | Set<string | number>
  >(new Set<string>([]));
  const router = useRouter();
  const { getFriendUsers, friendUsers } = useFriend();

  useEffect(() => {
    (async () => {
      if (friendUsers === null) {
        await getFriendUsers();
      }
    })();
  }, []);

  useEffect(() => {
    if (Array.from(selectedKeys).length > 0) {
      router.push(`/chatroom/${Array.from(selectedKeys)[0]}`);
    } else {
      router.push(`/chatroom`);
    }
  }, [selectedKeys]);

  if (friendUsers === null) {
    return (
      <div className="w-full h-1/2 flex justify-center items-center">
        <Spinner label="loading..." size="md" />
      </div>
    );
  }

  return (
    <Fragment>
      <Listbox
        bottomContent={<AddFriend />}
        classNames={{
          base: 'max-w-full',
          list: 'max-h-[300px]',
        }}
        defaultSelectedKeys={['1']}
        emptyContent={
          <ErrorPanel>
            There may be no users other than you. <br />
            Invite others to join this chat!
          </ErrorPanel>
        }
        items={friendUsers}
        label="Assigned to"
        selectedKeys={selectedKeys}
        selectionMode="single"
        variant="flat"
        onSelectionChange={setSelectedKeys}
      >
        {(item) => (
          <ListboxItem
            key={item.chatId}
            className="UserList"
            textValue={item.name ?? 'Unkonown'}
          >
            <div className="flex gap-2 items-center">
              <Avatar
                showFallback
                alt={item.name ?? 'Unkonown'}
                className="flex-shrink-0"
                name={item.name ?? 'Unkonown'}
                size="sm"
                src={item.image!}
              />
              <div className="flex flex-col">
                <span className="text-small">{item.name}</span>
                <span className="text-tiny text-default-400">{item.email}</span>
              </div>
            </div>
          </ListboxItem>
        )}
      </Listbox>
    </Fragment>
  );
};
