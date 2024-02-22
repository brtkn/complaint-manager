'use client';
import * as Avatar from '@radix-ui/react-avatar';
import { Box, Container, DropdownMenu, Flex, Text } from '@radix-ui/themes';
import classNames from 'classnames';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaFileCircleExclamation } from 'react-icons/fa6';

const Navbar = () => {
  return (
    <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center'>
      <Container>
        <Flex justify='between'>
          <Flex align='center' gap='3'>
            <Link href='/'>
              <FaFileCircleExclamation className='w-20 h-6' />
            </Link>
            <NavLinks />
          </Flex>
          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  );
};

const NavLinks = () => {
  const links = [
    { label: 'Dashboard', href: '/' },
    { label: 'Issues Page', href: '/issues/list' },
  ];

  const currentPath = usePathname();

  return (
    <>
      <ul className='flex px-6 space-x-5'>
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className={classNames({
                'nav-link': true,
                '!text-zinc-900': link.href === currentPath,
              })}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

const AuthStatus = () => {
  const { status, data: session } = useSession();

  if (status === 'loading') return null;
  if (status === 'unauthenticated')
    return (
      <Link href='/api/auth/signin'>
        <Text className='nav-link'>Login</Text>
      </Link>
    );

  return (
    <Box>
      {status === 'authenticated' && (
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Avatar.Root>
              <Avatar.Image
                src={session.user!.image!}
                className='cursor-pointer rounded-full h-10 w-10'
              />
              <Avatar.Fallback
                className='AvatarFallback cursor-pointer'
                delayMs={1000}
              >
                ?
              </Avatar.Fallback>
            </Avatar.Root>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Label>
              <Text size='2'>{session.user!.email}</Text>
            </DropdownMenu.Label>
            <DropdownMenu.Item>
              <Link href='/api/auth/signout'>Log out</Link>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      )}
    </Box>
  );
};

export default Navbar;
