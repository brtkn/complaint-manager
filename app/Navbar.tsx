'use client';
import { Box } from '@radix-ui/themes';
import classNames from 'classnames';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaFileCircleExclamation } from 'react-icons/fa6';

const Navbar = () => {
  return (
    <nav className='border-b border-l-rose-900  mb-5 px-5 py-3'>
      <div className='flex justify-between align-middle'>
        <Link href='/'>
          <FaFileCircleExclamation className='w-20 h-6' />
        </Link>
        <NavLinks />
      </div>
    </nav>
  );
};

const NavLinks = () => {
  const { status, data: session } = useSession();
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
      <Box>
        {status === 'authenticated' && (
          <Link href='/api/auth/signout'>Log out</Link>
        )}
        {status === 'unauthenticated' && (
          <Link href='/api/auth/signin'>Login</Link>
        )}
      </Box>
    </>
  );
};

export default Navbar;
