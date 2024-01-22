import { useEffect ,useState } from "react";
import { loadingstatus } from "@/store/atom/State";
import { useSetRecoilState } from "recoil";

const useFetch = (param) => {

  const [ProductData, setProductData] = useState([]);
  const setisLoading = useSetRecoilState(loadingstatus);

  const fetchdata = async () => {
    try {
      setisLoading(true);
      const res = await fetch(
        `https://theprintbackend.vercel.app/products/${param}`,
        {
          method: "GET",
          headers: {
            auth: localStorage.getItem("token"),
          },
        }
      );
      setisLoading(false);
      const data = await res.json();
      console.log("Running");
      console.log(data);
      setProductData(data);
    } catch (error) {
      alert("Something went wrong");
    }
  };

  useEffect(()=>{
    fetchdata();
  },[])

  return ProductData;

};

export default useFetch;
