import React from "react";

const Popup = ({message,onClose}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-lg text-center">
        <p>{message}</p>
        <button
          onClick={onClose}
          className="mt-4 bg-[#BB86FC] text-[#121212] px-4 py-2 rounded"
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default Popup;
