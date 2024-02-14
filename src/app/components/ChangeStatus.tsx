import React, { useState } from "react";
import { FiX } from "react-icons/fi";
import toast from "react-hot-toast";

interface ChangeStatusProps {
  setisAddStatus: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
  email: string;
  name: string;
  setMainStatus: React.Dispatch<React.SetStateAction<string>>;
}

const ChangeStatus = ({ setisAddStatus , id , email , name , setMainStatus} : ChangeStatusProps) => {
    const [Status, setStatus] = useState("");


    const handleNotifyUser = async () => {
        try {
          const res = await fetch(
            `https://theprintbackend.vercel.app/users/notifyuser`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                auth: localStorage.getItem("token") || "",
              },
              body: JSON.stringify({ name: name , status : Status , email : email}),
            }
          );
          const resdata = await res.json();
          if (resdata?.Check) {
            toast.success("User Notified");
          } else {
            toast.error("Error Sending Notification to User");
          }
        } catch (error) {
          console.log(error);
          toast.error("Internal Error Occured");
        }
    };



    const handleAddtoStatus = async () => {
        if (Status === "") {
          toast.error("Please fill all the fields");
        } else {
          try {
            const res = await fetch(
              `https://theprintbackend.vercel.app/order/updatestatus/${id}`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                  auth: localStorage.getItem("token") || "",
                },
                body: JSON.stringify({ status : Status }),
              }
            );
            const resdata = await res.json();
            if (resdata?.Check) {
              toast.success("Status Updated");
              handleNotifyUser();
              setisAddStatus(false);
              setMainStatus(Status);
            } else {
              toast.error("Something went wrong");
            }
          } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
          }
        }
      };

    return (
        <div className=" fixed flex h-[100vh] w-screen px-2 top-0 left-0 justify-center items-center  z-10 bg-[rgba(34,34,34,0.5)]">
          <div className="bg-white p-[3vh] shadow-3xl md:w-[30vw] h-fit rounded-lg">
            <div
              className=" w-fit h-fit absolute cursor-pointer text-lg text-gray-800"
              onClick={() => {
                setisAddStatus(false);
              }}
            >
              <FiX />
            </div>
            -
            <div className="mt-5 w-full">
              <h1 className=" font-medium text-gray-800">Enter The Status</h1>
              <p className="text-gray-400 text-sm">
                Please Provide the Current status of the Product
              </p>
              <div className="mt-5">
                <input
                  type="text"
                  placeholder="Status eg: Delivered"
                  className="w-full font-poppins cursor-pointer rounded-lg  bg-gray-200  p-3 text-sm font-medium text-gray-800  focus:border-2 focus:border-[#f05700] focus:outline-none md:w-full "
                  onChange={(e) => {
                    setStatus(e.target.value);
                  }}
                />
              </div>
    
              <div className="w-full pt-4 flex justify-center items-center">
                <button
                  className="bg-red-500 text-sm md:text-[2vh]  p-3 rounded-lg w-fit font-poppins font-bold text-gray-800 hover:bg-[#f06800] focus:outline-none"
                  onClick={() => handleAddtoStatus()}
                >
                  Add Status
                </button>
              </div>
            </div>
          </div>
        </div>
      );
}

export default ChangeStatus