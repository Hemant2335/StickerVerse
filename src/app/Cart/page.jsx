"use client";

import React, { useEffect, useState } from "react";
import CartCard from "../components/CartCard";
import { toast } from 'react-hot-toast';
import { loadingstatus } from "@/store/atom/State";
import { useRecoilState } from "recoil";
import Loading from "../components/Loading";

const Cart = () => {
  const [Cartitems, setCartitems] = useState(null);
  const [totalprice, settotalprice] = useState(null);
  const [isLoading, setisLoading] = useRecoilState(loadingstatus);

  const fetchcart = async () => {
    try {
      setisLoading(true);
      const res = await fetch(
        "https://theprintbackend.vercel.app/products/item/cart",
        {
          method: "GET",
          headers: {
            auth: localStorage.getItem("token"),
          },
        }
      );
      setisLoading(false);
      const data = await res.json();
      setCartitems(data);
    } catch (error) {
      toast.error("Cannot Fetch Cart Items");
    }
  };

  const findtotal = () => {
    let a = 0;
    Cartitems?.map((item) => {
      a = a + item?.Price;
    });
    settotalprice(a);
  }

  const handlepayment = async () => {
    console.log("payment")
  }

  useEffect(() => {
    fetchcart();
  }, []);

  useEffect(() => {
    findtotal();
  }, [Cartitems]);

  return (
    <>
    {isLoading && <Loading/>}
    <div className="md:flex p-[5vh]">
      {/* Items */}
      <div className="w-full h-fit ">
        <div className="grid grid-cols-1 md:grid-cols-3">
          {Cartitems?.map((item) => {
            return <CartCard data={item} Cart = {Cartitems}  setCart = {setCartitems}/>;
          })}
        </div>
      </div>

      <div className="">
        <h2 className="font-medium text-xl mb-8">Summary</h2>
        <div className="bg-[#f05700] md:h-[200px] md:w-[350px] w-auto h-[250px]  rounded-md p-4">
          <h3 className="text-start font-medium mb-2">
            SubTotal : ₹ {totalprice}
          </h3>
          <hr />
          <div className="text-start mt-2">
            This Tells you about total Expenses you would cost after buying the
            products present in your cart and also Never doubt our calculations
          </div>
        </div>
        <button
          className="px-10 py-2 bg-white mt-4 rounded-lg text-black font-semibold hover:text-[#f05700] hover:bg-Grey transition-transform active:scale-105"
          onClick={handlepayment}
        >
          Check Out
        </button>
      </div>

      {/* Total */}
    </div>
    </>
  );
};

export default Cart;
