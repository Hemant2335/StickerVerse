"use client";

import lottie from "lottie-web";
import animationdata from "../Assets/loading.json";
import { useEffect } from "react";

import React from 'react'

const Loading = () => {
    useEffect(() => {
        // Initialize the animation when the component mounts
        const animationContainer = document.getElementById('lottie-animation');
        if (animationContainer) {
          lottie.loadAnimation({
            container: animationContainer,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: animationdata,
          });
        }
      }, []);
  
  return (
    <div className=" fixed flex h-[100vh] w-screen top-0 left-0 justify-center items-center  z-10 bg-[rgba(34,34,34,0.5)]">
        <div className="loading" id="lottie-animation" style={{height : "25vh" , width : "200px"}}></div>
    </div>
  )
}

export default Loading