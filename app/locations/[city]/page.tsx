import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';

// Allowed SAB locations
const validCities = ['lagos', 'abuja', 'asaba'];

interface LocationProps {
  params: {
    city: string;
  };
}

// Generate Static Params for SSG
export function generateStaticParams() {
  return validCities.map((city) => ({
    city,
  }));
}

// Dynamic Metadata per city
export async function generateMetadata({ params }: LocationProps): Promise<Metadata> {
  const { city } = params;
  if (!validCities.includes(city.toLowerCase())) return {};

  const Name = city.charAt(0).toUpperCase() + city.slice(1);

  return {
    title: `Bespoke Tailoring & Corporate Uniforms in ${Name} | Vee Clothing`,
    description: `Premium custom tailoring and executive corporate uniforms serving ${Name}. Enjoy concierge fittings at your home or office in ${Name}.`,
    openGraph: {
      title: `Bespoke Tailoring in ${Name}`,
      description: `Premium bespoke suits and corporate uniforms delivered directly to you in ${Name}.`,
    },
  };
}

export default function LocationPage({ params }: LocationProps) {
  const { city } = params;
  const normalizedCity = city.toLowerCase();

  if (!validCities.includes(normalizedCity)) {
    notFound();
  }

  const CityName = normalizedCity.charAt(0).toUpperCase() + normalizedCity.slice(1);

  // Dynamic Content Generation based on City
  const getCityContent = () => {
    switch (normalizedCity) {
      case 'abuja':
        return {
          districts: 'Maitama, Wuse, and Asokoro',
          vibe: 'Executive authority and political elegance',
          heroImg: 'https://images.unsplash.com/photo-1594938298596-1c25b820fb07?q=80&w=2000&auto=format&fit=crop'
        };
      case 'asaba':
        return {
          districts: 'the GRA and surrounding premium estates',
          vibe: 'Refined native wear and sharp corporate styling',
          heroImg: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=2000&auto=format&fit=crop'
        };
      case 'lagos':
      default:
        return {
          districts: 'Victoria Island, Ikoyi, and Lekki Phase 1',
          vibe: 'Fast-paced corporate dominance and social sophistication',
          heroImg: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?q=80&w=2000&auto=format&fit=crop'
        };
    }
  };

  const content = getCityContent();

  return (
    <main className="bg-[#F8FAFC] min-h-screen">
      {/* City-Specific JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Tailor",
            "name": `Vee Clothing Company ${CityName}`,
            "description": `Bespoke tailoring and corporate uniforms specifically serving clients in ${CityName}.`,
            "url": `https://www.veeclothingcompany.com/locations/${normalizedCity}`,
            "telephone": "+2348103031020",
            "areaServed": {
              "@type": "City",
              "name": CityName
            }
          })
        }}
      />

      {/* Hero Section */}
      <section className="relative w-full h-[70vh] flex items-center justify-center overflow-hidden bg-[#111827]">
        <div 
          className="absolute inset-0 opacity-40 bg-cover bg-center" 
          style={{ backgroundImage: `url(${content.heroImg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A5276]/80 to-transparent" />
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-20">
          <span className="text-white/80 tracking-[0.3em] uppercase text-xs font-bold mb-4 block">
            Vee Clothing Concierge
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Bespoke Tailoring in {CityName}
          </h1>
          <p className="text-white/90 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
            Delivering {content.vibe}. Experience private, executive fittings delivered directly to your home or office in {content.districts}.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/#consultation"
              className="bg-white text-[#1A5276] px-8 py-4 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-gray-100 transition-colors shadow-lg"
            >
              Book a {CityName} Fitting
            </Link>
            <Link 
              href="/shop"
              className="bg-transparent border border-white text-white px-8 py-4 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-white/10 transition-colors"
            >
              View Collection
            </Link>
          </div>
        </div>
      </section>

      {/* Trust & Authority Section */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-[#1A5276]/5 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">
              📏
            </div>
            <h3 className="text-[#1C1C1E] font-bold mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>Mobile Concierge</h3>
            <p className="text-[#64748b] text-sm leading-relaxed">
              We bring our entire catalog of luxury fabrics directly to your location in {CityName}, eliminating the need for you to visit a showroom.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-[#1A5276]/5 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">
              🏢
            </div>
            <h3 className="text-[#1C1C1E] font-bold mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>Corporate Uniforms</h3>
            <p className="text-[#64748b] text-sm leading-relaxed">
              From executive boardrooms to front-line staff, we engineer scalable, branded uniform solutions for {CityName}'s top organizations.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-[#1A5276]/5 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">
              ✂️
            </div>
            <h3 className="text-[#1C1C1E] font-bold mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>Master Craftsmanship</h3>
            <p className="text-[#64748b] text-sm leading-relaxed">
              Every garment is cut and sewn by master tailors with decades of experience, ensuring a flawless fit that commands respect.
            </p>
          </div>
        </div>
      </section>

      {/* Location Specific CTA */}
      <section className="bg-white py-20 border-t border-black/5">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-3xl font-bold text-[#1C1C1E] mb-6" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Elevate Your Standard in {CityName}
          </h2>
          <p className="text-[#64748b] mb-10 max-w-2xl mx-auto">
            Whether you need a single private commission for a major event or a complete corporate overhaul for your team, our master tailors are ready to assist you.
          </p>
          <Link 
            href="/#consultation"
            className="inline-block bg-[#1A5276] text-white px-10 py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#154360] transition-colors shadow-xl"
          >
            Schedule a Consultation
          </Link>
        </div>
      </section>
    </main>
  );
}
