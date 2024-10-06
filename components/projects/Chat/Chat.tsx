'use client';

import type { Message } from '@/types';
import type { FC } from 'react';

import { useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { Timestamp } from 'firebase/firestore';

import { useRealTimeChat } from '@/hooks/useRealTimeChat';
import { ChatBubble } from '@/components/uiParts/ChatBubble/ChatBubble';

type Props = {
  chatId: string;
};

export const Chat: FC<Props> = ({ chatId }) => {
  const { data: session } = useSession();
  const messages = useRealTimeChat(chatId);

  const whichMsg = useCallback((senderUid: string) => {
    return senderUid === session?.user.id ? 'own' : 'other';
  }, []);

  const formatTime = (timestamp: Timestamp) => {
    const [hh, mm] = timestamp.toDate().toLocaleTimeString().split(':');

    return `${hh}:${mm}`;
  };

  return (
    <div className="flex flex-col space-y-4 p-4">
      {messages.map(
        (msg: Message) =>
          msg.timestamp !== null && (
            <div
              key={msg.timestamp.seconds}
              className={[
                'flex',
                whichMsg(msg.senderUid) === 'own'
                  ? 'justify-end'
                  : 'justify-start',
                'gap-x-2',
              ].join(' ')}
            >
              {whichMsg(msg.senderUid) === 'own' && (
                <span className="self-end">{formatTime(msg.timestamp)}</span>
              )}
              <ChatBubble
                message={msg.content}
                sender={whichMsg(msg.senderUid)}
              />
              {whichMsg(msg.senderUid) === 'other' && (
                <span className="self-end">{formatTime(msg.timestamp)}</span>
              )}
            </div>
          )
      )}
    </div>
  );
};
