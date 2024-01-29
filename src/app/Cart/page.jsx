"use client";

import React, { useEffect, useState } from "react";
import CartCard from "../components/CartCard";
import { toast } from "react-hot-toast";
import { loadingstatus } from "@/store/atom/State";
import { useRecoilState } from "recoil";
import Loading from "../components/Loading";
import { loadStripe } from '@stripe/stripe-js';
import { useRouter } from "next/navigation";

const stripePromise = loadStripe("pk_test_51N99acSGQqNXtMtKFh8WCcrV4Cu9BP9kvklGeTix8CBsYFqsCECn5z8ncs99VIHGWd3cO1LliUCAUwmicykSGdD800b26rXUfd");

const Cart = () => {
  const [Cartitems, setCartitems] = useState(null);
  const [totalprice, settotalprice] = useState(null);
  const [isLoading, setisLoading] = useRecoilState(loadingstatus);
  const router = useRouter();

  const handleaddtoOrder = async(item)=>{
    try {
      console.log("I am Orderadd running" , item);
      const res = await fetch("https://theprintbackend.vercel.app/order/addorder",{
        method : "POST",
        headers : {
          "Content-Type" : "application/json",
          auth : localStorage.getItem("token")
        },
        body : JSON.stringify({
          name : item?.name,
          price : item?.price,
          image : item?.image,
          size : item?.size,
          quantity : item?.quantity,
          type : item?.type,
          status : "Yet to be Delivered",
        })
      })
      const data = await res.json();
      console.log(data);

    } catch (error) {
       toast.error("Cannot Add to Order");
    }
  }



  const handlebuy = async () => {
    try {
      setisLoading(true);
      const response = await fetch(`https://theprintbackend.vercel.app/payment/checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth" : localStorage.getItem("token")
      },
      body: JSON.stringify({
        amount: 1000,
      }),
    });

      const json = await response.json();

      const { id } = json;
      console.log(id);
      // setOrderId(id);
      // Redirect the user to the Razorpay payment page
      const options = {
        key: 'rzp_test_dqAiGJZnvCIklf',
        amount: 100, // Payment amount in paise or cents  
        currency: 'INR',
        name: 'OEat',
        description: 'Payment for your order',
        order_id: id,
        handler: response => {
          // Handle the payment success or failure
          console.log(response);
          router.push("/Success");
        },
        prefill: {
          email: 'knrt73373@gmail.com',
        }
      };

      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.open();
      Cartitems?.map((item)=>{
        handleaddtoOrder(item);
      })
      setisLoading(false);
    } catch (error) {
      setisLoading(false);
      toast.error("Something went wrong");
      console.log(error);
    }
  };

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
      a = a + item?.price;
    });
    settotalprice(a);
  };


  useEffect(() => {
    fetchcart();
  }, []);

  useEffect(() => {
    findtotal();
  }, [Cartitems]);

  return (
    <>
      <h1 className="text-gray-800 mt-[5vh] text-xl font-extrabold">
        Shopping Cart
      </h1>
      {isLoading && <Loading />}
      <div className="md:flex pt-[2vh] px-[5vh]">
        {/* Items */}
        <div className="w-full h-fit ">
          <div className="">
            {Cartitems?.map((item) => {
              return (
                <CartCard data={item} Cart={Cartitems} setCart={setCartitems} />
              );
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
              This Tells you about total Expenses you would cost after buying
              the products present in your cart and also Never doubt our
              calculations
            </div>
          </div>
          <button
            className="px-10 py-2 bg-white mt-4 rounded-lg text-black font-semibold hover:text-[#f05700] hover:bg-Grey transition-transform active:scale-105"
            onClick={handlebuy}
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
