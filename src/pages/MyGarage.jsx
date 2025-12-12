import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBatteryFull,
  faGaugeSimpleHigh,
  faPlug,
  faBolt,
  faTrash
} from "@fortawesome/free-solid-svg-icons";
import Specifications from "../Components/Specifications";
import { USER_PROFILE_URL } from "../api.config";

function MyGarage() {
  const [savedVehicles, setSavedVehicles] = useState([]);
  const [currentVehicle, setCurrentVehicle] = useState(null);

  useEffect(() => {
    const fetchSavedVehicles = async () => {
      try {
        const token = localStorage.getItem("access");
        const res = await fetch(USER_PROFILE_URL, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch profile");
        const profileData = await res.json();
        const vehicles = profileData.vehicles || [];
        setSavedVehicles(vehicles);
        if (vehicles.length > 0) setCurrentVehicle(vehicles[0]); 
      } catch (err) {
        console.error(err);
      }
    };
    fetchSavedVehicles();
  }, []);

  const handleRemoveVehicle = async () => {
    if (!currentVehicle) return;

    try {
      const token = localStorage.getItem("access");
      const updatedVehicles = savedVehicles.filter(
        (v) => v.id !== currentVehicle.id
      );

   
      const res = await fetch(USER_PROFILE_URL, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ vehicles: updatedVehicles }),
      });
      if (!res.ok) throw new Error("Failed to remove vehicle");

      setSavedVehicles(updatedVehicles);

      setCurrentVehicle(updatedVehicles[0] || null);
    } catch (err) {
      console.error(err);
      alert("Failed to remove vehicle. Please try again.");
    }
  };

  return (
    <div className="ml-6 max-w-full md:ml-6 px-4">
      <h1 className="dark:text-white text-gray-900 font-bold text-4xl mt-4">
        My Garage
      </h1>

      {savedVehicles.length > 0 && (
        <div className="flex overflow-x-auto gap-4 mt-4 p-2">
          {savedVehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              className={`flex-shrink-0 w-36 h-36 rounded-lg shadow-md cursor-pointer border-2 ${
                currentVehicle?.id === vehicle.id
                  ? "border-blue-600"
                  : "border-gray-300"
              }`}
              onClick={() => setCurrentVehicle(vehicle)}
            >
              <img
                src={vehicle.image || "/images/car-3.jpg"}
                alt={`${vehicle.brand} ${vehicle.model}`}
                className="w-full h-24 object-cover rounded-t-lg"
              />
              <div className="p-2 text-center">
                <p className="text-sm font-semibold text-gray-800 dark:text-white">
                  {vehicle.brand} {vehicle.model}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {currentVehicle && (
        <div className="w-full md:w-[720px] h-auto md:h-[350px] shadow-md border border-gray-600 rounded-lg mt-6 flex flex-col justify-between p-4 sm:w-auto relative">
          <div className="flex justify-center items-center flex-col mt-5 gap-1">
            <img
              className="w-[130px] h-[130px] object-cover rounded-sm"
              src={currentVehicle.image || "/images/car-3.jpg"}
              alt=""
            />
            <h1 className="dark:text-white text-gray-900 font-bold">
              {currentVehicle.brand} {currentVehicle.model}
            </h1>
            <p className="text-gray-500 text-sm">
              Your selected vehicle details are displayed below.
            </p>
          </div>

          <div className="m-3 flex gap-2 justify-center md:justify-start">
            <Specifications
              icon={<FontAwesomeIcon icon={faBatteryFull} />}
              title="Battery"
              properties={currentVehicle.battery_capacity_kWh || "N/A"}
              valueUnit="kWh"
              className="w-full sm:w-[48%] md:w-[170px]"
            />
            <Specifications
              icon={<FontAwesomeIcon icon={faGaugeSimpleHigh} />}
              title="Range"
              properties={currentVehicle.range_km || "N/A"}
              valueUnit="km"
              className="w-full sm:w-[48%] md:w-[170px]"
            />
            <Specifications
              icon={<FontAwesomeIcon icon={faPlug} />}
              title="Port Type"
              properties={currentVehicle.connector_type || "N/A"}
              valueUnit=""
              className="w-full sm:w-[48%] md:w-[170px]"
            />
            <Specifications
              icon={<FontAwesomeIcon icon={faBolt} />}
              title="Max Charge"
              properties={currentVehicle.max_charging_power_kW || "N/A"}
              valueUnit="kW"
              className="w-full sm:w-[48%] md:w-[170px]"
            />
          </div>

          <button
            className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700"
            onClick={handleRemoveVehicle}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      )}

      {savedVehicles.length === 0 && (
        <p className="text-gray-500 mt-4">
          You haven't added any vehicles yet.
        </p>
      )}
    </div>
  );
}

export default MyGarage;
