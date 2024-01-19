import React from 'react'
import { useRouter } from 'next/navigation'

const MoreCard = () => {

  const router = useRouter();

  return (
    <div className="mt-5 mb-10 flex items-center justify-center rounded-lg  w-full md:w-fit bg-[#080806] p-4 md:min-w-[10vw]" onClick={()=>{router.push("/Explore")}}> 
        <h1 className='hover:underline cursor-pointer font-bold'><button>See More</button></h1>
    </div>
  )
}

export default MoreCard