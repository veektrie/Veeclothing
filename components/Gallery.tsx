import React from 'react';
import { BsInstagram, BsArrowLeftShort, BsArrowRightShort } from 'react-icons/bs';
import images from '../constants/images';
import './Gallery.css';
import CustomButton from './CustomButton';
import Image from 'next/image';
import Link from 'next/link';

const galleryImages = [
                       images.hero1, images.kaftan02, images.kaftan03, images.kaftan04, 
                       images.suit01, images.suit02, images.suit03, images.suit04, images.suit05, 
                       images.cop4, images.cop2, images.cop6,  images.cop5,  images.cop7,
                       images.kaftan05, images.kaftan06, images.kaftan07, images.kaftan08, images.kaftan09, images.kaftan10,,
                      ];

const Gallery = () => {
  const whatsappNumber = '2348103031020'; 
  const whatsappUrl = `https://wa.me/c/${whatsappNumber}`;
  const InstagramUrl = `http://linktr.ee/veeclothingcompany`;


  const scrollRef = React.useRef(null);

  const  scroll = (direction) => {
    const { current } = scrollRef;

    if(direction === 'left') {
      current.scrollLeft -= 300;
    } else {
      current.scrollLeft += 300;
    }
  }
  
  return (
    <div className="app__gallery flex__center bg-blue-100">
      <div className="app__gallery-content">
        {/* <SubHeading title="Instagram" /> */}
        <h1 className="hero__title ">
            Express your Unique Style, Embrace Timeless Elegance
        </h1>

        <p className="hero__subtitle" style={{ marginTop: '2rem' }}>
           Discover a curated collection of quality fabrics and exquisite outfits by expert tailors crafted to reflect your individual taste <br/>
        </p>

        <p className="hero__subtitle" style={{ marginTop: '1rem' }}>
            Find your perfect fit,color and design that's undeniably you!
        </p>

        <p className="hero__subtitle" style={{ marginTop: '1rem' }}>
            We get it – young professionals appreciate quality without breaking the bank!
        </p>
 
        <Link href={whatsappUrl} target="_blank" rel="noopener noreferrer">
          <CustomButton
            title="View More"
            rightIcon='/right-arrow.svg'
            containerStyles='bg-primary-blue text-white rounded-full mt-12 w-[170%] h-[60px] tracking-[5px]'
          />
        </Link>

      </div>

      <div className="app__gallery-images">
        <div className="app__gallery-images_container" ref={scrollRef}>
          {galleryImages.map((image, index) => (
            <div className="app__gallery-images_card flex__center" key={`gallery_image-${index+ 1}`}>

              <Link href={InstagramUrl}>
                <BsInstagram className="gallery__image-icon" />
              </Link>

              <Image src={image} alt="gallery"  priority/>
            </div>
          ))}
        </div>

        <div className="app__gallery-images_arrows">
          <BsArrowLeftShort className="gallery__arrow-icons" onClick={() => scroll('left')} />
          <BsArrowRightShort className="gallery__arrow-icons" onClick={() => scroll('right')} />
        </div>
        
      </div>

    </div>
  )
};
export default Gallery;