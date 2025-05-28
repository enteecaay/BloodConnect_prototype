// src/app/(main)/search/page.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockDonors } from "@/lib/mockData";
import type { Donor, BloodType } from "@/types";
import { bloodTypeOptions } from "@/types";
import { Droplets, MapPin, SearchIcon, UserCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SearchFilters {
  bloodType: BloodType | "";
  location: string;
}

export default function DonorSearchPage() {
  const [filters, setFilters] = useState<SearchFilters>({ bloodType: "", location: "" });
  const [searchResults, setSearchResults] = useState<Donor[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const { toast } = useToast();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setHasSearched(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    const results = mockDonors.filter(donor => {
      const bloodTypeMatch = filters.bloodType ? donor.bloodType === filters.bloodType : true;
      const locationMatch = filters.location ? donor.location.toLowerCase().includes(filters.location.toLowerCase()) : true;
      return bloodTypeMatch && locationMatch;
    });
    setSearchResults(results);
    setIsLoading(false);
  };

  const handleContactDonor = (donor: Donor) => {
    // In a real app, this would trigger a secure, mediated contact process.
    // For this prototype, we'll just show a toast.
    toast({
      title: "Contact Request Sent (Simulated)",
      description: `A notification has been sent to a BloodConnect coordinator to help connect you with a donor of type ${donor.bloodType} in ${donor.location}.`,
    });
  };

  return (
    <div className="space-y-8">
      <Card className="shadow-xl">
        <CardHeader className="text-center">
          <SearchIcon className="mx-auto h-12 w-12 text-primary mb-2" />
          <CardTitle className="text-3xl font-bold text-primary">Find a Blood Donor</CardTitle>
          <CardDescription className="text-lg">
            Search for available donors by blood type and location.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
            <div className="space-y-2">
              <Label htmlFor="bloodType">Blood Type</Label>
              <Select
                value={filters.bloodType}
                onValueChange={(value) => setFilters(prev => ({ ...prev, bloodType: value as BloodType | "" }))}
              >
                <SelectTrigger id="bloodType">
                  <SelectValue placeholder="Any Blood Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Any Blood Type</SelectItem>
                  {bloodTypeOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location (City/Zip)</Label>
              <Input
                id="location"
                placeholder="e.g., Springfield or 62704"
                value={filters.location}
                onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
              />
            </div>
            <Button type="submit" className="w-full md:w-auto" disabled={isLoading}>
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Searching...
                </>
              ) : (
                <>
                  <SearchIcon className="mr-2 h-5 w-5" /> Search Donors
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {hasSearched && (
        <section>
          <h2 className="text-2xl font-semibold mb-6 text-center text-foreground/90">Search Results</h2>
          {isLoading ? (
             <div className="text-center py-10">
                <svg className="animate-spin mx-auto h-10 w-10 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="mt-2 text-muted-foreground">Loading results...</p>
            </div>
          ) : searchResults.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResults.map(donor => (
                <Card key={donor.id} className="shadow-md hover:shadow-lg transition-shadow flex flex-col">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl flex items-center">
                        <UserCircle2 className="h-6 w-6 mr-2 text-primary" />
                        Donor Profile
                      </CardTitle>
                      <span className="text-2xl font-bold text-primary">{donor.bloodType}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className="space-y-2">
                      <p className="flex items-center text-muted-foreground">
                        <Droplets className="h-5 w-5 mr-2 text-accent" />
                        Blood Type: <span className="font-semibold text-foreground ml-1">{donor.bloodType}</span>
                      </p>
                      <p className="flex items-center text-muted-foreground">
                        <MapPin className="h-5 w-5 mr-2 text-accent" />
                        Location: <span className="font-semibold text-foreground ml-1">{donor.location}</span>
                      </p>
                       <p className="text-sm text-muted-foreground mt-2">Availability: {donor.availability}</p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-accent hover:bg-accent/90" onClick={() => handleContactDonor(donor)}>
                      Contact (via Coordinator)
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-10 text-lg">
              No donors found matching your criteria. Try broadening your search.
            </p>
          )}
        </section>
      )}
    </div>
  );
}
