"use client"
import { MoreCard } from '.'
import useFetch from '../hooks/useFetch'
import ItemCard from './ItemCard'

const DashboardCard = ({Name}) => {
  const ProductData = useFetch(Name);
  return (
    <div className='mt-[5vh] w-full'>
        <h2 className='font-bold  text-[4vh] text-left text-lg md:text-[5vh]'>{Name}</h2>
        <div className='md:flex gap-9'>
          {ProductData?.slice(0,4).map((item)=>{
            return (<ItemCard data={item}/>)
          })}
          <MoreCard/>
        </div>
      </div>
  )
}

export default DashboardCard