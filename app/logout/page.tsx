'use client';
import type { FormEvent } from 'react';

import { Link } from '@nextui-org/link';
import LogoutIcon from '@mui/icons-material/Logout';
import { User } from '@nextui-org/user';
import { Button } from '@nextui-org/button';
import { signOut, useSession } from 'next-auth/react';

import BasicForm from '@/components/projects/BasicForm/BasicForm';
import FormItem from '@/components/projects/FormItem/FormItem';
import { useUserStore } from '@/stores/user';

export default function LogoutPage() {
  const { data: session, status } = useSession();
  const { username, imageUrl, updateProfile } = useUserStore();
  const { resetProfile } = useUserStore();
  const handleSubmit = async (e: FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    await signOut({
      callbackUrl: '/login',
    });
    resetProfile();
  };

  return (
    <BasicForm
      buttonIcon={<LogoutIcon />}
      buttonText="Sgin out"
      footer={
        <Button
          as={Link}
          className="w-full"
          href="/mypage"
          isDisabled={status === 'loading'}
        >
          Back to My Page
        </Button>
      }
      formTitle="Sign Out"
      handleSubmit={handleSubmit}
      isLoading={status === 'loading'}
      isValid={true}
    >
      <FormItem>
        <User
          avatarProps={{ src: imageUrl }}
          className="w-full"
          name={username}
        />
      </FormItem>
    </BasicForm>
  );
}
