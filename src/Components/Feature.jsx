import React from "react";
import Box from "./box";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMap} from '@fortawesome/free-regular-svg-icons';
import { faRoute, faClockRotateLeft, faComment  } from '@fortawesome/free-solid-svg-icons';
import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";
function Feature() {
  const { dark } = useContext(ThemeContext);
  return (
    <div className="flex flex-col gap-6 dark:text-white text-gray-900 justify-center items-center mt-10 px-4 md:px-8">
     
      <h1 className="text-2xl md:text-3xl font-bold leading-tight text-center">
        Why Choose EV Route?
      </h1>
      <p className="text-sm md:text-base text-center max-w-2xl dark:text-gray-300 text-gray-900">
        Our intelligent platform provides all the tools to make your electric
        journey seamless and stress-free.
      </p>
      <div className="flex flex-wrap justify-center gap-6 w-full max-w-6xl mt-6 ">
        <Box
         icon={<FontAwesomeIcon icon={faMap} size="1x" className="text-[#0f71d8]" />}
          head="Comprehensive Station Map"
          pra="Access a vast network of charging stations across the country."
        />
        <Box
          icon={<FontAwesomeIcon icon={faRoute} size="1x" className="text-[#0f71d8]" />}
          head="Intelligent Route Planning"
          pra="Our smart algorithm plans the most efficient route, including charging stops."
        />
        <Box
 icon={<FontAwesomeIcon icon={faClockRotateLeft} size="1x" className="text-[#0f71d8]" />}
          head="Real-time Availability"
          pra="Check charger availability in real-time to avoid waiting."
        />
        <Box
        icon={<FontAwesomeIcon icon={faComment} size="1x" className="text-[#0f71d8]" />}
          head="Community Reviews"
          pra="Read reviews from other EV drivers to find the best stations."
        />
      </div>
    </div>
  );
}

export default Feature;
