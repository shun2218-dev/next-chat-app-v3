'use client';

import type { ChangeEvent } from 'react';

import { useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Input } from '@nextui-org/input';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Code } from '@nextui-org/code';
import { Avatar } from '@nextui-org/avatar';
import { Spinner } from '@nextui-org/spinner';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useToggle } from 'react-use';

import { ChangeProfileInputs } from '@/types';
import BasicForm from '@/components/projects/BasicForm/BasicForm';
import { CHANGE_PROFILE_SCHEMA } from '@/schema/formSchema';
import FormItem from '@/components/projects/FormItem/FormItem';
import { storage } from '@/libs/firebase/client';
import { useUserStore } from '@/stores/user';

export default function ChangeProfilePage() {
  const { data: session } = useSession();
  const { username: _username, imageUrl, updateProfile } = useUserStore();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const profileImageRef = useRef<HTMLInputElement | null>(null);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [isLoading, toggleIsLoading] = useToggle(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
  } = useForm<ChangeProfileInputs>({
    resolver: zodResolver(CHANGE_PROFILE_SCHEMA),
    defaultValues: {
      name: username ?? '',
    },
  });
  const router = useRouter();

  const uploadImage = async (image: File | null): Promise<string> => {
    try {
      if (!image) throw new Error('Image is required');

      if (!session) throw new Error('Invalid session');

      const storageRef = ref(
        storage,
        `avatars/${session.user.id}/${session.user.id}_${Date.now()}_${image.name}`
      );

      const file = await uploadBytes(storageRef, image);

      const imageUrl = await getDownloadURL(file.ref);

      return imageUrl;
    } catch (e) {
      console.error(e);
      throw new Error('Failed to upload profile image');
    }
  };

  const changeProfile: SubmitHandler<ChangeProfileInputs> = async ({
    name,
  }) => {
    try {
      toggleIsLoading(true);
      const imageUrl = await uploadImage(profileImage);
      const res = await fetch('/api/profile/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, imageUrl }),
      });

      if (!res.ok) throw new Error('Failed to change username');

      setErrorMsg(null);

      await updateProfile();

      router.push('/mypage/profile/complete');

      return { message: 'OK' };
    } catch (err) {
      if (err instanceof Error) {
        console.error(err);
        setErrorMsg(err.message);
      }

      return { message: 'NG' };
    } finally {
      toggleIsLoading(false);
    }
  };

  const previewImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];

      setProfileImage(file);
    }
  };

  useEffect(() => {
    setUsername(_username);
    setValue('name', _username);
  }, [session]);

  if (!session || !session.user) {
    return <Spinner />;
  }

  return (
    <BasicForm
      buttonIcon={<AccountCircleIcon />}
      buttonText="Change"
      formTitle="Change Profile"
      handleSubmit={handleSubmit(changeProfile)}
      isLoading={isLoading}
      isValid={isValid}
    >
      {errorMsg && (
        <p className="text-red-500 bg-red-500 bg-opacity-10 text-center p-3 mb-3 rounded-md">
          {errorMsg}
        </p>
      )}
      <FormItem>
        {/* eslint-disable jsx-a11y/label-has-associated-control */}
        <label htmlFor="profileImage">
          <Avatar
            showFallback
            className="mx-auto"
            name={username === null ? '' : username}
            size="lg"
            src={profileImage ? URL.createObjectURL(profileImage) : imageUrl}
          />
          <input
            ref={profileImageRef}
            accept="image/*"
            className="hidden"
            id="profileImage"
            type="file"
            onChange={previewImage}
          />
        </label>
      </FormItem>
      <FormItem>
        <Code className="w-full text-center py-2" radius="lg" size="md">
          {username}
        </Code>
      </FormItem>
      <FormItem>
        <Input
          isRequired
          label="Username"
          {...register('name')}
          defaultValue={username ?? ''}
          errorMessage={errors.name?.message}
          isInvalid={!!errors.name?.message}
        />
      </FormItem>
    </BasicForm>
  );
}
