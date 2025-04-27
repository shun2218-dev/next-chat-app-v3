'use client';

import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import EmailIcon from '@mui/icons-material/Email';
import { Input } from '@nextui-org/input';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Code } from '@nextui-org/code';

import { ChangeEmailInputs } from '@/types';
import { BasicForm } from '@/components/projects/BasicForm/BasicForm';
import { CHANGE_EMAIL_SCHEMA } from '@/schema/formSchema';
import { FormItem } from '@/components/projects/FormItem/FormItem';

export default function ChangeEmailPage() {
  const { data: session, update } = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ChangeEmailInputs>({
    resolver: zodResolver(CHANGE_EMAIL_SCHEMA),
  });
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const router = useRouter();
  const changeEmail: SubmitHandler<ChangeEmailInputs> = async ({ email }) => {
    try {
      const res = await fetch('/api/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) throw new Error('Failed to change email');

      if (res.ok) {
        setErrorMsg(null);

        await update({ email });
        router.push('/mypage/email/complete');
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
      buttonIcon={<EmailIcon />}
      buttonText="Change"
      formTitle="Change Email"
      handleSubmit={handleSubmit(changeEmail)}
      isValid={isValid}
    >
      {errorMsg && (
        <p className="text-red-500 bg-red-500 bg-opacity-10 text-center p-3 mb-3 rounded-md">
          {errorMsg}
        </p>
      )}
      <FormItem>
        <Code className="w-full text-center py-2" radius="lg" size="md">
          {session?.user.email}
        </Code>
      </FormItem>
      <FormItem>
        <Input
          isRequired
          label="Email"
          {...register('email')}
          errorMessage={errors.email?.message}
          isInvalid={!!errors.email?.message}
        />
      </FormItem>
    </BasicForm>
  );
}
