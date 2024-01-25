"use client";

import React from "react";
import Image from "next/image";
import banner from "../Assets/TestBanner.jpg";
import DashboardCard from "./components/DashboardCard";
import { loadingstatus } from "@/store/atom/State";
import { useRecoilValue } from "recoil";
import Loading from "./components/Loading";

const page = () => {
  const isLoading = useRecoilValue(loadingstatus);

  return (
    <>
      {isLoading && <Loading />}
      <div className="w-full  md:p-4 p-2 flex flex-col items-center overflow-x-hidden">
        
        {/* Banner */}
        <div className="rounded-2xl w-full overflow-hidden md:flex items-center justify-center  md:h-[80vh]  mt-[5vh]">
          <div className="min:w-[40vw] md:max-w-[40vw] p-[4vh] md:p-[10vh] h-full text-gray-800 rounded-l-xl bg-gray-100">
            <h1 className="text-4xl font-bold">Collect Prints for the Heaven</h1>
            <p className="mt-[5vh] text-gray-400 ">Discover fresh Creatvity, with full of artwork and Passion from a wide range Collection , Enjoy exploring and supporting future </p>
            <button className="mt-[5vh] bg-gray-800 text-white px-4 py-2 rounded-lg">Explore Now</button>
          </div>
          <div className="h-full hidden">
            <Image
              layout="responsive"
              src={banner}
              width={50}
              height={50}
              className="md:h-[2vw] rounded-r-2xl"
            />
          </div>
        </div>

        {/* Sticker */}
        <DashboardCard Name={"Sticker"} />
        {/* Poster */}
        <DashboardCard Name={"Poster"} />
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
    </>
  );
};

export default page;
