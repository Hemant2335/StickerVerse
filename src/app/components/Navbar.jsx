"use client";

import React, { useState, useEffect } from "react";
import {
  FiHome,
  FiGrid,
  FiAlignLeft,
  FiShoppingCart,
  FiUserPlus,
  FiPlusSquare,
  FiCompass,
  FiX,
  FiUser,
  FiSmile
} from "react-icons/fi";
import { useRouter } from "next/navigation";
import { useRecoilValue } from "recoil";
import { adminstatus } from "@/store/atom/State";
import Image from "next/image";
import logo from "../../Assets/Newlogo.png";
import { FiSearch } from "react-icons/fi";

const Navbar = () => {
  const router = useRouter();
  const [issidebar, setissidebar] = useState(false);
  const isAdmin = useRecoilValue(adminstatus);

  const handlesideclick = () => {
    setissidebar(!issidebar);
  };

  return (
    <div>
      <div className="font-poppins flex justify-between items-center overflow-x-hidden">
        {/* Logo */}
        <div className="flex text-[3vh] text-gray-800 w-fit h-fit font-bold ">
          {/* <Image
          layout="responsive"
          src={logo}
          className="rounded-xl md:max-h-[28vh]"
        /> */}
          MRPRINT
        </div>
        {/* Mobile Menu */}
        <div>
          <button
            className="text-gray-800 md:hidden p-[1.5vh] rounded-lg  cursor-pointer transition-transform"
            onClick={handlesideclick}
          >
            <FiAlignLeft />
          </button>
        </div>
        {issidebar && (
          <div className="z-10 fixed p-2 right-0  h-screen top-0 w-[50vw] shadow-3xl bg-[#080806]">
            <button
              className="  md:hidden p-[1.5vh] rounded-lg  cursor-pointer transition-transform"
              onClick={handlesideclick}
            >
              <FiX />
            </button>
            <nav>
              <ul className="gap-5 items-center px-[8vw] py-[5vh] flex flex-col">
                <li
                  className="bg-[#1A1110] w-full flex  justify-center py-[1.5vh] rounded-lg  cursor-pointer transition-transform"
                  onClick={() => {
                    router.push("/");
                    handlesideclick();
                  }}
                >
                  <FiHome />
                </li>
                <li
                  className="bg-[#1A1110] w-full flex  justify-center py-[1.5vh] rounded-lg  cursor-pointer transition-transform"
                  onClick={() => {
                    router.push("/Explore");
                    handlesideclick();
                  }}
                >
                  <FiCompass />
                </li>
                <li
                  className="bg-[#1A1110] w-full flex  justify-center py-[1.5vh] rounded-lg  cursor-pointer transition-transform"
                  onClick={() => {
                    router.push("/Category");
                    handlesideclick();
                  }}
                >
                  <FiGrid />
                </li>
                {isAdmin && (
                  <li
                    className="bg-[#1A1110] w-full flex  justify-center py-[1.5vh] rounded-lg  cursor-pointer transition-transform"
                    onClick={() => {
                      router.push("/Dashboard");
                      handlesideclick();
                    }}
                  >
                    <FiPlusSquare />
                  </li>
                )}
                <li
                  className="bg-[#1A1110] w-full flex  justify-center py-[1.5vh] rounded-lg  cursor-pointer transition-transform"
                  onClick={() => {
                    localStorage.getItem("token")
                      ? router.push("/Cart")
                      : router.push("/Auth/Login");
                    handlesideclick();
                  }}
                >
                  <FiShoppingCart />
                </li>
                <li
                  className="bg-[#1A1110] w-full flex  justify-center py-[1.5vh] rounded-lg  cursor-pointer transition-transform"
                  onClick={() => {
                    localStorage.getItem("token")
                      ? router.push("/Profile")
                      : router.push("/Auth/Login");
                    handlesideclick();
                  }}
                >
                  <FiUser />
                </li>
              </ul>
            </nav>
          </div>
        )}

        {/* Search Bar */}
        <div className="hidden  text-[2.3vh] md:flex items-center w-full justify-center p-4">
          <div className="bg-[#e5e4e2] rounded-xl flex ml-[2vw] items-center pl-2 pr-[5vw]">
            <h1 className="text-gray-800 text-lg">
              <FiSearch />
            </h1>
            <input
              type="text"
              placeholder="Search"
              className="bg-[#e5e4e2] text-gray-800 focus:border-0  focus:outline-none px-3 py-2 rounded-xl"
            />
          </div>
        </div>

        {/* Desktop Menu */}

        <div className="hidden md:flex items-center justify-center p-4">
          <nav>
            <ul className="flex gap-2 items-center justify-center">
              <li
                className="text-gray-800 p-[1.5vh]  justify-center py-[1.5vh] rounded-lg  cursor-pointer transition-transform"
                onClick={() => {
                  localStorage.getItem("token")
                    ? router.push("/Profile")
                    : router.push("/Auth/Login");
                }}
              >
                <FiUser />
              </li>
              <li
                className="text-gray-800 p-[1.5vh]  justify-center py-[1.5vh] rounded-lg  cursor-pointer transition-transform"
                onClick={() => {
                  localStorage.getItem("token")
                    ? router.push("/Cart")
                    : router.push("/Auth/Login");
                }}
              >
                <FiShoppingCart />
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <hr className=" border-[0.2vh]" />
      <div className="hidden w-full md:flex justify-center mt-[2vh]">
        <ul className="flex gap-5">
          <li
            className="text-gray-800 text-[2.3vh] font-bold p-[1.5vh] flex items-center gap-1  justify-center py-[1.5vh] rounded-lg  cursor-pointer transition-transform"
            onClick={() => router.push("/")}
          >
            <FiHome /> HOME
          </li>
          <li
            className="text-gray-800 text-[2.3vh] font-bold p-[1.5vh] flex items-center gap-1  justify-center py-[1.5vh] rounded-lg  cursor-pointer transition-transform"
            onClick={() => {
              router.push("/Explore");
            }}
          >
            <FiCompass /> EXPLORE
          </li>
          <li
            className="text-gray-800 text-[2.3vh] font-bold p-[1.5vh] flex items-center gap-1  justify-center py-[1.5vh] rounded-lg  cursor-pointer transition-transform"
            onClick={() => {
              router.push("/Category");
            }}
          >
            <FiGrid /> CATEGORY
          </li>
          <li
            className="text-gray-800 text-[2.3vh] font-bold p-[1.5vh] flex items-center gap-1  justify-center py-[1.5vh] rounded-lg  cursor-pointer transition-transform"
            onClick={() => {
              router.push("/Category");
            }}
          >
            <FiSmile /> ABOUT US
          </li>
          {isAdmin && (
            <li
              className="bg-[#1A1110] p-[1.5vh]  justify-center py-[1.5vh] rounded-lg  cursor-pointer transition-transform"
              onClick={() => router.push("/Dashboard")}
            >
              <FiPlusSquare />
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
