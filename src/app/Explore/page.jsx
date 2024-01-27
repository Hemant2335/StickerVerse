"use client";

import React, { useEffect, useState } from "react";
import sticker from "../../Assets/sticker.png";
import poster from "../../Assets/poster.png";
import Image from "next/image";
import { loadingstatus } from "@/store/atom/State";
import Loading from "../components/Loading";
import { ItemCard } from "../components";
import useFetch from "../hooks/useFetch";
import { useRecoilState } from "recoil";
import toast from "react-hot-toast";

import Filter from "../components/Filter";

const Explore = () => {
  const Sticker = useFetch("Sticker");
  const Poster = useFetch("Poster");
  const [data, setdata] = useState(null);
  const [isLoading, setisLoading] = useRecoilState(loadingstatus);
  const [Categorydata, setCategorydata] = useState(null);
  
  const [Category, setCategory] = useState(null);
  

  const handleAddCategoryfilter = async () => {
    if (!Category) {
      // setdata(Poster);
      return;
    }
    try {
      let newfile = data.filter((item) => {
        return item.Category === Category;
      });
      setdata(newfile);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    handleAddCategoryfilter();
  }, [Category]);

  const handleCategory = async () => {
    try {
      const res = await fetch(
        "https://theprintbackend.vercel.app/products/all/Category",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();
      setCategorydata(data?.data);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    setdata(Sticker);
    handleCategory();
  }, [Sticker]);

  const handlebuttonclick = (item) => {
    setdata(item);
    setCategory(null);
  };

  return (
    <>
      {isLoading && <Loading />}
      <div className="md:flex gap-[2vw]">
        {/* headers */}
        <div className="shadow-xl rounded-lg">
          <div className="w-full text-gray-800 flex flex-col items-center  mt-[5vh] min-w-[20vw]  justify-center gap-2">
            <div
              className=" shadow-3xl gap-[2vh] flex items-center justify-center rounded-lg hover:scale-105 transition-transform cursor-pointer w-fit h-fit p-[2vh] md:p-[3vh]"
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
              className=" gap-[2vh] shadow-3xl flex items-center justify-center rounded-lg hover:scale-105 transition-transform cursor-pointer w-fit h-fit p-[2vh] md:p-[3vh]"
              onClick={() => {
                handlebuttonclick(Poster);
              }}
            >
              <div className=" w-[5vh]  overflow-hidden md:flex items-center justify-center  md:h-[5vh] rounded-lg ">
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
            <Filter Category={Category} setCategory={setCategory} Categorydata={Categorydata}/>
            
          </div>
        </div>
        <hr />
        {/* Shopping Items */}
        <div className="w-full h-fit mt-[5vh]">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {data?.map((item) => {
              return <ItemCard data={item} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Explore;
