import { SVGProps } from 'react';

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type RegisterInputs = {
  email: string;
  password: string;
  confirmPassword: string;
};

export type LoginInputs = {
  email: string;
  password: string;
  confirmPassword: string;
};

export type User = {
  email: string;
  username: string;
  imageUrl: string | null;
};

export type AuthPayload = {
  email: string;
  password: string;
};
