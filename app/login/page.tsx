'use client';

import type { LoginInputs } from '@/types';

import { Input } from '@heroui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from '@heroui/link';
import LoginIcon from '@mui/icons-material/Login';
import { useSession } from 'next-auth/react';

import { BasicForm } from '@/components/projects/BasicForm/BasicForm';
import { FormItem } from '@/components/projects/FormItem/FormItem';
import { PasswordInput } from '@/components/projects/PasswordInput/PasswordInput';
import { LOGIN_FORM_SCHEMA } from '@/schema/formSchema';
import { useSignIn } from '@/hooks/useSignIn';
import { Loading } from '@/components/uiParts/Loading/Loading';

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginInputs>({
    resolver: zodResolver(LOGIN_FORM_SCHEMA),
  });
  const { status } = useSession();
  const { signIn, isLoading, errorMsg } = useSignIn();

  if (status === 'loading') {
    return <Loading msg="Checking login status..." />;
  }

  return (
    <BasicForm
      buttonIcon={<LoginIcon />}
      buttonText="Enter"
      footer={
        <Link href="/register">Don&apos;t have an account? Sign up here.</Link>
      }
      formTitle="Sign In"
      handleSubmit={handleSubmit(signIn)}
      isLoading={isLoading}
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
