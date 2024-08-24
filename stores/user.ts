import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

import { Msg, UserProfile } from '@/types';

type State = {
  username: string;
  imageUrl: string;
  updateProfile: () => Promise<void>;
  resetProfile: () => void;
};

export const useUserStore = create<State>()(
  devtools(
    persist(
      (set) => ({
        username: '',
        imageUrl: '',
        updateProfile: async () => {
          try {
            const res = await fetch('/api/profile', {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            });

            if (!res.ok) {
              const errorMessage = (await res.json()) as Msg;

              throw new Error(`Could not get profile: ${errorMessage.message}`);
            }

            const profile = (await res.json()) as UserProfile;

            set({ ...profile });
          } catch (err) {
            console.error(err);
          }
        },
        resetProfile: () =>
          set((state) => ({ ...state, username: '', imageUrl: '' })),
      }),
      { name: 'profile', storage: createJSONStorage(() => sessionStorage) }
    )
  )
);
