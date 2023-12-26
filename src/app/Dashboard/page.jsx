"use client";

import React from "react";
import profile from "../../Assets/logo.png";
import { FiUploadCloud } from "react-icons/fi";
import { MdCloudDone } from "react-icons/md";
import { useState } from "react";
import Image from "next/image";

const page = () => {
  const [isuploaded, setisuploaded] = useState(false);
  const [isselected, setisselected] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const [imgurl, setimgurl] = useState("");
  const [Cat, setCat] = useState("");
  const [Price, setPrice] = useState("");
  const [Desc, setDesc] = useState("");
  const [Subcat, setSubcat] = useState("");
  const [Name, setName] = useState("");
  const [Type, setType] = useState("");

  return (
    <div>
      {isLoading && <Loading />}
      <div className="flex justify-center my-[10vh] md:mx-0 mx-[5vw] md:p-[5vh]">
        <div className="h-fit w-[50vw] shadow-3xl bg-[#080806] gap-[10vh] justify-center items-center p-[5vh]">
          <div className=" shadow-3xl items-center flex flex-col w-full justify-center  p-4 rounded-lg">
            {imgurl ? (
              <Image src={imgurl} className="h-[20vh] md:h-[30vh]" />
            ) : (
              <Image src={profile} height={150} />
            )}
            <div className="flex items-center gap-4">
                <input
                  type="file"
                  accept="image/*"
                  name="image"
                  className="w-full font-poppins cursor-pointer rounded-lg  bg-[#2B2B2B]  p-3 text-sm font-medium text-white hover:bg-[#383838] focus:border-2 focus:border-[#f05700] focus:outline-none md:w-full "
                  onChange={(e) => {
                    if (e.target.files.length > 0) {
                      setisselected(e.target.files[0]);
                    } else {
                      setisselected(null);
                    }
                  }}
                />
                {!isuploaded ? (
                  <FiUploadCloud
                    className="cursor-pointer text-3xl hover:scale-105 transition-transform text-[#F9F6EE]"
                    onClick={() => handleupload()}
                  />
                ) : (
                  <MdCloudDone className="cursor-pointer text-3xl hover:scale-105 transition-transform text-[#F9F6EE]" />
                )}
              </div>
          </div>
          <div className="">
            <div className="mt-5 grid md:grid-cols-2 gap-[2vh] items-center justify-center">
              <div className="mt-5">
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full font-poppins cursor-pointer rounded-lg  bg-[#2B2B2B]  p-3 text-sm font-medium text-white hover:bg-[#383838] focus:border-2 focus:border-[#f05700] focus:outline-none md:w-full "
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
              <div className="mt-5">
                <input
                  type="text"
                  placeholder="Description"
                  className="w-full font-poppins cursor-pointer rounded-lg  bg-[#2B2B2B]  p-3 text-sm font-medium text-white hover:bg-[#383838] focus:border-2 focus:border-[#f05700] focus:outline-none md:w-full "
                  onChange={(e) => {
                    setDesc(e.target.value);
                  }}
                />
              </div>
              <div className="mt-5">
                <input
                  type="number"
                  placeholder="Price"
                  className="w-full font-poppins cursor-pointer rounded-lg  bg-[#2B2B2B]  p-3 text-sm font-medium text-white hover:bg-[#383838] focus:border-2 focus:border-[#f05700] focus:outline-none md:w-full "
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                />
              </div>
              <div className="mt-5">
                <input
                  type="text"
                  placeholder="Category"
                  className="w-full font-poppins cursor-pointer rounded-lg  bg-[#2B2B2B]  p-3 text-sm font-medium text-white hover:bg-[#383838] focus:border-2 focus:border-[#f05700] focus:outline-none md:w-full "
                  onChange={(e) => {
                    setCat(e.target.value);
                  }}
                />
              </div>
              <div className="mt-5">
                <input
                  type="text"
                  placeholder="Sub category"
                  className="w-full font-poppins cursor-pointer rounded-lg  bg-[#2B2B2B]  p-3 text-sm font-medium text-white hover:bg-[#383838] focus:border-2 focus:border-[#f05700] focus:outline-none md:w-full "
                  onChange={(e) => {
                    setSubcat(e.target.value);
                  }}
                />
              </div>
              <div className="mt-5">
                <input
                  type="text"
                  placeholder="Type"
                  className="w-full font-poppins cursor-pointer rounded-lg  bg-[#2B2B2B]  p-3 text-sm font-medium text-white hover:bg-[#383838] focus:border-2 focus:border-[#f05700] focus:outline-none md:w-full "
                  onChange={(e) => {
                    setType(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="w-full p-4 flex justify-center items-center">
              <button className="bg-[#f05700] text-[2.4vh]  p-3 rounded-lg w-[20vw] font-poppins font-bold text-white hover:bg-[#f06800] focus:outline-none" onClick={()=>handleAddtoProduct()}>
                Add to Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
