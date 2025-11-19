import React from "react";
function FaqDetail({heading,pragraph}) {
  return (
    <div className="h-[220px] bg-[#192931] border-0 w-[230px]  rounded-lg flex-col flex p-4 gap-2 hover:scale-105 hover:duration-500 transition">
      <h1 className="font-bold">{heading} </h1>
      <p className="text-[#657D96] font-semibold">{pragraph}</p>
    </div>
  );
}

export default FaqDetail;
