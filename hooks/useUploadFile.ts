import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useSession } from 'next-auth/react';
import { useToggle } from 'react-use';

import { storage } from '@/libs/firebase/client';

export const useUploadFile = () => {
  const { data: session } = useSession();
  const [isLoading, toggleIsLoading] = useToggle(false);

  const uploadFile = async (
    bucketName: string,
    uploadFile: File | null
  ): Promise<string> => {
    try {
      toggleIsLoading(true);
      if (!uploadFile) throw new Error('Upload file is required');

      if (!session) throw new Error('Invalid session');

      const storageRef = ref(
        storage,
        `${bucketName}/${session.user.id}/${session.user.id}_${Date.now()}_${uploadFile.name}`
      );

      const file = await uploadBytes(storageRef, uploadFile);

      const uploadFileUrl = await getDownloadURL(file.ref);

      return uploadFileUrl;
    } catch (e) {
      console.error(e);
      throw new Error('Failed to upload file');
    } finally {
      toggleIsLoading(false);
    }
  };

  return {
    uploadFile,
    isLoading,
  };
};
