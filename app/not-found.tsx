// not-found.tsx must be a Server Component in Next.js App Router.
// useRouter is NOT available here — use a plain <a> or Link for navigation.
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-center px-6 relative overflow-hidden"
      style={{ background: "#F8FAFC" }}
    >
      {/* Atmospheric gradients */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 70% 20%, rgba(26,82,118,0.07) 0%, transparent 55%), radial-gradient(ellipse at 20% 80%, rgba(212,175,55,0.06) 0%, transparent 55%)",
        }}
      />

      {/* Gold top rule */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{
          background: "linear-gradient(90deg, transparent, #D4AF37, transparent)",
        }}
      />

      <div className="relative z-10 max-w-[540px]">
        {/* Monogram */}
        <div className="mb-10 flex justify-center">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center"
            style={{
              background: "rgba(26,82,118,0.06)",
              border: "1px solid rgba(212,175,55,0.25)",
            }}
          >
            <span
              className="text-2xl font-bold tracking-tight"
              style={{ color: "#D4AF37" }}
            >
              V
            </span>
          </div>
        </div>

        {/* Ghost 404 */}
        <div
          className="text-[clamp(6rem,20vw,10rem)] font-black leading-none select-none mb-0"
          style={{
            color: "transparent",
            WebkitTextStroke: "1px rgba(26,82,118,0.08)",
          }}
        >
          404
        </div>

        <div className="-mt-4">
          <span
            className="block text-[9px] tracking-[0.3em] uppercase font-bold mb-5"
            style={{ color: "#D4AF37" }}
          >
            Page Not Found
          </span>

          <h1
            className="text-[clamp(1.6rem,4vw,2.8rem)] font-semibold tracking-[-0.03em] leading-[1.15] text-[#1C1C1E] mb-4"
          >
            This piece has left the floor.
          </h1>

          <p className="text-[14px] font-light text-[#94a3b8] leading-[1.8] mb-10 max-w-[380px] mx-auto">
            But the atelier remains open. The collection or page you are looking
            for may have been moved, archived, or commissioned out.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            {/* Use Link with href="/" instead of router.back() — server safe */}
            <Link
              href="/shop"
              id="notfound-go-back"
              className="flex items-center gap-2 px-7 py-3.5 rounded-full text-[10px] tracking-[0.2em] uppercase font-bold text-[#64748b] hover:text-[#1A5276] transition-colors border border-black/10 hover:border-[#1A5276]/30 bg-white no-underline"
            >
              <ArrowLeft size={13} />
              Go Back
            </Link>

            <Link
              href="/shop"
              id="notfound-view-shop"
              className="flex items-center gap-2 px-7 py-3.5 rounded-full text-[10px] tracking-[0.2em] uppercase font-bold text-white no-underline transition-all duration-300 hover:shadow-[0_8px_24px_rgba(26,82,118,0.25)]"
              style={{ background: "linear-gradient(135deg, #1A5276, #2980B9)" }}
            >
              View the Collection
            </Link>
          </div>

          {/* Category quick links */}
          <div className="mt-12 pt-8 border-t border-black/5">
            <p className="text-[9px] tracking-[0.25em] uppercase text-[#94a3b8] mb-4">
              You may be looking for
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {[
                { label: "Bespoke Suits", href: "/shop?category=bespoke" },
                { label: "Kaftans", href: "/shop?category=kaftan" },
                { label: "Corporate", href: "/shop?category=corporate" },
                { label: "Blog", href: "/blog" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 rounded-full text-[9px] tracking-[0.15em] uppercase font-bold no-underline transition-all duration-200 hover:text-[#1A5276]"
                  style={{
                    color: "#64748b",
                    border: "1px solid rgba(0,0,0,0.08)",
                    background: "white",
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Brand watermark */}
      <div className="absolute bottom-8 left-0 w-full text-center">
        <p
          className="text-[8px] font-bold tracking-[0.5em] uppercase"
          style={{ color: "rgba(26,82,118,0.15)" }}
        >
          Vee Clothing Company · Lagos
        </p>
      </div>
    </div>
  );
}
