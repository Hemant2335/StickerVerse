"use client";

import React from "react";
import { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";

const page = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  let myChart: Chart<"line"> | null = null;

  useEffect(() => {
    // Destroy existing chart before rendering a new one
    if (myChart) {
      myChart.destroy();
    }
    Chart.defaults.font.size = 10;
    Chart.defaults.font.weight = 700;
    Chart.defaults.font.family = "Poppins";
    // Render new chart
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        myChart = new Chart(ctx, {
          type: "line",
          data: {
            labels: [
              "January",
              "Febrary",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
            ],
            datasets: [
              {
                label: "Users Visited",
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(255, 206, 86, 0.2)",
                  "rgba(75, 192, 192, 0.2)",
                  "rgba(153, 102, 255, 0.2)",
                  "rgba(255, 159, 64, 0.2)",
                ],
                borderColor: [
                  "rgba(255, 99, 132, 1)",
                  "rgba(54, 162, 235, 1)",
                  "rgba(255, 206, 86, 1)",
                  "rgba(75, 192, 192, 1)",
                  "rgba(153, 102, 255, 1)",
                  "rgba(255, 159, 64, 1)",
                ],
                borderWidth: 5,
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
              x: {
                beginAtZero: true,
              },
            },
            plugins: {
              legend: {
                labels: {
                  font: {
                    size: 15,
                    weight: 400,
                  },
                },
              },
            },
          },
        });
      }
    }

    // Cleanup function to destroy chart when component unmounts
    return () => {
      if (myChart) {
        myChart.destroy();
      }
    };
  }, []); // Empty dependency array to run effect only once

  return (
    <>
      {/* Main Content */}
      <div className="w-full  flex flex-col md:px-4 items-center h-fit ">
        <h1 className="w-full h-fit border-b-2 pb-2 font-semibold text-xl">
          OverView
        </h1>
        {/* Graph */}
        <div className="w-[60vw] h-fit shadow-2xl rounded-xl">
          <canvas
            ref={canvasRef}
            id="myChart"
            className="w-full h-full"
          ></canvas>
        </div>

        {/* Stats */}
        <h1 className="w-full mt-[5vh] h-fit border-b-2 pb-2 font-semibold text-xl">
          Statistics
        </h1>
        <div>
          <div className="w-full md:flex gap-4 mt-4">
            <div className="md:w-[20vw] w-full h-[20vh] bg-white shadow-2xl rounded-xl p-4">
              <h1 className="text-xl font-semibold">Total Users</h1>
              <h1 className="text-5xl font-semibold text-orange-500">100</h1>
            </div>
            <div className="md:w-[20vw] w-full h-[20vh] bg-white shadow-2xl rounded-xl p-4">
              <h1 className="text-xl font-semibold">Total Orders</h1>
              <h1 className="text-5xl font-semibold text-gray-400">100</h1>
            </div>
            <div className="w-[20vw] h-[20vh] bg-white shadow-2xl rounded-xl p-4">
              <h1 className="text-xl font-semibold">Total Revenue</h1>
              <h1 className="text-5xl font-semibold text-green-500">100</h1>
            </div>
          </div>
        </div>

        {/* Options */}
        <h1 className="w-full mt-[5vh] h-fit border-b-2 pb-2 font-semibold text-xl">
          Options
        </h1>
        <div className="mb-[5vh]">
          <div className="w-full md:flex gap-4 mt-4">
            <div className="w-[20vw] h-[20vh] flex items-center justify-center bg-white shadow-2xl rounded-xl p-4">
              <h1 className="text-xl font-semibold">Inventory</h1>
            </div>
            <div className="w-[20vw] h-[20vh] flex items-center justify-center bg-white shadow-2xl rounded-xl p-4">
              <h1 className="text-xl font-semibold">Orders</h1>
            </div>
            <div className="w-[20vw] h-[20vh] flex items-center justify-center bg-white shadow-2xl rounded-xl p-4">
              <h1 className="text-xl font-semibold">Products</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
