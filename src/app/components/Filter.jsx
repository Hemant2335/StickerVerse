import React ,{useState} from "react";
import { FiChevronDown } from "react-icons/fi";

const Filter = ({Category ,setCategory , Categorydata}) => {

  const [Subcategory, setSubcategory] = useState(null);
  const [isSubcatdropdown, setisSubcatdropdown] = useState(false);
  const [isCatdropdown, setisCatdropdown] = useState(false);
  const [SubCategorydata, setSubCategorydata] = useState(null);

  return (
    <div>
      {/* Filters */}
      <div className="mt-[2vh]">
        <h1 className="text-gray-800 font-bold text-xl">Filters</h1>
        <div className=" gap-[2vw]">
          <div className="mt-[2vh]">
            <h1
              className="text-gray-800 font-bold shadow-3xl w-fit p-2 cursor-pointer rounded-lg flex items-center"
              onClick={() => {
                setisCatdropdown(!isCatdropdown);
                setisSubcatdropdown(false);
              }}
            >
              {Category ? `${Category}` : "Select Category"} <FiChevronDown />
            </h1>
            {isCatdropdown && (
              <div className="mt-[2vh] z-50 shadow-3xl max-h-[20vh] overflow-y-auto absolute bg-white rounded-lg">
                <div
                  className=" p-2 cursor-pointer hover:bg-red-400 rounded-md flex items-center"
                  onClick={() => {
                    setCategory(null);
                    setisCatdropdown(false);
                    setSubcategory(null);
                  }}
                >
                  <h1 className="text-gray-800 font-bold">Select Category</h1>
                </div>
                {Categorydata?.map((item) => {
                  return (
                    <div
                      className=" p-2 cursor-pointer hover:bg-red-400 rounded-md flex items-center"
                      onClick={() => {
                        setCategory(item?.Name);
                        setisCatdropdown(false);
                        setSubcategory(null);

                        setSubCategorydata(item?.subcategory);
                      }}
                    >
                      <h1 className="text-gray-800 font-bold">{item?.Name}</h1>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          {SubCategorydata && (
            <div className="mt-[2vh]">
              <h1
                className="text-gray-800 font-bold shadow-3xl w-fit p-2 cursor-pointer rounded-lg flex items-center"
                onClick={() => {
                  setisSubcatdropdown(!isSubcatdropdown);
                  setisCatdropdown(false);
                }}
              >
                {Subcategory ? `${Subcategory}` : "Select SubCategory"}{" "}
                <FiChevronDown />
              </h1>
              {isSubcatdropdown && (
                <div className="mt-[2vh] max-h-[20vh] z-50 overflow-y-auto shadow-3xl absolute bg-white rounded-lg">
                  {SubCategorydata?.map((item) => {
                    return (
                      <div
                        className=" p-2 cursor-pointer hover:bg-red-400 rounded-md flex items-center"
                        onClick={() => {
                          setSubcategory(item?.Name);
                          setisSubcatdropdown(false);
                        }}
                      >
                        <h1 className="text-gray-800 font-bold">
                          {item?.Name}
                        </h1>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Filter;
