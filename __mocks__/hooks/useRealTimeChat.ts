export const useRealTimeChat = () => {
  return [
    {
      content: 'Hello!',
      timestamp: { toDate: () => new Date('2025-04-01 10:00:00') },
      senderUid: 'user1',
    },
    {
      content: 'Hi!',
      timestamp: { toDate: () => new Date('2025-04-01 11:01:30') },
      senderUid: 'user2',
    },
    {
      content: 'How are you?',
      timestamp: { toDate: () => new Date('2025-04-01 11:01:43') },
      senderUid: 'user2',
    },
    {
      content: "I'm doing great, thanks! How about you?",
      timestamp: { toDate: () => new Date('2025-04-01 11:02:37') },
      senderUid: 'user1',
    },
    {
      content: "I'm good too, just working on a project.",
      timestamp: { toDate: () => new Date('2025-04-01 11:31:00') },
      senderUid: 'user2',
    },
    {
      content: "That's awesome! What kind of project?",
      timestamp: { toDate: () => new Date('2025-04-02 13:03:10') },
      senderUid: 'user1',
    },
    {
      content: "It's a chat app, actually!",
      timestamp: { toDate: () => new Date('2025-04-02 14:00:00') },
      senderUid: 'user2',
    },
    {
      content: 'Sounds really cool! Let me know if you need any help.',
      timestamp: { toDate: () => new Date('2025-04-03 10:00:00') },
      senderUid: 'user1',
    },
  ];
};
