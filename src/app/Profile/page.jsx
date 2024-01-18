"use client"

import React from "react";
import profile from "../../Assets/man-avatar.png"
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Profile = () => {
  const router = useRouter();
  const [data, setdata] = useState("");
  const show = async () => {
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
    setdata(json?.User);
    console.log(data);
  };
  useEffect(() => {
    show();
  }, []);


  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  }

  return (
    <>
      <div className="flex justify-center mt-[10vh]">
        <div className="h-fit w-fit shadow-3xl flex flex-col md:flex-row gap-[10vh] justify-center items-center px-10 py-10">
          <div className="shadow-3xl w-fit p-4 rounded-lg">
            {/* {data?.isAdmin ? () : (<img src={profile} alt="" className='h-[30vh]' />)} */}
            <Image
              src={profile}
              width={200}
              height={200}
              className="rounded-xl md:max-h-[28vh] responsive"
            />
          </div>
          <div className="flex flex-col gap-5 ">
            <div className="flex gap-5">
              <h2 className="text-xl font-poppins font-semibold">Profile </h2>
              {data?.isAdmin ? (
                <h2 className="text-xl font-poppins font-medium">Admin</h2>
              ) : (
                <h2 className="text-xl font-poppins font-medium">User</h2>
              )}
            </div>
            <div className="flex gap-5">
              <h2 className="text-xl font-poppins font-semibold">Name </h2>
              <h2 className="text-xl font-poppins font-medium">{data?.Name}</h2>
            </div>
            <div className="flex gap-5">
              <h2 className="text-xl font-poppins font-semibold">Email</h2>
              <h2 className="text-xl font-poppins font-medium">
                {data?.Email}
              </h2>
            </div>
          </div>
          
        </div>
        
      </div>
      <div className="w-full p-4 flex justify-center items-center">
          <button className="bg-[#f05700] text-sm md:text-[2.4vh]  p-3 rounded-lg w-[20vw] font-poppins font-bold text-white hover:bg-[#f06800] focus:outline-none" onClick={handleLogout}>
            Logout
          </button>
        </div>
    </>
  );
};

export default Profile;
