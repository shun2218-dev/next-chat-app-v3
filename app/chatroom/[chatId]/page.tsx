'use client';
import type { FC } from 'react';
import type { Message } from '@/types';

import { useState } from 'react';
import { Input } from '@nextui-org/input';
import SendIcon from '@mui/icons-material/Send';
import { Button } from '@nextui-org/button';
import { useSession } from 'next-auth/react';
import {
  addDoc,
  collection,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';

import { IconWrapper } from '@/components/uiParts/IconWrapper/IconWrapper';
import { db } from '@/libs/firebase/client';
import { Chat } from '@/components/projects/Chat/Chat';

type Props = {
  params: { chatId: string };
};

const ChatRoomWithSomeone: FC<Props> = ({ params }) => {
  const { data: session } = useSession();
  const [message, setMessage] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

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
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  return (
    <div className="ChatRoomWithSomeone flex flex-col h-full">
      <div className="flex-auto ChatRoomWithSomeone__messageArea">
        <Chat chatId={params.chatId} />
      </div>
      <div className="ChatRoomWithSomeone__inputArea">
        <Input
          className="w-full"
          endContent={
            <IconWrapper className="bg-slate/10 text-slate">
              <Button
                isIconOnly
                className="bg-transparent"
                onClick={handleSendMessage}
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
  );
};

export default ChatRoomWithSomeone;
