"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Home, Compass } from "lucide-react";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8FAFC] text-center px-6 relative overflow-hidden">
      
      {/* Decorative Atmosphere */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-50">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-100/30 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-100/30 blur-[120px]"></div>
      </div>

      <div className="relative z-10 max-w-lg">
        <div className="mb-8 flex justify-center">
            <div className="w-24 h-24 bg-white rounded-full shadow-xl shadow-blue-900/5 flex items-center justify-center border border-black/5">
                <Compass className="w-10 h-10 text-[#1A5276]/20 animate-pulse" />
            </div>
        </div>

        <h1 className="text-8xl md:text-9xl font-black text-[#1A5276]/5 mb-4">404</h1>

        <div className="-mt-16 md:-mt-20">
            <h2 style={{ fontFamily: 'Inter, sans-serif' }} className="text-3xl md:text-4xl font-extrabold text-[#1C1C1E] mb-4 tracking-tight">
                Lost in <span className="text-[#1A5276]">Design.</span>
            </h2>
            <p className="text-[#64748b] mb-10 max-w-sm mx-auto font-medium leading-relaxed">
                The collection or page you are looking for has been moved or curated out of our current archive.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                    onClick={() => router.back()}
                    className="h-14 px-10 rounded-full border border-black/10 bg-white hover:bg-[#F8FAFC] text-[#1C1C1E] font-bold text-[11px] tracking-[0.2em] uppercase flex items-center justify-center gap-2.5 transition-all shadow-sm active:scale-95"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Go Back
                </button>

                <Link href="/">
                    <button className="h-14 px-10 rounded-full bg-[#1A5276] hover:bg-[#154360] text-white font-bold text-[11px] tracking-[0.2em] uppercase flex items-center justify-center gap-2.5 transition-all shadow-xl shadow-blue-900/10 active:scale-95">
                        <Home className="w-4 h-4" />
                        Go Home
                    </button>
                </Link>
            </div>
        </div>
      </div>

      {/* Brand Watermark */}
      <div className="absolute bottom-12 left-0 w-full text-center">
          <p className="text-[9px] font-bold tracking-[0.4em] uppercase text-[#1A5276]/20">
              Vee Clothing Company
          </p>
      </div>
    </div>
  );
}
