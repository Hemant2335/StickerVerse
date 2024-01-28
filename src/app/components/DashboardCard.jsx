"use client";
import { MoreCard } from ".";
import useFetch from "../hooks/useFetch";
import ItemCard from "./ItemCard";

const DashboardCard = ({ Name }) => {
  const ProductData = useFetch(Name);
  return (
    <div className="mt-[5vh] w-full">
      <h2 className="font-bold mb-5 text-[4vh] text-gray-800 text-left text-lg md:text-[5vh]">
        {Name}
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
        {ProductData?.slice(0, 10).map((item) => {
          return <ItemCard data={item} />;
        })}  
      </div>
      <div className=" w-full flex justify-center">
          <MoreCard />
        </div>
    </div>
  );
};

export default DashboardCard;
