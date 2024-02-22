"use client";

import React, { useEffect, useState } from "react";
import { loadingstatus } from "../../../store/atom/State";
import {} from "StickerVerseUI"; 
import { ItemCard } from "../../components";
import { useRecoilValue } from "recoil";
import toast from "react-hot-toast";
import {Filter} from "@repo/ui";
import { useParams } from "next/navigation";
import {Productinterface} from "../../../../../packages/Utils/Interfaces";

const Explore = () => {
  const {type} = useParams();
  const [data, setdata] = useState<Productinterface[] | null>(null);
  const isLoading = useRecoilValue(loadingstatus);
  const [Categorydata, setCategorydata] = useState(null);

  const [Category, setCategory] = useState("");
  const [Subcategory, setSubcategory] = useState<string | "">("");
  const [Type, setType] = useState<string>(type as string);

  const handleUrl = async () => {
    try {
      console.log(Category, Subcategory, Type);
      const res = await fetch(
        `https://theprintbackend.vercel.app/products/all/filter?type=${Type}&&category=${Category}&&subcategory=${Subcategory}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();
      console.log("I am filter", data);
      setdata(data?.data);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

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
    handleUrl();
  }, [Category, Subcategory, Type]);

  return (
    <>
      {isLoading && <Loading />}
      <div className="md:flex gap-[2vw] ">
        {/* headers */}
        <div className="shadow-xl rounded-lg h-fit p-5 min-w-[15vw]">
          <Filter
            Subcategory={Subcategory}
            Type={Type}
            setSubcategory={setSubcategory}
            Category={Category}
            setCategory={setCategory}
            Categorydata={Categorydata}
            setType={setType}
          />
        </div>
        <div className="w-full h-fit mt-[5vh]">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          {data?.map((item : Productinterface) => {
            return <ItemCard data={item} key={item?.id}/>;
          })}
        </div>
      </div>
      </div>
      {/* Shopping Items */}
      
    </>
  );
};

export default Explore;
