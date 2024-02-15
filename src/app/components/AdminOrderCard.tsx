"use client";

import React, { useState } from "react";
import Image from "next/image";
import ChangeStatus from "./ChangeStatus";
import {AdminOrderinterface} from "../../Utils/Interfaces"


const AdminOrderCard = (data: AdminOrderinterface) => {
  const [isAddStatus, setisAddStatus] = useState(false);
  const [Status, setStatus] = useState("");

  return (
    <>
      {isAddStatus && (
        <ChangeStatus
          setisAddStatus={setisAddStatus}
          setMainStatus={setStatus}
          id={data?._id}
          email={data?.user?.Email}
          name={data?.name}
        />
      )}
      <div className="md:flex justify-between items-center cursor-pointer border-2 shadow-3xl bg-white  mb-10 rounded-lg  w-full   p-4 ">
        <div className="flex">
          <div>
            <Image
              layout="responsive"
              src={data?.image}
              width={200}
              height={200}
              className="rounded-xl md:max-h-[20vh]"
              alt="Image"
            />
          </div>
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
                Status : {Status ? Status : data?.status}
              </h2>
              <button
                className="border-2 py-2 px-3 rounded-sm hover:border-red-500"
                onClick={() => {
                  setisAddStatus(true);
                }}
              >
                Update
              </button>
            </div>
          </div>
        </div>
        <h2 className="md:hidden flex">Details</h2>
        <div className="md:max-w-[20vw]">
          <h2 className="text-sm text-gray-400 font-poppins font-medium ">
            Name : {data?.user?.Name}
          </h2>
          <h2 className="text-sm text-gray-400 font-poppins font-medium ">
            Email : {data?.user?.Email}
          </h2>
          <h2 className="text-sm text-gray-400 font-poppins font-medium ">
            Phone : {data?.user?.Phone}
          </h2>
          <h2 className="text-sm text-gray-400 font-poppins font-medium ">
            Address : {data?.address}
          </h2>
        </div>
      </div>
    </>
  );
};

export default AdminOrderCard;
