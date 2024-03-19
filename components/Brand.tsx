'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import '../components/Brand.css'
import styles from '../app/index';
import { staggerContainer } from './../utils/motion';
import { brands } from '@/constants/data';
import  BrandCard  from './BrandCard';


const Explore = () => {
  const [active, setActive] = useState('world-2');

  return (
    <section className={`${styles.paddings} dd`} id='explore'> 

       <h1 className="hero__title">
          Brands We've Worked With
        </h1>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className={`${styles.innerWidth} mx-auto flex flex-col `}
      >
        {/* <TypingText title="| The World" textStyles="text-center" />
        <TitleText title={<>Choose the World you want <br className='md:block hidden' /> to explore</>} textStyles="text-center" /> */}

        <div className='mt-[50px] flex lg:flex-row flex-col min-h-[70vh] gap-5 '>
          {brands.map((world, index) => (
            <BrandCard
              key={world.id}
              {...world}
              index={index} 
              active={active}
              handleClick={setActive}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Explore;