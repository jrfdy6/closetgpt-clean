'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useFirebase } from '@/lib/firebase-context';
import dynamic from 'next/dynamic';

const ThemeToggle = dynamic(() => import('@/components/ThemeToggle'), {
  ssr: false,
});

const navigation = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Wardrobe', href: '/wardrobe' },
  { name: 'Outfits', href: '/outfits' },
  { name: 'Style Profile', href: '/style-profile' },
];

export default function Navigation() {
  const pathname = usePathname();
  const { user } = useFirebase();

  return (
    <nav className="border-b">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <span className="text-xl font-bold">ClosetGPT</span>
            </Link>
            {user && (
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        'px-3 py-2 text-sm font-medium rounded-md',
                        pathname === item.href
                          ? 'bg-gray-900 text-white'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            {user ? (
              <Button variant="outline" asChild>
                <Link href="/profile">Profile</Link>
              </Button>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="outline" asChild>
                  <Link href="/signin">Sign In</Link>
                </Button>
                <Button asChild>
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
} 