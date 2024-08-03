'use client';

import { Button } from '@nextui-org/button';
import { Card, CardBody, CardHeader } from '@nextui-org/card';
import Link from 'next/link';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import { title } from '@/components/primitives';

export default function ChangeEmailCompletePage() {
  return (
    <Card
      isBlurred
      className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px] min-w-[90svw] md:min-w-[510px] p-4"
      shadow="sm"
    >
      <CardHeader className="justify-center">
        <h1 className={title({ size: 'sm', class: 'my-6' })}>
          Email has been changed
          <CheckCircleIcon />
        </h1>
      </CardHeader>
      <CardBody className="w-[90%] mx-auto">
        <Button
          as={Link}
          className="mt-6 font-bold"
          color="primary"
          endContent={<AccountCircleIcon />}
          href="/mypage"
        >
          Back to My Page
        </Button>
      </CardBody>
    </Card>
  );
}
