import React, { useEffect, useState } from "react";
import { Button, Progress } from "@heroui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRoute, faChargingStation, faArrowRightArrowLeft } from "@fortawesome/free-solid-svg-icons";
import TripBox from "./TripBox"; 
import { useAuth } from "../Components/AuthContext";
const DashboardPage = () => {
  const {user} = useAuth();
  const [vehicle, setVehicle] = useState(null);
  useEffect(() => {
    const savedVehicle = JSON.parse(localStorage.getItem("selectedVehicle"));
     console.log("vehicle that fetch",savedVehicle );
    if (savedVehicle) {
      setVehicle(savedVehicle);
    } 
  }, [])
  return (
    <div className="p-6">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-6">
        <h2 className="text-2xl font-bold dark:text-white text-gray-900 mb-4 lg:mb-0">
          Welcome Back, {user?.user?.first_name}!
        </h2>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button
            color="primary"
            variant="solid"
            className="font-semibold dark:text-white text-gray-900 "
            startContent={<FontAwesomeIcon icon={faRoute} />}
          >
            Plan a New Trip
          </Button>
          <Button
            color="primary"
            variant="bordered"
            className="font-semibold dark:text-white text-gray-900"
            startContent={<FontAwesomeIcon icon={faChargingStation} />}
          >
            Find a Charger
          </Button>
        </div>
      </div>

      <h3 className="dark:text-white text-gray-900 font-semibold mb-3">My Garage</h3>
      {vehicle ? (
        <div className="flex flex-col md:flex-row h-auto md:h-[170px] w-full md:w-[700px] border border-gray-600 shadow-sm rounded-lg p-4 gap-4">
          <div className="flex-1">
            <h3 className="text-xl font-semibold dark:text-white text-gray-900 mb-2">
              My {vehicle.brand} {vehicle.model}
            </h3>
            <Progress className="mt-3 w-full md:w-[400px]" size="md" value={75} />
            <p className="text-gray-500 text-sm mt-4">
              Estimated Range: {vehicle.range_km || "N/A"} km
            </p>
            <Button
              color="primary"
              variant="bordered"
              className="font-semibold dark:text-white text-gray-900 hover:text-blue-800 mt-2"
              startContent={<FontAwesomeIcon icon={faArrowRightArrowLeft} />}
            >
              Change Vehicle
            </Button>
          </div>
          <div className="flex justify-center items-center mt-4 md:mt-0">
            <img
              className="h-[130px] w-[130px] rounded-lg object-cover"
              src={vehicle.image || "/images/car-1.jpg"}
              alt={`${vehicle.brand} ${vehicle.model}`}
            />
          </div>
        </div>
      ) : (
        <p className="text-gray-500">No vehicle saved. Please add a vehicle in your Garage.</p>
      )}

      <h3 className="dark:text-white text-gray-900 font-semibold mb-3 mt-5">Recent Trips</h3>
      <TripBox />
    </div>
  );
};

export default DashboardPage;
