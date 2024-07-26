'use client';
import type { FormEvent } from 'react';

import { Link } from '@nextui-org/link';
import LogoutIcon from '@mui/icons-material/Logout';
import { notFound } from 'next/navigation';
import { User } from '@nextui-org/user';
import { Button } from '@nextui-org/button';

import BasicForm from '@/components/projects/BasicForm/BasicForm';
import FormItem from '@/components/projects/FormItem/FormItem';
import { useAppDispatch, useAppSelector } from '@/libs/hooks';
import {
  checkAuth,
  currentUser,
  signOut,
} from '@/libs/features/auth/authSlice';

export default function LogoutPage() {
  const user = useAppSelector(currentUser);
  const isLoggedIn = useAppSelector(checkAuth);
  const dispatch = useAppDispatch();
  const handleSubmit = async (e: FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    await dispatch(signOut());
  };

  if (!isLoggedIn) {
    notFound();
  }

  return (
    <BasicForm
      buttonIcon={<LogoutIcon />}
      buttonText="Sgin out"
      footer={
        <Button as={Link} className="w-full" href="/mypage">
          Back to My Page
        </Button>
      }
      formTitle="Sign Out"
      handleSubmit={handleSubmit}
      isValid={true}
    >
      <FormItem>
        <User name={user?.username} />
      </FormItem>
    </BasicForm>
  );
}
