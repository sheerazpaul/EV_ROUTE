import React from "react";
import { NavLink, useNavigate, Outlet } from "react-router-dom";
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


const Dashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
  };
  const menuItems = [
    { name: "Dashboard", icon: faBorderAll, to: "home" },
    { name: "Live Map", icon: faMap, to: "map" },
    { name: "My Garage", icon: faCar, to: "garage" },
    { name: "Trip Planner", icon: faRoute, to: "trip-planner" },
    { name: "Settings", icon: faGear, to: "settings" },
  ];

  return (
    <div className="h-full w-full dark:bg-[#101922] bg-white overflow-x-hidden">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="h-auto lg:h-[700px] w-full lg:w-[220px] flex flex-col border border-gray-600 shadow-lg rounded-md p-4">
          <h1 className="text-xl font-bold dark:text-white text-gray-900 mb-4">
            EV Route
          </h1>

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
            <User
              className="mt-2 dark:text-white text-gray-900"
              avatarProps={{
                src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
              }}
              description="Product Designer"
              name="Sarah K."
            />
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
          <ThemeToggle/>
        </div>
        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
