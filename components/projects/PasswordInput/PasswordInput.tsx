import type { FC } from 'react';
import type { UseFormRegister } from 'react-hook-form';
import type { LoginInputs, RegisterInputs } from '@/types';

import { Input } from '@heroui/input';
import { useToggle } from 'react-use';

import { PasswordToggleButton } from '../PasswordToggleButton/PasswordToggleButton';

type Props = {
  label: string;
  register: UseFormRegister<RegisterInputs | LoginInputs>;
  errorMessage: string | undefined;
  isConfirm?: boolean;
};

export const PasswordInput: FC<Props> = ({
  label,
  register,
  errorMessage,
  isConfirm = false,
}) => {
  const [isVisible, toggleVisibility] = useToggle(false);

  return (
    <Input
      isRequired
      autoComplete="password"
      endContent={
        <PasswordToggleButton
          isVisible={isVisible}
          toggleVisibility={toggleVisibility}
        />
      }
      errorMessage={errorMessage}
      isInvalid={!!errorMessage}
      label={label}
      type={isVisible ? 'text' : 'password'}
      {...register(isConfirm ? 'confirmPassword' : 'password')}
    />
  );
};
