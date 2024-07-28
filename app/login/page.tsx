'use client';

import type { SubmitHandler } from 'react-hook-form';
import type { LoginInputs } from '@/types';

import { Input } from '@nextui-org/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from '@nextui-org/link';
import LoginIcon from '@mui/icons-material/Login';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

import BasicForm from '@/components/projects/BasicForm/BasicForm';
import FormItem from '@/components/projects/FormItem/FormItem';
import PasswordInput from '@/components/projects/PasswordInput/PasswordInput';
import { LOGIN_FORM_SCHEMA } from '@/schema/formSchema';

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginInputs>({
    resolver: zodResolver(LOGIN_FORM_SCHEMA),
  });
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const { data: session } = useSession();
  const router = useRouter();
  const _signIn: SubmitHandler<LoginInputs> = async ({ email, password }) => {
    try {
      const res = await signIn('credentials', {
        email,
        password,
        callbackUrl: '/mypage',
      });

      if (!res) throw new Error('Failed to sign in');

      if (res.ok) {
        setErrorMsg(null);
      }

      if (res.error) {
        setErrorMsg(res.error);
      }
    } catch (err) {
      /* eslint-disable no-console */
      console.error(err);
    }
  };

  useEffect(() => {
    if (session) {
      router.push('/mypage');
    }
  }, []);

  return (
    <BasicForm
      buttonIcon={<LoginIcon />}
      buttonText="Enter"
      footer={
        <Link href="/register">Don&apos;t have an account? Sign up here.</Link>
      }
      formTitle="Sign In"
      handleSubmit={handleSubmit(_signIn)}
      isValid={isValid}
    >
      {errorMsg && (
        <p className="text-red-500 bg-red-500 bg-opacity-10 text-center p-3 mb-3 rounded-md">
          {errorMsg}
        </p>
      )}
      <FormItem>
        <Input
          isRequired
          label="Email"
          {...register('email')}
          errorMessage={errors.email?.message}
          isInvalid={!!errors.email?.message}
        />
      </FormItem>
      <FormItem>
        <PasswordInput
          errorMessage={errors.password?.message}
          label="Password"
          register={register}
        />
      </FormItem>
    </BasicForm>
  );
}
