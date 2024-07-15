'use client';

import type { SubmitHandler } from 'react-hook-form';
import type { LoginInputs } from '@/types';

import { Input } from '@nextui-org/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from '@nextui-org/link';
import LoginIcon from '@mui/icons-material/Login';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();
  const signIn: SubmitHandler<LoginInputs> = async () => {
    router.push('/mypage');
    console.log('sign in');
  };

  return (
    <BasicForm
      buttonIcon={<LoginIcon />}
      buttonText="Enter"
      footer={
        <Link href="/register">Don&apos;t have an account? Sign up here.</Link>
      }
      formTitle="Sign In"
      handleSubmit={handleSubmit(signIn)}
      isValid={isValid}
    >
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
