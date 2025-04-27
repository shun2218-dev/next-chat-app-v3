'use client';

import type { ChangeEvent } from 'react';

import { useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Input } from '@heroui/input';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Code } from '@heroui/code';
import { Avatar } from '@heroui/avatar';
import { Spinner } from '@heroui/spinner';

import { ChangeProfileInputs } from '@/types';
import { BasicForm } from '@/components/projects/BasicForm/BasicForm';
import { CHANGE_PROFILE_SCHEMA } from '@/schema/formSchema';
import { FormItem } from '@/components/projects/FormItem/FormItem';
import { useUserStore } from '@/stores/user';
import { useUpdateProfile } from '@/hooks/useUpdatePlofile';

export default function ChangeProfilePage() {
  const [username, setUsername] = useState<string | null>(null);
  const previewImageRef = useRef<HTMLInputElement | null>(null);
  const [previewImage, setPreviewImage] = useState<File | null>(null);
  const router = useRouter();
  const { data: session } = useSession();
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
  const { username: _username, imageUrl } = useUserStore();
  const { updateProfile, isLoading, errorMsg } = useUpdateProfile();

  const changeProfile: SubmitHandler<ChangeProfileInputs> = async ({
    name,
  }) => {
    const res = await updateProfile({
      profileImage: previewImage,
      username: name,
    });

    if (res.message === 'OK') {
      router.push('/mypage/profile/complete');
    }
  };

  const changePreviewImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];

      setPreviewImage(file);
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
            className="mx-auto cursor-pointer"
            name={username === null ? '' : username}
            size="lg"
            src={previewImage ? URL.createObjectURL(previewImage) : imageUrl}
          />
          <input
            ref={previewImageRef}
            accept="image/*"
            className="hidden"
            id="profileImage"
            type="file"
            onChange={changePreviewImage}
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
