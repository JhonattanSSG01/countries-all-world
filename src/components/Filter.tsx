"use client";

import React from "react";

const Filter = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  return (
    <div className="pl-10 flex items-center">
      <div className="relative w-2xs">
        <button
          className="w-full py-4 px-8 rounded-lg shadow-md bg-white cursor-pointer text-left hover:bg-gray-200 transition-all"
          onClick={() => setOpen(!open)}
        >
          Filter by Region
        </button>

        {open && (
          <ul className="absolute left-0 mt-2 w-full bg-white rounded-md shadow-md z-10">
            <li className="px-6 py-2 hover:bg-gray-100 cursor-pointer">
              Africa
            </li>
            <li className="px-6 py-2 hover:bg-gray-100 cursor-pointer">
              America
            </li>
            <li className="px-6 py-2 hover:bg-gray-100 cursor-pointer">Asia</li>
            <li className="px-6 py-2 hover:bg-gray-100 cursor-pointer">
              Europe
            </li>
            <li className="px-6 py-2 hover:bg-gray-100 cursor-pointer">
              Oceania
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Filter;
