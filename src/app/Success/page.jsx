"use client"

import React from 'react'
import { useRouter } from 'next/navigation'

const page = () => {
  const router = useRouter();
  return (
    <div className='h-[80vh] w-full p-5 flex items-center justify-center'>
      <div className='flex flex-col items-center'>
      <h1 className='text-green-500 font-bold text-xl '>Order Placed Successfully</h1>
      <p className='text-gray-400 text-center'>the Reciept of the Order has been sent on the Registered Email</p>
      <p className='text-gray-400 text-center'>If having any Issues Contact us on the Given number</p>
      <button className='mt-2 text-gray-800 py-2 rounded-lg hover:border-red-500 px-3 border-gray-800 border-2' onClick={()=>{router.push("/Orders")}}>Go to Orders</button>
      </div>
    </div>
  )
}

export default page