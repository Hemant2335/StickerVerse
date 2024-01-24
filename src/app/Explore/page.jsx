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
import { FiChevronDown } from "react-icons/fi";

const Explore = () => {
  const Sticker = useFetch("Sticker");
  const Poster = useFetch("Poster");
  const [data, setdata] = useState(null);
  const [isLoading, setisLoading] = useRecoilState(loadingstatus);
  const [Categorydata, setCategorydata] = useState(null);
  const [SubCategorydata, setSubCategorydata] = useState(null);
  const [Category, setCategory] = useState(null);
  const [Subcategory, setSubcategory] = useState(null);
  const [isSubcatdropdown, setisSubcatdropdown] = useState(false);
  const [isCatdropdown, setisCatdropdown] = useState(false);


  const handleAddCategoryfilter = async () =>{
    if(!Category)
    {
      // setdata(Poster);
      return ;
    }
    try {
      let newfile = data.filter((item)=>{
        return item.Category === Category
      })
      setdata(newfile);
       
    } catch (error) {
       toast.error("Something went wrong");
    }
  }

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

  const handlebuttonclick =(item) => {
    setdata(item);
    setCategory(null);
  };

  return (
    <>
      {isLoading && <Loading />}
      <div className="">
        {/* headers */}
        <div className="w-full text-gray-800 flex flex-col items-center md:flex-row mt-[5vh]  justify-center gap-[5vw]">
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
        </div>

        {/* Filters */}
        <div className="mt-[2vh] ">
          <h1 className="text-gray-800 font-bold text-xl">Filters</h1>
          <div className="flex gap-[2vw]">
            <div className="mt-[2vh]">
              <h1
                className="text-gray-800 font-bold shadow-3xl w-fit p-2 cursor-pointer rounded-lg flex items-center"
                onClick={() => {
                  setisCatdropdown(!isCatdropdown);
                }}
              >
                {Category ? `${Category}` : "Select Category"} <FiChevronDown />
              </h1>
              {isCatdropdown && (
                <div className="mt-[2vh] shadow-3xl absolute bg-white rounded-lg">
                  <div
                        className=" p-2 cursor-pointer hover:bg-red-400 rounded-md flex items-center"
                        onClick={() => {
                          setCategory(null);
                          setisCatdropdown(false);
                          setSubcategory(null);
                        }}
                      >
                        <h1 className="text-gray-800 font-bold">
                          Select Category
                        </h1>
                      </div>
                  {Categorydata?.map((item) => {
                    return (
                      <div
                        className=" p-2 cursor-pointer hover:bg-red-400 rounded-md flex items-center"
                        onClick={() => {
                          setCategory(item?.Name);
                          setisCatdropdown(false);
                          setSubcategory(null);
                          setSubCategorydata(item?.subcategory);
                        }}
                      >
                        <h1 className="text-gray-800 font-bold">
                          {item?.Name}
                        </h1>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            {SubCategorydata && (
              <div className="mt-[2vh]">
                <h1 className="text-gray-800 font-bold shadow-3xl w-fit p-2 cursor-pointer rounded-lg flex items-center"onClick={() => {
                setisSubcatdropdown(!isSubcatdropdown);
              }}>
                  {Subcategory ? `${Subcategory}` : "Select SubCategory"}{" "}
                  <FiChevronDown />
                </h1>
                {isSubcatdropdown && (
                  <div className="mt-[2vh] shadow-3xl absolute bg-white rounded-lg">
                    {SubCategorydata?.map((item) => {
                      return (
                        <div
                          className=" p-2 cursor-pointer hover:bg-red-400 rounded-md flex items-center"
                          onClick={() => {
                            setSubcategory(item?.Name);
                            setisSubcatdropdown(false);
                          }}
                        >
                          <h1 className="text-gray-800 font-bold">
                            {item?.Name}
                          </h1>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
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
    </>
  );
};

export default Explore;
