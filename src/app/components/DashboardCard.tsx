"use client";
import MoreCard from "./MoreCard";
import useFetch from "../hooks/useFetch";
import ItemCard from "./ItemCard";

interface productdata {
  _id: string;
  name: string;
  image: string;
  price: number;
  size: string;
  quantity: number;
}


const DashboardCard = ( Name : string ) => {
  const ProductData : Array<productdata> = useFetch(Name);
  return (
    <div className="mt-[5vh] w-full">
      <h2 className="font-bold mb-5 text-[4vh] text-gray-800 text-left text-lg md:text-[5vh]">
        {Name}
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
        {ProductData?.slice(0, 10).map((item) => {
          return <ItemCard data={item} key={item?._id}/>;
        })}  
      </div>
      <div className=" w-full flex justify-center">
          <MoreCard Name={Name}/>
        </div>
    </div>
  );
};

export default DashboardCard;
