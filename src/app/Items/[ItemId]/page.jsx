"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { loadingstatus } from "@/store/atom/State";
import { useRecoilState } from "recoil";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const Item = () => {
  const [itemdata, setitemdata] = useState(null);
  const [Size, setSize] = useState(null);
  const { ItemId } = useParams();
  const router = useRouter();
  const Sizecomp = useRef();
  const fetchItem = async () => {
    try {
      const res = await fetch(
        `https://theprintbackend.vercel.app/products/item/${ItemId}`
      );
      const data = await res.json();
      console.log(data?.item);
      setitemdata(data?.item);
    } catch (error) {
      console.log(error);
    }
  };

  const [isLoading, setisLoading] = useRecoilState(loadingstatus);
  const handleonCart = async () => {
    try {
      if (!Size) {
        toast.error("Please Select Size");
        return;
      }

      if (!localStorage.getItem("token")) {
        router.push("/Auth/Login");
        toast.warning("Please Login First");
        return;
      }

      console.log(Size);
      setisLoading(true);
      const res = await fetch(
        "https://theprintbackend.vercel.app/products/item/addtocart",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            auth: localStorage.getItem("token"),
          },
          body: JSON.stringify({
            name: itemdata?.Name,
            price: Price,
            image: itemdata?.imageURL,
            size: Size,
          }),
        }
      );
      setisLoading(false);
      const data = await res.json();
      console.log(data);
      if (data?.Check) {
        toast.success(data?.msg);
      } else {
        toast.error(data?.msg);
      }
    } catch (error) {
      console.log(error);
      toast.error("Internal Server Error");
    }
  };

  useEffect(() => {
    fetchItem();
  }, []);

  const PosterSize = [
    { Name: "Platinum (12*18) 300 GSM", Price: 149 },
    { Name: "Classic (12*18) 180 GSM", Price: 109 },
    { Name: "Economic (12*18) 180 GSM", Price: 89 },
    { Name: "Laminated (A4) 300 GSM", Price: 79 },
    { Name: "Economic (A4) 180 GSM", Price: 59 },
    { Name: "Classic (A4) 300 GSM", Price: 29 },
  ];

  const StickerSize = [
    { Name: "2.5*2.5 CMS", Price: 20 },
    { Name: "3*3 CMS", Price: 30 },
  ];

  const [Price, setPrice] = useState(null);

  return (
    <div className="md:flex  w-full md:md-0 mt-[5vh] md:p-[5vh] min-h-[50vh] justify-between">
      <div>
        <Image
          layout="responsive"
          src={itemdata?.imageURL}
          width={400}
          height={400}
          className="rounded-xl md:max-h-[100vh] shadow-3xl"
        />
      </div>
      <div className="md:min-w-[45vw] md:mt-0 mt-[5vh] flex flex-col gap-[2vh]">
        <div>
          <h1 className=" font-bold text-gray-800 text-4xl">
            {itemdata?.Name}
          </h1>
          <p className=" text-gray-400">{itemdata?.Description}</p>
        </div>
        <div className=" flex gap-2">
          <div className="bg-[#222222] text-sm w-fit p-1 rounded-md">
            {itemdata?.type}
          </div>
          <div className="bg-[#222222] text-sm w-fit p-1 rounded-md">
            {itemdata?.Category}
          </div>
          <div className="bg-[rgb(34,34,34)] text-sm w-fit p-1 rounded-md">
            {itemdata?.Subcategory}
          </div>
        </div>
        <h2 className=" font-bold text-lg text-[#f05700]">
          Price : {Price ? `₹${Price}` : "Select Size"}
        </h2>
        {itemdata?.type === "Poster" && (
          <div className=" md:flex grid grid-cols-2 p-[2vh]  gap-2">
            {PosterSize.map((item) => (
              <div
                className="bg-[#222222] cursor-pointer hover:scale-105  transition-transform text-gray-400 font-bold text-sm md:max-w-[7vw] p-2 rounded-md"
                id={item?.Name}
                onClick={() => {
                  setSize(item?.Name);
                  setPrice(item?.Price);
                  const Name = item?.Name;
                  PosterSize.map((item) => {
                    if (item?.Name !== Name) {
                      document
                        .getElementById(item?.Name)
                        .classList.remove("border-2", "border-[#f05700]");
                    }
                  });
                  document
                    .getElementById(item?.Name)
                    .classList.add("border-2", "border-[#f05700]");
                }}
              >
                {item?.Name}
              </div>
            ))}
          </div>
        )}
        {itemdata?.type === "Sticker" && (
          <div className=" md:flex grid grid-cols-2 py-[2vh]  gap-2">
            {StickerSize.map((item) => (
              <div
                className="bg-[#222222] cursor-pointer hover:scale-105  transition-transform text-gray-400 font-bold text-sm md:max-w-[7vw] p-2 rounded-md"
                id={item?.Name}
                onClick={() => {
                  setSize(item?.Name);
                  setPrice(item?.Price);
                  const Name = item?.Name;
                  StickerSize.map((item) => {
                    if (item?.Name !== Name) {
                      document
                        .getElementById(item?.Name)
                        .classList.remove("border-2", "border-[#f05700]");
                    }
                  });
                  document
                    .getElementById(item?.Name)
                    .classList.add("border-2", "border-[#f05700]");
                }}
              >
                {item?.Name}
              </div>
            ))}
          </div>
        )}
        <button
          className="bg-[#f05700] text-sm hover:scale-105 transition-transform text-black font-poppins font-medium p-2 rounded-lg mt-5"
          onClick={handleonCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Item;
