import React from 'react'
import { ItemCard } from './components'

const page = () => {
  return (
    <div className='w-full p-4'>

      {/* Banner */}
      <div className=' w-full bg-[#080806] h-[60vh] rounded-lg mt-[5vh]'>
      </div>

      {/* Popular */}
      <div className='mt-[5vh] '>
        <h2 className='font-bold text-[5vh]'>Popular</h2>
        <div className='grid grid-cols-5 p-4 '>
          <ItemCard/>
          <ItemCard/>
          <ItemCard/>
          <ItemCard/>
          <ItemCard/>
        </div>
      </div>
      {/* Latest */}
      <div className='mt-[5vh] '>
        <h2 className='font-bold text-[5vh]'>Latest</h2>
        <div className='grid grid-cols-5 p-4 '>
          <ItemCard/>
          <ItemCard/>
          <ItemCard/>
          <ItemCard/>
          <ItemCard/>
        </div>
      </div>
      {/* Best Seller */}
      <div className='mt-[5vh] '>
        <h2 className='font-bold text-[5vh]'>Best Seller</h2>
        <div className='grid grid-cols-5 p-4 '>
          <ItemCard/>
          <ItemCard/>
          <ItemCard/>
          <ItemCard/>
          <ItemCard/>
        </div>
      </div>

    </div>
  )
}

export default page