"use client";

import React from "react";
import profile from "../../Assets/logo.png";
import { FiUploadCloud } from "react-icons/fi";
import { MdCloudDone } from "react-icons/md";
import { useState } from "react";
import Loading from "../components/Loading";
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

  // Function to handle image upload

  const handleupload = async () => {
    if (!isselected) {
      alert("Please select an image first");
      return;
    }

    try {
      console.log(isselected);
      setisLoading(true);
      const formData = new FormData();
      formData.append("image", isselected);
      console.log(formData);
      const response = await fetch(`https://theprintbackend.vercel.app/dashboard/upload`, {
        method: "POST",
        headers: {
          auth: localStorage.getItem("token"),
        },
        body: formData,
      });
      const data = await response.json();
      console.log(data);

      if (data?.Check) {
        setisuploaded(true);
        alert("Image uploaded successfully");
        setimgurl(data?.imageUrl);
        console.log(data?.imageUrl);
        setisLoading(false);
      } else {
        alert("Some error occured");
        console.log(response.statusText);
        setisLoading(false);
      }
    } catch (error) {}
  };

  const handleAddtoProduct = async () => {
    try {
      setisLoading(true);
      const res = await fetch(
        "https://theprintbackend.vercel.app/dashboard/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            auth: localStorage.getItem("token"),
          },
          body: JSON.stringify({
            name: Name,
            description: Desc,
            price: Price,
            category: Cat,
            subcategory: Subcat,
            type: Type,
            image: imgurl,
          }),
        }
      );

      const data = await res.json();
      setisLoading(false);
      if (data?.Check) {
        alert("Product added successfully");
        console.log(data);
        setisLoading(false);
        setisuploaded(false);
        setisselected(null);
        setimgurl("");
        setCat("");
        setPrice("");
        setDesc("");
        setSubcat("");
        setType("");
        setName("");
      } else {
        alert("Some error occured");
      }
    } catch (error) {
      console.log(error);
      alert("Some error occured");
    }
  };

  return (
    <div>
      {isLoading && <Loading/>}
      <div className="flex justify-center my-[10vh] md:mx-0 mx-[5vw] md:p-[5vh]">
        <div className="h-fit w-[50vw] shadow-3xl bg-[#080806] gap-[10vh] justify-center items-center p-[5vh]">
          <div className=" shadow-3xl items-center flex flex-col w-full justify-center  p-4 rounded-lg">
            {imgurl ? (
              <Image src={imgurl} height={150} width={150} alt="Image" />
            ) : (
              <Image src={profile} height={150} alt="Image" />
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
                  placeholder="Name eg: Iron Man Avergers Endgame"
                  className="w-full font-poppins cursor-pointer rounded-lg  bg-[#2B2B2B]  p-3 text-sm font-medium text-white hover:bg-[#383838] focus:border-2 focus:border-[#f05700] focus:outline-none md:w-full "
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
              <div className="mt-5">
                <input
                  type="text"
                  placeholder="Description eg: SuperHero from Avengers Endgame"
                  className="w-full font-poppins cursor-pointer rounded-lg  bg-[#2B2B2B]  p-3 text-sm font-medium text-white hover:bg-[#383838] focus:border-2 focus:border-[#f05700] focus:outline-none md:w-full "
                  onChange={(e) => {
                    setDesc(e.target.value);
                  }}
                />
              </div>
              <div className="mt-5">
                <input
                  type="number"
                  placeholder="Price eg : $10"
                  className="w-full font-poppins cursor-pointer rounded-lg  bg-[#2B2B2B]  p-3 text-sm font-medium text-white hover:bg-[#383838] focus:border-2 focus:border-[#f05700] focus:outline-none md:w-full "
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                />
              </div>
              <div className="mt-5">
                <input
                  type="text"
                  placeholder="Category eg: Marvel"
                  className="w-full font-poppins cursor-pointer rounded-lg  bg-[#2B2B2B]  p-3 text-sm font-medium text-white hover:bg-[#383838] focus:border-2 focus:border-[#f05700] focus:outline-none md:w-full "
                  onChange={(e) => {
                    setCat(e.target.value);
                  }}
                />
              </div>
              <div className="mt-5">
                <input
                  type="text"
                  placeholder="Sub category eg: Iron-Man"
                  className="w-full font-poppins cursor-pointer rounded-lg  bg-[#2B2B2B]  p-3 text-sm font-medium text-white hover:bg-[#383838] focus:border-2 focus:border-[#f05700] focus:outline-none md:w-full "
                  onChange={(e) => {
                    setSubcat(e.target.value);
                  }}
                />
              </div>
              <div className="mt-5">
                <input
                  type="text"
                  placeholder="Type eg: Sticker"
                  className="w-full font-poppins cursor-pointer rounded-lg  bg-[#2B2B2B]  p-3 text-sm font-medium text-white hover:bg-[#383838] focus:border-2 focus:border-[#f05700] focus:outline-none md:w-full "
                  onChange={(e) => {
                    setType(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="w-full p-4 flex justify-center items-center">
              <button
                className="bg-[#f05700] text-[2.4vh]  p-3 rounded-lg w-[20vw] font-poppins font-bold text-white hover:bg-[#f06800] focus:outline-none"
                onClick={() => handleAddtoProduct()}
              >
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
