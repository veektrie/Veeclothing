import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import CustomButton from './CustomButton'

const Navbar = () => {
  return (
    <header className='w-full absolute z-10'>
      <nav className='max-w-[1440px] h-24  mx-auto flex justify-between items-center sm:px-16 px-6 py-4'>
        <Link 
          href='/' 
          className='flex justify-center items-center'
        >
           <Image 
              src='/VCC.png'
              alt='Car Hub logo'
              width={300}
              height={18}
              className='object-contain pr-20 mt-5 hover'
              priority
           />
        </Link>

        <CustomButton
           title='Welcome'
           btnType='button'
           containerStyles='text-primary-blue rounded-full bg-white min-w-[i30px] '
        />
      </nav>
    </header>
  )
}

export default Navbar
