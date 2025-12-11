import React, { useState } from "react";
import ProfilePage from "./ProfilePage";
import SecurityPage from "./SecurityPage";
import PasswordUpdate from "./PasswordUpdate";
import AccountPrivacy from "./AccountPrivacy";
import DevicePermissions from "./DevicePremission";
import { Button } from "@heroui/react";
import { useNavigate } from "react-router-dom";

export default function SettingsLayout() {
  const [activePage, setActivePage] = useState("profile");
  const navigate = useNavigate();
  const pages = {
    profile: <ProfilePage />,
    security: <SecurityPage />,
    password: <PasswordUpdate />,
    privacy: <AccountPrivacy />,
    devices: <DevicePermissions />,
  };

  const links = [
    { id: "profile", label: "Profile" },
    { id: "security", label: "Security" },
    { id: "password", label: "Password Update" },
    { id: "privacy", label: "Account Privacy" },
    { id: "devices", label: "Device Permissions" },
  ];

  return (
    <div className="flex flex-col md:flex-row w-full h-[640px] dark:bg-[#0F172A] bg-white">
      <div className="w-full md:w-64 bg-white dark:bg-gray-800 p-4 sm:p-6 border-b md:border-b-0 md:border-r border-gray-300 dark:border-gray-700">
        <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-white">
          Settings
        </h1>
        <nav className="flex flex-col gap-2 sm:gap-3">
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => setActivePage(link.id)}
              className={`text-left px-3 sm:px-4 py-2 rounded-lg w-full font-medium text-sm sm:text-base ${
                activePage === link.id
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="flex-1 p-4 sm:p-6 overflow-y-auto relative">
        {pages[activePage]}

        <div className="md:mt-6 relative">
          <Button
            variant="light"
            className="  font-semibold rounded-lg p-2 sm:p-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 mt-30 md:ml-[800px]"
            onClick={() => navigate("/dashboard/home")}
          >
            ← Back to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}
