import React, { useEffect, useState } from "react";
import ListDetail from "../Components/ListDetail";
import Specifications from "../Components/Specifications";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBatteryFull,
  faGaugeSimpleHigh,
  faPlug,
  faBolt,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "@heroui/react";
import { USER_PROFILE_URL, VEHICAL_DATA_URL } from "../api.config";
import { useNavigate } from "react-router-dom";

function Garage() {
  const [vehicleData, setVehicleData] = useState([]);
  const [selectedMake, setSelectedMake] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [currentVehicle, setCurrentVehicle] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchVehicleData = async () => {
      try {
        const res = await fetch(VEHICAL_DATA_URL);
        const data = await res.json();
        setVehicleData(data);
      } catch (error) {
        console.error("Failed to fetch vehicle data:", error);
      }
    };
    fetchVehicleData();
  }, []);


  const brands = [...new Set(vehicleData.map((v) => v.brand))];
  const models = vehicleData
    .filter((v) => v.brand === selectedMake)
    .map((v) => v.model);

  useEffect(() => {
    if (selectedMake && models.length > 0) {
      setSelectedModel(models[0]);
    } else {
      setSelectedModel("");
      setCurrentVehicle(null);
    }
  }, [selectedMake, vehicleData]);

  useEffect(() => {
    if (selectedMake && selectedModel) {
      const car = vehicleData.find(
        (v) => v.brand === selectedMake && v.model === selectedModel
      );
      setCurrentVehicle(car || null);
    }
  }, [selectedMake, selectedModel, vehicleData]);

 
  const handleSaveVehicle = async () => {
    if (!currentVehicle) {
      alert("Please select a vehicle first.");
      return;
    }

    try {
      const token = localStorage.getItem("access");

     
      const profileRes = await fetch(USER_PROFILE_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!profileRes.ok) throw new Error("Failed to fetch profile");
      const profileData = await profileRes.json();

      const updatedVehicleIds = profileData.vehicles
        ? profileData.vehicles.map((v) => v.id)
        : [];

      if (!updatedVehicleIds.includes(currentVehicle.id)) {
        updatedVehicleIds.push(currentVehicle.id);
      }

  
      const res = await fetch(USER_PROFILE_URL, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ vehicle_ids: updatedVehicleIds }),
      });
      if (!res.ok) throw new Error("Failed to save vehicle");

      alert(
        `${currentVehicle.brand} ${currentVehicle.model} selected successfully!`
      );
      navigate("/dashboard/garage");
    } catch (err) {
      console.error(err);
      alert("Failed to save vehicle. Please try again.");
    }
  };

  return (
    <div className="ml-6 max-w-full md:ml-6 px-4">
      <h1 className="dark:text-white text-gray-900 font-bold text-4xl">
        Select Your Vehicle
      </h1>
      <p className="text-gray-500 mt-2">
        Select your vehicle's make and model to add it to My Garage.
      </p>

      <div className="flex flex-col md:flex-row mt-3 gap-5">
        <ListDetail
          head="Make"
          model={selectedMake}
          options={brands}
          onChange={setSelectedMake}
        />
        <ListDetail
          head="Model"
          model={selectedModel}
          options={selectedMake === "" ? [] : models}
          onChange={setSelectedModel}
        />
      </div>

      {currentVehicle && (
        <div className="w-full md:w-[720px] h-auto md:h-[350px] shadow-md border border-gray-600 rounded-lg mt-6 flex flex-col justify-between p-4 sm:w-auto">
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
        </div>
      )}

      <div className="flex mb-2 justify-center md:ml-[720px]">
        <Button
          color="primary"
          className="font-semibold mt-2"
          onPress={handleSaveVehicle}
        >
          Add to My Garage
        </Button>
      </div>
    </div>
  );
}

export default Garage;
