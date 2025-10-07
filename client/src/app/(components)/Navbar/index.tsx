"use client";
import React from "react";
import Image from "next/image";

const Navbar = () => {

  return (
    <div className="flex justify-between items-center w-full mb-7 shadow-md px-5 py-3 bg-darkaccent rounded">
      {/* left side  */}
      <div className="flex justify-between items-center gap-5 flex-1">
        <div className="flex items-center gap-2 sm:gap-3 mr-2">
          <p className="text-gray-200 text-xl font-bold">Let's Chat</p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
