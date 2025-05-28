// src/app/(main)/blog/page.tsx
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mockArticles } from '@/lib/mockData';
import { Newspaper, ArrowRight } from 'lucide-react';

export default function BlogPage() {
  return (
    <div className="space-y-8">
      <header className="text-center">
        <Newspaper className="mx-auto h-12 w-12 text-primary mb-2" />
        <h1 className="text-4xl font-bold text-primary">BloodConnect Blog</h1>
        <p className="text-xl text-muted-foreground mt-2">
          Stay informed with our latest articles, tips, and stories about blood donation.
        </p>
      </header>

      {mockArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockArticles.map((article) => (
            <Card key={article.id} className="shadow-lg hover:shadow-xl transition-shadow flex flex-col overflow-hidden">
              <Link href={`/blog/${article.slug}`} className="block">
                <div className="relative h-48 w-full">
                  <Image
                    src={article.imageUrl}
                    alt={article.title}
                    layout="fill"
                    objectFit="cover"
                    data-ai-hint="medical healthcare"
                  />
                </div>
              </Link>
              <CardHeader>
                <Link href={`/blog/${article.slug}`} className="hover:text-primary transition-colors">
                  <CardTitle className="text-2xl">{article.title}</CardTitle>
                </Link>
                {article.datePublished && (
                  <CardDescription>
                    Published on {new Date(article.datePublished).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    {article.author && ` by ${article.author}`}
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground line-clamp-3">{article.excerpt}</p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="link" className="text-accent p-0 hover:text-accent/80">
                  <Link href={`/blog/${article.slug}`}>
                    Read More <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground py-10 text-lg">
          No articles published yet. Please check back soon for updates.
        </p>
      )}
    </div>
  );
}
