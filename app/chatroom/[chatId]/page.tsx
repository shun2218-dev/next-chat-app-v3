'use client';
import type { Message, Msg } from '@/types';

import { use, useCallback, useEffect, useState } from 'react';
import { Input } from '@heroui/input';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import SendIcon from '@mui/icons-material/Send';
import { Button } from '@heroui/button';
import { useSession } from 'next-auth/react';
import {
  addDoc,
  collection,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { useToggle } from 'react-use';
import { Skeleton } from '@heroui/skeleton';
import { Spinner } from '@heroui/spinner';

import { IconWrapper } from '@/components/uiParts/IconWrapper/IconWrapper';
import { db } from '@/libs/firebase/client';
import { Chat } from '@/components/projects/Chat/Chat';

type Params = Promise<{ chatId: string }>;

const ChatRoomWithSomeone = (props: { params: Params }) => {
  const params = use(props.params);
  const router = useRouter();
  const { data: session, status } = useSession();
  const [message, setMessage] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [partnerName, setPartnerName] = useState<string | null>(null);
  const [isLoading, toggleIsLoading] = useToggle(false);

  if (status === 'unauthenticated') {
    router.push('/login');
  }

  const handleSendMessage = async () => {
    if (!message.trim()) return;
    try {
      if (!session?.user.id) throw new Error('You must be logged in');

      // Create a message object based on the defined Message type
      const newMessage: Message = {
        content: message,
        timestamp: serverTimestamp() as unknown as Timestamp, // Using Firestore server timestamp
        senderUid: session?.user.id, // Replace with actual sender UID from session/auth
      };

      // Add the message to the Firestore chat collection
      await addDoc(
        collection(db, 'chats', params.chatId, 'messages'),
        newMessage
      );

      setMessage(''); // Clear the input field after sending the message
    } catch (err: unknown) {
      if (err instanceof Error) {
        // eslint-disable-next-line no-console
        console.error(err.message);
        setErrorMsg(err.message);
      }
    }
  };

  const getPartnerName = useCallback(async () => {
    try {
      toggleIsLoading(true);
      const res = await fetch(
        `/api/user/friend/partner?room_id=${params.chatId}`
      );

      if (!res.ok) {
        const data = (await res.json()) as Msg;

        throw new Error(data.message);
      }

      const data = (await res.json()) as { partnername: string };

      setPartnerName(data.partnername);
    } catch (e: unknown) {
      if (e instanceof Error) {
        // eslint-disable-next-line no-console
        console.error(e.message);
      } else {
        // eslint-disable-next-line no-console
        console.error('Failed to get the name of partner');
      }
    } finally {
      toggleIsLoading(false);
    }
  }, []);

  useEffect(() => {
    (async () => {
      await getPartnerName();
    })();
  }, []);

  return (
    <>
      <div className="ChatRoomWithSomeone flex flex-col h-full">
        <div className="ChatRoomWithSomeone__header grid grid-flow-col place-items-center">
          <Button
            className="bg-transparent col-span-1 w-fit absolute left-0"
            onPress={() => router.back()}
          >
            <ChevronLeftIcon />
          </Button>
          {isLoading ? (
            <Skeleton className="m-3 p-3 h-[1rem] w-[50%] rounded-md" />
          ) : (
            <div className="ChatRoomWithSomeone__partnerName text-center p-3 font-bold">
              {partnerName}
            </div>
          )}
        </div>
        <div className="flex-auto ChatRoomWithSomeone__messageArea h-[90%] md:h-[95%]">
          {status === 'loading' ? (
            <div className="flex justify-center items-center h-full">
              <Spinner />
            </div>
          ) : (
            <Chat chatId={params.chatId} />
          )}
        </div>
        <div className="ChatRoomWithSomeone__inputArea">
          <Input
            className="w-full"
            endContent={
              <IconWrapper className="bg-slate/10 text-slate">
                <Button
                  isIconOnly
                  className="bg-transparent"
                  onPress={handleSendMessage}
                >
                  <SendIcon />
                </Button>
              </IconWrapper>
            }
            errorMessage={errorMsg}
            value={message}
            variant="bordered"
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
      </div>
    </>
  );
};

export default ChatRoomWithSomeone;
