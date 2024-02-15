"use client";

import React, { useEffect } from "react";
import { FiUploadCloud } from "react-icons/fi";
import { MdCloudDone } from "react-icons/md";
import { useState } from "react";
import Loading from "../components/Loading";
import Image from "next/image";
import toast from "react-hot-toast";
import { FiChevronDown } from "react-icons/fi";
import {Categoryinterface , SubCategoryinterface} from "../../Utils/Interfaces"

const page = () => {
  const [isuploaded, setisuploaded] = useState(false);
  const [isselected, setisselected] = useState<File | null>(null);
  const [isLoading, setisLoading] = useState(false);
  const [imgurl, setimgurl] = useState("");
  const [Cat, setCat] = useState("");
  const [Price, setPrice] = useState("");
  const [Desc, setDesc] = useState("");
  const [Subcat, setSubcat] = useState<string | undefined>("");
  const [Name, setName] = useState("");
  const [Type, setType] = useState("");
  const [Categorydata, setCategorydata] = useState<Array<Categoryinterface> | null>(null);
  const [SubCategorydata, setSubCategorydata] = useState<Array<SubCategoryinterface> | null>(null);
  const [isCatdropdown, setisCatdropdown] = useState(false);
  const [isSubcatdropdown, setisSubcatdropdown] = useState(false);
  const [isTypedropdown, setisTypedropdown] = useState(false);

  const Typedropdown = ["Sticker", "Poster", "Special"];


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
    handleCategory();
  }, []);

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
      const response = await fetch(
        `https://theprintbackend.vercel.app/dashboard/upload`,
        {
          method: "POST",
          headers: {
            Authorization: localStorage.getItem("token") || "",
          },
          body: formData,
        }
      );
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
      if (!Name || !Desc || !Price || !Cat || !Subcat || !Type || !imgurl) {
        return toast.error("Please fill all the fields");
      }
      setisLoading(true);
      const res = await fetch(
        "https://theprintbackend.vercel.app/dashboard/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token") || "",
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
        console.log(data);
        setisLoading(false);
        setisuploaded(false);
        setisselected(null);
        toast.success("Product added successfully");
      } else {
        console.log(data);
        setisLoading(false);
        setisuploaded(false);
        setisselected(null);
        toast.error("Error in uploading");
      }
    } catch (error) {
      console.log(error);
      toast.error("Internal Server Error");
    }
  };

  return (
    <div>
      {isLoading && <Loading />}
      <div className="flex justify-center my-[10vh] md:mx-0  md:p-[5vh]">
        <div className="h-fit md:w-[50vw] shadow-3xl  gap-[10vh] justify-center items-center p-[5vh]">
          <div className=" shadow-3xl items-center flex flex-col w-full justify-center  p-4 rounded-lg">
            {imgurl ? (
              <Image src={imgurl} height={150} width={150} alt="Image" />
            ) : (
              <Image src={require("../../Assets/Logo.png")} height={150} alt="Image" />
            )}
            <div className="flex items-center gap-4">
              <input
                type="file"
                accept="image/*"
                name="image"
                className="w-full font-poppins cursor-pointer rounded-lg  bg-gray-200  p-3 text-sm font-medium text-gray-800  focus:border-2 focus:border-[#f05700] focus:outline-none md:w-full "
                onChange={(e) => {
                  if (e.target.files == null) {
                    return;
                  } else {
                    if (e.target?.files.length > 0) {
                      setisselected(e.target.files[0]);
                    } else {
                      setisselected(null);
                    }
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
                  className="w-full font-poppins cursor-pointer rounded-lg  bg-gray-200  p-3 text-sm font-medium text-gray-800  focus:border-2 focus:border-[#f05700] focus:outline-none md:w-full "
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
              <div className="mt-5">
                <input
                  type="text"
                  placeholder="Description eg: SuperHero from Avengers Endgame"
                  className="w-full font-poppins cursor-pointer rounded-lg  bg-gray-200  p-3 text-sm font-medium text-gray-800  focus:border-2 focus:border-[#f05700] focus:outline-none md:w-full "
                  onChange={(e) => {
                    setDesc(e.target.value);
                  }}
                />
              </div>
              <div className="mt-5">
                <input
                  type="number"
                  placeholder="Price eg : $10"
                  className="w-full font-poppins cursor-pointer rounded-lg  bg-gray-200  p-3 text-sm font-medium text-gray-800  focus:border-2 focus:border-[#f05700] focus:outline-none md:w-full "
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                />
              </div>
              <div className="mt-[2vh]">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Category eg: Marvel"
                    className="w-full font-poppins cursor-pointer rounded-lg  bg-gray-200  p-3 text-sm font-medium text-gray-800  focus:border-2 focus:border-[#f05700] focus:outline-none md:w-full "
                    onChange={(e) => {
                      setCat(e.target.value);
                    }}
                    value={Cat}
                  />
                  <h1
                    className="text-gray-800 font-bold shadow-3xl w-fit p-2 cursor-pointer rounded-lg flex items-center"
                    onClick={() => {
                      setisCatdropdown(!isCatdropdown);
                    }}
                  >
                    {" "}
                    <FiChevronDown />
                  </h1>
                </div>

                {isCatdropdown && (
                  <div className="mt-[2vh] z-50 overflow-y-auto h-[20vh] shadow-3xl absolute bg-white rounded-lg">
                    {Categorydata?.map((item : Categoryinterface) => {
                      return (
                        <div
                          className=" p-2 cursor-pointer hover:bg-red-400 rounded-md flex items-center"
                          onClick={() => {
                            setCat(item?.Name);
                            setisCatdropdown(false);
                            setSubcat(undefined);
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
              <div className="mt-5">
                {
                  <div className="mt-[2vh]">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Sub category eg: Iron-Man"
                        className="w-full font-poppins cursor-pointer rounded-lg  bg-gray-200  p-3 text-sm font-medium text-gray-800  focus:border-2 focus:border-[#f05700] focus:outline-none md:w-full "
                        onChange={(e) => {
                          setSubcat(e.target.value);
                        }}
                        value={Subcat}
                      />
                      <h1
                        className="text-gray-800 font-bold shadow-3xl w-fit p-2 cursor-pointer rounded-lg flex items-center"
                        onClick={() => {
                          setisSubcatdropdown(!isSubcatdropdown);
                        }}
                      >
                        <FiChevronDown />
                      </h1>
                    </div>

                    {isSubcatdropdown && (
                      <div className="mt-[2vh] z-50 overflow-y-auto h-[20vh] shadow-3xl absolute bg-white rounded-lg">
                        <div className=" p-2 cursor-pointer hover:bg-red-400 rounded-md flex items-center">
                          <h1 className="text-gray-800 font-bold">
                            Select SubCategory
                          </h1>
                        </div>
                        {SubCategorydata?.map((item) => {
                          return (
                            <div
                              className=" p-2 cursor-pointer hover:bg-red-400 rounded-md flex items-center"
                              onClick={() => {
                                setSubcat(item?.Name);
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
                }
              </div>
              <div className="mt-5 flex gap-2">
                <input
                  type="text"
                  placeholder="Type eg: Sticker"
                  className="w-full font-poppins cursor-pointer rounded-lg  bg-gray-200  p-3 text-sm font-medium text-gray-800  focus:border-2 focus:border-[#f05700] focus:outline-none md:w-full "
                  onChange={(e) => {
                    setType(e.target.value);
                  }}
                  value={Type}
                />
                <h1
                  className="text-gray-800 font-bold shadow-3xl w-fit p-2 cursor-pointer rounded-lg flex items-center"
                  onClick={() => {
                    setisTypedropdown(!isTypedropdown);
                  }}
                >
                  {" "}
                  <FiChevronDown />
                </h1>
                {isTypedropdown && (
                  <div className="mt-[2vh] z-50 overflow-y-auto h-[20vh] shadow-3xl absolute bg-white rounded-lg">
                    {Typedropdown?.map((item) => {
                      return (
                        <div
                          className=" p-2 cursor-pointer hover:bg-red-400 rounded-md flex items-center"
                          onClick={() => {
                            setType(item);
                            setisTypedropdown(false);
                          }}
                        >
                          <h1 className="text-gray-800 font-bold">{item}</h1>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
            <div className="w-full p-4 flex justify-center items-center">
              <button
                className="bg-[#f05700] text-sm md:text-[2.4vh]  p-3 rounded-lg w-[20vw] font-poppins font-bold text-gray-800 hover:bg-[#f06800] focus:outline-none"
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
