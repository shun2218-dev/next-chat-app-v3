export const useSession = () => {
  return {
    data: {
      user: {
        id: 'user1',
        name: 'John Doe',
        email: 'test@example.com',
        image: 'https://placehold.jp/150x150.png',
      },
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(), // 1 day
    },
  };
};
