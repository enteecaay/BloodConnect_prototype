// src/app/(main)/page.tsx
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Users, MapPin, Phone, Mail, Building } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative text-center py-16 md:py-24 rounded-lg overflow-hidden bg-gradient-to-br from-primary/80 to-accent/80 shadow-xl">
        <div className="absolute inset-0 opacity-20">
          {/* Placeholder for a subtle background pattern or image if desired */}
        </div>
        <div className="relative container mx-auto px-4">
          <Heart className="mx-auto h-16 w-16 text-white mb-6 animate-pulse" />
          <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            Connect. Donate. Save Lives.
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Welcome to BloodConnect, your trusted partner in the life-saving mission of blood donation. We bridge the gap between generous donors and those in urgent need.
          </p>
          <div className="space-x-4">
            <Button asChild size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
              <Link href="/register">Register to Donate</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
              <Link href="/search">Find Donors</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-12">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl font-semibold text-center text-primary flex items-center justify-center gap-2">
              <Users className="h-8 w-8" /> About BloodConnect
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center text-lg text-foreground/80 max-w-3xl mx-auto space-y-4">
            <p>
              BloodConnect is a dedicated platform designed to support blood donation for medical facilities and communities. Our mission is to streamline the process of finding and connecting blood donors with individuals and hospitals in need.
            </p>
            <p>
              We believe in the power of community and the profound impact of each donation. Through our user-friendly system, we aim to increase awareness, encourage regular donations, and ensure a stable blood supply for all.
            </p>
             <Image 
                src="https://placehold.co/800x400.png" 
                alt="Group of diverse people"
                width={800}
                height={400}
                className="rounded-lg mx-auto mt-6 shadow-md"
                data-ai-hint="blood donation community" 
              />
          </CardContent>
        </Card>
      </section>
      
      {/* Key Features Section */}
      <section className="py-12">
        <h2 className="text-3xl font-semibold text-center text-primary mb-8">Our Services</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="shadow-md hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl"><Heart className="text-accent"/>Donor Registration</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Easily register your blood type and availability to become a life-saver.</p>
            </CardContent>
          </Card>
          <Card className="shadow-md hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl"><Users className="text-accent"/>Donor Search</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Quickly find available donors based on blood type and location.</p>
            </CardContent>
          </Card>
          <Card className="shadow-md hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl"><Building className="text-accent"/>Blood Drive Info</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Stay updated on upcoming blood drive events in your area.</p>
            </CardContent>
          </Card>
        </div>
      </section>


      {/* Contact Section */}
      <section className="py-12">
        <Card className="shadow-lg bg-secondary/30">
          <CardHeader>
            <CardTitle className="text-3xl font-semibold text-center text-primary flex items-center justify-center gap-2">
              <Phone className="h-8 w-8" /> Get In Touch
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center text-lg max-w-2xl mx-auto space-y-6">
            <p className="text-foreground/80">
              Have questions or need assistance? We&apos;re here to help.
            </p>
            <div className="space-y-3 text-left text-foreground/90 mx-auto max-w-sm">
              <p className="flex items-center"><Building className="h-5 w-5 mr-3 text-accent" /> Springfield Medical Facility</p>
              <p className="flex items-center"><MapPin className="h-5 w-5 mr-3 text-accent" /> 123 Health St, Springfield, IL, 62704</p>
              <p className="flex items-center"><Phone className="h-5 w-5 mr-3 text-accent" /> (555) 020-XXXX</p>
              <p className="flex items-center"><Mail className="h-5 w-5 mr-3 text-accent" /> info@bloodconnect.example.com</p>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
