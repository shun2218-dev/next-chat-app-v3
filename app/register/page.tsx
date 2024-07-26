'use client';

import type { SubmitHandler } from 'react-hook-form';
import type { RegisterInputs } from '@/types';

import { Input } from '@nextui-org/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from '@nextui-org/link';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useRouter } from 'next/navigation';

import BasicForm from '@/components/projects/BasicForm/BasicForm';
import FormItem from '@/components/projects/FormItem/FormItem';
import PasswordInput from '@/components/projects/PasswordInput/PasswordInput';
import { REGISTER_FORM_SCHEMA } from '@/schema/formSchema';
import { checkAuth, signUp } from '@/libs/features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@/libs/hooks';

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<RegisterInputs>({
    resolver: zodResolver(REGISTER_FORM_SCHEMA),
  });
  const router = useRouter();
  const isLoggedIn = useAppSelector(checkAuth);
  const dispatch = useAppDispatch();
  const createAccount: SubmitHandler<RegisterInputs> = async ({
    email,
    password,
  }) => {
    try {
      const res = await dispatch(signUp({ email, password }));

      router.push('/mypage');
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoggedIn) {
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
      <FormItem>
        <PasswordInput
          isConfirm
          errorMessage={errors.confirmPassword?.message}
          label="Password confirmation"
          register={register}
        />
      </FormItem>
    </BasicForm>
  );
}
