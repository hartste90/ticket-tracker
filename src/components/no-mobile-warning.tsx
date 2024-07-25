import { Hammer } from "lucide-react";
import React from "react";

const NoMobileWarning: React.FC = () => {
  return (
    <div className="min-h-screen md:hidden flex items-center justify-center h-screen">
      <div className="flex text-white p-4 mx-10 rounded-xl bg-gradient-to-r from-yellow-400 from-[85px] to-rose-500 to-[60px]">
        <div className=" mr-10 ">
          <Hammer size={48} />
        </div>
        <div className="inline">
          <span>Sorry babe - I'm still optimizing for mobile devices!</span>
          <span className="block text-sm opacity-75">
            {" "}
            Please use a desktop browser for now.
          </span>
        </div>
      </div>
    </div>
  );
};

export default NoMobileWarning;
