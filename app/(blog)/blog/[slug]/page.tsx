
import Image from "next/image";
import Link from "next/link";
import { Clock, Calendar, ArrowLeft, Share2 } from "lucide-react";
import BlogNav from "@/components/BlogNav";
import { client } from "@/lib/sanity";
import { groq } from "next-sanity";
import { PortableText } from "@portabletext/react";

const singleArticleQuery = groq`*[_type == "blog" && slug.current == $slug][0] {
  _id,
  title,
  category,
  publishedAt,
  "image": image.asset->url,
  author,
  "authorImage": authorImage.asset->url,
  content,
  "readTime": string(round(length(pt::text(content)) / 1000) + 1) + " min read"
}`;

import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = await client.fetch(groq`*[_type == "blog" && slug.current == $slug][0] { title, "excerpt": array::join(string::split((pt::text(content)), "")[0..160], "") }`, { slug });

  if (!article) return { title: "Article Not Found | Vee Clothing" };

  return {
    title: `${article.title} | The Journal | Vee Clothing`,
    description: article.excerpt || `Read ${article.title} on the Vee Clothing Company journal.`,
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      title: `${article.title} | Vee Clothing`,
      description: article.excerpt,
    }
  };
}

export default async function JournalArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await client.fetch(singleArticleQuery, { slug });

  if (!article) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center gap-4">
        <h1 className="font-inter text-3xl font-extrabold text-[#1C1C1E]">Article not found</h1>
        <Link href="/blog">
          <button className="bg-navy text-white border-none px-8 py-3 rounded-full font-inter font-bold text-sm hover:bg-navy/90 transition-all">
          Return to Blog
          </button>
        </Link>
      </div>
    );
  }

  const formattedDate = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : '';

  const ptComponents = {
    block: {
      h1: ({ children }: any) => <h1 className="font-inter text-3xl md:text-5xl font-extrabold text-[#1C1C1E] mt-12 mb-6 leading-tight tracking-tight">{children}</h1>,
      h2: ({ children }: any) => <h2 className="font-inter text-2xl md:text-3xl font-bold text-[#1C1C1E] mt-10 mb-4 leading-tight tracking-tight">{children}</h2>,
      h3: ({ children }: any) => <h3 className="font-inter text-xl md:text-2xl font-bold text-[#1C1C1E] mt-8 mb-3">{children}</h3>,
      normal: ({ children }: any) => <p className="font-inter text-base md:text-lg text-slate-600 leading-relaxed mb-6">{children}</p>,
      blockquote: ({ children }: any) => (
        <blockquote className="border-l-4 border-navy pl-6 my-10 font-cormorant text-xl md:text-2xl italic text-[#1C1C1E] leading-relaxed">
          {children}
        </blockquote>
      ),
    },
    list: {
      bullet: ({ children }: any) => <ul className="pl-6 mb-6 list-disc space-y-2 text-slate-600 text-base md:text-lg font-inter">{children}</ul>,
      number: ({ children }: any) => <ol className="pl-6 mb-6 list-decimal space-y-2 text-slate-600 text-base md:text-lg font-inter">{children}</ol>,
    },
    marks: {
      strong: ({ children }: any) => <strong className="font-bold text-[#1C1C1E]">{children}</strong>,
      link: ({ value, children }: any) => (
        <a href={value?.href} target="_blank" rel="noreferrer" className="text-[#D4AF37] underline underline-offset-4 decoration-[#D4AF37]/30 hover:decoration-[#D4AF37] transition-all font-semibold">
          {children}
        </a>
      ),
    },
  };

  return (
    <main className="bg-[#F8FAFC] min-h-screen overflow-x-hidden">

      <BlogNav />

      {/* Hero area */}
      <div className="bg-navy pt-[clamp(8rem,15vw,10rem)] pb-16 md:pb-24 px-6 md:px-8 text-center">
        <div className="max-w-[800px] mx-auto">
          <h1 className="font-inter text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white mb-8">
            {article.title}
          </h1>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 pt-8 border-t border-white/10">
            {article.author && (
              <span className="font-inter text-[11px] md:text-xs text-white/70 font-bold uppercase tracking-widest">
                By {article.author}
              </span>
            )}
            <span className="flex items-center gap-2 font-inter text-[11px] md:text-xs text-white/50 font-medium uppercase tracking-widest">
              <Calendar size={12} className="opacity-50" />
              {formattedDate}
            </span>
            <span className="flex items-center gap-2 font-inter text-[11px] md:text-xs text-white/50 font-medium uppercase tracking-widest">
              <Clock size={12} className="opacity-50" />
              {article.readTime}
            </span>
          </div>
        </div>
      </div>

      {/* Article body */}
      <article className="max-w-[800px] mx-auto px-6 md:px-8 py-12 md:py-20">

        {/* Featured Image */}
        {article.image && (
          <div className="relative w-full aspect-video mb-12 md:mb-16 rounded-[24px] md:rounded-[32px] overflow-hidden bg-blue-50 shadow-2xl shadow-navy/5">
            <Image 
              src={article.image} 
              alt={article.title} 
              fill 
              className="object-cover" 
              priority 
              sizes="(max-width: 800px) 100vw, 800px"
            />
          </div>
        )}

        {/* Content */}
        <div className="prose prose-slate prose-lg max-w-none">
          {article.content ? (
            <PortableText value={article.content} components={ptComponents} />
          ) : (
            <p className="font-inter text-slate-400 italic">No content available for this article.</p>
          )}
        </div>

        {/* Footer CTA */}
        <div className="mt-20 md:mt-32 pt-16 md:pt-24 border-t border-black/[0.06]">
          <div className="bg-navy rounded-[32px] md:rounded-[48px] p-8 md:p-16 text-center shadow-2xl shadow-navy/20 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-700"></div>
            
            <h3 className="font-inter text-2xl md:text-4xl font-extrabold tracking-tight text-white mb-4 relative z-10">
              Ready to elevate your wardrobe?
            </h3>
            <p className="font-inter text-sm md:text-base text-white/60 mb-10 max-w-md mx-auto leading-relaxed relative z-10">
              From bespoke commissions to corporate uniforms — Vee Clothing brings your vision to life with artisan precision.
            </p>
            <Link href="/#consultation" className="relative z-10 inline-block">
              <button className="bg-white text-navy border-none px-10 py-5 rounded-full font-inter font-bold text-[11px] md:text-xs uppercase tracking-[0.2em] hover:scale-105 transition-all shadow-xl shadow-black/10 flex items-center gap-3 group/btn">
                Book a Consultation
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="transition-transform group-hover/btn:translate-x-1"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </button>
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}