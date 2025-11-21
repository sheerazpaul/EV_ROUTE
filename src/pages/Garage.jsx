import React from "react";
import ListDetail from "../Components/ListDetail";
import Specifications from "../Components/Specifications";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBatteryFull,
  faGaugeSimpleHigh,
  faPlug,
  faBolt,
} from "@fortawesome/free-solid-svg-icons";
import {Button} from "@heroui/react";
function Garage() {
  return (
    <>
      <div className="ml-6 max-w-full md:ml-6  px-2">
  <h1 className="dark:text-white text-gray-900 font-bold text-4xl">Add Your Vehicle</h1>
  <p className="text-gray-500 mt-2">
    Select your vehicle's make and model to automatically add its details.
  </p>

  <div className="flex flex-col md:flex-row mt-3 gap-5">
    <ListDetail head="Make" model="Tesla" />
    <ListDetail head="Model" model="Model 3" />
  </div>

  <div className="w-full md:w-[720px] h-auto md:h-[350px] shadow-md border-1 border-gray-600 rounded-lg mt-6 flex flex-col justify-between p-4">
    <div className="flex justify-center items-center flex-col mt-5 gap-1">
      <img
        className="w-[130px] h-[130px] object-cover rounded-sm"
        src="/images/car-3.jpg"
        alt=""
      />
      <h1 className="dark:text-white text-gray-900 font-semibold">Tesla Model 3 Long Range</h1>
      <p className="text-gray-500 text-sm">
        your selected vehicle details are dispalyed below.
      </p>
    </div>

    <div className="m-3 flex  gap-4 justify-center md:justify-start">
      <Specifications icon={<FontAwesomeIcon icon={faBatteryFull} />} title="Battery" properties="75 kwh" />
      <Specifications icon={<FontAwesomeIcon icon={faGaugeSimpleHigh} />} title="Range" properties="358 miles" />
      <Specifications icon={<FontAwesomeIcon icon={faPlug} />} title="Port Type" properties="CCS" />
      <Specifications icon={<FontAwesomeIcon icon={faBolt} />} title="Max Charge" properties="250 kw" />
    </div>
  </div>

  <div className="flex mt-6 justify-center  md:ml-[500px]">
    <Button color="primary" className="font-semibold">
      Save Venicle
    </Button>
  </div>
</div>

    </>
  );
}

export default Garage;
