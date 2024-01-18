"use client"

import React from 'react'
import Image from 'next/image'
import banner from "../Assets/Banner.jpg"
import DashboardCard from './components/DashboardCard'

const page = () => {
  
  return (
    <div className='w-full md:p-4 p-2 flex flex-col items-center overflow-x-hidden'>

      {/* Banner */}
      <div className='hidden w-full overflow-hidden md:flex items-center justify-center bg-[#080806]  md:h-[60vh] rounded-lg mt-[5vh]'>
      <Image layout="responsive" src={banner} width={500} height={500} className="rounded-xl"/>
      </div>

      {/* Sticker */}
      <DashboardCard Name={"Sticker"}/>
      {/* Poster */}
      <DashboardCard Name={"Poster"}/>
      {/* Best Seller */}
      {/* <div className='mt-[5vh] '>
        <h2 className='font-bold text-[5vh]'>Best Seller</h2>
        <div className='grid grid-cols-5 p-4 '>
          <ItemCard/>
          <ItemCard/>
          <ItemCard/>
          <ItemCard/>
          <ItemCard/>
        </div>
      </div> */}

    </div>
  )
}

export default page