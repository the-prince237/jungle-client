'use client';
import { cn } from '@/lib/utils';
import { SignedIn } from '@clerk/nextjs'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react';
import { Button } from '../ui/button';

const buttonItems = [
  { href: '/', label: 'Accueil' },
  { href: '/search', label: 'Rechercher' },
  { href: '/new', label: '+ Nouvelle annonce', auth: true },
  { href: '/profile/me', label: 'Mon profil', auth: true },
  { href: '/support', label: 'Support' },
];

export const MobileNavigator = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="lg:hidden mt-4 flex items-center gap-4 overflow-x-auto pb-2">
      <Button variant="outline" onClick={() => setIsOpen(!isOpen)}>
        <Menu />
      </Button>
      <div className={cn('fixed w-screen h-screen z-50 -right-[100vw] top-0', { "right-0": isOpen})}>
        <div className='bg-white/70 shadow-2xl backdrop-blur-2xl w-[70%] absolute right-0 top-0 h-full'>
          <div className='h-25 flex items-center justify-end px-9'>
            <Button onClick={() => setIsOpen(false)} variant="outline">
              <X />
            </Button>
          </div>
          <div className='py-4 w-full flex flex-col gap-2'>
            {buttonItems.map((item) => {
              if (item.auth) {
                return (
                  <SignedIn key={item.href}>
                    <Link href={item.href}>
                      <Button variant="ghost" className="w-full justify-start" onClick={() => setIsOpen(false)}>
                        {item.label}
                      </Button>
                    </Link>
                  </SignedIn>
                )
              }
              return (
                <Link key={item.href} href={item.href}>
                  <Button variant="ghost" className="w-full justify-start" onClick={() => setIsOpen(false)}>
                    {item.label}
                  </Button>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
};