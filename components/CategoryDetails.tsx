'use client'
import React, { Fragment } from 'react'

import Image from "next/image";

import { Dialog, DialogPanel, Transition, TransitionChild } from "@headlessui/react";
import { CarProps } from "@/types";
import './CategoryDetails.css'
import CustomButton from './CustomButton';
import Link from 'next/link';
import { categoryDetails } from '@/constants/data';

interface CarDetailsProps {
  isOpen: boolean;
  closeModal: () => void;
  car: CarProps;
}

const CategoryDetails = ({ isOpen, closeModal, car }: CarDetailsProps) => {
  return (
    <>
      <Transition show={isOpen}>
        <Dialog as='div' className='relative z-10' onClose={closeModal}>
          <TransitionChild
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </TransitionChild>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <TransitionChild
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <DialogPanel className='relative w-full max-w-lg max-h-[90vh] overflow-y-auto transform rounded-2xl bg-blue-100 p-6 text-left shadow-xl transition-all flex flex-col gap-5'>
                  <button
                    type='button'
                    onClick={closeModal}
                    className='absolute top-2 right-2 z-10 w-fit p-2 bg-primary-blue-100 rounded-full'
                  >
                    <Image 
                      src="/close.svg"
                      alt='close'
                      width={20}
                      height={20}
                      className='object-contain'
                    />
                  </button>

                  <div className="gallery-section">
                    <div className="gallery-box">
                      {categoryDetails.map((categoryDetail) => (
                        <div className="box big">
                          <Image 
                            src={categoryDetail.imgUrl} 
                            alt={categoryDetail.title}
                            width={130}
                            height={50}
                            className="img-fluid"
                          />
                            
                        </div>
                      ))}

                    </div>

                    <CustomButton
                      title="Message Me"
                      containerStyles='bg-primary-blue text-white rounded-full mt-12  h-[50px] w-full tracking-[3px]  hover:bg-blue-900'
                      rightIcon='/right-arrow.svg'
                    />
                  </div>

                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default CategoryDetails