import Image from "next/image";
import Link from "next/link";
import { Clock, Calendar, ArrowLeft, Share2 } from "lucide-react";
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

export default async function JournalArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await client.fetch(singleArticleQuery, { slug });

  if (!article) {
    return (
      <div style={{ minHeight: '100vh', background: '#F8FAFC', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
        <h1 style={{ fontFamily: 'Inter, sans-serif', fontSize: '2rem', fontWeight: 800, color: '#1C1C1E' }}>Article not found</h1>
        <Link href="/blog" style={{ textDecoration: 'none' }}>
          <button style={{ background: '#1A5276', color: 'white', border: 'none', padding: '12px 28px', borderRadius: 999, fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>
            Return to Journal
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
      h1: ({ children }: any) => <h1 style={{ fontFamily: 'Inter, sans-serif', fontSize: '2.5rem', fontWeight: 800, color: '#1C1C1E', margin: '3rem 0 1.5rem', lineHeight: 1.1, letterSpacing: '-0.03em' }}>{children}</h1>,
      h2: ({ children }: any) => <h2 style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.8rem', fontWeight: 700, color: '#1C1C1E', margin: '2.5rem 0 1rem', lineHeight: 1.2, letterSpacing: '-0.02em' }}>{children}</h2>,
      h3: ({ children }: any) => <h3 style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.3rem', fontWeight: 700, color: '#1C1C1E', margin: '2rem 0 0.75rem' }}>{children}</h3>,
      normal: ({ children }: any) => <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.05rem', color: '#374151', lineHeight: 1.8, marginBottom: '1.5rem' }}>{children}</p>,
      blockquote: ({ children }: any) => (
        <blockquote style={{ borderLeft: '3px solid #1A5276', paddingLeft: '1.5rem', fontFamily: 'Cormorant Garamond, serif', fontSize: '1.4rem', fontStyle: 'italic', color: '#1C1C1E', margin: '2.5rem 0', lineHeight: 1.5 }}>
          {children}
        </blockquote>
      ),
    },
    list: {
      bullet: ({ children }: any) => <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem', fontFamily: 'Inter, sans-serif', color: '#374151', fontSize: '1rem', lineHeight: 1.8 }}>{children}</ul>,
      number: ({ children }: any) => <ol style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem', fontFamily: 'Inter, sans-serif', color: '#374151', fontSize: '1rem', lineHeight: 1.8 }}>{children}</ol>,
    },
    marks: {
      strong: ({ children }: any) => <strong style={{ fontWeight: 700, color: '#1C1C1E' }}>{children}</strong>,
      link: ({ value, children }: any) => (
        <a href={value?.href} target="_blank" rel="noreferrer" style={{ color: '#1A5276', textDecoration: 'underline', textUnderlineOffset: 3 }}>
          {children}
        </a>
      ),
    },
  };

  return (
    <main style={{ background: '#F8FAFC', minHeight: '100vh' }}>

      {/* Top Nav */}
      <div style={{ background: 'white', borderBottom: '1px solid rgba(0,0,0,0.06)', padding: '0 32px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50 }}>
        <Link href="/blog" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8, color: '#64748b', fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
          <ArrowLeft size={14} />
          Back to Journal
        </Link>
        <button style={{ background: 'transparent', border: '1px solid rgba(0,0,0,0.1)', borderRadius: 999, padding: '8px 16px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#64748b' }}>
          <Share2 size={13} />
          Share
        </button>
      </div>

      {/* Hero area */}
      <div style={{ background: '#1A5276', padding: '80px 32px 60px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>

          <h1 style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.1, color: 'white', margin: '0 0 32px' }}>
            {article.title}
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24, borderTop: '1px solid rgba(255,255,255,0.1)', borderBottom: '1px solid rgba(255,255,255,0.1)', padding: '16px 0', flexWrap: 'wrap' }}>
            {article.author && (
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>
                By {article.author}
              </span>
            )}
            <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'Inter, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>
              <Calendar size={12} />
              {formattedDate}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'Inter, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>
              <Clock size={12} />
              {article.readTime}
            </span>
          </div>
        </div>
      </div>

      {/* Article body */}
      <article style={{ maxWidth: 760, margin: '0 auto', padding: '64px 32px 100px' }}>

        {/* Featured Image */}
        {article.image && (
          <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', marginBottom: 56, borderRadius: 20, overflow: 'hidden', background: '#EBF5FB' }}>
            <Image src={article.image} alt={article.title} fill style={{ objectFit: 'cover' }} priority />
          </div>
        )}

        {/* Content */}
        <div>
          {article.content ? (
            <PortableText value={article.content} components={ptComponents} />
          ) : (
            <p style={{ fontFamily: 'Inter, sans-serif', color: '#94a3b8', fontStyle: 'italic' }}>No content available for this article.</p>
          )}
        </div>

        {/* Footer CTA */}
        <div style={{ marginTop: 80, borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: 60 }}>
          <div style={{ background: '#1A5276', borderRadius: 24, padding: '48px', textAlign: 'center' }}>
            <h3 style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.8rem', fontWeight: 800, letterSpacing: '-0.03em', color: 'white', marginBottom: 12 }}>
              Ready to elevate your wardrobe?
            </h3>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: 'rgba(255,255,255,0.6)', marginBottom: 32, maxWidth: 400, margin: '0 auto 32px', lineHeight: 1.7 }}>
              From bespoke commissions to corporate uniforms — Vee Clothing brings your vision to life.
            </p>
            <Link href="/#consultation">
              <button style={{ background: '#10B981', color: 'white', border: 'none', padding: '14px 32px', borderRadius: 999, fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 14, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                Book a Consultation
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </button>
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}