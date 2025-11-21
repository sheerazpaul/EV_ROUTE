import { Button } from "@heroui/react";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBorderAll,
  faMap,
  faCar,
  faRoute,
  faGear,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { User } from "@heroui/react";
import { Outlet } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";
const Dashboard = () => {
  return (
    <div className="h-full w-full dark:bg-[#101922] bg-white overflow-x-hidden">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="h-auto lg:h-[700px] w-full lg:w-[220px] flex flex-col border-1 border-gray-600 shadow-lg rounded-md p-4">
          <h1 className="text-xl font-bold dark:text-white text-gray-900">EV Route</h1>
          <div className="mt-2 flex flex-col gap-3 h-auto">
            <Link to="home">
              <Button
                color="primary"
                variant="light"
                className="font-semibold dark:text-white text-gray-900 hover:text-blue-800"
                startContent={<FontAwesomeIcon icon={faBorderAll} />}
              >
                Dashboard
              </Button>
            </Link>
            <Link>
              <Button
                color="primary"
                variant="light"
                className="font-semibold dark:text-white text-gray-900 hover:text-blue-800"
                startContent={<FontAwesomeIcon icon={faMap} />}
              >
                Live Map
              </Button>
            </Link>
            <Link to="garage">
              <Button
                color="primary"
                variant="light"
                className="font-semibold dark:text-white text-gray-900 hover:text-blue-800"
                startContent={<FontAwesomeIcon icon={faCar} />}
              >
                My Garage
              </Button>
            </Link>
            <Link>
            <Button
              color="primary"
              variant="light"
              className="font-semibold dark:text-white text-gray-900 hover:text-blue-800"
              startContent={<FontAwesomeIcon icon={faRoute} />}
            >
              Trip Planner
            </Button>
            </Link>
            <Link>
            <Button
              color="primary"
              variant="light"
              className="font-semibold dark:text-white text-gray-900 hover:text-blue-800"
              startContent={<FontAwesomeIcon icon={faGear} />}
            >
              Setting
            </Button>
            </Link>
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
            <Link to="/">
              <Button
                color="primary"
                variant="light"
                className="font-semibold dark:text-white text-gray-900 hover:text-blue-800 mt-2"
                startContent={
                  <FontAwesomeIcon icon={faArrowRightFromBracket} />
                }
              >
                Log Out
              </Button>
            </Link>
          </div>
        </div>
   <div className="flex-1 p-6">
        <Outlet />  
      </div>   
      </div>
    </div>
  );
};

export default Dashboard;
