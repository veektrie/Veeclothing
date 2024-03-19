'use client'
import React from 'react'
import CustomButton  from './CustomButton'
import Image from 'next/image'
import Link from 'next/link'

const Hero = () => {
  const whatsappNumber = '2348103031020'; 
  const whatsappUrl = `https://wa.me/c/${whatsappNumber}`;

  const handleScroll = () => {
    const nextSection = document.getElementById("discover");

    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className='hero'>
      <div className="flex-1 pt-36 padding-x">
        <h1 className="hero__title">
          Bespoke Tailoring <br />
          For The <br />
          Discerning 
          Gentleman.
        </h1>

        <p className="hero__subtitle">
          Find your perfect style, Shop our exclusive collection.<br/>
          Click link to see catalog.
        </p>

        <Link href={whatsappUrl} target="_blank" rel="noopener noreferrer">
          <CustomButton 
            title="See Catalog"
            containerStyles='bg-primary-blue text-white rounded-full mt-10 mb-10 shadow-md w-full h-[50px] tracking-[10px] hover:bg-blue-900'
            rightIcon='/right-arrow.svg'
            handleClick={handleScroll}
          />
        </Link>
      </div>

      <div className="hero__image-container">
        <div className="hero__image">
          <Image 
            src="/hero2.png"
            alt='hero'
            fill 
            className='object-contain sm:flex-center'
            priority
          />
        </div>

        <div className='hero__image-overlay' />
      </div>
    </div>
  )
}

export default Hero
