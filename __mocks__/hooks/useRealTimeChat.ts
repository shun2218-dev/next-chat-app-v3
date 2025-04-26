export const useRealTimeChat = () => {
  return [
    {
      content: 'Hello!',
      timestamp: { toDate: () => new Date('2025-04-01 10:00:00') },
      senderUid: 'user1',
    },
    {
      content: 'Hi!',
      timestamp: { toDate: () => new Date('2025-04-01 11:00:00') },
      senderUid: 'user2',
    },
    {
      content: 'How are you?',
      timestamp: { toDate: () => new Date('2025-04-02 10:00:00') },
      senderUid: 'user2',
    },
  ];
};
