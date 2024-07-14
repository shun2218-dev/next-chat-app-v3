'use client';

import { Button } from '@nextui-org/button';
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card';
import { Link } from '@nextui-org/link';
import { FC, FormEvent, ReactNode } from 'react';

import { title } from '@/components/primitives';

type Props = {
  children: ReactNode;
  buttonText: string;
  handleSubmit: (e: FormEvent<HTMLInputElement>) => Promise<void>;
  isValid: boolean;
  formTitle: string;
};

const BasicForm: FC<Props> = ({
  children,
  buttonText,
  handleSubmit,
  formTitle,
  isValid,
}) => {
  return (
    <Card
      isBlurred
      as="form"
      className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px] p-4"
      shadow="sm"
      onSubmit={handleSubmit}
    >
      <CardHeader className="justify-center">
        <h1 className={title({ size: 'sm', class: 'my-6' })}>{formTitle}</h1>
      </CardHeader>
      <CardBody className="w-[90%] mx-auto">
        {children}
        <Button
          className="mt-6 font-bold"
          color="primary"
          isDisabled={!isValid}
          type="submit"
        >
          {buttonText}
        </Button>
      </CardBody>
      <CardFooter className="w-[90%] mx-auto flex justify-center flex-col items-center md:flex-row md:justify-between">
        <Link href="/login">Don&apos;t have an account yet?</Link>
        <Link>Forgot your password?</Link>
      </CardFooter>
    </Card>
  );
};

export default BasicForm;
