import { Button } from '@nextui-org/button';
import { Link } from '@nextui-org/link';
import { NavbarItem } from '@nextui-org/navbar';
import { Skeleton } from '@nextui-org/skeleton';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

import { useSession } from '#next-auth/react';

export const NavbarAuthButton = () => {
  const { status } = useSession();

  return (
    <>
      {status === 'loading' && (
        <>
          <NavbarItem className="hidden md:flex gap-x-4">
            <Skeleton className="rounded-xl w-28">
              <div className="h-10 w-full rounded-xl bg-default-300" />
            </Skeleton>
            <Skeleton className="rounded-xl  w-28">
              <div className="h-10 w-full rounded-xl bg-default-300" />
            </Skeleton>
          </NavbarItem>
        </>
      )}
      {status === 'unauthenticated' && (
        <>
          <NavbarItem className="hidden md:flex gap-x-4">
            <Button
              as={Link}
              color="primary"
              href="/login"
              startContent={<LoginIcon />}
              variant="flat"
            >
              Sign In
            </Button>
            <Button
              as={Link}
              color="primary"
              href="/register"
              startContent={<PersonAddIcon />}
              variant="solid"
            >
              Sign Up
            </Button>
          </NavbarItem>
        </>
      )}
      {status === 'authenticated' && (
        <>
          <NavbarItem className="hidden md:flex gap-x-4">
            <Button
              as={Link}
              color="primary"
              href="/mypage"
              startContent={<AccountCircleIcon />}
              variant="solid"
            >
              My Page
            </Button>
            <Button
              as={Link}
              color="danger"
              href="/logout"
              startContent={<LogoutIcon />}
              variant="bordered"
            >
              Sign Out
            </Button>
          </NavbarItem>
        </>
      )}
    </>
  );
};
