// src/app/(main)/blog/[slug]/page.tsx
import Image from 'next/image';
import { getArticleBySlug, mockArticles } from '@/lib/mockData'; // Assuming getArticleBySlug is implemented
import { Card, CardContent, CardDescription, CardHeader, CardTitle,CardFooter } from '@/components/ui/card';
import { CalendarDays, User, Tag } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {notFound} from 'next/navigation';


interface BlogPostPageProps {
  params: { slug: string };
}

// This function can be removed if you're not using SSG or want dynamic rendering always.
// For a prototype, dynamic rendering is fine.
export async function generateStaticParams() {
  return mockArticles.map((article) => ({
    slug: article.slug,
  }));
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const article = getArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Card className="shadow-xl overflow-hidden">
        {article.imageUrl && (
          <div className="relative h-64 md:h-80 w-full">
            <Image
              src={article.imageUrl}
              alt={article.title}
              layout="fill"
              objectFit="cover"
              data-ai-hint="health article"
            />
          </div>
        )}
        <CardHeader className="pt-6">
          <CardTitle className="text-3xl md:text-4xl font-bold text-primary">{article.title}</CardTitle>
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground mt-2">
            {article.datePublished && (
              <span className="flex items-center">
                <CalendarDays className="h-4 w-4 mr-1.5" />
                {new Date(article.datePublished).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
            )}
            {article.author && (
              <span className="flex items-center">
                <User className="h-4 w-4 mr-1.5" />
                {article.author}
              </span>
            )}
            {article.category && (
              <span className="flex items-center">
                <Tag className="h-4 w-4 mr-1.5" />
                {article.category}
              </span>
            )}
          </div>
        </CardHeader>
        <CardContent className="prose prose-lg max-w-none text-foreground/90 py-6">
          {/* Split content into paragraphs for better formatting if it's a simple string */}
          {article.content.split('\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </CardContent>
        <CardFooter>
          <Button asChild variant="outline">
            <Link href="/blog">Back to Blog</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const article = getArticleBySlug(params.slug);
  if (!article) {
    return {
      title: 'Article Not Found',
    };
  }
  return {
    title: `${article.title} | BloodConnect Blog`,
    description: article.excerpt,
  };
}
