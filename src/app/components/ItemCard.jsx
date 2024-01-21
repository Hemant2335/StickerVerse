"use client"

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from 'react-hot-toast';


const ItemCard = ({ data }) => {
  const router = useRouter();

  const handleonCart = () => {
    router.push(`/Items/${data?._id}`);
  }

  return (
    <>
    <div className="mt-5 cursor-pointer hover:scale-105 transition-transform mb-10 rounded-lg  w-full md:w-fit bg-[#080806] p-4 md:min-w-[10vw]" >
      <div className=" min-w-[20vh] md:min-w-[10vw] md:max-w-[20vw]" >
        <Image
          layout="responsive"
          src={data?.imageURL}
          width={200}
          height={200}
          className="rounded-xl md:max-h-[28vh]"
        />
        <div className=" flex  items-center justify-between px-2 shadow-3xl  rounded-md">
          <div>
            <h1 className="text-sm text-[#F9F6EE] font-poppins font-medium mt-5 ">
              {data?.Name}
            </h1>
            <div className="flex">
              <h2 className="text-sm text-gray-400 font-poppins font-medium ">
                Price :
              </h2>
              <h2 className="text-sm text-gray-400 font-poppins font-medium ">
                {data?.Price}
              </h2>
            </div>
          </div>
          <button
            className="bg-[#f05700] ml-[2vw] text-sm hover:scale-105 transition-transform text-black font-poppins font-medium p-2 rounded-lg mt-5"
            onClick={handleonCart}
          >
            Buy
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default ItemCard;
