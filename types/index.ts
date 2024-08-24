import { SVGProps } from 'react';

export type Msg = {
  message: string;
};

export type UserProfile = {
  username: string;
  imageUrl: string;
};

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

export type ChangeEmailInputs = {
  email: string;
};

export type ChangePasswordInputs = {
  password: string;
};

export type ChangeProfileInputs = {
  name: string;
};
