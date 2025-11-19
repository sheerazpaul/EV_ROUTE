import React from "react";
import { Button } from "@heroui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightArrowLeft } from "@fortawesome/free-solid-svg-icons";
function TripBox() {
  const trips = [
    {
      title: "Home to Office",
      date: "May 20, 2024",
      distance: "15.2 miles",
    },
    {
      title: "Trip to Downtown Mall",
      date: "May 18, 2024",
      distance: "22.8 miles",
    },
    {
      title: "Lakeview Park Weekend",
      date: "May 12, 2024",
      distance: "64.1 miles",
      icon :<FontAwesomeIcon icon={faArrowRightArrowLeft} color="white" />,
    },
  ];
  return (
    <>
      {" "}
      <div className="p-2  rounded-lg w-full max-w-md">
        <div className="flex flex-col gap-2">
          {trips.map((trip, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-[#2A3A55] p-4 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <div className="flex flex-col">
                  <span className="text-white font-semibold">{trip.title}</span>
                  <span className="text-default-500 text-sm">
                    {trip.date} - {trip.distance}
                  </span>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="text-white border-white"
                starcontent={trip.icon}
              >
                Repeat Trip
              </Button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default TripBox;
