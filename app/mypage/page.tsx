'use client';

import { Card, CardBody, CardHeader } from '@nextui-org/card';
import { Listbox, ListboxItem } from '@nextui-org/listbox';
import { Link } from '@nextui-org/link';
import { User } from '@nextui-org/user';
import { useSession } from 'next-auth/react';

import { title } from '@/components/primitives';

export default function MyPage() {
  const { data: session } = useSession();

  return (
    <Card
      isBlurred
      className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px] min-w-[90svw] md:min-w-[510px] p-4"
      shadow="sm"
    >
      <CardHeader className="justify-center">
        <h1 className={title({ size: 'sm', class: 'my-6' })}>My Page</h1>
      </CardHeader>
      <CardBody className="w-[90%] mx-auto">
        <User name={session?.user.name} />
        <Listbox aria-label="menu" className="mt-5">
          <ListboxItem key="profile">
            <Link className="text-inherit" href="/mypage/profile">
              Profile
            </Link>
          </ListboxItem>
          <ListboxItem key="email">
            <Link className="text-inherit" href="/mypage/email">
              Email
            </Link>
          </ListboxItem>
          <ListboxItem key="password">
            <Link className="text-inherit" href="/mypage/password">
              Password
            </Link>
          </ListboxItem>
        </Listbox>
      </CardBody>
    </Card>
  );
}
