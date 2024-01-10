"use client";

import React, { useEffect, useState } from "react";
import sticker from "../../Assets/sticker.png";
import poster from "../../Assets/poster.png";
import Image from "next/image";
import StateContext from "@/context/Context";
import { useContext } from "react";
import { ItemCard } from "../components";

const Explore = () => {
  const { Sticker, Poster } = useContext(StateContext);
  const [data, setdata] = useState(null);

  useEffect(() => {
    setdata(Sticker);
  }, []);

  const handlebuttonclick = (item) => {
    setdata(item);
  };

  return (
    <div className="">
      {/* headers */}
      <div className="w-full flex flex-col items-center md:flex-row mt-[5vh]  justify-center gap-[5vw]">
        <div
          className="bg-[#222222] gap-[2vh] flex items-center justify-center rounded-lg hover:scale-105 transition-transform cursor-pointer w-fit h-fit p-[2vh] md:p-[3vh]"
          onClick={() => {
            handlebuttonclick(Sticker);
          }}
        >
          <div className=" w-[5vh] overflow-hidden md:flex items-center justify-center  md:h-[5vh] rounded-lg ">
            <Image
              layout="responsive"
              src={sticker}
              width={100}
              height={100}
              className="rounded-xl"
            />
          </div>
          <h1 className="md:text-xl font-bold text-center">Stickers</h1>
        </div>
        <div
          className="bg-[#222222] gap-[2vh] flex items-center justify-center rounded-lg hover:scale-105 transition-transform cursor-pointer w-fit h-fit p-[2vh] md:p-[3vh]"
          onClick={() => {
            handlebuttonclick(Poster);
          }}
        >
          <div className=" w-[5vh] overflow-hidden md:flex items-center justify-center  md:h-[5vh] rounded-lg ">
            <Image
              layout="responsive"
              src={poster}
              width={100}
              height={100}
              className="rounded-xl"
            />
          </div>
          <h1 className="md:text-xl font-bold text-center">Posters</h1>
        </div>
      </div>

      {/* Shopping Items */}
      <div className="w-full h-fit mt-[5vh]">
        <div className="grid grid-cols-1 md:grid-cols-4">
          {data?.map((item) => {
            return <ItemCard data={item} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Explore;
