"use client";

import React from "react";
import logo from "../../../Assets/Logo.png";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { MdEmail, MdMarkEmailRead } from "react-icons/md";
import { FiShare } from "react-icons/fi";
import { loadingstatus } from "@/store/atom/State";
import { useRecoilState } from "recoil";
import Loading from "@/app/components/Loading";
const page = () => {
  const router = useRouter();
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Name, setName] = useState("");
  const [isEmailVerify, setisEmailVerify] = useState(false);
  const [inputcode, setinputcode] = useState(null);
  const [ispass, setispass] = useState(false);
  const [code, setcode] = useState(null);
  const [isLoading, setisLoading] = useRecoilState(loadingstatus);
  const [buttonValue, setbuttonValue] = useState("Verify Email")

  // Function to handle Signup

  const handleSignup = async () => {
    if (!isEmailVerify) {
      if(!ispass)
      {
        handleEmailVerify();
      }
      else
      {
        handleEmailVerifyCode();
      }
    } else {
      setisLoading(true);
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
      setisLoading(false);
      const data = await response.json();
      if (!data.Success) {
        return toast.error(data.Message);
      } else {
        toast.success(data.Message);
        router.push("/Auth/Login");
      }
    }
  };


  const handleEmailVerify = async () => {
    if (!Email) {
      return toast.error("Please Enter Email");
    }
    setisLoading(true);
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
    setisLoading(false);
    const data = await response.json();
    if (!data.Check) {
      return toast.error(data.Msg);
    } else {
      setbuttonValue("Verify Code")
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
    if (intcode !== code) {
      return toast.error("Code is not correct");
    } else {
      setisEmailVerify(true);
      setispass(false);
      setbuttonValue("Sign up")
      toast.success("Email Verified Successfully");
    }
  };

  return (
    <>
      {isLoading && <Loading />}
      <div className="w-full h-fit flex mt-[5vh] justify-center items-center p-4">
        <div className="shadow-3xl h-fit md:min-w-[55vh] rounded-lg">
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
              className="w-full font-poppins cursor-pointer rounded-lg  bg-gray-200  p-3 text-sm font-medium text-gray-800  focus:border-2 focus:border-red-400 focus:outline-none md:w-full"
            />
            <div className="flex justify-center gap-[2vh] items-center">
              <input
                type="email"
                name="Name"
                placeholder="Email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="w-full font-poppins cursor-pointer rounded-lg  bg-gray-200  p-3 text-sm font-medium text-gray-800  focus:border-2 focus:border-red-400 focus:outline-none md:w-full"
              />
              {isEmailVerify && (
                <MdMarkEmailRead className="cursor-pointer text-xl text-gray-800 hover:scale-105 transition-transform" />
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
                  className="w-full font-poppins cursor-pointer rounded-lg  bg-gray-200  p-3 text-sm font-medium text-gray-800  focus:border-2 focus:border-red-400 focus:outline-none md:w-full"
                />
              </div>
            )}
            <input
              type="Password"
              name="Name"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="w-full font-poppins cursor-pointer rounded-lg  bg-gray-200  p-3 text-sm font-medium text-gray-800  focus:border-2 focus:border-red-400 focus:outline-none md:w-full"
            />
          </div>

          <div className="w-full p-4 flex justify-center items-center">
            <button
              className="bg-[#f05700] text-sm md:text-[2vh]  p-3 rounded-lg w-[20vw] font-poppins font-medium text-white hover:bg-[#f06800] focus:outline-none"
              onClick={handleSignup}
            >
              {buttonValue}
            </button>
          </div>

          <h2
            className="text-center text-sm md:text-[2vh] font-medium mb-[2vh] text-gray-400 cursor-pointer hover:text-red-500"
            onClick={() => router.push("/Auth/Login")}
          >
            <button>Already have an Account? Login</button>
          </h2>
        </div>
      </div>
    </>
  );
};

export default page;
