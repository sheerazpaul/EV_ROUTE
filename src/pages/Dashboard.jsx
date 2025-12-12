import React, { useState, useRef, useEffect } from "react";
import { NavLink, Outlet, Link } from "react-router-dom";
import { Button, User } from "@heroui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBorderAll,
  faMap,
  faCar,
  faRoute,
  faGear,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../Components/AuthContext";
import ThemeToggle from "../Components/ThemeToggle";
import { BASE_URL } from "../api.config";
const Dashboard = () => {
  const { user, logout } = useAuth();
  const [avatarPreview, setAvatarPreview] = useState("");
  console.log("User profile in Dashboard:", user);
  useEffect(() => {
    if (user?.profile_image) {
      console.log("profile_image:", BASE_URL,user?.profile_image);
      setAvatarPreview(`${BASE_URL}${user.profile_image}`);
    } else {
      setAvatarPreview("https://i.pravatar.cc/150?u=default");
    }
  }, [user]);
  console.log("Avatar preview URL:", avatarPreview);

  const handleLogout = () => {
    logout();
  };
  const menuItems = [
    { name: "Dashboard", icon: faBorderAll, to: "home" },
    { name: "Live Map", icon: faMap, to: "map" },
    { name: "My Garage", icon: faCar, to: "garage" },
    { name: "Trip Planner", icon: faRoute, to: "trip-planner" },
    { name: "Settings", icon: faGear, to: "/dashboard/settings" },
  ];

  return (
    <div className="h-full w-full dark:bg-[#101922] bg-white overflow-x-hidden">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="h-auto lg:h-[700px] w-full lg:w-[220px] flex flex-col border border-gray-600 shadow-lg rounded-md p-4">
          <Link
            to="/"
            className="text-xl font-bold dark:text-white text-gray-900 mb-4"
          >
            EV Route
          </Link>

          <div className="flex flex-col gap-3 h-auto">
            {menuItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `font-semibold dark:text-white text-white${
                    isActive ? " dark:bg-blue-900 rounded-md bg-gray-900" : ""
                  }`
                }
              >
                <Button
                  variant="light"
                  startContent={<FontAwesomeIcon icon={item.icon} />}
                  className="w-full text-left dark:text-white text-gray-900 font-semibold bg-blue-600 hover:bg-blue-200 dark:bg-gray-800 dark:hover:bg-gray-700 "
                >
                  {item.name}
                </Button>
              </NavLink>
            ))}
          </div>

          <div className="mt-4 lg:mt-auto gap-4">
            <hr className="text-gray-800" />
            {user && user.user ? (
              <div className="flex flex-col items-center gap-2 mt-2">
                <input type="file" accept="image/*" className="hidden" />
                <User
                  className="mt-2 cursor-pointer"
                  avatarProps={{ src: avatarPreview, alt: "User Avatar" }}
                  name={`${user.user.first_name} ${user.user.last_name}`}
                  description={user.user.email}
                />
              </div>
            ) : (
              <p className="text-center dark:text-white mt-2">
                Loading profile...
              </p>
            )}

            <Button
              color="primary"
              variant="light"
              className="font-semibold dark:text-white text-gray-900 hover:text-blue-800 mt-2 ml-6 mb-2"
              startContent={<FontAwesomeIcon icon={faArrowRightFromBracket} />}
              onPress={handleLogout}
            >
              Log Out
            </Button>
          </div>

          <ThemeToggle />
        </div>

        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
