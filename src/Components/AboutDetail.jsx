import React from "react";
function AboutDetail({head,pra,logo}) {
  return (
    <>
      <div className="flex flex-col justify-center items-center gap-6">
        <div className="h-16 w-16 rounded-full bg-[#0f2d4b] flex items-center justify-center">
        {logo}
        </div>
        <h1 className="text-white font-semibold text-lg">{head}</h1>
        <p className="text-[#e6e8ed]  text-center">{pra}</p>
      </div>
    </>
  );
}

export default AboutDetail;
