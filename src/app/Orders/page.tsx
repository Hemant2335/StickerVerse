"use client";

import React, { useEffect, useState } from "react";
import OrderCard from "../components/OrderCard";
import { toast } from "react-hot-toast";

const Orders = () => {
  const [Orderdata, setOrderdata] = useState(null);

  const handlefetchOrders = async () => {
    try {
      const response = await fetch(
        "https://theprintbackend.vercel.app/order/fetchallorders",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            auth: localStorage.getItem("token"),
          },
        }
      );
      const data = await response.json();
      console.log("I am Order", data);
      setOrderdata(data);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    handlefetchOrders();
  }, []);

  return (
    <div className="w-full h-fit p-[5vh] text-gray-800">
      <h1 className="text-xl font-bold">Your Orders</h1>
      <div className="mt-[5vh]">
        <div>
          <h1  className="text-lg font-medium">Stickers</h1>
          <div className="grid md:grid-cols-5 mt-[2vh] grid-cols-2">
            {Orderdata?.map((item) => {
              if (item?.type === "Sticker") return <OrderCard data={item} />;
            })}
          </div>
        </div>
        <div>
          <h1 className="text-lg font-medium">Posters</h1>
          <div className="grid md:grid-cols-5 mt-[2vh] grid-cols-2">
            {Orderdata?.map((item) => {
              if (item?.type === "Poster") return <OrderCard data={item} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
