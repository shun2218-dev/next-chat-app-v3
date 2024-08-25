'use client';

import { Card, CardBody, CardHeader } from '@nextui-org/card';
import { Listbox, ListboxItem, ListboxSection } from '@nextui-org/listbox';
import { Link } from '@nextui-org/link';
import { User } from '@nextui-org/user';
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import { useEffect } from 'react';

import { title } from '@/components/primitives';
import { IconWrapper } from '@/components/uiParts/IconWrapper/IconWrapper';
import { useUserStore } from '@/stores/user';

export default function MyPage() {
  const { username, imageUrl, revalidateProfile } = useUserStore(
    (state) => state
  );

  useEffect(() => {
    (async () => {
      await revalidateProfile();
    })();
  }, []);

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
        <User
          avatarProps={{ src: imageUrl ?? '', showFallback: true }}
          name={username}
        />
        <Listbox aria-label="mypage-menu" className="mt-5">
          <ListboxSection title="Content">
            <ListboxItem
              key="chatroom"
              startContent={
                <IconWrapper className="bg-slate/10 text-slate">
                  <QuestionAnswerOutlinedIcon />
                </IconWrapper>
              }
              textValue="Chatroom"
            >
              <Link className="text-inherit" href="/chatroom">
                Chatroom
              </Link>
            </ListboxItem>
          </ListboxSection>
          <ListboxSection title="User">
            <ListboxItem
              key="profile"
              startContent={
                <IconWrapper className="bg-primary/10 text-primary">
                  <AccountCircleOutlinedIcon />
                </IconWrapper>
              }
              textValue="Profile"
            >
              <Link className="text-inherit" href="/mypage/profile">
                Profile
              </Link>
            </ListboxItem>
            <ListboxItem
              key="email"
              startContent={
                <IconWrapper className="bg-teal-400/10 text-teal-400">
                  <EmailOutlinedIcon />
                </IconWrapper>
              }
              textValue="Email"
            >
              <Link className="text-inherit" href="/mypage/email">
                Email
              </Link>
            </ListboxItem>
            <ListboxItem
              key="password"
              startContent={
                <IconWrapper className="bg-warning/10 text-warning">
                  <VpnKeyOutlinedIcon />
                </IconWrapper>
              }
              textValue="Password"
            >
              <Link className="text-inherit" href="/mypage/password">
                Password
              </Link>
            </ListboxItem>
          </ListboxSection>
        </Listbox>
      </CardBody>
    </Card>
  );
}
