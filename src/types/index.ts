export type BloodType = "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";

export interface Donor {
  id: string;
  name: string;
  email: string;
  phone: string;
  bloodType: BloodType;
  availability: string; // Could be a date string or more complex type
  location: string; // e.g., City or Zip Code
}

export interface BloodDrive {
  id: string;
  name: string;
  date: string;
  time: string;
  location: string;
  description: string;
  organizer?: string;
  contact?: string;
  imageUrl?: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  author?: string;
  datePublished?: string;
  category?: string;
}

export const bloodTypeOptions: { value: BloodType; label: string }[] = [
  { value: "A+", label: "A+" },
  { value: "A-", label: "A-" },
  { value: "B+", label: "B+" },
  { value: "B-", label: "B-" },
  { value: "AB+", label: "AB+" },
  { value: "AB-", label: "AB-" },
  { value: "O+", label: "O+" },
  { value: "O-", label: "O-" },
];
