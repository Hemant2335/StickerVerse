"use client"

import React  , {useEffect , useState}from 'react'
import { ItemCard } from './components'

const page = () => {

  const [Sticker, setSticker] = useState(null);
  const [Poster, setPoster] = useState(null);

  const fetchdata = async() => 
  {
    try {
      const res = await fetch("https://theprintbackend.vercel.app/products/Sticker" , 
      {
        method : "GET",
        headers: {
          auth: localStorage.getItem("token"),
        },
      })
      const data = await res.json();
      console.log("Running")
      console.log(data);
      setSticker(data);
    } catch (error) {
        alert("Something went wrong");
    }
    
  }

  const fetchPoster = async() => 
  {
    try {
      const res = await fetch("https://theprintbackend.vercel.app/products/Poster" , 
      {
        method : "GET",
        headers: {
          auth: localStorage.getItem("token"),
        },
      })
      const data = await res.json();
      console.log("Running")
      console.log(data);
      setPoster(data);
    } catch (error) {
        alert("Something went wrong");
    }
    
  }

  useEffect(() => {
    fetchdata();
    fetchPoster();
  }, [])
  


  return (
    <div className='w-full md:p-4 p-2 flex flex-col items-center overflow-x-hidden'>

      {/* Banner */}
      <div className=' w-full bg-[#080806] h-[60vh] rounded-lg mt-[5vh]'>
      </div>

      {/* Sticker */}
      <div className='mt-[5vh] w-full'>
        <h2 className='font-bold  text-[4vh] md:text-left text-center md:text-[5vh]'>Stickers</h2>
        <div className='md:flex gap-9'>
          {Sticker?.slice(0,3).map((item)=>{
            return (<ItemCard data={item}/>)
          })}

        </div>
      </div>
      {/* Poster */}
      <div className='mt-[5vh] w-full'>
      <h2 className='font-bold text-[4vh] md:text-left text-center md:text-[5vh]'>Poster</h2>
        <div className='md:flex gap-9'>
          {Poster?.slice(0,3).map((item)=>{
            return (<ItemCard data={item}/>)
          })}

        </div>
      </div>
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