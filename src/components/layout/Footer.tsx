// src/components/layout/Footer.tsx
import { Droplets, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background/95 py-8 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-muted-foreground">
        <div className="flex justify-center items-center space-x-2 mb-2">
          <Heart className="h-5 w-5 text-primary" />
          <Droplets className="h-5 w-5 text-primary" />
        </div>
        <p className="text-sm">
          &copy; {new Date().getFullYear()} BloodConnect. All rights reserved.
        </p>
        <p className="text-xs mt-1">
          Dedicated to connecting donors and saving lives.
        </p>
      </div>
    </footer>
  );
}
