"use client"

import toast from "react-hot-toast";
import { atom, selector } from "recoil";

export const adminstatus = atom({
    key : "adminstatus",
    default : false
})

export const Sticker = atom({
    key : "Sticker",
    default : []
})

export const Poster = atom({
    key : "Poster",
    default : []
})

export const fetchSticker = selector({
    key: 'fetchSticker',
    get: async ({ get }) => {
      try {
        const res = await fetch("https://theprintbackend.vercel.app/products/Sticker", {
          method: "GET",
          headers: {
            auth: localStorage.getItem("token"),
          },
        });
  
        if (!res.ok) {
          throw new Error(`Failed to fetch data. Status: ${res.status}`);
        }
  
        const data = await res.json();
        console.log("Running");
        console.log(data);
        return data;
      } catch (error) {
        toast.error("Couldn't able to fetch Products");
        // Rethrow the error to make sure it's not swallowed
        throw error;
      }
    },
  });

export const fetchPoster = selector({
    key : "fetchPoster",
    get : async({get}) =>{
        try {
            const res = await fetch("https://theprintbackend.vercel.app/products/Poster" , 
            {
              method : "GET",
              headers: {
                auth: localStorage.getItem("token"),
              },
            })
            if(!res.ok)
            {
                throw new Error(`Failed to fetch data. Status: ${res.status}`);
            }
            const data = await res.json();
            console.log("Running")
            console.log(data);
            get(Poster);
            return data;
          } catch (error) {
              toast.error("Something went wrong");
          }
    }
})