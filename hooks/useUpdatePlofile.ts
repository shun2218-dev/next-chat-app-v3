import { useState } from 'react';
import { useToggle } from 'react-use';

import { useUploadFile } from './useUploadFile';

import { useUserStore } from '@/stores/user';

type UpdateProfileArgs = {
  profileImage: File | null;
  username: string;
};

export const useUpdateProfile = () => {
  const { revalidateProfile } = useUserStore();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, toggleIsLoading] = useToggle(false);
  const { uploadFile } = useUploadFile();

  const updateProfile = async ({
    profileImage,
    username,
  }: UpdateProfileArgs) => {
    try {
      toggleIsLoading(true);
      const imageUrl = await uploadFile('avatars', profileImage);
      const res = await fetch('/api/profile/update', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: username, imageUrl: imageUrl }),
      });

      if (!res.ok) throw new Error('Failed to change username');

      setErrorMsg(null);

      await revalidateProfile();

      return { message: 'OK' };
    } catch (err) {
      if (err instanceof Error) {
        // eslint-disable-next-line no-console
        console.error(err);
        setErrorMsg(err.message);
      }

      return { message: 'NG' };
    } finally {
      toggleIsLoading(false);
    }
  };

  return {
    isLoading,
    errorMsg,
    updateProfile,
  };
};
