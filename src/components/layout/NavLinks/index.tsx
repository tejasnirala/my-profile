"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { buttonClasses } from '@/components/ui/Button';

const NAV_ITEMS = [
  { label: 'About', href: '/' },
  { label: 'Resume', href: '/resume' },
  { label: 'Projects', href: '/projects' },
  { label: 'Contact', href: '/contact' },
];

export const NavLinks = () => {
  const pathname = usePathname();

  return (
    <>
      {NAV_ITEMS.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive ? 'page' : undefined}
            className={buttonClasses(isActive ? 'secondary' : 'ghost', 'sm', 'text-xs sm:text-sm')}
          >
            {item.label}
          </Link>
        );
      })}
    </>
  );
};
