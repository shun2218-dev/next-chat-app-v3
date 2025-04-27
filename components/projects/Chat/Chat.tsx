'use client';

import type { Message } from '@/types';
import type { FC, RefObject } from 'react';

import { Fragment, useCallback, useRef } from 'react';
import { Timestamp } from 'firebase/firestore';
import { ScrollShadow } from '@heroui/scroll-shadow';
import { useScroll } from 'react-use';
import { useSession } from 'next-auth/react';

import { useRealTimeChat } from '#hooks/useRealTimeChat';
import { ChatBubble } from '@/components/uiParts/ChatBubble/ChatBubble';
import { ChatDate } from '@/components/uiParts/ChatDate/ChatDate';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';

type Props = {
  chatId: string;
};

export const Chat: FC<Props> = ({ chatId }) => {
  const { data: session } = useSession();
  const messages = useRealTimeChat(chatId);
  const bottomRef = useSmoothScroll(messages);
  const scrollRef = useRef<HTMLElement>(null);
  const { y } = useScroll(scrollRef as RefObject<HTMLElement>);

  const whichMsg = useCallback((senderUid: string) => {
    return senderUid === session?.user.id ? 'own' : 'other';
  }, []);

  const formatTime = useCallback((timestamp: Timestamp) => {
    const [hh, mm] = timestamp.toDate().toLocaleTimeString().split(':');

    return `${hh}:${mm}`;
  }, []);

  const isOwnMessage = useCallback(
    (senderUid: string) => whichMsg(senderUid) === 'own',
    []
  );

  const shouldDisplayDate = useCallback(
    (
      currentMessageTimestamp: Timestamp,
      previousMessageTimestamp: Timestamp
    ) => {
      return (
        currentMessageTimestamp.toDate().toLocaleDateString() !==
        previousMessageTimestamp.toDate().toLocaleDateString()
      );
    },
    []
  );

  return (
    <ScrollShadow
      ref={scrollRef}
      className="flex flex-col space-y-4 p-4 h-[98%]"
    >
      {messages.map(
        (msg: Message, index) =>
          msg.timestamp !== null && (
            <Fragment key={`${msg.timestamp.nanoseconds}_${index}`}>
              {(index === 0 ||
                shouldDisplayDate(
                  msg.timestamp,
                  messages[index - 1].timestamp
                )) && (
                <ChatDate
                  isScrolled={y > 10}
                  timestamp={msg.timestamp.toDate()}
                />
              )}
              <div
                className={[
                  'flex',
                  isOwnMessage(msg.senderUid) ? 'justify-end' : 'justify-start',
                  'gap-x-2',
                ].join(' ')}
              >
                {isOwnMessage(msg.senderUid) && (
                  <span className="self-end">{formatTime(msg.timestamp)}</span>
                )}
                <ChatBubble
                  message={msg.content}
                  sender={whichMsg(msg.senderUid)}
                />
                {!isOwnMessage(msg.senderUid) && (
                  <span className="self-end">{formatTime(msg.timestamp)}</span>
                )}
              </div>
            </Fragment>
          )
      )}
      <div ref={bottomRef} />
    </ScrollShadow>
  );
};
