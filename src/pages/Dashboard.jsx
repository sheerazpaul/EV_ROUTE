import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    if (user?.profile_image) {
      setAvatarPreview(`${BASE_URL}${user.profile_image}`);
    } else {
      setAvatarPreview("https://i.pravatar.cc/150?u=default");
    }
  }, [user]);

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
    <div className="min-h-screen w-full dark:bg-[#101922] bg-white overflow-x-hidden">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:h-[700px] w-full lg:w-[220px] flex flex-col border border-gray-600 shadow-lg rounded-md p-4">
          <Link
            to="/"
            className="text-xl font-bold dark:text-white text-gray-900 mb-4"
          >
            EV Route
          </Link>

          <div className="flex flex-col gap-3">
            {menuItems.map((item) => (
              <Button
                key={item.to}
                as={NavLink}
                to={item.to}
                variant="light"
                startContent={<FontAwesomeIcon icon={item.icon} />}
                className={({ isActive }) =>
                  `w-full justify-start font-semibold
                  ${
                    isActive
                      ? "bg-gray-900 dark:bg-blue-900 text-white"
                      : "bg-blue-600 dark:bg-gray-800 text-gray-900 dark:text-white"
                  }
                  hover:bg-blue-200 dark:hover:bg-gray-700`
                }
              >
                {item.name}
              </Button>
            ))}
          </div>

          <div className="mt-4 lg:mt-auto">
            <hr className="my-2 border-gray-700" />

            {user?.user ? (
              <div className="flex flex-col items-center gap-2">
                <User
                  avatarProps={{ src: avatarPreview }}
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
              type="button"
              variant="light"
              className="font-semibold dark:text-white text-gray-900 m-2"
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
