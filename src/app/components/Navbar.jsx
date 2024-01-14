"use client";

import React, { useState } from "react";
import {
  FiHome,
  FiGrid,
  FiAlignLeft,
  FiShoppingCart,
  FiUserPlus,
  FiPlusSquare,
  FiCompass,
  FiX,
} from "react-icons/fi";
import { useRouter } from "next/navigation";
import StateContext from "@/context/Context";
import { useContext } from "react";

const Navbar = () => {
  const router = useRouter();
  const [issidebar, setissidebar] = useState(false);
  const { isAdmin } = useContext(StateContext);
  const handlesideclick = () => {
    setissidebar(!issidebar);
  };

  return (
    <div className="font-poppins flex justify-between items-center overflow-x-hidden">
      {/* Logo */}
      <div className="flex text-[4vh] font-bold">
        <h1>Sticker</h1>
        <h1 className="text-[#f05700]">Verse</h1>
      </div>
      {/* Mobile Menu */}
      <div>
        <button
          className="bg-[#1A1110] md:hidden p-[1.5vh] rounded-lg hover:scale-125 cursor-pointer transition-transform"
          onClick={handlesideclick}
        >
          <FiAlignLeft />
        </button>
      </div>
      {issidebar && (
        <div className="z-10 fixed p-2 right-0  h-screen top-0 w-[50vw] shadow-3xl bg-[#080806]">
          <button
            className="  md:hidden p-[1.5vh] rounded-lg hover:scale-125 cursor-pointer transition-transform"
            onClick={handlesideclick}
          >
            <FiX />
          </button>
          <nav>
            <ul className="gap-5 items-center px-[8vw] py-[5vh] flex flex-col">
              <li
                className="bg-[#1A1110] w-full flex  justify-center py-[1.5vh] rounded-lg hover:scale-125 cursor-pointer transition-transform"
                onClick={() => router.push("/")}
              >
                <FiHome />
              </li>
              <li
                className="bg-[#1A1110] w-full flex  justify-center py-[1.5vh] rounded-lg hover:scale-125 cursor-pointer transition-transform"
                onClick={() => {
                  router.push("/Explore");
                }}
              >
                <FiCompass />
              </li>
              <li
                className="bg-[#1A1110] w-full flex  justify-center py-[1.5vh] rounded-lg hover:scale-125 cursor-pointer transition-transform"
                onClick={() => router.push("/Category")}
              >
                <FiGrid />
              </li>
              {isAdmin && (
                <li
                  className="bg-[#1A1110] w-full flex  justify-center py-[1.5vh] rounded-lg hover:scale-125 cursor-pointer transition-transform"
                  onClick={() => router.push("/Dashboard")}
                >
                  <FiPlusSquare />
                </li>
              )}
              <li
                className="bg-[#1A1110] w-full flex  justify-center py-[1.5vh] rounded-lg hover:scale-125 cursor-pointer transition-transform"
                onClick={() => {
                  localStorage.getItem("token")
                    ? router.push("/Cart")
                    : router.push("/Auth/Login");
                }}
              >
                <FiShoppingCart />
              </li>
              <li
                className="bg-[#1A1110] w-full flex  justify-center py-[1.5vh] rounded-lg hover:scale-125 cursor-pointer transition-transform"
                onClick={() => router.push("/Auth/Login")}
              >
                <FiUserPlus />
              </li>
            </ul>
          </nav>
        </div>
      )}

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center justify-center p-4">
        <nav>
          <ul className="flex gap-5 items-center justify-center">
            <li
              className="bg-[#1A1110] p-[1.5vh]  justify-center py-[1.5vh] rounded-lg hover:scale-125 cursor-pointer transition-transform"
              onClick={() => router.push("/")}
            >
              <FiHome />
            </li>
            <li
              className="bg-[#1A1110] p-[1.5vh]  justify-center py-[1.5vh] rounded-lg hover:scale-125 cursor-pointer transition-transform"
              onClick={() => {
                router.push("/Explore");
              }}
            >
              <FiCompass />
            </li>
            <li
              className="bg-[#1A1110] p-[1.5vh]  justify-center py-[1.5vh] rounded-lg hover:scale-125 cursor-pointer transition-transform"
              onClick={() => {
                router.push("/Category");
              }}
            >
              <FiGrid />
            </li>
            {isAdmin && (
              <li
                className="bg-[#1A1110] w-full flex  justify-center py-[1.5vh] rounded-lg hover:scale-125 cursor-pointer transition-transform"
                onClick={() => router.push("/Dashboard")}
              >
                <FiPlusSquare />
              </li>
            )}
            <li
              className="bg-[#1A1110] p-[1.5vh]  justify-center py-[1.5vh] rounded-lg hover:scale-125 cursor-pointer transition-transform"
              onClick={() => {
                localStorage.getItem("token")
                  ? router.push("/Cart")
                  : router.push("/Auth/Login");
              }}
            >
              <FiShoppingCart />
            </li>
            <li
              className="bg-[#1A1110] p-[1.5vh]  justify-center py-[1.5vh] rounded-lg hover:scale-125 cursor-pointer transition-transform"
              onClick={() => router.push("/Auth/Login")}
            >
              <FiUserPlus />
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
