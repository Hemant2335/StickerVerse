"use client";

import React ,{useEffect} from 'react'
import { useRouter } from 'next/navigation'

interface MorecardProps {
  name : string
}


const MoreCard = (name : MorecardProps) => {

  const router = useRouter();
  useEffect(()=>{
    console.log(name);
  })

  return (
    <div className="shadow-3xl mt-5 mb-10 flex items-center justify-center rounded-lg  w-full md:w-fit text-gray-800  p-4 md:min-w-[10vw]" onClick={()=>{router.push(`/Explore/${name.name}`)}}> 
        <h1 className=' hover:underline cursor-pointer font-bold'><button>See More</button></h1>
    </div>
  )
}

export default MoreCard