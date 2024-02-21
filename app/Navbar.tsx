'use client';
import { Box, Container, Flex, Text } from '@radix-ui/themes';
import classNames from 'classnames';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaFileCircleExclamation } from 'react-icons/fa6';

const Navbar = () => {
  const { status, data: session } = useSession();

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
          <Box>
            {status === 'authenticated' && (
              <Link href='/api/auth/signout'>
                <Text>Log out</Text>
              </Link>
            )}
            {status === 'unauthenticated' && (
              <Link href='/api/auth/signin'>
                <Text>Login</Text>
              </Link>
            )}
          </Box>
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

export default Navbar;
