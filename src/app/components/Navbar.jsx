import React from "react";
import { FiHome , FiGrid , FiShoppingCart , FiUserPlus , FiCompass} from "react-icons/fi";

const Navbar = () => {
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
            <li className="bg-[#222222] p-[1.5vh] rounded-lg hover:scale-125 cursor-pointer transition-transform"><FiHome /></li>
            <li className="bg-[#222222] p-[1.5vh] rounded-lg hover:scale-125 cursor-pointer transition-transform"><FiCompass /></li>
            <li className="bg-[#222222] p-[1.5vh] rounded-lg hover:scale-125 cursor-pointer transition-transform"><FiGrid /></li>
          </ul>
        </nav>
      </div>
        {/* Action */}
      <div className="flex gap-5">
        {/* Cart */}
        <div>
          <button className="bg-[#222222] p-[1.5vh] rounded-lg hover:scale-125 cursor-pointer transition-transform"><FiShoppingCart /></button>
        </div>

        {/* Login */}
        <div>
          <button className="bg-[#222222] p-[1.5vh] rounded-lg hover:scale-125 cursor-pointer transition-transform"><FiUserPlus /></button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
