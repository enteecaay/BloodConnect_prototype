// src/components/layout/Navbar.tsx
"use client";

import Link from 'next/link';
import { Heart, Menu, Droplets } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/register', label: 'Register to Donate' },
  { href: '/search', label: 'Find Donors' },
  { href: '/blood-drives', label: 'Blood Drives' },
  { href: '/blog', label: 'Blog' },
  { href: '/reminders', label: 'Donation Reminders' },
];

export default function Navbar() {
  const pathname = usePathname();

  const NavLinkItem = ({ href, label, onClick }: { href: string, label: string, onClick?: () => void }) => (
    <Link href={href} passHref>
      <Button
        variant="ghost"
        className={cn(
          "text-foreground hover:bg-primary/10 hover:text-primary",
          pathname === href && "text-primary font-semibold border-b-2 border-primary rounded-none"
        )}
        onClick={onClick}
      >
        {label}
      </Button>
    </Link>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center space-x-2 text-primary hover:opacity-80 transition-opacity">
          <Heart className="h-8 w-8" />
          <span className="font-bold text-2xl">BloodConnect</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-1">
          {navLinks.map((link) => (
            <NavLinkItem key={link.href} href={link.href} label={link.label} />
          ))}
        </nav>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[350px] bg-background p-6">
              <div className="flex flex-col space-y-4">
                <Link href="/" className="flex items-center space-x-2 text-primary mb-6">
                  <Heart className="h-7 w-7" />
                  <span className="font-semibold text-xl">BloodConnect</span>
                </Link>
                {navLinks.map((link) => (
                   <SheetClose asChild key={link.href}>
                     <NavLinkItem href={link.href} label={link.label} />
                   </SheetClose>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
