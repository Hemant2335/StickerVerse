"use client";

import React, { useEffect, useState } from "react";
import CartCard from "../components/CartCard";

const Cart = () => {
  const [Cartitems, setCartitems] = useState(null);
  const [totalprice, settotalprice] = useState(null);

  const fetchcart = async () => {
    try {
      const res = await fetch(
        "https://theprintbackend.vercel.app/products/item/cart",
        {
          method: "GET",
          headers: {
            auth: localStorage.getItem("token"),
          },
        }
      );
      const data = await res.json();
      console.log("Running");
      console.log(data);
      setCartitems(data);
    } catch (error) {
      alert("Something went wrong");
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
  );
};

export default Cart;
