"use client"

import React from "react";
import { FiHome , FiGrid , FiShoppingCart , FiUserPlus , FiPlusSquare , FiCompass} from "react-icons/fi";
import { useRouter } from "next/navigation";

const Navbar = () => {

    const router = useRouter();

  return (
    <div className="font-poppins flex justify-between items-center">
      {/* Logo */}
      <div className="flex text-[4vh] font-bold">
        <h1>Sticker</h1>
        <h1 className="text-[#f05700]">Verse</h1>
      </div>
      {/* Menu */}
      <div>
        <nav>
          <ul className="flex gap-5 items-center">
            <li className="bg-[#1A1110] p-[1.5vh] rounded-lg hover:scale-125 cursor-pointer transition-transform" onClick={()=>router.push("/")}><FiHome /></li>
            <li className="bg-[#1A1110] p-[1.5vh] rounded-lg hover:scale-125 cursor-pointer transition-transform"><FiCompass /></li>
            <li className="bg-[#1A1110] p-[1.5vh] rounded-lg hover:scale-125 cursor-pointer transition-transform"><FiGrid /></li>
          </ul>
        </nav>
      </div>
        {/* Action */}
      <div className="flex gap-5">

        {/* Inventory */}
        <div>
          <button className="bg-[#1A1110] p-[1.5vh] rounded-lg hover:scale-125 cursor-pointer transition-transform"><FiPlusSquare /></button>
        </div>
        {/* Cart */}
        <div>
          <button className="bg-[#1A1110] p-[1.5vh] rounded-lg hover:scale-125 cursor-pointer transition-transform"><FiShoppingCart /></button>
        </div>

        {/* Login */}
        <div>
          <button className="bg-[#1A1110] p-[1.5vh] rounded-lg hover:scale-125 cursor-pointer transition-transform" onClick={()=>router.push("/Auth/Login")}><FiUserPlus /></button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
