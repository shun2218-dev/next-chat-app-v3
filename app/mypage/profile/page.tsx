'use client';

import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Input } from '@nextui-org/input';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Code } from '@nextui-org/code';

import { ChangeProfileInputs } from '@/types';
import BasicForm from '@/components/projects/BasicForm/BasicForm';
import { CHANGE_PROFILE_SCHEMA } from '@/schema/formSchema';
import FormItem from '@/components/projects/FormItem/FormItem';

export default function ChangeProfilePage() {
  const { data: session, update } = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ChangeProfileInputs>({
    resolver: zodResolver(CHANGE_PROFILE_SCHEMA),
  });
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const router = useRouter();
  const changeProfile: SubmitHandler<ChangeProfileInputs> = async ({
    name,
  }) => {
    try {
      const res = await fetch('/api/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      });

      if (!res.ok) throw new Error('Failed to change username');

      if (res.ok) {
        setErrorMsg(null);

        await update({ name });
        router.push('/mypage/profile/complete');
      }

      return { message: 'OK' };
    } catch (err) {
      if (err instanceof Error) {
        /* eslint-disable no-console */
        console.error(err);
        setErrorMsg(err.message);
      }

      return { message: 'NG' };
    }
  };

  return (
    <BasicForm
      buttonIcon={<AccountCircleIcon />}
      buttonText="Change"
      formTitle="Change Profile"
      handleSubmit={handleSubmit(changeProfile)}
      isValid={isValid}
    >
      {errorMsg && (
        <p className="text-red-500 bg-red-500 bg-opacity-10 text-center p-3 mb-3 rounded-md">
          {errorMsg}
        </p>
      )}
      <FormItem>
        <Code className="w-full text-center py-2" radius="lg" size="md">
          {session?.user.name}
        </Code>
      </FormItem>
      <FormItem>
        <Input
          isRequired
          label="Username"
          {...register('name')}
          errorMessage={errors.name?.message}
          isInvalid={!!errors.name?.message}
        />
      </FormItem>
    </BasicForm>
  );
}
