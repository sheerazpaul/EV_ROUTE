import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChargingStation } from "@fortawesome/free-solid-svg-icons";
import { Input, Button } from "@heroui/react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Components/AuthContext";
import NaveBar from "../Components/Navbar-second.jsx";
function Login() {
  const [username, setUserName] = useState("");  
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
const handleLogin = async () => {
  const res = await login(username, password);

  if (res.success) {
    navigate("/dashboard/home");
  } else {
    setError(res.message);
  }
};
  return (
    <>
    <NaveBar title="Don't have an account?" link="/register" button="Sign Up" />
    <div className="flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-[300px] px-4 lg:px-10 p-5">
      <div className="group dark:bg-[url('/images/car-1.jpg')] bg-[url('/images/car-7.jpg')]  h-[300px] sm:h-[400px] md:h-[480px] lg:h-[600px] w-full sm:w-[400px] bg-cover bg-center rounded-xl overflow-hidden flex justify-center items-center mt-10 flex-col text-center px-3">
        <h1 className="dark:text-white text-gray-700 text-2xl sm:text-3xl font-semibold mt-[200px] sm:mt-[300px] md:mt-[400px] lg:mt-[400px]">
          Find Your Next Charge, Effortlessly,
        </h1>
        <p className="text-gray-300  text-sm sm:text-base">
          Join a community of EV drivers finding the best charging station.
        </p>
      </div>

      <div className="flex flex-col gap-5 mt-10 w-full sm:w-[380px] max-w-[400px]">
        <div className="flex gap-2 items-center justify-center sm:justify-start">
          <FontAwesomeIcon
            icon={faChargingStation}
            className="text-[#0f71d8]"
            size="2x"
          />
          <h3 className="dark:text-white font-semibold text-2xl text-gray-900">
            ChargeFinder
          </h3>
        </div>

        <div className="text-center sm:text-left">
          <h1 className="dark:text-white font-bold text-3xl sm:text-4xl text-gray-900">
            Welcome Back!
          </h1>
          <p className="dark:text-gray-400 text-gray-900">
            Login to find your next charge
          </p>
        </div>

        <div>
          {error && <p className="text-red-500">{error}</p>}

          <div className="flex flex-col gap-2 mb-3">
            <h1 className="dark:text-white mt-1 font-semibold text-gray-900">
              Username
            </h1>
            <Input
              placeholder="Enter your username or email"
              type="text"
              size="lg"
              color="default"
              variant="faded"
              radius="sm"
              className="w-full"
              value={username}
              onValueChange={setUserName}
            />
          </div>

          <div className="flex flex-col gap-2 mt-3">
            <div className="flex justify-between items-center">
              <h1 className="dark:text-white mt-1 font-semibold text-gray-900">
                Password
              </h1>
              <Link to="/forgot" className="text-sm text-blue-700 mt-1">
                Forgot Password?
              </Link>
            </div>

            <Input
              placeholder="Enter your password"
              type="password"
              size="lg"
              color="default"
              variant="faded"
              radius="sm"
              className="w-full"
              value={password}
              onValueChange={setPassword}
            />
          </div>
          <div className="mt-5">
            <Button
              onPress={handleLogin}
              color="primary"
              className="w-full font-semibold"
              radius="sm"
              size="lg"
            >
              Login
            </Button>
          </div>

          <p className="text-center text-sm mt-3">
            Don’t have an account?{" "}
            <Link to="/register" className="text-blue-700">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
    </>
  );
}

export default Login;
