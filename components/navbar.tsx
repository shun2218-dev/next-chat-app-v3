'use client';
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from '@nextui-org/navbar';
import { Button } from '@nextui-org/button';
import { Link } from '@nextui-org/link';
import { link as linkStyles } from '@nextui-org/theme';
import NextLink from 'next/link';
import clsx from 'clsx';
import { useToggle } from 'react-use';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

import { siteConfig } from '@/config/site';
import { ThemeSwitch } from '@/components/theme-switch';
import { Logo } from '@/components/icons';

export const Navbar = () => {
  const [isLogin, toggleLogin] = useToggle(false);
  const pathname = usePathname();

  useEffect(() => {
    if (isLogin && pathname.indexOf('mypage') !== -1) {
      return;
    }
    if (!isLogin && pathname.indexOf('mypage') !== -1) {
      toggleLogin(true);
    }
    if (isLogin && pathname.indexOf('mypage') === -1) {
      toggleLogin(false);
    }
  }, [pathname]);

  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Logo />
            <p className="font-bold text-inherit">ACME</p>
          </NextLink>
        </NavbarBrand>
        <ul className="hidden lg:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: 'foreground' }),
                  'data-[active=true]:text-primary data-[active=true]:font-medium'
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden lg:flex">
          <ThemeSwitch />
        </NavbarItem>
        {!isLogin && (
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
        {isLogin && (
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
                href="/login"
                startContent={<LogoutIcon />}
                variant="bordered"
              >
                Sign Out
              </Button>
            </NavbarItem>
          </>
        )}
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? 'primary'
                    : index === siteConfig.navMenuItems.length - 1
                      ? 'danger'
                      : 'foreground'
                }
                href="#"
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
