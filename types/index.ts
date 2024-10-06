import { Timestamp } from 'firebase/firestore';
import { SVGProps } from 'react';
import { User } from '@prisma/client';

export type Msg = {
  message: string;
};

export type MsgWithRoomId = Msg & {
  roomId?: string;
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

export interface Message {
  content: string; // The text content of the message
  timestamp: Timestamp; // Unix timestamp for the date and time of message transmission
  senderUid: string; // UID of the user sending the message
}

export type FriendUser = Pick<User, 'id' | 'email' | 'name' | 'image'> & {
  chatId: string;
};
