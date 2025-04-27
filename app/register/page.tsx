'use client';

import type { RegisterInputs } from '@/types';

import { Input } from '@heroui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from '@heroui/link';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

import { BasicForm } from '@/components/projects/BasicForm/BasicForm';
import { FormItem } from '@/components/projects/FormItem/FormItem';
import { PasswordInput } from '@/components/projects/PasswordInput/PasswordInput';
import { REGISTER_FORM_SCHEMA } from '@/schema/formSchema';
import { useSignUp } from '@/hooks/useSignUp';

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<RegisterInputs>({
    resolver: zodResolver(REGISTER_FORM_SCHEMA),
  });
  const { data: session } = useSession();
  const router = useRouter();
  const { createAccount, isLoading, errorMsg } = useSignUp();

  if (session) {
    router.push('/mypage');
  }

  return (
    <BasicForm
      buttonIcon={<PersonAddIcon />}
      buttonText="Create Account"
      footer={
        <>
          <Link href="/login">Already have an account?</Link>
          <Link>Forgot your password?</Link>
        </>
      }
      formTitle="Sign Up"
      handleSubmit={handleSubmit(createAccount)}
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
      <FormItem>
        <PasswordInput
          isConfirm
          errorMessage={errors.confirmPassword?.message}
          label="Password confirmation"
          register={register}
        />
      </FormItem>
      <FormItem>
        <Input
          isRequired
          errorMessage={errors.name?.message}
          label="Username"
          {...register('name')}
        />
      </FormItem>
    </BasicForm>
  );
}
