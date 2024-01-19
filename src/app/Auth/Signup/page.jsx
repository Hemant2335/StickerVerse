"use client";

import React from "react";
import logo from "../../../Assets/logo.png";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { MdEmail, MdMarkEmailRead } from "react-icons/md";
import { FiShare } from "react-icons/fi";
const page = () => {
  const router = useRouter();
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Name, setName] = useState("");
  const [isEmailVerify, setisEmailVerify] = useState(false);
  const [inputcode, setinputcode] = useState(null);
  const [ispass, setispass] = useState(false);
  const [code, setcode] = useState(null);

  // Function to handle Signup

  const handleSignup = async () => {
    if (!isEmailVerify) {
      return toast.error("Please Verify Email First");
    }
    const response = await fetch(
      "https://theprintbackend.vercel.app/users/signup",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Email: Email,
          Name: Name,
          Password: Password,
        }),
      }
    );
    const data = await response.json();
    if (!data.Success) {
      return toast.error(data.Message);
    } else {
      toast.success(data.Message);
      router.push("/Auth/Login");
    }
  };

  const handleEmailVerify = async () => {
    if (!Email) {
      return toast.error("Please Enter Email");
    }

    const response = await fetch(
      "https://theprintbackend.vercel.app/users/verifyemail",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Email: Email,
        }),
      }
    );
    const data = await response.json();
    if (!data.Check) {
      return toast.error(data.Msg);
    } else {
      setispass(true);
      setcode(data.Code);
      toast.success(data.Msg);
    }
  };

  const handleEmailVerifyCode = async () => {
    if (!inputcode) {
      return toast.error("Please Enter Code");
    }
    const intcode = parseInt(inputcode);
    if(intcode !== code)
    {
      return toast.error("Code is not correct");
    }
    else
    {
      setisEmailVerify(true);
      setispass(false);
      toast.success("Email Verified Successfully");
    }
  };

  return (
    <div className="w-full h-fit flex mt-[5vh] justify-center items-center p-4">
      <div className="bg-[#080806] h-fit md:min-w-[55vh] rounded-lg">
        <div className="w-full flex items-center justify-center">
          <Image src={logo} width={150} height={150} />
        </div>
        <div className="w-full max-w-[55vh] flex flex-col gap-[2vh] mt-[2vh] p-4">
          <input
            type="text"
            name="Name"
            placeholder="Name"
            onChange={(e) => {
              setName(e.target.value);
            }}
            className="w-full font-poppins cursor-pointer rounded-lg  bg-[#2B2B2B]  p-3 text-sm font-medium text-white hover:bg-[#383838] focus:border-2 focus:border-[#f05700] focus:outline-none md:w-full "
          />
          <div className="flex justify-center gap-[2vh] items-center">
            <input
              type="email"
              name="Name"
              placeholder="Email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="w-full font-poppins cursor-pointer rounded-lg  bg-[#2B2B2B]  p-3 text-sm font-medium text-white hover:bg-[#383838] focus:border-2 focus:border-[#f05700] focus:outline-none md:w-full "
            />
            {!isEmailVerify ? (
              <MdEmail
                className="cursor-pointer text-2xl hover:scale-105 transition-transform"
                onClick={() => handleEmailVerify()}
              />
            ) : (
              <MdMarkEmailRead className="cursor-pointer text-xl hover:scale-105 transition-transform" />
            )}
          </div>
          {ispass && (
            <div className="flex justify-center gap-[2vh] items-center">
              <input
                type="Number"
                name="Name"
                placeholder="Code"
                onChange={(e) => {
                  setinputcode(e.target.value);
                }}
                className="w-full font-poppins cursor-pointer rounded-lg  bg-[#2B2B2B]  p-3 text-sm font-medium text-white hover:bg-[#383838] focus:border-2 focus:border-[#f05700] focus:outline-none md:w-full "
              />
              <FiShare className="cursor-pointer text-xl hover:scale-105 transition-transform" onClick={()=>handleEmailVerifyCode()}/>
            </div>
          )}
          <input
            type="Password"
            name="Name"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="w-full font-poppins cursor-pointer rounded-lg  bg-[#2B2B2B]  p-3 text-sm font-medium text-white hover:bg-[#383838] focus:border-2 focus:border-[#f05700] focus:outline-none md:w-full "
          />
        </div>

        <div className="w-full p-4 flex justify-center items-center">
          <button
            className="bg-[#f05700] text-sm md:text-[2.4vh]  p-3 rounded-lg w-[20vw] font-poppins font-bold text-white hover:bg-[#f06800] focus:outline-none"
            onClick={handleSignup}
          >
            Sign up
          </button>
        </div>

        <h2
          className="text-center text-sm md:text-[2.4vh] font-semibold text-gray-400 cursor-pointer hover:text-white"
          onClick={() => router.push("/Auth/Login")}
        >
          <button>Already have an Account? Login</button>
        </h2>
      </div>
    </div>
  );
};

export default page;
