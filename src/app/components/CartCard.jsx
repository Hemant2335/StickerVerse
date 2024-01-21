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
    <div className="mt-5 mb-10 rounded-lg  w-full md:w-fit bg-[#080806] p-4 md:min-w-[10vw]">
      <div className=" min-w-[20vh] md:min-w-[10vw] md:max-w-[20vw]">
        <Image
          layout="responsive"
          src={data?.imageURL}
          width={200}
          height={200}
          className="rounded-xl md:max-h-[28vh]"
        />
        <div className=" flex  items-center justify-between px-2 shadow-3xl  rounded-md">
          <div>
            <h1 className="text-sm text-[#F9F6EE] font-poppins font-medium mt-5 ">
              {data?.Name}
            </h1>
            <div className="flex">
              <h2 className="text-sm text-gray-400 font-poppins font-medium ">
                Price : {data?.Price}
              </h2>
            </div>
            <h2 className="text-sm text-gray-400 font-poppins font-medium ">
              Size : {data?.size}
            </h2>
          </div>
          <button
            className="bg-[#f05700] ml-[2vw] text-sm hover:scale-105 transition-transform text-black font-poppins font-medium p-2 rounded-lg mt-5"
            onClick={handleondelete}
          >
            <FiTrash2 />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
