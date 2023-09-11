import React from "react";

const Button = ({ text, bgColor, style }) => {
  return (
    <button
      className={`${style} bg-indigo-600 text-white font-[Poppins] py-2 px-6 rounded-full md:ml-2 hover:bg-indigo-400 duration-500`}
    >
      {text}
    </button>
  );
};

export default Button;
