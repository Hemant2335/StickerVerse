"use client"

import React from "react";
import { useState } from "react";
import logo from "../../../Assets/logo.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import StateContext from "@/context/Context";
import { useContext } from "react";
import { toast } from 'react-hot-toast';

const page = () => {

  const router = useRouter();
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const {isAdmin , setisAdmin} = useContext(StateContext);

  const handleLogin = async () => {

    const response = await fetch("https://theprintbackend.vercel.app/users/login",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body : JSON.stringify({
        Email:Email,
        Password:Password
      })
    })

    const data = await response.json();
    if(!data.Success)
    {
      
      return toast.warning(data.Message);
    }
    else{
      setisAdmin(data.isAdmin);
      toast.success("Login Successfull");
      localStorage.setItem("token",data.Message);
      router.push("/");
    }

  }

  return (
    <div className="w-full h-fit p-4 mt-[5vh] flex justify-center items-center">
      <div className="bg-[#080806] h-fit md:min-w-[55vh] rounded-lg">
        <div className="w-full flex items-center justify-center">
          <Image src={logo} width={150} height={150} />
        </div>
        <div className="w-full max-w-[55vh] flex flex-col gap-[2vh] mt-[2vh] p-4">
          <input
            type="email"
            name="Name"
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="w-full font-poppins cursor-pointer rounded-lg  bg-[#2B2B2B]  p-3 text-sm font-medium text-white hover:bg-[#383838] focus:border-2 focus:border-[#f05700] focus:outline-none md:w-full "
          />
          <input
            type="Password"
            name="Name"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="w-full font-poppins cursor-pointer rounded-lg  bg-[#2B2B2B]  p-3 text-sm font-medium text-white hover:bg-[#383838] focus:border-2 focus:border-[#f05700] focus:outline-none md:w-full "
          />
          <h2 className="text-right text-sm md:text-[2.4vh] font-semibold text-gray-400 cursor-pointer hover:text-white">Forgot Password?</h2> 
        </div>

        <div className="w-full p-4 flex justify-center items-center">
          <button className="bg-[#f05700] text-sm md:text-[2.4vh]  p-3 rounded-lg w-[20vw] font-poppins font-bold text-white hover:bg-[#f06800] focus:outline-none" onClick={handleLogin}>
            Login
          </button>
        </div>

        <h2 className="text-center text-sm md:text-[2.4vh] font-semibold text-gray-400 cursor-pointer hover:text-white" onClick={()=>router.push("/Auth/Signup")}>Don't have an Account? Signup</h2>  

      </div>
    </div>
  );
};

export default page;
