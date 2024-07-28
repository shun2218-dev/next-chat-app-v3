import { SVGProps } from 'react';

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type RegisterInputs = {
  email: string;
  password: string;
  confirmPassword?: string;
  name?: string;
};

export type LoginInputs = {
  email: string;
  password: string;
};

export type User = {
  email: string;
  username: string;
  imageUrl: string | null;
};

export type SignInPayload = {
  email: string;
  password: string;
};

export type SignUpPayload = SignInPayload & {
  name: string;
};
