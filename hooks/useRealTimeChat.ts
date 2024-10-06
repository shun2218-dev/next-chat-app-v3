'use client';

import type { Message } from '@/types'; // Import Message type

import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';

import { db } from '@/libs/firebase/client';

export const useRealTimeChat = (chatId: string) => {
  const [messages, setMessages] = useState<Message[]>([]); // Use Message type for state

  useEffect(() => {
    const q = query(
      collection(db, 'chats', chatId, 'messages'),
      orderBy('timestamp', 'asc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Message, 'id'>),
      })); // Cast Firestore data to Message type

      setMessages(messages);
    });

    return () => unsubscribe();
  }, [chatId]);

  return messages;
};
