import React from "react";
import Image from "next/image";
import { FiTrash2 } from "react-icons/fi";
import { toast } from "react-hot-toast";

const CartCard = ({ data, Cart, setCart }) => {
  const handleondelete = async () => {
    try {
      const res = await fetch(
        "https://theprintbackend.vercel.app/products/item/deleteitem",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            auth: localStorage.getItem("token"),
          },
          body: JSON.stringify({
            id: data?._id,
          }),
        }
      );

      const data1 = await res.json();
      if (data1?.Check) {
        const arr = Cart.filter((item) => item?._id !== data?._id);
        setCart(arr);
        toast.success(data1?.msg);
      } else {
        toast.error(data1?.msg);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <>
    <div className="mt-5 mb-10 flex shadow-3xl justify-between rounded-lg w-full items-center   p-4 md:max-w-[50vw]">
      <div className="flex gap-4">
        <div >
        <Image
          layout="responsive"
          src={data?.imageURL}
          width={200}
          height={200}
          className="rounded-xl md:max-h-[20vh]"
        />
        </div>
        <div className="w-full">
          <h1 className="text-lg font-semibold text-gray-600 ">{data?.Name}</h1>
          <h1 className="text-sm font-semibold text-gray-400 ">{data?.size}</h1>
        </div>
      </div>
      <div className="flex gap-4 items-center mt-5">
        <h1 className="text-lg font-semibold  text-gray-600">
          ₹ {data?.Price}
        </h1>
        <FiTrash2
          className="text-xl text-red-400 cursor-pointer"
          onClick={handleondelete}
        />
      </div>
    </div>
    
    </>
  );
};

export default CartCard;
