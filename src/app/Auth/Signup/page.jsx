"use client";

import React from "react";
import logo from "../../../Assets/logo.png";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Name, setName] = useState("");

  // Function to handle Signup

  const handleSignup = async () => {
    const response = await fetch("https://theprintbackend.vercel.app/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Email: Email,
        Name: Name,
        Password: Password,
      }),
    });
    const data = await response.json();
    if(!data.Success)
    {
        return alert(data.Message);
    }
    else{
        alert(data.Message);
        router.push("/Auth/Login");
    }
  };

  return (
    <div className="w-full h-fit flex mt-[5vh] justify-center items-center p-4">
      <div className="bg-[#080806] h-fit min-w-[55vh] rounded-lg">
        <div className="w-full flex items-center justify-center">
          <Image src={logo} width={90} height={90} />
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
          <h2 className="text-right text-[2.4vh] font-semibold text-gray-400 cursor-pointer hover:text-white">
            Forgot Password?
          </h2>
        </div>

        <div className="w-full p-4 flex justify-center items-center">
          <button className="bg-[#f05700] text-[2.4vh]  p-3 rounded-lg w-[20vw] font-poppins font-bold text-white hover:bg-[#f06800] focus:outline-none" onClick={handleSignup}>
            Sign up
          </button>
        </div>

        <h2
          className="text-center text-[2.4vh] font-semibold text-gray-400 cursor-pointer hover:text-white"
          onClick={() => router.push("/Auth/Login")}
        >
          Already have an Account? Login
        </h2>
      </div>
    </div>
  );
};

export default page;
