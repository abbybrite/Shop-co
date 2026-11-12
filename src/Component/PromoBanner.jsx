import React, { useState } from "react";
import { MdCancel } from "react-icons/md";

const PromoBanner = () => {
  const [show, setShow] = useState(true);

  if (!show) return null;

  return (
    <div className="relative bg-[#1A1A1A] flex justify-center items-center px-8 md:px-10 py-2">
      <div className="text-white text-center text-xs md:text-base">
        Sign up and get 20% off your first order.{" "}
        <a href="#" className="underline">
          Sign Up Now
        </a>
      </div>
      <button
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer"
        onClick={() => setShow(false)}
      >
        <MdCancel className="text-white text-sm md:text-xl" />
      </button>
    </div>
  );
};

export default PromoBanner;