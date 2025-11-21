import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChargingStation } from "@fortawesome/free-solid-svg-icons";
import { Input, Button } from "@heroui/react";
import { useState } from "react";
import { Link } from "react-router-dom";
function Login() {
  const [value, setValue] = useState("");
  const [password, setPassword] = useState("");
  return (
    <>
      <div className="flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-[300px] px-4 lg:px-10">
        <div className="group  bg-[url('/images/car-1.jpg')] h-[300px] sm:h-[400px] md:h-[400px] lg:h-[600px] w-full sm:w-[400px] bg-cover bg-center rounded-xl overflow-hidden flex justify-center items-center mt-20 flex-col text-center px-3">
          <h1 className="dark:text-white text-gray-500 text-2xl sm:text-3xl font-semibold mt-[200px] sm:mt-[300px] md:mt-[400px] lg:mt-[500px]">
            Find Your Next Charge, Effortlessly,
          </h1>
          <p className="text-gray-300 mt-3 text-sm sm:text-base">
            Join a community of EV drivers finding the best charging station.
          </p>
        </div>
        <div className="flex flex-col gap-5 mt-10 w-full sm:w-[380px] max-w-[400px]">
          <div className="flex gap-2 items-center justify-center sm:justify-start">
            <FontAwesomeIcon icon={faChargingStation} className="text-[#0f71d8]" size="2x" />
            <h3 className="dark:text-white font-semibold text-2xl text-gray-900">ChargeFinder</h3>
          </div>

          <div className="text-center sm:text-left">
            <h1 className="dark:text-white font-bold text-3xl sm:text-4xl text-gray-900">Welcome Back!</h1>
            <p className="dark:text-gray-400 text-gray-900">Login in to find your next charge</p>
          </div>

          <div>
            <div className="flex flex-col gap-2 mb-3">
              <h1 className="dark:text-white mt-1 font-semibold text-gray-900">Email</h1>
              <Input
                isClearable
                key="outside"
                labelPlacement="outside"
                placeholder="you@example.com"
                type="email"
                size="lg"
                color="default"
                variant="faded"
                radius="sm"
                onClear={() => console.log("input cleared")}
                className="w-full"
                value={value}
                onValueChange={setValue}
              />
            </div>

            <div className="flex flex-col gap-2 mt-3">
              <div className="flex justify-between items-center">
                 <h1 className="dark:text-white mt-1 font-semibold text-gray-900">password</h1>
                <Link to="/forgot" className="text-sm text-blue-700 mt-1">Forgot Password?</Link>
              </div>

              <Input
                isClearable
                key="outside"
                labelPlacement="outside"
                placeholder="Enter your password"
                type="password"
                size="lg"
                color="default"
                variant="faded"
                radius="sm"
                onClear={() => console.log("input cleared")}
                className="w-full"
                value={password}
                onValueChange={setPassword}
              />
            </div>

            <div className="mt-5">
              <Link to="/dashboard">
              <Button color="primary" className="w-full font-semibold" radius="sm" size="lg">
                Login
              </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
