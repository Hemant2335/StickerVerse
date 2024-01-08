"use client"

import React  , {useEffect , useState}from 'react'
import { ItemCard } from './components'

const page = () => {

  const [Sticker, setSticker] = useState(null);

  const fetchdata = async() => 
  {
    try {
      const res = await fetch("http://localhost:5000/products/Poster");
      const data = res.json();
      console.log(data);
    } catch (error) {
        alert("Something went wrong");
    }
    
  }

  useEffect(() => {
    fetchdata();
  }, [])
  


  return (
    <div className='w-full p-4'>

      {/* Banner */}
      <div className=' w-full bg-[#080806] h-[60vh] rounded-lg mt-[5vh]'>
      </div>

      {/* Popular */}
      <div className='mt-[5vh] '>
        <h2 className='font-bold text-[5vh]'>Sticker</h2>
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