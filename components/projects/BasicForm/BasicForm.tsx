'use client';

import { Button } from '@nextui-org/button';
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card';
import { FC, FormEvent, ReactNode } from 'react';

import { title } from '@/components/primitives';

type Props = {
  children: ReactNode;
  buttonText: string;
  handleSubmit: (e: FormEvent<HTMLInputElement>) => Promise<void>;
  isValid: boolean;
  formTitle: string;
  footer?: ReactNode;
  buttonIcon: ReactNode;
  isLoading?: boolean;
};

const BasicForm: FC<Props> = ({
  children,
  buttonText,
  handleSubmit,
  formTitle,
  isValid,
  footer,
  buttonIcon,
  isLoading = false,
}) => {
  return (
    <Card
      isBlurred
      as="form"
      className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px] min-w-[90svw] md:min-w-[510px] p-4"
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
          endContent={buttonIcon}
          isDisabled={!isValid}
          isLoading={isLoading}
          type="submit"
        >
          {buttonText}
        </Button>
      </CardBody>
      {!!footer && (
        <CardFooter className="w-[90%] mx-auto flex justify-center flex-col items-center md:flex-row md:justify-around">
          {footer}
        </CardFooter>
      )}
    </Card>
  );
};

export default BasicForm;
