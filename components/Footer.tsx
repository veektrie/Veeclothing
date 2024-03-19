import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { footerLinks } from './../constants/data';

const Footer = () => {
  return (
    <footer className='flex flex-col text-black-100 mt-5  border-gray-100 bg-blue-100 rounded-t-[100px]'>
        <div className="flex max-md:flex-col flex-wrap justify-between gap-5 sm:px-16 px-6 py-10">
            <div className="flex flex-col justify-start items-start gap-6">
                <Image 
                  src='/VCC.png'
                  alt='logo'
                  width={118}
                  height={18}
                  className='object-contain'
                />

                <p className="text-base text-gray-700">
                    
                    We are very passionate about <br />
                    our work and committed to <br />
                    providing quality services. <br />
 
                </p>
                <p>
                    We provide customized services <br />
                    in terms of taste , fabric, color, <br />
                    and design. &copy;
                </p>
            </div>

            <div className="footer__links">
                {footerLinks.map((link) => (
                    <div key={link.title} className="footer__link">
                        <h3 className="font-bold">
                            {link.title}
                        </h3>
                        {link.links.map((item) =>(
                            <Link
                                key={item.title}
                                href={item.url}
                                className='text-gray-500 hover:primary-blue'
                            >
                                {item.title}
                            </Link>
                        ))}
                    </div>
                ))}
            </div>

        </div>
        <div className="flex justify-between items-center flex-wrap mt-10  border-gray-100 sm:px-16 px-6 py-10">
            <p>@Vee Clothing Company, All Rights Reserved</p>

            <div className="footer__copyrights-link">
                <Link
                    href='/'
                    className='text-gray-500'
                >
                    Privacy
                </Link>
                <Link
                    href='/'
                    className='text-gray-500'
                >
                    Terms of Use
                </Link>
            </div>
        </div>
    </footer>
  )
}

export default Footer