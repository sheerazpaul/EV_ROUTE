import React from "react";
import FaqDetail from "./FaqDetail";
import { User } from "@heroui/react";
function Faq() {
  return (
  <div className="flex justify-center items-center flex-col">
  <h1 className="text-2xl dark:text-white text-gray-900 font-bold mt-5 text-center md:text-left">
    Don't just take our word for it.
  </h1>
  <div className="flex flex-col md:flex-row w-full max-w-[1000px] mt-7 items-center justify-center gap-16 px-4 mb-8">
    <FaqDetail
      heading={
        <User
          avatarProps={{
            src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
          }}
          description="Product Designer"
          name="Sarah K."
        />
      }
      pragraph="This app is a game-changer for road trips! The route planning is incredibly accurate and saved me so much time."
    />
    <FaqDetail
      heading={
        <User
          avatarProps={{
            src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
          }}
          description="Daily Commuter:"
          name="Mike T."
        />
      }
      pragraph="I use EV Route every day. The real-time availability feature means I never have to wait for a charger."
    />
    <FaqDetail
      heading={
        <User
          avatarProps={{
            src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
          }}
          description="New EV Owner:"
          name=" Jessica L."
        />
      }
      pragraph="As a new EV owner, this app took away all my range anxiety. The interface is so simple and intuitive."
    />
  </div>
</div>

  );
}

export default Faq;
