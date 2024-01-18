"use client"

import { useEffect , useState } from "react";
import StateContext from "./Context";


const StateProvider = ({ children }) => {
    
    const [Sticker, setSticker] = useState(null);
    const [Poster, setPoster] = useState(null);
    const [isAdmin, setisAdmin] = useState(false);
    
    const [isLoadingstate, setisLoadingstate] = useState(false);

    const fetchdata = async() => 
  {
    try {
      const res = await fetch("https://theprintbackend.vercel.app/products/Sticker" , 
      {
        method : "GET",
        headers: {
          auth: localStorage.getItem("token"),
        },
      })
      const data = await res.json();
      console.log("Running")
      console.log(data);
      setSticker(data);
    } catch (error) {
        alert("Something went wrong");
    }
    
  }

  const fetchPoster = async() => 
  {
    try {
      const res = await fetch("https://theprintbackend.vercel.app/products/Poster" , 
      {
        method : "GET",
        headers: {
          auth: localStorage.getItem("token"),
        },
      })
      const data = await res.json();
      console.log("Running")
      console.log(data);
      setPoster(data);
    } catch (error) {
        alert("Something went wrong");
    }
    
  }

  


  useEffect(() => {
    fetchdata();
    fetchPoster();
  }, [])

    return (
        <StateContext.Provider value={{ Sticker, Poster , setisAdmin , isAdmin}}>
        {children}
        </StateContext.Provider>
    );
};

export default StateProvider;