import React, { useState } from "react";
import { FiX } from "react-icons/fi";
import toast from "react-hot-toast";

const ChangePhone = ({ setissetPhone, setMainPhone }) => {
  const [isPhone, setisPhone] = useState("");

  const handleAddtoPhone = async () => {
    if (isPhone === "") {
      toast.error("Please fill all the fields");
    } else {
      try {
        const res = await fetch(
          "https://theprintbackend.vercel.app/users/updatephone",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              auth: localStorage.getItem("token"),
            },
            body: JSON.stringify({ phone: isPhone }),
          }
        );
        const resdata = await res.json();
        if (resdata?.Check) {
          toast.success("Phone no Updated");
          setissetPhone(false);
          setMainPhone(`${isPhone}`);
        } else {
          toast.error("Something went wrong");
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <div className=" fixed flex h-[100vh] w-screen px-2 top-0 left-0 justify-center items-center  z-10 bg-[rgba(34,34,34,0.5)]">
      <div className="bg-white p-[3vh] shadow-3xl md:w-[30vw] h-fit rounded-lg">
        <div
          className=" w-fit h-fit absolute cursor-pointer text-lg text-gray-800"
          onClick={() => {
            setissetPhone(false);
          }}
        >
          <FiX />
        </div>
        -
        <div className="mt-5 w-full">
          <h1 className=" font-medium text-gray-800">Enter Your Phoneno</h1>
          <p className="text-gray-400 text-sm">
            Please try to Provide the correct Phone if there will be any isuue
            in the Phone we will contact you on this Phone
          </p>
          <div className="mt-5">
            <input
              type="text"
              placeholder="Phoneno eg: 9111XXXXXX"
              className="w-full font-poppins cursor-pointer rounded-lg  bg-gray-200  p-3 text-sm font-medium text-gray-800  focus:border-2 focus:border-[#f05700] focus:outline-none md:w-full "
              onChange={(e) => {
                setisPhone(e.target.value);
              }}
            />
          </div>

          <div className="w-full pt-4 flex justify-center items-center">
            <button
              className="bg-red-500 text-sm md:text-[2vh]  p-3 rounded-lg w-fit font-poppins font-bold text-gray-800 hover:bg-[#f06800] focus:outline-none"
              onClick={() => handleAddtoPhone()}
            >
              Add Phoneno
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePhone;
