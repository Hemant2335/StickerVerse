"use client";
import MoreCard from "./MoreCard";
import useFetch from "../hooks/useFetch";
import ItemCard from "./ItemCard";
import {Productinterface} from "../../Utils/Interfaces"
import { useRecoilValue } from "recoil";
import { loadingstatus } from "../../store/atom/State";
import { Skeleton } from "@mui/material";


interface DashboardCardProps {
  Name: string;
}


const DashboardCard = ( {Name } : DashboardCardProps ) => {
  const ProductData : Array<Productinterface> = useFetch(Name);
  const isLoading = useRecoilValue(loadingstatus);
  const Skeletond : Array<number> = Array(5).fill(0);
  return (
    <>
    <div className="mt-[5vh] w-full">
      <h2 className="font-bold mb-5 text-[4vh]  text-left text-lg md:text-[5vh]">
        {Name}
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
        {isLoading &&  Skeletond.map(()=> {return <div className="flex flex-col gap-4 w-52">
  <div className="skeleton h-32 w-full"></div>
  <div className="skeleton h-4 w-28"></div>
  <div className="skeleton h-4 w-full"></div>
  <div className="skeleton h-4 w-full"></div>
</div>})}
        {ProductData?.slice(0, 10).map((item) => {
          return <ItemCard data={item} key={item?.id}/>;
        })}  
      </div>
      <div className=" w-full flex justify-center">
          <MoreCard Name={Name}/>
        </div>
    </div>
    </>
  );
};

export default DashboardCard;
