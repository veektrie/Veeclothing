import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, Share2 } from "lucide-react";
import { client } from "@/lib/sanity";
import { groq } from "next-sanity";
import { PortableText } from "@portabletext/react";

// Query to get the single article based on the slug
const singleArticleQuery = groq`*[_type == "blog" && slug.current == $slug][0] {
  _id,
  title,
  category,
  publishedAt,
  "image": image.asset->url,
  author,
  "authorImage": authorImage.asset->url,
  content,
  "readTime": "5 min read" // Fallback if you don't have this in Sanity
}`;

// Next.js 15 requires params to be awaited
export default async function JournalArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await client.fetch(singleArticleQuery, { slug });

  if (!article) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex flex-col items-center justify-center">
        <h1 className="font-serif text-4xl mb-4 text-gray-900">Article not found</h1>
        <Link href="/journal" className="text-[#D4AF37] border-b border-[#D4AF37] pb-1 uppercase text-sm tracking-widest">
          Return to Journal
        </Link>
      </div>
    );
  }

  // Helper to format date
  const formattedDate = article.publishedAt 
    ? new Date(article.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
    : '';

  // Custom styling for the Sanity Rich Text (Portable Text)
  const ptComponents = {
    block: {
      h1: ({children}: any) => <h1 className="font-serif text-4xl md:text-5xl text-gray-900 mt-12 mb-6 leading-tight">{children}</h1>,
      h2: ({children}: any) => <h2 className="font-serif text-3xl md:text-4xl text-gray-900 mt-10 mb-5 leading-tight">{children}</h2>,
      h3: ({children}: any) => <h3 className="font-serif text-2xl text-gray-900 mt-8 mb-4">{children}</h3>,
      normal: ({children}: any) => <p className="font-sans text-base md:text-lg text-gray-600 leading-relaxed mb-6">{children}</p>,
      blockquote: ({children}: any) => (
        <blockquote className="border-l-2 border-[#D4AF37] pl-6 italic font-serif text-2xl text-gray-800 my-10">
          {children}
        </blockquote>
      ),
    },
    list: {
      bullet: ({children}: any) => <ul className="list-disc pl-6 mb-6 font-sans text-gray-600 space-y-2">{children}</ul>,
      number: ({children}: any) => <ol className="list-decimal pl-6 mb-6 font-sans text-gray-600 space-y-2">{children}</ol>,
    },
    marks: {
      strong: ({children}: any) => <strong className="font-bold text-gray-900">{children}</strong>,
      link: ({value, children}: any) => (
        <a href={value?.href} target="_blank" rel="noreferrer" className="text-[#D4AF37] hover:underline transition-all">
          {children}
        </a>
      ),
    },
  };

  return (
    <main className="bg-[#FDFBF7] min-h-screen pt-24 pb-24">
      
      {/* Navigation Bar */}
      <div className="max-w-4xl mt-10 mx-auto px-6 mb-12 flex justify-between items-center">
          <Link href="/blog" className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors font-sans text-xs uppercase tracking-widest">
            <ArrowLeft className="w-4 h-4" />
            Back to Journal
          </Link>
          <button className="flex items-center gap-2 text-gray-500 hover:text-[#D4AF37] transition-colors">
            <Share2 className="w-4 h-4" />
          </button>
      </div>

      <article className="max-w-3xl mx-auto px-6">
        
        {/* Article Header */}
        <header className="mb-12 text-center">
          <span className="text-[10px] tracking-[0.25em] uppercase text-[#D4AF37] block mb-6 font-sans">
            {article.category || 'Editorial'}
          </span>
          
          <h1 className="font-serif text-4xl md:text-6xl text-gray-900 leading-[1.1] mb-8">
            {article.title}
          </h1>
          
          <div className="flex items-center justify-center gap-6 text-xs font-sans text-gray-500 uppercase tracking-widest border-t border-b border-gray-200 py-4">
            {article.author && (
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-900">By {article.author}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5" />
              <span>{article.readTime}</span>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        {article.image && (
          <div className="relative w-full aspect-[16/9] mb-16 rounded-sm overflow-hidden bg-gray-100">
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Article Content */}
        <div className="mx-auto">
          {article.content ? (
            <PortableText value={article.content} components={ptComponents} />
          ) : (
            <p className="text-gray-500 italic">No content available for this article.</p>
          )}
        </div>

        {/* Article Footer */}
        <footer className="mt-20 pt-10 border-t border-gray-200">
          <div className="bg-gray-900 text-white p-10 text-center rounded-sm">
            <h3 className="font-serif text-3xl mb-3">Join the movement.</h3>
            <p className="font-sans text-white/60 mb-6 text-sm max-w-md mx-auto">
              Subscribe to thevinonobrand journal for exclusive insights on style, heritage, and modern craftsmanship.
            </p>
            <Link href="/">
              <button className="bg-[#D4AF37] hover:bg-[#b5952f] text-gray-900 px-8 py-3 font-sans text-xs uppercase tracking-widest font-bold transition-colors">
                Subscribe Now
              </button>
            </Link>
          </div>
        </footer>

      </article>
    </main>
  );
}