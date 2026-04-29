import React from "react";
import Link from "next/link";
import { ArrowLeft, ScrollText, Shield } from "lucide-react";

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Terms & Conditions | Vee Clothing Company",
  description: "Our commitment to quality and transparency. Review the terms and conditions for our bespoke tailoring and corporate branding services.",
};

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] py-[clamp(100px,12vh,140px)] px-6 font-sans text-[#1C1C1E]">
      
      {/* Decorative Atmosphere */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
        <div className="absolute top-[-5%] right-[-5%] w-[35%] h-[35%] rounded-full bg-blue-100/20 blur-[100px]"></div>
        <div className="absolute bottom-[-5%] left-[-5%] w-[35%] h-[35%] rounded-full bg-emerald-100/20 blur-[100px]"></div>
      </div>

      <div className="max-w-[900px] mx-auto relative z-10">
        
        {/* Navigation Back */}
        <Link href="/" className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase text-[#1A5276] mb-12 hover:opacity-70 transition-opacity">
            <ArrowLeft className="w-3.5 h-3.5" />
            Return to Shop
        </Link>

        <header className="mb-16">
            <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-black/5 flex items-center justify-center">
                    <ScrollText className="w-6 h-6 text-[#1A5276]" />
                </div>
                <div className="h-px flex-1 bg-black/[0.05]"></div>
            </div>
            <h1 style={{ fontFamily: 'Inter, sans-serif' }} className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
                Terms <span className="text-[#1A5276]">&</span> <br/>Conditions.
            </h1>
            <p className="text-[#64748b] mt-6 font-medium max-w-lg leading-relaxed">
                By commissioning a piece or interacting with our archive, you agree to the following protocols that govern the Vee Clothing Company experience.
            </p>
        </header>

        <div className="bg-white rounded-[2.5rem] border border-black/5 shadow-xl shadow-blue-900/5 overflow-hidden">
          <div className="p-8 md:p-14">
            
            <div className="space-y-12">
              
              <section>
                <div className="flex items-center gap-3 mb-4">
                    <span className="text-[10px] font-black text-[#1A5276] bg-[#F8FAFC] w-6 h-6 rounded-full flex items-center justify-center border border-black/5">01</span>
                    <h2 style={{ fontFamily: 'Inter, sans-serif' }} className="text-lg font-bold tracking-tight">Introduction</h2>
                </div>
                <p className="text-[#64748b] text-[15px] leading-relaxed ml-9">
                  Welcome to Vee Clothing Company. By accessing our platform or commissioning custom tailoring, you enter into a binding agreement with us. These terms ensure the integrity of our craft and the satisfaction of our clients.
                </p>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-4">
                    <span className="text-[10px] font-black text-[#1A5276] bg-[#F8FAFC] w-6 h-6 rounded-full flex items-center justify-center border border-black/5">02</span>
                    <h2 style={{ fontFamily: 'Inter, sans-serif' }} className="text-lg font-bold tracking-tight">Intellectual Property</h2>
                </div>
                <p className="text-[#64748b] text-[15px] leading-relaxed ml-9">
                  Vee Clothing Company owns all design patterns, digital assets, and trademarked materials found on this website. Replicating our bespoke designs or using our brand assets without explicit written consent is strictly prohibited.
                </p>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-4">
                    <span className="text-[10px] font-black text-[#1A5276] bg-[#F8FAFC] w-6 h-6 rounded-full flex items-center justify-center border border-black/5">03</span>
                    <h2 style={{ fontFamily: 'Inter, sans-serif' }} className="text-lg font-bold tracking-tight">Bespoke Commissions</h2>
                </div>
                <p className="text-[#64748b] text-[15px] leading-relaxed ml-9">
                  Custom commissions require precise measurements and consultations. While we strive for perfection, slight variations in fabric texture or shade may occur due to the artisanal nature of our sourcing. Production timelines are estimates and may vary based on design complexity.
                </p>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-4">
                    <span className="text-[10px] font-black text-[#1A5276] bg-[#F8FAFC] w-6 h-6 rounded-full flex items-center justify-center border border-black/5">04</span>
                    <h2 style={{ fontFamily: 'Inter, sans-serif' }} className="text-lg font-bold tracking-tight">Limitation of Liability</h2>
                </div>
                <p className="text-[#64748b] text-[15px] leading-relaxed ml-9">
                  Vee Clothing Company shall not be held liable for indirect or consequential damages arising from the use of our products. Our liability is limited strictly to the value of the specific commission in question.
                </p>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-4">
                    <span className="text-[10px] font-black text-[#1A5276] bg-[#F8FAFC] w-6 h-6 rounded-full flex items-center justify-center border border-black/5">05</span>
                    <h2 style={{ fontFamily: 'Inter, sans-serif' }} className="text-lg font-bold tracking-tight">Returns & Revisions</h2>
                </div>
                <p className="text-[#64748b] text-[15px] leading-relaxed ml-9">
                  Bespoke and custom-tailored items are non-refundable once production begins. We offer one complimentary fitting revision for all individual commissions to ensure the perfect silhouette. Ready-to-wear items may be returned within 7 days if in original condition.
                </p>
              </section>

            </div>

            <div className="mt-20 pt-10 border-t border-black/[0.05] flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-3 text-[#1A5276]">
                    <Shield className="w-4 h-4" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Consumer Rights Protected</span>
                </div>
                <div className="text-[10px] font-bold text-[#94a3b8] uppercase tracking-[0.2em]">
                    Last Refined: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </div>
            </div>
          </div>
        </div>

        {/* Support Footer */}
        <div className="mt-12 text-center">
            <p className="text-[11px] text-[#64748b] font-medium">
                Questions regarding our protocols? <br className="md:hidden" />
                Contact us at <span className="text-[#1A5276] font-bold">veeclothingcompany@gmail.com</span>
            </p>
        </div>
      </div>
    </div>
  );
}
