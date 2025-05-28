// src/app/(main)/blood-drives/page.tsx
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mockBloodDrives } from '@/lib/mockData';
import { CalendarDays, Clock, MapPin, Users, ExternalLink } from 'lucide-react';

export default function BloodDriveSchedulePage() {
  return (
    <div className="space-y-8">
      <header className="text-center">
        <Users className="mx-auto h-12 w-12 text-primary mb-2" />
        <h1 className="text-4xl font-bold text-primary">Upcoming Blood Drives</h1>
        <p className="text-xl text-muted-foreground mt-2">
          Find a blood drive event near you and make a difference.
        </p>
      </header>

      {mockBloodDrives.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockBloodDrives.map((drive) => (
            <Card key={drive.id} className="shadow-lg hover:shadow-xl transition-shadow flex flex-col overflow-hidden">
              {drive.imageUrl && (
                <div className="relative h-48 w-full">
                  <Image
                    src={drive.imageUrl}
                    alt={drive.name}
                    layout="fill"
                    objectFit="cover"
                    data-ai-hint="blood drive event"
                  />
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-2xl text-primary">{drive.name}</CardTitle>
                {drive.organizer && <CardDescription>Organized by: {drive.organizer}</CardDescription>}
              </CardHeader>
              <CardContent className="space-y-3 flex-grow">
                <p className="flex items-center text-foreground/90">
                  <CalendarDays className="h-5 w-5 mr-2 text-accent" />
                  Date: {new Date(drive.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
                <p className="flex items-center text-foreground/90">
                  <Clock className="h-5 w-5 mr-2 text-accent" />
                  Time: {drive.time}
                </p>
                <p className="flex items-center text-foreground/90">
                  <MapPin className="h-5 w-5 mr-2 text-accent" />
                  Location: {drive.location}
                </p>
                <p className="text-muted-foreground text-sm pt-2">{drive.description}</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                  Learn More <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground py-10 text-lg">
          No upcoming blood drives scheduled at the moment. Please check back soon.
        </p>
      )}
    </div>
  );
}
