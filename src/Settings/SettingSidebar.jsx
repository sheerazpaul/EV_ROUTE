import React from "react";
import { NavLink } from "react-router-dom";
import { Button } from "@heroui/react";

const links = [
  { id: "profile", label: "Profile", to: "profile" },
  { id: "security", label: "Security", to: "security" },
  { id: "password", label: "Password Update", to: "password" },
  { id: "privacy", label: "Account Privacy", to: "privacy" },
  { id: "devices", label: "Device Permissions", to: "devices" },
];

export default function SettingSidebar() {
  return (
    <div className="flex flex-col justify-between h-full bg-white dark:bg-gray-800 rounded-xl shadow p-4 sm:p-6 border border-gray-200 dark:border-gray-700 w-full sm:w-64">
      <div>
        <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-gray-900 dark:text-white">Settings</h2>
        <nav className="flex flex-col gap-2 sm:gap-3">
          {links.map((link) => (
            <NavLink
              key={link.id}
              to={link.to}
              end
              className={({ isActive }) =>
                `block w-full text-left ${isActive ? "text-white" : "text-gray-800 dark:text-gray-200"}`
              }
            >
              {({ isActive }) => (
                <Button
                  variant="light"
                  className={`w-full justify-start font-semibold rounded-lg p-2 sm:p-3 text-sm sm:text-base ${
                    isActive
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200"
                  }`}
                >
                  {link.label}
                </Button>
              )}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
}
