"use client";

import React, { useEffect, useState } from "react";
import CartCard from "../components/CartCard";
import { toast } from "react-hot-toast";
import { loadingstatus , Accountname } from "../../store/atom/State";
import { useRecoilState, useRecoilValue } from "recoil";
import Loading from "../components/Loading";
import { useRouter } from "next/navigation";
import {UserOrderinterface, Cartinterface} from "../../Utils/Interfaces";


const Cart = () => {
  const [Cartitems, setCartitems] = useState<Cartinterface[]>([]);
  const [totalprice, settotalprice] = useState<number | null>(null);
  const [isLoading, setisLoading] = useRecoilState(loadingstatus);
  const router = useRouter();
  const ClientName = useRecoilValue(Accountname);
  const [ClientEmail, setClientEmail] = useState("");
  const [ClientAddress, setClientAddress] = useState("");
  const [ClientPhone, setClientPhone] = useState("")

  const handleClientDetails = async () => {
    try {
      const res = await fetch(
        "https://theprintbackend.vercel.app/users/getuser",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token") || "",
          },
        }
      );
      const data = await res.json();
      setClientAddress(data?.User?.Address);
      setClientEmail(data?.User?.Email);
      setClientPhone(data?.User?.Phone);
    } catch (error) {
      toast.error("Cannot Fetch Client Details");
    }
  };

  // Function to Notif the Admin
  const handlenotifyAdmin = () =>{
    try {
      fetch("https://theprintbackend.vercel.app/users/adminnotify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token") || "",
        },
        body: JSON.stringify({
          name: ClientName,
          email: ClientEmail,
        }),
      });
    } catch (error) {
      console.log(error);
    }
  }


  // Function to Generate the Reciept

  const handleaddtoOrder = async (item:UserOrderinterface) => {
    try {
      console.log("I am Orderadd running", item);
      const res = await fetch(
        "https://theprintbackend.vercel.app/order/addorder",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token") || " ",
          },
          body: JSON.stringify({
            name: item?.name,
            price: item?.price,
            image: item?.image,
            size: item?.size,
            quantity: item?.quantity,
            type: item?.type,
            status: "Yet to be Delivered",
            address: ClientAddress,
          }),
        }
      );
      const data = await res.json();
      handlenotifyAdmin();
      console.log(data);
    } catch (error) {
      toast.error("Cannot Add to Order");
    }
  };

  const handlebuy = async () => {
    if(!ClientAddress || !ClientEmail || !ClientPhone)
    {
      toast.error("Please Add your Address, Email and Phone in your Profile");
      return;
    }
    const itemdata = Cartitems?.map((item:Cartinterface) => {
      return {
        name: item?.name,
        description: item?.description,
        amount: (item?.price/item?.quantity)*100,
        currency: "INR",
        quantity: item?.quantity,
      };
    });

    try {
      setisLoading(true);
      console.log(itemdata);
      const response = await fetch(`https://theprintbackend.vercel.app/payment/invoice`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token") || " ",
        },
        body: JSON.stringify({
          items: itemdata,
          email: ClientEmail,
          name: ClientName,
          address: ClientAddress,
          phone : ClientPhone,
        }),
      });

      const json = await response.json();

      const { id, order_id, amount_due } = json;
      console.log(id);
      // setOrderId(id);
      // Redirect the user to the Razorpay payment page
      const options = {
        key: "rzp_test_EKXHvUpruWk99x",
        amount: amount_due, // Payment amount in paise or cents
        currency: "INR",
        name: "OEat",
        description: "Payment for your order",
        order_id: order_id,
        handler: (response:Response) => {
          // Handle the payment success or failure
          if(response)
          {
            toast.success("Payment Successful");
            router.push("/Success");
            Cartitems?.map((item) => {
              handleaddtoOrder(item);
            });
          }
          else{
            toast.error("Payment Failed");
          }
          
        },
        prefill: {
          email: "knrt73373@gmail.com",
        },
      };

      const razorpayInstance = new (window as any).Razorpay(options); // from github copilot
      razorpayInstance.open();
      
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
            Authorization: localStorage.getItem("token") || " ",
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
    handleClientDetails();
  }, []);

  useEffect(() => {
    findtotal();
    console.log(Cartitems);
  }, [Cartitems]);

  return (
    <>
      <h1 className=" mt-[5vh] text-xl font-extrabold">
        Shopping Cart
      </h1>
      {isLoading && <Loading />}
      <div className="md:flex pt-[2vh] px-[5vh]">
        {/* Items */}
        <div className="w-full h-fit ">
          <div className="">
            {Cartitems && Cartitems?.map((item) => {
              return (
                <CartCard data={item} Cart={Cartitems} setCart={setCartitems} />
              );
            })}
          </div>
        </div>

        <div className=" flex flex-col gap-[2vh]">
          <div className="bg-red-500  md:h-[200px] md:max-w-[25vw] py-2 w-auto h-fit  rounded-md p-4">
            <h3 className="text-start font-medium mb-2">Shipping Address</h3>
            <hr />
            <div className="text-start mt-2 ">
              <h4>{ClientName}</h4>
              <h4>{ClientEmail}</h4>
              <h4>{ClientPhone}</h4>
              <h4>
                {ClientAddress
                  ? `${ClientAddress}`
                  : `Please Add your Address in your Profile`}
              </h4>
            </div>
          </div>
          <p className="text-gray-400 text-sm">
            Not Your Address ? You can Change or Add the Address in your profile
          </p>
          <div className="bg-red-500  md:h-[200px] md:w-[350px] w-auto h-[250px]  rounded-md p-4">
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
            className="px-10 py-3 mb-[2vh] bg-black w-full mt-2 rounded-md text-white font-semibold hover:text-[#f05700] hover:bg-Grey transition-transform active:scale-105"
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
