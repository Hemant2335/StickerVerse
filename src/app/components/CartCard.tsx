import React from "react";
import Image from "next/image";
import { FiTrash2 } from "react-icons/fi";
import { toast } from "react-hot-toast";
import {Cartinterface} from "../../Utils/Interfaces"


interface CartCardProps {
  data: {
    _id: string;
    name: string;
    image: string;
    price: number;
    size: string;
    quantity: number;
  };
  Cart: Array<Cartinterface> | null;
  setCart: React.Dispatch<React.SetStateAction<Array<Cartinterface> | undefined>>;
}



const CartCard = ({data, Cart, setCart}:CartCardProps ) => {
  const handleondelete = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        "https://theprintbackend.vercel.app/products/item/deleteitem",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? token : "",
          },
          body: JSON.stringify({
            id: data?._id,
          }),
        }
      );

      const data1 = await res.json();
      if (data1?.Check) {
        const arr = Cart?.filter((item) => item?._id !== data?._id);
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
    <div className="mt-5 mb-10 md:flex shadow-3xl justify-between rounded-lg w-full items-center   p-4 md:max-w-[50vw]">
      <div className="md:flex gap-4">
        <div >
        <Image
          layout="responsive"
          src={data?.image}
          width={200}
          height={200}
          className="rounded-xl md:max-h-[20vh]"
          alt="Image"
        />
        </div>
        <div className="w-full md:mt-0 mt-[2vh] flex flex-col justify-center">
          <h1 className="text-lg font-semibold text-gray-600 ">{data?.name}</h1>
          <h1 className="text-sm font-semibold text-gray-400 ">{data?.size}</h1>
          <h1 className="text-sm font-semibold text-gray-400 ">Quantity : {data?.quantity}</h1>
        </div>
      </div>
      <div className="flex gap-4 items-center mt-[2vh] md:mt-5">
        <h1 className="text-lg font-semibold  text-gray-600">
          ₹ {data?.price}
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
