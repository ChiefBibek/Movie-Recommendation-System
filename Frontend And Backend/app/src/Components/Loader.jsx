import React from "react";
import { FidgetSpinner } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen ">
        <img src="/Logo.png" alt="" className="w-60"/>
      <FidgetSpinner
        visible={true}
        height="80"
        width="80"
        ariaLabel="fidget-spinner-loading"
        wrapperStyle={{}}
        wrapperClass="fidget-spinner-wrapper"
        backgroundColor="#BB86FC"
        ballColors={["red", "green", "yellow"]}

      />
    </div>
  );
};

export default Loader;
