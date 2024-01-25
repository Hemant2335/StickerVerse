"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "react-hot-toast";

const ItemCard = ({ data }) => {
  const router = useRouter();

  const handleonCart = () => {
    router.push(`/Items/${data?._id}`);
  };

  return (
    <>
      <div
        className="mt-5 cursor-pointer border-2 shadow-3xl bg-white  hover:scale-105 transition-transform mb-10 rounded-lg  w-full md:w-fit  p-4 md:min-w-[10vw]"
        onClick={handleonCart}
      >
        <div className="  md:min-w-[10vw] md:max-w-[25vw]">
          <Image
            layout="responsive"
            src={data?.imageURL}
            width={200}
            height={200}
            className="rounded-xl md:max-h-[40vh]"
          />
          <div className=" flex  items-center justify-between px-2  rounded-md">
            <div>
              <h1 className="text-sm text-gray-800 font-poppins font-medium mt-5 ">
                {data?.Name}
              </h1>
              <div className="flex gap-2">
              <h2 className="text-sm text-gray-400 font-poppins font-medium ">
                Price : ₹{data?.Price}
              </h2>
            </div>
            </div>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemCard;
