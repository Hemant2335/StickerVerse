import React , {useState} from "react";
import { FiX } from "react-icons/fi";
import toast from "react-hot-toast";

const ChangeAddress = ({ setisAddaddress ,setMainAddress }) => {

  const [Address, setAddress] = useState("");
  const [Pincode, setPincode] = useState("");
  const [City, setCity] = useState("");
  const [State, setState] = useState("");

  const handleAddtoAddress = async() => {
    if (Address === "" || Pincode === "" || City === "" || State === "") {
      toast.error("Please fill all the fields");
    } else {
      const data = {
        address: Address,
        pincode: Pincode,
        city: City,
        state: State,
      };
      try {
        const res = await fetch("https://theprintbackend.vercel.app/users/updateaddress", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth" : localStorage.getItem("token")
          },
          body: JSON.stringify(data),
        });
        const resdata = await res.json();
        if(resdata?.Check)
        {
          toast.success("Address Updated");
          setisAddaddress(false);
          setMainAddress(`${Address} , ${City} , ${State} , ${Pincode}`)
        }
        else{
          toast.error("Something went wrong");
        }

      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
      }
      
    }
  }


  return (
    <div className=" fixed flex h-[100vh] w-screen px-2 top-0 left-0 justify-center items-center  z-10 bg-[rgba(34,34,34,0.5)]">
      <div className="bg-white p-[3vh] shadow-3xl md:w-[45vw] h-fit rounded-lg">
        <div
          className=" w-fit h-fit absolute cursor-pointer text-lg text-gray-800"
          onClick={() => {
            setisAddaddress(false);
          }}
        >
          <FiX />
        </div>
        -
        <div className="mt-5 w-full">
          <h1 className=" font-medium text-gray-800">Enter Your Address</h1>
          <p className="text-gray-400 text-sm">
            If you are from Jaypee University of Engineering and Technology ,
            please mention your Hostel and Room no
          </p>
          <div className="mt-5">
              <input
                type="text"
                placeholder="Address 1 eg: H-15-8 juet guna"
                className="w-full font-poppins cursor-pointer rounded-lg  bg-gray-200  p-3 text-sm font-medium text-gray-800  focus:border-2 focus:border-[#f05700] focus:outline-none md:w-full "
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
              />
            </div>
          <div className="mt-2  md:grid md:grid-cols-2 gap-[2vh] items-center justify-center">
            
            <div className="">
              <input
                type="text"
                placeholder="Pincode eg: 281001"
                className="w-full font-poppins cursor-pointer rounded-lg  bg-gray-200  p-3 text-sm font-medium text-gray-800  focus:border-2 focus:border-[#f05700] focus:outline-none md:w-full "
                onChange={(e) => {
                  setPincode(e.target.value);
                }}
              />
            </div>
            <div className="md:mt-0 mt-2">
              <input
                type="text"
                placeholder="City eg : Gurugram"
                className="w-full font-poppins cursor-pointer rounded-lg  bg-gray-200  p-3 text-sm font-medium text-gray-800  focus:border-2 focus:border-[#f05700] focus:outline-none md:w-full "
                onChange={(e) => {
                  setCity(e.target.value);
                }}
              />
            </div>
            <div className="md:mt-0 mt-2">
              <input
                type="text"
                placeholder="State eg : Haryana"
                className="w-full font-poppins cursor-pointer rounded-lg  bg-gray-200  p-3 text-sm font-medium text-gray-800  focus:border-2 focus:border-[#f05700] focus:outline-none md:w-full "
                onChange={(e) => {
                  setState(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="w-full pt-4 flex justify-center items-center">
              <button
                className="bg-red-500 text-sm md:text-[2vh]  p-3 rounded-lg w-fit font-poppins font-bold text-gray-800 hover:bg-[#f06800] focus:outline-none"
                onClick={() => handleAddtoAddress()}
              >
                Add Address
              </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeAddress;
