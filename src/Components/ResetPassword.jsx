import React, { useState, useEffect } from "react";
import { Input, Button } from "@heroui/react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { RESET_PASSWORD_CONFIRM } from "../api.config.js";
function Resetpassword() {
  const { uid, token } = useParams(); 
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(
        `${RESET_PASSWORD_CONFIRM}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            uid,
            token,
            new_password: newPassword,
            re_new_password: confirmPassword,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setSuccess("Password reset successful! Redirecting to login...");
        setError("");
        setTimeout(() => navigate("/login"),5000); 
      } else {
        setError(data.detail || "Something went wrong. Try again.");
      }
    } catch (err) {
      console.error(err);
      setError("Network error. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center px-4 dark:bg-[#101922] bg-white ">
      <div className="w-full max-w-md p-6 bg-white dark:bg-black rounded shadow-md border-1 border-gray-300">
        <h1 className="text-2xl font-bold text-center dark:text-white mb-4">
          Reset Password
        </h1>
        {error && <p className="text-red-500 mb-3">{error}</p>}
        {success && <p className="text-green-500 mb-3">{success}</p>}

        <form className="flex flex-col gap-3" onSubmit={handleReset}>
          <div className="flex flex-col gap-1">
            <label className="dark:text-white">New Password</label>
            <Input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="dark:text-white">Confirm Password</label>
            <Input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full"
            />
          </div>

          <Button type="submit" color="primary" className="w-full mt-2">
            Reset Password
          </Button>
        </form>

        <div className="text-center mt-4">
          <Link to="/login" className="text-blue-600 hover:underline">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Resetpassword;
