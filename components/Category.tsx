'use client'
import React, { useState } from 'react';
import './Category.css'
import Image from 'next/image';
import { cards } from '@/constants/data';
import CustomButton from './CustomButton';
import CategoryDetails from './CategoryDetails';



const Category = () => {
    const [isOpen, setIsOpen] = useState(false);

   return (
    <div className="container">
        <h1 className="hero__title">
          BESPOKE TAILORING 
          
        </h1>

        <div className="cards-list">
          {cards.map((card) => (
            <div key={card.id} className="card">
              <div className="card_image">
                <Image 
                  src={card.imageUrl} 
                  alt={card.title}
                  width={130}
                  height={50}
                  />
              </div>
              
              <div className={`card_title title-${card.titleColor}`}>
                <p>{card.title}</p>
              </div>

              <CustomButton 
                title="See More"
                containerStyles='bg-primary-blue text-white rounded-full left-[15px] mt-12  h-[50px] w-[270px] tracking-[6px]  hover:bg-blue-900'
                rightIcon='/right-arrow.svg'
                handleClick={() => setIsOpen(true)}
                
              />
            </div>
          ))}
       </div>
        
       <CategoryDetails 
        isOpen={isOpen} closeModal={() => setIsOpen(false)} car={undefined}  />
    </div>
    );
};

export default Category;
