import React from "react";
function Box({head,pra,icon}) {
  return (
    <div className="h-[200px] dark:bg-[#192931] bg-gray-100 border-0 w-[230px]  rounded-lg flex-col flex p-4 gap-4 hover:scale-105 hover:duration-500 transition ">
        {icon}   
      <h1 className="font-bold">{head} </h1>
      <p className="text-[#657D96] font-semibold">{pra}</p>
    </div>
  );
}

export default Box;
