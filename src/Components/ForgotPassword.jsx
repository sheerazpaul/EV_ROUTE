import React, { useState, useEffect } from "react";
import { Input, Button } from "@heroui/react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const { forgotPassword } = useAuth(); 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await forgotPassword(
        email,
        "http://localhost:5173/reset"
      );
      alert("Password reset email sent! Check your inbox.");
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center px-4 sm:px-6 md:px-8 dark:bg-[#101922] bg-white  ">
      <div className="flex flex-col gap-3 justify-center w-full max-w-md">
        <div className="w-full rounded-md dark:bg-black bg-white flex flex-col p-5 sm:p-6 md:p-7 shadow-lg border-1 border-gray-300">
          <h1 className="dark:text-white text-black font-bold text-center text-xl sm:text-2xl md:text-3xl mb-2">
           Enter your Email
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 text-center mb-4">
            Enter the email address associated with your account, and we'll send
            you a link to reset your password
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full">
            <div className="flex flex-col gap-2 mb-3 w-full">
              <h1 className="dark:text-white text-black mt-1 text-sm sm:text-base">
                Email Address
              </h1>
              <Input
                isClearable
                labelPlacement="outside"
                placeholder="Enter your email"
                type="email"
                size="sm"
                variant="bordered"
                radius="sm"
                className="w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <Button
              color="primary"
              className="w-full font-semibold"
              radius="sm"
              size="md"
              type="submit"
            >
              Send
            </Button>
          </form>

          <div className="text-sm underline text-gray-500 flex justify-center mt-4 hover:text-gray-700">
            <Link to="/login">Return to login</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
