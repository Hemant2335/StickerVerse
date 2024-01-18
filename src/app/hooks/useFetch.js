import { useEffect ,useState } from "react";

const useFetch = (param) => {

  const [ProductData, setProductData] = useState([]);

  const fetchdata = async () => {
    try {
      const res = await fetch(
        `https://theprintbackend.vercel.app/products/${param}`,
        {
          method: "GET",
          headers: {
            auth: localStorage.getItem("token"),
          },
        }
      );
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
