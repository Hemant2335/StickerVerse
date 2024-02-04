import React from 'react'
import { useRouter } from 'next/navigation'

const MoreCard = ({Name}) => {

  const router = useRouter();

  return (
    <div className="shadow-3xl mt-5 mb-10 flex items-center justify-center rounded-lg  w-full md:w-fit text-gray-800  p-4 md:min-w-[10vw]" onClick={()=>{router.push(`/Explore/${Name}`)}}> 
        <h1 className=' hover:underline cursor-pointer font-bold'><button>See More</button></h1>
    </div>
  )
}

export default MoreCard