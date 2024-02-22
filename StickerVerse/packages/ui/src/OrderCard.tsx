"use client";

import React from "react";
import Image from "next/image";
import {UserOrderinterface} from "../../Utils/Interfaces"

interface OrderCardProps {
  data : UserOrderinterface
  key : number
}


const OrderCard = ({data} : OrderCardProps) => {
  return (
    <>
      <div
        className=" cursor-pointer border-2 shadow-3xl bg-white  hover:scale-105 transition-transform mb-10 rounded-lg  w-full md:w-fit  p-4 md:max-w-[16vw]"
      >
        <div className="  md:min-w-[10vw] md:max-w-[25vw]">
          <Image
            layout="responsive"
            src={data?.image}
            width={200}
            height={200}
            className="rounded-xl md:max-h-[40vh]"
            alt="Image"
          />
          <div className=" flex  items-center justify-between px-2  rounded-md">
            <div>
              <h1 className="text-sm text-gray-800 font-poppins font-medium mt-5 ">
                {data?.name}
              </h1>
              <div className="flex gap-2">
                <h2 className="text-sm text-gray-400 font-poppins font-medium ">
                  Price : ₹{data?.price}
                </h2>
              </div>
              <h2 className="text-sm text-gray-400 font-poppins font-medium ">
                Size : {data?.size}
              </h2>
              <h2 className="text-sm text-green-400 font-poppins font-medium ">
                Status : {data?.status}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderCard;
