import React from "react";
import { DNA } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen ">
        <img src="/Logo.png" alt="" className="w-60"/>
      <DNA
        visible={true}
        height="80"
        width="80"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="fidget-spinner-wrapper"
        // backgroundColor="#BB86FC"
        // ballColors={["red", "green", "yellow"]}

      />
    </div>
  );
};

export default Loader;
