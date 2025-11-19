import React from "react";

function Specifications({ icon, title, properties }) {
  return (
    <div className="h-[110px] w-full max-w-[170px] sm:w-[170px] flex flex-col justify-center items-center rounded-lg bg-[#17212f] p-2">
      <p className="text-[#0d7ff2] text-xl">{icon}</p>
      <p className="text-gray-500 text-sm mt-1">{title}</p>
      <h1 className="text-white font-semibold text-base mt-1">{properties}</h1>
    </div>
  );
}

export default Specifications;
