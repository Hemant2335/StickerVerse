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
  FiPackage,
  FiUser,
  FiSmile,
  FiSun,
  FiMoon
} from "react-icons/fi";
import { CiLight, CiDark } from "react-icons/ci";
import { useRouter } from "next/navigation";
import { useRecoilState, useRecoilValue } from "recoil";
import { adminstatus } from "../../store/atom/State";
import Image from "next/image";
import { FiSearch } from "react-icons/fi";
import { Accountname } from "../../store/atom/State";
import { isdark } from "../../store/atom/State";

const Navbar = () => {
  const router = useRouter();
  const [issidebar, setissidebar] = useState(false);
  const [isAdmin, setisAdmin] = useRecoilState(adminstatus);
  const [Accname, setAccname] = useRecoilState(Accountname);
  const [isdarktheme, setisdarktheme] = useRecoilState(isdark);
  const [isUserdropdown, setisUserdropdown] = useState(false);
  const [body, setbody] = useState<HTMLElement | null>(null)
  // Create a DOM environment
  useEffect(() => {
    setbody(document.body)
  }, []);

  const modetoggle = () => {
    if (body?.classList.contains("light")) {
      body.classList.remove("light");
      setisdarktheme(!isdarktheme);
    } else {
      body?.classList.add("light");
      setisdarktheme(!isdarktheme);
    }
  };

  const handlesideclick = () => {
    setissidebar(!issidebar);
  };

  const show = async () => {
    if (!localStorage.getItem("token")) {
      return;
    }
    const token = localStorage?.getItem("token");
    const response = await fetch(
      `https://theprintbackend.vercel.app/users/getuser`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? token : "",
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
      <div className="bg-black text-white flex justify-center">
        Summer Sale Live 50% off on any 2 Stickers
      </div>
      <div className="mt-[1vh] font-poppins flex justify-between items-center overflow-x-hidden">
        {/* Logo */}
        <div
          className="flex cursor-pointer  text-[3vh] w-fit h-fit font-bold "
          onClick={() => router.push("/")}
        >
          <Image
            layout="responsive"
            src={require("../../Assets/Logo.png")}
            className="rounded-xl max-h-[15vh] md:max-h-[20vh]"
            alt="logo"
          />
        </div>
        {/* Mobile Menu */}
        <div className="flex md:hidden">
        {!isdarktheme ? (
                <li
                  className=" font-bold p-[1.5vh] flex items-center gap-1  justify-center py-[1.5vh] rounded-lg  cursor-pointer transition-transform"
                  onClick={() => modetoggle()}
                >
                  <FiSun />
                </li>
              ) : (
                <li
                  className=" font-bold p-[1.5vh] flex items-center gap-1  justify-center py-[1.5vh] rounded-lg  cursor-pointer transition-transform"
                  onClick={() => modetoggle()}
                >
                  <FiMoon />
                  
                </li>
              )}
          <button
            className=" p-[1.5vh] rounded-lg  cursor-pointer transition-transform"
            onClick={handlesideclick}
          >
            <FiAlignLeft />
          </button>

        </div>
        {issidebar && (
          <div className="z-10 fixed p-2 right-0  h-screen top-0 w-[50vw] shadow-3xl bg-red-500">
            <button
              className="  md:hidden p-[1.5vh] rounded-lg  cursor-pointer transition-transform"
              onClick={handlesideclick}
            >
              <FiX />
            </button>
            <div>
              <nav>
                <ul className="gap-5 items-center bg-red-500 px-[8vw] py-[5vh] flex flex-col">
                  <li
                    className="bg-red-400 w-full flex  justify-center py-[1.5vh] rounded-lg  cursor-pointer transition-transform"
                    onClick={() => {
                      router.push("/");
                      handlesideclick();
                    }}
                  >
                    <FiHome />
                  </li>
                  <li
                    className="bg-red-400 w-full flex  justify-center py-[1.5vh] rounded-lg  cursor-pointer transition-transform"
                    onClick={() => {
                      router.push("/Explore/Sticker");
                      handlesideclick();
                    }}
                  >
                    <FiCompass />
                  </li>
                  <li
                    className="bg-red-400 w-full flex  justify-center py-[1.5vh] rounded-lg  cursor-pointer transition-transform"
                    onClick={() => {
                      router.push("/Category");
                      handlesideclick();
                    }}
                  >
                    <FiGrid />
                  </li>
                  {isAdmin && (
                    <li
                      className="bg-red-400 w-full flex  justify-center py-[1.5vh] rounded-lg  cursor-pointer transition-transform"
                      onClick={() => {
                        router.push("/Adminhandle");
                        handlesideclick();
                      }}
                    >
                      <FiPlusSquare />
                    </li>
                  )}
                  <li
                    className="bg-red-400 w-full flex  justify-center py-[1.5vh] rounded-lg  cursor-pointer transition-transform"
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
                    className="bg-red-400  w-full flex  justify-center py-[1.5vh] rounded-lg  cursor-pointer transition-transform"
                    onClick={() => {
                      localStorage.getItem("token")
                        ? router.push("/Profile")
                        : router.push("/Auth/Login");
                      handlesideclick();
                    }}
                  >
                    <FiUser />
                  </li>
                  <li
                    className="bg-red-400  w-full flex  justify-center py-[1.5vh] rounded-lg  cursor-pointer transition-transform"
                    onClick={() => {
                      localStorage.getItem("token")
                        ? !isAdmin
                          ? router.push("/Orders")
                          : router.push("/AdminOrders")
                        : router.push("/Auth/Login");
                      handlesideclick();
                    }}
                  >
                    <FiPackage />
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        )}

        {/* Search Bar */}
        <div className="hidden  text-[2.3vh] md:flex items-center w-full justify-center p-4">
          <div className=" shadow-3xl rounded-xl flex ml-[2vw] items-center pl-2 pr-[5vw]">
            <h1 className="text-lg">
              <FiSearch />
            </h1>
            <input
              type="text"
              placeholder="Search"
              className="  focus:border-0  focus:outline-none px-3 py-2 rounded-xl"
            />
          </div>
        </div>

        {/* Desktop Menu */}

        <div className="hidden md:flex items-center justify-center p-4">
          <nav>
            <ul className="flex gap-2 items-center justify-center">
            {!isdarktheme ? (
                <li
                  className=" font-bold p-[1.5vh] flex items-center gap-1  justify-center py-[1.5vh] rounded-lg  cursor-pointer transition-transform"
                  onClick={() => modetoggle()}
                >
                  <FiSun />
                </li>
              ) : (
                <li
                  className=" font-bold p-[1.5vh] flex items-center gap-1  justify-center py-[1.5vh] rounded-lg  cursor-pointer transition-transform"
                  onClick={() => modetoggle()}
                >
                  <FiMoon />
                  
                </li>
              )}
              <li
                className=" font-bold p-[1.5vh] flex items-center gap-1  justify-center py-[1.5vh] rounded-lg  cursor-pointer transition-transform"
                onClick={() => router.push("/")}
              >
                <FiHome />
              </li>
              
              <li
                className="font-bold p-[1.5vh] flex items-center gap-1  justify-center py-[1.5vh] rounded-lg  cursor-pointer transition-transform"
                onClick={() => {
                  router.push("/Explore/Sticker");
                }}
              >
                <FiCompass />
              </li>
              <li
                className=" font-bold p-[1.5vh] flex items-center gap-1  justify-center py-[1.5vh] rounded-lg  cursor-pointer transition-transform"
                onClick={() => {
                  router.push("/Category");
                }}
              >
                <FiGrid />
              </li>
              <li
                className=" font-bold p-[1.5vh] flex items-center gap-1  justify-center py-[1.5vh] rounded-lg  cursor-pointer transition-transform"
                onClick={() => {
                  router.push("/Category");
                }}
              >
                <FiSmile />
              </li>
              {isAdmin && (
                <li
                  className=" font-bold p-[1.5vh] flex items-center gap-1  justify-center py-[1.5vh] rounded-lg  cursor-pointer transition-transform"
                  onClick={() => router.push("/Dashboard")}
                >
                  <FiPlusSquare />
                </li>
              )}
              <li
                className="p-[1.5vh]  justify-center py-[1.5vh] rounded-lg  cursor-pointer transition-transform"
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
                  className="flex items-center gap-2  p-[1.5vh] border-2  justify-center py-[1.5vh] rounded-lg  cursor-pointer transition-transform"
                  onClick={() => {
                    if (!localStorage.getItem("token")) {
                      router.push("/Auth/Login");
                    }
                  }}
                >
                  <FiUser /> {Accname.split(" ")[0]}
                </li>
                {isUserdropdown && localStorage.getItem("token") && (
                  <div className="shadow-3xl  z-50  rounded-md absolute w-fit h-fit">
                    <div
                      className=" py-2 px-[4vh] cursor-pointer hover:bg-red-400 rounded-md flex items-center"
                      onClick={() => {
                        localStorage.getItem("token")
                          ? router.push("/Profile")
                          : router.push("/Auth/Login");
                      }}
                    >
                      <h1 className="font-medium">Profile</h1>
                    </div>
                    <div
                      className=" py-2 px-[4vh] cursor-pointer hover:bg-red-400 rounded-md flex items-center"
                      onClick={() => {
                        localStorage.getItem("token")
                          ? !isAdmin
                            ? router.push("/Orders")
                            : router.push("/AdminOrders")
                          : router.push("/Auth/Login");
                      }}
                    >
                      <h1 className="font-medium">Order</h1>
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
