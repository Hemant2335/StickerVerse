"use client";
import React from "react";
import { useState ,useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRecoilState, useSetRecoilState } from "recoil";
import { toast } from "react-hot-toast";
import {
  loadingstatus,
  adminstatus,
  Accountname,
} from "../../../store/atom/State";
import Loading from "../../components/Loading";
import { GoogleLogin } from "@react-oauth/google";

const page = () => {
  const router = useRouter();
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const setisAdmin = useSetRecoilState(adminstatus);
  const setAccname = useSetRecoilState(Accountname);
  const [token, settoken] = useState<string | null>(null);

  const [isLoading, setisLoading] = useRecoilState(loadingstatus);

  const handleLogin = async () => {
    setisLoading(true);
    const response = await fetch(
      "https://theprintbackend.vercel.app/users/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Email: Email,
          Password: Password,
        }),
      }
    );
    setisLoading(false);
    const data = await response.json();
    if (!data.Success) {
      return toast.error(data.Message);
    } else {
      setisAdmin(data.isAdmin);
      setAccname(data?.Name);
      toast.success("Login Successfull");
      localStorage.setItem("token", data.Message);
      router.push("/");
    }
  };


  const handleGoogleLogin = async () => {
    if (token) {
      console.log("Token of Google" ,token);
      setisLoading(true);
      const response = await fetch(
        "https://theprintbackend.vercel.app/users/googlelogin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            tokenId: token,
          }),
        }
      );
      setisLoading(false);
      const data = await response.json();
      if (!data.Success) {
        return toast.error(data.Message);
      } else {
        setisAdmin(data.isAdmin);
        setAccname(data?.Name);
        toast.success("Login Successfull");
        localStorage.setItem("token", data.Message);
        router.push("/");
      }
    }
  
  }

  useEffect(() => {
    handleGoogleLogin();
  }, [token])

  return (
    <>
      {isLoading && <Loading />}
      {/* <div className="h-full hidden md:flex">
            <Image
              layout="responsive"
              src={banner}
              width={50}
              height={50}
              className="md:h-[2vw] rounded-r-2xl"
            />
          </div> */}
      <div className="w-full h-fit p-4 mt-[5vh] flex justify-center items-center">
        <div className=" shadow-3xl h-fit md:min-w-[55vh] rounded-lg">
          <div className="w-full flex items-center justify-center">
            <Image
              src={require("../../../Assets/Logo.png")}
              width={150}
              height={150}
              alt="Logo"
            />
          </div>
          <div className="w-full flex justify-center items-center">
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              settoken(credentialResponse?.credential as string);
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
          </div>
          <div className="w-full max-w-[55vh] flex flex-col gap-[2vh] mt-[2vh] p-4">
            <input
              type="email"
              name="Name"
              placeholder="Email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="w-full font-poppins cursor-pointer rounded-lg  bg-gray-200  p-3 text-sm font-medium text-gray-800  focus:border-2 focus:border-red-400 focus:outline-none md:w-full "
            />
            <input
              type="Password"
              name="Name"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="w-full font-poppins cursor-pointer rounded-lg  bg-gray-200  p-3 text-sm font-medium text-gray-800  focus:border-2 focus:border-red-400 focus:outline-none md:w-full "
            />
            <h2 className="text-right text-sm md:text-[2vh] font-medium  text-gray-400 cursor-pointer hover:text-red-400">
              Forgot Password?
            </h2>
          </div>
          <div className="w-full p-4 flex justify-center items-center">
            <button
              className="bg-[#f05700] text-sm md:text-[2vh]  p-3 rounded-lg w-[20vw] font-poppins font-medium text-white hover:bg-[#f06800] focus:outline-none"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
          <h2
            className="text-center text-sm md:text-[2vh] font-medium text-gray-400 cursor-pointer hover:text-red-400 mb-2"
            onClick={() => router.push("/Auth/Signup")}
          >
            {" "}
            <button>Don't have an Account? Signup</button>{" "}
          </h2>
        </div>
      </div>
    </>
  );
};

export default page;
