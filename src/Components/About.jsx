import React from "react";
import AboutDetail from "./AboutDetail";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faChargingStation,faCar } from '@fortawesome/free-solid-svg-icons';

function About() { 
  return (
   <div className="flex justify-center items-center flex-col">
  <h1 className="text-2xl text-white font-bold mt-5 text-center md:text-left">
    Get Started in Three Easy Ways
  </h1>
  <div className="flex flex-col md:flex-row justify-between w-full max-w-[1000px] mt-5 gap-5 px-4">
    <AboutDetail
    logo={<FontAwesomeIcon icon={faLocationDot} size="2x" className="text-[#0f71d8]" />}
      head="1.Enter Destination"
      pra="Tell us where you're going, and we'll handle the rest."
    />
    <AboutDetail
    logo={<FontAwesomeIcon icon={faChargingStation}  size="2x" className="text-[#0f71d8]" />}
      head="2. Find Chargers"
      pra="We'll find the best charging stops along your route"
    />
    <AboutDetail
    logo={
<FontAwesomeIcon icon={faCar}  size="2x"  className="text-[#0f71d8]" />}
      head="3. Drive Confidently"
      pra="Enjoy your trip with complete peace of mind."
    />
  </div>
</div>

  );
}

export default About;
