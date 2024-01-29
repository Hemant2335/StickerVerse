"use client";

import React, { useState, useEffect, useCallback } from "react";
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
  FiSmile,
} from "react-icons/fi";
import { useRouter } from "next/navigation";
import { useRecoilState, useRecoilValue } from "recoil";
import { adminstatus } from "@/store/atom/State";
import Image from "next/image";
import logo from "../../Assets/StickerVerse.png";
import { FiSearch } from "react-icons/fi";
import { Accountname } from "@/store/atom/State";

const Navbar = () => {
  const router = useRouter();
  const [issidebar, setissidebar] = useState(false);
  const [isAdmin, setisAdmin] = useRecoilState(adminstatus);
  const [Accname, setAccname] = useRecoilState(Accountname);
  const [isUserdropdown, setisUserdropdown] = useState(false);

  const handlesideclick = () => {
    setissidebar(!issidebar);
  };

  const show = async () => {
    if (!localStorage.getItem("token")) {
      return;
    }
    const response = await fetch(
      `https://theprintbackend.vercel.app/users/getuser`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          auth: localStorage.getItem("token"),
        },
      }
    );

    const json = await response.json();
    setisAdmin(json?.User?.isAdmin);
    setAccname(json?.User?.Name);
  };

  useEffect(() => {
    show();
  }, []);

  const handleMouseEnter = useCallback(() => {
    setisUserdropdown(true);
  }, [isUserdropdown]);

  const handleMouseleave = useCallback(() => {
    setisUserdropdown(false);
  }, [isUserdropdown]);

  return (
    <div>
      <div className="bg-black flex justify-center">
        Summer Sale Live 50% off on any 2 Stickers
      </div>
      <div className="mt-[1vh] font-poppins flex justify-between items-center overflow-x-hidden">
        {/* Logo */}
        <div className="flex text-[3vh] text-gray-800 w-fit h-fit font-bold ">
          <Image
            layout="responsive"
            src={logo}
            className="rounded-xl max-h-[15vh] md:max-h-[20vh]"
          />
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
          <div className="z-10 fixed p-2 right-0 text-gray-800  h-screen top-0 w-[50vw] shadow-3xl bg-white">
            <button
              className="  md:hidden p-[1.5vh] rounded-lg  cursor-pointer transition-transform"
              onClick={handlesideclick}
            >
              <FiX />
            </button>
            <div>
              <nav>
                <ul className="gap-5 items-center px-[8vw] py-[5vh] flex flex-col">
                  <li
                    className="bg-gray-200 w-full flex  justify-center py-[1.5vh] rounded-lg  cursor-pointer transition-transform"
                    onClick={() => {
                      router.push("/");
                      handlesideclick();
                    }}
                  >
                    <FiHome />
                  </li>
                  <li
                    className="bg-gray-200 w-full flex  justify-center py-[1.5vh] rounded-lg  cursor-pointer transition-transform"
                    onClick={() => {
                      router.push("/Explore");
                      handlesideclick();
                    }}
                  >
                    <FiCompass />
                  </li>
                  <li
                    className="bg-gray-200 w-full flex  justify-center py-[1.5vh] rounded-lg  cursor-pointer transition-transform"
                    onClick={() => {
                      router.push("/Category");
                      handlesideclick();
                    }}
                  >
                    <FiGrid />
                  </li>
                  {isAdmin && (
                    <li
                      className="bg-gray-200 w-full flex  justify-center py-[1.5vh] rounded-lg  cursor-pointer transition-transform"
                      onClick={() => {
                        router.push("/Dashboard");
                        handlesideclick();
                      }}
                    >
                      <FiPlusSquare />
                    </li>
                  )}
                  <li
                    className="bg-gray-200 w-full flex  justify-center py-[1.5vh] rounded-lg  cursor-pointer transition-transform"
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
                    className="bg-gray-200  w-full flex  justify-center py-[1.5vh] rounded-lg  cursor-pointer transition-transform"
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
          </div>
        )}

        {/* Search Bar */}
        <div className="hidden  text-[2.3vh] md:flex items-center w-full justify-center p-4">
          <div className="bg-[#e5e4e2]  rounded-xl flex ml-[2vw] items-center pl-2 pr-[5vw]">
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
                className="text-gray-800  font-bold p-[1.5vh] flex items-center gap-1  justify-center py-[1.5vh] rounded-lg  cursor-pointer transition-transform"
                onClick={() => router.push("/")}
              >
                <FiHome />
              </li>
              <li
                className="text-gray-800 font-bold p-[1.5vh] flex items-center gap-1  justify-center py-[1.5vh] rounded-lg  cursor-pointer transition-transform"
                onClick={() => {
                  router.push("/Explore");
                }}
              >
                <FiCompass />
              </li>
              <li
                className="text-gray-800  font-bold p-[1.5vh] flex items-center gap-1  justify-center py-[1.5vh] rounded-lg  cursor-pointer transition-transform"
                onClick={() => {
                  router.push("/Category");
                }}
              >
                <FiGrid />
              </li>
              <li
                className="text-gray-800  font-bold p-[1.5vh] flex items-center gap-1  justify-center py-[1.5vh] rounded-lg  cursor-pointer transition-transform"
                onClick={() => {
                  router.push("/Category");
                }}
              >
                <FiSmile />
              </li>
              {isAdmin && (
                <li
                  className="text-gray-800  font-bold p-[1.5vh] flex items-center gap-1  justify-center py-[1.5vh] rounded-lg  cursor-pointer transition-transform"
                  onClick={() => router.push("/Dashboard")}
                >
                  <FiPlusSquare />
                </li>
              )}
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
              <div
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseleave}
              >
                <li
                  className="text-gray-800 flex items-center gap-2  p-[1.5vh] border-2  justify-center py-[1.5vh] rounded-lg  cursor-pointer transition-transform"
                  onClick={() => {
                    if (!localStorage.getItem("token")) {
                      router.push("/Auth/Login");
                    }
                  }}
                >
                  <FiUser /> {Accname}
                </li>
                {isUserdropdown && localStorage.getItem("token") && (
                  <div className="shadow-3xl bg-white z-50  rounded-md absolute w-fit h-fit">
                    <div
                      className=" py-2 px-[4vh] cursor-pointer hover:bg-red-400 rounded-md flex items-center"
                      onClick={() => {
                        localStorage.getItem("token")
                          ? router.push("/Profile")
                          : router.push("/Auth/Login");
                      }}
                    >
                      <h1 className="text-gray-800 font-medium">Profile</h1>
                    </div>
                    <div
                      className=" py-2 px-[4vh] cursor-pointer hover:bg-red-400 rounded-md flex items-center"
                      onClick={() => {
                        localStorage.getItem("token")
                          ? router.push("/Orders")
                          : router.push("/Auth/Login");
                      }}
                    >
                      <h1 className="text-gray-800 font-medium">Order</h1>
                    </div>
                  </div>
                )}
              </div>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
