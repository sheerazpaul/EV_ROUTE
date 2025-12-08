import React from "react";

function Specifications({ icon, title, properties, valueUnit }) {
  return (
    <div className="flex flex-col justify-center items-center rounded-lg dark:bg-[#17212f] bg-gray-100 p-2 h-[110px] w-full sm:w-[45%] md:w-[170px]">
      <p className="text-[#0d7ff2] text-xl">{icon}</p>
      <p className="text-gray-500 text-sm mt-1">{title}</p>
      <h1 className="dark:text-white text-gray-900 font-semibold text-base mt-1">
        {properties} {valueUnit}
      </h1>
    </div>
  );
}

export default Specifications;
