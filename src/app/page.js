"use client";

import React from "react";
import Image from "next/image";
import DashboardCard from "./components/DashboardCard";
import { loadingstatus } from "@/store/atom/State";
import { useRecoilValue } from "recoil";
import Loading from "./components/Loading";
import { useRouter } from "next/navigation";
import useFetch from "./hooks/useFetch";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const page = () => {
  const isLoading = useRecoilValue(loadingstatus);
  const Banner = useFetch("Special");
  const router = useRouter();

  return (
    <>
      {isLoading && <Loading />}
      <div className="w-full  md:p-4 p-2 flex flex-col items-center overflow-x-hidden">
        {/* Banner */}
        <div className="rounded-2xl w-full overflow-hidden md:flex items-center justify-center  md:h-[60vh]  md:mt-[5vh]">
          <div className="min:w-[40vw] h-fit md:max-w-[40vw] p-[4vh] md:p-[10vh] h-full text-gray-800 rounded-l-xl bg-gray-100">
            <h1 className="text-4xl font-bold">
              Collect Prints for the Heaven
            </h1>
            <p className="mt-[5vh] text-gray-400 ">
              Discover fresh Creatvity, with full of artwork and Passion from a
              wide range Collection , Enjoy exploring and supporting future{" "}
            </p>
            <button
              className="mt-[5vh] bg-gray-800 text-white px-4 py-2 rounded-lg"
              onClick={() => {
                router.push("/Category");
              }}
            >
              Explore Now
            </button>
          </div>
          <div className="h-fit hidden md:max-w-[55vw] md:flex">
            <Carousel showArrows = {true} showStatus = {false} showThumbs = {false} autoPlay = {true} infiniteLoop = {true}>
              {Banner.map((item, index) => {
                return (
                  <Image
                    key={index}
                    layout="responsive"
                    src={item.imageURL}
                    width={50}
                    height={50}
                    className="md:h-[2vw] rounded-r-2xl"
                  />
                );
              })}
            </Carousel>
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
