'use client';

import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { Input } from '@nextui-org/input';
import { useToggle } from 'react-use';
import { useRouter } from 'next/navigation';

import { ChangePasswordInputs } from '@/types';
import { BasicForm } from '@/components/projects/BasicForm/BasicForm';
import { CHANGE_PASSWORD_SCHEMA } from '@/schema/formSchema';
import { FormItem } from '@/components/projects/FormItem/FormItem';
import PasswordToggleButton from '@/components/projects/PasswordToggleButton/PasswordToggleButton';

export default function ChangePasswordPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ChangePasswordInputs>({
    resolver: zodResolver(CHANGE_PASSWORD_SCHEMA),
  });
  const router = useRouter();
  const [isVisible, toggleVisibility] = useToggle(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const changePassword: SubmitHandler<ChangePasswordInputs> = async ({
    password,
  }) => {
    try {
      const res = await fetch('/api/password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) throw new Error('Failed to change password');

      if (res.ok) {
        setErrorMsg(null);
        router.push('/mypage/password/complete');
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
      buttonIcon={<VpnKeyIcon />}
      buttonText="Change"
      formTitle="Change Password"
      handleSubmit={handleSubmit(changePassword)}
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
          autoComplete="password"
          endContent={
            <PasswordToggleButton
              isVisible={isVisible}
              toggleVisibility={toggleVisibility}
            />
          }
          errorMessage={errors.password?.message}
          isInvalid={!!errors.password?.message}
          label={'New Password'}
          type={isVisible ? 'text' : 'password'}
          {...register('password')}
        />
      </FormItem>
    </BasicForm>
  );
}
