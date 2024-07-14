'use client';

import type { SubmitHandler } from 'react-hook-form';
import type { LoginInputs } from '@/types';

import { Input } from '@nextui-org/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import BasicForm from '@/components/projects/BasicForm/BasicForm';
import FormItem from '@/components/projects/FormItem/FormItem';
import PasswordInput from '@/components/projects/PasswordInput/PasswordInput';
import { LOGIN_FORM_SCHEMA } from '@/schema/formSchema';

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>({
    resolver: zodResolver(LOGIN_FORM_SCHEMA),
  });
  const signIn: SubmitHandler<LoginInputs> = async () => {
    console.log('submited');
  };
  // [email, password, confirmPassword].every((value) => value)

  return (
    <BasicForm
      buttonText="Enter"
      formTitle="Sign In"
      handleSubmit={handleSubmit(signIn)}
      isValid={true}
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
