import type { Donor, BloodDrive, Article, BloodType } from '@/types';

export const mockDonors: Donor[] = [
  { id: '1', name: 'Jane Doe', email: 'jane.doe@example.com', phone: '555-1234', bloodType: 'A+', availability: 'Weekend mornings', location: 'Springfield, IL' },
  { id: '2', name: 'John Smith', email: 'john.smith@example.com', phone: '555-5678', bloodType: 'O-', availability: 'Weekdays after 5 PM', location: 'Shelbyville, IL' },
  { id: '3', name: 'Alice Brown', email: 'alice.brown@example.com', phone: '555-8765', bloodType: 'B+', availability: 'Anytime with 24hr notice', location: 'Capital City, IL' },
  { id: '4', name: 'Bob Green', email: 'bob.green@example.com', phone: '555-4321', bloodType: 'AB+', availability: 'First Monday of the month', location: 'Springfield, IL' },
];

export const mockBloodDrives: BloodDrive[] = [
  {
    id: 'bd1',
    name: 'Community Blood Drive - City Center',
    date: '2024-08-15',
    time: '10:00 AM - 04:00 PM',
    location: 'City Center Mall, 123 Main St, Springfield',
    description: 'Join us for our monthly community blood drive. Your donation can save up to three lives!',
    organizer: 'Springfield Community Hospital',
    contact: 'donations@schosp.org',
    imageUrl: 'https://placehold.co/600x400.png',
  },
  {
    id: 'bd2',
    name: 'University Campus Blood Donation Event',
    date: '2024-09-05',
    time: '09:00 AM - 03:00 PM',
    location: 'Springfield University, Student Union Building',
    description: 'Students and faculty, make a difference! Donate blood and help those in need. Refreshments provided.',
    organizer: 'Red Cross Society - University Chapter',
    contact: 'university.blood.drive@example.com',
    imageUrl: 'https://placehold.co/600x400.png',
  },
  {
    id: 'bd3',
    name: 'Emergency Blood Drive - Northwood',
    date: '2024-07-30',
    time: '12:00 PM - 06:00 PM',
    location: 'Northwood Community Center, 456 Oak Ave',
    description: 'Urgent need for all blood types. Please donate if you can.',
    organizer: 'City Blood Bank',
    contact: 'urgent@citybloodbank.org',
    imageUrl: 'https://placehold.co/600x400.png',
  },
];

export const mockArticles: Article[] = [
  {
    id: 'article1',
    slug: 'importance-of-blood-donation',
    title: 'The Importance of Blood Donation',
    excerpt: 'Learn why donating blood is crucial for saving lives and supporting your community. Every drop counts!',
    content: 'Detailed content about the importance of blood donation... Blood transfusions are needed for many reasons, including surgeries, cancer treatment, chronic illnesses, and traumatic injuries. Whether a patient receives whole blood, red cells, platelets or plasma, this life-saving care starts with one person making a generous donation.',
    imageUrl: 'https://placehold.co/600x400.png',
    author: 'Dr. Emily Carter',
    datePublished: '2024-07-01',
    category: 'General Information',
  },
  {
    id: 'article2',
    slug: 'what-to-expect-when-donating',
    title: 'What to Expect When Donating Blood',
    excerpt: 'A step-by-step guide to the blood donation process, from registration to post-donation care.',
    content: 'Detailed content about the donation process... The process includes registration, a mini-physical, the donation itself (which takes about 8-10 minutes), and then refreshments. You should feel proud of yourself!',
    imageUrl: 'https://placehold.co/600x400.png',
    author: 'BloodConnect Staff',
    datePublished: '2024-06-15',
    category: 'Process',
  },
  {
    id: 'article3',
    slug: 'benefits-of-donating-blood',
    title: 'The Surprising Benefits of Donating Blood',
    excerpt: 'Beyond saving lives, discover the personal health benefits that can come from regular blood donation.',
    content: 'Detailed content about benefits... Donating blood can help reveal potential health problems, reduce harmful iron stores, and may lower your risk of heart attack and cancer. Plus, it gives you a great feeling of contribution.',
    imageUrl: 'https://placehold.co/600x400.png',
    author: 'Dr. Alan Grant',
    datePublished: '2024-05-20',
    category: 'Health & Wellness',
  },
];

export const getArticleBySlug = (slug: string): Article | undefined => {
  return mockArticles.find(article => article.slug === slug);
};
