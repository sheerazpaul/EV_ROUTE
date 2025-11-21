import React from 'react'
import { Button } from "@heroui/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRoute,faChargingStation ,faArrowRightArrowLeft} from '@fortawesome/free-solid-svg-icons';
import TripBox from './TripBox';
import { Progress } from '@heroui/react';
function DashboardPage() {
  return (
    <>
 <div className="flex-1 p-6">
          <div className="flex flex-col lg:flex-row">
            <h2 className="text-2xl font-bold dark:text-white text-gray-900 mb-4">
              Welcome Back, Sarah!
            </h2>
            <div className="lg:ml-auto flex flex-col sm:flex-row gap-2">
              <Button
                color="primary"
                variant="solid"
                className="font-semibold dark:text-white text-gray-900 mt-2"
                startContent={<FontAwesomeIcon icon={faRoute} />}
              >
                Plan a New Trip
              </Button>
              <Button
                color="primary"
                variant="bordered"
                className="font-semibold dark:text-white text-gray-900 mt-2"
                startContent={<FontAwesomeIcon icon={faChargingStation} />}
              >
                Find a Charger
              </Button>
            </div>
          </div>

          <h3 className="dark:text-white text-gray-900 font-semibold mb-3">My Garage</h3>
          <div className="flex flex-col md:flex-row h-auto md:h-[170px] w-full md:w-[550px] border-1 border-gray-600 shadow-sm rounded-lg p-4 gap-2">
            <div className="flex-1">
              <h3 className="text-xl font-semibold dark:text-white text-gray-900 mb-2">
                My Tesla Model 3
              </h3>
              <Progress
                className="mt-3 w-full md:w-[400px]"
                size="md"
                value={75}
              />
              <p className="text-gray-500 text-sm mt-4">
                Estimated Range: 250 miles
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
                src="/images/car-1.jpg"
                alt=""
              />
            </div>
          </div>

          <h3 className="dark:text-white text-gray-900 font-semibold mb-3 mt-5">Recent Trips</h3>
          <div>
            <TripBox />
          </div>
        </div>
    </>
  )
}

export default DashboardPage