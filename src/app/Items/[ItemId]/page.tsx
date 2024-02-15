"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { loadingstatus } from "../../../store/atom/State";
import { useRecoilState } from "recoil";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { ItemCard } from "../../components";

const Item = () => {
  const [itemdata, setitemdata] = useState(null);
  const [Similardata, setSimilardata] = useState(null);
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
      handleUrl();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUrl = async () => {
    try { 
      if(!itemdata?.type || !itemdata?.Category){
        return;
      }
      console.log(itemdata?.type, itemdata?.Category);
      const res = await fetch(
        `https://theprintbackend.vercel.app/products/all/filter?type=${itemdata?.type}&&category=${itemdata?.Category}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();
      console.log("I am item", data);
      setSimilardata(data?.data);
    } catch (error) {
      toast.error("Something went wrong");
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
            price: Price*Quantity,
            image: itemdata?.imageURL,
            size: Size,
            quantity: Quantity,
            type: itemdata?.type,
            
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

  useEffect(() => {
    handleUrl();
  }, [itemdata]);

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
  const [Quantity, setQuantity] = useState(1);

  return (
    <>
      <div className="md:flex  w-full md:md-0 mt-[5vh] md:px-[10vh] md:py-[5vh] min-h-[50vh] justify-between">
        <div>
          <Image
            layout="responsive"
            src={itemdata?.imageURL}
            width={400}
            height={400}
            className="rounded-xl md:max-h-[80vh] shadow-3xl"
          />
        </div>
        <div className="md:min-w-[45vw] md:max-w-[45vw] md:mt-0 mt-[5vh] flex flex-col gap-[2vh]">
          <div>
            <h1 className=" font-bold text-gray-800 text-4xl">
              {itemdata?.Name}
            </h1>
            <h2 className=" font-bold mt-[1vh] text-2xl text-red-500">
              {Price ? `₹${Price}` : "Select Size to get Price"}
            </h2>
            <p className=" text-gray-400">{itemdata?.Description}</p>
          </div>
          <h1 className="text-gray-800 font-medium">Tags</h1>
          <div className=" flex gap-2">
            <div className="border-2 text-gray-800 text-sm w-fit p-2 rounded-md">
              {itemdata?.type}
            </div>
            <div className="border-2 text-gray-800 text-sm w-fit p-2 rounded-md">
              {itemdata?.Category}
            </div>
            <div className="border-2 text-gray-800 text-sm w-fit p-2 rounded-md">
              {itemdata?.Subcategory}
            </div>
          </div>
          <h1 className="text-gray-800 font-medium">Quantity</h1>
          <div className="flex gap-2 text-gray-800 font-medium">
            <button
              onClick={() => {
                if (Quantity <= 1) {
                  return;
                } else {
                  let it = Quantity - 1;
                  setQuantity(it);
                }
              }}
            >
              -
            </button>
            <div className="w-[5vh] h-[5vh] rounded-[50%] border-2 flex items-center justify-center">
              {Quantity}
            </div>
            <button
              onClick={() => {
                if (Quantity >= 20) {
                  return;
                } else {
                  let it = Quantity + 1;
                  setQuantity(it);
                }
              }}
            >
              +
            </button>
          </div>

          <h1 className="text-gray-800 font-medium">Size</h1>
          {itemdata?.type === "Poster" && (
            <div className=" md:flex grid grid-cols-2 pr-[2vh]   gap-2">
              {PosterSize.map((item) => (
                <div
                  className="border-2  text-gray-800 cursor-pointer hover:scale-105  transition-transform   text-sm md:max-w-[7vw] p-2 rounded-md"
                  id={item?.Name}
                  onClick={() => {
                    setSize(item?.Name);
                    setPrice(item?.Price);
                    const Name = item?.Name;
                    PosterSize.map((item) => {
                      if (item?.Name !== Name) {
                        document
                          .getElementById(item?.Name)
                          .classList.remove("border-2", "border-red-400");
                      }
                    });
                    document
                      .getElementById(item?.Name)
                      .classList.add("border-2", "border-red-400");
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
                  className="border-2  text-gray-800 cursor-pointer hover:scale-105  transition-transform  font-bold text-sm md:max-w-[10vw] p-2 rounded-md"
                  id={item?.Name}
                  onClick={() => {
                    setSize(item?.Name);
                    setPrice(item?.Price);
                    const Name = item?.Name;
                    StickerSize.map((item) => {
                      if (item?.Name !== Name) {
                        document
                          .getElementById(item?.Name)
                          .classList.remove("border-2", "border-red-500");
                      }
                    });
                    document
                      .getElementById(item?.Name)
                      .classList.add("border-2", "border-red-500");
                  }}
                >
                  {item?.Name}
                </div>
              ))}
            </div>
          )}
          <button
            className="bg-red-500 w-fit text-sm hover:scale-105 transition-transform text-black font-poppins font-medium p-[2vh] rounded-md mt-5"
            onClick={handleonCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
      {/* Similar Items */}

      <div className="mt-[5vh] w-full text-gray-800">
        <h1 className="text-xl font-bold">You may also like</h1>
        <div className="grid grid-cols-2 mt-[5vh] md:grid-cols-5 gap-2">
          {Similardata?.map((item) => {
            return <ItemCard data={item} />;
          })}
        </div>
      </div>
    </>
  );
};

export default Item;
