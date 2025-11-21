
import React from "react";
import {  Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";
function Hero() {
   const { dark } = useContext(ThemeContext);
  return (
    <div className="group bg-[url('/images/car-4.jpg')] dark:bg-[url('/images/car-6.jpg')] h-[400px] sm:h-[450px] md:h-[500px] w-full bg-cover bg-center rounded-2xl mx-auto my-5 px-4 flex justify-center items-center overflow-hidden">
      <div className="inset-0 bg-black/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="relative flex flex-col items-center gap-4 text-center px-4 sm:px-6 md:px-10 opacity-0 group-hover:opacity-100 transition-all duration-700 transform group-hover:translate-y-0 translate-y-5">
        <div className="max-w-[700px]">
          <h1 className= "dark:text-white text-gray-900 text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
            Effortless EV Journey, Planned for
          </h1>
          <span className="block text-gray-900  dark:text-white text-2xl sm:text-3xl md:text-4xl font-bold mt-1">
            you.
          </span>
        </div>

        <div className="max-w-[600px]">
          <p className="dark:text-white text-sm sm:text-base  text-gray-900 ">
            Discover thousands of charging stations and plan your route with
            confidence.
          </p>
          <span className="block dark:text-white text-sm sm:text-base  text-gray-900 ">
            Never worry about range again.
          </span>
        </div>
        <Link  className="h-9 w-38 p-1 sm:w-36 dark:bg-blue-500 bg-gray-100 rounded-lg font-semibold hover:bg-blue-700 transition dark:text-white text-gray-900 cursor-pointer mt-2">
          Plan Your First Trip
        </Link>
      </div>
    </div>
  );
}

export default Hero;
