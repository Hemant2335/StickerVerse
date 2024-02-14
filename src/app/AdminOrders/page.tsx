"use client"

import React, { useEffect, useState } from "react";
import AdminOrderCard from "../components/AdminOrderCard";

interface Orderdata{
  _id: string;
  name: string;
  price: number;
  size: string;
  status: string;
  image: string;
  user: {
    Name: string;
    Email: string;
    Phone: string;
  };
  address: string;
  type : string;
}


const AdminOrder = () => {
const [Orderdata, setOrderdata] = useState<Array<Orderdata> | null>(null);


  const handlefetchOrders = async () => {
    try {
      const response = await fetch(
        "https://theprintbackend.vercel.app/order/fetchallordersadmin",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            auth: localStorage.getItem("token") || "",
          },
        }
      );
      const data = await response.json();
      setOrderdata(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handlefetchOrders();
  }, []);

  return (
    <>
    <div className="w-full h-fit p-[5vh] text-gray-800">
      <h1 className="text-xl font-bold">Your Orders</h1>
      <div className="mt-[5vh]">
        <div>
          <h1  className="text-lg font-medium">Stickers</h1>
          <div className="flex flex-col mt-[2vh]">
            {Orderdata?.map((item : Orderdata) => {
              if (item?.type === "Sticker") return <AdminOrderCard  data={item} />;
            })}
          </div>
        </div>
        <div>
          <h1 className="text-lg font-medium">Posters</h1>
          <div className="flex flex-col mt-[2vh]">
            {Orderdata?.map((item : Orderdata) => {
              if (item?.type === "Poster") return <AdminOrderCard data={item} />;
            })}
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default AdminOrder