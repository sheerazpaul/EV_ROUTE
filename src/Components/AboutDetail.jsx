import React from "react";
function AboutDetail({head,pra,logo}) {
  return (
    <>
      <div className="flex flex-col justify-center items-center gap-6">
        <div className="h-16 w-16 rounded-full dark:bg-[#0f2d4b] bg-gray-100 flex items-center justify-center">
        {logo}
        </div>
        <h1 className="dark:text-white  text-gray-900 font-semibold text-lg">{head}</h1>
        <p className="dark:text-[#e6e8ed]  text-gray-900 text-center">{pra}</p>
      </div>
    </>
  );
}

export default AboutDetail;
