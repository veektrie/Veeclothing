'use client'


import Hero from './../components/Hero';
import Gallery from './../components/Gallery';
import Category from './../components/Category';
import Brand from '@/components/Brand';
import Intro from "@/components/Intro";
import Contact from './../components/Contact';
import Intro1 from '@/components/Intro 1';

export default function Home() {
  
  return (
    <main className='overflow-hidden'>
      <Hero />
      {/* <Intro1 /> */}
      <Gallery />
      {/* <Category /> */}
      <Brand />
      <Intro />
      <Contact />
    </main>
  );
}