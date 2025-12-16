import React, { useState } from "react";
import ProfilePage from "./ProfilePage";
import SecurityPage from "./SecurityPage";
import PasswordUpdate from "./PasswordUpdate";
import AccountPrivacy from "./AccountPrivacy";
import DevicePermissions from "./DevicePremission";
import { Button } from "@heroui/react";
import { useNavigate } from "react-router-dom";
import Garage from "./Garage";

export default function SettingsLayout() {
  const [activePage, setActivePage] = useState("profile");
  const navigate = useNavigate();

  const pages = {
    profile: <ProfilePage />,
    security: <SecurityPage />,
    password: <PasswordUpdate />,
    privacy: <AccountPrivacy />,
    devices: <DevicePermissions />,
    garage: <Garage />,
  };

  const links = [
    { id: "profile", label: "Profile" },
    { id: "security", label: "Security" },
    { id: "password", label: "Password Update" },
    { id: "privacy", label: "Account Privacy" },
    { id: "devices", label: "Device Permissions" },
    { id: "garage", label: "Garage" },
  ];

  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen bg-gray-100 dark:bg-[#0F172A]">
      
      {/* Sidebar */}
      <div className="md:w-64 w-full bg-white dark:bg-gray-900 border-b md:border-b-0 md:border-r border-gray-300 dark:border-gray-700 p-4 md:p-6 shadow-sm">
        <h1 className="text-xl md:text-2xl font-bold mb-4 md:mb-8 text-gray-900 dark:text-white text-center md:text-left">
          Settings
        </h1>

        <nav className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible">
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => setActivePage(link.id)}
              className={`whitespace-nowrap px-4 py-2 md:py-3 rounded-xl text-left font-medium transition-all duration-200
                ${
                  activePage === link.id
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800"
                }
              `}
            >
              {link.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div className="flex-1 p-3 md:p-6 overflow-y-auto">
        <div className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-xl shadow-lg min-h-full">
          {pages[activePage]}

          <div className="mt-6 md:mt-9 flex justify-end">
            <Button
              variant="light"
              className="px-4 py-3 font-semibold rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all text-gray-800 dark:text-gray-200"
              onClick={() => navigate("/dashboard/home")}
            >
              ← Back to Dashboard
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
